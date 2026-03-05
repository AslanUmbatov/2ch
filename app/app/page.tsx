'use client';

import { useState, useEffect, useRef } from 'react';
import PostCard from './components/PostCard';
import CatalogCard from './components/CatalogCard';
import { Thread, File } from './types';
import { getThreads } from './services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, LayoutGrid, List, ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';
import { useScrollDirection } from './hooks/useScrollDirection';
import { useMedia } from './context/MediaContext';
import { useFeed } from './context/FeedContext';
import ThreadView from './components/ThreadView';

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [visibleThreads, setVisibleThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'feed' | 'catalog'>('feed');
  const [sortMode, setSortMode] = useState<'default' | 'date_desc'>('default');
  const observerTarget = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection();
  const { fullscreenItem } = useMedia();
  const { activeThreadId, closeThread } = useFeed();

  const fetchThreads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getThreads();
      if (data && data.length > 0) {
        setThreads(data);
        // For catalog mode, we might want to load more items initially or stick to same pagination
        const itemsPerPage = viewMode === 'catalog' ? 20 : 10;
        setVisibleThreads(sortThreads(data, sortMode).slice(0, itemsPerPage));
        setPage(1);
      } else {
        setError('Не удалось загрузить треды. Проверьте соединение.');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка при загрузке данных.');
    } finally {
      setLoading(false);
    }
  };

  const sortThreads = (threads: Thread[], mode: 'default' | 'date_desc') => {
    if (mode === 'default') {
      return [...threads]; // Original order from API
    } else {
      // Sort by timestamp (newest first)
      return [...threads].sort((a, b) => b.timestamp - a.timestamp);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  // Update visible threads when page changes, viewMode changes, or sortMode changes
  useEffect(() => {
    if (threads.length > 0) {
      const itemsPerPage = viewMode === 'catalog' ? 20 : 10;
      const count = page * 10; 
      const sorted = sortThreads(threads, sortMode);
      setVisibleThreads(sorted.slice(0, count));
    }
  }, [page, threads, viewMode, sortMode]);

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
      <div className={`w-full ${viewMode === 'catalog' ? 'max-w-5xl' : 'max-w-[600px]'} border-x border-gray-900 min-h-screen relative transition-all duration-300 pt-16`}>
         <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full ${viewMode === 'catalog' ? 'max-w-5xl' : 'max-w-[600px]'} z-30 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50 transition-transform duration-300 ease-in-out ${scrollDirection === 'down' || fullscreenItem ? '-translate-y-full' : 'translate-y-0'}`}>
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
                  onClick={() => setSortMode(prev => prev === 'default' ? 'date_desc' : 'default')}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
                  title={sortMode === 'default' ? "Сортировать по дате" : "Стандартная сортировка"}
                >
                  {sortMode === 'default' ? <ArrowDownWideNarrow size={20} /> : <ArrowUpNarrowWide size={20} />}
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
            {error && (
              <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
                <p className="mb-4 text-lg">{error}</p>
                <button 
                  onClick={fetchThreads}
                  className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
                >
                  Попробовать снова
                </button>
              </div>
            )}

            {!error && viewMode === 'feed' ? (
                <div className="flex flex-col">
                    {visibleThreads.map(thread => (
                      <PostCard 
                        key={thread.num} 
                        thread={thread} 
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
      
      <AnimatePresence>
        {activeThreadId && (
          <ThreadView 
            threadId={activeThreadId} 
            onClose={closeThread} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}
