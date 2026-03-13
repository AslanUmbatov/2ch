'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Loader2, Download, Maximize2, X } from 'lucide-react';
import { useMediaDownloader } from '../hooks/useMediaDownloader';
import { useMedia } from '../context/MediaContext';

interface FullscreenPlayerProps {
  src: string;
  poster?: string;
  initialTime?: number;
  onClose: () => void;
}

export default function FullscreenPlayer({ src, poster, initialTime = 0, onClose }: FullscreenPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { downloadMedia, isDownloading } = useMediaDownloader();
  const { isVideoLandscape, toggleVideoLandscape } = useMedia();

  // Initialize video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial time
    video.currentTime = initialTime;
    // Force unmute and max volume for mobile
    video.muted = false;
    video.volume = 1.0;
    setIsMuted(false);
    
    // Attempt play immediately
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.warn("Autoplay prevented:", error);
          setIsPlaying(false);
        });
    }

    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [initialTime, src]);

  // Handle controls visibility
  const handleInteraction = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      handleInteraction();
    } else {
      setShowControls(true);
    }
  }, [isPlaying]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    handleInteraction();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
    handleInteraction();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isSeeking) return;
    setCurrentTime(video.currentTime);
    setDuration(video.duration || 0);
  };

  const seekToClientX = (clientX: number) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (!video || !progressBar || !video.duration || !isFinite(video.duration)) return;

    const rect = progressBar.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = rect.width > 0 ? Math.max(0, Math.min(1, x / rect.width)) : 0;

    video.currentTime = percentage * video.duration;
    setCurrentTime(video.currentTime);
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    seekToClientX(e.clientX);
  };

  const handleSeekPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setIsSeeking(true);
    seekToClientX(e.clientX);
  };

  const handleSeekPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isSeeking) return;
    e.stopPropagation();
    e.preventDefault();
    seekToClientX(e.clientX);
  };

  const handleSeekPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isSeeking) return;
    e.stopPropagation();
    e.preventDefault();
    setIsSeeking(false);
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <div className="relative w-full h-full">
      <div
        className="relative w-full h-full flex items-center justify-center"
        onMouseMove={handleInteraction}
        onTouchStart={handleInteraction}
        onClick={(e) => {
          togglePlay(e);
        }}
        style={
          isVideoLandscape
            ? {
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100vh',
                height: '100vw',
                transform: 'translate(-50%, -50%) rotate(90deg)',
                transformOrigin: 'center'
              }
            : undefined
        }
      >
        {/* Close Button (Top Right) */}
        <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50 bg-black/50 rounded-full backdrop-blur-md transition-colors"
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <X size={24} />
        </button>

        {/* Video Element */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
          playsInline
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onWaiting={() => setIsBuffering(true)}
          onCanPlay={() => setIsBuffering(false)}
          onEnded={() => {
            setIsPlaying(false);
            setShowControls(true);
            if (videoRef.current) videoRef.current.currentTime = 0;
          }}
        />
        
        {/* Loading State */}
        <AnimatePresence>
          {isBuffering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-black/40 backdrop-blur-sm p-4 rounded-full">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Play/Pause Animation (optional, like YouTube) */}
        <AnimatePresence>
          {!isPlaying && !isBuffering && (
             <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.5 }}
               className="absolute inset-0 flex items-center justify-center pointer-events-none"
             >
                <div className="bg-black/40 backdrop-blur-md p-6 rounded-full border border-white/10">
                   <Play className="w-12 h-12 text-white fill-white" />
                </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Controls Overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-4xl mx-auto w-full space-y-4">
                 {/* Progress Bar Container */}
                 <div 
                    ref={progressBarRef}
                    className="relative w-full h-4 group cursor-pointer flex items-center"
                    onClick={handleSeekClick}
                    onPointerDown={handleSeekPointerDown}
                    onPointerMove={handleSeekPointerMove}
                    onPointerUp={handleSeekPointerUp}
                    onPointerCancel={handleSeekPointerUp}
                 >
                    {/* Background Line */}
                    <div className="absolute w-full h-[2px] bg-white/20 group-hover:h-[4px] transition-all duration-200 rounded-full" />
                    
                    {/* Active Progress */}
                    <motion.div 
                        className="absolute h-[2px] bg-cyan-400 group-hover:h-[4px] transition-all duration-200 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        style={{ width: `${progressPercent}%` }}
                    />
                    
                    {/* Thumb (only visible on hover) */}
                    <div 
                        className="absolute h-3 w-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg scale-0 group-hover:scale-100"
                        style={{ left: `${progressPercent}%`, transform: 'translateX(-50%)' }}
                    />
                 </div>

                 {/* Controls Row */}
                 <div className="flex items-center justify-between backdrop-blur-md bg-white/5 rounded-2xl px-4 py-3 border border-white/10 shadow-lg">
                    <div className="flex items-center gap-4">
                       <button 
                          onClick={() => togglePlay()}
                          className="text-white/90 hover:text-white hover:scale-110 transition-all active:scale-95"
                       >
                          {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
                       </button>

                       <div className="flex items-center gap-2 group/volume">
                          <button 
                             onClick={toggleMute}
                             className="text-white/80 hover:text-white transition-colors"
                          >
                             {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                          </button>
                       </div>
                       
                       <span className="text-xs font-mono text-white/60">
                          {formatTime(currentTime)} / {formatTime(duration)}
                       </span>
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleVideoLandscape();
                            }}
                            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            title="Полный экран"
                        >
                            <Maximize2 size={20} />
                        </button>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                downloadMedia(src);
                            }}
                            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            title="Скачать"
                            disabled={isDownloading}
                        >
                            {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                        </button>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    );
  }

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
