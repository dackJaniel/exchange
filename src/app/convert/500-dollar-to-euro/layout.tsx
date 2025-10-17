import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "500 US Dollar to Euro - Live Currency Converter";
  const description = "Convert 500 USD to EUR with today's live exchange rate. Free calculator shows exactly how much 500 US Dollar is worth in Euro.";

  const keywords = [
    "500 usd to eur",
    "500 USD EUR",
    "convert 500 us dollar to euro",
    "500 US Dollar Euro",
    "500 USD in EUR",
    "how much is 500 usd in eur",
    "USD EUR converter",
    "us dollar euro calculator"
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title,
      description,
      url: "https://exchange.danielhilmer.de/convert/500-dollar-to-euro",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "500 US Dollar to Euro Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/500-dollar-to-euro"
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