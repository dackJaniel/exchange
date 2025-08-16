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
  title: 'Currency Exchange Calculator',
  description:
    'Modern currency exchange calculator with real-time rates and integrated calculator functions',
  keywords: [
    'currency',
    'exchange',
    'calculator',
    'conversion',
    'rates',
    'finance',
    'PWA',
    'progressive web app',
  ],
  authors: [{ name: 'Currency Calculator App' }],
  creator: 'Currency Calculator App',
  publisher: 'Currency Calculator App',
  applicationName: 'Currency Exchange Calculator',
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
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
    title: 'Currency Exchange Calculator',
    description: 'Modern currency exchange calculator with real-time rates',
    locale: 'de_DE',
    url: 'https://exchange.danielhilmer.de',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Currency Exchange Calculator Icon',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Currency Exchange Calculator',
    description: 'Modern currency exchange calculator with real-time rates',
    images: ['/icons/icon-512x512.png'],
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
