import { Metadata } from 'next';
import { organizationSchema, webApplicationSchema, financialServiceSchema } from '@/lib/schema';
import { SEOFAQSection } from '@/components/seo/SEOFAQSection';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Währungsrechner Euro Schweizer Franken - EUR CHF',
    description: 'Euro in Schweizer Franken umrechnen mit aktuellem Wechselkurs. Kostenloser EUR CHF Währungsrechner mit Live-Kursen.',
    alternates: {
        canonical: 'https://exchange.danielhilmer.de/waehrungsrechner-euro-franken',
    },
};

export default function EURCHFLandingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([organizationSchema, webApplicationSchema, financialServiceSchema])
                }}
            />
            
            <section className="pt-20 pb-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                        Währungsrechner Euro Schweizer Franken - EUR CHF
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Euro in Schweizer Franken umrechnen mit aktuellem Wechselkurs. Kostenloser EUR CHF Rechner.
                    </p>
                    <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                        Währungsrechner öffnen
                    </Link>
                </div>
            </section>
            
            <SEOFAQSection />
        </div>
    );
}