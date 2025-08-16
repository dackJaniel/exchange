'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';

export function ServiceWorkerRegistration() {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const updateNotificationShownRef = useRef(false);

  const showUpdateNotification = useCallback(() => {
    // Prevent showing multiple notifications in the same session
    if (updateNotificationShownRef.current) {
      console.log('SW: Update notification already shown in this session');
      return;
    }

    updateNotificationShownRef.current = true;
    console.log('SW: Showing update notification');

    toast('App-Update verfügbar! 🚀', {
      description:
        'Eine neue Version der App ist verfügbar. Jetzt aktualisieren?',
      action: {
        label: 'Aktualisieren',
        onClick: () => {
          if (registration?.waiting) {
            console.log('SW: Applying update...');
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          }
        },
      },
      cancel: {
        label: 'Später',
        onClick: () => {
          console.log('SW: Update dismissed by user');
        },
      },
      duration: 15000,
      id: 'sw-update', // Prevent duplicate toasts
    });
  }, [registration]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('SW registered: ', reg);
          setRegistration(reg);

          // Check for updates every 2 minutes
          setInterval(() => {
            reg.update();
          }, 120000);

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
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'RATES_UPDATED') {
          toast.success('Wechselkurse aktualisiert', {
            description: 'Die neuesten Wechselkurse wurden geladen.',
          });
        }
      });
    }
  }, [showUpdateNotification]); // showUpdateNotification is now stable with useCallback

  return null;
}
