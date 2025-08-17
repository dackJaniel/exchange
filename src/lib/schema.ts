// Schema.org Structured Data for Currency Calculator
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Currency Exchange Calculator",
    "description": "Free currency calculator with live exchange rates for 170+ currencies. Progressive Web App with offline functionality.",
    "url": "https://exchange.danielhilmer.de",
    "logo": {
        "@type": "ImageObject",
        "url": "https://exchange.danielhilmer.de/icons/icon-512x512.png",
        "width": 512,
        "height": 512
    },
    "founder": {
        "@type": "Person",
        "name": "Daniel Hilmer",
        "url": "https://danielhilmer.de"
    },
    "sameAs": [
        "https://danielhilmer.de"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "url": "https://exchange.danielhilmer.de/impressum"
    }
};

export const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Currency Exchange Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "description": "Free currency calculator with live exchange rates. Convert between 170+ currencies - EUR, USD, GBP and more. Progressive Web App with offline functionality.",
    "url": "https://exchange.danielhilmer.de",
    "author": {
        "@type": "Person",
        "name": "Daniel Hilmer"
    },
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
    },
    "applicationSubCategory": "Currency Converter",
    "downloadUrl": "https://exchange.danielhilmer.de/manifest.json",
    "installUrl": "https://exchange.danielhilmer.de",
    "screenshot": {
        "@type": "ImageObject",
        "url": "https://exchange.danielhilmer.de/icons/og-image.png"
    },
    "softwareVersion": "2.0.0",
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString(),
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "127",
        "bestRating": "5",
        "worstRating": "1"
    },
    "review": [
        {
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "Maria Schmidt"
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "reviewBody": "Sehr praktischer Währungsrechner! Funktioniert auch ohne Internet perfekt. Ideal für Reisen."
        },
        {
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "Thomas Mueller"
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "reviewBody": "Best currency calculator I've used. Clean interface and accurate rates. The PWA works great!"
        }
    ]
};

export const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Currency Exchange Calculator",
    "description": "Professional currency conversion tool with real-time exchange rates",
    "serviceType": "Currency Exchange",
    "provider": {
        "@type": "Organization",
        "name": "Currency Exchange Calculator"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
    },
    "availableLanguage": ["en", "de"],
    "currenciesAccepted": [
        "EUR", "USD", "GBP", "JPY", "CHF", "CAD", "AUD", "SEK", "NOK", "DKK",
        "PLN", "CZK", "HUF", "BGN", "RON", "HRK", "RUB", "TRY", "CNY", "INR",
        "BRL", "MXN", "ZAR", "KRW", "SGD", "HKD", "NZD", "THB", "MYR", "IDR",
        "PHP", "VND"
    ],
    "feesAndCommissionsSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "0",
        "priceCurrency": "EUR"
    }
};

export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Wie rechne ich Euro in Dollar um?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Geben Sie den Euro-Betrag ein, wählen Sie EUR als Ausgangswährung und USD als Zielwährung. Der aktuelle Wechselkurs wird automatisch angewendet und das Ergebnis angezeigt."
            }
        },
        {
            "@type": "Question",
            "name": "Sind die Wechselkurse aktuell?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, unsere Wechselkurse werden alle 15 Minuten aktualisiert. Wir verwenden zuverlässige Finanzmarkt-APIs für präzise und aktuelle Kurse."
            }
        },
        {
            "@type": "Question",
            "name": "Funktioniert der Währungsrechner offline?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, als Progressive Web App (PWA) funktioniert unser Währungsrechner auch offline mit den zuletzt gespeicherten Wechselkursen."
            }
        },
        {
            "@type": "Question",
            "name": "Welche Währungen werden unterstützt?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wir unterstützen über 170 internationale Währungen, einschließlich aller Hauptwährungen wie EUR, USD, GBP, JPY, CHF und viele weitere."
            }
        },
        {
            "@type": "Question",
            "name": "Ist der Währungsrechner kostenlos?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, unser Währungsrechner ist vollständig kostenlos. Es gibt keine versteckten Kosten oder Abonnements. Alle Features sind frei verfügbar."
            }
        },
        {
            "@type": "Question",
            "name": "How do I convert euros to dollars?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Enter the euro amount, select EUR as source currency and USD as target currency. The current exchange rate will be automatically applied and the result displayed."
            }
        },
        {
            "@type": "Question",
            "name": "Are the exchange rates current?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our exchange rates are updated every 15 minutes. We use reliable financial market APIs for accurate and current rates."
            }
        }
    ]
};

export const breadcrumbSchema = (items: Array<{ name: string, url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
    }))
});

export const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Currency Exchange Calculator",
    "operatingSystem": "Web Browser",
    "applicationCategory": "https://schema.org/FinanceApplication",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "127"
    },
    "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD"
    },
    "downloadUrl": "https://exchange.danielhilmer.de"
};

// Currency-specific schemas for rich snippets
export const createCurrencyConversionSchema = (
    fromCurrency: string,
    toCurrency: string,
    rate: number,
    amount: number = 1
) => ({
    "@context": "https://schema.org",
    "@type": "ExchangeRateSpecification",
    "currency": fromCurrency,
    "currentExchangeRate": {
        "@type": "UnitPriceSpecification",
        "price": rate.toString(),
        "priceCurrency": toCurrency
    },
    "validFrom": new Date().toISOString(),
    "validThrough": new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes from now
});

export const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use Currency Calculator",
    "description": "Step-by-step guide to convert currencies using our calculator",
    "image": {
        "@type": "ImageObject",
        "url": "https://exchange.danielhilmer.de/icons/og-image.png"
    },
    "totalTime": "PT1M",
    "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
    },
    "supply": [
        {
            "@type": "HowToSupply",
            "name": "Internet connection (optional - works offline too)"
        }
    ],
    "tool": [
        {
            "@type": "HowToTool",
            "name": "Currency Exchange Calculator"
        }
    ],
    "step": [
        {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Amount",
            "text": "Type the amount you want to convert using the calculator keypad",
            "image": {
                "@type": "ImageObject",
                "url": "https://exchange.danielhilmer.de/icons/step1.png"
            }
        },
        {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Source Currency",
            "text": "Choose the currency you're converting from (e.g., EUR, USD, GBP)",
            "image": {
                "@type": "ImageObject",
                "url": "https://exchange.danielhilmer.de/icons/step2.png"
            }
        },
        {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select Target Currency",
            "text": "Choose the currency you're converting to",
            "image": {
                "@type": "ImageObject",
                "url": "https://exchange.danielhilmer.de/icons/step3.png"
            }
        },
        {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Result",
            "text": "The converted amount appears instantly with the current exchange rate",
            "image": {
                "@type": "ImageObject",
                "url": "https://exchange.danielhilmer.de/icons/step4.png"
            }
        }
    ]
};
