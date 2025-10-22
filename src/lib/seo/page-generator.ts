// SEO Page Generation System
// Automated content generation for currency conversion pages

import { generateCurrencyUrl } from "@/lib/utils";

export interface CurrencyPair {
  from: string;
  to: string;
  fromName: string;
  toName: string;
  fromNameDE: string;
  toNameDE: string;
  priority: number;
  flag: string;
}

export interface ConversionAmount {
  amount: string;
  priority: number;
  popular: boolean;
}

export interface CityInfo {
  name: string;
  country: string;
  countryCode: string;
  nameDE: string;
  priority: number;
  keywords: string[];
}

// Major currency pairs for high-volume SEO
export const MAJOR_CURRENCY_PAIRS: CurrencyPair[] = [
  // Tier 1 - Highest volume
  {
    from: "EUR",
    to: "USD",
    fromName: "Euro",
    toName: "US Dollar",
    fromNameDE: "Euro",
    toNameDE: "US-Dollar",
    priority: 1.0,
    flag: "🇪🇺→🇺🇸",
  },
  {
    from: "USD",
    to: "EUR",
    fromName: "US Dollar",
    toName: "Euro",
    fromNameDE: "US-Dollar",
    toNameDE: "Euro",
    priority: 1.0,
    flag: "🇺🇸→🇪🇺",
  },
  {
    from: "EUR",
    to: "GBP",
    fromName: "Euro",
    toName: "British Pound",
    fromNameDE: "Euro",
    toNameDE: "Britisches Pfund",
    priority: 0.9,
    flag: "🇪🇺→🇬🇧",
  },
  {
    from: "GBP",
    to: "EUR",
    fromName: "British Pound",
    toName: "Euro",
    fromNameDE: "Britisches Pfund",
    toNameDE: "Euro",
    priority: 0.9,
    flag: "🇬🇧→🇪🇺",
  },
  {
    from: "USD",
    to: "GBP",
    fromName: "US Dollar",
    toName: "British Pound",
    fromNameDE: "US-Dollar",
    toNameDE: "Britisches Pfund",
    priority: 0.9,
    flag: "🇺🇸→🇬🇧",
  },
  {
    from: "GBP",
    to: "USD",
    fromName: "British Pound",
    toName: "US Dollar",
    fromNameDE: "Britisches Pfund",
    toNameDE: "US-Dollar",
    priority: 0.9,
    flag: "🇬🇧→🇺🇸",
  },

  // Tier 2 - High volume
  {
    from: "EUR",
    to: "CHF",
    fromName: "Euro",
    toName: "Swiss Franc",
    fromNameDE: "Euro",
    toNameDE: "Schweizer Franken",
    priority: 0.8,
    flag: "🇪🇺→🇨🇭",
  },
  {
    from: "CHF",
    to: "EUR",
    fromName: "Swiss Franc",
    toName: "Euro",
    fromNameDE: "Schweizer Franken",
    toNameDE: "Euro",
    priority: 0.8,
    flag: "🇨🇭→🇪🇺",
  },
  {
    from: "USD",
    to: "JPY",
    fromName: "US Dollar",
    toName: "Japanese Yen",
    fromNameDE: "US-Dollar",
    toNameDE: "Japanischer Yen",
    priority: 0.8,
    flag: "🇺🇸→🇯🇵",
  },
  {
    from: "JPY",
    to: "USD",
    fromName: "Japanese Yen",
    toName: "US Dollar",
    fromNameDE: "Japanischer Yen",
    toNameDE: "US-Dollar",
    priority: 0.8,
    flag: "🇯🇵→🇺🇸",
  },
  {
    from: "EUR",
    to: "JPY",
    fromName: "Euro",
    toName: "Japanese Yen",
    fromNameDE: "Euro",
    toNameDE: "Japanischer Yen",
    priority: 0.7,
    flag: "🇪🇺→🇯🇵",
  },
  {
    from: "JPY",
    to: "EUR",
    fromName: "Japanese Yen",
    toName: "Euro",
    fromNameDE: "Japanischer Yen",
    toNameDE: "Euro",
    priority: 0.7,
    flag: "🇯🇵→🇪🇺",
  },

  // Tier 3 - Medium volume
  {
    from: "USD",
    to: "CAD",
    fromName: "US Dollar",
    toName: "Canadian Dollar",
    fromNameDE: "US-Dollar",
    toNameDE: "Kanadischer Dollar",
    priority: 0.7,
    flag: "🇺🇸→🇨🇦",
  },
  {
    from: "CAD",
    to: "USD",
    fromName: "Canadian Dollar",
    toName: "US Dollar",
    fromNameDE: "Kanadischer Dollar",
    toNameDE: "US-Dollar",
    priority: 0.7,
    flag: "🇨🇦→🇺🇸",
  },
  {
    from: "USD",
    to: "AUD",
    fromName: "US Dollar",
    toName: "Australian Dollar",
    fromNameDE: "US-Dollar",
    toNameDE: "Australischer Dollar",
    priority: 0.7,
    flag: "🇺🇸→🇦🇺",
  },
  {
    from: "AUD",
    to: "USD",
    fromName: "Australian Dollar",
    toName: "US Dollar",
    fromNameDE: "Australischer Dollar",
    toNameDE: "US-Dollar",
    priority: 0.7,
    flag: "🇦🇺→🇺🇸",
  },
  {
    from: "GBP",
    to: "CHF",
    fromName: "British Pound",
    toName: "Swiss Franc",
    fromNameDE: "Britisches Pfund",
    toNameDE: "Schweizer Franken",
    priority: 0.6,
    flag: "🇬🇧→🇨🇭",
  },
  {
    from: "CHF",
    to: "GBP",
    fromName: "Swiss Franc",
    toName: "British Pound",
    fromNameDE: "Schweizer Franken",
    toNameDE: "Britisches Pfund",
    priority: 0.6,
    flag: "🇨🇭→🇬🇧",
  },

  // European pairs
  {
    from: "EUR",
    to: "SEK",
    fromName: "Euro",
    toName: "Swedish Krona",
    fromNameDE: "Euro",
    toNameDE: "Schwedische Krone",
    priority: 0.6,
    flag: "🇪🇺→🇸🇪",
  },
  {
    from: "SEK",
    to: "EUR",
    fromName: "Swedish Krona",
    toName: "Euro",
    fromNameDE: "Schwedische Krone",
    toNameDE: "Euro",
    priority: 0.6,
    flag: "🇸🇪→🇪🇺",
  },
  {
    from: "EUR",
    to: "NOK",
    fromName: "Euro",
    toName: "Norwegian Krone",
    fromNameDE: "Euro",
    toNameDE: "Norwegische Krone",
    priority: 0.6,
    flag: "🇪🇺→🇳🇴",
  },
  {
    from: "NOK",
    to: "EUR",
    fromName: "Norwegian Krone",
    toName: "Euro",
    fromNameDE: "Norwegische Krone",
    toNameDE: "Euro",
    priority: 0.6,
    flag: "🇳🇴→🇪🇺",
  },
  {
    from: "EUR",
    to: "DKK",
    fromName: "Euro",
    toName: "Danish Krone",
    fromNameDE: "Euro",
    toNameDE: "Dänische Krone",
    priority: 0.6,
    flag: "🇪🇺→🇩🇰",
  },
  {
    from: "DKK",
    to: "EUR",
    fromName: "Danish Krone",
    toName: "Euro",
    fromNameDE: "Dänische Krone",
    toNameDE: "Euro",
    priority: 0.6,
    flag: "🇩🇰→🇪🇺",
  },
  {
    from: "EUR",
    to: "PLN",
    fromName: "Euro",
    toName: "Polish Zloty",
    fromNameDE: "Euro",
    toNameDE: "Polnischer Zloty",
    priority: 0.6,
    flag: "🇪🇺→🇵🇱",
  },
  {
    from: "PLN",
    to: "EUR",
    fromName: "Polish Zloty",
    toName: "Euro",
    fromNameDE: "Polnischer Zloty",
    toNameDE: "Euro",
    priority: 0.6,
    flag: "🇵🇱→🇪🇺",
  },
  {
    from: "EUR",
    to: "CZK",
    fromName: "Euro",
    toName: "Czech Koruna",
    fromNameDE: "Euro",
    toNameDE: "Tschechische Krone",
    priority: 0.5,
    flag: "🇪🇺→🇨🇿",
  },
  {
    from: "CZK",
    to: "EUR",
    fromName: "Czech Koruna",
    toName: "Euro",
    fromNameDE: "Tschechische Krone",
    toNameDE: "Euro",
    priority: 0.5,
    flag: "🇨🇿→🇪🇺",
  },
  {
    from: "EUR",
    to: "HUF",
    fromName: "Euro",
    toName: "Hungarian Forint",
    fromNameDE: "Euro",
    toNameDE: "Ungarischer Forint",
    priority: 0.5,
    flag: "🇪🇺→🇭🇺",
  },
  {
    from: "HUF",
    to: "EUR",
    fromName: "Hungarian Forint",
    toName: "Euro",
    fromNameDE: "Ungarischer Forint",
    toNameDE: "Euro",
    priority: 0.5,
    flag: "🇭🇺→🇪🇺",
  },

  // Asian pairs
  {
    from: "USD",
    to: "CNY",
    fromName: "US Dollar",
    toName: "Chinese Yuan",
    fromNameDE: "US-Dollar",
    toNameDE: "Chinesischer Yuan",
    priority: 0.7,
    flag: "🇺🇸→🇨🇳",
  },
  {
    from: "CNY",
    to: "USD",
    fromName: "Chinese Yuan",
    toName: "US Dollar",
    fromNameDE: "Chinesischer Yuan",
    toNameDE: "US-Dollar",
    priority: 0.7,
    flag: "🇨🇳→🇺🇸",
  },
  {
    from: "USD",
    to: "INR",
    fromName: "US Dollar",
    toName: "Indian Rupee",
    fromNameDE: "US-Dollar",
    toNameDE: "Indische Rupie",
    priority: 0.6,
    flag: "🇺🇸→🇮🇳",
  },
  {
    from: "INR",
    to: "USD",
    fromName: "Indian Rupee",
    toName: "US Dollar",
    fromNameDE: "Indische Rupie",
    toNameDE: "US-Dollar",
    priority: 0.6,
    flag: "🇮🇳→🇺🇸",
  },
  {
    from: "USD",
    to: "SGD",
    fromName: "US Dollar",
    toName: "Singapore Dollar",
    fromNameDE: "US-Dollar",
    toNameDE: "Singapur-Dollar",
    priority: 0.5,
    flag: "🇺🇸→🇸🇬",
  },
  {
    from: "SGD",
    to: "USD",
    fromName: "Singapore Dollar",
    toName: "US Dollar",
    fromNameDE: "Singapur-Dollar",
    toNameDE: "US-Dollar",
    priority: 0.5,
    flag: "🇸🇬→🇺🇸",
  },

  // Americas
  {
    from: "USD",
    to: "MXN",
    fromName: "US Dollar",
    toName: "Mexican Peso",
    fromNameDE: "US-Dollar",
    toNameDE: "Mexikanischer Peso",
    priority: 0.6,
    flag: "🇺🇸→🇲🇽",
  },
  {
    from: "MXN",
    to: "USD",
    fromName: "Mexican Peso",
    toName: "US Dollar",
    fromNameDE: "Mexikanischer Peso",
    toNameDE: "US-Dollar",
    priority: 0.6,
    flag: "🇲🇽→🇺🇸",
  },
  {
    from: "USD",
    to: "BRL",
    fromName: "US Dollar",
    toName: "Brazilian Real",
    fromNameDE: "US-Dollar",
    toNameDE: "Brasilianischer Real",
    priority: 0.5,
    flag: "🇺🇸→🇧🇷",
  },
  {
    from: "BRL",
    to: "USD",
    fromName: "Brazilian Real",
    toName: "US Dollar",
    fromNameDE: "Brasilianischer Real",
    toNameDE: "US-Dollar",
    priority: 0.5,
    flag: "🇧🇷→🇺🇸",
  },
];

