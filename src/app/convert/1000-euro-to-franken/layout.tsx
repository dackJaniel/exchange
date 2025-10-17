import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "1000 Euro to Swiss Franc - Live Currency Converter";
  const description = "Convert 1000 EUR to CHF with today's live exchange rate. Free calculator shows exactly how much 1000 Euro is worth in Swiss Franc.";

  const keywords = [
    "1000 eur to chf",
    "1000 EUR CHF",
    "convert 1000 euro to swiss franc",
    "1000 Euro Swiss Franc",
    "1000 EUR in CHF",
    "how much is 1000 eur in chf",
    "EUR CHF converter",
    "euro swiss franc calculator"
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title,
      description,
      url: "https://exchange.danielhilmer.de/convert/1000-euro-to-franken",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "1000 Euro to Swiss Franc Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/1000-euro-to-franken"
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