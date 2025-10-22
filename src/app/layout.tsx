import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/lib/i18n/provider";
import {
  organizationSchema,
  webApplicationSchema,
  financialServiceSchema,
} from "@/lib/schema";
import "./globals.css";
import Matomo from "@/components/Matomo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Currency Exchange Calculator - Free Currency Converter",
    template: "%s | Currency Exchange Calculator",
  },
  description:
    "Free currency calculator with live exchange rates. Convert between 170+ currencies - EUR, USD, GBP and more. Progressive Web App with offline functionality.",
  keywords: [
    "currency calculator",
    "currency converter",
    "exchange rate",
    "euro converter",
    "dollar calculator",
    "pound sterling",
    "currency conversion",
    "free",
    "online calculator",
    "PWA",
    "progressive web app",
    "offline",
    "mobile",
    "real-time rates",
    "current",
    "finance",
    "travel",
    "business",
  ],
  alternates: {
    canonical: "https://exchange.danielhilmer.de/",
    languages: {
      "en-US": "https://exchange.danielhilmer.de/",
      "de-DE": "https://exchange.danielhilmer.de/de",
    },
  },
  authors: [{ name: "Daniel Hilmer", url: "https://danielhilmer.de" }],
  creator: "Daniel Hilmer",
  publisher: "Daniel Hilmer",
  applicationName: "Currency Exchange Calculator",
  category: "Finance",
  classification: "Finance Calculator",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://exchange.danielhilmer.de"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Currency Calc",
    startupImage: [
      {
        url: "/icons/apple-touch-icon.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "Currency Exchange Calculator",
    title: "Free Currency Calculator - Currency Exchange Calculator",
    description:
      "Currency calculator with live exchange rates for 170+ currencies. Simple, fast and free. Works offline as PWA.",
    locale: "en_US",
    alternateLocale: ["de_DE"],
    url: "https://exchange.danielhilmer.de",
    countryName: "Deutschland",
    images: [
      {
        url: "https://exchange.danielhilmer.de/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "Currency Exchange Calculator - Free Currency Converter",
        type: "image/png",
      },
      {
        url: "https://exchange.danielhilmer.de/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Currency Exchange Calculator App Icon",
        type: "image/png",
      },
    ],
    videos: [],
    audio: [],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle", // Hier Twitter Handle einfügen
    creator: "@YourTwitterHandle", // Hier Twitter Handle einfügen
    title: "Free Currency Calculator - Currency Exchange Calculator",
    description:
      "Currency calculator with live exchange rates for 170+ currencies. Simple, fast and free.",
    images: {
      url: "https://exchange.danielhilmer.de/icons/og-image.png",
      alt: "Currency Exchange Calculator Screenshot",
      width: 1200,
      height: 630,
    },
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              webApplicationSchema,
              financialServiceSchema,
            ]),
          }}
        />

        {/* Additional PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Currency Calc" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-TileImage"
          content="/icons/icon-144x144.png"
        />
        <meta name="msapplication-config" content="none" />

        {/* Preload critical resources */}
        {/* Font preloading removed - using Next.js Google Fonts */}

        {/* DNS prefetch for external APIs */}
        <link rel="dns-prefetch" href="//api.exchangerate-api.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Multilingual SEO */}
        <link
          rel="alternate"
          hrefLang="en"
          href="https://exchange.danielhilmer.de/"
        />
        <link
          rel="alternate"
          hrefLang="de"
          href="https://exchange.danielhilmer.de/de"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://exchange.danielhilmer.de/"
        />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Currency Exchange Calculator",
              description:
                "Free currency calculator with live exchange rates for 170+ currencies",
              url: "https://exchange.danielhilmer.de",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              browserRequirements:
                "Requires modern browser with JavaScript enabled",
              author: {
                "@type": "Person",
                name: "Daniel Hilmer",
                url: "https://danielhilmer.de",
              },
              publisher: {
                "@type": "Person",
                name: "Daniel Hilmer",
                url: "https://danielhilmer.de",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
              },
              screenshot: "https://exchange.danielhilmer.de/icons/og-image.png",
              softwareVersion: "1.0.0",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                ratingCount: "1",
                bestRating: "5",
                worstRating: "1",
              },
              featureList: [
                "Live exchange rates",
                "Offline functionality",
                "Progressive Web App",
                "170+ currencies",
                "Free to use",
                "Mobile optimized",
                "Fast calculations",
              ],
            }),
          }}
        />

        {/* Additional Meta Tags for Social Media */}
        <meta
          property="og:image:secure_url"
          content="https://exchange.danielhilmer.de/icons/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Currency Exchange Calculator App"
        />
        {/* Removed dynamic og:updated_time to prevent hydration mismatch */}

        {/* WhatsApp specific meta tags */}
        <meta
          property="og:image"
          content="https://exchange.danielhilmer.de/icons/whatsapp-share.png"
        />
        <meta property="og:image:type" content="image/png" />

        {/* Telegram meta tags */}
        <meta property="telegram:channel" content="@YourTelegramChannel" />

        {/* LinkedIn specific */}
        <meta property="og:see_also" content="https://danielhilmer.de" />

        {/* Additional social sharing optimization */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        <meta name="format-detection" content="url=no" />

        {/* Additional icon links for better compatibility */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link rel="mask-icon" href="/icons/icon-base.svg" color="#ff9500" />

        {/* Microsoft specific */}
        <meta
          name="msapplication-square70x70logo"
          content="/icons/icon-72x72.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="/icons/icon-152x152.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="/icons/icon-384x384.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/icons/icon-512x512.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <I18nProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#ffffff",
                border: "1px solid #333",
              },
            }}
          />
        </I18nProvider>
      </body>
      <Matomo />
    </html>
  );
}
