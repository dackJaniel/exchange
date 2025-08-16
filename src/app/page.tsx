'use client';

import { useEffect } from 'react';
import { DisplayPanel } from '@/components/layout/DisplayPanel';
import { KeypadGrid } from '@/components/layout/KeypadGrid';
import { CurrencySelector } from '@/components/currency/CurrencySelector';
import { ExchangeRateDisplay } from '@/components/currency/ExchangeRateDisplay';
import { OfflineNotice } from '@/components/currency/OfflineNotice';
import { PullToRefreshWrapper } from '@/components/layout/PullToRefreshWrapper';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import { useHydrated } from '@/hooks/useHydrated';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
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
  const isOnline = useOnlineStatus();
  const { display, previousValue, operation } = useCalculatorStore();
  const {
    fetchExchangeRates,
    fetchAllCurrencyRates,
    lastUpdated,
    hasEverBeenOnline,
  } = useCurrencyStore();

  useEffect(() => {
    // Only fetch rates after hydration to avoid SSR issues
    if (isHydrated && isOnline) {
      // Initialize PWA features
      registerServiceWorker();
      setupInstallPrompt();
      trackPWAUsage();

      // Check if we've never been online before - fetch immediately
      if (!hasEverBeenOnline) {
        console.log('First time online - fetching initial currency rates...');
        fetchExchangeRates();
        return;
      }

      // Check if we need to refresh rates (older than 15 minutes)
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      if (!lastUpdated || new Date(lastUpdated) < fifteenMinutesAgo) {
        fetchExchangeRates();
      }

      // Fetch all currency rates in background for better offline experience
      setTimeout(() => {
        fetchAllCurrencyRates();
      }, 2000); // Delay to not interfere with initial load
    }
  }, [
    fetchExchangeRates,
    fetchAllCurrencyRates,
    lastUpdated,
    isHydrated,
    isOnline,
    hasEverBeenOnline,
  ]);

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
      <PullToRefreshWrapper>
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

          {/* Offline Notice */}
          <OfflineNotice />

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
      </PullToRefreshWrapper>
    </>
  );
}
