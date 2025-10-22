'use client';

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n/provider';

interface BreadcrumbItem {
  name: string;
  href?: string;
  current?: boolean;
}

interface EnhancedBreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function EnhancedBreadcrumb({
  items,
  showHome = true,
  className = ""
}: EnhancedBreadcrumbProps) {
  const { locale } = useI18n();

  // Prepare items with home if needed
  const breadcrumbItems = showHome
    ? [
        {
          name: locale === 'de' ? 'Startseite' : 'Home',
          href: locale === 'de' ? '/de' : '/'
        },
        ...items
      ]
    : items;

  // Generate structured data for search engines
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.href ? `https://exchange.danielhilmer.de${item.href}` : undefined
    }))
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />

      <nav
        className={`flex ${className}`}
        aria-label={locale === 'de' ? 'Breadcrumb-Navigation' : 'Breadcrumb navigation'}
      >
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon
                  className="w-4 h-4 text-gray-500 mx-2"
                  aria-hidden="true"
                />
              )}

              {item.current || !item.href ? (
                <span
                  className="text-gray-300 font-medium"
                  aria-current={item.current ? 'page' : undefined}
                >
                  {index === 0 && showHome && (
                    <HomeIcon className="w-4 h-4 inline mr-1" aria-hidden="true" />
                  )}
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-orange-500 hover:text-orange-400 hover:underline transition-colors"
                >
                  {index === 0 && showHome && (
                    <HomeIcon className="w-4 h-4 inline mr-1" aria-hidden="true" />
                  )}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Predefined breadcrumb configurations for common pages
export const BreadcrumbConfigs = {
  currencyConversion: (fromCurrency: string, toCurrency: string, amount?: number, locale: string = 'en') => [
    {
      name: locale === 'de' ? 'Währungsrechner' : 'Currency Calculator',
      href: locale === 'de' ? '/de' : '/'
    },
    {
      name: locale === 'de' ? 'Umrechnungen' : 'Conversions',
      href: '/convert'
    },
    {
      name: amount
        ? `${amount} ${fromCurrency} → ${toCurrency}`
        : `${fromCurrency} → ${toCurrency}`,
      current: true
    }
  ],

  about: (locale: string = 'en') => [
    {
      name: locale === 'de' ? 'Über uns' : 'About',
      current: true
    }
  ],

  privacy: (locale: string = 'en') => [
    {
      name: locale === 'de' ? 'Datenschutz' : 'Privacy Policy',
      current: true
    }
  ],

  impressum: (locale: string = 'en') => [
    {
      name: locale === 'de' ? 'Impressum' : 'Legal Notice',
      current: true
    }
  ],

  help: (locale: string = 'en') => [
    {
      name: locale === 'de' ? 'Hilfe' : 'Help',
      current: true
    }
  ]
};

// Utility function to create breadcrumb from URL path
export function createBreadcrumbFromPath(pathname: string, locale: string = 'en'): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [];

  // Remove locale segment if present
  if (segments[0] === 'de') {
    segments.shift();
  }

  let currentPath = locale === 'de' ? '/de' : '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Convert segment to readable name
    let name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Handle special cases
    const translations: Record<string, Record<string, string>> = {
      'convert': {
        'en': 'Conversions',
        'de': 'Umrechnungen'
      },
      'about': {
        'en': 'About',
        'de': 'Über uns'
      },
      'privacy': {
        'en': 'Privacy Policy',
        'de': 'Datenschutz'
      },
      'impressum': {
        'en': 'Legal Notice',
        'de': 'Impressum'
      },
      'help': {
        'en': 'Help',
        'de': 'Hilfe'
      }
    };

    if (translations[segment]) {
      name = translations[segment][locale] || translations[segment]['en'];
    }

    // Handle currency conversion paths
    if (segment.includes('euro-to') || segment.includes('dollar-to') || segment.includes('pound-to')) {
      const parts = segment.split('-');
      if (parts.length >= 3 && parts[1] === 'to') {
        const amount = parts[0].match(/^\d+/) ? parts[0].match(/^\d+/)?.[0] : '';
        const from = parts[0].replace(/^\d+/, '').replace(/^-/, '').toUpperCase();
        const to = parts.slice(2).join(' ').toUpperCase();

        name = amount
          ? `${amount} ${from} → ${to}`
          : `${from} → ${to}`;
      }
    }

    items.push({
      name,
      href: index < segments.length - 1 ? currentPath : undefined,
      current: index === segments.length - 1
    });
  });

  return items;
}

// Component for automatic breadcrumb generation
export function AutoBreadcrumb({
  pathname,
  customItems,
  className
}: {
  pathname: string;
  customItems?: BreadcrumbItem[];
  className?: string;
}) {
  const { locale } = useI18n();

  const items = customItems || createBreadcrumbFromPath(pathname, locale);

  return (
    <EnhancedBreadcrumb
      items={items}
      className={className}
    />
  );
}
