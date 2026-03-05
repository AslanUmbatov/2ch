'use client';

import { useEffect, useState, useRef } from 'react';
import { Thread } from '../types';
import { getThread } from '../services/api';
import PostCard from './PostCard';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMedia } from '../context/MediaContext';

interface ThreadViewProps {
  threadId: string;
  onClose: () => void;
}

export default function ThreadView({ threadId, onClose }: ThreadViewProps) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { fullscreenItem } = useMedia();
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchThread = async () => {
    setLoading(true);
    try {
      const data = await getThread(threadId);
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

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-40 bg-black flex justify-center"
      style={{ touchAction: 'pan-y' }}
    >
       <div className="w-full max-w-[600px] border-x border-gray-900 h-full relative flex flex-col bg-black text-white font-sans">
          <header className={`absolute top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50 transition-transform duration-300 ease-in-out ${scrollDirection === 'down' && !fullscreenItem ? '-translate-y-full' : 'translate-y-0'}`}>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold tracking-tighter text-white truncate px-4 flex-1 text-center">
              {thread?.subject || `Тред #${threadId}`}
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
            className="flex-1 overflow-y-auto pt-16"
          >
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="pb-20">
                {thread && (
                  <div className="border-b border-gray-800">
                     <PostCard 
                       thread={mapPostToThread(thread)} 
                       hideFooter={true}
                     />
                   </div>
                 )}
                 {posts.map((post) => (
                   <div key={post.num} className="border-b border-gray-800">
                     <PostCard 
                       thread={mapPostToThread(post)} 
                       hideFooter={true}
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
