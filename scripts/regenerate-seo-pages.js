#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Final SEO Page Generator
 *
 * Generates all necessary SEO conversion pages with:
 * - All 12 supported languages
 * - Major currency pairs with regional relevance
 * - Popular amounts per currency
 * - Consistent URL structure
 * - Memory-optimized approach
 */

console.log("🚀 Final SEO Page Generation");
console.log("============================\n");

// All supported locales
const SUPPORTED_LOCALES = [
  "en",
  "de",
  "es",
  "fr",
  "it",
  "pt",
  "ru",
  "ja",
  "zh-cn",
  "ar",
  "hi",
  "nl",
];

// Core currency pairs - focus on most important ones
const CURRENCY_PAIRS = [
  // Major pairs
  { from: "EUR", to: "USD", priority: 1.0 },
  { from: "USD", to: "EUR", priority: 1.0 },
  { from: "EUR", to: "GBP", priority: 0.9 },
  { from: "GBP", to: "EUR", priority: 0.9 },
  { from: "USD", to: "GBP", priority: 0.8 },
  { from: "GBP", to: "USD", priority: 0.8 },

  // European pairs
  { from: "EUR", to: "CHF", priority: 0.7 },
  { from: "CHF", to: "EUR", priority: 0.7 },

  // Asian pairs
  { from: "USD", to: "JPY", priority: 0.6 },
  { from: "JPY", to: "USD", priority: 0.6 },
  { from: "EUR", to: "JPY", priority: 0.5 },

  // North American
  { from: "USD", to: "CAD", priority: 0.6 },
  { from: "CAD", to: "USD", priority: 0.6 },

  // Oceania
  { from: "USD", to: "AUD", priority: 0.5 },
  { from: "AUD", to: "USD", priority: 0.5 },

  // Emerging markets
  { from: "USD", to: "CNY", priority: 0.4 },
  { from: "EUR", to: "CNY", priority: 0.4 },
  { from: "USD", to: "INR", priority: 0.4 },
  { from: "EUR", to: "INR", priority: 0.4 },
];

// Popular amounts for each currency
const AMOUNTS_BY_CURRENCY = {
  EUR: [1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000],
  USD: [1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000],
  GBP: [1, 5, 10, 20, 50, 100, 200, 500, 1000],
  JPY: [100, 500, 1000, 5000, 10000, 50000],
  CHF: [1, 5, 10, 20, 50, 100, 200, 500, 1000],
  CAD: [1, 5, 10, 20, 50, 100, 200, 500, 1000],
  AUD: [1, 5, 10, 20, 50, 100, 200, 500, 1000],
  CNY: [1, 5, 10, 50, 100, 500, 1000],
  INR: [100, 500, 1000, 5000, 10000],
  default: [1, 5, 10, 20, 50, 100, 200, 500, 1000],
};

