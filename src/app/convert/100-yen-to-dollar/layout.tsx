import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "100 Japanese Yen to US Dollar - Live Currency Converter";
  const description = "Convert 100 JPY to USD with today's live exchange rate. Free calculator shows exactly how much 100 Japanese Yen is worth in US Dollar.";

  const keywords = [
    "100 jpy to usd",
    "100 JPY USD",
    "convert 100 japanese yen to us dollar",
    "100 Japanese Yen US Dollar",
    "100 JPY in USD",
    "how much is 100 jpy in usd",
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
      url: "https://exchange.danielhilmer.de/convert/100-yen-to-dollar",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "100 Japanese Yen to US Dollar Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/100-yen-to-dollar"
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