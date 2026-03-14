'use client';

import { useEffect, useRef } from 'react';
import { App } from '@capacitor/app';
import { useRouter, usePathname } from 'next/navigation';
import { useMedia } from '../context/MediaContext';
import { useFeed } from '../context/FeedContext';

export default function BackButtonHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const { fullscreenItem, closeFullscreen, isVideoLandscape, exitVideoLandscape } = useMedia();
  const { activeThreadId, closeThread, isBoardPickerOpen, closeBoardPicker, repliesOverlay, closeRepliesOverlay, isSavedMode, toggleSavedMode } = useFeed();

  // Use refs to keep latest state accessible in the event listener without re-binding
  const stateRef = useRef({ fullscreenItem, closeFullscreen, isVideoLandscape, exitVideoLandscape, pathname, router, activeThreadId, closeThread, isBoardPickerOpen, closeBoardPicker, repliesOverlay, closeRepliesOverlay, isSavedMode, toggleSavedMode });

  useEffect(() => {
    stateRef.current = { fullscreenItem, closeFullscreen, isVideoLandscape, exitVideoLandscape, pathname, router, activeThreadId, closeThread, isBoardPickerOpen, closeBoardPicker, repliesOverlay, closeRepliesOverlay, isSavedMode, toggleSavedMode };
  }, [fullscreenItem, closeFullscreen, isVideoLandscape, exitVideoLandscape, pathname, router, activeThreadId, closeThread, isBoardPickerOpen, closeBoardPicker, repliesOverlay, closeRepliesOverlay, isSavedMode, toggleSavedMode]);

  useEffect(() => {
    let listenerHandle: any;
    let isMounted = true;

    const setupListener = async () => {
      try {
        const handle = await App.addListener('backButton', ({ canGoBack }) => {
            const { fullscreenItem, closeFullscreen, isVideoLandscape, exitVideoLandscape, pathname, router, activeThreadId, closeThread, isBoardPickerOpen, closeBoardPicker, repliesOverlay, closeRepliesOverlay, isSavedMode, toggleSavedMode } = stateRef.current;
            
            if (fullscreenItem) {
                if (fullscreenItem.type === 'video' && isVideoLandscape) {
                    exitVideoLandscape();
                } else {
                    closeFullscreen();
                }
            } else if (repliesOverlay) {
                closeRepliesOverlay();
            } else if (isBoardPickerOpen) {
                closeBoardPicker();
            } else if (activeThreadId) {
                // If thread overlay is open, close it
                closeThread();
            } else if (isSavedMode) {
                toggleSavedMode();
            } else {
                if (pathname === '/') {
                    // If on home page, minimize app (standard Android behavior)
                    App.exitApp();
                } else {
                    // Go back in history
                    router.back();
                }
            }
        });

        if (isMounted) {
            listenerHandle = handle;
        } else {
            // Component unmounted before promise resolved, cleanup immediately
            handle.remove();
        }
      } catch (error) {
        console.error('Failed to add back button listener:', error);
      }
    };

    setupListener();

    return () => {
      isMounted = false;
      if (listenerHandle) {
        listenerHandle.remove();
      }
    };
  }, []); // Empty dependency array -> add listener once on mount

  return null;
}
