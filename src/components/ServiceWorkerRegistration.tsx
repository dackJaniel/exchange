'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useCurrencyStore } from '@/lib/store/currency';
import { useTranslation } from '@/lib/i18n/provider';
import { usePWAEventListeners } from '@/hooks/usePWAFeatures';
import { pwaManager } from '@/lib/pwa-features';

export function ServiceWorkerRegistration() {
  const setOnlineStatus = useCurrencyStore((state) => state.setOnlineStatus);
  const t = useTranslation();

  // Initialize PWA event listeners
  usePWAEventListeners();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('SW registered: ', reg);

          // Initialize PWA manager
          pwaManager.initialize().catch((error) => {
            console.error('Failed to initialize PWA manager:', error);
          });

          // Listen for messages from service worker
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data?.type === 'RATES_UPDATED') {
              toast.success(t.ui.ratesUpdated, {
                description: t.ui.ratesUpdatedDescription,
              });
            } else if (event.data?.type === 'BACKGROUND_RATES_UPDATED') {
              // Background sync completed - show subtle notification
              toast.success(t.ui.ratesUpdated, {
                description: 'Background sync completed',
              });
            }
          });

          // Listen for push notification clicks (if supported)
          if ('Notification' in window) {
            // Handle notification clicks in the main thread
            navigator.serviceWorker.addEventListener('message', (event) => {
              if (event.data?.type === 'NOTIFICATION_CLICK') {
                // Focus or open the app when notification is clicked
                window.focus();
              }
            });
          }
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, [t.ui.ratesUpdated, t.ui.ratesUpdatedDescription]);

  // Online/offline status management
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
      const handleOnlineOffline = () => {
        const isOnline = navigator.onLine;
        console.log('SW Registration: Online status changed to', isOnline);
        setOnlineStatus(isOnline);
      };

      // Listen for browser online/offline events
      window.addEventListener('online', handleOnlineOffline);
      window.addEventListener('offline', handleOnlineOffline);

      // Set initial status
      setOnlineStatus(navigator.onLine);

      return () => {
        window.removeEventListener('online', handleOnlineOffline);
        window.removeEventListener('offline', handleOnlineOffline);
      };
    }
  }, [setOnlineStatus]);

  return null;
}
