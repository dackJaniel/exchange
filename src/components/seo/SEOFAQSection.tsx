import { useI18n } from '@/lib/i18n/provider';
import { faqSchema } from '@/lib/schema';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  id: string;
}

interface FAQItemProps {
  item: FAQItem;
}

function FAQItem({ item }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border border-zinc-700 rounded-lg'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full items-center justify-between p-4 text-left hover:bg-zinc-800/50 transition-colors'
        aria-expanded={isOpen}
        aria-controls={`faq-${item.id}`}>
        <h3 className='font-medium text-white pr-4'>{item.question}</h3>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div id={`faq-${item.id}`} className='px-4 pb-4'>
          <div className='text-gray-300 leading-relaxed'>{item.answer}</div>
        </div>
      )}
    </div>
  );
}

export function SEOFAQSection() {
  const { locale } = useI18n();

  const faqItems: FAQItem[] = [
    {
      id: 'convert-euro-dollar',
      question:
        locale === 'de'
          ? 'Wie rechne ich Euro in Dollar um?'
          : 'How do I convert Euro to Dollar?',
      answer:
        locale === 'de'
          ? 'Geben Sie den Euro-Betrag ein, wählen Sie EUR als Ausgangswährung und USD als Zielwährung. Der aktuelle Wechselkurs wird automatisch angewendet.'
          : 'Enter the Euro amount, select EUR as source currency and USD as target currency. The current exchange rate will be automatically applied.',
    },
    {
      id: 'rates-current',
      question:
        locale === 'de'
          ? 'Sind die Wechselkurse aktuell?'
          : 'Are the exchange rates current?',
      answer:
        locale === 'de'
          ? 'Ja, unsere Wechselkurse werden alle 15 Minuten aktualisiert. Wir verwenden zuverlässige Finanzmarkt-APIs für präzise und aktuelle Kurse.'
          : 'Yes, our exchange rates are updated every 15 minutes using reliable financial market APIs for accurate and current rates.',
    },
    {
      id: 'works-offline',
      question:
        locale === 'de'
          ? 'Funktioniert der Währungsrechner offline?'
          : 'Does the currency calculator work offline?',
      answer:
        locale === 'de'
          ? 'Ja, als Progressive Web App (PWA) funktioniert unser Währungsrechner auch offline mit den zuletzt gespeicherten Wechselkursen.'
          : 'Yes, as a Progressive Web App (PWA), our currency calculator works offline using the last saved exchange rates.',
    },
    {
      id: 'supported-currencies',
      question:
        locale === 'de'
          ? 'Welche Währungen werden unterstützt?'
          : 'Which currencies are supported?',
      answer:
        locale === 'de'
          ? 'Wir unterstützen über 170 internationale Währungen, einschließlich aller Hauptwährungen wie EUR, USD, GBP, JPY, CHF und viele weitere.'
          : 'We support over 170 international currencies including all major currencies like EUR, USD, GBP, JPY, CHF and many more.',
    },
    {
      id: 'free-to-use',
      question:
        locale === 'de'
          ? 'Ist der Währungsrechner kostenlos?'
          : 'Is the currency calculator free?',
      answer:
        locale === 'de'
          ? 'Ja, unser Währungsrechner ist vollständig kostenlos. Es gibt keine versteckten Kosten oder Abonnements. Alle Features sind frei verfügbar.'
          : 'Yes, our currency calculator is completely free. There are no hidden costs or subscriptions. All features are freely available.',
    },
    {
      id: 'install-pwa',
      question:
        locale === 'de'
          ? 'Wie installiere ich die App auf meinem Smartphone?'
          : 'How do I install the app on my phone?',
      answer:
        locale === 'de'
          ? 'Öffnen Sie den Rechner in Ihrem mobilen Browser und tippen Sie auf "Zum Startbildschirm hinzufügen" oder "Installieren". Die App funktioniert dann wie eine native App mit Offline-Funktionalität.'
          : 'Open the calculator in your mobile browser and tap "Add to Home Screen" or "Install". The app will work like a native mobile app with offline functionality.',
    },
    {
      id: 'accuracy',
      question:
        locale === 'de'
          ? 'Wie genau sind die Wechselkurse?'
          : 'How accurate are the exchange rates?',
      answer:
        locale === 'de'
          ? 'Unsere Wechselkurse stammen von professionellen Finanzdienstleistern und werden alle 15 Minuten für maximale Genauigkeit bei der Währungsumrechnung aktualisiert.'
          : 'Our exchange rates are sourced from professional financial data providers and updated every 15 minutes for maximum accuracy in currency conversion.',
    },
    {
      id: 'data-privacy',
      question:
        locale === 'de'
          ? 'Sind meine Daten sicher und privat?'
          : 'Is my data safe and private?',
      answer:
        locale === 'de'
          ? 'Ja, wir priorisieren Datenschutz. Keine persönlichen Informationen werden gespeichert oder übertragen. Alle Berechnungen erfolgen lokal in Ihrem Browser.'
          : 'Yes, we prioritize data privacy. No personal information is stored or transmitted. All calculations happen locally in your browser.',
    },
  ];

  return (
    <section
      className='w-full max-w-4xl mx-auto px-4 py-8'
      aria-labelledby='faq-heading'>
      {/* JSON-LD structured data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <div className='space-y-6'>
        <div className='text-center'>
          <h2 id='faq-heading' className='text-2xl font-bold text-white mb-2'>
            {locale === 'de'
              ? 'Häufig gestellte Fragen'
              : 'Frequently Asked Questions'}
          </h2>
          <p className='text-gray-400 max-w-2xl mx-auto'>
            {locale === 'de'
              ? 'Finden Sie Antworten auf häufige Fragen zu unserem Währungsrechner und Wechselkurs-Service.'
              : 'Find answers to common questions about our currency calculator and exchange rate service.'}
          </p>
        </div>

        <div className='space-y-4'>
          {faqItems.map((item) => (
            <FAQItem key={item.id} item={item} />
          ))}
        </div>

        <div className='text-center pt-6'>
          <p className='text-sm text-gray-500'>
            {locale === 'de'
              ? 'Haben Sie weitere Fragen?'
              : 'Have more questions?'}{' '}
            <a
              href='/impressum'
              className='text-orange-500 hover:text-orange-400 transition-colors'
              rel='nofollow'>
              {locale === 'de' ? 'Kontaktieren Sie uns' : 'Contact us'}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
