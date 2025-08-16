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

  return (
    <div className='flex items-center justify-between text-xs text-zinc-500 px-1 py-0.5 mb-1'>
      <div className='flex items-center gap-1'>
        {rate && (
          <span>
            1 {baseCurrency.code} = {rate.toFixed(4)} {targetCurrency.code}
          </span>
        )}
      </div>

      <div className='flex items-center gap-1'>
        <span>{formatLastUpdated(lastUpdated)}</span>
        <Button
          variant='ghost'
          size='sm'
          className='h-5 w-5 p-0 text-zinc-500 hover:text-white'
          onClick={fetchExchangeRates}
          disabled={isLoading}>
          <RefreshCw className={`h-2 w-2 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
}
