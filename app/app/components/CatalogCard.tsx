'use client';

import { Thread } from '../types';
import { MessageSquare, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFeed } from '../context/FeedContext';

interface CatalogCardProps {
  thread: Thread;
  openThreadId?: string;
  layoutId?: string;
  animateIn?: boolean;
}

export default function CatalogCard({ thread, openThreadId, layoutId, animateIn = true }: CatalogCardProps) {
  const { openThread } = useFeed();
  const file = thread.files && thread.files.length > 0 ? thread.files[0] : null;
  const getMediaUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    return `https://2ch.org${path}`;
  };

  // Strip HTML tags for preview text
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // Only run stripHtml on client side to avoid hydration mismatch if possible, 
  // or just use a simple regex for safety/speed. 
  // Since this is a client component, DOMParser is fine, but regex is faster and safer for SSR if needed.
  const simpleStrip = (html: string) => html.replace(/<[^>]*>?/gm, '');

  return (
    <div onClick={() => openThread(openThreadId || thread.num.toString())} className="block h-full cursor-pointer">
      <motion.div  
        layoutId={layoutId}
        initial={animateIn ? { opacity: 0, scale: 0.95 } : false}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-lg overflow-hidden hover:ring-1 hover:ring-orange-500 transition-all h-full flex flex-col relative group"
      >
        {/* Thumbnail */}
        <div className="aspect-video bg-black relative overflow-hidden">
          {file ? (
            <img 
              src={getMediaUrl(file.thumbnail)} 
              alt="thumbnail"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-700">
              <span className="text-xs">No Image</span>
            </div>
          )}
          
          {/* Stats Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex justify-between items-end text-xs text-white/90">
             <div className="flex items-center gap-1">
                <MessageSquare size={12} />
                <span>{thread.posts_count}</span>
             </div>
             {thread.files && thread.files.length > 1 && (
                 <span className="bg-orange-500/80 px-1 rounded text-[10px] font-bold">
                    +{thread.files.length - 1}
                 </span>
             )}
          </div>
        </div>

        {/* Content */}
        <div className="p-2 flex flex-col flex-1 gap-1">
            {thread.subject && (
                <h3 className="font-bold text-xs text-white line-clamp-2 leading-tight">
                    {thread.subject}
                </h3>
            )}
            <p className="text-[11px] text-gray-400 line-clamp-4 leading-snug break-words">
                {simpleStrip(thread.comment)}
            </p>
        </div>
      </motion.div>
    </div>
  );
}
