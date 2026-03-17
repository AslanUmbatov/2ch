'use client';

import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import PostCard from './components/PostCard';
import CatalogCard from './components/CatalogCard';
import { Thread } from './types';
import { get4ChanBoards, get4ChanCatalog, getThreads, FourChanBoard } from './services/api';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { RefreshCw, LayoutGrid, List, ArrowDownWideNarrow, ArrowUpNarrowWide, Star, HardDrive, Download, ArrowLeft } from 'lucide-react';
import { useScrollDirection } from './hooks/useScrollDirection';
import { useMedia } from './context/MediaContext';
import { useFeed } from './context/FeedContext';
import ThreadView from './components/ThreadView';

export default function Home() {
  const [source, setSource] = useState<'2ch' | '4chan'>('2ch');
  const [boards, setBoards] = useState<FourChanBoard[]>([]);
  const [activeBoard, setActiveBoard] = useState('b');
  const [favoriteBoards, setFavoriteBoards] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem('favoriteBoards4chan');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
    } catch {
      return [];
    }
  });

  const [recentBoards, setRecentBoards] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem('recentBoards4chan');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
    } catch {
      return [];
    }
  });
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
  const { activeThreadId, closeThread, hiddenThreads, isBoardPickerOpen, openBoardPicker, closeBoardPicker, isSavedMode, toggleSavedMode, savedThreads, refreshSavedThreads, activeThreadSave, deleteSavedThread, isDataSaver, toggleDataSaver } = useFeed();

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => {
      const next: 'feed' | 'catalog' = prev === 'feed' ? 'catalog' : 'feed';
      setPage((p) => {
        const currentItemsPerPage = prev === 'catalog' ? 20 : 10;
        const nextItemsPerPage = next === 'catalog' ? 20 : 10;
        const visibleCount = p * currentItemsPerPage;
        return Math.max(1, Math.ceil(visibleCount / nextItemsPerPage));
      });
      return next;
    });
  }, []);

  useEffect(() => {
    const handler = () => {
      toggleViewMode();
    };
    window.addEventListener('app:toggleViewMode', handler);
    return () => window.removeEventListener('app:toggleViewMode', handler);
  }, [toggleViewMode]);

  const getThreadKey = (t: Thread) => {
    return source === '2ch' ? `2ch:${t.num}` : `4chan:${activeBoard}:${t.num}`;
  };

  const getOpenThreadId = (t: Thread) => {
    return source === '2ch' ? t.num.toString() : `4chan:${activeBoard}:${t.num}`;
  };

  const currentBoardLabel = isSavedMode ? 'Сохранённые' : (source === '2ch' ? '/b/' : `/${activeBoard}/`);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('favoriteBoards4chan', JSON.stringify(favoriteBoards));
    } catch {}
  }, [favoriteBoards]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('recentBoards4chan', JSON.stringify(recentBoards));
    } catch {}
  }, [recentBoards]);

  const toggleFavorite = (boardCode: string) => {
    setFavoriteBoards((prev) => {
      if (prev.includes(boardCode)) return prev.filter((b) => b !== boardCode);
      return [boardCode, ...prev].slice(0, 50);
    });
  };

  const selectBoard = (boardCode: string) => {
    setActiveBoard(boardCode);
    setPage(1);
    closeBoardPicker();
    setRecentBoards((prev) => {
      const next = [boardCode, ...prev.filter((b) => b !== boardCode)];
      return next.slice(0, 15);
    });
  };

  const boardMap = useMemo(() => {
    const map = new Map<string, FourChanBoard>();
    for (const b of boards) map.set(b.board, b);
    return map;
  }, [boards]);

  type BoardSection = { title: string; items: FourChanBoard[] };

  const fourChanSections: BoardSection[] = useMemo(() => {
    const knownCategoryByBoard: Record<string, string> = {
      a: 'Japanese Culture',
      c: 'Japanese Culture',
      m: 'Japanese Culture',
      cgl: 'Japanese Culture',
      cm: 'Japanese Culture',
      f: 'Japanese Culture',
      n: 'Japanese Culture',
      jp: 'Japanese Culture',
      vt: 'Video Games',
      v: 'Video Games',
      vg: 'Video Games',
      vm: 'Video Games',
      vmg: 'Video Games',
      vr: 'Video Games',
      vp: 'Video Games',
      vst: 'Video Games',
      g: 'Technology',
      t: 'Technology',
      e: 'Technology',
      wsg: 'Technology',
      sci: 'Technology',
      tv: 'Television & Film',
      k: 'Television & Film',
      o: 'Television & Film',
      pw: 'Television & Film',
      lit: 'Interests',
      his: 'Interests',
      int: 'Interests',
      out: 'Interests',
      toy: 'Interests',
      trv: 'Interests',
      ck: 'Interests',
      fit: 'Interests',
      mu: 'Interests',
      fa: 'Interests',
      '3': 'Creative',
      gd: 'Creative',
      diy: 'Creative',
      wtg: 'Creative',
      ic: 'Creative',
      w: 'Creative',
      biz: 'Other',
      pol: 'Other',
      soc: 'Other',
      s4s: 'Other',
      b: 'Other',
      r9k: 'Other',
      gif: 'Other',
      h: 'Adult',
      hc: 'Adult',
      hm: 'Adult',
      hq: 'Adult',
      hr: 'Adult',
      hs: 'Adult',
      u: 'Adult',
      d: 'Adult',
      y: 'Adult'
    };

    const categoryOrder = [
      'Избранные',
      'Недавние',
      'Japanese Culture',
      'Video Games',
      'Technology',
      'Television & Film',
      'Interests',
      'Creative',
      'Other',
      'Adult'
    ];

    const isAdult = (code: string) => knownCategoryByBoard[code] === 'Adult';

    const favorites = favoriteBoards
      .map((c) => boardMap.get(c))
      .filter((b): b is FourChanBoard => Boolean(b));

    const recents = recentBoards
      .filter((c) => !favoriteBoards.includes(c))
      .map((c) => boardMap.get(c))
      .filter((b): b is FourChanBoard => Boolean(b));

    const byCategory = new Map<string, FourChanBoard[]>();
    for (const b of boards) {
      const category = knownCategoryByBoard[b.board] || 'Other';
      const list = byCategory.get(category) || [];
      list.push(b);
      byCategory.set(category, list);
    }

    for (const [cat, list] of byCategory) {
      list.sort((a, b) => a.board.localeCompare(b.board));
      if (cat !== 'Adult') continue;
      list.sort((a, b) => a.board.localeCompare(b.board));
    }

    const sections: BoardSection[] = [];
    if (favorites.length > 0) {
      sections.push({ title: 'Избранные', items: favorites });
    }
    if (recents.length > 0) {
      sections.push({ title: 'Недавние', items: recents });
    }

    for (const cat of categoryOrder) {
      if (cat === 'Избранные' || cat === 'Недавние') continue;
      const items = byCategory.get(cat) || [];
      if (items.length === 0) continue;
      if (cat === 'Adult' && favorites.length === 0 && recents.length === 0) {
        if (items.length === 0) continue;
      }
      sections.push({ title: cat, items });
    }

    const hasAdult = sections.some((s) => s.title === 'Adult');
    if (!hasAdult) {
      const adult = boards.filter((b) => isAdult(b.board));
      if (adult.length > 0) sections.push({ title: 'Adult', items: adult });
    }

    return sections;
  }, [boards, boardMap, favoriteBoards, recentBoards]);

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
    if (isSavedMode) return;
    fetchThreads();
  }, [source, activeBoard, isSavedMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [source, activeBoard, isSavedMode]);

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
      <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full ${viewMode === 'catalog' ? 'max-w-5xl' : 'max-w-[600px]'} z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50 transition-transform duration-300 ease-in-out ${isSavedMode ? '-translate-y-full' : (scrollDirection === 'down' || fullscreenItem ? '-translate-y-full' : 'translate-y-0')}`}>
         <div className="flex items-center gap-2 min-w-0">
           <button
             onClick={() => {
               if (isSavedMode) return;
               setSource(prev => prev === '2ch' ? '4chan' : '2ch');
               setError(null);
             }}
             className={`font-bold tracking-tighter ${source === '4chan' ? 'text-green-400' : 'text-orange-500'} text-xl ${isSavedMode ? 'opacity-50' : ''}`}
             title={isSavedMode ? 'Недоступно в режиме сохранённых' : undefined}
           >
             {source === '2ch' ? '2ch' : '4chan'}
           </button>

           <button
             onClick={() => {
               if (isSavedMode) return;
               openBoardPicker();
             }}
             className={`text-xl font-bold tracking-tighter text-white hover:text-gray-200 transition-colors truncate ${isSavedMode ? 'opacity-50' : ''}`}
             title={isSavedMode ? 'Сохранённые треды' : 'Выбрать доску'}
           >
             {currentBoardLabel}
           </button>
         </div>
         <div className="flex items-center gap-2">
             {activeThreadId && !activeThreadId.startsWith('local:') ? (
               <button
                 onClick={() => activeThreadSave?.()}
                 className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
                 title="Скачать тред"
                 disabled={!activeThreadSave}
               >
                 <Download size={20} />
               </button>
             ) : (
               <button
                 onClick={toggleSavedMode}
                 className={`p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200 ${isSavedMode ? 'text-cyan-300' : ''}`}
                 title={isSavedMode ? 'Выйти из сохранённых' : 'Сохранённые треды'}
               >
                 <HardDrive size={20} />
               </button>
             )}
             {isSavedMode ? null : (
             <button
              onClick={toggleViewMode}
               className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
               title={viewMode === 'feed' ? "Каталог" : "Лента"}
             >
               {viewMode === 'feed' ? <LayoutGrid size={20} /> : <List size={20} />}
             </button>
             )}
             {isSavedMode ? null : (
             <button
               onClick={toggleDataSaver}
               className={`p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200 ${isDataSaver ? 'text-cyan-300' : ''}`}
               title={isDataSaver ? 'Экономия трафика: включена' : 'Экономия трафика: выключена'}
             >
               <span className="text-[11px] font-extrabold tracking-tight">
                 {isDataSaver ? 'ECO' : 'HD'}
               </span>
             </button>
             )}
             {isSavedMode ? null : (
             <button
               onClick={() => setSortMode(prev => prev === 'default' ? 'date_desc' : 'default')}
               className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
               title={sortMode === 'default' ? "Сортировать по дате" : "Стандартная сортировка"}
             >
               {sortMode === 'default' ? <ArrowDownWideNarrow size={20} /> : <ArrowUpNarrowWide size={20} />}
             </button>
             )}
             <button 
               onClick={isSavedMode ? refreshSavedThreads : fetchThreads}
               className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
               title={isSavedMode ? 'Обновить список сохранённых' : 'Обновить'}
             >
               <RefreshCw size={20} className={!isSavedMode && loading ? "animate-spin" : ""} />
             </button>
         </div>
      </header>
      <motion.div 
        layout
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

           {!error && (
             <LayoutGroup>
               <motion.div
                 layout
                 transition={{ type: 'spring', damping: 26, stiffness: 260 }}
                 className={viewMode === 'feed' ? 'flex flex-col' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'}
               >
                 {visibleThreads.map((thread) => {
                   const key = getThreadKey(thread);
                   return (
                     <motion.div
                       key={key}
                       layout
                       transition={{ type: 'spring', damping: 26, stiffness: 260 }}
                       className={viewMode === 'feed' ? '' : 'h-full'}
                     >
                       {viewMode === 'feed' ? (
                         <PostCard
                           thread={thread}
                           openThreadId={getOpenThreadId(thread)}
                           threadKey={key}
                           truncateText={true}
                           maxTextChars={400}
                           animateIn={false}
                         />
                       ) : (
                         <CatalogCard
                           thread={thread}
                           openThreadId={getOpenThreadId(thread)}
                           animateIn={false}
                         />
                       )}
                     </motion.div>
                   );
                 })}
               </motion.div>
             </LayoutGroup>
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
        {!isSavedMode ? null : (
          <motion.div
            className="fixed inset-0 z-[35] bg-black flex justify-center"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            <div className="w-full max-w-[600px] border-x border-gray-900 h-full relative flex flex-col bg-black text-white font-sans">
              <header className="absolute top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50">
                <button
                  onClick={toggleSavedMode}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  title="Назад"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-lg font-bold tracking-tighter text-white truncate px-4 flex-1 text-center">
                  Сохранённые
                </h2>
                <button
                  onClick={refreshSavedThreads}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
                  title="Обновить"
                >
                  <RefreshCw size={20} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto pt-16 pb-20">
                {savedThreads.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    Нет сохранённых тредов
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {savedThreads.map((item) => {
                      const sizeMb = item.sizeBytes > 0 ? (item.sizeBytes / 1024 / 1024).toFixed(1) : '0.0';
                      return (
                        <div key={item.key} className="relative">
                          <div className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-sm border border-gray-800 text-white/80 text-[10px] font-mono px-2 py-1 rounded-full">
                            {sizeMb} MB
                          </div>
                          <PostCard
                            thread={item.thread}
                            openThreadId={`local:${item.key}`}
                            threadKey={item.key}
                            enableHide={false}
                            onThreadNumberClick={async () => {
                              const ok = confirm(`Удалить сохранённый тред #${item.id}?\nБудут удалены медиа и данные треда.`);
                              if (!ok) return;
                              await deleteSavedThread(item.key);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBoardPickerOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBoardPicker}
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
                  onClick={closeBoardPicker}
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
                        closeBoardPicker();
                      }}
                    >
                      /b/
                    </button>
                  </div>
                ) : (
                  <div className="py-2">
                    {boards.length === 0 ? (
                      <div className="p-6 text-center text-gray-400">
                        Загрузка досок...
                      </div>
                    ) : (
                      fourChanSections.map((section) => (
                        <div key={section.title}>
                          <div className="px-4 pt-4 pb-2 text-[11px] uppercase tracking-wider text-gray-400">
                            {section.title}
                          </div>
                          <div className="px-2">
                            {section.items.map((b) => (
                              <div
                                key={b.board}
                                className={`flex items-center gap-2 px-2 py-2 rounded-xl transition-colors ${
                                  activeBoard === b.board ? 'bg-green-500/10' : 'hover:bg-gray-900'
                                }`}
                              >
                                <button
                                  className="flex-1 text-left min-w-0"
                                  onClick={() => selectBoard(b.board)}
                                >
                                  <div className="flex items-baseline gap-3 min-w-0">
                                    <div className={`font-extrabold tracking-tight ${activeBoard === b.board ? 'text-green-300' : 'text-white'}`}>
                                      /{b.board}/
                                    </div>
                                    <div className="text-sm text-gray-400 truncate">
                                      {b.title}
                                    </div>
                                  </div>
                                  {b.meta_description ? (
                                    <div className="text-[11px] text-gray-500 line-clamp-1">
                                      {b.meta_description}
                                    </div>
                                  ) : null}
                                </button>

                                <button
                                  className={`p-2 rounded-full transition-colors ${
                                    favoriteBoards.includes(b.board)
                                      ? 'text-yellow-300 hover:bg-yellow-500/10'
                                      : 'text-gray-500 hover:bg-gray-800'
                                  }`}
                                  onClick={() => toggleFavorite(b.board)}
                                  title={favoriteBoards.includes(b.board) ? 'Убрать из избранного' : 'В избранное'}
                                >
                                  <Star size={18} fill={favoriteBoards.includes(b.board) ? 'currentColor' : 'none'} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
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
