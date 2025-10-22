// Dynamic Sitemap Builder for SEO Pages
// Automatically generates sitemap entries for all SEO content

import { MetadataRoute } from "next";
import {
  MAJOR_CURRENCY_PAIRS,
  MAJOR_CITIES,
  generateConversionPages,
  getUrlFriendlyName,
} from "./page-generator";
import { generateCurrencyUrl } from "@/lib/utils";

export class SitemapBuilder {
  private baseUrl: string;
  private currentDate: Date;

  constructor(baseUrl: string = "https://exchange.danielhilmer.de") {
    this.baseUrl = baseUrl;
    this.currentDate = new Date();
  }

  // Build complete sitemap
  public buildSitemap(): MetadataRoute.Sitemap {
    const sitemap: MetadataRoute.Sitemap = [
      ...this.getMainPages(),
      ...this.getCurrencyPairPages(),
      ...this.getConversionPages(),
      ...this.getCurrencyGuidePages(),
      ...this.getTravelGuidePages(),
      ...this.getToolPages(),
      ...this.getHistoricalRatePages(),
      ...this.getCityPages(),
      ...this.getLegalPages(),
      ...this.getUtilityPages(),
    ];

    return sitemap.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  // Main application pages
  private getMainPages(): MetadataRoute.Sitemap {
    return [
      {
        url: this.baseUrl,
        lastModified: this.currentDate,
        changeFrequency: "daily",
        priority: 1.0,
        alternates: {
          languages: {
            en: this.baseUrl,
            de: `${this.baseUrl}/de`,
          },
        },
      },
      {
        url: `${this.baseUrl}/de`,
        lastModified: this.currentDate,
        changeFrequency: "daily",
        priority: 1.0,
        alternates: {
          languages: {
            en: this.baseUrl,
            de: `${this.baseUrl}/de`,
          },
        },
      },
    ];
  }

  // Currency pair landing pages
  private getCurrencyPairPages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];

    MAJOR_CURRENCY_PAIRS.forEach((pair) => {
      // English version
      pages.push({
        url: `${this.baseUrl}${generateCurrencyUrl("en", pair.from, pair.to)}`,
        lastModified: this.currentDate,
        changeFrequency: "daily",
        priority: (pair.priority || 0.8) * 0.9,
      });

      // German version
      pages.push({
        url: `${this.baseUrl}${generateCurrencyUrl("de", pair.from, pair.to)}`,
        lastModified: this.currentDate,
        changeFrequency: "daily",
        priority: (pair.priority || 0.8) * 0.9,
      });
    });

