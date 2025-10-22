import { Metadata } from "next";
import Link from "next/link";
import { generateCurrencyUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title:
    "US Dollar Guide - History, Facts & Exchange Rates | USD Currency Guide",
  description:
    "Complete guide to the US Dollar (USD). Learn about its history, role in global finance, exchange rates, and tips for currency conversion.",
  keywords: [
    "US Dollar guide",
    "USD currency",
    "American dollar history",
    "USD exchange rates",
    "dollar facts",
    "US currency guide",
    "USD trading",
    "dollar conversion",
    "Federal Reserve",
    "USD EUR exchange rate",
  ],
  openGraph: {
    title:
      "US Dollar Guide - History, Facts & Exchange Rates | USD Currency Guide",
    description:
      "Complete guide to the US Dollar (USD). Learn about its history, role in global finance, exchange rates, and tips for currency conversion.",
    type: "article",
    url: "https://exchange.danielhilmer.de/guides/currencies/us-dollar",
  },
  alternates: {
    canonical: "https://exchange.danielhilmer.de/guides/currencies/us-dollar",
  },
};

export default function USDollarGuidePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "US Dollar Guide - History, Facts & Exchange Rates",
            description:
              "Complete guide to the US Dollar (USD). Learn about its history, role in global finance, exchange rates, and tips for currency conversion.",
            author: {
              "@type": "Organization",
              name: "Currency Exchange Calculator",
            },
            publisher: {
              "@type": "Organization",
              name: "Currency Exchange Calculator",
              logo: {
                "@type": "ImageObject",
                url: "https://exchange.danielhilmer.de/icon-192x192.png",
              },
            },
            datePublished: "2024-01-01",
            dateModified: "2024-12-19",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id":
                "https://exchange.danielhilmer.de/guides/currencies/us-dollar",
            },
          }),
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-orange-500 hover:underline">
            Home
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <Link href="/guides" className="text-orange-500 hover:underline">
            Guides
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <Link
            href="/guides/currencies"
            className="text-orange-500 hover:underline"
          >
            Currencies
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <span className="text-gray-300">US Dollar</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            🇺🇸 US Dollar (USD) Currency Guide
          </h1>
          <p className="text-gray-300 text-lg">
            Everything you need to know about the world&apos;s primary reserve
            currency
          </p>
        </div>

        {/* Quick Facts */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Quick Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold">Currency Code:</div>
              <div className="text-gray-300">USD</div>
            </div>
            <div>
              <div className="font-semibold">Symbol:</div>
              <div className="text-gray-300">$</div>
            </div>
            <div>
              <div className="font-semibold">Established:</div>
              <div className="text-gray-300">1792</div>
            </div>
            <div>
              <div className="font-semibold">Country:</div>
              <div className="text-gray-300">United States of America</div>
            </div>
            <div>
              <div className="font-semibold">Central Bank:</div>
              <div className="text-gray-300">Federal Reserve System</div>
            </div>
            <div>
              <div className="font-semibold">Subunit:</div>
              <div className="text-gray-300">100 cents</div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            History of the US Dollar
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              The US Dollar is the world&apos;s primary reserve currency and the
              most widely used currency in international transactions. Its
              dominance stems from the economic and political influence of the
              United States and its role in global trade.
            </p>
            <p>
              The dollar was established as the official currency of the United
              States in 1792 with the Coinage Act. Since then, it has evolved
              through various monetary systems, including the gold standard and
              the Bretton Woods system, before becoming a fiat currency in 1971.
            </p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">
              Key Milestones:
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>1792:</strong> Coinage Act establishes the US Dollar
              </li>
              <li>
                <strong>1913:</strong> Federal Reserve System created
              </li>
              <li>
                <strong>1944:</strong> Bretton Woods Agreement makes USD the
                primary reserve currency
              </li>
              <li>
                <strong>1971:</strong> Nixon Shock ends gold convertibility
              </li>
              <li>
                <strong>Today:</strong> USD remains the dominant global currency
              </li>
            </ul>
          </div>
        </div>

        {/* Global Role */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Global Role & Importance
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              The US Dollar holds a unique position in the global financial
              system:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Reserve Currency:</strong> Approximately 60% of global
                foreign exchange reserves are held in USD
              </li>
              <li>
                <strong>Trade Currency:</strong> Many international commodities
                are priced in USD, including oil and gold
              </li>
              <li>
                <strong>Forex Volume:</strong> USD is involved in about 88% of
                all foreign exchange transactions
              </li>
              <li>
                <strong>Safe Haven:</strong> Investors often turn to USD during
                times of global uncertainty
              </li>
              <li>
                <strong>Digital Payments:</strong> USD dominates international
                wire transfers and digital payments
              </li>
            </ul>
          </div>
        </div>

        {/* Exchange Rate Information */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            USD Exchange Rates
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              The US Dollar is the most traded currency in the world, with major
              currency pairs including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={generateCurrencyUrl("en", "USD", "EUR")}
                className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded transition-colors"
              >
                <div className="font-semibold">USD/EUR</div>
                <div className="text-sm text-gray-400">US Dollar to Euro</div>
              </Link>
              <Link
                href={generateCurrencyUrl("en", "USD", "GBP")}
                className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded transition-colors"
              >
                <div className="font-semibold">USD/GBP</div>
                <div className="text-sm text-gray-400">
                  US Dollar to British Pound
                </div>
              </Link>
              <Link
                href={generateCurrencyUrl("en", "USD", "JPY")}
                className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded transition-colors"
              >
                <div className="font-semibold">USD/JPY</div>
                <div className="text-sm text-gray-400">
                  US Dollar to Japanese Yen
                </div>
              </Link>
              <Link
                href={generateCurrencyUrl("en", "USD", "CHF")}
                className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded transition-colors"
              >
                <div className="font-semibold">USD/CHF</div>
                <div className="text-sm text-gray-400">
                  US Dollar to Swiss Franc
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Federal Reserve */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Federal Reserve System
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              The Federal Reserve, often called &quot;the Fed,&quot; is the
              central banking system of the United States. It plays a crucial
              role in USD monetary policy and global financial stability.
            </p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">
              Key Responsibilities:
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Monetary Policy:</strong> Setting interest rates and
                controlling money supply
              </li>
              <li>
                <strong>Banking Supervision:</strong> Regulating and supervising
                banks
              </li>
              <li>
                <strong>Financial Stability:</strong> Maintaining stability of
                the financial system
              </li>
              <li>
                <strong>Payment Systems:</strong> Operating national payment
                systems
              </li>
              <li>
                <strong>Economic Research:</strong> Analyzing economic trends
                and data
              </li>
            </ul>
          </div>
        </div>

        {/* Travel & Business Tips */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Travel & Business Tips
          </h2>
          <div className="space-y-4 text-gray-300">
            <h3 className="text-lg font-semibold text-white mb-2">
              Using USD While Traveling:
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Wide Acceptance:</strong> USD is accepted in many
                countries worldwide
              </li>
              <li>
                <strong>ATMs:</strong> Available globally with reasonable
                exchange rates
              </li>
              <li>
                <strong>Credit Cards:</strong> US cards work internationally
                with good exchange rates
              </li>
              <li>
                <strong>Cash Exchange:</strong> Easy to exchange in most
                countries
              </li>
              <li>
                <strong>Digital Payments:</strong> PayPal, Venmo, and other US
                services widely supported
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">
              Business & Investment:
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>International Trade:</strong> USD is the preferred
                currency for many transactions
              </li>
              <li>
                <strong>Commodities:</strong> Oil, gold, and other commodities
                priced in USD
              </li>
              <li>
                <strong>Financial Markets:</strong> Major global markets operate
                in USD
              </li>
              <li>
                <strong>Stability:</strong> Generally stable with predictable
                monetary policy
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="border-b border-zinc-700 pb-4">
              <h3 className="font-semibold mb-2 text-white">
                Why is the US Dollar so important globally?
              </h3>
              <p className="text-gray-300 text-sm">
                The USD is the world&apos;s primary reserve currency due to the
                size and stability of the US economy, the liquidity of US
                financial markets, and historical agreements like Bretton Woods.
              </p>
            </div>
            <div className="border-b border-zinc-700 pb-4">
              <h3 className="font-semibold mb-2 text-white">
                What factors affect USD exchange rates?
              </h3>
              <p className="text-gray-300 text-sm">
                USD rates are influenced by Federal Reserve policy, US economic
                indicators (GDP, employment, inflation), geopolitical events,
                and global risk sentiment.
              </p>
            </div>
            <div className="border-b border-zinc-700 pb-4">
              <h3 className="font-semibold mb-2 text-white">
                Is the US Dollar backed by gold?
              </h3>
              <p className="text-gray-300 text-sm">
                No, the US Dollar has been a fiat currency since 1971 when
                President Nixon ended the gold standard. It&apos;s backed by the
                full faith and credit of the US government.
              </p>
            </div>
            <div className="border-b border-zinc-700 pb-4">
              <h3 className="font-semibold mb-2 text-white">
                How stable is the US Dollar?
              </h3>
              <p className="text-gray-300 text-sm">
                The USD is considered one of the most stable currencies due to
                the strength of the US economy, independent Federal Reserve
                system, and deep, liquid financial markets.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition-colors mr-4"
          >
            Convert USD Now
          </Link>
          <Link
            href="/guides/currencies"
            className="inline-block bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded font-semibold transition-colors"
          >
            Other Currency Guides
          </Link>
        </div>

        {/* Related Guides */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Related Currency Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/guides/currencies/euro"
              className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded transition-colors"
            >
              <div className="font-semibold">🇪🇺 Euro Guide</div>
              <div className="text-sm text-gray-400 mt-1">
                Learn about Europe&apos;s unified currency
              </div>
            </Link>
            <Link
              href="/guides/currencies/british-pound"
              className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded transition-colors"
            >
              <div className="font-semibold">🇬🇧 British Pound Guide</div>
              <div className="text-sm text-gray-400 mt-1">
                Discover the UK&apos;s historic currency
              </div>
            </Link>
            <Link
              href="/guides/currencies/japanese-yen"
              className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded transition-colors"
            >
              <div className="font-semibold">🇯🇵 Japanese Yen Guide</div>
              <div className="text-sm text-gray-400 mt-1">
                Explore Asia&apos;s major trading currency
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
