'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { Thread, File } from '../types';
import { get4ChanThread, getThread } from '../services/api';
import PostCard from './PostCard';
import { ArrowLeft, MessageSquare, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMedia, FullscreenItem } from '../context/MediaContext';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { useFeed } from '../context/FeedContext';

interface ThreadViewProps {
  threadId: string;
  onClose: () => void;
}

export default function ThreadView({ threadId, onClose }: ThreadViewProps) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { fullscreenItem, openFullscreen } = useMedia();
  const { repliesOverlay, openRepliesOverlay, closeRepliesOverlay } = useFeed();
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchThread = async () => {
    setLoading(true);
    try {
      const parsed = threadId.startsWith('4chan:')
        ? { source: '4chan' as const, board: threadId.split(':')[1] || 'b', id: threadId.split(':')[2] || '' }
        : { source: '2ch' as const, id: threadId };

      const data = parsed.source === '2ch'
        ? await getThread(parsed.id)
        : await get4ChanThread(parsed.board, parsed.id);

      if (data) {
        setThread(data.thread);
        setPosts(data.posts);
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
    const map = new Map<string, any[]>();

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

  const mapPostToThread = (post: any): Thread => ({
    num: post.num,
    comment: post.comment,
    subject: post.subject,
    timestamp: post.timestamp,
    files: post.files,
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

  const handleMediaClick = (file: File, postNum: number) => {
    // Collect all media items from all posts in the thread
    const playlist: FullscreenItem[] = posts.flatMap(post => 
      (post.files || []).map((f: File) => ({
        type: (f.path.endsWith('.webm') || f.path.endsWith('.mp4')) ? 'video' : 'image',
        src: f.path.startsWith('http') ? f.path : `https://2ch.life${f.path}`,
        poster: f.thumbnail.startsWith('http') ? f.thumbnail : `https://2ch.life${f.thumbnail}`,
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
            <button 
              onClick={fetchThread}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </header>

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
