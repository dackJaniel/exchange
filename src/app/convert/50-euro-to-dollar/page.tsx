'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useOfflineFirstCurrencyStore } from '@/lib/store/currency-offline-first';
import { currencies, getCurrencyByCode } from '@/lib/currencies';
import { useTranslation } from '@/lib/i18n/provider';
import { formatNumber } from '@/lib/utils';

export default function Convert50EURToUSD() {
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslation();
  const { baseCurrency, targetCurrency, setBaseCurrency, setTargetCurrency, getCurrentRate, isOnline } = useOfflineFirstCurrencyStore();

  const fromCurrency = getCurrencyByCode('EUR') || currencies.find(c => c.code === 'EUR')!;
  const toCurrency = getCurrencyByCode('USD') || currencies.find(c => c.code === 'USD')!;

  useEffect(() => {
    // Set the currencies first
    setBaseCurrency(fromCurrency);
    setTargetCurrency(toCurrency);
  }, [setBaseCurrency, setTargetCurrency, fromCurrency, toCurrency]);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        // Only get rate if currencies are set correctly
        if (baseCurrency.code === 'EUR' && targetCurrency.code === 'USD') {
          const currentRate = getCurrentRate();
          if (currentRate) {
            setRate(currentRate);
            setResult(50 * currentRate);
          }
        }
      } catch (error) {
        console.error('Error fetching rate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [baseCurrency.code, targetCurrency.code, getCurrentRate]);

  // Related amounts for internal linking
  const relatedAmounts = [100, 500, 1000, 200];

  // FAQ data
  const faqData = [
    {
      question: "How much is 50 Euro in US Dollar?",
      answer: result
        ? `50 Euro equals ${formatNumber(result)} US Dollar at the current exchange rate of ${rate?.toFixed(4)}.`
        : `The current exchange rate will determine how much 50 Euro is worth in US Dollar.`
    },
    {
      question: "Is 50 EUR to USD a good conversion rate?",
      answer: "Exchange rates fluctuate constantly. Compare our rate with other providers and consider historical trends to determine if it's favorable for your needs."
    },
    {
      question: "How often do exchange rates update?",
      answer: "Our exchange rates are updated every 15 minutes from reliable financial data sources to ensure accuracy."
    },
    {
      question: "Can I convert 50 EUR to USD offline?",
      answer: "Yes! Our Progressive Web App works offline using the last updated exchange rates, perfect for travel or areas with poor internet connection."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "50 Euro to US Dollar Converter",
            "description": "Convert 50 EUR to USD with live exchange rates",
            "url": "https://exchange.danielhilmer.de/convert/50-euro-to-dollar",
            "applicationCategory": "FinanceApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-orange-500 hover:underline">Home</Link>
          <span className="mx-2 text-gray-500">›</span>
          <Link href="/convert" className="text-orange-500 hover:underline">Convert</Link>
          <span className="mx-2 text-gray-500">›</span>
          <span className="text-gray-300">50 EUR to USD</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            50 Euro to US Dollar Converter
          </h1>
          <p className="text-gray-300 text-lg">
            Convert 50 EUR to USD with live exchange rates
          </p>
        </div>

        {/* Main Conversion Display */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {fromCurrency.flag} {formatNumber(50)}
              </div>
              <div className="text-gray-400">EUR - Euro</div>
            </div>

            <div className="text-center">
              <div className="text-orange-500 text-lg">⇄</div>
              <div className="text-sm text-gray-400">
                {rate ? `1 EUR = ${rate.toFixed(4)} USD` : 'Loading rate...'}
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {loading ? 'Loading...' : result ? `${toCurrency.flag} ${formatNumber(result)}` : 'Rate unavailable'}
              </div>
              <div className="text-gray-400">USD - US Dollar</div>
            </div>
          </div>

          {!isOnline && (
            <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded text-yellow-200 text-sm">
              ⚠️ You're offline. Showing last cached exchange rate.
            </div>
          )}
        </div>

        {/* Related Conversions */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Other Popular Conversions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedAmounts.map(relatedAmount => {
              const relatedResult = rate ? relatedAmount * rate : null;
              return (
                <Link
                  key={relatedAmount}
                  href={`/convert/${relatedAmount}-euro-to-dollar`}
                  className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded text-center transition-colors"
                >
                  <div className="font-semibold">{relatedAmount} EUR</div>
                  <div className="text-sm text-gray-400">
                    {relatedResult ? `≈ ${formatNumber(relatedResult)} USD` : 'Calculate'}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-zinc-700 pb-4">
                <h3 className="font-semibold mb-2 text-orange-500">{faq.question}</h3>
                <p className="text-gray-300 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Calculator */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded font-semibold transition-colors"
          >
            ← Back to Main Calculator
          </Link>
        </div>

        {/* SEO Footer Content */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Why Use Our EUR to USD Converter?</h2>
          <div className="text-gray-300 space-y-3">
            <p>
              Our free 50 Euro to US Dollar converter provides
              real-time exchange rates updated every 15 minutes. Whether you're planning a trip, making
              an international purchase, or conducting business, get accurate conversion rates instantly.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Live exchange rates from reliable financial sources</li>
              <li>Works offline with cached rates for travelers</li>
              <li>Mobile-optimized Progressive Web App</li>
              <li>No registration or fees required</li>
              <li>Historical rate tracking and trends</li>
              <li>Instant calculations for any amount</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}