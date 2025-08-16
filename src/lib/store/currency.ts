import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CurrencyState, Currency } from '@/types/calculator';

// Popular currencies with their symbols and flags
const CURRENCIES: Currency[] = [
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', flag: '🇨🇿' },
    { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', flag: '🇵🇱' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', flag: '🇨🇭' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso', flag: '🇲🇽' },
];

// Cache duration: 15 minutes
const CACHE_DURATION = 15 * 60 * 1000;

// Interface for cached exchange rates
interface CachedRates {
    [baseCurrency: string]: {
        rates: { [targetCurrency: string]: number };
        timestamp: number;
    };
}

interface CurrencyStore extends CurrencyState {
    currencies: Currency[];
    isHydrated: boolean;
    cachedRates: CachedRates;
    isOnline: boolean;
    hasEverBeenOnline: boolean;
    setBaseCurrency: (currency: Currency) => void;
    setTargetCurrency: (currency: Currency) => void;
    swapCurrencies: () => void;
    fetchExchangeRates: (forceRefresh?: boolean) => Promise<void>;
    fetchAllCurrencyRates: () => Promise<void>;
    convertAmount: (amount: number) => number;
    getCurrencyByCode: (code: string) => Currency | undefined;
    setOnlineStatus: (status: boolean) => void;
    isCacheValid: (baseCurrency: string) => boolean;
    getRatesFromCache: (baseCurrency: string, targetCurrency: string) => number | null;
}

const initialState: CurrencyState = {
    baseCurrency: CURRENCIES[0], // EUR
    targetCurrency: CURRENCIES[1], // USD
    rates: {},
    lastUpdated: null,
    isLoading: false,
    error: null,
};

export const useCurrencyStore = create<CurrencyStore>()(
    persist(
        (set, get) => ({
            ...initialState,
            currencies: CURRENCIES,
            isHydrated: false,
            cachedRates: {},
            isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
            hasEverBeenOnline: false,

            setOnlineStatus: (status: boolean) => {
                const state = get();
                console.log(`Currency store: Setting online status to ${status} (was ${state.isOnline})`);

                // Update the state immediately for UI feedback
                set({ isOnline: status });

                if (status) {
                    // When coming back online, mark as having been online and refresh rates
                    if (!state.hasEverBeenOnline) {
                        console.log('First time online - marking hasEverBeenOnline=true');
                        set({ hasEverBeenOnline: true });
                    }
                    // Fetch current currency rates in background when online
                    console.log('Going online - fetching currency rates for current pair');
                    setTimeout(() => {
                        state.fetchExchangeRates(true); // Force refresh when coming back online
                    }, 1000);

                    // Also fetch comprehensive rates in background
                    setTimeout(() => {
                        state.fetchAllCurrencyRates();
                    }, 2000);
                } else {
                    console.log('Going offline - will use cached rates');
                }
            },

            isCacheValid: (baseCurrency: string): boolean => {
                const state = get();
                const cached = state.cachedRates[baseCurrency];
                if (!cached) return false;

                const now = Date.now();
                return (now - cached.timestamp) < CACHE_DURATION;
            },

            getRatesFromCache: (baseCurrency: string, targetCurrency: string): number | null => {
                const state = get();
                const cached = state.cachedRates[baseCurrency];
                if (!cached) return null;

                return cached.rates[targetCurrency] || null;
            },

            setBaseCurrency: (currency: Currency) => {
                const state = get();
                set({ baseCurrency: currency });

                // Only fetch rates if online, otherwise use cache
                if (state.isOnline) {
                    state.fetchExchangeRates();
                }
            },

            setTargetCurrency: (currency: Currency) => {
                set({ targetCurrency: currency });
                // No need to fetch rates, conversion will use cached data
            },

            swapCurrencies: () => {
                const state = get();
                set({
                    baseCurrency: state.targetCurrency,
                    targetCurrency: state.baseCurrency,
                });
                // Only fetch rates if online, otherwise use cache
                if (state.isOnline) {
                    state.fetchExchangeRates();
                }
            },

            fetchExchangeRates: async (forceRefresh = false) => {
                const state = get();

                // If offline and we have cached data, don't attempt to fetch
                if (!state.isOnline && !forceRefresh) {
                    console.log('Offline: Using cached exchange rates');
                    return;
                }

                // If we have valid cached data and not forcing refresh, use cache
                if (!forceRefresh && state.isCacheValid(state.baseCurrency.code)) {
                    const cachedRate = state.getRatesFromCache(state.baseCurrency.code, state.targetCurrency.code);
                    if (cachedRate !== null) {
                        console.log('Using cached exchange rates');
                        return;
                    }
                }

                set({ isLoading: true, error: null });

                try {
                    const response = await fetch(
                        `https://api.exchangerate-api.com/v4/latest/${state.baseCurrency.code}`
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch exchange rates');
                    }

                    const data = await response.json();
                    const rates = data.rates || data.conversion_rates || {};

                    // Update main rates
                    set({
                        rates,
                        lastUpdated: new Date(),
                        isLoading: false,
                        error: null,
                    });

                    // Cache the rates
                    const newCachedRates = { ...state.cachedRates };
                    newCachedRates[state.baseCurrency.code] = {
                        rates,
                        timestamp: Date.now(),
                    };
                    set({ cachedRates: newCachedRates });

                } catch (error) {
                    console.error('Failed to fetch exchange rates:', error);

                    // Try to use cached data as fallback
                    const cachedRate = state.getRatesFromCache(state.baseCurrency.code, state.targetCurrency.code);
                    if (cachedRate !== null) {
                        console.log('API failed, using cached rates');
                        set({
                            isLoading: false,
                            error: 'Using cached rates (network unavailable)'
                        });
                    } else {
                        set({
                            isLoading: false,
                            error: 'Unable to fetch exchange rates and no cached data available',
                        });
                    }
                }
            },

            fetchAllCurrencyRates: async () => {
                const state = get();

                if (!state.isOnline) {
                    console.log('Offline: Skipping background currency fetch');
                    return;
                }

                console.log('Fetching all currency rates in background...');

                // Fetch rates for all major currencies to build comprehensive cache
                const baseCurrencies = ['EUR', 'USD', 'GBP', 'CHF', 'CZK', 'PLN']; // Extended list
                const promises = baseCurrencies.map(async (baseCurrency) => {
                    try {
                        const response = await fetch(
                            `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
                            { cache: 'no-cache' } // Ensure fresh data
                        );

                        if (!response.ok) {
                            throw new Error(`Failed to fetch rates for ${baseCurrency}`);
                        }

                        const data = await response.json();
                        const rates = data.rates || data.conversion_rates || {};

                        return {
                            baseCurrency,
                            rates,
                            timestamp: Date.now(),
                        };
                    } catch (error) {
                        console.error(`Failed to fetch rates for ${baseCurrency}:`, error);
                        return null;
                    }
                });

                const results = await Promise.all(promises);
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
                    console.log(`Background currency rates updated (${successCount}/${baseCurrencies.length} successful)`);
                }
            },

            convertAmount: (amount: number): number => {
                const state = get();
                if (isNaN(amount)) {
                    return 0;
                }

                // If converting from the same currency, return original amount
                if (state.baseCurrency.code === state.targetCurrency.code) {
                    return amount;
                }

                // Strategy: Try multiple approaches to find a conversion rate

                // 1. Try direct conversion using cached rates for the base currency
                const directRate = state.getRatesFromCache(state.baseCurrency.code, state.targetCurrency.code);
                if (directRate !== null) {
                    return amount * directRate;
                }

                // 2. Try using current rates
                const currentBaseRate = state.rates[state.baseCurrency.code] || 1;
                const currentTargetRate = state.rates[state.targetCurrency.code];
                if (currentTargetRate && currentBaseRate) {
                    return amount * (currentTargetRate / currentBaseRate);
                }

                // 3. Try reverse conversion (target as base currency)
                const reverseRate = state.getRatesFromCache(state.targetCurrency.code, state.baseCurrency.code);
                if (reverseRate !== null && reverseRate !== 0) {
                    return amount / reverseRate;
                }

                // 4. Try using EUR as intermediary (most cached rates are EUR-based)
                if (state.baseCurrency.code !== 'EUR' && state.targetCurrency.code !== 'EUR') {
                    const baseToEUR = state.getRatesFromCache('EUR', state.baseCurrency.code);
                    const eurToTarget = state.getRatesFromCache('EUR', state.targetCurrency.code);

                    if (baseToEUR && eurToTarget && baseToEUR !== 0) {
                        // Convert: amount / baseToEUR * eurToTarget
                        return (amount / baseToEUR) * eurToTarget;
                    }
                }

                // 5. Try using USD as intermediary
                if (state.baseCurrency.code !== 'USD' && state.targetCurrency.code !== 'USD') {
                    const baseToUSD = state.getRatesFromCache('USD', state.baseCurrency.code);
                    const usdToTarget = state.getRatesFromCache('USD', state.targetCurrency.code);

                    if (baseToUSD && usdToTarget && baseToUSD !== 0) {
                        return (amount / baseToUSD) * usdToTarget;
                    }
                }

                console.warn(`No conversion path found for ${state.baseCurrency.code} -> ${state.targetCurrency.code}`);
                return 0;
            },

            getCurrencyByCode: (code: string): Currency | undefined => {
                return CURRENCIES.find((currency) => currency.code === code);
            },
        }),
        {
            name: 'currency-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                baseCurrency: state.baseCurrency,
                targetCurrency: state.targetCurrency,
                rates: state.rates,
                lastUpdated: state.lastUpdated,
                cachedRates: state.cachedRates,
                hasEverBeenOnline: state.hasEverBeenOnline,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.isHydrated = true;
                }
            },
        }
    )
);
