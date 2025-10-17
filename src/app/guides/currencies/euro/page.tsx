import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Euro Guide - History, Facts & Exchange Rates | EUR Currency Guide",
  description:
    "Complete guide to the Euro (EUR). Learn about its history, member countries, exchange rates, and tips for currency conversion.",
  keywords: [
    "Euro guide",
    "EUR currency",
    "European currency history",
    "EUR exchange rates",
    "Euro facts",
    "European Union currency",
    "EUR trading",
    "Euro conversion",
    "European monetary union",
    "EUR USD exchange rate",
  ],
  openGraph: {
    title: "Euro Guide - History, Facts & Exchange Rates | EUR Currency Guide",
    description:
      "Complete guide to the Euro (EUR). Learn about its history, member countries, exchange rates, and tips for currency conversion.",
    type: "article",
    url: "https://exchange.danielhilmer.de/guides/currencies/euro",
  },
  alternates: {
    canonical: "https://exchange.danielhilmer.de/guides/currencies/euro",
  },
};

export default function EuroGuidePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Euro Guide - History, Facts & Exchange Rates",
            description:
              "Complete guide to the Euro (EUR). Learn about its history, member countries, exchange rates, and tips for currency conversion.",
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
              "@id": "https://exchange.danielhilmer.de/guides/currencies/euro",
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
          <span className="text-gray-300">Euro</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            🇪🇺 Euro (EUR) Currency Guide
          </h1>
          <p className="text-gray-300 text-lg">
            Everything you need to know about the European Union&apos;s official
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
              <div className="text-gray-300">EUR</div>
            </div>
            <div>
              <div className="font-semibold">Symbol:</div>
              <div className="text-gray-300">€</div>
            </div>
            <div>
              <div className="font-semibold">Introduced:</div>
              <div className="text-gray-300">January 1, 1999</div>
            </div>
            <div>
              <div className="font-semibold">Member Countries:</div>
              <div className="text-gray-300">20 EU countries</div>
            </div>
            <div>
              <div className="font-semibold">Central Bank:</div>
              <div className="text-gray-300">European Central Bank (ECB)</div>
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
            History of the Euro
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              The Euro was established as part of the European Monetary Union
              (EMU) and represents one of the most significant monetary
              achievements in modern history. The idea of a common European
              currency was first proposed in the 1960s, but it took decades of
              planning and negotiation to become reality.
            </p>
            <p>
              The Euro was officially launched on January 1, 1999, initially as
              an electronic currency for banking and financial transactions.
              Physical Euro banknotes and coins were introduced on January 1,
              2002, replacing the national currencies of participating
              countries.
            </p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">
              Key Milestones:
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>1992:</strong> Maastricht Treaty signed, establishing
                the framework for the Euro
              </li>
              <li>
                <strong>1998:</strong> European Central Bank (ECB) established
              </li>
              <li>
                <strong>1999:</strong> Euro launched electronically in 11
                countries
              </li>
              <li>
                <strong>2002:</strong> Physical Euro banknotes and coins
                introduced
              </li>
              <li>
                <strong>2024:</strong> 20 countries now use the Euro as their
                official currency
              </li>
            </ul>
          </div>
        </div>

        {/* Eurozone Countries */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Eurozone Countries
          </h2>
          <p className="text-gray-300 mb-4">
            The Euro is the official currency of 20 European Union member
            states, collectively known as the Eurozone:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-gray-300">
            <div>🇦🇹 Austria</div>
            <div>🇧🇪 Belgium</div>
            <div>🇭🇷 Croatia</div>
            <div>🇨🇾 Cyprus</div>
            <div>🇪🇪 Estonia</div>
            <div>🇫🇮 Finland</div>
            <div>🇫🇷 France</div>
            <div>🇩🇪 Germany</div>
            <div>🇬🇷 Greece</div>
            <div>🇮🇪 Ireland</div>
            <div>🇮🇹 Italy</div>
            <div>🇱🇻 Latvia</div>
            <div>🇱🇹 Lithuania</div>
            <div>🇱🇺 Luxembourg</div>
            <div>🇲🇹 Malta</div>
            <div>🇳🇱 Netherlands</div>
            <div>🇵🇹 Portugal</div>
            <div>🇸🇰 Slovakia</div>
            <div>🇸🇮 Slovenia</div>
            <div>🇪🇸 Spain</div>
          </div>
        </div>

        {/* Exchange Rate Information */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Euro Exchange Rates
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              The Euro is one of the most traded currencies in the world, second
              only to the US Dollar. It&apos;s involved in approximately 32% of
              all foreign exchange transactions globally.
            </p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">
              Major EUR Currency Pairs:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/currency-calculator-eur-usd"
                className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded transition-colors"
              >
                <div className="font-semibold">EUR/USD</div>
                <div className="text-sm text-gray-400">Euro to US Dollar</div>
              </Link>
              <Link
                href="/currency-calculator-eur-gbp"
                className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded transition-colors"
              >
                <div className="font-semibold">EUR/GBP</div>
                <div className="text-sm text-gray-400">
                  Euro to British Pound
                </div>
              </Link>
              <Link
                href="/currency-calculator-eur-chf"
                className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded transition-colors"
              >
                <div className="font-semibold">EUR/CHF</div>
                <div className="text-sm text-gray-400">Euro to Swiss Franc</div>
              </Link>
              <Link
                href="/currency-calculator-eur-jpy"
                className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded transition-colors"
              >
                <div className="font-semibold">EUR/JPY</div>
                <div className="text-sm text-gray-400">
                  Euro to Japanese Yen
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Economic Impact */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Economic Impact & Importance
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              The Euro plays a crucial role in the global economy and has
              several important characteristics:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Reserve Currency:</strong> Second most held reserve
                currency globally after the US Dollar
              </li>
              <li>
                <strong>Trade Facilitation:</strong> Eliminates exchange rate
                risk within the Eurozone
              </li>
              <li>
                <strong>Price Stability:</strong> ECB maintains price stability
                across member countries
              </li>
              <li>
                <strong>Financial Integration:</strong> Promotes economic
                integration across Europe
              </li>
              <li>
                <strong>Global Influence:</strong> Significant impact on global
                financial markets
              </li>
            </ul>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Travel Tips for Euro Countries
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Traveling within the Eurozone is convenient as you can use the
              same currency across 20 countries. Here are some helpful tips:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>ATMs:</strong> Widely available with generally
                reasonable fees
              </li>
              <li>
                <strong>Card Payments:</strong> Credit and debit cards accepted
                almost everywhere
              </li>
              <li>
                <strong>Cash:</strong> Still preferred for small purchases and
                tips
              </li>
              <li>
                <strong>Exchange:</strong> No need to exchange when traveling
                between Eurozone countries
              </li>
              <li>
                <strong>Denominations:</strong> Banknotes: €5, €10, €20, €50,
                €100, €200, €500
              </li>
              <li>
                <strong>Coins:</strong> 1¢, 2¢, 5¢, 10¢, 20¢, 50¢, €1, €2
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
                What countries use the Euro?
              </h3>
              <p className="text-gray-300 text-sm">
                20 EU countries currently use the Euro: Austria, Belgium,
                Croatia, Cyprus, Estonia, Finland, France, Germany, Greece,
                Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta,
                Netherlands, Portugal, Slovakia, Slovenia, and Spain.
              </p>
            </div>
            <div className="border-b border-zinc-700 pb-4">
              <h3 className="font-semibold mb-2 text-white">
                Who controls the Euro?
              </h3>
              <p className="text-gray-300 text-sm">
                The European Central Bank (ECB) is responsible for monetary
                policy in the Eurozone. It sets interest rates and manages the
                money supply to maintain price stability.
              </p>
            </div>
            <div className="border-b border-zinc-700 pb-4">
              <h3 className="font-semibold mb-2 text-white">
                Can I use Euros in all EU countries?
              </h3>
              <p className="text-gray-300 text-sm">
                No, not all EU countries use the Euro. Countries like Denmark,
                Sweden, Poland, Czech Republic, and Hungary have their own
                currencies, though they may join the Eurozone in the future.
              </p>
            </div>
            <div className="border-b border-zinc-700 pb-4">
              <h3 className="font-semibold mb-2 text-white">
                How stable is the Euro?
              </h3>
              <p className="text-gray-300 text-sm">
                The Euro is considered a stable currency backed by the combined
                economies of 20 European countries. The ECB&apos;s primary
                mandate is to maintain price stability, keeping inflation close
                to 2%.
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
            Convert EUR Now
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
              href="/guides/currencies/us-dollar"
              className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded transition-colors"
            >
              <div className="font-semibold">🇺🇸 US Dollar Guide</div>
              <div className="text-sm text-gray-400 mt-1">
                Learn about the world&apos;s reserve currency
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
              href="/guides/currencies/swiss-franc"
              className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded transition-colors"
            >
              <div className="font-semibold">🇨🇭 Swiss Franc Guide</div>
              <div className="text-sm text-gray-400 mt-1">
                Explore Switzerland&apos;s stable currency
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
