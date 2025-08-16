'use client';

import { useEffect } from 'react';
import { usePWAFeatures } from '@/hooks/usePWAFeatures';
import { useCurrencyStore } from '@/lib/store/currency';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export function AutomaticRateUpdates() {
  const { backgroundSync } = usePWAFeatures();
  const isOnline = useOnlineStatus();
  const lastUpdate = useCurrencyStore((state) => state.lastUpdated);

  useEffect(() => {
    if (!backgroundSync.isSupported || !isOnline) {
      return;
    }

    // Auto-sync rates on startup if we haven't updated recently
    const shouldAutoSync = () => {
      if (!lastUpdate) return true;

      const now = Date.now();
      const lastUpdateTime =
        typeof lastUpdate === 'string'
          ? new Date(lastUpdate).getTime()
          : lastUpdate.getTime();
      const timeSinceUpdate = now - lastUpdateTime;
      const thirtyMinutes = 30 * 60 * 1000;

      return timeSinceUpdate > thirtyMinutes;
    };

    if (shouldAutoSync()) {
      // Delay the sync to allow the app to fully load
      const timeoutId = setTimeout(() => {
        backgroundSync.syncRates().catch((error) => {
          console.error('Auto sync failed:', error);
        });
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [backgroundSync, isOnline, lastUpdate]);

  // Register periodic background sync when the page becomes visible
  useEffect(() => {
    if (!backgroundSync.isSupported) {
      return;
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && isOnline) {
        // App became visible and we're online - trigger background sync
        backgroundSync.syncRates().catch((error) => {
          console.error('Visibility sync failed:', error);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [backgroundSync, isOnline]);

  // This component doesn't render anything
  return null;
}