// Popular conversion amounts with SEO priority
export const POPULAR_AMOUNTS: ConversionAmount[] = [
  // Tier 1 - Most searched amounts
  { amount: "100", priority: 1.0, popular: true },
  { amount: "500", priority: 0.9, popular: true },
  { amount: "1000", priority: 0.9, popular: true },
  { amount: "50", priority: 0.8, popular: true },
  { amount: "200", priority: 0.8, popular: true },

  // Tier 2 - High search volume
  { amount: "20", priority: 0.7, popular: true },
  { amount: "300", priority: 0.7, popular: false },
  { amount: "250", priority: 0.7, popular: false },
  { amount: "150", priority: 0.7, popular: false },
  { amount: "75", priority: 0.6, popular: false },

  // Tier 3 - Medium search volume
  { amount: "10", priority: 0.6, popular: false },
  { amount: "25", priority: 0.6, popular: false },
  { amount: "30", priority: 0.6, popular: false },
  { amount: "40", priority: 0.6, popular: false },
  { amount: "60", priority: 0.6, popular: false },
  { amount: "80", priority: 0.6, popular: false },
  { amount: "120", priority: 0.6, popular: false },
  { amount: "180", priority: 0.6, popular: false },
  { amount: "350", priority: 0.6, popular: false },
  { amount: "400", priority: 0.6, popular: false },
  { amount: "600", priority: 0.6, popular: false },
  { amount: "750", priority: 0.6, popular: false },
  { amount: "800", priority: 0.6, popular: false },
  { amount: "900", priority: 0.6, popular: false },
  { amount: "1500", priority: 0.6, popular: false },
  { amount: "2000", priority: 0.6, popular: false },
  { amount: "2500", priority: 0.5, popular: false },
  { amount: "3000", priority: 0.5, popular: false },
  { amount: "5000", priority: 0.5, popular: false },
  { amount: "10000", priority: 0.5, popular: false },
];

