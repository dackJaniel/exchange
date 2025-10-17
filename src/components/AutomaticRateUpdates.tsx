"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "@/lib/store/currency";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function AutomaticRateUpdates() {
  // DISABLED: Automatic background sync to prevent error toasts on startup
  // The offline-first architecture handles updates more efficiently
  console.log("AutomaticRateUpdates: Disabled in favor of offline-first architecture");

  // This component doesn't render anything and is now disabled
  return null;
}
