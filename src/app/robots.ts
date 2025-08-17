import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/_next/',
                    '/admin/',
                    '/.well-known/',
                    '/manifest.json$', // Allow manifest but not crawl
                ],
                crawlDelay: 1, // Be respectful to the server
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/api/',
                    '/_next/',
                    '/admin/',
                ],
                crawlDelay: 0, // Google can crawl without delay
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: [
                    '/api/',
                    '/_next/',
                    '/admin/',
                ],
                crawlDelay: 1,
            }
        ],
        sitemap: [
            'https://exchange.danielhilmer.de/sitemap.xml',
        ],
        host: 'https://exchange.danielhilmer.de',
    };
}
