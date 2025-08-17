import { Metadata } from 'next';
import {
  organizationSchema,
  webApplicationSchema,
  financialServiceSchema,
} from '@/lib/schema';
import { SEOFAQSection } from '@/components/seo/SEOFAQSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Currency Calculator EUR USD - Free Euro Dollar Converter',
  description:
    'Convert Euro to Dollar with current exchange rates. Free EUR USD currency calculator with live rates. Fast, accurate, and works offline as PWA.',
  keywords: [
    'currency calculator eur usd',
    'euro to dollar converter',
    'eur usd converter',
    'euro dollar calculator free',
    'current eur usd exchange rate',
    'euro to dollar',
    'currency converter eur usd',
    'dollar euro conversion',
  ],
  alternates: {
    canonical: 'https://exchange.danielhilmer.de/currency-calculator-eur-usd',
    languages: {
      'en-US': 'https://exchange.danielhilmer.de/currency-calculator-eur-usd',
      'de-DE': 'https://exchange.danielhilmer.de/waehrungsrechner-euro-dollar',
    },
  },
  openGraph: {
    title: 'Currency Calculator EUR USD - Current Euro Dollar Rate',
    description:
      'Convert Euro to Dollar with live exchange rate. Free EUR USD calculator for quick currency conversion.',
    type: 'website',
    locale: 'en_US',
    url: 'https://exchange.danielhilmer.de/currency-calculator-eur-usd',
    images: [
      {
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Currency Calculator EUR USD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Calculator EUR USD - Euro Dollar Converter',
    description:
      'Convert Euro to Dollar with current exchange rate. Free currency calculator.',
  },
};

export default function EurUsdEnglishLandingPage() {
  return (
    <div className='min-h-screen bg-black text-white'>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            webApplicationSchema,
            financialServiceSchema,
          ]),
        }}
      />

      {/* Hero Section */}
      <section className='pt-20 pb-12 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent'>
            Currency Calculator EUR USD
          </h1>
          <p className='text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
            Convert <strong>Euro to Dollar</strong> with current exchange rates.
            Our free <strong>EUR USD calculator</strong> shows live rates and
            works offline as a Progressive Web App.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/'
              className='bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors'>
              Open Calculator
            </Link>
            <Link
              href='#how-it-works'
              className='border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors'>
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 px-4 bg-zinc-900/50'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Why Choose Our EUR USD Currency Calculator?
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center p-6 border border-zinc-700 rounded-lg'>
              <div className='text-4xl mb-4'>⚡</div>
              <h3 className='text-xl font-semibold mb-3'>
                Live Exchange Rates
              </h3>
              <p className='text-gray-400'>
                Current EUR USD rates updated every 15 minutes for precise
                conversions
              </p>
            </div>
            <div className='text-center p-6 border border-zinc-700 rounded-lg'>
              <div className='text-4xl mb-4'>📱</div>
              <h3 className='text-xl font-semibold mb-3'>Mobile Optimized</h3>
              <p className='text-gray-400'>
                Touch-optimized currency calculator perfect for smartphone and
                tablet
              </p>
            </div>
            <div className='text-center p-6 border border-zinc-700 rounded-lg'>
              <div className='text-4xl mb-4'>🔒</div>
              <h3 className='text-xl font-semibold mb-3'>Works Offline</h3>
              <p className='text-gray-400'>
                PWA technology enables usage without internet connection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id='how-it-works' className='py-16 px-4'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            How to Convert Euro to Dollar
          </h2>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>
                  1
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Enter Amount</h3>
                  <p className='text-gray-400'>
                    Enter the Euro amount you want to convert to Dollars
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <div className='bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>
                  2
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Select Currencies
                  </h3>
                  <p className='text-gray-400'>
                    Choose EUR (Euro) as source currency and USD (Dollar) as
                    target
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <div className='bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>
                  3
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Get Result</h3>
                  <p className='text-gray-400'>
                    The converted Dollar amount is instantly displayed with
                    current rate
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-zinc-900 p-8 rounded-xl border border-zinc-700'>
              <h3 className='text-xl font-semibold mb-4'>Example Conversion</h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>100 EUR =</span>
                  <span className='font-mono text-orange-400'>108.50 USD</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Exchange Rate:</span>
                  <span className='font-mono'>1.0850</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-500'>Last Update:</span>
                  <span className='text-gray-500'>5 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Exchange Rate Info */}
      <section className='py-16 px-4 bg-zinc-900/50'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8'>
            Current EUR USD Exchange Rate
          </h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='bg-black border border-zinc-700 rounded-xl p-8'>
              <h3 className='text-xl font-semibold mb-4 text-orange-400'>
                1 Euro to Dollar
              </h3>
              <div className='text-3xl font-mono font-bold mb-2'>
                1.0850 USD
              </div>
              <p className='text-sm text-gray-500'>
                Live rate updated every 15 min
              </p>
            </div>
            <div className='bg-black border border-zinc-700 rounded-xl p-8'>
              <h3 className='text-xl font-semibold mb-4 text-orange-400'>
                1 Dollar to Euro
              </h3>
              <div className='text-3xl font-mono font-bold mb-2'>
                0.9217 EUR
              </div>
              <p className='text-sm text-gray-500'>Reverse exchange rate</p>
            </div>
          </div>
          <p className='mt-8 text-gray-400 max-w-2xl mx-auto'>
            Exchange rates are sourced from reliable financial market APIs and
            updated every 15 minutes for maximum accuracy in Euro Dollar
            conversion.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <SEOFAQSection />

      {/* Call-to-Action Section */}
      <section className='py-16 px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-6'>
            Start Converting Euro to Dollar Now
          </h2>
          <p className='text-lg text-gray-300 mb-8'>
            Free, fast, and no registration required. The currency calculator
            also works offline as a Progressive Web App.
          </p>
          <Link
            href='/'
            className='inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors'>
            Open EUR USD Calculator
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-zinc-800 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='grid md:grid-cols-3 gap-8 text-sm'>
            <div>
              <h3 className='font-semibold mb-3'>Currency Calculator</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link href='/' className='hover:text-orange-400'>
                    All Currencies
                  </Link>
                </li>
                <li>
                  <Link
                    href='/currency-calculator-eur-usd'
                    className='hover:text-orange-400'>
                    EUR USD
                  </Link>
                </li>
                <li>
                  <Link
                    href='/currency-calculator-eur-gbp'
                    className='hover:text-orange-400'>
                    EUR GBP
                  </Link>
                </li>
                <li>
                  <Link
                    href='/currency-calculator-eur-chf'
                    className='hover:text-orange-400'>
                    EUR CHF
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-3'>Features</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>170+ Currencies</li>
                <li>Live Exchange Rates</li>
                <li>Offline Mode</li>
                <li>Mobile Optimized</li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-3'>Legal</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link href='/privacy' className='hover:text-orange-400'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href='/site-notice' className='hover:text-orange-400'>
                    Site Notice
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-zinc-800 mt-8 pt-8 text-center text-gray-500'>
            <p>
              &copy; 2025 Currency Exchange Calculator - Free Currency Converter
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
