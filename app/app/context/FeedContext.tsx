'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeedContextType {
  activeThreadId: string | null;
  openThread: (threadId: string) => void;
  closeThread: () => void;
  hiddenThreads: string[];
  hideThread: (threadId: string) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: ReactNode }) {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
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
    // Prevent body scroll when thread is open
    document.body.style.overflow = 'hidden';
  };

  const closeThread = () => {
    setActiveThreadId(null);
    // Restore body scroll
    document.body.style.overflow = '';
  };

  const hideThread = (threadId: string) => {
    setHiddenThreads(prev => {
      // Avoid duplicates
      if (prev.includes(threadId)) return prev;
      
      const newHiddenThreads = [...prev, threadId];
      localStorage.setItem('hiddenThreads', JSON.stringify(newHiddenThreads));
      return newHiddenThreads;
    });
  };

  return (
    <FeedContext.Provider value={{ activeThreadId, openThread, closeThread, hiddenThreads, hideThread }}>
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