// Major cities for local SEO
export const MAJOR_CITIES: CityInfo[] = [
  // German cities
  {
    name: "Berlin",
    country: "Germany",
    countryCode: "DE",
    nameDE: "Berlin",
    priority: 0.9,
    keywords: [
      "currency exchange berlin",
      "geld wechseln berlin",
      "wechselstube berlin",
    ],
  },
  {
    name: "Munich",
    country: "Germany",
    countryCode: "DE",
    nameDE: "München",
    priority: 0.8,
    keywords: [
      "currency exchange munich",
      "geld wechseln münchen",
      "wechselstube münchen",
    ],
  },
  {
    name: "Hamburg",
    country: "Germany",
    countryCode: "DE",
    nameDE: "Hamburg",
    priority: 0.7,
    keywords: [
      "currency exchange hamburg",
      "geld wechseln hamburg",
      "wechselstube hamburg",
    ],
  },
  {
    name: "Frankfurt",
    country: "Germany",
    countryCode: "DE",
    nameDE: "Frankfurt",
    priority: 0.7,
    keywords: [
      "currency exchange frankfurt",
      "geld wechseln frankfurt",
      "wechselstube frankfurt",
    ],
  },
  {
    name: "Cologne",
    country: "Germany",
    countryCode: "DE",
    nameDE: "Köln",
    priority: 0.6,
    keywords: [
      "currency exchange cologne",
      "geld wechseln köln",
      "wechselstube köln",
    ],
  },
  {
    name: "Stuttgart",
    country: "Germany",
    countryCode: "DE",
    nameDE: "Stuttgart",
    priority: 0.6,
    keywords: [
      "currency exchange stuttgart",
      "geld wechseln stuttgart",
      "wechselstube stuttgart",
    ],
  },

  // UK cities
  {
    name: "London",
    country: "United Kingdom",
    countryCode: "GB",
    nameDE: "London",
    priority: 0.9,
    keywords: [
      "currency exchange london",
      "money exchange london",
      "forex london",
    ],
  },
  {
    name: "Manchester",
    country: "United Kingdom",
    countryCode: "GB",
    nameDE: "Manchester",
    priority: 0.7,
    keywords: [
      "currency exchange manchester",
      "money exchange manchester",
      "forex manchester",
    ],
  },
  {
    name: "Birmingham",
    country: "United Kingdom",
    countryCode: "GB",
    nameDE: "Birmingham",
    priority: 0.7,
    keywords: [
      "currency exchange birmingham",
      "money exchange birmingham",
      "forex birmingham",
    ],
  },
  {
    name: "Edinburgh",
    country: "United Kingdom",
    countryCode: "GB",
    nameDE: "Edinburgh",
    priority: 0.6,
    keywords: [
      "currency exchange edinburgh",
      "money exchange edinburgh",
      "forex edinburgh",
    ],
  },
  {
    name: "Liverpool",
    country: "United Kingdom",
    countryCode: "GB",
    nameDE: "Liverpool",
    priority: 0.6,
    keywords: [
      "currency exchange liverpool",
      "money exchange liverpool",
      "forex liverpool",
    ],
  },

  // US cities
  {
    name: "New York",
    country: "United States",
    countryCode: "US",
    nameDE: "New York",
    priority: 0.9,
    keywords: [
      "currency exchange new york",
      "money exchange nyc",
      "forex new york",
    ],
  },
  {
    name: "Los Angeles",
    country: "United States",
    countryCode: "US",
    nameDE: "Los Angeles",
    priority: 0.8,
    keywords: [
      "currency exchange los angeles",
      "money exchange la",
      "forex los angeles",
    ],
  },
  {
    name: "Chicago",
    country: "United States",
    countryCode: "US",
    nameDE: "Chicago",
    priority: 0.7,
    keywords: [
      "currency exchange chicago",
      "money exchange chicago",
      "forex chicago",
    ],
  },
  {
    name: "Miami",
    country: "United States",
    countryCode: "US",
    nameDE: "Miami",
    priority: 0.7,
    keywords: [
      "currency exchange miami",
      "money exchange miami",
      "forex miami",
    ],
  },
  {
    name: "San Francisco",
    country: "United States",
    countryCode: "US",
    nameDE: "San Francisco",
    priority: 0.7,
    keywords: [
      "currency exchange san francisco",
      "money exchange sf",
      "forex san francisco",
    ],
  },

  // Swiss cities
  {
    name: "Zurich",
    country: "Switzerland",
    countryCode: "CH",
    nameDE: "Zürich",
    priority: 0.8,
    keywords: [
      "currency exchange zurich",
      "geld wechseln zürich",
      "devise zürich",
    ],
  },
  {
    name: "Geneva",
    country: "Switzerland",
    countryCode: "CH",
    nameDE: "Genf",
    priority: 0.7,
    keywords: ["currency exchange geneva", "change genève", "devise genève"],
  },
  {
    name: "Basel",
    country: "Switzerland",
    countryCode: "CH",
    nameDE: "Basel",
    priority: 0.6,
    keywords: [
      "currency exchange basel",
      "geld wechseln basel",
      "devise basel",
    ],
  },

  // Other European cities
  {
    name: "Paris",
    country: "France",
    countryCode: "FR",
    nameDE: "Paris",
    priority: 0.8,
    keywords: [
      "currency exchange paris",
      "change paris",
      "bureau de change paris",
    ],
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    countryCode: "NL",
    nameDE: "Amsterdam",
    priority: 0.7,
    keywords: [
      "currency exchange amsterdam",
      "wisselkantoor amsterdam",
      "geld wisselen amsterdam",
    ],
  },
  {
    name: "Vienna",
    country: "Austria",
    countryCode: "AT",
    nameDE: "Wien",
    priority: 0.7,
    keywords: [
      "currency exchange vienna",
      "geld wechseln wien",
      "wechselstube wien",
    ],
  },
  {
    name: "Brussels",
    country: "Belgium",
    countryCode: "BE",
    nameDE: "Brüssel",
    priority: 0.6,
    keywords: [
      "currency exchange brussels",
      "change bruxelles",
      "wisselkantoor brussel",
    ],
  },
];

