export const locales = [
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
] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// Language configuration with native names and RTL support
export const languageConfig = {
  en: {
    name: "English",
    nativeName: "English",
    direction: "ltr",
    flag: "🇺🇸",
    currency: "USD",
  },
  de: {
    name: "German",
    nativeName: "Deutsch",
    direction: "ltr",
    flag: "🇩🇪",
    currency: "EUR",
  },
  es: {
    name: "Spanish",
    nativeName: "Español",
    direction: "ltr",
    flag: "🇪🇸",
    currency: "EUR",
  },
  fr: {
    name: "French",
    nativeName: "Français",
    direction: "ltr",
    flag: "🇫🇷",
    currency: "EUR",
  },
  it: {
    name: "Italian",
    nativeName: "Italiano",
    direction: "ltr",
    flag: "🇮🇹",
    currency: "EUR",
  },
  pt: {
    name: "Portuguese",
    nativeName: "Português",
    direction: "ltr",
    flag: "🇧🇷",
    currency: "BRL",
  },
  ru: {
    name: "Russian",
    nativeName: "Русский",
    direction: "ltr",
    flag: "🇷🇺",
    currency: "RUB",
  },
  ja: {
    name: "Japanese",
    nativeName: "日本語",
    direction: "ltr",
    flag: "🇯🇵",
    currency: "JPY",
  },
  "zh-cn": {
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    direction: "ltr",
    flag: "🇨🇳",
    currency: "CNY",
  },
  ar: {
    name: "Arabic",
    nativeName: "العربية",
    direction: "rtl",
    flag: "🇸🇦",
    currency: "SAR",
  },
  hi: {
    name: "Hindi",
    nativeName: "हिन्दी",
    direction: "ltr",
    flag: "🇮🇳",
    currency: "INR",
  },
  nl: {
    name: "Dutch",
    nativeName: "Nederlands",
    direction: "ltr",
    flag: "🇳🇱",
    currency: "EUR",
  },
} as const;

// URL path translations for each language
export const pathTranslations = {
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
  calculator: {
    en: "calculator",
    de: "rechner",
    es: "calculadora",
    fr: "calculatrice",
    it: "calcolatrice",
    pt: "calculadora",
    ru: "kalkulyator",
    ja: "keisanki",
    "zh-cn": "jisuanqi",
    ar: "hasaba",
    hi: "calculator",
    nl: "rekenmachine",
  },
  currency: {
    en: "currency",
    de: "waehrung",
    es: "moneda",
    fr: "devise",
    it: "valuta",
    pt: "moeda",
    ru: "valyuta",
    ja: "tsuka",
    "zh-cn": "huobi",
    ar: "omla",
    hi: "mudra",
    nl: "valuta",
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
} as const;

// Currency name translations
export const currencyNames = {
  EUR: {
    en: "Euro",
    de: "Euro",
    es: "Euro",
    fr: "Euro",
    it: "Euro",
    pt: "Euro",
    ru: "Евро",
    ja: "ユーロ",
    "zh-cn": "欧元",
    ar: "يورو",
    hi: "यूरो",
    nl: "Euro",
  },
  USD: {
    en: "US Dollar",
    de: "US-Dollar",
    es: "Dólar Estadounidense",
    fr: "Dollar Américain",
    it: "Dollaro Americano",
    pt: "Dólar Americano",
    ru: "Доллар США",
    ja: "米ドル",
    "zh-cn": "美元",
    ar: "دولار أمريكي",
    hi: "अमेरिकी डॉलर",
    nl: "Amerikaanse Dollar",
  },
  GBP: {
    en: "British Pound",
    de: "Britisches Pfund",
    es: "Libra Esterlina",
    fr: "Livre Sterling",
    it: "Sterlina Britannica",
    pt: "Libra Esterlina",
    ru: "Британский фунт",
    ja: "英ポンド",
    "zh-cn": "英镑",
    ar: "جنيه إسترليني",
    hi: "ब्रिटिश पाउंड",
    nl: "Brits Pond",
  },
  JPY: {
    en: "Japanese Yen",
    de: "Japanischer Yen",
    es: "Yen Japonés",
    fr: "Yen Japonais",
    it: "Yen Giapponese",
    pt: "Yen Japonês",
    ru: "Японская иена",
    ja: "日本円",
    "zh-cn": "日元",
    ar: "ين ياباني",
    hi: "जापानी येन",
    nl: "Japanse Yen",
  },
  CHF: {
    en: "Swiss Franc",
    de: "Schweizer Franken",
    es: "Franco Suizo",
    fr: "Franc Suisse",
    it: "Franco Svizzero",
    pt: "Franco Suíço",
    ru: "Швейцарский франк",
    ja: "スイスフラン",
    "zh-cn": "瑞士法郎",
    ar: "فرنك سويسري",
    hi: "स्विस फ्रैंक",
    nl: "Zwitserse Frank",
  },
} as const;

// Helper function to detect browser language
export function detectLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const saved = localStorage.getItem("language");
  if (saved && locales.includes(saved as Locale)) {
    return saved as Locale;
  }

  // Check for exact matches first
  const browserLang = navigator.language.toLowerCase();
  if (locales.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }

  // Check for language family matches
  const langFamily = browserLang.split("-")[0];
  const matchingLocale = locales.find((locale) => {
    if (locale.includes("-")) {
      return locale.split("-")[0] === langFamily;
    }
    return locale === langFamily;
  });

  if (matchingLocale) {
    return matchingLocale as Locale;
  }

  return defaultLocale;
}

// Helper function to save locale
export function saveLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", locale);
  }
}

// Helper function to get language direction
export function getLanguageDirection(locale: Locale): "ltr" | "rtl" {
  return languageConfig[locale]?.direction || "ltr";
}

// Helper function to get language display name
export function getLanguageDisplayName(
  locale: Locale,
  inLocale?: Locale,
): string {
  const config = languageConfig[locale];
  if (!config) return locale;

  return inLocale === locale ? config.nativeName : config.name;
}

// Helper function to get default currency for a locale
export function getDefaultCurrencyForLocale(locale: Locale): string {
  return languageConfig[locale]?.currency || "USD";
}

// Helper function to format currency amounts by locale
export function formatCurrencyAmount(
  amount: number,
  currency: string,
  locale: Locale,
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback for unsupported locales
    return `${amount.toFixed(2)} ${currency}`;
  }
}

// Helper function to get SEO-friendly path
export function getLocalizedPath(
  basePath: string,
  locale: Locale,
  params?: Record<string, string>,
): string {
  if (locale === defaultLocale) {
    return basePath;
  }

  let localizedPath = `/${locale}${basePath}`;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      localizedPath = localizedPath.replace(`:${key}`, value);
    });
  }

  return localizedPath;
}

// Helper function to parse locale from pathname
export function getLocaleFromPathname(pathname: string): {
  locale: Locale;
  path: string;
} {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return { locale: defaultLocale, path: "/" };
  }

  const potentialLocale = segments[0];

  if (locales.includes(potentialLocale as Locale)) {
    const remainingPath = "/" + segments.slice(1).join("/");
    return {
      locale: potentialLocale as Locale,
      path: remainingPath || "/",
    };
  }

  return { locale: defaultLocale, path: pathname };
}
