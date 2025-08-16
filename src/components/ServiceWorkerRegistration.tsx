'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function ServiceWorkerRegistration() {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('SW registered: ', reg);
          setRegistration(reg);

          // Check for updates every 30 seconds
          setInterval(() => {
            reg.update();
          }, 30000);

          // Listen for waiting service worker (new version available)
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  setUpdateAvailable(true);
                  showUpdateNotification();
                }
              });
            }
          });

          // Check if there's already a waiting worker
          if (reg.waiting) {
            setUpdateAvailable(true);
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
  }, []);

  const showUpdateNotification = () => {
    toast('App-Update verfügbar! 🚀', {
      description:
        'Eine neue Version der App ist verfügbar. Jetzt aktualisieren?',
      action: {
        label: 'Aktualisieren',
        onClick: () => {
          if (registration?.waiting) {
            // Tell the waiting service worker to skip waiting and become active
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            // Reload the page to use the new service worker
            window.location.reload();
          }
        },
      },
      duration: 10000, // Show for 10 seconds
    });
  };

  return null;
}
