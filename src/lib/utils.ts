import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { pathTranslations, type Locale } from "@/lib/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(num);
}

/**
 * Generate locale-specific URL for currency conversion
 * @param locale - The target locale
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @param amount - Optional amount for conversion
 * @returns Locale-specific URL path
 */
export function generateCurrencyUrl(
  locale: Locale,
  fromCurrency: string,
  toCurrency: string,
  amount?: number,
): string {
  const convertPath = pathTranslations.convert[locale];
  const toWord = pathTranslations.to[locale];

  let baseUrl: string;
  if (locale === "en") {
    baseUrl = `/${convertPath}`;
  } else {
    baseUrl = `/${locale}/${convertPath}`;
  }

  const fromCode = fromCurrency.toLowerCase();
  const toCode = toCurrency.toLowerCase();

  if (amount) {
    return `${baseUrl}/${amount}-${fromCode}-${toWord}-${toCode}`;
  }

  return `${baseUrl}/${fromCode}-${toWord}-${toCode}`;
}

/**
 * Generate locale-specific URL for currency calculator pages
 * @param locale - The target locale
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @returns Locale-specific currency calculator URL path
 */
export function generateCurrencyCalculatorUrl(
  locale: Locale,
  fromCurrency: string,
  toCurrency: string,
): string {
  const calculatorPath = pathTranslations.calculator[locale];
  const currencyPath = pathTranslations.currency[locale];

  let baseUrl: string;
  if (locale === "en") {
    baseUrl = `/${currencyPath}-${calculatorPath}`;
  } else {
    baseUrl = `/${locale}/${currencyPath}-${calculatorPath}`;
  }

  return `${baseUrl}-${fromCurrency.toLowerCase()}-${toCurrency.toLowerCase()}`;
}
