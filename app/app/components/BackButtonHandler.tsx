'use client';

import { useEffect, useRef } from 'react';
import { App } from '@capacitor/app';
import { useRouter, usePathname } from 'next/navigation';
import { useMedia } from '../context/MediaContext';

export default function BackButtonHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const { fullscreenItem, closeFullscreen } = useMedia();

  // Use refs to keep latest state accessible in the event listener without re-binding
  const stateRef = useRef({ fullscreenItem, closeFullscreen, pathname, router });

  useEffect(() => {
    stateRef.current = { fullscreenItem, closeFullscreen, pathname, router };
  }, [fullscreenItem, closeFullscreen, pathname, router]);

  useEffect(() => {
    let listenerHandle: any;
    let isMounted = true;

    const setupListener = async () => {
      try {
        const handle = await App.addListener('backButton', ({ canGoBack }) => {
            const { fullscreenItem, closeFullscreen, pathname, router } = stateRef.current;
            
            if (fullscreenItem) {
                // If modal is open (video or image), close it and consume the event
                closeFullscreen();
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
