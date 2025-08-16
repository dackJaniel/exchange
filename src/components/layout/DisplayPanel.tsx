import { useCurrencyStore } from '@/lib/store/currency';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DisplayPanelProps {
  display: string;
  previousValue: number | null;
  operation: string | null;
}

export function DisplayPanel({
  display,
  previousValue,
  operation,
}: DisplayPanelProps) {
  const {
    baseCurrency,
    targetCurrency,
    convertAmount,
    swapCurrencies,
    isLoading,
  } = useCurrencyStore();

  const displayValue = parseFloat(display) || 0;
  const convertedValue = convertAmount(displayValue);

  const formatNumber = (num: number): string => {
    if (isNaN(num)) return '0';

    if (Math.abs(num) >= 1000000) {
      return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(num);
    }
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: Math.abs(num) < 1 ? 6 : 2,
    }).format(num);
  };

  return (
    <div className='w-full bg-black rounded-xl shadow-xl p-6 mb-6 border border-zinc-800'>
      {/* Header with Switch Button and Operation */}
      <div className='flex items-start justify-between mb-4'>
        {/* Switch Button - moved to top left */}
        <Button
          variant='ghost'
          size='icon'
          onClick={swapCurrencies}
          className='text-orange-500 hover:text-orange-400 hover:bg-zinc-800 mr-4'>
          <ArrowUpDown className='h-5 w-5' />
        </Button>

        <div className='flex-1'>
          {/* Operation Display */}
          {previousValue !== null && operation && (
            <div className='display-secondary text-sm mb-2 text-right'>
              {formatNumber(previousValue)} {operation}
            </div>
          )}
        </div>
      </div>

      {/* Primary Currency Display - left aligned */}
      <div className='text-left mb-6'>
        <div className='display-primary text-4xl sm:text-5xl mb-2'>
          {formatNumber(displayValue)}
        </div>
        <div className='text-zinc-500 text-sm uppercase tracking-wide'>
          {baseCurrency.flag} {baseCurrency.code}
        </div>
      </div>

      {/* Secondary Currency Display - left aligned, same size */}
      <div className='text-left'>
        <div className='display-primary text-4xl sm:text-5xl mb-2'>
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <Loader2 className='h-6 w-6 animate-spin' />
              <span>Loading...</span>
            </div>
          ) : (
            formatNumber(convertedValue)
          )}
        </div>
        <div className='text-zinc-500 text-sm uppercase tracking-wide'>
          {targetCurrency.flag} {targetCurrency.code}
        </div>
      </div>
    </div>
  );
}
