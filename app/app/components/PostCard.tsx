'use client';

import { Thread, File } from '../types';
import { motion } from 'framer-motion';
import { MessageSquare, Play } from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import { useFeed } from '../context/FeedContext';

interface PostCardProps {
  thread: Thread;
  onMediaClick?: (file: File) => void; // Made optional as we handle it internally now
  hideFooter?: boolean;
  openThreadId?: string;
  threadKey?: string;
  enableHide?: boolean;
  hideDivider?: boolean;
  compact?: boolean;
}

const getMediaUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return `https://2ch.life${path}`;
};

const getThumbnailUrl = (file: File) => {
  if (file.thumbnail.startsWith('http')) return file.thumbnail;
  return `https://2ch.life${file.thumbnail}`;
};

// Component for video thumbnail that opens fullscreen player
const VideoThumbnail = ({ file, className, layoutId }: { file: File, className: string, layoutId: string }) => {
  const { openFullscreen, activeLayoutId } = useMedia();

  return (
    <motion.div 
      layoutId={layoutId}
      className={`relative cursor-pointer group w-full h-full overflow-hidden bg-gray-900 ${className}`}
      style={{ opacity: activeLayoutId === layoutId ? 0 : 1 }}
      onClick={(e) => {
        e.stopPropagation();
        openFullscreen({
            type: 'video',
            src: getMediaUrl(file.path),
            currentTime: 0,
            poster: getThumbnailUrl(file),
            layoutId: layoutId
        });
      }}
    >
      <img
        src={getThumbnailUrl(file)}
        alt={file.displayname}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        loading="lazy"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onError={(e) => {
          // Fallback to full image if thumbnail fails
           e.currentTarget.src = getMediaUrl(file.path);
        }}
      />
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/40 backdrop-blur-sm p-4 rounded-full border border-white/10 shadow-xl group-hover:scale-110 group-hover:bg-cyan-500/80 transition-all duration-300">
           <Play size={32} fill="white" className="text-white ml-1" />
        </div>
      </div>
      
      {/* Duration Badge if available */}
      {file.duration && (
        <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white font-medium font-mono backdrop-blur-sm">
          {file.duration}
        </div>
      )}
      
      {/* Type Badge */}
      <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white/80 uppercase font-bold backdrop-blur-sm">
        {file.path.split('.').pop()}
      </div>
    </motion.div>
  );
};

export default function PostCard({ thread, onMediaClick, hideFooter = false, openThreadId, threadKey, enableHide = true, hideDivider = false, compact = false }: PostCardProps) {
  const files = thread.files || [];
  const { openFullscreen, activeLayoutId } = useMedia();
  const { openThread, hideThread } = useFeed();
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isVideo = (file: File) => {
    const ext = file.path.split('.').pop()?.toLowerCase();
    return ext === 'webm' || ext === 'mp4';
  };

  const getGridClass = (count: number) => {
    if (count === 1) return 'grid-cols-1';
    if (count >= 2) return 'grid-cols-2';
    return 'grid-cols-1';
  };

    const handleImageClick = (file: File) => {
      if (onMediaClick) {
        onMediaClick(file);
        return;
      }
      openFullscreen({
          type: 'image',
          src: getMediaUrl(file.path),
          alt: file.displayname,
          layoutId: `media-${thread.num}-${file.path}`
      });
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-black pb-6 ${compact ? 'mb-0' : 'mb-2'} ${hideDivider ? '' : 'border-b border-gray-800'}`}
    >
      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center text-gray-500 text-xs">
        <div className="flex items-center gap-2">
          <span
            className={`font-medium text-gray-400 ${enableHide ? 'hover:text-red-500 cursor-pointer transition-colors' : ''}`}
            onClick={
              enableHide
                ? (e) => {
                    e.stopPropagation();
                    if (confirm('Скрыть этот тред навсегда?')) {
                      hideThread(threadKey || thread.num.toString());
                    }
                  }
                : undefined
            }
            title={enableHide ? 'Скрыть тред' : undefined}
          >
            #{thread.num}
          </span>
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
                <div className={`w-full ${files.length > 1 ? 'aspect-square' : 'aspect-video max-h-[600px]'}`}>
                   <VideoThumbnail
                      file={file}
                      className="w-full h-full"
                      layoutId={`media-${thread.num}-${file.path}`}
                   />
                </div>
              ) : (
                <motion.img
                  layoutId={`media-${thread.num}-${file.path}`}
                  src={getMediaUrl(file.path)}
                  alt={file.displayname}
                  className={`w-full h-full bg-gray-900 cursor-zoom-in ${files.length > 1 ? 'object-cover aspect-square' : 'object-contain max-h-[600px]'}`}
                  onClick={() => handleImageClick(file)}
                  loading="lazy"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ opacity: activeLayoutId === `media-${thread.num}-${file.path}` ? 0 : 1 }}
                  onError={(e) => {
                     e.currentTarget.src = getThumbnailUrl(file);
                  }}
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

      {/* Footer */}
      {!hideFooter && (
        <div className="mt-4 px-4 flex justify-end items-center text-gray-500 text-xs">
            <button 
                onClick={() => openThread(openThreadId || thread.num.toString())}
                className="flex items-center gap-1.5 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-900"
            >
              <MessageSquare size={16} />
              <span>{thread.posts_count} Комментариев</span>
            </button>
        </div>
      )}
    </motion.div>
  );
}
