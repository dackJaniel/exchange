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

interface CurrencyStore extends CurrencyState {
    currencies: Currency[];
    isHydrated: boolean;
    setBaseCurrency: (currency: Currency) => void;
    setTargetCurrency: (currency: Currency) => void;
    swapCurrencies: () => void;
    fetchExchangeRates: () => Promise<void>;
    convertAmount: (amount: number) => number;
    getCurrencyByCode: (code: string) => Currency | undefined;
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

            setBaseCurrency: (currency: Currency) => {
                const state = get();
                set({ baseCurrency: currency });
                // Always fetch fresh rates when base currency changes
                state.fetchExchangeRates();
            },

            setTargetCurrency: (currency: Currency) => {
                set({ targetCurrency: currency });
            },

            swapCurrencies: () => {
                const state = get();
                set({
                    baseCurrency: state.targetCurrency,
                    targetCurrency: state.baseCurrency,
                });
                // Fetch new rates for the new base currency
                state.fetchExchangeRates();
            },

            fetchExchangeRates: async () => {
                const state = get();
                set({ isLoading: true, error: null });

                try {
                    // Using a simpler, more reliable free API
                    const response = await fetch(
                        `https://api.exchangerate-api.com/v4/latest/${state.baseCurrency.code}`
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch exchange rates');
                    }

                    const data = await response.json();

                    // The API returns rates in a "rates" property
                    set({
                        rates: data.rates || data.conversion_rates || {},
                        lastUpdated: new Date(),
                        isLoading: false,
                        error: null,
                    });
                } catch {
                    console.warn('API failed, using mock data for development');
                    // Fallback to mock data for development
                    set({
                        rates: {
                            'EUR': 1,
                            'USD': 1.09,
                            'GBP': 0.86,
                            'CZK': 25.4,
                            'PLN': 4.33,
                            'CHF': 0.94,
                            'CAD': 1.48,
                            'AUD': 1.66,
                            'JPY': 162.8,
                            'CNY': 7.89,
                            'MXN': 18.75,
                        },
                        lastUpdated: new Date(),
                        isLoading: false,
                        error: null,
                    });
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

                // The rates are based on the baseCurrency, so:
                // - If baseCurrency is EUR and we want USD, multiply by USD rate
                // - If baseCurrency is USD and we want EUR, divide by EUR rate (or multiply by 1/EUR rate)

                const baseRate = state.rates[state.baseCurrency.code] || 1;
                const targetRate = state.rates[state.targetCurrency.code];

                if (!targetRate) {
                    return 0; // Return 0 if no rate available
                }

                // Convert: amount * (targetRate / baseRate)
                return amount * (targetRate / baseRate);
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
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.isHydrated = true;
                }
            },
        }
    )
);
