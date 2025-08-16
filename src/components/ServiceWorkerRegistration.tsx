'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { useCurrencyStore } from '@/lib/store/currency';
import { useTranslation } from '@/lib/i18n/provider';

export function ServiceWorkerRegistration() {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const updateNotificationShownRef = useRef(false);
  const setOnlineStatus = useCurrencyStore((state) => state.setOnlineStatus);
  const isOnline = useCurrencyStore((state) => state.isOnline);
  const t = useTranslation();

  const showUpdateNotification = useCallback(() => {
    // Prevent showing multiple notifications in the same session
    if (updateNotificationShownRef.current) {
      console.log('SW: Update notification already shown in this session');
      return;
    }

    updateNotificationShownRef.current = true;
    console.log('SW: Showing update notification');

    toast(t.ui.updateAvailable, {
      description: t.ui.updateDescription,
      action: {
        label: t.ui.updateButton,
        onClick: () => {
          if (registration?.waiting) {
            console.log('SW: Applying update...');
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          }
        },
      },
      cancel: {
        label: t.ui.updateLater,
        onClick: () => {
          console.log('SW: Update dismissed by user');
        },
      },
      duration: 15000,
      id: 'sw-update', // Prevent duplicate toasts
    });
  }, [
    registration,
    t.ui.updateAvailable,
    t.ui.updateDescription,
    t.ui.updateButton,
    t.ui.updateLater,
  ]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('SW registered: ', reg);
          setRegistration(reg);

          // Check for updates periodically, but only when online
          const updateCheckInterval = setInterval(() => {
            if (isOnline) {
              console.log('SW: Checking for updates (online)');
              reg.update();
            } else {
              console.log('SW: Skipping update check (offline)');
            }
          }, 180000); // Check every 3 minutes when online

          // Listen for updatefound event (new service worker is downloading)
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            console.log('SW: Update found, new worker installing...');

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                console.log('SW: New worker state:', newWorker.state);

                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  // New version is available and ready to use
                  console.log('SW: New version installed and ready');
                  showUpdateNotification();
                }
              });
            }
          });

          // Only show update notification if there's a waiting worker AND
          // we haven't already shown a notification in this session
          if (reg.waiting && !updateNotificationShownRef.current) {
            console.log('SW: Waiting worker found on registration');
            showUpdateNotification();
          }

          // Cleanup function for the interval
          return () => {
            console.log('SW: Cleaning up update check interval');
            clearInterval(updateCheckInterval);
          };
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'RATES_UPDATED') {
          toast.success(t.ui.ratesUpdated, {
            description: t.ui.ratesUpdatedDescription,
          });
        }
      });
    }
  }, [
    showUpdateNotification,
    t.ui.ratesUpdated,
    t.ui.ratesUpdatedDescription,
    isOnline,
  ]); // Include isOnline dependency

  // Additional effect for online/offline handling from service worker perspective
  useEffect(() => {
    // Sync online status when service worker registration is active
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
