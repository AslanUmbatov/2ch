'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Thread, File } from '../../types';
import PostCard from '../../components/PostCard';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThreadPage() {
  const { id } = useParams();
  const router = useRouter();
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);

  const fetchThread = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/thread/${id}`);
      if (!res.ok) throw new Error('Failed to fetch thread');
      const data = await res.json();
      
      // Typical Makaba API response structure for /b/res/123.json:
      // {
      //   "threads": [
      //     {
      //       "posts": [ ... ]
      //     }
      //   ]
      // }
      // Or sometimes just { posts: [...] } depending on the mirror.
      // We should handle both.
      
      let postsArray = [];
      if (data.threads && Array.isArray(data.threads) && data.threads.length > 0) {
          postsArray = data.threads[0].posts;
      } else if (data.posts && Array.isArray(data.posts)) {
          postsArray = data.posts;
      } else if (Array.isArray(data)) {
          // rare case
          postsArray = data;
      }

      if (postsArray.length > 0) {
        const opPost = postsArray[0];
        setThread({
            num: opPost.num,
            comment: opPost.comment,
            subject: opPost.subject,
            timestamp: opPost.timestamp,
            files: opPost.files,
            posts_count: postsArray.length,
            views: opPost.views || 0
        });
        setPosts(postsArray);
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
    <main className="min-h-screen bg-black text-white flex justify-center font-sans selection:bg-orange-500 selection:text-white">
      <div className="w-full max-w-[600px] border-x border-gray-900 min-h-screen relative">
         <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50">
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
                  onMediaClick={setSelectedMedia} 
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
      
       {/* Fullscreen Media Viewer */}
       {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedMedia(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
                className="absolute -top-12 right-0 text-white/70 hover:text-white p-2 z-50"
                onClick={() => setSelectedMedia(null)}
            >
                Закрыть [Esc]
            </button>

            {selectedMedia.path.endsWith('.webm') || selectedMedia.path.endsWith('.mp4') ? (
               <video
                src={`https://2ch.org${selectedMedia.path}`}
                controls
                autoPlay
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl shadow-orange-500/20"
              />
            ) : (
              <img
                src={`https://2ch.org${selectedMedia.path}`}
                alt={selectedMedia.displayname}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl shadow-orange-500/20"
              />
            )}
            
            <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm pointer-events-none">
                {selectedMedia.displayname}
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
