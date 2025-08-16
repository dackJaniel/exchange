import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Free Currency Calculator - Currency Exchange Calculator',
        description: 'Calculate exchange rates between 170+ currencies. Current, free and available offline. EUR, USD, GBP, JPY and more.',
        keywords: [
            'free currency calculator',
            'euro to dollar converter',
            'exchange rate calculator',
            'currency calculator',
            'exchange rate calculator',
            'currency converter online',
            'forex calculator',
            'money converter',
            'pound euro calculator',
            'yen euro calculator',
            'swiss franc euro',
            'bitcoin calculator',
            'cryptocurrency converter',
        ],
        openGraph: {
            title: 'Free Currency Calculator - Convert 170+ Currencies',
            description: 'Fast and accurate currency calculator. Live exchange rates for EUR, USD, GBP and all other currencies. Free and available offline.',
            type: 'website',
            locale: 'en_US',
            siteName: 'Currency Exchange Calculator',
        },
        twitter: {
            title: 'Free Currency Calculator - Currency Calculator',
            description: 'Convert currencies quickly. Live rates for EUR, USD, GBP and 170+ more currencies.',
        },
        alternates: {
            canonical: 'https://exchange.danielhilmer.de',
        },
    };
}
