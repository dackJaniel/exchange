import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = "50 British Pound to US Dollar - Live Currency Converter";
  const description = "Convert 50 GBP to USD with today's live exchange rate. Free calculator shows exactly how much 50 British Pound is worth in US Dollar.";

  const keywords = [
    "50 gbp to usd",
    "50 GBP USD",
    "convert 50 british pound to us dollar",
    "50 British Pound US Dollar",
    "50 GBP in USD",
    "how much is 50 gbp in usd",
    "GBP USD converter",
    "british pound us dollar calculator"
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title,
      description,
      url: "https://exchange.danielhilmer.de/convert/50-pound-to-dollar",
      siteName: 'Currency Exchange Calculator',
      type: 'website',
      images: [{
        url: 'https://exchange.danielhilmer.de/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: "50 British Pound to US Dollar Converter"
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://exchange.danielhilmer.de/icons/og-image.png']
    },

    alternates: {
      canonical: "https://exchange.danielhilmer.de/convert/50-pound-to-dollar"
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