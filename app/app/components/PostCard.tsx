'use client';

import { Thread, File } from '../types';
import { motion } from 'framer-motion';
import { Download, MessageSquare, Eye, FileText } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface PostCardProps {
  thread: Thread;
  onMediaClick: (file: File) => void;
  hideFooter?: boolean;
}

export default function PostCard({ thread, onMediaClick, hideFooter = false }: PostCardProps) {
  const files = thread.files || [];
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMediaUrl = (path: string) => `https://2ch.org${path}`;

  const isVideo = (file: File) => {
    const ext = file.path.split('.').pop()?.toLowerCase();
    return ext === 'webm' || ext === 'mp4';
  };

  const getGridClass = (count: number) => {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-2'; // 2 top, 1 bottom stretched or similar. Let's stick to simple grid.
    // Actually simple grid-cols-2 is often fine for 2-4 images.
    // For 3 images, maybe first one full width? Or just grid-cols-2 and last one takes full?
    // Let's use auto-fit or specific classes.
    if (count >= 2) return 'grid-cols-2';
    return 'grid-cols-1';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-black border-b border-gray-800 pb-6 mb-2"
    >
      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center text-gray-500 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-400">#{thread.num}</span>
          <span>•</span>
          <span>{formatDate(thread.timestamp)}</span>
        </div>
      </div>

      {/* Media Content */}
      {files.length > 0 && (
        <div className={`mb-4 grid gap-1 ${getGridClass(files.length)}`}>
          {files.map((file, idx) => (
            <div 
                key={idx} 
                className={`relative w-full ${files.length === 3 && idx === 0 ? 'col-span-2' : ''}`}
            >
              {isVideo(file) ? (
                <video
                  src={getMediaUrl(file.path)}
                  controls
                  className={`w-full h-full object-cover bg-gray-900 ${files.length > 1 ? 'aspect-square' : 'max-h-[600px] object-contain'}`}
                  poster={getMediaUrl(file.thumbnail)}
                  preload="metadata"
                />
              ) : (
                <img
                  src={getMediaUrl(file.path)}
                  alt={file.displayname}
                  className={`w-full h-full bg-gray-900 cursor-zoom-in ${files.length > 1 ? 'object-cover aspect-square' : 'object-contain max-h-[600px]'}`}
                  onClick={() => onMediaClick(file)}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Text Content */}
      <div className="px-4">
        {thread.subject && (
          <h3 className="font-bold text-white text-lg mb-2 leading-tight">
            {thread.subject}
          </h3>
        )}
        <div
          className="text-gray-300 text-sm leading-relaxed break-words whitespace-pre-wrap [&>a]:text-blue-400 [&>span.spoiler]:bg-gray-800 [&>span.spoiler]:text-transparent [&>span.spoiler:hover]:text-white transition-colors"
          dangerouslySetInnerHTML={{ __html: thread.comment }}
        />
      </div>

      {/* Footer Actions */}
      {!hideFooter && (
        <div className="px-4 mt-4 flex items-center justify-between text-gray-500">
          <div className="flex items-center gap-6">
            <Link href={`/thread/${thread.num}`} className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <MessageSquare size={18} />
              <span className="text-xs font-medium">{thread.posts_count}</span>
            </Link>
            <div className="flex items-center gap-1.5">
              <Eye size={18} />
              <span className="text-xs font-medium">{thread.views}</span>
            </div>
          </div>
          {/* ... */}
        </div>
      )}
    </motion.div>
  );
}
