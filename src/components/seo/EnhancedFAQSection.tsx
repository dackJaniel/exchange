"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/provider";
import { faqContent } from "@/lib/seo/meta-descriptions";

interface FAQItem {
  question: string;
  answer: string;
}

interface EnhancedFAQSectionProps {
  customFAQs?: FAQItem[];
  currencyPair?: {
    from: string;
    to: string;
    rate?: number;
    amount?: number;
  };
}

export function EnhancedFAQSection({
  customFAQs,
  currencyPair,
}: EnhancedFAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { locale } = useI18n();

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  // Get general FAQs based on locale
  const generalFAQs =
    faqContent.general[locale as keyof typeof faqContent.general] ||
    faqContent.general.en;

  // Generate currency-specific FAQs if currencyPair is provided
  const currencySpecificFAQs: FAQItem[] = currencyPair
    ? [
        {
          question:
            locale === "de"
              ? `Wie rechne ich ${currencyPair.from} in ${currencyPair.to} um?`
              : `How do I convert ${currencyPair.from} to ${currencyPair.to}?`,
          answer:
            locale === "de"
              ? `Geben Sie den ${currencyPair.from}-Betrag ein, wählen Sie ${currencyPair.from} als Ausgangswährung und ${currencyPair.to} als Zielwährung. Der aktuelle Wechselkurs wird automatisch angewendet${currencyPair.rate ? ` (aktuell: 1 ${currencyPair.from} = ${currencyPair.rate.toFixed(4)} ${currencyPair.to})` : ""}.`
              : `Enter the ${currencyPair.from} amount, select ${currencyPair.from} as source currency and ${currencyPair.to} as target currency. The current exchange rate will be automatically applied${currencyPair.rate ? ` (currently: 1 ${currencyPair.from} = ${currencyPair.rate.toFixed(4)} ${currencyPair.to})` : ""}.`,
        },
        {
          question:
            locale === "de"
              ? `Ist der ${currencyPair.from}/${currencyPair.to} Wechselkurs aktuell?`
              : `Is the ${currencyPair.from}/${currencyPair.to} exchange rate current?`,
          answer:
            locale === "de"
              ? `Ja, unser ${currencyPair.from}/${currencyPair.to} Wechselkurs wird alle 15 Minuten aktualisiert. Wir verwenden zuverlässige Finanzmarkt-APIs für präzise und aktuelle Kurse.`
              : `Yes, our ${currencyPair.from}/${currencyPair.to} exchange rate is updated every 15 minutes. We use reliable financial market APIs for accurate and current rates.`,
        },
        ...(currencyPair.amount
          ? [
              {
                question:
                  locale === "de"
                    ? `Wie viel sind ${currencyPair.amount} ${currencyPair.from} in ${currencyPair.to} wert?`
                    : `How much is ${currencyPair.amount} ${currencyPair.from} worth in ${currencyPair.to}?`,
                answer:
                  locale === "de"
                    ? `Bei dem aktuellen Wechselkurs${currencyPair.rate ? ` von ${currencyPair.rate.toFixed(4)}` : ""} entsprechen ${currencyPair.amount} ${currencyPair.from}${currencyPair.rate ? ` etwa ${(currencyPair.amount * currencyPair.rate).toFixed(2)} ${currencyPair.to}` : " dem aktuell berechneten Betrag in unserem Rechner"}.`
                    : `At the current exchange rate${currencyPair.rate ? ` of ${currencyPair.rate.toFixed(4)}` : ""}, ${currencyPair.amount} ${currencyPair.from} equals${currencyPair.rate ? ` approximately ${(currencyPair.amount * currencyPair.rate).toFixed(2)} ${currencyPair.to}` : " the amount calculated in our converter"}.`,
              },
            ]
          : []),
      ]
    : [];

  // Combine all FAQs
  const allFAQs = [
    ...currencySpecificFAQs,
    ...(customFAQs || []),
    ...generalFAQs,
  ].slice(0, 8); // Limit to 8 FAQs for better UX

  // Generate structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <div className="bg-zinc-900 rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {locale === "de"
              ? "Häufig gestellte Fragen"
              : "Frequently Asked Questions"}
          </h2>
          <p className="text-gray-400 text-sm">
            {locale === "de"
              ? "Antworten auf die wichtigsten Fragen zu unserem Währungsrechner"
              : "Get answers to common questions about our currency calculator"}
          </p>
        </div>

        <div className="space-y-3">
          {allFAQs.map((faq, index) => {
            const isOpen = openItems.includes(index);

            return (
              <div
                key={index}
                className="border border-zinc-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-4 py-3 text-left bg-zinc-800 hover:bg-zinc-750 transition-colors flex items-center justify-between"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-orange-500 pr-4">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-4 py-3 bg-zinc-900 border-t border-zinc-700"
                  >
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-6 p-4 bg-zinc-800 rounded-lg text-center">
          <p className="text-gray-300 mb-3">
            {locale === "de"
              ? "Haben Sie weitere Fragen? Probieren Sie unseren Währungsrechner aus!"
              : "Have more questions? Try our currency calculator now!"}
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded font-semibold text-black transition-colors"
          >
            {locale === "de" ? "Zum Rechner" : "Go to Calculator"}
          </Link>
        </div>
      </div>
    </>
  );
}

// Enhanced FAQ component for homepage
export function HomepageFAQSection() {
  const { locale } = useI18n();

  const homepageFAQs: FAQItem[] =
    locale === "de"
      ? [
          {
            question: "Was ist ein Währungsrechner?",
            answer:
              "Ein Währungsrechner ist ein digitales Tool, das verschiedene Währungen basierend auf aktuellen Wechselkursen umrechnet. Unser Rechner unterstützt über 170 Währungen und funktioniert auch offline als Progressive Web App.",
          },
          {
            question: "Warum sollte ich diesen Währungsrechner verwenden?",
            answer:
              "Unser Währungsrechner bietet Live-Wechselkurse, funktioniert offline, ist völlig kostenlos und wurde speziell für mobile Geräte optimiert. Ideal für Reisen, Geschäfte und internationale Transaktionen.",
          },
          {
            question: "Funktioniert der Rechner auf dem Smartphone?",
            answer:
              "Ja! Unser Währungsrechner ist als Progressive Web App (PWA) entwickelt und funktioniert perfekt auf allen Smartphones. Sie können ihn sogar wie eine native App installieren.",
          },
          {
            question: "Welche Hauptwährungen werden unterstützt?",
            answer:
              "Alle wichtigen Währungen sind verfügbar: Euro (EUR), US-Dollar (USD), Britisches Pfund (GBP), Japanischer Yen (JPY), Schweizer Franken (CHF), Kanadischer Dollar (CAD) und über 160 weitere Währungen.",
          },
        ]
      : [
          {
            question: "What is a currency calculator?",
            answer:
              "A currency calculator is a digital tool that converts different currencies based on current exchange rates. Our calculator supports over 170 currencies and works offline as a Progressive Web App.",
          },
          {
            question: "Why should I use this currency calculator?",
            answer:
              "Our currency calculator offers live exchange rates, works offline, is completely free, and is optimized for mobile devices. Perfect for travel, business, and international transactions.",
          },
          {
            question: "Does the calculator work on smartphones?",
            answer:
              "Yes! Our currency calculator is built as a Progressive Web App (PWA) and works perfectly on all smartphones. You can even install it like a native app.",
          },
          {
            question: "Which major currencies are supported?",
            answer:
              "All major currencies are available: Euro (EUR), US Dollar (USD), British Pound (GBP), Japanese Yen (JPY), Swiss Franc (CHF), Canadian Dollar (CAD), and over 160 additional currencies.",
          },
        ];

  return <EnhancedFAQSection customFAQs={homepageFAQs} />;
}
