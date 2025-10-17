"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "@/lib/store/currency";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function AutomaticRateUpdates() {
  const isOnline = useOnlineStatus();
  const lastUpdate = useCurrencyStore((state) => state.lastUpdated);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined" || !isOnline) {
      return;
    }

    // Dynamically import PWA manager to avoid SSR issues
    import("@/lib/pwa-features")
      .then(({ pwaManager }) => {
        if (!pwaManager.backgroundSync.isBackgroundSyncSupported()) {
          return;
        }

        // Auto-sync rates on startup if we haven't updated recently
        const shouldAutoSync = () => {
          if (!lastUpdate) return true;

          const now = Date.now();
          const lastUpdateTime =
            typeof lastUpdate === "string"
              ? new Date(lastUpdate).getTime()
              : lastUpdate.getTime();
          const timeSinceUpdate = now - lastUpdateTime;
          const thirtyMinutes = 30 * 60 * 1000;

          return timeSinceUpdate > thirtyMinutes;
        };

        if (shouldAutoSync()) {
          // Delay the sync to allow the app to fully load
          setTimeout(() => {
            pwaManager.backgroundSync.syncExchangeRates().catch((error) => {
              console.error("Auto sync failed:", error);
              // No user-visible error for automatic sync attempts
            });
          }, 5000);
        }
      })
      .catch((error) => {
        console.error("Failed to load PWA manager:", error);
      });
  }, [isOnline, lastUpdate]);

  // Register periodic background sync when the page becomes visible
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") {
      return;
    }

    // Dynamically import PWA manager to avoid SSR issues
    import("@/lib/pwa-features")
      .then(({ pwaManager }) => {
        if (!pwaManager.backgroundSync.isBackgroundSyncSupported()) {
          return;
        }

        const handleVisibilityChange = () => {
          if (!document.hidden && isOnline) {
            // App became visible and we're online - trigger background sync
            pwaManager.backgroundSync.syncExchangeRates().catch((error) => {
              console.error("Visibility sync failed:", error);
              // No user-visible error for automatic sync attempts
            });
          }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Return cleanup function
        return () => {
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange,
          );
        };
      })
      .catch((error) => {
        console.error("Failed to load PWA manager:", error);
      });
  }, [isOnline]);

  // This component doesn't render anything
  return null;
}
