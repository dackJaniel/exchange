import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "500 Euro to British Pound - Live Currency Converter";
  const description = "Convert 500 EUR to GBP with today's live exchange rate. Free calculator shows exactly how much 500 Euro is worth in British Pound.";

  const keywords = [
    "500 eur to gbp",
    "500 EUR GBP",
    "convert 500 euro to british pound",
    "500 Euro British Pound",
    "500 EUR in GBP",
    "how much is 500 eur in gbp",
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
      url: "https://exchange.danielhilmer.de/convert/500-euro-to-pound",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "500 Euro to British Pound Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/500-euro-to-pound"
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