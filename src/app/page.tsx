'use client';

import { useEffect } from 'react';
import { DisplayPanel } from '@/components/layout/DisplayPanel';
import { KeypadGrid } from '@/components/layout/KeypadGrid';
import { CurrencySelector } from '@/components/currency/CurrencySelector';
import { ExchangeRateDisplay } from '@/components/currency/ExchangeRateDisplay';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import { useHydrated } from '@/hooks/useHydrated';
import { useCalculatorStore } from '@/lib/store/calculator';
import { useCurrencyStore } from '@/lib/store/currency';
import {
  registerServiceWorker,
  setupInstallPrompt,
  trackPWAUsage,
} from '@/lib/pwa';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function Home() {
  const isHydrated = useHydrated();
  const { display, previousValue, operation } = useCalculatorStore();
  const { fetchExchangeRates, lastUpdated } = useCurrencyStore();

  useEffect(() => {
    // Only fetch rates after hydration to avoid SSR issues
    if (isHydrated) {
      // Initialize PWA features
      registerServiceWorker();
      setupInstallPrompt();
      trackPWAUsage();

      // Fetch exchange rates on app load if not cached or older than 15 minutes
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      if (!lastUpdated || new Date(lastUpdated) < fifteenMinutesAgo) {
        fetchExchangeRates();
      }
    }
  }, [fetchExchangeRates, lastUpdated, isHydrated]);

  // Show loading state during hydration to prevent hydration mismatches
  if (!isHydrated) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-white text-lg'>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <ServiceWorkerRegistration />
      <div className='h-screen w-screen max-w-4xl m-auto bg-black main-container'>
        <div className='p-2 h-full flex flex-col justify-between'>
          {/* Header - kompakter ohne Icons */}
          <div className='flex justify-center items-center my-4 relative'>
            <h1 className='text-white text-lg font-medium'>
              Currency Calculator
            </h1>
            {/* PWA Install Button - hidden by default, shown via JavaScript */}
            <Button
              id='install-button'
              variant='ghost'
              size='icon'
              className='text-zinc-400 hover:text-white hover:bg-zinc-800 hidden'
              title='Install App'>
              <Download className='h-5 w-5' />
            </Button>
          </div>

          {/* Currency Selectors */}
          <div className='grid grid-cols-2 gap-2 mb-2'>
            <div>
              <label className='text-zinc-400 text-xs mb-1 block'>From</label>
              <CurrencySelector type='base' />
            </div>
            <div>
              <label className='text-zinc-400 text-xs mb-1 block'>To</label>
              <CurrencySelector type='target' />
            </div>
          </div>

          {/* Exchange Rate Display */}
          <ExchangeRateDisplay />

          {/* Display Panel */}
          <DisplayPanel
            display={display}
            previousValue={previousValue}
            operation={operation}
          />

          {/* Keypad - nimmt den verfügbaren Platz ein */}
          <div className='flex-1 flex items-end'>
            <KeypadGrid />
          </div>
        </div>
      </div>
    </>
  );
}
