'use client';

import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Thread, File } from '../types';
import { get4ChanThread, getThread } from '../services/api';
import PostCard from './PostCard';
import { ArrowLeft, MessageSquare, RefreshCw, Download, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMedia, FullscreenItem } from '../context/MediaContext';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { useFeed } from '../context/FeedContext';
import { estimateThreadSizeBytes, loadSavedThread, saveThreadLocally, SavedThreadPost } from '../services/offline';
import { Capacitor } from '@capacitor/core';

interface ThreadViewProps {
  threadId: string;
  onClose: () => void;
}

export default function ThreadView({ threadId, onClose }: ThreadViewProps) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<SavedThreadPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState({ done: 0, total: 0, percent: 0, label: '' });
  const { fullscreenItem, openFullscreen } = useMedia();
  const { repliesOverlay, openRepliesOverlay, closeRepliesOverlay, refreshSavedThreads, setActiveThreadSave } = useFeed();
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isLocal = threadId.startsWith('local:');
  const localKey = isLocal ? threadId.slice('local:'.length) : '';

  const fetchThread = async () => {
    setLoading(true);
    try {
      if (isLocal) {
        const data = await loadSavedThread(localKey);
        if (data) {
          setThread(data.thread);
          setPosts(data.posts);
        }
        return;
      }

      const parsed = threadId.startsWith('4chan:')
        ? { source: '4chan' as const, board: threadId.split(':')[1] || 'b', id: threadId.split(':')[2] || '' }
        : { source: '2ch' as const, id: threadId };

      const data = parsed.source === '2ch'
        ? await getThread(parsed.id)
        : await get4ChanThread(parsed.board, parsed.id);

      if (data) {
        setThread(data.thread);
        setPosts(data.posts as SavedThreadPost[]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThread();
  }, [threadId]);

  const handleSaveThread = useCallback(async () => {
    if (isLocal) return;
    if (!Capacitor.isNativePlatform()) {
      alert('Локальное сохранение доступно только на устройстве (Android/iOS).');
      return;
    }
    if (isSaving || loading) return;
    if (!thread || posts.length === 0) return;

    const source = threadId.startsWith('4chan:') ? ('4chan' as const) : ('2ch' as const);
    const board = source === '4chan' ? threadId.split(':')[1] || 'b' : undefined;
    const id = source === '4chan' ? threadId.split(':')[2] || '' : threadId;
    const key = source === '4chan' ? `4chan:${board}:${id}` : `2ch:${id}`;

    const sizeBytes = estimateThreadSizeBytes(posts);
    const sizeMb = sizeBytes > 0 ? (sizeBytes / 1024 / 1024).toFixed(1) : null;
    const ok = confirm(
      sizeMb
        ? `Сохранить тред локально?\nВес: ~${sizeMb} МБ\nБудут скачаны все медиа.\nПродолжить?`
        : 'Сохранить тред локально?\nБудут скачаны все медиа.\nПродолжить?'
    );
    if (!ok) return;

    setIsSaving(true);
    setSaveProgress({ done: 0, total: 0, percent: 0, label: '' });

    try {
      const clonedThread = JSON.parse(JSON.stringify(thread)) as Thread;
      const clonedPosts = JSON.parse(JSON.stringify(posts)) as SavedThreadPost[];

      await saveThreadLocally({
        key,
        source,
        board,
        id,
        thread: clonedThread,
        posts: clonedPosts,
        onProgress: (p) => {
          setSaveProgress({ done: p.done, total: p.total, percent: p.percent, label: p.label });
        }
      });

      refreshSavedThreads();
    } finally {
      setIsSaving(false);
    }
  }, [isLocal, isSaving, loading, thread, posts, threadId, refreshSavedThreads]);

  useEffect(() => {
    if (isLocal) {
      setActiveThreadSave(null);
      return;
    }
    setActiveThreadSave(() => handleSaveThread);
    return () => setActiveThreadSave(null);
  }, [handleSaveThread, isLocal, setActiveThreadSave]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    disableBodyScroll(container);
    return () => {
      enableBodyScroll(container);
      clearAllBodyScrollLocks();
    };
  }, [threadId]);

  // Handle scroll direction within the overlay
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;
      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
        setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
        lastScrollY.current = currentScrollY;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const repliesByTarget = useMemo(() => {
    const map = new Map<string, SavedThreadPost[]>();

    const getText = (htmlOrText: string) => {
      try {
        if (htmlOrText.includes('<')) {
          const doc = new DOMParser().parseFromString(htmlOrText, 'text/html');
          return doc.body.textContent || '';
        }
      } catch {}
      return htmlOrText;
    };

    const extractTargets = (text: string) => {
      const targets = new Set<string>();
      const cleaned = getText(text);
      const re = />>\s*(\d+)/g;
      let match: RegExpExecArray | null = null;
      while ((match = re.exec(cleaned)) !== null) {
        if (match[1]) targets.add(match[1]);
      }
      return targets;
    };

    for (const post of posts) {
      const targets = extractTargets(String(post?.comment || ''));
      for (const target of targets) {
        const list = map.get(target) || [];
        list.push(post);
        map.set(target, list);
      }
    }

    return map;
  }, [posts]);

  const overlayReplies = useMemo(() => {
    if (!repliesOverlay) return [];
    if (repliesOverlay.threadId !== threadId) return [];
    return repliesByTarget.get(repliesOverlay.postNum) || [];
  }, [repliesByTarget, repliesOverlay, threadId]);

  const mapPostToThread = (post: SavedThreadPost): Thread => ({
    num: post.num,
    comment: String(post.comment || ''),
    subject: String(post.subject || ''),
    timestamp: Number(post.timestamp || 0),
    files: (post.files || []) as File[],
    posts_count: 0, 
    views: 0,
  });

  const pluralize = (count: number, one: string, few: string, many: string) => {
    const n = Math.abs(count) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return many;
    if (n1 > 1 && n1 < 5) return few;
    if (n1 === 1) return one;
    return many;
  };

  const handleMediaClick = (file: File, postNum: string | number) => {
    const resolveSrc = (value: string) => {
      if (value.startsWith('http')) return value;
      if (/^[a-zA-Z]+:/.test(value)) return value;
      return `https://2ch.life${value}`;
    };

    // Collect all media items from all posts in the thread
    const playlist: FullscreenItem[] = posts.flatMap(post => 
      (post.files || []).map((f: File) => ({
        type: (f.path.endsWith('.webm') || f.path.endsWith('.mp4')) ? 'video' : 'image',
        src: resolveSrc(f.path),
        poster: resolveSrc(f.thumbnail),
        alt: f.displayname,
        layoutId: `media-${post.num}-${f.path}`,
        currentTime: 0
      }))
    );

    // Find the clicked item
    const clickedItem = playlist.find(item => item.layoutId === `media-${postNum}-${file.path}`);
    
    if (clickedItem) {
      openFullscreen(clickedItem, playlist);
    }
  };

  const fallbackTitle = (() => {
    if (isLocal) return thread?.subject || 'Сохранённый тред';
    if (!threadId.startsWith('4chan:')) return `Тред #${threadId}`;
    const parts = threadId.split(':');
    const board = parts[1] || 'b';
    const id = parts[2] || '';
    return `/${board}/ #${id}`;
  })();

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm flex justify-center"
      style={{ touchAction: 'pan-y' }}
    >
       <div className="w-full max-w-[600px] border-x border-gray-900 h-full relative flex flex-col bg-transparent text-white font-sans">
          <header className={`absolute top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50 transition-transform duration-300 ease-in-out ${scrollDirection === 'down' && !fullscreenItem ? '-translate-y-full' : 'translate-y-0'}`}>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold tracking-tighter text-white truncate px-4 flex-1 text-center">
              {thread?.subject || fallbackTitle}
            </h1>
            <div className="flex items-center gap-1">
              {isLocal ? null : (
                <button
                  onClick={handleSaveThread}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200 disabled:opacity-50"
                  title="Сохранить локально"
                  disabled={isSaving || loading}
                >
                  {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                </button>
              )}
              <button 
                onClick={isLocal ? onClose : fetchThread}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
                title={isLocal ? 'Закрыть' : 'Обновить'}
              >
                <RefreshCw size={20} className={!isLocal && loading ? "animate-spin" : ""} />
              </button>
            </div>
          </header>

          <AnimatePresence>
            {!isSaving ? null : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-14 left-0 right-0 z-50 px-4"
              >
                <div className="bg-black/70 backdrop-blur-md border border-gray-800 rounded-xl px-3 py-2">
                  <div className="flex items-center justify-between text-xs text-white/80 font-mono">
                    <span className="truncate pr-3">{saveProgress.label}</span>
                    <span>{saveProgress.percent}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400"
                      style={{ width: `${Math.min(100, Math.max(0, saveProgress.percent))}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto pt-16 overscroll-contain"
            style={{ overscrollBehavior: 'contain' }}
          >
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="pb-20">
                 {posts.map((post) => (
                   <div key={post.num} className="border-b border-gray-800">
                     <PostCard 
                       thread={mapPostToThread(post)} 
                       hideFooter={true}
                        hideDivider={true}
                      compact={true}
                       onMediaClick={(file) => handleMediaClick(file, post.num)}
                       enableHide={false}
                     />
                      {(() => {
                        const replyCount = (repliesByTarget.get(String(post.num)) || []).length;
                        if (replyCount <= 0) return null;
                        const label = `${replyCount} ${pluralize(replyCount, 'Ответ', 'Ответа', 'Ответов')}`;
                        return (
                          <div className="px-4 pt-1 pb-3 flex justify-end items-center text-gray-500 text-xs bg-black">
                            <button
                              onClick={() => openRepliesOverlay(threadId, post.num)}
                              className="flex items-center gap-1.5 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-900"
                            >
                              <MessageSquare size={16} />
                              <span>{label}</span>
                            </button>
                          </div>
                        );
                      })()}
                   </div>
                 ))}
              </div>
            )}
          </div>

          <AnimatePresence>
            {!repliesOverlay || repliesOverlay.threadId !== threadId ? null : (
              <motion.div
                className="absolute inset-0 z-[60] bg-black flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <header className="bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50">
                  <button
                    onClick={closeRepliesOverlay}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="text-lg font-bold tracking-tighter text-white truncate px-4 flex-1 text-center">
                    Ответы на #{repliesOverlay.postNum}
                  </h2>
                  <div className="w-9" />
                </header>

                <div className="flex-1 overflow-y-auto overscroll-contain pt-2" style={{ overscrollBehavior: 'contain' }}>
                  {overlayReplies.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                      Нет ответов
                    </div>
                  ) : (
                    <div className="pb-20">
                      {overlayReplies.map((p) => (
                        <div key={p.num} className="border-b border-gray-800">
                          <PostCard
                            thread={mapPostToThread(p)}
                            hideFooter={true}
                            hideDivider={true}
                            compact={true}
                            onMediaClick={(file) => handleMediaClick(file, p.num)}
                            enableHide={false}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
       </div>
    </motion.div>
  );
}
