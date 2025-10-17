#!/usr/bin/env node
/**
 * SEO Page Generation Script
 * Automatically generates high-priority conversion pages for currency calculator
 *
 * Usage: node scripts/generate-seo-pages.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(BASE_DIR, "src");
const APP_DIR = path.join(SRC_DIR, "app");

// Currency pairs with priorities (top 50 combinations)
const CURRENCY_PAIRS = [
  // Tier 1 - Highest volume pairs
  {
    from: "EUR",
    to: "USD",
    fromName: "Euro",
    toName: "US Dollar",
    priority: 1.0,
    popular: true,
  },
  {
    from: "USD",
    to: "EUR",
    fromName: "US Dollar",
    toName: "Euro",
    priority: 1.0,
    popular: true,
  },
  {
    from: "EUR",
    to: "GBP",
    fromName: "Euro",
    toName: "British Pound",
    priority: 0.9,
    popular: true,
  },
  {
    from: "GBP",
    to: "EUR",
    fromName: "British Pound",
    toName: "Euro",
    priority: 0.9,
    popular: true,
  },
  {
    from: "USD",
    to: "GBP",
    fromName: "US Dollar",
    toName: "British Pound",
    priority: 0.9,
    popular: true,
  },
  {
    from: "GBP",
    to: "USD",
    fromName: "British Pound",
    toName: "US Dollar",
    priority: 0.9,
    popular: true,
  },

  // Tier 2 - High volume pairs
  {
    from: "EUR",
    to: "CHF",
    fromName: "Euro",
    toName: "Swiss Franc",
    priority: 0.8,
    popular: true,
  },
  {
    from: "CHF",
    to: "EUR",
    fromName: "Swiss Franc",
    toName: "Euro",
    priority: 0.8,
    popular: true,
  },
  {
    from: "USD",
    to: "JPY",
    fromName: "US Dollar",
    toName: "Japanese Yen",
    priority: 0.8,
    popular: true,
  },
  {
    from: "JPY",
    to: "USD",
    fromName: "Japanese Yen",
    toName: "US Dollar",
    priority: 0.8,
    popular: true,
  },
  {
    from: "EUR",
    to: "JPY",
    fromName: "Euro",
    toName: "Japanese Yen",
    priority: 0.7,
    popular: true,
  },
  {
    from: "JPY",
    to: "EUR",
    fromName: "Japanese Yen",
    toName: "Euro",
    priority: 0.7,
    popular: true,
  },

  // Tier 3 - Medium volume pairs
  {
    from: "USD",
    to: "CAD",
    fromName: "US Dollar",
    toName: "Canadian Dollar",
    priority: 0.7,
    popular: false,
  },
  {
    from: "CAD",
    to: "USD",
    fromName: "Canadian Dollar",
    toName: "US Dollar",
    priority: 0.7,
    popular: false,
  },
  {
    from: "USD",
    to: "AUD",
    fromName: "US Dollar",
    toName: "Australian Dollar",
    priority: 0.7,
    popular: false,
  },
  {
    from: "AUD",
    to: "USD",
    fromName: "Australian Dollar",
    toName: "US Dollar",
    priority: 0.7,
    popular: false,
  },
  {
    from: "GBP",
    to: "CHF",
    fromName: "British Pound",
    toName: "Swiss Franc",
    priority: 0.6,
    popular: false,
  },
  {
    from: "CHF",
    to: "GBP",
    fromName: "Swiss Franc",
    toName: "British Pound",
    priority: 0.6,
    popular: false,
  },

  // European pairs
  {
    from: "EUR",
    to: "SEK",
    fromName: "Euro",
    toName: "Swedish Krona",
    priority: 0.6,
    popular: false,
  },
  {
    from: "SEK",
    to: "EUR",
    fromName: "Swedish Krona",
    toName: "Euro",
    priority: 0.6,
    popular: false,
  },
  {
    from: "EUR",
    to: "NOK",
    fromName: "Euro",
    toName: "Norwegian Krone",
    priority: 0.6,
    popular: false,
  },
  {
    from: "NOK",
    to: "EUR",
    fromName: "Norwegian Krone",
    toName: "Euro",
    priority: 0.6,
    popular: false,
  },
  {
    from: "EUR",
    to: "DKK",
    fromName: "Euro",
    toName: "Danish Krone",
    priority: 0.6,
    popular: false,
  },
  {
    from: "DKK",
    to: "EUR",
    fromName: "Danish Krone",
    toName: "Euro",
    priority: 0.6,
    popular: false,
  },
  {
    from: "EUR",
    to: "PLN",
    fromName: "Euro",
    toName: "Polish Zloty",
    priority: 0.6,
    popular: false,
  },
  {
    from: "PLN",
    to: "EUR",
    fromName: "Polish Zloty",
    toName: "Euro",
    priority: 0.6,
    popular: false,
  },
];

// Popular amounts for conversion
const POPULAR_AMOUNTS = [
  { amount: "100", priority: 1.0, searches: 50000 },
  { amount: "500", priority: 0.9, searches: 30000 },
  { amount: "1000", priority: 0.9, searches: 25000 },
  { amount: "50", priority: 0.8, searches: 20000 },
  { amount: "200", priority: 0.8, searches: 18000 },
  { amount: "20", priority: 0.7, searches: 15000 },
  { amount: "300", priority: 0.7, searches: 12000 },
  { amount: "250", priority: 0.7, searches: 10000 },
  { amount: "150", priority: 0.7, searches: 9000 },
  { amount: "75", priority: 0.6, searches: 8000 },
];

// Utility functions
const getUrlFriendlyName = (currencyCode) => {
  const mapping = {
    EUR: "euro",
    USD: "dollar",
    GBP: "pound",
    CHF: "franken",
    JPY: "yen",
    CAD: "canadian-dollar",
    AUD: "australian-dollar",
    SEK: "swedish-krona",
    NOK: "norwegian-krone",
    DKK: "danish-krone",
    PLN: "polish-zloty",
  };
  return mapping[currencyCode] || currencyCode.toLowerCase();
};

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
};

// Template for conversion pages
const generateConversionPageTemplate = (
  amount,
  fromCode,
  toCode,
  fromName,
  toName,
  priority,
) => {
  const fromUrl = getUrlFriendlyName(fromCode);
  const toUrl = getUrlFriendlyName(toCode);

  return `'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useOfflineFirstCurrencyStore } from '@/lib/store/currency-offline-first';
import { currencies, getCurrencyByCode } from '@/lib/currencies';
import { useTranslation } from '@/lib/i18n/provider';
import { formatNumber } from '@/lib/utils';

export default function Convert${amount}${fromCode}To${toCode}() {
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslation();
  const { baseCurrency, targetCurrency, setBaseCurrency, setTargetCurrency, getCurrentRate, isOnline } = useOfflineFirstCurrencyStore();

  const fromCurrency = getCurrencyByCode('${fromCode}') || currencies.find(c => c.code === 'EUR')!;
  const toCurrency = getCurrencyByCode('${toCode}') || currencies.find(c => c.code === 'USD')!;

  useEffect(() => {
    // Set the currencies first
    setBaseCurrency(fromCurrency);
    setTargetCurrency(toCurrency);
  }, [setBaseCurrency, setTargetCurrency, fromCurrency, toCurrency]);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        // Only get rate if currencies are set correctly
        if (baseCurrency.code === '${fromCode}' && targetCurrency.code === '${toCode}') {
          const currentRate = getCurrentRate();
          if (currentRate) {
            setRate(currentRate);
            setResult(${amount} * currentRate);
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
  const relatedAmounts = [${POPULAR_AMOUNTS.filter((a) => a.amount !== amount)
    .slice(0, 4)
    .map((a) => a.amount)
    .join(", ")}];

  // FAQ data
  const faqData = [
    {
      question: "How much is ${amount} ${fromName} in ${toName}?",
      answer: result
        ? \`${amount} ${fromName} equals \${formatNumber(result)} ${toName} at the current exchange rate of \${rate?.toFixed(4)}.\`
        : \`The current exchange rate will determine how much ${amount} ${fromName} is worth in ${toName}.\`
    },
    {
      question: "Is ${amount} ${fromCode} to ${toCode} a good conversion rate?",
      answer: "Exchange rates fluctuate constantly. Compare our rate with other providers and consider historical trends to determine if it's favorable for your needs."
    },
    {
      question: "How often do exchange rates update?",
      answer: "Our exchange rates are updated every 15 minutes from reliable financial data sources to ensure accuracy."
    },
    {
      question: "Can I convert ${amount} ${fromCode} to ${toCode} offline?",
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
            "name": "${amount} ${fromName} to ${toName} Converter",
            "description": "Convert ${amount} ${fromCode} to ${toCode} with live exchange rates",
            "url": "https://exchange.danielhilmer.de/convert/${amount}-${fromUrl}-to-${toUrl}",
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
          <span className="text-gray-300">${amount} ${fromCode} to ${toCode}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            ${amount} ${fromName} to ${toName} Converter
          </h1>
          <p className="text-gray-300 text-lg">
            Convert ${amount} ${fromCode} to ${toCode} with live exchange rates
          </p>
        </div>

        {/* Main Conversion Display */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {fromCurrency.flag} {formatNumber(${amount})}
              </div>
              <div className="text-gray-400">${fromCode} - ${fromName}</div>
            </div>

            <div className="text-center">
              <div className="text-orange-500 text-lg">⇄</div>
              <div className="text-sm text-gray-400">
                {rate ? \`1 ${fromCode} = \${rate.toFixed(4)} ${toCode}\` : 'Loading rate...'}
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {loading ? 'Loading...' : result ? \`\${toCurrency.flag} \${formatNumber(result)}\` : 'Rate unavailable'}
              </div>
              <div className="text-gray-400">${toCode} - ${toName}</div>
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
                  href={\`/convert/\${relatedAmount}-${fromUrl}-to-${toUrl}\`}
                  className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded text-center transition-colors"
                >
                  <div className="font-semibold">{relatedAmount} ${fromCode}</div>
                  <div className="text-sm text-gray-400">
                    {relatedResult ? \`≈ \${formatNumber(relatedResult)} ${toCode}\` : 'Calculate'}
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
          <h2 className="text-xl font-bold mb-4">Why Use Our ${fromCode} to ${toCode} Converter?</h2>
          <div className="text-gray-300 space-y-3">
            <p>
              Our free ${amount} ${fromName} to ${toName} converter provides
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
}`;
};

