'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function AutoUpdateServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);

          // Check for updates every 15 seconds
          setInterval(() => {
            registration.update();
          }, 15000);

          // Auto-update when new version is available
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  // Show brief notification
                  toast.success('App wird aktualisiert...', {
                    description: 'Die neueste Version wird geladen.',
                    duration: 2000,
                  });

                  // Auto-activate new service worker
                  newWorker.postMessage({ type: 'SKIP_WAITING' });

                  // Reload after a short delay to let user see the notification
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }
              });
            }
          });

          // Handle already waiting service worker
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch((error) => {
          console.log('SW registration failed: ', error);
        });

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'RATES_UPDATED') {
          toast.info('Wechselkurse aktualisiert', {
            duration: 3000,
          });
        }
      });
    }
  }, []);

  return null;
}
