'use client';

import Link from 'next/link';
import { useOfflineFirstCurrencyStore } from '@/lib/store/currency-offline-first';
import { useTranslation } from '@/lib/i18n/provider';

export default function USDAUDCalculator() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            US Dollar to Australian Dollar Calculator
          </h1>
          <p className="text-xl text-gray-300">
            Convert USD to AUD with live exchange rates
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Use Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}