import { create } from "zustand";
import { persist } from "zustand/middleware";
import { currencyLogger } from "@/lib/debug";

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

// All available currencies
const CURRENCIES: Currency[] = [
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺" },
  { code: "RON", name: "Romanian Leu", symbol: "lei", flag: "🇷🇴" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв", flag: "🇧🇬" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn", flag: "🇭🇷" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flag: "🇦🇷" },
  { code: "CLP", name: "Chilean Peso", symbol: "$", flag: "🇨🇱" },
  { code: "COP", name: "Colombian Peso", symbol: "$", flag: "🇨🇴" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/", flag: "🇵🇪" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U", flag: "🇺🇾" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", flag: "🇪🇬" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "MAD", flag: "🇲🇦" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", flag: "🇬🇭" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت", flag: "🇹🇳" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  { code: "TWD", name: "Taiwan Dollar", symbol: "NT$", flag: "🇹🇼" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", flag: "🇮🇱" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼", flag: "🇶🇦" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇼" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب", flag: "🇧🇭" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼", flag: "🇴🇲" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا", flag: "🇯🇴" },
  { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل", flag: "🇱🇧" },
];

// Cache duration: 15 minutes
const CACHE_DURATION = 15 * 60 * 1000;

// Background update timeout: 3 seconds (faster than old 10 second timeout)
const BACKGROUND_UPDATE_TIMEOUT = 3000;

interface CachedRates {
  rates: Record<string, number>;
  timestamp: number;
}

interface OfflineFirstCurrencyStore {
  // Core data
  currencies: Currency[];
  baseCurrency: Currency;
  targetCurrency: Currency;
  rates: Record<string, number>;
  lastUpdated: Date | null;

  // Cache management
  cachedRates: Record<string, CachedRates>;

  // Status flags
  isOnline: boolean;
  isUpdating: boolean; // Background updates, never blocks UI
  hasInitialData: boolean;
  updateError: string | null;

  // Actions
  setOnlineStatus: (status: boolean) => void;
  setBaseCurrency: (currency: Currency) => void;
  setTargetCurrency: (currency: Currency) => void;
  swapCurrencies: () => void;

  // Data access - always returns immediately
  getCurrentRate: () => number | null;
  getDisplayRate: () => {
    rate: number | null;
    isFromCache: boolean;
    age: string;
  };

  // Background operations
  updateRatesInBackground: () => void;
  updateAllRatesInBackground: () => void;

  // Cache utilities
  isCacheValid: (baseCurrency: string) => boolean;
  getRatesFromCache: (
    baseCurrency: string,
    targetCurrency: string,
  ) => number | null;
}

const initialState = {
  baseCurrency: { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  targetCurrency: { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  rates: {},
  lastUpdated: null,
  cachedRates: {},
  isOnline: false, // Start offline by default - safer assumption
  isUpdating: false,
  hasInitialData: false,
  updateError: null,
};

export const useOfflineFirstCurrencyStore = create<OfflineFirstCurrencyStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      currencies: CURRENCIES,

      setOnlineStatus: (status: boolean) => {
        const prevStatus = get().isOnline;
        set({ isOnline: status });

        currencyLogger.debug(`Online status: ${prevStatus} → ${status}`);

        // If coming online for first time or after being offline
        if (status && !prevStatus) {
          // Start background update immediately when coming online
          setTimeout(() => {
            const state = get();
            if (state.isOnline) {
              state.updateRatesInBackground();
              // Also update comprehensive cache after delay
              setTimeout(() => {
                if (get().isOnline) {
                  get().updateAllRatesInBackground();
                }
              }, 5000);
            }
          }, 100);
        }
      },

      getCurrentRate: () => {
        const state = get();

        // Try current rates first
        const currentRate = state.rates[state.targetCurrency.code];
        if (currentRate) {
          return currentRate;
        }

        // Fallback to cache
        const cachedRate = state.getRatesFromCache(
          state.baseCurrency.code,
          state.targetCurrency.code,
        );

        return cachedRate;
      },

      getDisplayRate: () => {
        const state = get();

        // Try current rates first
        let rate: number | null =
          state.rates[state.targetCurrency.code] || null;
        let isFromCache = false;
        let timestamp = state.lastUpdated;

        if (!rate) {
          // Use cached data
          const cachedData = state.cachedRates[state.baseCurrency.code];
          if (cachedData) {
            rate = cachedData.rates[state.targetCurrency.code] || null;
            isFromCache = true;
            timestamp = new Date(cachedData.timestamp);
          }
        }

        // Calculate age
        let age = "unknown";
        if (timestamp) {
          const now = new Date();
          const diffMinutes = Math.floor(
            (now.getTime() - new Date(timestamp).getTime()) / (1000 * 60),
          );
          if (diffMinutes < 1) {
            age = "now";
          } else if (diffMinutes < 60) {
            age = `${diffMinutes}m ago`;
          } else if (diffMinutes < 1440) {
            age = `${Math.floor(diffMinutes / 60)}h ago`;
          } else {
            age = `${Math.floor(diffMinutes / 1440)}d ago`;
          }
        }

        return { rate, isFromCache, age };
      },

      isCacheValid: (baseCurrency: string) => {
        const state = get();
        const cached = state.cachedRates[baseCurrency];
        if (!cached) return false;

        const now = Date.now();
        return now - cached.timestamp < CACHE_DURATION;
      },

      getRatesFromCache: (baseCurrency: string, targetCurrency: string) => {
        const state = get();
        const cached = state.cachedRates[baseCurrency];
        if (!cached) return null;

        return cached.rates[targetCurrency] || null;
      },

      setBaseCurrency: (currency: Currency) => {
        set({ baseCurrency: currency });

        // Check if we have cached data for this currency
        const state = get();
        const cachedRate = state.getRatesFromCache(
          currency.code,
          state.targetCurrency.code,
        );

        if (cachedRate) {
          // Update current rates with cached data immediately
          const cachedData = state.cachedRates[currency.code];
          if (cachedData) {
            set({
              rates: cachedData.rates,
              lastUpdated: new Date(cachedData.timestamp),
            });
          }
        }

        // Start background update if online
        if (state.isOnline) {
          setTimeout(() => state.updateRatesInBackground(), 100);
        }
      },

      setTargetCurrency: (currency: Currency) => {
        set({ targetCurrency: currency });
        // No need to fetch new data - conversion uses existing rates
      },

      swapCurrencies: () => {
        const state = get();
        const newBase = state.targetCurrency;
        const newTarget = state.baseCurrency;

        set({
          baseCurrency: newBase,
          targetCurrency: newTarget,
        });

        // Check cached data for new base currency
        const cachedRate = state.getRatesFromCache(
          newBase.code,
          newTarget.code,
        );
        if (cachedRate) {
          const cachedData = state.cachedRates[newBase.code];
          if (cachedData) {
            set({
              rates: cachedData.rates,
              lastUpdated: new Date(cachedData.timestamp),
            });
          }
        }

        // Background update if online
        if (state.isOnline) {
          setTimeout(() => state.updateRatesInBackground(), 100);
        }
      },

      updateRatesInBackground: async () => {
        const state = get();

        if (!state.isOnline) {
          currencyLogger.debug("Skipping background update - offline");
          return;
        }

        if (state.isUpdating) {
          currencyLogger.debug("Already updating - skipping duplicate request");
          return;
        }

        // Check if we have fresh cache and don't need to update
        if (
          !state.hasInitialData ||
          state.isCacheValid(state.baseCurrency.code)
        ) {
          const cachedRate = state.getRatesFromCache(
            state.baseCurrency.code,
            state.targetCurrency.code,
          );
          if (cachedRate && !state.hasInitialData) {
            // Use cached data for initial load
            const cachedData = state.cachedRates[state.baseCurrency.code];
            if (cachedData) {
              set({
                rates: cachedData.rates,
                lastUpdated: new Date(cachedData.timestamp),
                hasInitialData: true,
              });
              currencyLogger.info("Loaded initial data from cache");
            }
          }

          if (
            state.hasInitialData &&
            state.isCacheValid(state.baseCurrency.code)
          ) {
            currencyLogger.debug("Cache is still valid - skipping update");
            return;
          }
        }

        set({ isUpdating: true, updateError: null });

        try {
          currencyLogger.info(
            `Background update: fetching rates for ${state.baseCurrency.code}`,
          );

          const controller = new AbortController();
          const timeoutId = setTimeout(
            () => controller.abort(),
            BACKGROUND_UPDATE_TIMEOUT,
          );

          const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${state.baseCurrency.code}`,
            {
              signal: controller.signal,
              cache: "no-cache",
            },
          );

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          const rates = data.rates || data.conversion_rates || {};

          if (Object.keys(rates).length === 0) {
            throw new Error("No rates received from API");
          }

          // Update main rates and cache
          const now = new Date();
          set({
            rates,
            lastUpdated: now,
            hasInitialData: true,
            updateError: null,
          });

          // Update cache
          const newCachedRates = { ...state.cachedRates };
          newCachedRates[state.baseCurrency.code] = {
            rates,
            timestamp: now.getTime(),
          };
          set({ cachedRates: newCachedRates });

          currencyLogger.info(
            `Background update successful for ${state.baseCurrency.code}`,
          );
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          currencyLogger.warn(`Background update failed: ${errorMessage}`);

          set({
            updateError: errorMessage,
          });

          // Don't show error to user if we have cached data
          const cachedRate = state.getRatesFromCache(
            state.baseCurrency.code,
            state.targetCurrency.code,
          );
          if (cachedRate && !state.hasInitialData) {
            const cachedData = state.cachedRates[state.baseCurrency.code];
            if (cachedData) {
              set({
                rates: cachedData.rates,
                lastUpdated: new Date(cachedData.timestamp),
                hasInitialData: true,
              });
              currencyLogger.info(
                "Fallback to cached data after failed update",
              );
            }
          }
        } finally {
          set({ isUpdating: false });
        }
      },

      updateAllRatesInBackground: async () => {
        const state = get();

        if (!state.isOnline) {
          currencyLogger.debug("Skipping comprehensive update - offline");
          return;
        }

        currencyLogger.info(
          "Starting comprehensive background currency update",
        );

        // Fetch rates for major currencies to build comprehensive cache
        const baseCurrencies = [
          "EUR",
          "USD",
          "GBP",
          "CHF",
          "JPY",
          "CZK",
          "PLN",
        ];

        const updatePromises = baseCurrencies.map(async (baseCurrency) => {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(
              () => controller.abort(),
              BACKGROUND_UPDATE_TIMEOUT,
            );

            const response = await fetch(
              `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
              {
                signal: controller.signal,
                cache: "no-cache",
              },
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
              throw new Error(`HTTP ${response.status} for ${baseCurrency}`);
            }

            const data = await response.json();
            const rates = data.rates || data.conversion_rates || {};

            return {
              baseCurrency,
              rates,
              timestamp: Date.now(),
            };
          } catch (error) {
            currencyLogger.warn(
              `Failed to fetch rates for ${baseCurrency}:`,
              error,
            );
            return null;
          }
        });

        try {
          const results = await Promise.all(updatePromises);
          const newCachedRates = { ...state.cachedRates };
          let successCount = 0;

          results.forEach((result) => {
            if (result) {
              newCachedRates[result.baseCurrency] = {
                rates: result.rates,
                timestamp: result.timestamp,
              };
              successCount++;
            }
          });

          if (successCount > 0) {
            set({ cachedRates: newCachedRates });
            currencyLogger.info(
              `Comprehensive update completed: ${successCount}/${baseCurrencies.length} successful`,
            );
          }
        } catch (error) {
          currencyLogger.warn("Comprehensive update failed:", error);
        }
      },
    }),
    {
      name: "currency-store-offline-first",
      version: 1,
      // Only persist data, not status flags
      partialize: (state) => ({
        baseCurrency: state.baseCurrency,
        targetCurrency: state.targetCurrency,
        rates: state.rates,
        lastUpdated: state.lastUpdated,
        cachedRates: state.cachedRates,
        hasInitialData: state.hasInitialData,
      }),
    },
  ),
);
