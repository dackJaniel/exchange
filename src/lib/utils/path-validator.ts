import { type Locale } from "@/lib/i18n/config";

/**
 * Client-side path validator utility
 * Validates SEO conversion page paths without filesystem access
 */

// Cache for validated paths to improve performance
const pathCache = new Map<string, boolean>();

/**
 * Check if a path matches known conversion page patterns
 * Uses pattern matching instead of filesystem checks for browser compatibility
 */
function isKnownConversionPath(filePath: string): boolean {
  // English conversion pages: /convert/amount-currency-to-currency
  if (filePath.startsWith("convert/")) {
    return /^convert\/\d+-(euro|dollar|pound|yen|franc|canadian-dollar|australian-dollar|rupee|yuan|real|ruble|riyal)-(to)-(euro|dollar|pound|yen|franc|canadian-dollar|australian-dollar|rupee|yuan|real|ruble|riyal)$/.test(
      filePath,
    );
  }

  // German conversion pages: /de/umrechnen/amount-currency-zu-currency
  if (filePath.startsWith("de/umrechnen/")) {
    return /^de\/umrechnen\/\d+-(euro|dollar|pfund|yen|franken|kanadischer-dollar|australischer-dollar|rupie|yuan|real|rubel|riyal)-(zu)-(euro|dollar|pfund|yen|franken|kanadischer-dollar|australischer-dollar|rupie|yuan|real|rubel|riyal)$/.test(
      filePath,
    );
  }

  // Spanish conversion pages: /es/convertir/amount-currency-a-currency
  if (filePath.startsWith("es/convertir/")) {
    return /^es\/convertir\/\d+-(euro|dolar|libra|yen|franco|dolar-canadiense|dolar-australiano|rupia|yuan|real|rublo|riyal)-(a)-(euro|dolar|libra|yen|franco|dolar-canadiense|dolar-australiano|rupia|yuan|real|rublo|riyal)$/.test(
      filePath,
    );
  }

  // French conversion pages: /fr/convertir/amount-currency-vers-currency
  if (filePath.startsWith("fr/convertir/")) {
    return /^fr\/convertir\/\d+-(euro|dollar|livre|yen|franc|dollar-canadien|dollar-australien|roupie|yuan|real|rouble|riyal)-(vers)-(euro|dollar|livre|yen|franc|dollar-canadien|dollar-australien|roupie|yuan|real|rouble|riyal)$/.test(
      filePath,
    );
  }

  // Italian conversion pages: /it/convertire/amount-currency-in-currency
  if (filePath.startsWith("it/convertire/")) {
    return /^it\/convertire\/\d+-(euro|dollaro|sterlina|yen|franco|dollaro-canadese|dollaro-australiano|rupia|yuan|real|rublo|riyal)-(in)-(euro|dollaro|sterlina|yen|franco|dollaro-canadese|dollaro-australiano|rupia|yuan|real|rublo|riyal)$/.test(
      filePath,
    );
  }

  return false;
}

/**
 * Check if a conversion page path is valid
 */
function checkPathValid(filePath: string): boolean {
  if (pathCache.has(filePath)) {
    return pathCache.get(filePath)!;
  }

  const isValid = isKnownConversionPath(filePath);
  pathCache.set(filePath, isValid);
  return isValid;
}

/**
 * Generate validated currency URL with client-side pattern matching
 */
