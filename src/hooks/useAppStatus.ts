import { useMemo } from 'react';
import { useHydrated } from './useHydrated';
import { useOnlineStatus } from './useOnlineStatus';
import { useCurrencyStore } from '@/lib/store/currency';

/**
 * Enhanced hook that combines online status detection with currency data availability
 * This provides a more accurate representation of the app's functional state
 */
export function useAppStatus() {
    const isHydrated = useHydrated();
    const isOnline = useOnlineStatus();
    const { baseCurrency, isCacheValid } = useCurrencyStore();

    const status = useMemo(() => {
        // Not hydrated yet - show loading state
        if (!isHydrated) {
            return {
                isHydrated: false,
                isOnline: false,
                canConvert: false,
                hasCache: false,
                status: 'loading' as const,
            };
        }

        // Check if we have valid cached data for current currency pair
        const hasValidCache = isCacheValid(baseCurrency.code);
        const canConvert = isOnline || hasValidCache;

        return {
            isHydrated: true,
            isOnline,
            canConvert,
            hasCache: hasValidCache,
            status: isOnline
                ? 'online' as const
                : hasValidCache
                    ? 'offline-cached' as const
                    : 'offline-no-cache' as const,
        };
    }, [isHydrated, isOnline, baseCurrency.code, isCacheValid]);

    return status;
}
