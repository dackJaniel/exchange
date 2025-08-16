import { useCurrencyStore } from '@/lib/store/currency';
import { useHydrated } from '@/hooks/useHydrated';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ExchangeRateDisplay() {
  const isHydrated = useHydrated();
  const isOnline = useOnlineStatus();

  const {
    baseCurrency,
    targetCurrency,
    rates,
    lastUpdated,
    isLoading,
    fetchExchangeRates,
    getRatesFromCache,
    hasEverBeenOnline,
    error,
  } = useCurrencyStore();

  // Try to get rate from current rates, fallback to cache
  let rate = rates[targetCurrency.code];
  let isFromCache = false;

  if (!rate) {
    const cachedRate = getRatesFromCache(
      baseCurrency.code,
      targetCurrency.code
    );
    if (cachedRate !== null) {
      rate = cachedRate;
      isFromCache = true;
    }
  }

  const formatLastUpdated = (date: Date | string | null) => {
    if (!date || !isHydrated) return 'Never';

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) return 'Never';

    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - dateObj.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return dateObj.toLocaleDateString();
  };

  const handleRefresh = () => {
    if (isOnline) {
      fetchExchangeRates(true); // Force refresh
    }
  };

  return (
    <div className='flex items-center justify-between text-xs text-zinc-500 px-1 py-0.5 mb-1'>
      <div className='flex items-center gap-2'>
        {/* Online Status Indicator */}
        <div className='flex items-center gap-1'>
          {isOnline ? (
            <Wifi className='h-3 w-3 text-green-500' />
          ) : (
            <WifiOff className='h-3 w-3 text-red-500' />
          )}
          <span className={isOnline ? 'text-green-500' : 'text-red-500'}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Exchange Rate */}
        {rate && (
          <span>
            | 1 {baseCurrency.code} = {rate.toFixed(4)} {targetCurrency.code}
            {isFromCache && ' (cached)'}
          </span>
        )}

        {/* Show warning if no rate available and never been online */}
        {!rate && !hasEverBeenOnline && (
          <span className='text-orange-500'>
            | Keine Kurse - Online-Verbindung erforderlich
          </span>
        )}

        {/* Show error message if any */}
        {error && <span className='text-orange-500'>| {error}</span>}
      </div>

      <div className='flex items-center gap-1'>
        <span>{formatLastUpdated(lastUpdated)}</span>
        <Button
          variant='ghost'
          size='sm'
          className='h-5 w-5 p-0 text-zinc-500 hover:text-white disabled:opacity-30'
          onClick={handleRefresh}
          disabled={isLoading || !isOnline}
          title={
            !isOnline
              ? 'Offline - keine Aktualisierung möglich'
              : 'Wechselkurse aktualisieren'
          }>
          <RefreshCw className={`h-2 w-2 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
}
