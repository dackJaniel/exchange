'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAutoUpdates } from '@/hooks/useAutoUpdates';

export function AutoBackgroundUpdates() {
  const { handleAutoUpdate, showUpdateCompleteNotification, resetAutoUpdates } =
    useAutoUpdates();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      console.log('Auto Background Updates: Initializing...');

      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Auto Background Updates: SW registered');

          // Prüfe sofort auf wartende Updates
          if (registration.waiting) {
            console.log(
              'Auto Background Updates: Found waiting worker on registration'
            );
            handleAutoUpdate(registration);
            return;
          }

          // Lausche auf neue Updates
          registration.addEventListener('updatefound', () => {
            console.log('Auto Background Updates: Update found');
            const newWorker = registration.installing;

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                console.log(
                  'Auto Background Updates: Worker state changed to:',
                  newWorker.state
                );

                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  console.log(
                    'Auto Background Updates: New worker installed, starting auto update'
                  );
                  // Automatisches Update ohne Benutzerinteraktion
                  handleAutoUpdate(registration);
                }
              });
            }
          });

          // Regelmäßige Update-Checks (alle 2 Minuten)
          const updateCheckInterval = setInterval(() => {
            if (navigator.onLine) {
              console.log('Auto Background Updates: Checking for updates...');
              registration.update();
            }
          }, 120000);

          return () => {
            clearInterval(updateCheckInterval);
          };
        })
        .catch((error) => {
          console.error(
            'Auto Background Updates: SW registration failed:',
            error
          );
        });

      // Nach dem Laden der Seite prüfen, ob ein Update gerade stattgefunden hat
      const checkForRecentUpdate = () => {
        const lastUpdate = localStorage.getItem('lastAutoUpdate');
        const now = Date.now();

        if (lastUpdate) {
          const timeDiff = now - parseInt(lastUpdate);
          // Wenn das letzte Update weniger als 10 Sekunden her ist
          if (timeDiff < 10000) {
            console.log(
              'Auto Background Updates: Recent update detected, showing success notification'
            );
            showUpdateCompleteNotification();
            localStorage.removeItem('lastAutoUpdate');
          }
        }
      };

      // Warte kurz bis die Seite vollständig geladen ist
      setTimeout(checkForRecentUpdate, 1000);

      // Lausche auf Service Worker Nachrichten
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'RATES_UPDATED') {
          toast.info('Wechselkurse aktualisiert', {
            duration: 3000,
          });
        }
      });

      // Lausche auf beforeunload Event, um Update-Zeitpunkt zu markieren
      const handleBeforeUnload = () => {
        localStorage.setItem('lastAutoUpdate', Date.now().toString());
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      // Cleanup function
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }

    return () => {
      // Cleanup beim Unmount
      resetAutoUpdates();
    };
  }, [handleAutoUpdate, showUpdateCompleteNotification, resetAutoUpdates]);

  return null;
}
