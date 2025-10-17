import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "500 Swiss Franc to Euro - Live Currency Converter";
  const description = "Convert 500 CHF to EUR with today's live exchange rate. Free calculator shows exactly how much 500 Swiss Franc is worth in Euro.";

  const keywords = [
    "500 chf to eur",
    "500 CHF EUR",
    "convert 500 swiss franc to euro",
    "500 Swiss Franc Euro",
    "500 CHF in EUR",
    "how much is 500 chf in eur",
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
      url: "https://exchange.danielhilmer.de/convert/500-franken-to-euro",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "500 Swiss Franc to Euro Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/500-franken-to-euro"
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