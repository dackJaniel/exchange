import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Currency } from "@/types/calculator";

// Maximum number of conversions to store
const MAX_HISTORY_ENTRIES = 1000;

// Conversion history entry interface
interface ConversionEntry {
  id: string;
  fromCurrency: Currency;
  toCurrency: Currency;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
  timestamp: number;
  isOnline: boolean;
}

// Conversion statistics
interface ConversionStats {
  totalConversions: number;
  mostUsedCurrencyPairs: Array<{
    pair: string;
    count: number;
  }>;
  averageAmount: number;
  lastConversionDate: Date | null;
}

// Store interface
interface ConversionHistoryStore {
  // State
  conversions: ConversionEntry[];
  isEnabled: boolean;

  // Actions
  addConversion: (
    fromCurrency: Currency,
    toCurrency: Currency,
    fromAmount: number,
    toAmount: number,
    exchangeRate: number,
    isOnline: boolean,
  ) => void;
  clearHistory: () => void;
  getRecentConversions: (limit?: number) => ConversionEntry[];
  getConversionsByDateRange: (
    startDate: Date,
    endDate: Date,
  ) => ConversionEntry[];
  getConversionsByCurrency: (currencyCode: string) => ConversionEntry[];
  getStats: () => ConversionStats;
  setEnabled: (enabled: boolean) => void;
  deleteConversion: (id: string) => void;
  exportHistory: () => string;
}

// Create the store
export const useConversionHistoryStore = create<ConversionHistoryStore>()(
  persist(
    (set, get) => ({
      // Initial state
      conversions: [],
      isEnabled: true,

      // Add a new conversion to history
      addConversion: (
        fromCurrency: Currency,
        toCurrency: Currency,
        fromAmount: number,
        toAmount: number,
        exchangeRate: number,
        isOnline: boolean,
      ) => {
        const state = get();

        // Only log if enabled and online
        if (!state.isEnabled || !isOnline) {
          return;
        }

        // Skip if same currency conversion or invalid amounts
        if (
          fromCurrency.code === toCurrency.code ||
          fromAmount <= 0 ||
          toAmount <= 0
        ) {
          return;
        }

        const newConversion: ConversionEntry = {
          id: crypto.randomUUID(),
          fromCurrency,
          toCurrency,
          fromAmount,
          toAmount,
          exchangeRate,
          timestamp: Date.now(),
          isOnline,
        };

        set((state) => {
          const newConversions = [newConversion, ...state.conversions];

          // Limit the history size
          if (newConversions.length > MAX_HISTORY_ENTRIES) {
            newConversions.splice(MAX_HISTORY_ENTRIES);
          }

          return {
            conversions: newConversions,
          };
        });
      },

      // Clear all conversion history
      clearHistory: () => {
        set({ conversions: [] });
      },

      // Get recent conversions
      getRecentConversions: (limit = 10) => {
        const state = get();
        return state.conversions
          .slice(0, limit)
          .sort((a, b) => b.timestamp - a.timestamp);
      },

      // Get conversions by date range
      getConversionsByDateRange: (startDate: Date, endDate: Date) => {
        const state = get();
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();

        return state.conversions.filter(
          (conversion) =>
            conversion.timestamp >= startTime &&
            conversion.timestamp <= endTime,
        );
      },

      // Get conversions by currency
      getConversionsByCurrency: (currencyCode: string) => {
        const state = get();
        return state.conversions.filter(
          (conversion) =>
            conversion.fromCurrency.code === currencyCode ||
            conversion.toCurrency.code === currencyCode,
        );
      },

      // Get conversion statistics
      getStats: (): ConversionStats => {
        const state = get();
        const conversions = state.conversions;

        if (conversions.length === 0) {
          return {
            totalConversions: 0,
            mostUsedCurrencyPairs: [],
            averageAmount: 0,
            lastConversionDate: null,
          };
        }

        // Count currency pairs
        const pairCounts: Record<string, number> = {};
        let totalAmount = 0;

        conversions.forEach((conversion) => {
          const pair = `${conversion.fromCurrency.code}/${conversion.toCurrency.code}`;
          pairCounts[pair] = (pairCounts[pair] || 0) + 1;
          totalAmount += conversion.fromAmount;
        });

        // Sort pairs by usage
        const mostUsedPairs = Object.entries(pairCounts)
          .map(([pair, count]) => ({ pair, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        return {
          totalConversions: conversions.length,
          mostUsedCurrencyPairs: mostUsedPairs,
          averageAmount: totalAmount / conversions.length,
          lastConversionDate:
            conversions.length > 0 ? new Date(conversions[0].timestamp) : null,
        };
      },

      // Enable/disable history logging
      setEnabled: (enabled: boolean) => {
        set({ isEnabled: enabled });
      },

      // Delete a specific conversion
      deleteConversion: (id: string) => {
        set((state) => ({
          conversions: state.conversions.filter(
            (conversion) => conversion.id !== id,
          ),
        }));
      },

      // Export history as JSON string
      exportHistory: () => {
        const state = get();
        return JSON.stringify(
          {
            conversions: state.conversions,
            exportDate: new Date().toISOString(),
            version: "1.0",
          },
          null,
          2,
        );
      },
    }),
    {
      name: "conversion-history-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversions: state.conversions,
        isEnabled: state.isEnabled,
      }),
    },
  ),
);

// Helper function to format conversion for display
export const formatConversion = (conversion: ConversionEntry): string => {
  return `${conversion.fromAmount.toFixed(2)} ${conversion.fromCurrency.code} → ${conversion.toAmount.toFixed(2)} ${conversion.toCurrency.code}`;
};

// Helper function to get conversion display data
export const getConversionDisplayData = (conversion: ConversionEntry) => {
  return {
    id: conversion.id,
    fromAmount: conversion.fromAmount,
    fromCurrency: conversion.fromCurrency,
    toAmount: conversion.toAmount,
    toCurrency: conversion.toCurrency,
    rate: conversion.exchangeRate,
    date: new Date(conversion.timestamp),
    isOnline: conversion.isOnline,
    formattedString: formatConversion(conversion),
  };
};

export type { ConversionEntry, ConversionStats, ConversionHistoryStore };
