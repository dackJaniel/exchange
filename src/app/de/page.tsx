import { Metadata } from 'next';
import { translations } from '@/lib/i18n/translations';

// This generates separate pages for German SEO
export const metadata: Metadata = {
  title: translations.de.meta.title,
  description: translations.de.meta.description,
  keywords: [...translations.de.keywords],
  alternates: {
    canonical: 'https://exchange.danielhilmer.de/de',
    languages: {
      'en-US': 'https://exchange.danielhilmer.de/',
      'de-DE': 'https://exchange.danielhilmer.de/de',
    },
  },
  openGraph: {
    title: translations.de.meta.openGraphTitle,
    description: translations.de.meta.openGraphDescription,
    locale: 'de_DE',
    alternateLocale: ['en_US'],
    url: 'https://exchange.danielhilmer.de/de',
  },
  twitter: {
    title: translations.de.meta.twitterTitle,
    description: translations.de.meta.twitterDescription,
  },
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function GermanPage() {
  return (
    // This will redirect to the main page but with German language set
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // Set language preference and redirect to main page
          if (typeof window !== 'undefined') {
            localStorage.setItem('language', 'de');
            if (window.location.pathname === '/de') {
              window.location.replace('/');
            }
          }
        `,
      }}
    />
  );
}
