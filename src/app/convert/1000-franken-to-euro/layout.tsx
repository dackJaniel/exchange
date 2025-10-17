import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "1000 Swiss Franc to Euro - Live Currency Converter";
  const description = "Convert 1000 CHF to EUR with today's live exchange rate. Free calculator shows exactly how much 1000 Swiss Franc is worth in Euro.";

  const keywords = [
    "1000 chf to eur",
    "1000 CHF EUR",
    "convert 1000 swiss franc to euro",
    "1000 Swiss Franc Euro",
    "1000 CHF in EUR",
    "how much is 1000 chf in eur",
    "CHF EUR converter",
    "swiss franc euro calculator"
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title,
      description,
      url: "https://exchange.danielhilmer.de/convert/1000-franken-to-euro",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "1000 Swiss Franc to Euro Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/1000-franken-to-euro"
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