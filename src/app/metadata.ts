import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Kostenloser Währungsrechner - Currency Exchange Calculator',
        description: 'Berechnen Sie Wechselkurse zwischen 170+ Währungen. Aktuell, kostenlos und offline verfügbar. EUR, USD, GBP, JPY und mehr.',
        keywords: [
            'währungsrechner kostenlos',
            'euro in dollar umrechnen',
            'wechselkurs rechner',
            'currency calculator',
            'exchange rate calculator',
            'währung umrechnen online',
            'devisen rechner',
            'geld umrechnen',
            'pfund euro rechner',
            'yen euro rechner',
            'schweizer franken euro',
            'bitcoin rechner',
            'kryptowährung umrechnen',
        ],
        openGraph: {
            title: 'Kostenloser Währungsrechner - 170+ Währungen umrechnen',
            description: 'Schneller und genauer Währungsrechner. Aktuelle Wechselkurse für EUR, USD, GBP und alle anderen Währungen. Kostenlos und offline nutzbar.',
            type: 'website',
            locale: 'de_DE',
            siteName: 'Currency Exchange Calculator',
        },
        twitter: {
            title: 'Kostenloser Währungsrechner - Currency Calculator',
            description: 'Währungen schnell umrechnen. Aktuelle Kurse für EUR, USD, GBP und 170+ weitere Währungen.',
        },
        alternates: {
            canonical: 'https://exchange.danielhilmer.de',
        },
    };
}
