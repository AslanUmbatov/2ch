'use client';

import { useState, useEffect, useRef } from 'react';
import PostCard from './components/PostCard';
import CatalogCard from './components/CatalogCard';
import { Thread } from './types';
import { get4ChanBoards, get4ChanCatalog, getThreads, FourChanBoard } from './services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, LayoutGrid, List, ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';
import { useScrollDirection } from './hooks/useScrollDirection';
import { useMedia } from './context/MediaContext';
import { useFeed } from './context/FeedContext';
import ThreadView from './components/ThreadView';

export default function Home() {
  const [source, setSource] = useState<'2ch' | '4chan'>('2ch');
  const [boards, setBoards] = useState<FourChanBoard[]>([]);
  const [activeBoard, setActiveBoard] = useState('b');
  const [isBoardPickerOpen, setIsBoardPickerOpen] = useState(false);
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
  const { activeThreadId, closeThread, hiddenThreads } = useFeed();

  const getThreadKey = (t: Thread) => {
    return source === '2ch' ? `2ch:${t.num}` : `4chan:${activeBoard}:${t.num}`;
  };

  const getOpenThreadId = (t: Thread) => {
    return source === '2ch' ? t.num.toString() : `4chan:${activeBoard}:${t.num}`;
  };

  const currentBoardLabel = source === '2ch' ? '/b/' : `/${activeBoard}/`;

  const fetchThreads = async () => {
    setLoading(true);
    setError(null);
    setThreads([]);
    setVisibleThreads([]);
    setPage(1);
    try {
      const data = source === '2ch' ? await getThreads() : await get4ChanCatalog(activeBoard);
      if (data && data.length > 0) {
        setThreads(data);
        const itemsPerPage = viewMode === 'catalog' ? 20 : 10;
        setVisibleThreads(sortThreads(data, sortMode).slice(0, itemsPerPage));
        setPage(1);
      } else {
        setError(source === '2ch' ? 'Не удалось загрузить треды. Проверьте соединение.' : 'Не удалось загрузить каталог 4chan.');
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
  }, [source, activeBoard]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [source, activeBoard]);

  useEffect(() => {
    if (source !== '4chan') return;
    if (boards.length > 0) return;

    (async () => {
      try {
        const list = await get4ChanBoards();
        setBoards(list);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [source, boards.length]);

  // Update visible threads when page changes, viewMode changes, sortMode changes, or hiddenThreads changes
  useEffect(() => {
    if (threads.length > 0) {
      // Filter out hidden threads first
      const filteredThreads = threads.filter(t => !hiddenThreads.includes(getThreadKey(t)));
      
      const itemsPerPage = viewMode === 'catalog' ? 20 : 10;
      const count = page * itemsPerPage; 
      const sorted = sortThreads(filteredThreads, sortMode);
      setVisibleThreads(sorted.slice(0, count));
    }
  }, [page, threads, viewMode, sortMode, hiddenThreads, source, activeBoard]);

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
      <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full ${viewMode === 'catalog' ? 'max-w-5xl' : 'max-w-[600px]'} z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50 transition-transform duration-300 ease-in-out ${scrollDirection === 'down' || fullscreenItem ? '-translate-y-full' : 'translate-y-0'}`}>
         <div className="flex items-center gap-2 min-w-0">
           <button
             onClick={() => {
               setSource(prev => prev === '2ch' ? '4chan' : '2ch');
               setError(null);
             }}
             className={`font-bold tracking-tighter ${source === '4chan' ? 'text-green-400' : 'text-orange-500'} text-xl`}
           >
             {source === '2ch' ? '2ch' : '4chan'}
           </button>

           <button
             onClick={() => setIsBoardPickerOpen(true)}
             className="text-xl font-bold tracking-tighter text-white hover:text-gray-200 transition-colors truncate"
             title="Выбрать доску"
           >
             {currentBoardLabel}
           </button>
         </div>
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
      <motion.div 
        animate={{ 
          filter: activeThreadId ? 'blur(10px) brightness(0.7)' : 'blur(0px) brightness(1)',
          scale: activeThreadId ? 0.95 : 1
        }}
        transition={{ duration: 0.3 }}
        className={`w-full ${viewMode === 'catalog' ? 'max-w-5xl' : 'max-w-[600px]'} border-x border-gray-900 min-h-screen relative pt-16`}
      >

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
                        key={getThreadKey(thread)} 
                        thread={thread} 
                        openThreadId={getOpenThreadId(thread)}
                        threadKey={getThreadKey(thread)}
                      />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {visibleThreads.map(thread => (
                        <CatalogCard 
                            key={getThreadKey(thread)} 
                            thread={thread}
                            openThreadId={getOpenThreadId(thread)}
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
      </motion.div>
      
      <AnimatePresence>
        {activeThreadId && (
          <ThreadView 
            threadId={activeThreadId} 
            onClose={closeThread} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBoardPickerOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBoardPickerOpen(false)}
          >
            <motion.div
              className="absolute left-1/2 top-20 -translate-x-1/2 w-[calc(100%-32px)] max-w-[600px] bg-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ y: 12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                <div className="font-bold tracking-tight text-white">Доски</div>
                <button
                  onClick={() => setIsBoardPickerOpen(false)}
                  className="px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors text-sm text-gray-200"
                >
                  Закрыть
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto">
                {source === '2ch' ? (
                  <div className="p-3">
                    <button
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-900 transition-colors font-bold text-white"
                      onClick={() => {
                        setIsBoardPickerOpen(false);
                      }}
                    >
                      /b/
                    </button>
                  </div>
                ) : (
                  <div className="p-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {boards.length === 0 ? (
                      <div className="col-span-3 sm:col-span-4 p-6 text-center text-gray-400">
                        Загрузка досок...
                      </div>
                    ) : (
                      boards.map((b) => (
                        <button
                          key={b.board}
                          className={`px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                            activeBoard === b.board
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-gray-900 text-gray-200 hover:bg-gray-800'
                          }`}
                          onClick={() => {
                            setActiveBoard(b.board);
                            setPage(1);
                            setIsBoardPickerOpen(false);
                          }}
                        >
                          /{b.board}/
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
