"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/provider";

export default function SEONavigationFooter() {
  const currencyPairs = [
    {
      from: "EUR",
      to: "USD",
      url: "currency-calculator-eur-usd",
      label: "Euro to US Dollar",
    },
    {
      from: "USD",
      to: "EUR",
      url: "currency-calculator-usd-eur",
      label: "US Dollar to Euro",
    },
    {
      from: "EUR",
      to: "GBP",
      url: "currency-calculator-eur-gbp",
      label: "Euro to British Pound",
    },
    {
      from: "GBP",
      to: "EUR",
      url: "currency-calculator-gbp-eur",
      label: "British Pound to Euro",
    },
    {
      from: "USD",
      to: "GBP",
      url: "currency-calculator-usd-gbp",
      label: "US Dollar to British Pound",
    },
    {
      from: "GBP",
      to: "USD",
      url: "currency-calculator-gbp-usd",
      label: "British Pound to US Dollar",
    },
    {
      from: "EUR",
      to: "CHF",
      url: "currency-calculator-eur-chf",
      label: "Euro to Swiss Franc",
    },
    {
      from: "CHF",
      to: "EUR",
      url: "currency-calculator-chf-eur",
      label: "Swiss Franc to Euro",
    },
    {
      from: "USD",
      to: "JPY",
      url: "currency-calculator-usd-jpy",
      label: "US Dollar to Japanese Yen",
    },
    {
      from: "JPY",
      to: "USD",
      url: "currency-calculator-jpy-usd",
      label: "Japanese Yen to US Dollar",
    },
    {
      from: "EUR",
      to: "JPY",
      url: "currency-calculator-eur-jpy",
      label: "Euro to Japanese Yen",
    },
    {
      from: "JPY",
      to: "EUR",
      url: "currency-calculator-jpy-eur",
      label: "Japanese Yen to Euro",
    },
  ];

  const popularConversions = [
    { amount: "100", from: "euro", to: "dollar", label: "100 Euro to Dollar" },
    { amount: "500", from: "euro", to: "dollar", label: "500 Euro to Dollar" },
    {
      amount: "1000",
      from: "euro",
      to: "dollar",
      label: "1000 Euro to Dollar",
    },
    { amount: "100", from: "dollar", to: "euro", label: "100 Dollar to Euro" },
    { amount: "500", from: "dollar", to: "euro", label: "500 Dollar to Euro" },
    { amount: "100", from: "pound", to: "euro", label: "100 Pound to Euro" },
    { amount: "200", from: "pound", to: "euro", label: "200 Pound to Euro" },
    {
      amount: "100",
      from: "franken",
      to: "euro",
      label: "100 Swiss Franc to Euro",
    },
    {
      amount: "500",
      from: "franken",
      to: "euro",
      label: "500 Swiss Franc to Euro",
    },
    { amount: "50", from: "euro", to: "dollar", label: "50 Euro to Dollar" },
    { amount: "200", from: "euro", to: "dollar", label: "200 Euro to Dollar" },
    { amount: "250", from: "euro", to: "dollar", label: "250 Euro to Dollar" },
  ];

  const currencyGuides = [
    { slug: "us-dollar", name: "US Dollar Guide", flag: "🇺🇸" },
    { slug: "euro", name: "Euro Guide", flag: "🇪🇺" },
    { slug: "british-pound", name: "British Pound Guide", flag: "🇬🇧" },
    { slug: "swiss-franc", name: "Swiss Franc Guide", flag: "🇨🇭" },
    { slug: "japanese-yen", name: "Japanese Yen Guide", flag: "🇯🇵" },
    { slug: "canadian-dollar", name: "Canadian Dollar Guide", flag: "🇨🇦" },
    { slug: "australian-dollar", name: "Australian Dollar Guide", flag: "🇦🇺" },
    { slug: "chinese-yuan", name: "Chinese Yuan Guide", flag: "🇨🇳" },
  ];

  const travelGuides = [
    {
      slug: "usa-currency-guide",
      name: "USA Travel Currency Guide",
      flag: "🇺🇸",
    },
    { slug: "uk-currency-guide", name: "UK Travel Currency Guide", flag: "🇬🇧" },
    { slug: "europe-currency-guide", name: "Europe Travel Guide", flag: "🇪🇺" },
    {
      slug: "switzerland-currency-guide",
      name: "Switzerland Travel Guide",
      flag: "🇨🇭",
    },
    { slug: "canada-currency-guide", name: "Canada Travel Guide", flag: "🇨🇦" },
    {
      slug: "australia-currency-guide",
      name: "Australia Travel Guide",
      flag: "🇦🇺",
    },
  ];

  const cities = [
    { slug: "berlin", name: "Currency Exchange Berlin", flag: "🇩🇪" },
    { slug: "munich", name: "Currency Exchange Munich", flag: "🇩🇪" },
    { slug: "hamburg", name: "Currency Exchange Hamburg", flag: "🇩🇪" },
    { slug: "frankfurt", name: "Currency Exchange Frankfurt", flag: "🇩🇪" },
    { slug: "london", name: "Currency Exchange London", flag: "🇬🇧" },
    { slug: "new-york", name: "Currency Exchange New York", flag: "🇺🇸" },
    { slug: "paris", name: "Currency Exchange Paris", flag: "🇫🇷" },
    { slug: "zurich", name: "Currency Exchange Zurich", flag: "🇨🇭" },
  ];

  const tools = [
    {
      slug: "travel-budget-calculator",
      name: "Travel Budget Calculator",
      icon: "🧮",
    },
    { slug: "inflation-calculator", name: "Inflation Calculator", icon: "📈" },
    { slug: "fee-calculator", name: "Exchange Fee Calculator", icon: "💰" },
    {
      slug: "multi-currency-converter",
      name: "Multi-Currency Converter",
      icon: "💱",
    },
    { slug: "rate-alert-system", name: "Rate Alert System", icon: "🔔" },
    {
      slug: "historical-rate-analyzer",
      name: "Historical Rate Analyzer",
      icon: "📊",
    },
  ];

  return (
    <footer className="bg-zinc-950 text-white py-12 mt-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {/* Main Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Currency Calculator
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Free Currency Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Currency News
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Currency Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Financial Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Currency Pairs */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Popular Pairs
            </h3>
            <ul className="space-y-2">
              {currencyPairs.slice(0, 8).map((pair, index) => (
                <li key={index}>
                  <Link
                    href={`/${pair.url}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {pair.from}/{pair.to} Calculator
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Conversions */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Popular Conversions
            </h3>
            <ul className="space-y-2">
              {popularConversions.slice(0, 8).map((conversion, index) => (
                <li key={index}>
                  <Link
                    href={`/convert/${conversion.amount}-${conversion.from}-to-${conversion.to}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {conversion.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Currency Guides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Currency Guides
            </h3>
            <ul className="space-y-2">
              {currencyGuides.slice(0, 8).map((guide, index) => (
                <li key={index}>
                  <Link
                    href={`/guides/currencies/${guide.slug}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm flex items-center"
                  >
                    <span className="mr-2">{guide.flag}</span>
                    {guide.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Guides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Travel Guides
            </h3>
            <ul className="space-y-2">
              {travelGuides.map((guide, index) => (
                <li key={index}>
                  <Link
                    href={`/guides/travel/${guide.slug}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm flex items-center"
                  >
                    <span className="mr-2">{guide.flag}</span>
                    {guide.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 pt-8 border-t border-zinc-800">
          {/* City Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Currency Exchange
            </h3>
            <ul className="space-y-2">
              {cities.map((city, index) => (
                <li key={index}>
                  <Link
                    href={`/currency-exchange-${city.slug}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm flex items-center"
                  >
                    <span className="mr-2">{city.flag}</span>
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Financial Tools
            </h3>
            <ul className="space-y-2">
              {tools.map((tool, index) => (
                <li key={index}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm flex items-center"
                  >
                    <span className="mr-2">{tool.icon}</span>
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Historical Rates */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Historical Rates
            </h3>
            <ul className="space-y-2">
              {currencyPairs.slice(0, 6).map((pair, index) => (
                <li key={index}>
                  <Link
                    href={`/rates/historical/${pair.from.toLowerCase()}-${pair.to.toLowerCase()}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {pair.from}/{pair.to} History
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Legal & Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Datenschutz (DE)
                </Link>
              </li>
              <li>
                <Link
                  href="/site-notice"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Site Notice
                </Link>
              </li>
              <li>
                <Link
                  href="/impressum"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Impressum (DE)
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Help & FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">
                About Our Currency Calculator
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our free currency calculator provides real-time exchange rates
                for over 170 currencies worldwide. Convert EUR to USD, GBP to
                EUR, and all major currency pairs with live rates updated every
                15 minutes. Perfect for travelers, businesses, and anyone
                needing accurate currency conversions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-xs">
                  euro to dollar
                </span>
                <span className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-xs">
                  currency converter
                </span>
                <span className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-xs">
                  exchange rate
                </span>
                <span className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-xs">
                  währungsrechner
                </span>
                <span className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-xs">
                  pound to euro
                </span>
                <span className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-xs">
                  swiss franc
                </span>
                <span className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-xs">
                  100 euro to dollar
                </span>
                <span className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-xs">
                  currency calculator
                </span>
                <span className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-xs">
                  geld wechseln
                </span>
                <span className="bg-zinc-800 text-gray-300 px-2 py-1 rounded text-xs">
                  travel money
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Currency Exchange Calculator. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              <span className="font-semibold">Currency Calculator</span>
            </Link>
            <div className="text-gray-400 text-sm">
              Live rates • Offline support • Free forever
            </div>
          </div>
        </div>

        {/* Structured Data for Footer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              name: "Currency Calculator Site Navigation",
              url: "https://exchange.danielhilmer.de",
              hasPart: [
                {
                  "@type": "SiteNavigationElement",
                  name: "Currency Calculators",
                  url: "https://exchange.danielhilmer.de",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Currency Guides",
                  url: "https://exchange.danielhilmer.de/guides",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Financial Tools",
                  url: "https://exchange.danielhilmer.de/tools",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Currency News",
                  url: "https://exchange.danielhilmer.de/news",
                },
              ],
            }),
          }}
        />
      </div>
    </footer>
  );
}
