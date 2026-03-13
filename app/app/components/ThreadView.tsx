'use client';

import { useEffect, useState, useRef } from 'react';
import { Thread, File } from '../types';
import { get4ChanThread, getThread } from '../services/api';
import PostCard from './PostCard';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMedia, FullscreenItem } from '../context/MediaContext';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

interface ThreadViewProps {
  threadId: string;
  onClose: () => void;
}

export default function ThreadView({ threadId, onClose }: ThreadViewProps) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { fullscreenItem, openFullscreen } = useMedia();
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

  const mapPostToThread = (post: any): Thread => ({
    num: post.num,
    comment: post.comment,
    subject: post.subject,
    timestamp: post.timestamp,
    files: post.files,
    posts_count: 0, 
    views: 0,
  });

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
                       onMediaClick={(file) => handleMediaClick(file, post.num)}
                       enableHide={false}
                     />
                   </div>
                 ))}
              </div>
            )}
          </div>
       </div>
    </motion.div>
  );
}