// URL generation utilities
export const getUrlFriendlyName = (currencyCode: string): string => {
  const mapping: Record<string, string> = {
    EUR: "euro",
    USD: "dollar",
    GBP: "pound",
    CHF: "franken",
    JPY: "yen",
    CAD: "canadian-dollar",
    AUD: "australian-dollar",
    SEK: "swedish-krona",
    NOK: "norwegian-krone",
    DKK: "danish-krone",
    PLN: "polish-zloty",
    CZK: "czech-koruna",
    HUF: "hungarian-forint",
    CNY: "chinese-yuan",
    INR: "indian-rupee",
    SGD: "singapore-dollar",
    MXN: "mexican-peso",
    BRL: "brazilian-real",
  };
  return mapping[currencyCode] || currencyCode.toLowerCase();
};

export const getCurrencyFromUrl = (urlName: string): string => {
  const reverseMapping: Record<string, string> = {
    euro: "EUR",
    dollar: "USD",
    pound: "GBP",
    franken: "CHF",
    yen: "JPY",
    "canadian-dollar": "CAD",
    "australian-dollar": "AUD",
    "swedish-krona": "SEK",
    "norwegian-krone": "NOK",
    "danish-krone": "DKK",
    "polish-zloty": "PLN",
    "czech-koruna": "CZK",
    "hungarian-forint": "HUF",
    "chinese-yuan": "CNY",
    "indian-rupee": "INR",
    "singapore-dollar": "SGD",
    "mexican-peso": "MXN",
    "brazilian-real": "BRL",
  };
  return reverseMapping[urlName] || urlName.toUpperCase();
};

