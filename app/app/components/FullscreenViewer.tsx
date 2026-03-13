'use client';

import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';
import FullscreenPlayer from './FullscreenPlayer';
import { FullscreenItem } from '../context/MediaContext';
import { useMediaDownloader } from '../hooks/useMediaDownloader';
import { useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

interface FullscreenViewerProps {
  item: FullscreenItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasMultiple: boolean;
}

function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [displaySrc, setDisplaySrc] = useState(src);

  useEffect(() => {
    setDisplaySrc(src);
  }, [src]);

  return (
    <motion.img
      src={displaySrc}
      alt={alt}
      className="max-w-full max-h-full object-contain rounded-lg shadow-lg touch-none"
      drag={false}
      onError={() => {
        if (displaySrc.startsWith('https://i.4cdn.org/')) {
          setDisplaySrc(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(displaySrc)}`);
        }
      }}
    />
  );
}

export default function FullscreenViewer({ item, onClose, onNext, onPrev, hasMultiple }: FullscreenViewerProps) {
  const { downloadMedia, isDownloading } = useMediaDownloader();
  const y = useMotionValue(0);
  const x = useMotionValue(0); // Track X for free movement
  const controls = useAnimation();
  
  // Transform values based on drag distance
  const scale = useTransform(y, [-200, 0, 200], [0.85, 1, 0.85]); // Subtle scale

  // Lock scroll when modal is open
  useEffect(() => {
    if (item) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [item]);

  // Handle Drag End with Velocity
  const handleDragEnd = async (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipeThreshold = 150; // Increased threshold
    const velocityThreshold = 500;
    const horizontalThreshold = 100;

    // Check if dismissed by distance or velocity (Vertical)
    if (
      Math.abs(offset.y) > swipeThreshold || 
      Math.abs(velocity.y) > velocityThreshold
    ) {
      // Just close, layoutId will handle the shrink animation
      onClose();
    } else if (hasMultiple && Math.abs(offset.x) > horizontalThreshold) {
      // Horizontal swipe
      if (offset.x > 0) {
        onPrev();
      } else {
        onNext();
      }
      // Reset position immediately to prepare for next item
      controls.set({ x: 0, y: 0, scale: 1 });
    } else {
      // Snap back to center
      controls.start({ x: 0, y: 0, scale: 1 });
    }
  };

  return (
    <AnimatePresence>
        {!item ? null : (
            <>
                <motion.div 
                    key="media-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }} 
                    className="fixed inset-0 z-50 backdrop-blur-2xl bg-black/50"
                    onClick={onClose}
                />
                <div 
                    key="media-content-wrapper"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                >
                    <motion.div 
                        key={item.src} // Add key to force re-render on item change for correct layoutId and animation
                        layoutId={item.layoutId}
                        animate={controls} 
                        initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                        onLayoutAnimationComplete={() => {
                            controls.set({ x: 0, y: 0, opacity: 1, scale: 1 });
                        }}
                        style={{ y, x, scale }}
                        drag={true} // Enable drag in all directions
                        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        dragElastic={0.1} // Viscous feel
                        onDragEnd={handleDragEnd}
                        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto touch-none"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {item.type === 'video' ? (
                             <div className="w-full h-full flex items-center justify-center">
                                <FullscreenPlayer 
                                    src={item.src}
                                    poster={item.poster}
                                    initialTime={item.currentTime}
                                    onClose={onClose}
                                />
                             </div>
                        ) : (
                            <ImageWithFallback
                                src={item.src}
                                alt={item.alt || 'Full size image'}
                            />
                        )}
                        
                        {/* Download button */}
                        <motion.button 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-8 right-6 z-50 text-white/90 hover:text-white p-3 bg-black/40 rounded-full backdrop-blur-md transition-colors hover:bg-black/60"
                            onClick={(e) => {
                                e.stopPropagation();
                                downloadMedia(item.src);
                            }}
                            title="Скачать"
                            disabled={isDownloading}
                        >
                            {isDownloading ? <Loader2 size={28} className="animate-spin" /> : <Download size={28} />}
                        </motion.button>

                        {item.alt && item.type === 'image' && (
                            <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm pointer-events-none">
                                {item.alt}
                            </div>
                        )}
                    </motion.div>
                </div>
            </>
        )}
    </AnimatePresence>
  );
}
