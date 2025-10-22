// Enhanced Multilingual Sitemap Builder
// Includes all 1008 generated conversion pages across 12 languages

import { MetadataRoute } from "next";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { generateCurrencyUrl } from "@/lib/utils";

export class MultilingualSitemapBuilder {
  private baseUrl: string;
  private currentDate: Date;
  private supportedLocales = [
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

  constructor(baseUrl: string = "https://exchange.danielhilmer.de") {
    this.baseUrl = baseUrl;
    this.currentDate = new Date();
  }

  // Build complete multilingual sitemap
  public buildSitemap(): MetadataRoute.Sitemap {
    const sitemap: MetadataRoute.Sitemap = [
      ...this.getMainPages(),
      ...this.getGeneratedConversionPages(),
      ...this.getExistingConversionPages(),
      ...this.getCurrencyPairPages(),
      ...this.getGuidePages(),
      ...this.getLegalPages(),
      ...this.getUtilityPages(),
    ];

    return sitemap.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  // Main pages for all languages
  private getMainPages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];

    // Homepage with all language alternatives
    const alternates: { [key: string]: string } = {};
    this.supportedLocales.forEach((locale) => {
      alternates[locale] =
        locale === "en" ? this.baseUrl : `${this.baseUrl}/${locale}`;
    });

    // Add main homepage
    pages.push({
      url: this.baseUrl,
      lastModified: this.currentDate,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: alternates,
      },
    });

    // Add localized homepages
    this.supportedLocales
      .filter((locale) => locale !== "en")
      .forEach((locale) => {
        pages.push({
          url: `${this.baseUrl}/${locale}`,
          lastModified: this.currentDate,
          changeFrequency: "daily",
          priority: 0.9,
          alternates: {
            languages: alternates,
          },
        });
      });

