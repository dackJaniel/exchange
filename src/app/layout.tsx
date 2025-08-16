import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Currency Exchange Calculator - Kostenloser Währungsrechner',
    template: '%s | Currency Exchange Calculator',
  },
  description:
    'Kostenloser Währungsrechner mit aktuellen Wechselkursen. Rechnen Sie zwischen 170+ Währungen um - EUR, USD, GBP und mehr. Progressive Web App mit Offline-Funktionen.',
  keywords: [
    'währungsrechner',
    'currency calculator',
    'wechselkurs',
    'exchange rate',
    'euro umrechner',
    'dollar rechner',
    'pfund sterling',
    'währung umrechnen',
    'currency conversion',
    'kostenlos',
    'online rechner',
    'PWA',
    'progressive web app',
    'offline',
    'mobil',
    'real-time rates',
    'aktuell',
    'finanzen',
    'reise',
    'business',
  ],
  authors: [{ name: 'Daniel Hilmer', url: 'https://danielhilmer.de' }],
  creator: 'Daniel Hilmer',
  publisher: 'Daniel Hilmer',
  applicationName: 'Currency Exchange Calculator',
  category: 'Finance',
  classification: 'Finance Calculator',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
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
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://exchange.danielhilmer.de'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Currency Calc',
    startupImage: [
      {
        url: '/icons/apple-touch-icon.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'Currency Exchange Calculator',
    title: 'Kostenloser Währungsrechner - Currency Exchange Calculator',
    description:
      'Währungsrechner mit aktuellen Wechselkursen für 170+ Währungen. Einfach, schnell und kostenlos. Funktioniert auch offline als PWA.',
    locale: 'de_DE',
    alternateLocale: ['en_US'],
    url: 'https://exchange.danielhilmer.de',
    countryName: 'Deutschland',
    images: [
      {
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Currency Exchange Calculator - Kostenloser Währungsrechner',
        type: 'image/png',
      },
      {
        url: 'https://exchange.danielhilmer.de/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Currency Exchange Calculator App Icon',
        type: 'image/png',
      },
    ],
    videos: [],
    audio: [],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@YourTwitterHandle', // Hier Twitter Handle einfügen
    creator: '@YourTwitterHandle', // Hier Twitter Handle einfügen
    title: 'Kostenloser Währungsrechner - Currency Exchange Calculator',
    description:
      'Währungsrechner mit aktuellen Wechselkursen für 170+ Währungen. Einfach, schnell und kostenlos.',
    images: {
      url: 'https://exchange.danielhilmer.de/icons/og-image.png',
      alt: 'Currency Exchange Calculator Screenshot',
      width: 1200,
      height: 630,
    },
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='de' className='dark'>
      <head>
        {/* Additional PWA Meta Tags */}
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='apple-mobile-web-app-title' content='Currency Calc' />
        <meta name='msapplication-TileColor' content='#000000' />
        <meta
          name='msapplication-TileImage'
          content='/icons/icon-144x144.png'
        />
        <meta name='msapplication-config' content='none' />

        {/* Preload critical resources */}
        <link
          rel='preload'
          as='font'
          href='/fonts/geist-sans.woff2'
          crossOrigin=''
        />
        <link
          rel='preload'
          as='font'
          href='/fonts/geist-mono.woff2'
          crossOrigin=''
        />

        {/* DNS prefetch for external APIs */}
        <link rel='dns-prefetch' href='//api.exchangerate-api.com' />
        <link rel='dns-prefetch' href='//fonts.googleapis.com' />
        <link rel='dns-prefetch' href='//fonts.gstatic.com' />

        {/* Schema.org structured data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Currency Exchange Calculator',
              description:
                'Kostenloser Währungsrechner mit aktuellen Wechselkursen für 170+ Währungen',
              url: 'https://exchange.danielhilmer.de',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'All',
              browserRequirements:
                'Requires modern browser with JavaScript enabled',
              author: {
                '@type': 'Person',
                name: 'Daniel Hilmer',
                url: 'https://danielhilmer.de',
              },
              publisher: {
                '@type': 'Person',
                name: 'Daniel Hilmer',
                url: 'https://danielhilmer.de',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
              },
              screenshot: 'https://exchange.danielhilmer.de/icons/og-image.png',
              softwareVersion: '1.0.0',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                ratingCount: '1',
                bestRating: '5',
                worstRating: '1',
              },
              featureList: [
                'Aktuelle Wechselkurse',
                'Offline-Funktionalität',
                'Progressive Web App',
                'Über 170 Währungen',
                'Kostenlose Nutzung',
                'Mobile optimiert',
                'Schnelle Berechnungen',
              ],
            }),
          }}
        />

        {/* Additional Meta Tags for Social Media */}
        <meta
          property='og:image:secure_url'
          content='https://exchange.danielhilmer.de/icons/og-image.png'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta
          property='og:image:alt'
          content='Currency Exchange Calculator App'
        />
        <meta property='og:updated_time' content={new Date().toISOString()} />

        {/* WhatsApp specific meta tags */}
        <meta
          property='og:image'
          content='https://exchange.danielhilmer.de/icons/whatsapp-share.png'
        />
        <meta property='og:image:type' content='image/png' />

        {/* Telegram meta tags */}
        <meta property='telegram:channel' content='@YourTelegramChannel' />

        {/* LinkedIn specific */}
        <meta property='og:see_also' content='https://danielhilmer.de' />

        {/* Additional social sharing optimization */}
        <meta name='format-detection' content='telephone=no' />
        <meta name='format-detection' content='date=no' />
        <meta name='format-detection' content='address=no' />
        <meta name='format-detection' content='email=no' />
        <meta name='format-detection' content='url=no' />

        {/* Additional icon links for better compatibility */}
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/icons/icon-192x192.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/icons/apple-touch-icon.png'
        />
        <link rel='mask-icon' href='/icons/icon-base.svg' color='#ff9500' />

        {/* Microsoft specific */}
        <meta
          name='msapplication-square70x70logo'
          content='/icons/icon-72x72.png'
        />
        <meta
          name='msapplication-square150x150logo'
          content='/icons/icon-152x152.png'
        />
        <meta
          name='msapplication-wide310x150logo'
          content='/icons/icon-384x384.png'
        />
        <meta
          name='msapplication-square310x310logo'
          content='/icons/icon-512x512.png'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}>
        {children}
        <ServiceWorkerRegistration />
        <Toaster
          position='top-center'
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#ffffff',
              border: '1px solid #333',
            },
          }}
        />
      </body>
    </html>
  );
}
