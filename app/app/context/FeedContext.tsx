'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeedContextType {
  activeThreadId: string | null;
  openThread: (threadId: string) => void;
  closeThread: () => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: ReactNode }) {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

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

  return (
    <FeedContext.Provider value={{ activeThreadId, openThread, closeThread }}>
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