    return pages;
  }

  // Load generated conversion pages from the report file
  private getGeneratedConversionPages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];

    try {
      const reportPath = join(process.cwd(), "conversion-pages-report.json");
      const sitemapDataPath = join(
        process.cwd(),
        "generated-sitemap-data.json",
      );

      let generatedPages: any[] = [];

      // Try to load from sitemap data first
      if (existsSync(sitemapDataPath)) {
        const sitemapData = JSON.parse(readFileSync(sitemapDataPath, "utf8"));
        generatedPages = sitemapData;
      }
      // Fallback to report file
      else if (existsSync(reportPath)) {
        const report = JSON.parse(readFileSync(reportPath, "utf8"));
        generatedPages = report.pages || [];
      }

      generatedPages.forEach((page: any) => {
        const fullUrl = `${this.baseUrl}${page.url || page.path}`;

        pages.push({
          url: fullUrl,
          lastModified: this.currentDate,
          changeFrequency: page.changefreq || "daily",
          priority: page.priority || this.getConversionPagePriority(page),
        });
      });

      console.log(
        `✅ Loaded ${generatedPages.length} generated conversion pages`,
      );
    } catch (error) {
      console.warn("⚠️ Could not load generated conversion pages:", error);

      // Fallback: Generate some high-priority pages manually
      pages.push(...this.getFallbackConversionPages());
    }

    return pages;
  }

  // Get existing conversion pages from the convert directory
  private getExistingConversionPages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];

    // Major currency pairs and amounts for existing pages
    const majorPairs = [
      { from: "EUR", to: "USD" },
      { from: "USD", to: "EUR" },
      { from: "EUR", to: "GBP" },
      { from: "GBP", to: "EUR" },
      { from: "EUR", to: "CHF" },
      { from: "CHF", to: "EUR" },
      { from: "USD", to: "GBP" },
      { from: "GBP", to: "USD" },
      { from: "USD", to: "JPY" },
      { from: "JPY", to: "USD" },
    ];

    const amounts = [50, 100, 200, 500, 1000];

    majorPairs.forEach((pair) => {
      amounts.forEach((amount) => {
        const slug = `${amount}-${this.getCurrencySlug(pair.from)}-to-${this.getCurrencySlug(pair.to)}`;

        pages.push({
          url: `${this.baseUrl}/convert/${slug}`,
          lastModified: this.currentDate,
          changeFrequency: "daily",
          priority: this.getConversionPagePriority({
            from: pair.from,
            to: pair.to,
            amount,
          }),
        });
      });
    });

    return pages;
  }

  // Currency pair landing pages (multilingual)
  private getCurrencyPairPages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];
    const majorPairs = [
      { from: "EUR", to: "USD", priority: 0.95 },
      { from: "GBP", to: "USD", priority: 0.9 },
      { from: "USD", to: "JPY", priority: 0.85 },
      { from: "EUR", to: "GBP", priority: 0.85 },
      { from: "USD", to: "CHF", priority: 0.8 },
      { from: "EUR", to: "CHF", priority: 0.8 },
      { from: "AUD", to: "USD", priority: 0.75 },
      { from: "USD", to: "CAD", priority: 0.75 },
      { from: "NZD", to: "USD", priority: 0.7 },
      { from: "USD", to: "CNY", priority: 0.7 },
    ];

    majorPairs.forEach((pair) => {
      // English version
      pages.push({
        url: `${this.baseUrl}${generateCurrencyUrl("en", pair.from, pair.to)}`,
        lastModified: this.currentDate,
        changeFrequency: "daily",
        priority: pair.priority * 0.9,
      });

      // German version
      pages.push({
        url: `${this.baseUrl}${generateCurrencyUrl("de", pair.from, pair.to)}`,
        lastModified: this.currentDate,
        changeFrequency: "daily",
        priority: pair.priority * 0.85,
      });

      // Spanish version
      pages.push({
        url: `${this.baseUrl}${generateCurrencyUrl("es", pair.from, pair.to)}`,
        lastModified: this.currentDate,
        changeFrequency: "daily",
        priority: pair.priority * 0.8,
      });

      // French version
      pages.push({
        url: `${this.baseUrl}${generateCurrencyUrl("fr", pair.from, pair.to)}`,
        lastModified: this.currentDate,
        changeFrequency: "daily",
        priority: pair.priority * 0.8,
      });
    });

    return pages;
  }

  // Guide pages (multilingual)
  private getGuidePages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];

    const guides = [
      "currency-basics",
      "exchange-rate-guide",
      "travel-money-tips",
      "business-currency",
      "forex-trading-basics",
      "pwa-features",
    ];

    this.supportedLocales.forEach((locale) => {
      guides.forEach((guide) => {
        const localePrefix = locale === "en" ? "" : `/${locale}`;
        pages.push({
          url: `${this.baseUrl}${localePrefix}/guides/${guide}`,
          lastModified: this.currentDate,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      });
    });

    return pages;
  }

  // Legal pages (multilingual)
  private getLegalPages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];

    // German legal pages (required)
    pages.push(
      {
        url: `${this.baseUrl}/datenschutz`,
        lastModified: this.currentDate,
        changeFrequency: "monthly",
        priority: 0.3,
      },
      {
        url: `${this.baseUrl}/impressum`,
        lastModified: this.currentDate,
        changeFrequency: "monthly",
        priority: 0.3,
      },
    );

    // English legal pages
    pages.push(
      {
        url: `${this.baseUrl}/privacy`,
        lastModified: this.currentDate,
        changeFrequency: "monthly",
        priority: 0.3,
      },
      {
        url: `${this.baseUrl}/site-notice`,
        lastModified: this.currentDate,
        changeFrequency: "monthly",
        priority: 0.3,
      },
    );

    // Multilingual legal pages for other languages
    this.supportedLocales
      .filter((locale) => !["en", "de"].includes(locale))
      .forEach((locale) => {
        pages.push(
          {
            url: `${this.baseUrl}/${locale}/privacy`,
            lastModified: this.currentDate,
            changeFrequency: "monthly",
            priority: 0.25,
          },
          {
            url: `${this.baseUrl}/${locale}/terms`,
            lastModified: this.currentDate,
            changeFrequency: "monthly",
            priority: 0.25,
          },
        );
      });

    return pages;
  }

  // Utility and special pages
  private getUtilityPages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];

    const utilityPages = [
      { path: "offline", priority: 0.2 },
      { path: "offline-first", priority: 0.3 },
      { path: "about", priority: 0.4 },
      { path: "contact", priority: 0.4 },
      { path: "help", priority: 0.5 },
      { path: "api", priority: 0.4 },
    ];

    utilityPages.forEach((page) => {
      // English version
      pages.push({
        url: `${this.baseUrl}/${page.path}`,
        lastModified: this.currentDate,
        changeFrequency: "monthly",
        priority: page.priority,
      });

      // Other languages (top 5 only to avoid bloat)
      ["de", "es", "fr", "it", "pt"].forEach((locale) => {
        pages.push({
          url: `${this.baseUrl}/${locale}/${page.path}`,
          lastModified: this.currentDate,
          changeFrequency: "monthly",
          priority: page.priority * 0.8,
        });
      });
    });

    return pages;
  }

  // Fallback conversion pages if report files are not available
  private getFallbackConversionPages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];

    const majorCurrencies = ["EUR", "USD", "GBP", "JPY", "CHF", "CAD", "AUD"];
    const popularAmounts = [100, 500, 1000];

    // Generate high-priority conversion pages
    majorCurrencies.forEach((from) => {
      majorCurrencies.forEach((to) => {
        if (from === to) return;

        popularAmounts.forEach((amount) => {
          const fromSlug = this.getCurrencySlug(from);
          const toSlug = this.getCurrencySlug(to);

          pages.push({
            url: `${this.baseUrl}/convert/${amount}-${fromSlug}-to-${toSlug}`,
            lastModified: this.currentDate,
            changeFrequency: "daily",
            priority: this.getConversionPagePriority({ from, to, amount }),
          });
        });
      });
    });

    return pages;
  }

  // Helper: Get currency slug for different locales
  private getCurrencySlug(currency: string, locale: string = "en"): string {
    const slugs: { [key: string]: { [key: string]: string } } = {
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
        hi: "dolar",
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
        ar: "junayh",
        hi: "paund",
        nl: "pond",
      },
      JPY: {
        en: "yen",
        de: "yen",
        es: "yen",
        fr: "yen",
        it: "yen",
        pt: "iene",
        ru: "jena",
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
        "zh-cn": "falang",
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
        ru: "kanadskij-dollar",
        ja: "kanada-doru",
        "zh-cn": "jianada-yuan",
        ar: "dolar-kanadi",
        hi: "kanada-dolar",
        nl: "canadese-dollar",
      },
      AUD: {
        en: "australian-dollar",
        de: "australischer-dollar",
        es: "dolar-australiano",
        fr: "dollar-australien",
        it: "dollaro-australiano",
        pt: "dolar-australiano",
        ru: "avstralijski-dollar",
        ja: "goshu-doru",
        "zh-cn": "aozhou-yuan",
        ar: "dolar-australi",
        hi: "australia-dolar",
        nl: "australische-dollar",
      },
    };

    return slugs[currency]?.[locale] || currency.toLowerCase();
  }

  // Helper: Calculate priority for conversion pages
  private getConversionPagePriority(page: any): number {
    const { from, to, amount } = page;

    // Major currency pairs get higher priority
    const majorCurrencies = ["EUR", "USD", "GBP", "JPY", "CHF"];
    const isMajorPair =
      majorCurrencies.includes(from) && majorCurrencies.includes(to);

    // Popular amounts get higher priority
    const popularAmounts = [100, 500, 1000];
    const isPopularAmount = popularAmounts.includes(amount);

    let priority = 0.4; // Base priority

    if (isMajorPair) priority += 0.3;
    if (isPopularAmount) priority += 0.2;

    // EUR-USD gets the highest priority
    if ((from === "EUR" && to === "USD") || (from === "USD" && to === "EUR")) {
      priority += 0.1;
    }

    return Math.min(priority, 0.9);
  }

  // Export methods for different formats
  public exportAsXML(): string {
    const sitemap = this.buildSitemap();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml +=
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    sitemap.forEach((page) => {
      xml += "  <url>\n";
      xml += `    <loc>${page.url}</loc>\n`;

      if (page.lastModified) {
        const date =
          page.lastModified instanceof Date
            ? page.lastModified.toISOString()
            : page.lastModified;
        xml += `    <lastmod>${date}</lastmod>\n`;
      }

      if (page.changeFrequency) {
        xml += `    <changefreq>${page.changeFrequency}</changefreq>\n`;
      }

      if (page.priority !== undefined) {
        xml += `    <priority>${page.priority.toFixed(1)}</priority>\n`;
      }

      if (page.alternates?.languages) {
        Object.entries(page.alternates.languages).forEach(([lang, url]) => {
          xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />\n`;
        });
      }

      xml += "  </url>\n";
    });

    xml += "</urlset>";
    return xml;
  }

  // Statistics and analytics
  public getStatistics() {
    const sitemap = this.buildSitemap();

    const stats = {
      totalPages: sitemap.length,
      languages: this.supportedLocales.length,
      highPriorityPages: sitemap.filter((p) => (p.priority || 0) >= 0.7).length,
      mediumPriorityPages: sitemap.filter(
        (p) => (p.priority || 0) >= 0.5 && (p.priority || 0) < 0.7,
      ).length,
      lowPriorityPages: sitemap.filter((p) => (p.priority || 0) < 0.5).length,
      dailyUpdatePages: sitemap.filter((p) => p.changeFrequency === "daily")
        .length,
      weeklyUpdatePages: sitemap.filter((p) => p.changeFrequency === "weekly")
        .length,
      monthlyUpdatePages: sitemap.filter((p) => p.changeFrequency === "monthly")
        .length,
      averagePriority:
        sitemap.reduce((sum, p) => sum + (p.priority || 0), 0) / sitemap.length,
      pagesByLanguage: {} as { [key: string]: number },
      lastGenerated: this.currentDate.toISOString(),
    };

    // Count pages by language
    this.supportedLocales.forEach((locale) => {
      const localePages = sitemap.filter((p) =>
        locale === "en"
          ? !this.supportedLocales.some(
              (l) => l !== "en" && p.url.includes(`/${l}/`),
            )
          : p.url.includes(`/${locale}/`),
      );
      stats.pagesByLanguage[locale] = localePages.length;
    });

    return stats;
  }
}

// Helper function to create multilingual sitemap instance
export const createMultilingualSitemap = (baseUrl?: string) => {
  return new MultilingualSitemapBuilder(baseUrl);
};

// Export default sitemap for Next.js
export const getMultilingualNextjsSitemap = (): MetadataRoute.Sitemap => {
  const builder = new MultilingualSitemapBuilder();
  return builder.buildSitemap();
};
