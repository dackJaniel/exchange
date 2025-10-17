import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "100 US Dollar to Japanese Yen - Live Currency Converter";
  const description = "Convert 100 USD to JPY with today's live exchange rate. Free calculator shows exactly how much 100 US Dollar is worth in Japanese Yen.";

  const keywords = [
    "100 usd to jpy",
    "100 USD JPY",
    "convert 100 us dollar to japanese yen",
    "100 US Dollar Japanese Yen",
    "100 USD in JPY",
    "how much is 100 usd in jpy",
    "USD JPY converter",
    "us dollar japanese yen calculator"
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title,
      description,
      url: "https://exchange.danielhilmer.de/convert/100-dollar-to-yen",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "100 US Dollar to Japanese Yen Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/100-dollar-to-yen"
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
}