// Generate all possible conversion page combinations
export const generateConversionPages = (): Array<{
  from: string;
  to: string;
  amount: string;
  priority: number;
}> => {
  const pages: Array<{
    from: string;
    to: string;
    amount: string;
    priority: number;
  }> = [];

  // Generate pages for top currency pairs with popular amounts
  MAJOR_CURRENCY_PAIRS.slice(0, 20).forEach((pair) => {
    POPULAR_AMOUNTS.slice(0, 15).forEach((amount) => {
      pages.push({
        from: getUrlFriendlyName(pair.from),
        to: getUrlFriendlyName(pair.to),
        amount: amount.amount,
        priority: pair.priority * amount.priority,
      });
    });
  });

  return pages.sort((a, b) => b.priority - a.priority);
};

// Generate currency pair landing pages
export const generateCurrencyPairPages = (): Array<{
  from: string;
  to: string;
  priority: number;
  enUrl: string;
  deUrl: string;
}> => {
  return MAJOR_CURRENCY_PAIRS.map((pair) => ({
    from: pair.from,
    to: pair.to,
    priority: pair.priority,
    enUrl: generateCurrencyUrl("en", pair.from, pair.to),
    deUrl: generateCurrencyUrl("de", pair.from, pair.to),
  }));
};

// Generate city-specific pages
export const generateCityPages = (): Array<{
  city: string;
  country: string;
  priority: number;
  keywords: string[];
}> => {
  return MAJOR_CITIES.map((city) => ({
    city: city.name.toLowerCase().replace(/\s+/g, "-"),
    country: city.country,
    priority: city.priority,
    keywords: city.keywords,
  }));
};

