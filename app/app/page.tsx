'use client';

import { useState, useEffect, useRef } from 'react';
import PostCard from './components/PostCard';
import CatalogCard from './components/CatalogCard';
import { Thread, File } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, RefreshCw, LayoutGrid, List } from 'lucide-react';
import VideoPlayer from './components/VideoPlayer';

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [visibleThreads, setVisibleThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [viewMode, setViewMode] = useState<'feed' | 'catalog'>('feed');
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/threads');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (data.threads) {
        setThreads(data.threads);
        // For catalog mode, we might want to load more items initially or stick to same pagination
        const itemsPerPage = viewMode === 'catalog' ? 20 : 10;
        setVisibleThreads(data.threads.slice(0, itemsPerPage));
        setPage(1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  // Update visible threads when page changes or viewMode changes
  useEffect(() => {
    if (threads.length > 0) {
      const itemsPerPage = viewMode === 'catalog' ? 20 : 10;
      const count = page * 10; 
      setVisibleThreads(threads.slice(0, count));
    }
  }, [page, threads, viewMode]);

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && visibleThreads.length < threads.length) {
          setPage(p => p + 1);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, visibleThreads.length, threads.length]);

  return (
    <main className="min-h-screen bg-black text-white flex justify-center font-sans selection:bg-orange-500 selection:text-white">
      <div className={`w-full ${viewMode === 'catalog' ? 'max-w-5xl' : 'max-w-[600px]'} border-x border-gray-900 min-h-screen relative transition-all duration-300`}>
         <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50">
            <h1 className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
              <span className="text-orange-500">/b/</span> {viewMode === 'feed' ? 'Feed' : 'Catalog'}
            </h1>
            <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode(prev => prev === 'feed' ? 'catalog' : 'feed')}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
                  title={viewMode === 'feed' ? "Каталог" : "Лента"}
                >
                  {viewMode === 'feed' ? <LayoutGrid size={20} /> : <List size={20} />}
                </button>
                <button 
                  onClick={fetchThreads}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
                  title="Обновить"
                >
                  <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                </button>
            </div>
         </header>

         <div className={`pb-20 ${viewMode === 'catalog' ? 'p-2' : ''}`}>
            {viewMode === 'feed' ? (
                <div className="flex flex-col">
                    {visibleThreads.map(thread => (
                      <PostCard 
                        key={thread.num} 
                        thread={thread} 
                        onMediaClick={setSelectedMedia} 
                      />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {visibleThreads.map(thread => (
                        <CatalogCard 
                            key={thread.num} 
                            thread={thread}
                        />
                    ))}
                </div>
            )}
            
            {loading && threads.length === 0 && (
              <div className="p-8 text-center text-gray-500 animate-pulse">
                Загрузка...
              </div>
            )}
            
            <div ref={observerTarget} className="h-20 w-full flex justify-center items-center opacity-50 mt-4">
               {visibleThreads.length < threads.length && !loading && (
                 <span className="w-2 h-2 bg-gray-600 rounded-full animate-ping"></span>
               )}
            </div>
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
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
                className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50 bg-black/50 rounded-full backdrop-blur-md"
                onClick={() => setSelectedMedia(null)}
            >
                <X size={24} />
            </button>

            {selectedMedia.path.endsWith('.webm') || selectedMedia.path.endsWith('.mp4') ? (
               <div className="w-full h-full max-w-5xl max-h-[90vh]">
                   <VideoPlayer
                    src={`https://2ch.org${selectedMedia.path}`}
                    className="w-full h-full rounded-lg shadow-2xl shadow-orange-500/20"
                    autoplay={true}
                    loop={true}
                  />
               </div>
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
