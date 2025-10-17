"use client";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useOfflineFirstCurrencyStore } from "@/lib/store/currency-offline-first";
import { useTranslation, useI18n } from "@/lib/i18n/provider";
import { WifiOff, Database } from "lucide-react";

export function OfflineFirstOfflineNotice() {
  const isOnline = useOnlineStatus();
  const {
    hasInitialData,
    getDisplayRate,
    lastUpdated,
  } = useOfflineFirstCurrencyStore();
  const t = useTranslation();
  const { locale } = useI18n();

  const { rate } = getDisplayRate();

  // Only show notice when offline
  if (isOnline) {
    return null;
  }

  // If offline but we have data available
  if (hasInitialData && rate) {
    return (
      <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-3 mx-2 mb-3">
        <div className="flex items-center gap-2 text-blue-400">
          <Database className="h-4 w-4" />
          <div className="flex-1">
            <h3 className="font-medium text-sm">{t.ui.offlineMode}</h3>
            <p className="text-xs text-blue-300 mt-1">
              {t.ui.offlineCachedData}{" "}
              {lastUpdated
                ? new Date(lastUpdated).toLocaleString(
                    locale === "de" ? "de-DE" : "en-US",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )
                : t.ui.unknown}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If offline and no data available
  return (
    <div className="bg-orange-500/20 border border-orange-500 rounded-lg p-3 mx-2 mb-3">
      <div className="flex items-center gap-2 text-orange-500">
        <WifiOff className="h-4 w-4" />
        <div className="flex-1">
          <h3 className="font-medium text-sm">{t.ui.offlineTitle}</h3>
          <p className="text-xs text-orange-400 mt-1">
            {t.ui.offlineNoData || "No exchange rate data available offline. Connect to internet to load initial data."}
          </p>
        </div>
      </div>
    </div>
  );
}
