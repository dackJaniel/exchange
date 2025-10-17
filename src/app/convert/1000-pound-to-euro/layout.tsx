import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "1000 British Pound to Euro - Live Currency Converter";
  const description = "Convert 1000 GBP to EUR with today's live exchange rate. Free calculator shows exactly how much 1000 British Pound is worth in Euro.";

  const keywords = [
    "1000 gbp to eur",
    "1000 GBP EUR",
    "convert 1000 british pound to euro",
    "1000 British Pound Euro",
    "1000 GBP in EUR",
    "how much is 1000 gbp in eur",
    "GBP EUR converter",
    "british pound euro calculator"
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title,
      description,
      url: "https://exchange.danielhilmer.de/convert/1000-pound-to-euro",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "1000 British Pound to Euro Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/1000-pound-to-euro"
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