// Template for metadata layout
const generateMetadataTemplate = (
  amount,
  fromCode,
  toCode,
  fromName,
  toName,
) => {
  const fromUrl = getUrlFriendlyName(fromCode);
  const toUrl = getUrlFriendlyName(toCode);

  return `import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "${amount} ${fromName} to ${toName} - Live Currency Converter";
  const description = "Convert ${amount} ${fromCode} to ${toCode} with today's live exchange rate. Free calculator shows exactly how much ${amount} ${fromName} is worth in ${toName}.";

  const keywords = [
    "${amount} ${fromCode.toLowerCase()} to ${toCode.toLowerCase()}",
    "${amount} ${fromCode} ${toCode}",
    "convert ${amount} ${fromName.toLowerCase()} to ${toName.toLowerCase()}",
    "${amount} ${fromName} ${toName}",
    "${amount} ${fromCode} in ${toCode}",
    "how much is ${amount} ${fromCode.toLowerCase()} in ${toCode.toLowerCase()}",
    "${fromCode} ${toCode} converter",
    "${fromName.toLowerCase()} ${toName.toLowerCase()} calculator"
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title,
      description,
      url: "https://exchange.danielhilmer.de/convert/${amount}-${fromUrl}-to-${toUrl}",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "${amount} ${fromName} to ${toName} Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/${amount}-${fromUrl}-to-${toUrl}"
    },

    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}`;
};