// Meta tag generation
export const generateMetaTags = (
  type: "conversion" | "pair" | "city" | "guide",
  data: any,
) => {
  switch (type) {
    case "conversion":
      return {
        title: `${data.amount} ${data.fromName} to ${data.toName} - Live Currency Converter`,
        description: `Convert ${data.amount} ${data.from} to ${data.to} with today's live exchange rate. Free calculator shows exactly how much ${data.amount} ${data.fromName} is worth in ${data.toName}.`,
        keywords: [
          `${data.amount} ${data.from.toLowerCase()} to ${data.to.toLowerCase()}`,
          `${data.amount} ${data.from} ${data.to}`,
          `convert ${data.amount} ${data.fromName.toLowerCase()} to ${data.toName.toLowerCase()}`,
          `${data.amount} ${data.fromName} ${data.toName}`,
          `${data.amount} ${data.from} in ${data.to}`,
          `how much is ${data.amount} ${data.from.toLowerCase()} in ${data.to.toLowerCase()}`,
          `${data.from} ${data.to} converter`,
          `${data.fromName.toLowerCase()} ${data.toName.toLowerCase()} calculator`,
        ],
      };

    case "pair":
      return {
        title: `${data.fromName} to ${data.toName} Converter - Live ${data.from} ${data.to} Exchange Rate`,
        description: `Convert ${data.fromName} to ${data.toName} with live exchange rates. Free ${data.from} to ${data.to} currency calculator with current rates and historical charts.`,
        keywords: [
          `${data.from.toLowerCase()} to ${data.to.toLowerCase()}`,
          `${data.from} ${data.to} converter`,
          `${data.fromName.toLowerCase()} ${data.toName.toLowerCase()}`,
          `${data.from} ${data.to} exchange rate`,
          `convert ${data.fromName.toLowerCase()} to ${data.toName.toLowerCase()}`,
          `${data.from} ${data.to} calculator`,
          `${data.fromName.toLowerCase()} ${data.toName.toLowerCase()} rate`,
          `${data.from.toLowerCase()} ${data.to.toLowerCase()} current rate`,
        ],
      };

    case "city":
      return {
        title: `Currency Exchange ${data.cityName} - Best Rates & Money Exchange`,
        description: `Find the best currency exchange rates in ${data.cityName}. Compare money exchange services, banks, and currency converters for optimal rates.`,
        keywords: [
          `currency exchange ${data.cityName.toLowerCase()}`,
          `money exchange ${data.cityName.toLowerCase()}`,
          `forex ${data.cityName.toLowerCase()}`,
          `best exchange rates ${data.cityName.toLowerCase()}`,
          `currency converter ${data.cityName.toLowerCase()}`,
          ...data.keywords,
        ],
      };

    case "guide":
      return {
        title: `${data.currencyName} Guide - History, Facts & Exchange Rates | ${data.code} Currency Guide`,
        description: `Complete guide to the ${data.currencyName} (${data.code}). Learn about its history, role in global finance, exchange rates, and conversion tips.`,
        keywords: [
          `${data.currencyName.toLowerCase()} guide`,
          `${data.code} currency`,
          `${data.currencyName.toLowerCase()} history`,
          `${data.code} exchange rates`,
          `${data.currencyName.toLowerCase()} facts`,
          `${data.code.toLowerCase()} currency guide`,
          `${data.code} trading`,
          `${data.currencyName.toLowerCase()} conversion`,
        ],
      };

    default:
      return { title: "", description: "", keywords: [] };
  }
};