    return pages;
  }

  // Amount-specific conversion pages
  private getConversionPages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];
    const conversionPages = generateConversionPages();

    // Generate top priority conversion pages (limit to 300 for performance)
    conversionPages.slice(0, 300).forEach((page) => {
      pages.push({
        url: `${this.baseUrl}/convert/${page.amount}-${page.from}-to-${page.to}`,
        lastModified: this.currentDate,
        changeFrequency: "daily",
        priority: Math.min((page.priority || 0.5) * 0.8, 0.9),
      });
    });

    return pages;
  }

  // Currency guide pages
  private getCurrencyGuidePages(): MetadataRoute.Sitemap {
    const guides = [
      "us-dollar",
      "euro",
      "british-pound",
      "swiss-franc",
      "japanese-yen",
      "canadian-dollar",
      "australian-dollar",
      "chinese-yuan",
      "indian-rupee",
      "swedish-krona",
      "norwegian-krone",
      "danish-krone",
      "polish-zloty",
      "czech-koruna",
      "hungarian-forint",
      "singapore-dollar",
      "mexican-peso",
      "brazilian-real",
    ];

    return guides.map((guide) => ({
      url: `${this.baseUrl}/guides/currencies/${guide}`,
      lastModified: this.currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  }

  // Travel currency guide pages
  private getTravelGuidePages(): MetadataRoute.Sitemap {
    const travelGuides = [
      "usa-currency-guide",
      "uk-currency-guide",
      "europe-currency-guide",
      "switzerland-currency-guide",
      "canada-currency-guide",
      "australia-currency-guide",
      "japan-currency-guide",
      "china-currency-guide",
      "india-currency-guide",
      "scandinavia-currency-guide",
      "eastern-europe-currency-guide",
      "southeast-asia-currency-guide",
      "latin-america-currency-guide",
    ];

    return travelGuides.map((guide) => ({
      url: `${this.baseUrl}/guides/travel/${guide}`,
      lastModified: this.currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  }

  // Business currency guide pages
  private getBusinessGuidePages(): MetadataRoute.Sitemap {
    const businessGuides = [
      "international-trade-currency",
      "forex-risk-management",
      "hedging-strategies",
      "cross-border-payments",
      "export-import-currency",
      "freelancer-currency-guide",
      "ecommerce-currency-conversion",
      "small-business-forex",
    ];

    return businessGuides.map((guide) => ({
      url: `${this.baseUrl}/guides/business/${guide}`,
      lastModified: this.currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
  }

  // Currency calculator tools
  private getToolPages(): MetadataRoute.Sitemap {
    const tools = [
      "travel-budget-calculator",
      "inflation-calculator",
      "fee-calculator",
      "multi-currency-converter",
      "rate-alert-system",
      "historical-rate-analyzer",
      "currency-trend-predictor",
      "cross-rate-calculator",
    ];

    return tools.map((tool) => ({
      url: `${this.baseUrl}/tools/${tool}`,
      lastModified: this.currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  }

  // Historical rate pages
  private getHistoricalRatePages(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [];

    // Top 20 currency pairs for historical data
    MAJOR_CURRENCY_PAIRS.slice(0, 20).forEach((pair) => {
      pages.push({
        url: `${this.baseUrl}/rates/historical/${pair.from.toLowerCase()}-${pair.to.toLowerCase()}`,
        lastModified: this.currentDate,
        changeFrequency: "daily" as const,
        priority: 0.7,
      });

      // Charts page
      pages.push({
        url: `${this.baseUrl}/rates/charts/${pair.from.toLowerCase()}-${pair.to.toLowerCase()}`,
        lastModified: this.currentDate,
        changeFrequency: "daily" as const,
        priority: 0.6,
      });
    });

    return pages;
  }

  // City-specific currency exchange pages
  private getCityPages(): MetadataRoute.Sitemap {
    return MAJOR_CITIES.map((city) => ({
      url: `${this.baseUrl}/currency-exchange-${city.name.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: this.currentDate,
      changeFrequency: "weekly" as const,
      priority: (city.priority || 0.5) * 0.6,
    }));
  }

  // News and blog pages
  private getNewsPages(): MetadataRoute.Sitemap {
    const newsCategories = [
      "currency-news",
      "exchange-rate-analysis",
      "central-bank-updates",
      "forex-market-trends",
      "economic-indicators",
      "travel-money-tips",
      "business-currency-news",
    ];

    return newsCategories.map((category) => ({
      url: `${this.baseUrl}/news/${category}`,
      lastModified: this.currentDate,
      changeFrequency: "daily" as const,
      priority: 0.5,
    }));
  }

  // Legal and utility pages
  private getLegalPages(): MetadataRoute.Sitemap {
    return [
      {
        url: `${this.baseUrl}/datenschutz`,
        lastModified: this.currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.3,
      },
      {
        url: `${this.baseUrl}/impressum`,
        lastModified: this.currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.3,
      },
      {
        url: `${this.baseUrl}/privacy`,
        lastModified: this.currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.3,
      },
      {
        url: `${this.baseUrl}/site-notice`,
        lastModified: this.currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.3,
      },
      {
        url: `${this.baseUrl}/terms-of-service`,
        lastModified: this.currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.3,
      },
    ];
  }

  // Utility and special pages
  private getUtilityPages(): MetadataRoute.Sitemap {
    return [
      {
        url: `${this.baseUrl}/offline`,
        lastModified: this.currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.2,
      },
      {
        url: `${this.baseUrl}/about`,
        lastModified: this.currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      },
      {
        url: `${this.baseUrl}/contact`,
        lastModified: this.currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      },
      {
        url: `${this.baseUrl}/help`,
        lastModified: this.currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      },
      {
        url: `${this.baseUrl}/api-documentation`,
        lastModified: this.currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.4,
      },
    ];
  }

  // API endpoints for external consumption
  public getHighPriorityPages(): MetadataRoute.Sitemap {
    return this.buildSitemap().filter((page) => (page.priority || 0) >= 0.7);
  }

  public getMediumPriorityPages(): MetadataRoute.Sitemap {
    return this.buildSitemap().filter(
      (page) => (page.priority || 0) >= 0.5 && (page.priority || 0) < 0.7,
    );
  }

  public getLowPriorityPages(): MetadataRoute.Sitemap {
    return this.buildSitemap().filter((page) => (page.priority || 0) < 0.5);
  }

  // Generate sitemap for specific currency pairs
  public getCurrencySpecificSitemap(
    currencyCode: string,
  ): MetadataRoute.Sitemap {
    return this.buildSitemap().filter(
      (page) =>
        page.url.includes(currencyCode.toLowerCase()) ||
        page.url.includes(getUrlFriendlyName(currencyCode)),
    );
  }

  // Generate sitemap for specific regions
  public getRegionalSitemap(
    region: "europe" | "americas" | "asia" | "oceania",
  ): MetadataRoute.Sitemap {
    const regionCurrencies: Record<string, string[]> = {
      europe: ["EUR", "GBP", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "HUF"],
      americas: ["USD", "CAD", "MXN", "BRL"],
      asia: ["JPY", "CNY", "INR", "SGD"],
      oceania: ["AUD", "NZD"],
    };

    const currencies = regionCurrencies[region] || [];

    return this.buildSitemap().filter((page) =>
      currencies.some(
        (currency) =>
          page.url.includes(currency.toLowerCase()) ||
          page.url.includes(getUrlFriendlyName(currency)),
      ),
    );
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
        xml += `    <lastmod>${page.lastModified instanceof Date ? page.lastModified.toISOString() : page.lastModified}</lastmod>\n`;
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

  public exportAsJSON(): string {
    return JSON.stringify(this.buildSitemap(), null, 2);
  }

  // Statistics and analytics
  public getStatistics() {
    const sitemap = this.buildSitemap();

    return {
      totalPages: sitemap.length,
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
      lastGenerated: this.currentDate.toISOString(),
    };
  }
}

// Helper function to create sitemap instance
export const createSitemap = (baseUrl?: string) => {
  return new SitemapBuilder(baseUrl);
};

// Export default sitemap for Next.js
export const getNextjsSitemap = (): MetadataRoute.Sitemap => {
  const builder = new SitemapBuilder();
  return builder.buildSitemap();
};
