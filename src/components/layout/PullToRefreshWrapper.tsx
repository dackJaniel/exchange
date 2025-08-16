'use client';

import { ReactNode } from 'react';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useAppUpdates } from '@/hooks/useAppUpdates';
import { useCurrencyStore } from '@/lib/store/currency';
import { useTranslation } from '@/lib/i18n/provider';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshWrapperProps {
  children: ReactNode;
}

export const PullToRefreshWrapper = ({
  children,
}: PullToRefreshWrapperProps) => {
  const { fetchExchangeRates, isLoading } = useCurrencyStore();
  const { checkForUpdatesAndApply, installing } = useAppUpdates();
  const isOnline = useOnlineStatus();
  const t = useTranslation();

  const handleRefresh = async () => {
    // Check if online before attempting refresh
    if (!isOnline) {
      return;
    }

    // First check for app updates and apply silently if available
    const updateWasApplied = await checkForUpdatesAndApply();

    // If no update was applied, continue with currency refresh
    if (!updateWasApplied) {
      await fetchExchangeRates(true); // Force refresh to bypass cache
    }
  };

  const { containerRef, isRefreshing, pullDistance, canRefresh } =
    usePullToRefresh({
      onRefresh: handleRefresh,
      threshold: 80,
      resistance: 2.5,
      isEnabled: isOnline, // Only enabled when online
    });

  const showIndicator = (pullDistance > 10 || isRefreshing) && isOnline;
  const indicatorOpacity = Math.min(pullDistance / 80, 1);
  const isUpdating = isRefreshing || isLoading || installing;

  return (
    <div
      ref={containerRef}
      className='relative h-screen w-screen max-w-4xl m-auto bg-black main-container'>
      {/* Pull to Refresh Indicator */}
      {showIndicator && (
        <div
          className='absolute top-0 left-0 right-0 z-50 flex justify-center items-center py-4 pointer-events-none'
          style={{
            opacity: isUpdating ? 1 : indicatorOpacity,
            transform: `translateY(${Math.max(-40, pullDistance - 80)}px)`,
          }}>
          <div className='flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 border border-zinc-800'>
            <RefreshCw
              className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''} ${
                canRefresh ? 'text-orange-500' : 'text-zinc-400'
              }`}
            />
            <span
              className={`text-sm ${
                canRefresh ? 'text-orange-500' : 'text-zinc-400'
              }`}>
              {installing
                ? t.ui.pullToRefreshUpdating
                : isRefreshing || isLoading
                ? t.ui.pullToRefreshChecking
                : canRefresh
                ? t.ui.pullToRefreshRelease
                : !isOnline
                ? t.ui.pullToRefreshOffline
                : t.ui.pullToRefreshPull}
            </span>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
