import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://exchange.danielhilmer.de';
    const currentDate = new Date();

    return [
        // Main pages
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1,
            alternates: {
                languages: {
                    en: baseUrl,
                    de: `${baseUrl}/de`,
                },
            },
        },
        {
            url: `${baseUrl}/de`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1,
            alternates: {
                languages: {
                    en: baseUrl,
                    de: `${baseUrl}/de`,
                },
            },
        },

        // SEO Landing Pages
        {
            url: `${baseUrl}/waehrungsrechner-euro-dollar`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/currency-calculator-eur-usd`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/waehrungsrechner-euro-pfund`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/currency-calculator-eur-gbp`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/waehrungsrechner-euro-franken`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/currency-calculator-eur-chf`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
        },

        // Legal pages (German)
        {
            url: `${baseUrl}/datenschutz`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/impressum`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.3,
        },

        // Legal pages (English)
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/site-notice`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.3,
        },

        // Offline page
        {
            url: `${baseUrl}/offline`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.2,
        },
    ];
}
