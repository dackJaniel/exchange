'use client';

import { useEffect } from 'react';
import { DisplayPanel } from '@/components/layout/DisplayPanel';
import { KeypadGrid } from '@/components/layout/KeypadGrid';
import { CurrencySelector } from '@/components/currency/CurrencySelector';
import { ExchangeRateDisplay } from '@/components/currency/ExchangeRateDisplay';
import { OfflineNotice } from '@/components/currency/OfflineNotice';
import { PullToRefreshWrapper } from '@/components/layout/PullToRefreshWrapper';
import { NavigationHeader } from '@/components/layout/NavigationHeader';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import { AutomaticRateUpdates } from '@/components/AutomaticRateUpdates';
import { AutoBackgroundUpdates } from '@/components/AutoBackgroundUpdates';
import { OnlineStatusDebug } from '@/components/OnlineStatusDebug';
import { useHydrated } from '@/hooks/useHydrated';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useCalculatorStore } from '@/lib/store/calculator';
import { useCurrencyStore } from '@/lib/store/currency';
import {
  registerServiceWorker,
  setupInstallPrompt,
  trackPWAUsage,
} from '@/lib/pwa';
import { currencyLogger } from '@/lib/debug';

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
        currencyLogger.info(
          'First time online - fetching initial currency rates...'
        );
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
      <OnlineStatusDebug />
      <ServiceWorkerRegistration />
      <AutomaticRateUpdates />
      <AutoBackgroundUpdates />
      <div className='max-h-screen min-h-[90vh] bg-black flex flex-col'>
        {/* Navigation Header */}
        <NavigationHeader />

        <PullToRefreshWrapper>
          <div className='p-2 h-full flex flex-col justify-between flex-1'>
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
      </div>
    </>
  );
}
