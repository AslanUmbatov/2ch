'use client';

import { createContext, useContext, useState, ReactNode, useRef } from 'react';
import dynamic from 'next/dynamic';

const FullscreenViewer = dynamic(() => import('../components/FullscreenViewer'), {
  ssr: false,
});

export type MediaType = 'video' | 'image';

export interface FullscreenItem {
  type: MediaType;
  src: string;
  poster?: string; // For video
  currentTime?: number; // For video
  alt?: string; // For image
  layoutId?: string; // For shared element transition
}

interface MediaContextType {
  playingVideoId: string | null;
  setPlayingVideoId: (id: string | null) => void;
  // Modal State
  fullscreenItem: FullscreenItem | null;
  playlist: FullscreenItem[];
  currentIndex: number;
  openFullscreen: (item: FullscreenItem, playlist?: FullscreenItem[]) => void;
  closeFullscreen: () => void;
  nextMedia: () => void;
  prevMedia: () => void;
  updateFullscreenTime: (time: number) => void;
  // Shared Element State
  activeLayoutId: string | null;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [fullscreenItem, setFullscreenItem] = useState<FullscreenItem | null>(null);
  const [playlist, setPlaylist] = useState<FullscreenItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [activeLayoutId, setActiveLayoutId] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openFullscreen = (item: FullscreenItem, newPlaylist: FullscreenItem[] = []) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
    }

    setFullscreenItem(item);
    if (newPlaylist.length > 0) {
      setPlaylist(newPlaylist);
      // Find index by checking src or some unique ID
      const index = newPlaylist.findIndex(p => p.src === item.src);
      setCurrentIndex(index !== -1 ? index : 0);
    } else {
      setPlaylist([item]);
      setCurrentIndex(0);
    }

    if (item.layoutId) {
      setActiveLayoutId(item.layoutId);
    }
    // Pause other videos when opening fullscreen
    if (item.type === 'video') {
        setPlayingVideoId('fullscreen'); 
    } else {
        // If opening image, we might want to pause background videos too?
        // Let's pause everything just in case
        setPlayingVideoId(null);
    }
  };

  const closeFullscreen = () => {
    setFullscreenItem(null);
    setPlaylist([]);
    setCurrentIndex(-1);
    setPlayingVideoId(null);
    // Delay clearing activeLayoutId to allow exit animation to complete
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveLayoutId(null);
      closeTimeoutRef.current = null;
    }, 300); // Match this with your animation duration
  };

  const nextMedia = () => {
    if (playlist.length <= 1) return;
    const newIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(newIndex);
    setFullscreenItem(playlist[newIndex]);
  };

  const prevMedia = () => {
    if (playlist.length <= 1) return;
    const newIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(newIndex);
    setFullscreenItem(playlist[newIndex]);
  };

  const updateFullscreenTime = (time: number) => {
    if (fullscreenItem && fullscreenItem.type === 'video') {
      setFullscreenItem({ ...fullscreenItem, currentTime: time });
    }
  };

  return (
    <MediaContext.Provider value={{ 
      playingVideoId, 
      setPlayingVideoId, 
      fullscreenItem,
      playlist,
      currentIndex, 
      openFullscreen, 
      closeFullscreen,
      nextMedia,
      prevMedia,
      updateFullscreenTime,
      activeLayoutId
    }}>
      {children}
      {/* Fullscreen Modal Overlay */}
      <FullscreenViewer 
        item={fullscreenItem}
        onClose={closeFullscreen}
        onNext={nextMedia}
        onPrev={prevMedia}
        hasMultiple={playlist.length > 1}
      />
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}
