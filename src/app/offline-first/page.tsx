"use client";

import { useEffect } from "react";
import { OfflineFirstDisplayPanel } from "@/components/layout/OfflineFirstDisplayPanel";
import { KeypadGrid } from "@/components/layout/KeypadGrid";
import { OfflineFirstCurrencySelector } from "@/components/currency/OfflineFirstCurrencySelector";
import { OfflineFirstExchangeRateDisplay } from "@/components/currency/OfflineFirstExchangeRateDisplay";
import { OfflineFirstOfflineNotice } from "@/components/currency/OfflineFirstOfflineNotice";
import { PullToRefreshWrapper } from "@/components/layout/PullToRefreshWrapper";
import { NavigationHeader } from "@/components/layout/NavigationHeader";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { AutomaticRateUpdates } from "@/components/AutomaticRateUpdates";
import { AutoBackgroundUpdates } from "@/components/AutoBackgroundUpdates";
import { OnlineStatusDebug } from "@/components/OnlineStatusDebug";
import { PerformanceComparison } from "@/components/PerformanceComparison";
import { useHydrated } from "@/hooks/useHydrated";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useCalculatorStore } from "@/lib/store/calculator";
import { useOfflineFirstCurrencyStore } from "@/lib/store/currency-offline-first";
import { useTranslation } from "@/lib/i18n/provider";
import {
  registerServiceWorker,
  setupInstallPrompt,
  trackPWAUsage,
} from "@/lib/pwa";
import { currencyLogger } from "@/lib/debug";

export default function OfflineFirstPage() {
  const isHydrated = useHydrated();
  const isOnline = useOnlineStatus();
  const t = useTranslation();
  const { display, previousValue, operation } = useCalculatorStore();
  const {
    setOnlineStatus,
    updateRatesInBackground,
    hasInitialData,
    getCurrentRate,
  } = useOfflineFirstCurrencyStore();

  useEffect(() => {
    // Update store with online status immediately
    setOnlineStatus(isOnline);
  }, [isOnline, setOnlineStatus]);

  useEffect(() => {
    // Initialize PWA features after hydration
    if (isHydrated) {
      currencyLogger.info(
        "Offline-First Page: App hydrated - initializing PWA features",
      );

      // PWA setup (no network dependency)
      registerServiceWorker();
      setupInstallPrompt();
      trackPWAUsage();

      // Start initial background update if online
      if (isOnline) {
        currencyLogger.info(
          "Offline-First Page: Online at startup - triggering background update",
        );
        setTimeout(() => {
          updateRatesInBackground();
        }, 500);
      } else if (!hasInitialData) {
        currencyLogger.info(
          "Offline-First Page: Offline at startup, no initial data - will update when online",
        );
      } else {
        currencyLogger.info(
          "Offline-First Page: Offline at startup, using cached data",
        );
      }
    }
  }, [isHydrated, isOnline, updateRatesInBackground, hasInitialData]);

  // Show loading state only during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">{t.ui.loading}</div>
      </div>
    );
  }

  const currentRate = getCurrentRate();

  return (
    <>
      <OnlineStatusDebug />
      <ServiceWorkerRegistration />
      <AutomaticRateUpdates />
      <AutoBackgroundUpdates />
      <div className="max-h-screen min-h-[90vh] bg-black flex flex-col">
        {/* Navigation Header */}
        <NavigationHeader />

        {/* Offline-First Indicator */}
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-2 mx-2 mb-2">
          <div className="text-green-400 text-sm font-medium text-center">
            🚀 OFFLINE-FIRST DEMO - No Loading Times!
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="mx-2 mb-2">
          <PerformanceComparison />
        </div>

        <PullToRefreshWrapper>
          <div className="p-2 h-full flex flex-col justify-between flex-1">
            {/* Offline Notice */}
            <OfflineFirstOfflineNotice />

            {/* Currency Selectors */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-zinc-400 text-xs mb-1 block">
                  {t.ui.from}
                </label>
                <OfflineFirstCurrencySelector type="base" />
              </div>
              <div>
                <label className="text-zinc-400 text-xs mb-1 block">
                  {t.ui.to}
                </label>
                <OfflineFirstCurrencySelector type="target" />
              </div>
            </div>

            {/* Exchange Rate Display */}
            <OfflineFirstExchangeRateDisplay />

            {/* Display Panel */}
            <OfflineFirstDisplayPanel
              display={display}
              previousValue={previousValue}
              operation={operation}
              conversionRate={currentRate}
            />

            {/* Keypad - nimmt den verfügbaren Platz ein */}
            <div className="flex-1 flex items-end">
              <KeypadGrid />
            </div>
          </div>
        </PullToRefreshWrapper>
      </div>
    </>
  );
}
