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
import { Settings, History, Download } from 'lucide-react';

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
      <div className='min-h-screen bg-black flex flex-col justify-end px-4 py-4 max-w-md mx-auto main-container'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-white text-lg font-medium'>
            Currency Calculator
          </h1>
          <div className='flex gap-2'>
            {/* PWA Install Button */}
            <Button
              id='install-button'
              variant='ghost'
              size='icon'
              className='text-zinc-400 hover:text-white hover:bg-zinc-800 hidden'
              title='Install App'>
              <Download className='h-5 w-5' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='text-zinc-400 hover:text-white hover:bg-zinc-800'>
              <History className='h-5 w-5' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='text-zinc-400 hover:text-white hover:bg-zinc-800'>
              <Settings className='h-5 w-5' />
            </Button>
          </div>
        </div>

        {/* Currency Selectors */}
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div>
            <label className='text-zinc-400 text-sm mb-2 block'>From</label>
            <CurrencySelector type='base' />
          </div>
          <div>
            <label className='text-zinc-400 text-sm mb-2 block'>To</label>
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

        {/* Keypad */}
        <KeypadGrid />
      </div>
    </>
  );
}
