import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "500 Japanese Yen to US Dollar - Live Currency Converter";
  const description = "Convert 500 JPY to USD with today's live exchange rate. Free calculator shows exactly how much 500 Japanese Yen is worth in US Dollar.";

  const keywords = [
    "500 jpy to usd",
    "500 JPY USD",
    "convert 500 japanese yen to us dollar",
    "500 Japanese Yen US Dollar",
    "500 JPY in USD",
    "how much is 500 jpy in usd",
    "JPY USD converter",
    "japanese yen us dollar calculator"
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title,
      description,
      url: "https://exchange.danielhilmer.de/convert/500-yen-to-dollar",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "500 Japanese Yen to US Dollar Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/500-yen-to-dollar"
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