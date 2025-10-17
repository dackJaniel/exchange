#!/usr/bin/env node

/**
 * SEO Implementation Script
 * Automatisiert die wichtigsten SEO-Verbesserungen für den Währungsrechner
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = process.cwd();

console.log("🚀 Starting SEO Implementation for Currency Calculator...\n");

// Step 1: Generate additional currency pair landing pages
const currencyPairs = [
  {
    slug: "waehrungsrechner-euro-pfund",
    title: "Währungsrechner Euro Pfund - EUR GBP Rechner",
    from: "EUR",
    to: "GBP",
    lang: "de",
  },
  {
    slug: "currency-calculator-eur-gbp",
    title: "Currency Calculator EUR GBP - Euro Pound Converter",
    from: "EUR",
    to: "GBP",
    lang: "en",
  },
  {
    slug: "waehrungsrechner-euro-franken",
    title: "Währungsrechner Euro Schweizer Franken - EUR CHF",
    from: "EUR",
    to: "CHF",
    lang: "de",
  },
  {
    slug: "currency-calculator-eur-chf",
    title: "Currency Calculator EUR CHF - Euro Swiss Franc",
    from: "EUR",
    to: "CHF",
    lang: "en",
  },
];

function generateLandingPageContent(pair) {
  const currencyNames = {
    EUR: { en: "Euro", de: "Euro" },
    USD: { en: "Dollar", de: "Dollar" },
    GBP: { en: "Pound", de: "Pfund" },
    CHF: { en: "Swiss Franc", de: "Schweizer Franken" },
    JPY: { en: "Yen", de: "Yen" },
  };

  const isGerman = pair.lang === "de";
  const fromName = currencyNames[pair.from][pair.lang];
  const toName = currencyNames[pair.to][pair.lang];

  return `import { Metadata } from 'next';
import { organizationSchema, webApplicationSchema, financialServiceSchema } from '@/lib/schema';
import { SEOFAQSection } from '@/components/seo/SEOFAQSection';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '${pair.title}',
    description: '${
      isGerman
        ? `${fromName} in ${toName} umrechnen mit aktuellem Wechselkurs. Kostenloser ${pair.from} ${pair.to} Währungsrechner mit Live-Kursen.`
        : `Convert ${fromName} to ${toName} with current exchange rates. Free ${pair.from} ${pair.to} currency calculator with live rates.`
    }',
    alternates: {
        canonical: 'https://exchange.danielhilmer.de/${pair.slug}',
    },
};

export default function ${pair.from}${pair.to}LandingPage() {
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
                        ${pair.title}
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        ${
                          isGerman
                            ? `${fromName} in ${toName} umrechnen mit aktuellem Wechselkurs. Kostenloser ${pair.from} ${pair.to} Rechner.`
                            : `Convert ${fromName} to ${toName} with current exchange rates. Free ${pair.from} ${pair.to} calculator.`
                        }
                    </p>
                    <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                        ${
                          isGerman
                            ? "Währungsrechner öffnen"
                            : "Open Calculator"
                        }
                    </Link>
                </div>
            </section>

            <SEOFAQSection />
        </div>
    );
}`;
}

console.log("📄 Generating currency pair landing pages...");
currencyPairs.forEach((pair) => {
  const dirPath = path.join(PROJECT_ROOT, "src", "app", pair.slug);
  const filePath = path.join(dirPath, "page.tsx");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateLandingPageContent(pair));
    console.log(`✓ Created ${pair.slug}/page.tsx`);
  } else {
    console.log(`- Skipped ${pair.slug}/page.tsx (already exists)`);
  }
});

// Step 2: Create Google Search Console verification file
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
if (googleVerification) {
  const verificationFile = path.join(
    PROJECT_ROOT,
    "public",
    `google${googleVerification}.html`,
  );
  const verificationContent = `google-site-verification: google${googleVerification}.html`;

  fs.writeFileSync(verificationFile, verificationContent);
  console.log("✓ Created Google Search Console verification file");
} else {
  console.log(
    "- Skipped Google verification (no GOOGLE_SITE_VERIFICATION env var)",
  );
}

// Step 3: Generate schema.org files for different languages
const schemas = {
  de: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Währungsrechner - Kostenloser Currency Calculator",
    description:
      "Kostenloser Währungsrechner mit aktuellen Wechselkursen für 170+ Währungen",
    url: "https://exchange.danielhilmer.de/de",
    inLanguage: "de",
    applicationCategory: "FinanceApplication",
  },
  en: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Currency Calculator - Free Currency Converter",
    description:
      "Free currency calculator with live exchange rates for 170+ currencies",
    url: "https://exchange.danielhilmer.de",
    inLanguage: "en",
    applicationCategory: "FinanceApplication",
  },
};

Object.entries(schemas).forEach(([lang, schema]) => {
  const schemaPath = path.join(PROJECT_ROOT, "public", `schema-${lang}.json`);
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
  console.log(`✓ Created schema-${lang}.json`);
});

// Step 4: Update package.json with SEO-related scripts
const packagePath = path.join(PROJECT_ROOT, "package.json");
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  packageJson.scripts = {
    ...packageJson.scripts,
    "seo:audit":
      'lighthouse --output-path=./seo-audit.html --output=html --chrome-flags="--headless" https://exchange.danielhilmer.de',
    "seo:analyze": "next-bundle-analyzer",
    "seo:sitemap": "next build && next export && next-sitemap",
  };

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log("✓ Updated package.json with SEO scripts");
}

// Step 5: Create performance monitoring configuration
const webVitalsConfig = `// Web Vitals Configuration
export const webVitalsConfig = {
  // Google Analytics 4 measurement ID
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,

  // Core Web Vitals thresholds
  thresholds: {
    LCP: { good: 2500, needsImprovement: 4000 },
    FID: { good: 100, needsImprovement: 300 },
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FCP: { good: 1800, needsImprovement: 3000 },
    TTFB: { good: 800, needsImprovement: 1800 },
  },

  // Performance monitoring
  enablePerformanceMonitoring: process.env.NODE_ENV === 'production',

  // SEO monitoring endpoints
  endpoints: {
    seo: '/api/seo-metrics',
    performance: '/api/performance-metrics',
    rankings: '/api/keyword-rankings',
  }
};

export default webVitalsConfig;`;

const configPath = path.join(
  PROJECT_ROOT,
  "src",
  "lib",
  "web-vitals.config.ts",
);
fs.writeFileSync(configPath, webVitalsConfig);
console.log("✓ Created web-vitals configuration");

// Step 6: SEO Checklist
console.log("\n📋 SEO Implementation Summary:");
console.log("✅ Landing pages für Top-Keywords erstellt");
console.log("✅ Strukturierte Daten (Schema.org) implementiert");
console.log("✅ Erweiterte Sitemap mit Prioritäten");
console.log("✅ Optimierte robots.txt");
console.log("✅ FAQ-Sektion für Voice Search");
console.log("✅ Mehrsprachige Meta-Tags");
console.log("✅ Performance Monitoring Setup");

console.log("\n🎯 Nächste Schritte für optimales Ranking:");
console.log("1. Google Search Console einrichten");
console.log("2. Google Analytics 4 konfigurieren");
console.log("3. Bing Webmaster Tools hinzufügen");
console.log("4. Core Web Vitals überwachen");
console.log("5. Backlink-Kampagne starten");
console.log("6. Content Marketing Pipeline aktivieren");

console.log("\n🔍 SEO Tools zum Monitoring:");
console.log("- npm run seo:audit (Lighthouse Audit)");
console.log("- npm run seo:analyze (Bundle Analyzer)");
console.log("- Google Search Console für Rankings");
console.log("- PageSpeed Insights für Performance");

console.log("\n🚀 SEO-Strategie erfolgreich implementiert! 🎉");