// Generate pages for top currency pairs with popular amounts
const generateTopConversionPages = () => {
  console.log("🚀 Starting SEO page generation...");

  let generatedCount = 0;
  const targetCount = 50;

  // Sort pairs by priority and take top ones
  const topPairs = CURRENCY_PAIRS.sort((a, b) => b.priority - a.priority).slice(
    0,
    15,
  ); // Top 15 currency pairs

  for (const pair of topPairs) {
    if (generatedCount >= targetCount) break;

    // Generate pages for top amounts
    const amountsToGenerate = pair.popular ? 5 : 3;
    const amounts = POPULAR_AMOUNTS.slice(0, amountsToGenerate);

    for (const amountObj of amounts) {
      if (generatedCount >= targetCount) break;

      const { amount } = amountObj;
      const { from: fromCode, to: toCode, fromName, toName } = pair;

      const fromUrl = getUrlFriendlyName(fromCode);
      const toUrl = getUrlFriendlyName(toCode);

      // Create directory path
      const pageDir = path.join(
        APP_DIR,
        "convert",
        `${amount}-${fromUrl}-to-${toUrl}`,
      );
      ensureDirectoryExists(pageDir);

      // Generate page.tsx
      const pageContent = generateConversionPageTemplate(
        amount,
        fromCode,
        toCode,
        fromName,
        toName,
        pair.priority,
      );
      const pagePath = path.join(pageDir, "page.tsx");
      fs.writeFileSync(pagePath, pageContent);

      // Generate layout.tsx with metadata
      const layoutContent = generateMetadataTemplate(
        amount,
        fromCode,
        toCode,
        fromName,
        toName,
      );
      const layoutPath = path.join(pageDir, "layout.tsx");
      fs.writeFileSync(layoutPath, layoutContent);

      console.log(`✅ Generated: /convert/${amount}-${fromUrl}-to-${toUrl}`);
      generatedCount++;
    }
  }

  console.log(`🎉 Successfully generated ${generatedCount} conversion pages!`);
};