export function generateValidatedCurrencyUrl(
  locale: Locale,
  fromCurrency: string,
  toCurrency: string,
  amount?: number,
): string | null {
  // Map currency codes to URL-friendly names by locale
  const currencyNameMap: Record<Locale, Record<string, string>> = {
    en: {
      EUR: "euro",
      USD: "dollar",
      GBP: "pound",
      JPY: "yen",
      CHF: "franc",
      CAD: "canadian-dollar",
      AUD: "australian-dollar",
      INR: "rupee",
      CNY: "yuan",
      BRL: "real",
      RUB: "ruble",
      SAR: "riyal",
    },
    de: {
      EUR: "euro",
      USD: "dollar",
      GBP: "pfund",
      JPY: "yen",
      CHF: "franken",
      CAD: "kanadischer-dollar",
      AUD: "australischer-dollar",
      INR: "rupie",
      CNY: "yuan",
      BRL: "real",
      RUB: "rubel",
      SAR: "riyal",
    },
    es: {
      EUR: "euro",
      USD: "dolar",
      GBP: "libra",
      JPY: "yen",
      CHF: "franco",
      CAD: "dolar-canadiense",
      AUD: "dolar-australiano",
      INR: "rupia",
      CNY: "yuan",
      BRL: "real",
      RUB: "rublo",
      SAR: "riyal",
    },
    fr: {
      EUR: "euro",
      USD: "dollar",
      GBP: "livre",
      JPY: "yen",
      CHF: "franc",
      CAD: "dollar-canadien",
      AUD: "dollar-australien",
      INR: "roupie",
      CNY: "yuan",
      BRL: "real",
      RUB: "rouble",
      SAR: "riyal",
    },
    it: {
      EUR: "euro",
      USD: "dollaro",
      GBP: "sterlina",
      JPY: "yen",
      CHF: "franco",
      CAD: "dollaro-canadese",
      AUD: "dollaro-australiano",
      INR: "rupia",
      CNY: "yuan",
      BRL: "real",
      RUB: "rublo",
      SAR: "riyal",
    },
    pt: {
      EUR: "euro",
      USD: "dolar",
      GBP: "libra",
      JPY: "yen",
      CHF: "franco",
      CAD: "dolar-canadense",
      AUD: "dolar-australiano",
      INR: "rupia",
      CNY: "yuan",
      BRL: "real",
      RUB: "rublo",
      SAR: "riyal",
    },
    ru: {
      EUR: "evro",
      USD: "dollar",
      GBP: "funt",
      JPY: "iena",
      CHF: "frank",
      CAD: "kanadskiy-dollar",
      AUD: "avstraliyskiy-dollar",
      INR: "rupiya",
      CNY: "yuan",
      BRL: "real",
      RUB: "rubl",
      SAR: "rijal",
    },
    ja: {
      EUR: "yuro",
      USD: "doru",
      GBP: "pondo",
      JPY: "en",
      CHF: "furan",
      CAD: "kanada-doru",
      AUD: "osutoraria-doru",
      INR: "rupii",
      CNY: "yuan",
      BRL: "rearu",
      RUB: "ruburu",
      SAR: "riaru",
    },
    "zh-cn": {
      EUR: "ouyuan",
      USD: "meiyuan",
      GBP: "yingbang",
      JPY: "riyuan",
      CHF: "ruishi-falang",
      CAD: "jianada-yuan",
      AUD: "aodaliya-yuan",
      INR: "lupi",
      CNY: "renminbi",
      BRL: "leiyaer",
      RUB: "lubu",
      SAR: "liyaer",
    },
    ar: {
      EUR: "yuro",
      USD: "dolar",
      GBP: "junih",
      JPY: "yen",
      CHF: "frank",
      CAD: "dolar-kanadi",
      AUD: "dolar-ustirali",
      INR: "rubia",
      CNY: "yuan",
      BRL: "real",
      RUB: "rubl",
      SAR: "riyal",
    },
    hi: {
      EUR: "yuro",
      USD: "dalar",
      GBP: "paund",
      JPY: "yen",
      CHF: "frank",
      CAD: "kanadiyan-dalar",
      AUD: "astrelyan-dalar",
      INR: "rupaya",
      CNY: "yuan",
      BRL: "real",
      RUB: "ruble",
      SAR: "riyal",
    },
    nl: {
      EUR: "euro",
      USD: "dollar",
      GBP: "pond",
      JPY: "yen",
      CHF: "frank",
      CAD: "canadese-dollar",
      AUD: "australische-dollar",
      INR: "roepie",
      CNY: "yuan",
      BRL: "real",
      RUB: "roebel",
      SAR: "riyal",
    },
  };

  // Get localized currency names
  const fromName = currencyNameMap[locale]?.[fromCurrency];
  const toName = currencyNameMap[locale]?.[toCurrency];

  if (!fromName || !toName) {
    return null; // Unsupported currency for this locale
  }

  // Generate base path based on locale
  let basePath: string;
  let connector: string;

  if (locale === "en") {
    basePath = "convert";
    connector = "to";
  } else if (locale === "de") {
    basePath = "de/umrechnen";
    connector = "zu";
  } else if (locale === "es") {
    basePath = "es/convertir";
    connector = "a";
  } else if (locale === "fr") {
    basePath = "fr/convertir";
    connector = "vers";
  } else if (locale === "it") {
    basePath = "it/convertire";
    connector = "in";
  } else if (locale === "pt") {
    basePath = "pt/converter";
    connector = "para";
  } else if (locale === "ru") {
    basePath = "ru/konverter";
    connector = "v";
  } else if (locale === "ja") {
    basePath = "ja/kansan";
    connector = "kara";
  } else if (locale === "zh-cn") {
    basePath = "zh-cn/zhuanhuan";
    connector = "dao";
  } else if (locale === "ar") {
    basePath = "ar/tahweel";
    connector = "ila";
  } else if (locale === "hi") {
    basePath = "hi/converter";
    connector = "se";
  } else if (locale === "nl") {
    basePath = "nl/omrekenen";
    connector = "naar";
  } else {
    return null; // Unsupported locale
  }

  // Generate URL with amount if provided
  let urlPath: string;
  if (amount) {
    urlPath = `${basePath}/${amount}-${fromName}-${connector}-${toName}`;
  } else {
    urlPath = `${basePath}/${fromName}-${connector}-${toName}`;
  }

  // Check if the path matches known patterns
  if (checkPathValid(urlPath)) {
    return `/${urlPath}`;
  }

  return null; // Path doesn't match known patterns
}

/**
 * Get valid currency pairs for internal linking
 * Only returns pairs that match known patterns
 */
export function getValidCurrencyPairs(locale: Locale): Array<{
  from: string;
  to: string;
  amounts: number[];
}> {
  const basePairs = [
    { from: "EUR", to: "USD" },
    { from: "USD", to: "EUR" },
    { from: "EUR", to: "GBP" },
    { from: "GBP", to: "EUR" },
    { from: "USD", to: "GBP" },
    { from: "GBP", to: "USD" },
    { from: "EUR", to: "CHF" },
    { from: "CHF", to: "EUR" },
    { from: "USD", to: "JPY" },
    { from: "JPY", to: "USD" },
    { from: "EUR", to: "JPY" },
    { from: "USD", to: "CAD" },
  ];

  const commonAmounts = [1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000];

  return basePairs
    .map((pair) => {
      const validAmounts = commonAmounts.filter((amount) => {
        const url = generateValidatedCurrencyUrl(
          locale,
          pair.from,
          pair.to,
          amount,
        );
        return url !== null;
      });

      return {
        ...pair,
        amounts: validAmounts,
      };
    })
    .filter((pair) => pair.amounts.length > 0); // Only include pairs with valid amounts
}

/**
 * Clear the path validation cache
 */
export function clearPathCache(): void {
  pathCache.clear();
}

/**
 * Pre-populate cache with known existing paths
 */
export function preloadPathCache(existingPaths: string[]): void {
  existingPaths.forEach((path) => {
    pathCache.set(path, true);
  });
}
