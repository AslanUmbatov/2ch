'use client';

import { useEffect } from 'react';
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export default function StatusBarHandler() {
  useEffect(() => {
    const hideStatusBar = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          await StatusBar.hide();
        } catch (error) {
          console.error('Failed to hide status bar:', error);
        }
      }
    };
    
    hideStatusBar();
  }, []);

  return null;
}
