"use client";

import { useEffect, useRef, useState } from "react";
import { DisplayPanel } from "@/components/layout/DisplayPanel";
import { KeypadGrid } from "@/components/layout/KeypadGrid";
import { CurrencySelector } from "@/components/currency/CurrencySelector";
import { ExchangeRateDisplay } from "@/components/currency/ExchangeRateDisplay";
import { OfflineNotice } from "@/components/currency/OfflineNotice";
import { PullToRefreshWrapper } from "@/components/layout/PullToRefreshWrapper";
import { NavigationHeader } from "@/components/layout/NavigationHeader";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { AutomaticRateUpdates } from "@/components/AutomaticRateUpdates";
import { AutoBackgroundUpdates } from "@/components/AutoBackgroundUpdates";

import { useHydrated } from "@/hooks/useHydrated";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useCalculatorStore } from "@/lib/store/calculator";
import { useCurrencyStore } from "@/lib/store/currency";
import { useTranslation } from "@/lib/i18n/provider";
import {
  registerServiceWorker,
  setupInstallPrompt,
  trackPWAUsage,
} from "@/lib/pwa";
import { currencyLogger } from "@/lib/debug";

export default function Home() {
  const isHydrated = useHydrated();
  const isOnline = useOnlineStatus();
  const t = useTranslation();
  const { display, previousValue, operation } = useCalculatorStore();
  const {
    setOnlineStatus,
    updateRatesInBackground,
    hasInitialData,
    getCurrentRate,
  } = useCurrencyStore();

  // Touch navigation state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    // Update store with online status immediately
    setOnlineStatus(isOnline);
  }, [isOnline, setOnlineStatus]);

  // Touch handlers for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Left swipe - could navigate to guides or settings
      currencyLogger.info("Left swipe detected");
    }

    if (isRightSwipe) {
      // Right swipe - could refresh rates or navigate back
      currencyLogger.info("Right swipe detected - refreshing rates");
      updateRatesInBackground();
    }
  };

  // Add haptic feedback for iOS
  const triggerHapticFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  useEffect(() => {
    // Initialize PWA features after hydration
    if (isHydrated) {
      currencyLogger.info(
        "🚀 OFFLINE-FIRST: App hydrated - initializing PWA features",
      );

      // PWA setup (no network dependency)
      registerServiceWorker();
      setupInstallPrompt();
      trackPWAUsage();

      // Start initial background update if online
      if (isOnline) {
        currencyLogger.info(
          "🚀 OFFLINE-FIRST: Online at startup - triggering background update",
        );
        setTimeout(() => {
          updateRatesInBackground();
        }, 500);
      } else if (!hasInitialData) {
        currencyLogger.info(
          "🚀 OFFLINE-FIRST: Offline at startup, no initial data - will update when online",
        );
      } else {
        currencyLogger.info(
          "🚀 OFFLINE-FIRST: Offline at startup, using cached data",
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
      <ServiceWorkerRegistration />
      <AutomaticRateUpdates />
      <AutoBackgroundUpdates />
      <div
        ref={containerRef}
        className="max-h-screen min-h-[90vh] bg-black flex flex-col touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Navigation Header */}
        <NavigationHeader />

        <PullToRefreshWrapper>
          <div className="p-2 h-full flex flex-col justify-between flex-1">
            {/* Offline Notice - Now with Offline-First approach */}
            <OfflineNotice />

            {/* Currency Selectors - Now Offline-First */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-zinc-400 text-xs mb-1 block">
                  {t.ui.from}
                </label>
                <CurrencySelector type="base" />
              </div>
              <div>
                <label className="text-zinc-400 text-xs mb-1 block">
                  {t.ui.to}
                </label>
                <CurrencySelector type="target" />
              </div>
            </div>

            {/* Exchange Rate Display - Now Offline-First */}
            <ExchangeRateDisplay />

            {/* Display Panel - Now Offline-First */}
            <DisplayPanel
              display={display}
              previousValue={previousValue}
              operation={operation}
              conversionRate={currentRate}
            />

            {/* Keypad - nimmt den verfügbaren Platz ein */}
            <div className="flex-1 flex items-end">
              <KeypadGrid />
            </div>

            {/* Touch Navigation Hint */}
            {isHydrated && (
              <div className="text-center py-2">
                <p className="text-zinc-600 text-xs">
                  {t.ui.swipeHint || "Swipe right to refresh rates"}
                </p>
              </div>
            )}
          </div>
        </PullToRefreshWrapper>
      </div>
    </>
  );
}