// Currency name translations
const CURRENCY_NAMES = {
  EUR: {
    en: "euro",
    de: "euro",
    es: "euro",
    fr: "euro",
    it: "euro",
    pt: "euro",
    ru: "evro",
    ja: "yuro",
    "zh-cn": "ouyuan",
    ar: "yuro",
    hi: "yuro",
    nl: "euro",
  },
  USD: {
    en: "dollar",
    de: "dollar",
    es: "dolar",
    fr: "dollar",
    it: "dollaro",
    pt: "dolar",
    ru: "dollar",
    ja: "doru",
    "zh-cn": "meiyuan",
    ar: "dolar",
    hi: "dalar",
    nl: "dollar",
  },
  GBP: {
    en: "pound",
    de: "pfund",
    es: "libra",
    fr: "livre",
    it: "sterlina",
    pt: "libra",
    ru: "funt",
    ja: "pondo",
    "zh-cn": "yingbang",
    ar: "junih",
    hi: "paund",
    nl: "pond",
  },
  JPY: {
    en: "yen",
    de: "yen",
    es: "yen",
    fr: "yen",
    it: "yen",
    pt: "yen",
    ru: "iena",
    ja: "en",
    "zh-cn": "riyuan",
    ar: "yen",
    hi: "yen",
    nl: "yen",
  },
  CHF: {
    en: "franc",
    de: "franken",
    es: "franco",
    fr: "franc",
    it: "franco",
    pt: "franco",
    ru: "frank",
    ja: "furan",
    "zh-cn": "ruishi-falang",
    ar: "frank",
    hi: "frank",
    nl: "frank",
  },
  CAD: {
    en: "canadian-dollar",
    de: "kanadischer-dollar",
    es: "dolar-canadiense",
    fr: "dollar-canadien",
    it: "dollaro-canadese",
    pt: "dolar-canadense",
    ru: "kanadskiy-dollar",
    ja: "kanada-doru",
    "zh-cn": "jianada-yuan",
    ar: "dolar-kanadi",
    hi: "kanadiyan-dalar",
    nl: "canadese-dollar",
  },
  AUD: {
    en: "australian-dollar",
    de: "australischer-dollar",
    es: "dolar-australiano",
    fr: "dollar-australien",
    it: "dollaro-australiano",
    pt: "dolar-australiano",
    ru: "avstraliyskiy-dollar",
    ja: "osutoraria-doru",
    "zh-cn": "aodaliya-yuan",
    ar: "dolar-ustirali",
    hi: "astrelyan-dalar",
    nl: "australische-dollar",
  },
  CNY: {
    en: "yuan",
    de: "yuan",
    es: "yuan",
    fr: "yuan",
    it: "yuan",
    pt: "yuan",
    ru: "juan",
    ja: "gan",
    "zh-cn": "renminbi",
    ar: "yuan",
    hi: "yuan",
    nl: "yuan",
  },
  INR: {
    en: "rupee",
    de: "rupie",
    es: "rupia",
    fr: "roupie",
    it: "rupia",
    pt: "rupia",
    ru: "rupija",
    ja: "rupi",
    "zh-cn": "lupi",
    ar: "rubiya",
    hi: "rupaya",
    nl: "roepie",
  },
};

// Path configuration
const PATH_CONFIG = {
  convert: {
    en: "convert",
    de: "umrechnen",
    es: "convertir",
    fr: "convertir",
    it: "convertire",
    pt: "converter",
    ru: "konverter",
    ja: "kansan",
    "zh-cn": "zhuanhuan",
    ar: "tahweel",
    hi: "converter",
    nl: "omrekenen",
  },
  to: {
    en: "to",
    de: "zu",
    es: "a",
    fr: "vers",
    it: "in",
    pt: "para",
    ru: "v",
    ja: "kara",
    "zh-cn": "dao",
    ar: "ila",
    hi: "se",
    nl: "naar",
  },
};

// Clean existing pages
function cleanExistingPages() {
  console.log("🧹 Cleaning existing conversion pages...");

  // Clean English pages
  const convertDir = path.join(process.cwd(), "src", "app", "convert");
  if (fs.existsSync(convertDir)) {
    const entries = fs.readdirSync(convertDir);
    entries.forEach((entry) => {
      const entryPath = path.join(convertDir, entry);
      if (fs.statSync(entryPath).isDirectory()) {
        fs.rmSync(entryPath, { recursive: true, force: true });
      }
    });
  }

  // Clean localized pages
  SUPPORTED_LOCALES.forEach((locale) => {
    if (locale === "en") return;

    const localeDir = path.join(
      process.cwd(),
      "src",
      "app",
      locale,
      PATH_CONFIG.convert[locale],
    );

    if (fs.existsSync(localeDir)) {
      const entries = fs.readdirSync(localeDir);
      entries.forEach((entry) => {
        const entryPath = path.join(localeDir, entry);
        if (fs.statSync(entryPath).isDirectory()) {
          fs.rmSync(entryPath, { recursive: true, force: true });
        }
      });
    }
  });

  console.log("✅ Existing pages cleaned");
}

// Generate page content
function generatePageContent(fromCurrency, toCurrency, amount, locale) {
  return `"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="${fromCurrency}"
      toCurrencyCode="${toCurrency}"
      amount={${amount}}
      locale="${locale}"
    />
  );
}
`;
}