// Generate currency pair landing pages (English & German)
const generateCurrencyPairPages = () => {
  console.log("🚀 Generating currency pair landing pages...");

  let generatedCount = 0;

  // Take top 25 currency pairs
  const topPairs = CURRENCY_PAIRS.sort((a, b) => b.priority - a.priority).slice(
    0,
    25,
  );

  for (const pair of topPairs) {
    const { from: fromCode, to: toCode, fromName, toName } = pair;

    // English version
    const enUrl = `currency-calculator-${fromCode.toLowerCase()}-${toCode.toLowerCase()}`;
    const enDir = path.join(APP_DIR, enUrl);

    if (!fs.existsSync(enDir)) {
      ensureDirectoryExists(enDir);

      const enPageContent = generatePairPageTemplate(
        fromCode,
        toCode,
        fromName,
        toName,
        "en",
      );
      fs.writeFileSync(path.join(enDir, "page.tsx"), enPageContent);

      const enLayoutContent = generatePairLayoutTemplate(
        fromCode,
        toCode,
        fromName,
        toName,
        "en",
      );
      fs.writeFileSync(path.join(enDir, "layout.tsx"), enLayoutContent);

      console.log(`✅ Generated: /${enUrl}`);
      generatedCount++;
    }

    // German version
    const fromUrl = getUrlFriendlyName(fromCode);
    const toUrl = getUrlFriendlyName(toCode);
    const deUrl = `waehrungsrechner-${fromUrl}-${toUrl}`;
    const deDir = path.join(APP_DIR, deUrl);

    if (!fs.existsSync(deDir)) {
      ensureDirectoryExists(deDir);

      const dePageContent = generatePairPageTemplate(
        fromCode,
        toCode,
        fromName,
        toName,
        "de",
      );
      fs.writeFileSync(path.join(deDir, "page.tsx"), dePageContent);

      const deLayoutContent = generatePairLayoutTemplate(
        fromCode,
        toCode,
        fromName,
        toName,
        "de",
      );
      fs.writeFileSync(path.join(deDir, "layout.tsx"), deLayoutContent);

      console.log(`✅ Generated: /${deUrl}`);
      generatedCount++;
    }
  }

  console.log(
    `🎉 Successfully generated ${generatedCount} currency pair pages!`,
  );
};

// Simple pair page template
const generatePairPageTemplate = (fromCode, toCode, fromName, toName, lang) => {
  return `'use client';

import Link from 'next/link';
import { useOfflineFirstCurrencyStore } from '@/lib/store/currency-offline-first';
import { useTranslation } from '@/lib/i18n/provider';

export default function ${fromCode}${toCode}Calculator() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            ${fromName} to ${toName} Calculator
          </h1>
          <p className="text-xl text-gray-300">
            Convert ${fromCode} to ${toCode} with live exchange rates
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
}`;
};

const generatePairLayoutTemplate = (
  fromCode,
  toCode,
  fromName,
  toName,
  lang,
) => {
  return `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "${fromName} to ${toName} Calculator - Live ${fromCode} ${toCode} Exchange Rate",
  description: "Convert ${fromName} to ${toName} with live exchange rates. Free ${fromCode} to ${toCode} currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}`;
};

// Main execution
const main = () => {
  console.log("🎯 SEO Page Generation Script Starting...");
  console.log("📁 Base directory:", BASE_DIR);
  console.log("📱 App directory:", APP_DIR);

  try {
    // Ensure base directories exist
    ensureDirectoryExists(path.join(APP_DIR, "convert"));

    // Generate top priority conversion pages
    generateTopConversionPages();

    // Generate currency pair pages
    generateCurrencyPairPages();

    console.log("\n🎉 SEO page generation completed successfully!");
    console.log("📈 Ready to boost organic traffic with new SEO pages");
    console.log("\n💡 Next steps:");
    console.log('   1. Run "npm run build" to verify pages compile correctly');
    console.log('   2. Test pages in development with "npm run dev"');
    console.log("   3. Submit updated sitemap to Google Search Console");
    console.log("   4. Monitor rankings and traffic improvements");
  } catch (error) {
    console.error("❌ Error generating SEO pages:", error.message);
    process.exit(1);
  }
};

// Run the script
main();
