'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useCurrencyStore } from '@/lib/store/currency';
import { useTranslation } from '@/lib/i18n/provider';
import { useUpdateNotifications } from '@/hooks/useUpdateNotifications';

export function ServiceWorkerRegistration() {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const setOnlineStatus = useCurrencyStore((state) => state.setOnlineStatus);
  const isOnline = useCurrencyStore((state) => state.isOnline);
  const t = useTranslation();
  const { showUpdateNotification, hasActiveNotification } =
    useUpdateNotifications();

  const handleShowUpdateNotification = useCallback(() => {
    // Prüfe ob bereits eine Update-Benachrichtigung aktiv ist
    if (hasActiveNotification()) {
      console.log('SW: Update notification already active, skipping...');
      return;
    }

    console.log('SW: Showing update notification via central manager');

    const updateCallback = () => {
      if (registration?.waiting) {
        console.log('SW: Applying update...');
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    };

    const onDismiss = () => {
      console.log('SW: Update dismissed by user');
    };

    showUpdateNotification(
      t.ui.updateAvailable,
      t.ui.updateDescription,
      t.ui.updateButton,
      t.ui.updateLater,
      updateCallback,
      onDismiss
    );
  }, [
    registration,
    t.ui.updateAvailable,
    t.ui.updateDescription,
    t.ui.updateButton,
    t.ui.updateLater,
    showUpdateNotification,
    hasActiveNotification,
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
                  handleShowUpdateNotification();
                }
              });
            }
          });

          // Only show update notification if there's a waiting worker AND
          // no notification is currently active
          if (reg.waiting && !hasActiveNotification()) {
            console.log('SW: Waiting worker found on registration');
            handleShowUpdateNotification();
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
    handleShowUpdateNotification,
    t.ui.ratesUpdated,
    t.ui.ratesUpdatedDescription,
    isOnline,
    hasActiveNotification,
  ]); // Include all dependencies

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
