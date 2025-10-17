import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "50 Euro to British Pound - Live Currency Converter";
  const description = "Convert 50 EUR to GBP with today's live exchange rate. Free calculator shows exactly how much 50 Euro is worth in British Pound.";

  const keywords = [
    "50 eur to gbp",
    "50 EUR GBP",
    "convert 50 euro to british pound",
    "50 Euro British Pound",
    "50 EUR in GBP",
    "how much is 50 eur in gbp",
    "EUR GBP converter",
    "euro british pound calculator"
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title,
      description,
      url: "https://exchange.danielhilmer.de/convert/50-euro-to-pound",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "50 Euro to British Pound Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/50-euro-to-pound"
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