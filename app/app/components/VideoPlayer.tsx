'use client';

import { useRef, useState, useEffect } from 'react';
import { 
  MediaPlayer, 
  MediaProvider, 
  Poster, 
  type MediaPlayerInstance,
} from '@vidstack/react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

// Import Vidstack styles
import '@vidstack/react/player/styles/base.css';
// import '@vidstack/react/player/styles/default/theme.css'; // We don't want default theme, we want custom.
// Actually, using DefaultLayout is easiest way to get controls, but user wants "custom semi-transparent".
// So we will build custom controls overlay.

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean; // Autoplay on mount/view?
  loop?: boolean;
}

export default function VideoPlayer({ src, poster, className, autoplay = false, loop = true }: VideoPlayerProps) {
  const player = useRef<MediaPlayerInstance>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay on view logic (IntersectionObserver)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play if in view
            player.current?.play();
            setIsPlaying(true);
          } else {
            // Pause if out of view
            player.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 } // 60% visible to play
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (player.current) {
      player.current.muted = !player.current.muted;
      setIsMuted(player.current.muted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (player.current) {
          if (player.current.paused) {
              player.current.play();
              setIsPlaying(true);
          } else {
              player.current.pause();
              setIsPlaying(false);
          }
      }
  };

  return (
    <div 
        ref={containerRef}
        className={`relative group overflow-hidden rounded-lg bg-black ${className}`}
        onMouseEnter={() => {
            // Optional: Auto-play on hover if not already playing from intersection
             player.current?.play();
             setIsPlaying(true);
        }}
    >
      <MediaPlayer 
        ref={player}
        src={src} 
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline 
        muted={isMuted}
        loop={loop}
        className="w-full h-full object-contain bg-black"
        onTimeUpdate={(detail) => {
            // Simple progress update
            const p = (detail.currentTime / detail.duration) * 100;
            setProgress(p);
        }}
        onVolumeChange={(detail) => {
            setIsMuted(detail.muted);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <MediaProvider>
          {poster && (
            <Poster 
                className="absolute inset-0 block h-full w-full bg-black object-cover opacity-0 data-[visible]:opacity-100 transition-opacity duration-200" 
                src={poster} 
                alt="Video poster" 
            />
          )}
        </MediaProvider>

        {/* Custom Controls Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {/* Backdrop Blur Container for Controls */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-2 flex items-center gap-3 pointer-events-auto border border-white/10 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                
                {/* Play/Pause */}
                <button 
                    onClick={togglePlay}
                    className="text-white hover:text-orange-500 transition-colors p-1"
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>

                {/* Progress Bar */}
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative group/progress cursor-pointer">
                    <div 
                        className="h-full bg-orange-500 absolute left-0 top-0 transition-all duration-100"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Mute Toggle */}
                <button 
                    onClick={toggleMute}
                    className="text-white hover:text-orange-500 transition-colors p-1"
                >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
            </div>
        </div>

        {/* Center Play Button (if paused and not hovering/intersecting) */}
        {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-full border border-white/10 shadow-xl">
                    <Play size={32} fill="white" className="text-white ml-1" />
                </div>
            </div>
        )}
      </MediaPlayer>
    </div>
  );
}
