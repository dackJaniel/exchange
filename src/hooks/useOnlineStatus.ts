import { useEffect, useState, useCallback } from "react";
import { useCurrencyStore } from "@/lib/store/currency";
import { onlineLogger } from "@/lib/debug";

/**
 * Simplified offline-first online status hook
 * - Always starts with navigator.onLine (no connectivity tests)
 * - Only listens to browser events (online/offline)
 * - No network requests or timeouts that block the UI
 */
export const useOnlineStatus = () => {
  // Initialize with browser's status - trust the browser immediately
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof navigator !== "undefined") {
      return navigator.onLine;
    }
    return false; // Default to offline for SSR - safer assumption
  });

  const setOnlineStatus = useCurrencyStore((state) => state.setOnlineStatus);

  // Simple update function - no testing, just trust browser events
  const updateOnlineStatus = useCallback(
    (browserOnline: boolean) => {
      onlineLogger.debug(
        `Browser event: ${browserOnline ? "online" : "offline"}`,
      );
      setIsOnline(browserOnline);
      setOnlineStatus(browserOnline);
    },
    [setOnlineStatus],
  );

  useEffect(() => {
    // Don't run in SSR
    if (typeof navigator === "undefined") {
      return;
    }

    // Set initial status - trust browser immediately
    const initialStatus = navigator.onLine;
    onlineLogger.debug(`Initial browser status: ${initialStatus}`);
    setIsOnline(initialStatus);
    setOnlineStatus(initialStatus);

    const handleOnline = () => {
      onlineLogger.debug("Browser online event");
      updateOnlineStatus(true);
    };

    const handleOffline = () => {
      onlineLogger.debug("Browser offline event");
      updateOnlineStatus(false);
    };

    // Only listen to browser events - no connectivity testing
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setOnlineStatus, updateOnlineStatus]);

  return isOnline;
};
