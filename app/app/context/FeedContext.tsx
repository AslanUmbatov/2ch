'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { SavedThreadMeta } from '../services/offline';
import { deleteSavedThread as deleteSavedThreadImpl, listSavedThreads } from '../services/offline';

interface FeedContextType {
  activeThreadId: string | null;
  openThread: (threadId: string) => void;
  closeThread: () => void;
  openSavedThread: (key: string) => void;
  activeThreadSave: (() => void) | null;
  setActiveThreadSave: (fn: (() => void) | null) => void;
  deleteSavedThread: (key: string) => Promise<void>;
  hiddenThreads: string[];
  hideThread: (threadId: string) => void;
  isBoardPickerOpen: boolean;
  openBoardPicker: () => void;
  closeBoardPicker: () => void;
  repliesOverlay: { threadId: string; postNum: string } | null;
  openRepliesOverlay: (threadId: string, postNum: string | number) => void;
  closeRepliesOverlay: () => void;
  isSavedMode: boolean;
  toggleSavedMode: () => void;
  savedThreads: SavedThreadMeta[];
  refreshSavedThreads: () => void;
  isDataSaver: boolean;
  toggleDataSaver: () => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: ReactNode }) {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isBoardPickerOpen, setIsBoardPickerOpen] = useState(false);
  const [repliesOverlay, setRepliesOverlay] = useState<{ threadId: string; postNum: string } | null>(null);
  const [isSavedMode, setIsSavedMode] = useState(false);
  const [savedThreads, setSavedThreads] = useState<SavedThreadMeta[]>(() => listSavedThreads());
  const [activeThreadSave, setActiveThreadSave] = useState<(() => void) | null>(null);
  const [isDataSaver, setIsDataSaver] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const raw = localStorage.getItem('dataSaverMode');
      return raw === '1' || raw === 'true';
    } catch {
      return false;
    }
  });
  const [hiddenThreads, setHiddenThreads] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedHiddenThreads = localStorage.getItem('hiddenThreads');
      if (!savedHiddenThreads) return [];
      const parsed = JSON.parse(savedHiddenThreads);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((v) => typeof v === 'string' && v.length > 0)
        .map((v) => (v.includes(':') ? v : `2ch:${v}`));
    } catch {
      return [];
    }
  });

  const openThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setRepliesOverlay(null);
    // Prevent body scroll when thread is open
    document.body.style.overflow = 'hidden';
  };

  const closeThread = () => {
    setActiveThreadId(null);
    setRepliesOverlay(null);
    // Restore body scroll
    if (!isSavedMode) document.body.style.overflow = '';
  };

  const refreshSavedThreads = useCallback(() => {
    setSavedThreads(listSavedThreads());
  }, []);

  const toggleSavedMode = useCallback(() => {
    setIsSavedMode((prev) => {
      const next = !prev;
      if (next) {
        refreshSavedThreads();
        setIsBoardPickerOpen(false);
        setRepliesOverlay(null);
        setActiveThreadId(null);
        document.body.style.overflow = 'hidden';
      } else {
        if (!activeThreadId) document.body.style.overflow = '';
      }
      return next;
    });
  }, [activeThreadId, refreshSavedThreads]);

  const openSavedThread = (key: string) => {
    openThread(`local:${key}`);
  };

  const deleteSavedThread = useCallback(async (key: string) => {
    await deleteSavedThreadImpl(key);
    setSavedThreads(listSavedThreads());
  }, []);

  const openBoardPicker = () => setIsBoardPickerOpen(true);
  const closeBoardPicker = () => setIsBoardPickerOpen(false);

  const openRepliesOverlay = (threadId: string, postNum: string | number) => {
    setRepliesOverlay({ threadId, postNum: String(postNum) });
  };

  const closeRepliesOverlay = () => setRepliesOverlay(null);

  const hideThread = (threadId: string) => {
    setHiddenThreads(prev => {
      // Avoid duplicates
      if (prev.includes(threadId)) return prev;
      
      const newHiddenThreads = [...prev, threadId];
      localStorage.setItem('hiddenThreads', JSON.stringify(newHiddenThreads));
      return newHiddenThreads;
    });
  };

  const toggleDataSaver = useCallback(() => {
    setIsDataSaver((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('dataSaverMode', next ? '1' : '0');
      } catch {}
      return next;
    });
  }, []);

  return (
    <FeedContext.Provider value={{ activeThreadId, openThread, closeThread, openSavedThread, activeThreadSave, setActiveThreadSave, deleteSavedThread, hiddenThreads, hideThread, isBoardPickerOpen, openBoardPicker, closeBoardPicker, repliesOverlay, openRepliesOverlay, closeRepliesOverlay, isSavedMode, toggleSavedMode, savedThreads, refreshSavedThreads, isDataSaver, toggleDataSaver }}>
      {children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
}
