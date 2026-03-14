'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Thread, File } from '../types';
import { getThread } from '../services/api';
import PostCard from '../components/PostCard';
import { ArrowLeft, RefreshCw, Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useMedia } from '../context/MediaContext';
import { Capacitor } from '@capacitor/core';
import { estimateThreadSizeBytes, saveThreadLocally, type SavedThreadPost } from '../services/offline';

function ThreadContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState({ done: 0, total: 0, percent: 0, label: '' });
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

  const handleSaveThread = async () => {
    if (!id) return;
    if (!Capacitor.isNativePlatform()) {
      alert('Локальное сохранение доступно только на устройстве (Android/iOS).');
      return;
    }
    if (isSaving || loading) return;
    if (!thread || posts.length === 0) return;

    const key = `2ch:${id}`;
    const sizeBytes = estimateThreadSizeBytes(posts as SavedThreadPost[]);
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
        source: '2ch',
        id,
        thread: clonedThread,
        posts: clonedPosts,
        onProgress: (p) => setSaveProgress({ done: p.done, total: p.total, percent: p.percent, label: p.label })
      });
    } finally {
      setIsSaving(false);
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
    <div className="w-full max-w-[600px] border-x border-gray-900 min-h-screen relative pt-16">
         <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] z-30 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50 transition-transform duration-300 ease-in-out ${scrollDirection === 'down' || fullscreenItem ? '-translate-y-full' : 'translate-y-0'}`}>
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold tracking-tighter text-white truncate px-4 flex-1 text-center">
              {thread?.subject || `Тред #${id}`}
            </h1>
            <div className="flex items-center gap-1">
              <button
                onClick={handleSaveThread}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200 disabled:opacity-50"
                title="Сохранить локально"
                disabled={isSaving || loading}
              >
                {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
              </button>
              <button 
                onClick={fetchThread}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200"
                title="Обновить"
              >
                <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
         </header>

         {!isSaving ? null : (
           <motion.div
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="fixed top-14 left-1/2 -translate-x-1/2 z-40 w-full max-w-[600px] px-4"
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
