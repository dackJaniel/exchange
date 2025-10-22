"use client";

import { useHydrated } from "@/hooks/useHydrated";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/provider";
import { useCurrencyStore } from "@/lib/store/currency";

export function ExchangeRateDisplay() {
  const isHydrated = useHydrated();
  const isOnline = useOnlineStatus();
  const t = useTranslation();

  const {
    baseCurrency,
    targetCurrency,
    getDisplayRate,
    isUpdating,
    updateRatesInBackground,
    hasInitialData,
    updateError,
  } = useCurrencyStore();

  const { rate, isFromCache, age } = getDisplayRate();

  const handleRefresh = () => {
    if (isOnline && !isUpdating) {
      updateRatesInBackground();
    }
  };

  const formatDisplayAge = (ageString: string) => {
    if (ageString === "now") return t.ui.justNow;
    if (ageString === "unknown") return t.ui.never;
    return ageString; // "5m ago", "2h ago", etc.
  };

  return (
    <div className="flex items-center justify-between text-xs text-zinc-500 px-1 py-0.5 mb-1">
      <div className="flex items-center gap-2">
        {/* Online Status Indicator */}
        <div className="flex items-center gap-1">
          {isOnline ? (
            <Wifi className="h-3 w-3 text-green-500" />
          ) : (
            <WifiOff className="h-3 w-3 text-red-500" />
          )}
          <span className={isOnline ? "text-green-500" : "text-red-500"}>
            {isOnline ? t.ui.online : t.ui.offline}
          </span>
          {!isHydrated && (
            <span className="text-zinc-600">({t.ui.loading})</span>
          )}
        </div>

        {/* Exchange Rate - Always show if available */}
        {rate && (
          <span>
            | 1 {baseCurrency.code} = {rate.toFixed(4)} {targetCurrency.code}
            {isFromCache && ` (${t.ui.cached})`}
          </span>
        )}

        {/* Show status messages */}
        {!rate && !hasInitialData && (
          <span className="text-orange-500">| {t.ui.noRatesOffline}</span>
        )}

        {isUpdating && (
          <span className="text-blue-500">| {t.ui.updating}...</span>
        )}

        {updateError && !rate && (
          <span className="text-red-500">| {t.ui.updateFailed}</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <span>{formatDisplayAge(age)}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 text-zinc-500 hover:text-white disabled:opacity-30"
          onClick={handleRefresh}
          disabled={isUpdating || !isOnline}
          title={!isOnline ? t.ui.offlineUpdate : t.ui.refreshRates}
        >
          <RefreshCw
            className={`h-2 w-2 ${isUpdating ? "animate-spin" : ""}`}
          />
        </Button>
      </div>
    </div>
  );
}