// Content generation utilities
export const generateFAQContent = (
  type: "conversion" | "pair" | "city",
  data: any,
) => {
  switch (type) {
    case "conversion":
      return [
        {
          question: `How much is ${data.amount} ${data.from} in ${data.to}?`,
          answer: `The value of ${data.amount} ${data.from} in ${data.to} depends on the current exchange rate. Our calculator provides real-time conversions updated every 15 minutes.`,
        },
        {
          question: `Is this ${data.from} to ${data.to} rate accurate?`,
          answer: `Yes, our ${data.from} to ${data.to} exchange rates are sourced from reliable financial data providers and updated every 15 minutes for accuracy.`,
        },
        {
          question: `Can I convert ${data.amount} ${data.from} to ${data.to} offline?`,
          answer: `Yes, our Progressive Web App works offline using cached exchange rates, making it perfect for travel or areas with limited internet connectivity.`,
        },
      ];

    case "pair":
      return [
        {
          question: `What is the current ${data.from} to ${data.to} exchange rate?`,
          answer: `Our calculator shows live ${data.from} to ${data.to} exchange rates updated every 15 minutes from reliable financial sources.`,
        },
        {
          question: `How often do ${data.from} ${data.to} rates change?`,
          answer: `${data.from} to ${data.to} exchange rates fluctuate constantly during market hours. We update our rates every 15 minutes to ensure accuracy.`,
        },
        {
          question: `What affects ${data.from} to ${data.to} exchange rates?`,
          answer: `${data.from} ${data.to} rates are influenced by economic indicators, central bank policies, political events, and market sentiment in both countries.`,
        },
      ];

    case "city":
      return [
        {
          question: `Where can I exchange currency in ${data.cityName}?`,
          answer: `In ${data.cityName}, you can exchange currency at banks, currency exchange offices, airports, and some hotels. Banks typically offer the best rates.`,
        },
        {
          question: `What are the best currency exchange rates in ${data.cityName}?`,
          answer: `The best rates in ${data.cityName} are usually found at major banks and online money transfer services. Avoid airport exchanges for better rates.`,
        },
        {
          question: `Do I need ID to exchange money in ${data.cityName}?`,
          answer: `Yes, most currency exchange services in ${data.cityName} require valid photo identification for transactions above certain amounts.`,
        },
      ];

    default:
      return [];
  }
};

// Structured data generation
export const generateStructuredData = (type: string, data: any) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Currency Exchange Calculator",
    url: "https://exchange.danielhilmer.de",
    applicationCategory: "FinanceApplication",
  };

  switch (type) {
    case "conversion":
      return {
        ...baseSchema,
        name: `${data.amount} ${data.from} to ${data.to} Converter`,
        description: `Convert ${data.amount} ${data.from} to ${data.to} with live exchange rates`,
        url: `https://exchange.danielhilmer.de/convert/${data.amount}-${data.fromUrl}-to-${data.toUrl}`,
      };

    case "faq":
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq: any, index: number) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };

    default:
      return baseSchema;
  }
};
