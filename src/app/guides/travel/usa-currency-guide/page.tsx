import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "USA Travel Currency Guide - US Dollar Tips for Tourists | USD Travel Guide",
  description:
    "Complete travel guide for using US Dollars in America. ATMs, tipping, payment methods, and money-saving tips for tourists visiting the USA.",
  keywords: [
    "USA travel currency guide",
    "US Dollar travel tips",
    "America currency guide",
    "USD for tourists",
    "US travel money tips",
    "American currency exchange",
    "USA payment methods",
    "US tipping guide",
    "Dollar travel advice",
    "USA money guide",
  ],
  openGraph: {
    title:
      "USA Travel Currency Guide - US Dollar Tips for Tourists | USD Travel Guide",
    description:
      "Complete travel guide for using US Dollars in America. ATMs, tipping, payment methods, and money-saving tips for tourists visiting the USA.",
    type: "article",
    url: "https://exchange.danielhilmer.de/guides/travel/usa-currency-guide",
  },
  alternates: {
    canonical:
      "https://exchange.danielhilmer.de/guides/travel/usa-currency-guide",
  },
};

export default function USATravelCurrencyGuidePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            headline: "USA Travel Currency Guide - US Dollar Tips for Tourists",
            description:
              "Complete travel guide for using US Dollars in America. ATMs, tipping, payment methods, and money-saving tips for tourists visiting the USA.",
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
                "https://exchange.danielhilmer.de/guides/travel/usa-currency-guide",
            },
            about: {
              "@type": "Place",
              name: "United States of America",
              alternateName: "USA",
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
            href="/guides/travel"
            className="text-orange-500 hover:underline"
          >
            Travel
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <span className="text-gray-300">USA Currency Guide</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            🇺🇸 USA Travel Currency Guide
          </h1>
          <p className="text-gray-300 text-lg">
            Everything you need to know about using US Dollars while traveling
            in America
          </p>
        </div>

        {/* Quick Overview */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Currency Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold">Official Currency:</div>
              <div className="text-gray-300">US Dollar (USD)</div>
            </div>
            <div>
              <div className="font-semibold">Symbol:</div>
              <div className="text-gray-300">$ (Dollar sign)</div>
            </div>
            <div>
              <div className="font-semibold">Subunit:</div>
              <div className="text-gray-300">100 cents</div>
            </div>
            <div>
              <div className="font-semibold">Common Denominations:</div>
              <div className="text-gray-300">$1, $5, $10, $20, $50, $100</div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Payment Methods in the USA
          </h2>
          <div className="space-y-6">
            <div className="bg-zinc-800 p-4 rounded">
              <h3 className="font-semibold mb-2 text-green-400">
                💳 Credit & Debit Cards
              </h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>
                  • <strong>Widely accepted:</strong> Nearly everywhere accepts
                  cards
                </li>
                <li>
                  • <strong>Contactless payments:</strong> Tap-to-pay very
                  common
                </li>
                <li>
                  • <strong>Chip & PIN:</strong> Most cards use chip technology
                </li>
                <li>
                  • <strong>Mobile payments:</strong> Apple Pay, Google Pay,
                  Samsung Pay
                </li>
                <li>
                  • <strong>Tip:</strong> Always carry a backup card
                </li>
              </ul>
            </div>

            <div className="bg-zinc-800 p-4 rounded">
              <h3 className="font-semibold mb-2 text-blue-400">💵 Cash</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>
                  • <strong>Still useful:</strong> Small vendors, tips, parking
                  meters
                </li>
                <li>
                  • <strong>ATMs everywhere:</strong> Easy to find and use
                </li>
                <li>
                  • <strong>Small bills:</strong> Carry $1, $5, and $10 bills
                  for tips
                </li>
                <li>
                  • <strong>Coins needed:</strong> For laundry, some vending
                  machines
                </li>
                <li>
                  • <strong>Safety:</strong> Don&apos;t carry large amounts
                </li>
              </ul>
            </div>

            <div className="bg-zinc-800 p-4 rounded">
              <h3 className="font-semibold mb-2 text-purple-400">
                📱 Digital Payments
              </h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>
                  • <strong>Venmo:</strong> Popular for peer-to-peer payments
                </li>
                <li>
                  • <strong>PayPal:</strong> Accepted at many online and some
                  offline stores
                </li>
                <li>
                  • <strong>Zelle:</strong> Bank-to-bank transfers
                </li>
                <li>
                  • <strong>Cash App:</strong> Another P2P payment option
                </li>
                <li>
                  • <strong>Note:</strong> Mainly for US residents and accounts
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ATMs and Banking */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            ATMs and Banking
          </h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Finding ATMs
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  ATMs are everywhere: banks, grocery stores, gas stations,
                  convenience stores
                </li>
                <li>Major networks: Allpoint, MoneyPass, Plus, Cirrus</li>
                <li>Bank-specific ATMs often have lower fees</li>
                <li>Look for your bank&apos;s logo to avoid fees</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                ATM Fees
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Your bank fee:</strong> $2-5 for international
                  withdrawals
                </li>
                <li>
                  <strong>ATM owner fee:</strong> $2-4 additional fee
                </li>
                <li>
                  <strong>Exchange rate fee:</strong> 1-3% markup on exchange
                  rate
                </li>
                <li>
                  <strong>Tip:</strong> Use your bank&apos;s partner ATMs to
                  save money
                </li>
              </ul>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700 p-3 rounded">
              <p className="text-yellow-200 text-sm">
                💡 <strong>Money-saving tip:</strong> Withdraw larger amounts
                less frequently to minimize ATM fees. Notify your bank before
                traveling to avoid card blocks.
              </p>
            </div>
          </div>
        </div>

        {/* Tipping Culture */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            US Tipping Guide
          </h2>
          <div className="space-y-4 text-gray-300">
            <p className="mb-4">
              Tipping is an essential part of American culture and service
              workers rely on tips for their income.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-800 p-4 rounded">
                <h3 className="font-semibold mb-3 text-green-400">
                  Restaurant Tipping
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <strong>Sit-down restaurants:</strong> 18-22%
                  </li>
                  <li>
                    <strong>Good service:</strong> 20%
                  </li>
                  <li>
                    <strong>Exceptional service:</strong> 22-25%
                  </li>
                  <li>
                    <strong>Poor service:</strong> 15% minimum
                  </li>
                  <li>
                    <strong>Note:</strong> Calculate on pre-tax amount
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-800 p-4 rounded">
                <h3 className="font-semibold mb-3 text-blue-400">
                  Service Tipping
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <strong>Bartenders:</strong> $1-2 per drink or 18-20%
                  </li>
                  <li>
                    <strong>Taxi/Uber/Lyft:</strong> 15-20%
                  </li>
                  <li>
                    <strong>Hotel housekeeping:</strong> $2-5 per night
                  </li>
                  <li>
                    <strong>Hair salon:</strong> 18-22%
                  </li>
                  <li>
                    <strong>Delivery:</strong> 15-20% or $3-5 minimum
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-800 p-4 rounded">
                <h3 className="font-semibold mb-3 text-purple-400">
                  Other Services
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <strong>Bellhop:</strong> $1-2 per bag
                  </li>
                  <li>
                    <strong>Valet parking:</strong> $2-5
                  </li>
                  <li>
                    <strong>Tour guides:</strong> $5-10 per person
                  </li>
                  <li>
                    <strong>Spa services:</strong> 18-20%
                  </li>
                  <li>
                    <strong>Airport shuttle:</strong> $1-2 per bag
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-800 p-4 rounded">
                <h3 className="font-semibold mb-3 text-orange-400">
                  No Tip Required
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <strong>Fast food:</strong> No tip expected
                  </li>
                  <li>
                    <strong>Self-service:</strong> Buffets, food trucks
                  </li>
                  <li>
                    <strong>Retail shopping:</strong> No tip needed
                  </li>
                  <li>
                    <strong>Gas stations:</strong> Self-service is standard
                  </li>
                  <li>
                    <strong>Counter service:</strong> Optional tip jar
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-700 p-3 rounded mt-4">
              <p className="text-blue-200 text-sm">
                💡 <strong>Tipping tip:</strong> Many card readers will prompt
                for tip amounts. 18%, 20%, and 22% are common preset options.
              </p>
            </div>
          </div>
        </div>

        {/* Money Exchange */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Currency Exchange Options
          </h2>
          <div className="space-y-4 text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-700 p-4 rounded">
                <h3 className="font-semibold mb-2 text-green-400">
                  ✅ Best Options
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <strong>Your bank at home:</strong> Order USD in advance
                  </li>
                  <li>
                    <strong>US bank ATMs:</strong> Good rates, convenient
                  </li>
                  <li>
                    <strong>Credit cards:</strong> Best exchange rates usually
                  </li>
                  <li>
                    <strong>Online services:</strong> Wise, Remitly for larger
                    amounts
                  </li>
                </ul>
              </div>

              <div className="bg-red-900/20 border border-red-700 p-4 rounded">
                <h3 className="font-semibold mb-2 text-red-400">
                  ❌ Avoid These
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <strong>Airport exchanges:</strong> Very poor rates
                  </li>
                  <li>
                    <strong>Hotel exchanges:</strong> Convenience fee is high
                  </li>
                  <li>
                    <strong>Tourist area kiosks:</strong> Inflated rates
                  </li>
                  <li>
                    <strong>Dynamic currency conversion:</strong> Always choose
                    USD
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700 p-3 rounded">
              <p className="text-yellow-200 text-sm">
                💡 <strong>Pro tip:</strong> When using cards abroad, always
                choose to be charged in USD rather than your home currency to
                get better exchange rates.
              </p>
            </div>
          </div>
        </div>

        {/* Regional Differences */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Regional Payment Preferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Major Cities
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Cards accepted everywhere</li>
                <li>• Contactless payments very common</li>
                <li>• Digital wallets widely used</li>
                <li>• Cash mainly for tips and street vendors</li>
                <li>• Some venues are completely cashless</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Rural Areas
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Cash more commonly used</li>
                <li>• Some small businesses prefer cash</li>
                <li>• ATMs less frequent</li>
                <li>• Cards still widely accepted</li>
                <li>• Bring cash for farmers markets, small diners</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Travel Budget Tips */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Money-Saving Travel Tips
          </h2>
          <div className="space-y-4 text-gray-300">
            <div className="bg-zinc-800 p-4 rounded">
              <h3 className="font-semibold mb-2 text-green-400">
                💰 Budget-Friendly Options
              </h3>
              <ul className="space-y-1 text-sm">
                <li>• Happy hour specials at restaurants (usually 3-6 PM)</li>
                <li>• Food trucks and street food for affordable meals</li>
                <li>• Grocery stores for snacks and drinks</li>
                <li>• Free museum days and city walking tours</li>
                <li>• Public transportation over taxis/rideshares</li>
              </ul>
            </div>

            <div className="bg-zinc-800 p-4 rounded">
              <h3 className="font-semibold mb-2 text-blue-400">
                💳 Card Benefits
              </h3>
              <ul className="space-y-1 text-sm">
                <li>• Travel credit cards with no foreign transaction fees</li>
                <li>• Cashback or rewards points on purchases</li>
                <li>• Purchase protection and travel insurance</li>
                <li>• Better fraud protection than cash</li>
                <li>• Easier expense tracking for business travel</li>
              </ul>
            </div>

            <div className="bg-zinc-800 p-4 rounded">
              <h3 className="font-semibold mb-2 text-orange-400">
                🏧 ATM Strategy
              </h3>
              <ul className="space-y-1 text-sm">
                <li>
                  • Find your bank&apos;s partner networks before traveling
                </li>
                <li>• Withdraw larger amounts to minimize fees</li>
                <li>• Use bank ATMs rather than convenience store ATMs</li>
                <li>• Check if your bank reimburses ATM fees</li>
                <li>• Keep receipts for expense tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Money Safety Tips
          </h2>
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Notify your bank:</strong> Tell them your travel dates
                and destinations
              </li>
              <li>
                <strong>Carry backup cards:</strong> Keep them in separate
                locations
              </li>
              <li>
                <strong>Avoid large cash amounts:</strong> Only carry what you
                need for the day
              </li>
              <li>
                <strong>Use hotel safes:</strong> Store extra cash and cards
                securely
              </li>
              <li>
                <strong>Be aware of skimmers:</strong> Check ATMs for unusual
                devices
              </li>
              <li>
                <strong>Cover your PIN:</strong> Shield your hand when entering
                PINs
              </li>
              <li>
                <strong>Keep emergency numbers:</strong> Save your bank&apos;s
                international contact info
              </li>
              <li>
                <strong>Monitor accounts:</strong> Check transactions regularly
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
                Should I exchange money before traveling to the USA?
              </h3>
              <p className="text-gray-300 text-sm">
                It&apos;s helpful to have some USD cash for immediate expenses
                like tips or transportation, but you don&apos;t need large
                amounts. ATMs are widely available for getting cash once you
                arrive.
              </p>
            </div>
            <div className="border-b border-zinc-700 pb-4">
              <h3 className="font-semibold mb-2 text-white">
                Can I use my foreign credit card in the USA?
              </h3>
              <p className="text-gray-300 text-sm">
                Yes, most foreign credit and debit cards work in the USA. Make
                sure to notify your bank before traveling and check for foreign
                transaction fees.
              </p>
            </div>
            <div className="border-b border-zinc-700 pb-4">
              <h3 className="font-semibold mb-2 text-white">
                Is it safe to use ATMs in the USA?
              </h3>
              <p className="text-gray-300 text-sm">
                Yes, ATMs are generally very safe. Use ATMs at banks or
                well-lit, busy locations. Avoid standalone ATMs in isolated
                areas and always cover your PIN when entering it.
              </p>
            </div>
            <div className="border-b border-zinc-700 pb-4">
              <h3 className="font-semibold mb-2 text-white">
                How much should I budget for tips?
              </h3>
              <p className="text-gray-300 text-sm">
                Budget about 20% extra for tips on restaurant meals, drinks, and
                services. For a $100 restaurant bill, expect to tip around $20.
                Tips for other services like taxis and hotels will add up
                throughout your trip.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-8">
          <Link
            href="/tools/travel-budget-calculator"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition-colors mr-4"
          >
            Calculate Travel Budget
          </Link>
          <Link
            href="/"
            className="inline-block bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded font-semibold transition-colors"
          >
            Currency Calculator
          </Link>
        </div>

        {/* Related Guides */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-orange-500">
            Related Travel Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/guides/currencies/us-dollar"
              className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded transition-colors"
            >
              <div className="font-semibold">🇺🇸 US Dollar Guide</div>
              <div className="text-sm text-gray-400 mt-1">
                Learn about the US Dollar currency
              </div>
            </Link>
            <Link
              href="/guides/travel/europe-currency-guide"
              className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded transition-colors"
            >
              <div className="font-semibold">🇪🇺 Europe Travel Guide</div>
              <div className="text-sm text-gray-400 mt-1">
                Currency tips for European travel
              </div>
            </Link>
            <Link
              href="/guides/travel/uk-currency-guide"
              className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded transition-colors"
            >
              <div className="font-semibold">🇬🇧 UK Travel Guide</div>
              <div className="text-sm text-gray-400 mt-1">
                British Pound travel tips
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