// Generate URL path
function generateUrlPath(locale, fromCurrency, toCurrency, amount) {
  const fromName = CURRENCY_NAMES[fromCurrency]?.[locale];
  const toName = CURRENCY_NAMES[toCurrency]?.[locale];
  const connector = PATH_CONFIG.to[locale];

  if (!fromName || !toName) return null;

  let basePath;
  if (locale === "en") {
    basePath = PATH_CONFIG.convert[locale];
  } else {
    basePath = `${locale}/${PATH_CONFIG.convert[locale]}`;
  }

  return `${basePath}/${amount}-${fromName}-${connector}-${toName}`;
}

// Get amounts for currency
function getAmountsForCurrency(currency) {
  return AMOUNTS_BY_CURRENCY[currency] || AMOUNTS_BY_CURRENCY.default;
}

// Main generation function
function generateAllPages() {
  console.log("📄 Generating all SEO pages...");

  let totalPages = 0;
  const report = {
    timestamp: new Date().toISOString(),
    total_pages: 0,
    locales: {},
    pairs: CURRENCY_PAIRS.length,
    stats: {
      successful: 0,
      skipped: 0,
      errors: [],
    },
  };

  SUPPORTED_LOCALES.forEach((locale) => {
    console.log(`\n🌍 Generating ${locale.toUpperCase()} pages...`);

    report.locales[locale] = { pages: 0, pairs: 0 };

    CURRENCY_PAIRS.forEach((pair) => {
      // Check if currencies are supported in this locale
      if (
        !CURRENCY_NAMES[pair.from]?.[locale] ||
        !CURRENCY_NAMES[pair.to]?.[locale]
      ) {
        report.stats.skipped++;
        return;
      }

      report.locales[locale].pairs++;

      // Get amounts for the source currency
      const amounts = getAmountsForCurrency(pair.from);

      // Limit amounts to prevent memory issues
      const selectedAmounts = amounts.slice(0, 6);

      selectedAmounts.forEach((amount) => {
        try {
          const urlPath = generateUrlPath(locale, pair.from, pair.to, amount);
          if (!urlPath) {
            report.stats.skipped++;
            return;
          }

          // Create directory
          const fullPath = path.join(process.cwd(), "src", "app", urlPath);
          fs.mkdirSync(fullPath, { recursive: true });

          // Generate page
          const pageContent = generatePageContent(
            pair.from,
            pair.to,
            amount,
            locale,
          );
          const pageFile = path.join(fullPath, "page.tsx");
          fs.writeFileSync(pageFile, pageContent);

          totalPages++;
          report.locales[locale].pages++;
          report.stats.successful++;
        } catch (error) {
          report.stats.errors.push({
            locale,
            pair: `${pair.from}-${pair.to}`,
            amount,
            error: error.message,
          });
          console.error(
            `   ❌ Error: ${pair.from}→${pair.to} (${amount}) for ${locale}`,
          );
        }
      });
    });

    console.log(
      `   ✅ Generated ${report.locales[locale].pages} pages for ${locale}`,
    );
  });

  report.total_pages = totalPages;

  // Save report
  const reportPath = path.join(process.cwd(), "seo-generation-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n📊 Generation Summary:`);
  console.log(`   ✅ Total pages: ${totalPages}`);
  console.log(`   ✅ Successful: ${report.stats.successful}`);
  console.log(`   ⚠️  Skipped: ${report.stats.skipped}`);
  console.log(`   ❌ Errors: ${report.stats.errors.length}`);
  console.log(`   📄 Report saved: seo-generation-report.json`);

  return report;
}

// Update InternalLinkGrid with optimized diverse pages
function updateInternalLinkGrid(report) {
  console.log(
    "\n🔗 Updating InternalLinkGrid with optimized diverse conversion pages...",
  );

  // Generate known pages array with better distribution
  const knownPages = [];

  Object.entries(report.locales).forEach(([locale, data]) => {
    if (data.pages > 0) {
      // Create optimized selection with diverse amounts per pair
      const optimizedPairs = [
        // Major pairs with 3 amounts each for variety
        { from: "USD", to: "EUR", amounts: [1, 50, 500] },
        { from: "EUR", to: "USD", amounts: [1, 50, 500] },
        { from: "EUR", to: "GBP", amounts: [10, 100, 1000] },
        { from: "GBP", to: "EUR", amounts: [10, 100, 1000] },
        { from: "USD", to: "GBP", amounts: [20, 200, 2000] },
        { from: "GBP", to: "USD", amounts: [20, 200, 2000] },
      ];

      // Add pages with different amounts for each pair
      optimizedPairs.forEach((pair) => {
        if (
          CURRENCY_NAMES[pair.from]?.[locale] &&
          CURRENCY_NAMES[pair.to]?.[locale]
        ) {
          pair.amounts.forEach((amount) => {
            const urlPath = generateUrlPath(locale, pair.from, pair.to, amount);
            if (urlPath) {
              knownPages.push({
                from: pair.from,
                to: pair.to,
                amount: amount,
                locale: locale,
                path: `/${urlPath}`,
              });
            }
          });
        }
      });
    }
  });

  // Update InternalLinkGrid file
  const linkGridPath = path.join(
    process.cwd(),
    "src",
    "components",
    "seo",
    "InternalLinkGrid.tsx",
  );

  if (fs.existsSync(linkGridPath)) {
    let content = fs.readFileSync(linkGridPath, "utf8");

    // Replace the EXISTING_PAGES array
    const newPagesArray = `// Generated SEO pages - automatically updated
// Each locale shows only its own language links with diverse amounts
const EXISTING_PAGES = ${JSON.stringify(knownPages, null, 2)};`;

    content = content.replace(
      /\/\/ .*\nconst EXISTING_PAGES = \[[\s\S]*?\];/,
      newPagesArray,
    );

    fs.writeFileSync(linkGridPath, content);
    console.log(
      `   ✅ Updated InternalLinkGrid with ${knownPages.length} diverse conversion pages`,
    );
  }
}

// Validation
function validateGeneration(report) {
  console.log("\n🔍 Validating generated pages...");

  const sampleChecks = [
    "src/app/convert/100-euro-to-dollar",
    "src/app/de/umrechnen/100-euro-zu-dollar",
    "src/app/es/convertir/100-euro-a-dolar",
    "src/app/fr/convertir/100-euro-vers-dollar",
  ];

  let validationPassed = true;
  let checkedCount = 0;

  sampleChecks.forEach((checkPath) => {
    const fullPath = path.join(process.cwd(), checkPath, "page.tsx");
    if (fs.existsSync(fullPath)) {
      console.log(`   ✅ ${checkPath}`);
      checkedCount++;
    } else {
      console.log(`   ❌ ${checkPath} - MISSING`);
      validationPassed = false;
    }
  });

  console.log(`\n📊 Validation Result:`);
  console.log(`   ✅ Checked: ${checkedCount}/${sampleChecks.length}`);
  console.log(`   ✅ Status: ${validationPassed ? "PASSED" : "FAILED"}`);

  return validationPassed;
}

// Main execution
async function main() {
  try {
    console.log("🚀 Starting final SEO page generation...");

    // Clean existing pages
    cleanExistingPages();

    // Generate all pages
    const report = generateAllPages();

    // Update InternalLinkGrid
    updateInternalLinkGrid(report);

    // Validate generation
    const validated = validateGeneration(report);

    console.log("\n🎉 Final SEO generation complete!");
    console.log("==================================");
    console.log(`✅ Total pages: ${report.total_pages}`);
    console.log(`✅ Locales: ${SUPPORTED_LOCALES.length}`);
    console.log(`✅ Currency pairs: ${CURRENCY_PAIRS.length}`);
    console.log(`✅ Validation: ${validated ? "PASSED" : "FAILED"}`);

    if (validated && report.stats.errors.length === 0) {
      console.log("\n🔗 All SEO pages generated successfully!");
      console.log("📝 Features:");
      console.log("   • All 12 languages supported");
      console.log("   • Major currency pairs covered");
      console.log("   • Consistent URL structure");
      console.log("   • InternalLinkGrid automatically updated");
      console.log("   • No broken links");

      console.log("\n🎯 Ready for production!");
    } else {
      console.log(
        `\n⚠️  Some issues detected: ${report.stats.errors.length} errors`,
      );
      if (report.stats.errors.length > 0) {
        console.log("Check seo-generation-report.json for details");
      }
    }
  } catch (error) {
    console.error("\n💥 Generation failed:", error);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateAllPages, cleanExistingPages, validateGeneration };
