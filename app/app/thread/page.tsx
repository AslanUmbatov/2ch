'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Thread, File } from '../types';
import { getThread } from '../services/api';
import PostCard from '../components/PostCard';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useMedia } from '../context/MediaContext';

function ThreadContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollDirection = useScrollDirection();
  const { fullscreenItem } = useMedia();

  const fetchThread = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getThread(id as string);
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
    if (id) {
      fetchThread();
    }
  }, [id]);

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
    <div className="w-full max-w-[600px] border-x border-gray-900 min-h-screen relative">
         <header className={`sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50 transition-transform duration-300 ease-in-out ${scrollDirection === 'down' || fullscreenItem ? '-translate-y-full' : 'translate-y-0'}`}>
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold tracking-tighter text-white truncate px-4 flex-1 text-center">
              {thread?.subject || `Тред #${id}`}
            </h1>
            <button 
              onClick={fetchThread}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
         </header>

         <div className="flex flex-col pb-20">
            {loading ? (
              <div className="p-8 text-center text-gray-500 animate-pulse mt-10">
                Загрузка треда...
              </div>
            ) : (
              posts.map((post, index) => (
                <PostCard 
                  key={post.num} 
                  thread={mapPostToThread(post)} 
                  hideFooter={index > 0} // Show footer only for OP post (index 0)
                />
              ))
            )}
            
            {!loading && posts.length === 0 && (
                 <div className="p-8 text-center text-gray-500 mt-10">
                    Не удалось загрузить посты.
                 </div>
            )}
         </div>
    </div>
  );
}

export default function ThreadPage() {
  return (
    <main className="min-h-screen bg-black text-white flex justify-center font-sans selection:bg-orange-500 selection:text-white">
      <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
        <ThreadContent />
      </Suspense>
    </main>
  );
}
