import { useCurrencyStore } from '@/lib/store/currency';
import { useHydrated } from '@/hooks/useHydrated';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ExchangeRateDisplay() {
  const isHydrated = useHydrated();
  const {
    baseCurrency,
    targetCurrency,
    rates,
    lastUpdated,
    isLoading,
    fetchExchangeRates,
  } = useCurrencyStore();

  const rate = rates[targetCurrency.code];

  const formatLastUpdated = (date: Date | string | null) => {
    if (!date || !isHydrated) return 'Never';

    // Handle both Date objects and date strings from localStorage
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Check if the date is valid
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

  return (
    <div className='flex items-center justify-between text-xs text-zinc-500 px-2 py-1'>
      <div className='flex items-center gap-2'>
        {rate && (
          <span>
            1 {baseCurrency.code} = {rate.toFixed(4)} {targetCurrency.code}
          </span>
        )}
      </div>

      <div className='flex items-center gap-2'>
        <span>{formatLastUpdated(lastUpdated)}</span>
        <Button
          variant='ghost'
          size='sm'
          className='h-6 w-6 p-0 text-zinc-500 hover:text-white'
          onClick={fetchExchangeRates}
          disabled={isLoading}>
          <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
}
