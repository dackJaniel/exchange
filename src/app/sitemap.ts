import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://exchange.danielhilmer.de';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
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
            lastModified: new Date(),
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
            url: `${baseUrl}/datenschutz`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/impressum`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/site-notice`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];
}
