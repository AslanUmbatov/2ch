'use client';

import { useRef, useEffect } from 'react';
import { useMedia } from '../context/MediaContext';
import { Maximize2 } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean; // We might ignore this if we want strict singleton logic, or only allow if it's the first one?
  loop?: boolean;
}

export default function VideoPlayer({ src, poster, className, autoplay = false, loop = true }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playingVideoId, setPlayingVideoId, openFullscreen } = useMedia();

  // Unique ID for this video instance (using src as ID is simplest for now)
  const videoId = src;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If this is NOT the currently playing video, and it IS playing, pause it.
    // Also if 'fullscreen' mode is active, pause inline players.
    if (playingVideoId !== videoId && !video.paused) {
      video.pause();
    }
  }, [playingVideoId, videoId]);

  const handlePlay = () => {
    // When user plays this video, notify context to pause others
    setPlayingVideoId(videoId);
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
        // Pause inline player before opening modal to avoid double audio
        videoRef.current.pause();
        openFullscreen({
            type: 'video',
            src,
            currentTime: videoRef.current.currentTime,
            poster
        });
    }
  };

  return (
    <div className={`relative group ${className || ''}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain bg-black"
        controls
        playsInline
        preload="metadata"
        autoPlay={autoplay}
        onPlay={handlePlay}
        onEnded={(e) => {
            if (!loop) {
                // Return to first frame
                e.currentTarget.currentTime = 0;
                // e.currentTarget.pause(); // Already paused by default on ended if not loop?
            }
        }}
        loop={loop}
        // Removed 'muted' attribute to satisfy "Audio Logic" requirement
      />
      
      {/* Expand Button Overlay */}
      <button 
        onClick={handleExpand}
        className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 pointer-events-auto"
        title="Fullscreen"
      >
        <Maximize2 size={16} />
      </button>
    </div>
  );
}
