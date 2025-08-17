import { Metadata } from 'next';
import {
  organizationSchema,
  webApplicationSchema,
  financialServiceSchema,
  howToSchema,
} from '@/lib/schema';
import { SEOFAQSection } from '@/components/seo/SEOFAQSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Währungsrechner Euro Dollar - Kostenloser EUR USD Rechner',
  description:
    'Euro in Dollar umrechnen mit aktuellem Wechselkurs. Kostenloser EUR USD Währungsrechner mit Live-Kursen. Schnell, genau und funktioniert offline als PWA.',
  keywords: [
    'währungsrechner euro dollar',
    'eur usd rechner',
    'euro in dollar umrechnen',
    'euro dollar rechner kostenlos',
    'aktueller wechselkurs euro dollar',
    'euro zu dollar',
    'currency calculator eur usd',
    'dollar euro umrechnung',
  ],
  alternates: {
    canonical: 'https://exchange.danielhilmer.de/waehrungsrechner-euro-dollar',
    languages: {
      'de-DE': 'https://exchange.danielhilmer.de/waehrungsrechner-euro-dollar',
      'en-US': 'https://exchange.danielhilmer.de/currency-calculator-eur-usd',
    },
  },
  openGraph: {
    title: 'Währungsrechner Euro Dollar - Aktueller EUR USD Kurs',
    description:
      'Euro in Dollar umrechnen mit Live-Wechselkurs. Kostenloser EUR USD Rechner für schnelle Währungsumrechnung.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://exchange.danielhilmer.de/waehrungsrechner-euro-dollar',
    images: [
      {
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Währungsrechner Euro Dollar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Währungsrechner Euro Dollar - EUR USD Rechner',
    description:
      'Euro in Dollar umrechnen mit aktuellem Wechselkurs. Kostenloser Währungsrechner.',
  },
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function EurUsdLandingPage() {
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
            howToSchema,
          ]),
        }}
      />

      {/* Hero Section */}
      <section className='pt-20 pb-12 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent'>
            Währungsrechner Euro Dollar
          </h1>
          <p className='text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
            Rechnen Sie <strong>Euro in Dollar</strong> um mit dem aktuellen
            Wechselkurs. Unser kostenloser <strong>EUR USD Rechner</strong>{' '}
            zeigt Live-Kurse und funktioniert auch offline als Progressive Web
            App.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/'
              className='bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors'>
              Währungsrechner öffnen
            </Link>
            <Link
              href='#wie-funktioniert'
              className='border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors'>
              Wie funktioniert es?
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 px-4 bg-zinc-900/50'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Warum unser Euro Dollar Währungsrechner?
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center p-6 border border-zinc-700 rounded-lg'>
              <div className='text-4xl mb-4'>⚡</div>
              <h3 className='text-xl font-semibold mb-3'>
                Aktuelle Wechselkurse
              </h3>
              <p className='text-gray-400'>
                Live EUR USD Kurse, alle 15 Minuten aktualisiert für präzise
                Umrechnungen
              </p>
            </div>
            <div className='text-center p-6 border border-zinc-700 rounded-lg'>
              <div className='text-4xl mb-4'>📱</div>
              <h3 className='text-xl font-semibold mb-3'>Mobile optimiert</h3>
              <p className='text-gray-400'>
                Touch-optimierter Währungsrechner, perfekt für Smartphone und
                Tablet
              </p>
            </div>
            <div className='text-center p-6 border border-zinc-700 rounded-lg'>
              <div className='text-4xl mb-4'>🔒</div>
              <h3 className='text-xl font-semibold mb-3'>Offline verfügbar</h3>
              <p className='text-gray-400'>
                PWA-Technologie ermöglicht Nutzung ohne Internetverbindung
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id='wie-funktioniert' className='py-16 px-4'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            So rechnen Sie Euro in Dollar um
          </h2>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>
                  1
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Betrag eingeben
                  </h3>
                  <p className='text-gray-400'>
                    Geben Sie den Euro-Betrag ein, den Sie in Dollar umrechnen
                    möchten
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <div className='bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>
                  2
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Währungen auswählen
                  </h3>
                  <p className='text-gray-400'>
                    Wählen Sie EUR (Euro) als Ausgangswährung und USD (Dollar)
                    als Zielwährung
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <div className='bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>
                  3
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Ergebnis ablesen
                  </h3>
                  <p className='text-gray-400'>
                    Der umgerechnete Dollar-Betrag wird sofort mit aktuellem
                    Wechselkurs angezeigt
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-zinc-900 p-8 rounded-xl border border-zinc-700'>
              <h3 className='text-xl font-semibold mb-4'>
                Beispiel-Umrechnung
              </h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>100 EUR =</span>
                  <span className='font-mono text-orange-400'>108.50 USD</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Wechselkurs:</span>
                  <span className='font-mono'>1.0850</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-500'>Letztes Update:</span>
                  <span className='text-gray-500'>vor 5 Min.</span>
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
            Aktueller EUR USD Wechselkurs
          </h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='bg-black border border-zinc-700 rounded-xl p-8'>
              <h3 className='text-xl font-semibold mb-4 text-orange-400'>
                1 Euro in Dollar
              </h3>
              <div className='text-3xl font-mono font-bold mb-2'>
                1.0850 USD
              </div>
              <p className='text-sm text-gray-500'>
                Live-Kurs alle 15 Min. aktualisiert
              </p>
            </div>
            <div className='bg-black border border-zinc-700 rounded-xl p-8'>
              <h3 className='text-xl font-semibold mb-4 text-orange-400'>
                1 Dollar in Euro
              </h3>
              <div className='text-3xl font-mono font-bold mb-2'>
                0.9217 EUR
              </div>
              <p className='text-sm text-gray-500'>Umgekehrter Wechselkurs</p>
            </div>
          </div>
          <p className='mt-8 text-gray-400 max-w-2xl mx-auto'>
            Die Wechselkurse werden von zuverlässigen Finanzmarkt-APIs bezogen
            und alle 15 Minuten aktualisiert für maximale Genauigkeit bei der
            Euro Dollar Umrechnung.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <SEOFAQSection />

      {/* Call-to-Action Section */}
      <section className='py-16 px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-6'>
            Starten Sie jetzt mit der Euro Dollar Umrechnung
          </h2>
          <p className='text-lg text-gray-300 mb-8'>
            Kostenlos, schnell und ohne Registrierung. Der Währungsrechner
            funktioniert auch offline als Progressive Web App.
          </p>
          <Link
            href='/'
            className='inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors'>
            EUR USD Rechner öffnen
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-zinc-800 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='grid md:grid-cols-3 gap-8 text-sm'>
            <div>
              <h3 className='font-semibold mb-3'>Währungsrechner</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link href='/' className='hover:text-orange-400'>
                    Alle Währungen
                  </Link>
                </li>
                <li>
                  <Link
                    href='/waehrungsrechner-euro-dollar'
                    className='hover:text-orange-400'>
                    EUR USD
                  </Link>
                </li>
                <li>
                  <Link
                    href='/waehrungsrechner-euro-pfund'
                    className='hover:text-orange-400'>
                    EUR GBP
                  </Link>
                </li>
                <li>
                  <Link
                    href='/waehrungsrechner-euro-franken'
                    className='hover:text-orange-400'>
                    EUR CHF
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-3'>Features</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>170+ Währungen</li>
                <li>Live Wechselkurse</li>
                <li>Offline-Modus</li>
                <li>Mobile optimiert</li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-3'>Legal</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link href='/datenschutz' className='hover:text-orange-400'>
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link href='/impressum' className='hover:text-orange-400'>
                    Impressum
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-zinc-800 mt-8 pt-8 text-center text-gray-500'>
            <p>
              &copy; 2025 Currency Exchange Calculator - Kostenloser
              Währungsrechner
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
