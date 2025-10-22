"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { Locale, detectLocale, saveLocale, defaultLocale } from "./config";
import { translations } from "./translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: any;
}

const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const detectedLocale = detectLocale();
    setLocaleState(detectedLocale);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    saveLocale(newLocale);

    // Set cookie for middleware
    if (typeof document !== "undefined") {
      document.cookie = `language=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`;

      // Update document language
      const langCode =
        newLocale === "zh-cn"
          ? "zh-CN"
          : newLocale === "pt"
            ? "pt-BR"
            : newLocale === "en"
              ? "en-US"
              : newLocale === "de"
                ? "de-DE"
                : `${newLocale}-${newLocale.toUpperCase()}`;

      document.documentElement.lang = langCode;
      document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";

      // Update meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          translations[newLocale].meta.description,
        );
      }

      // Update Open Graph meta tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute(
          "content",
          translations[newLocale].meta.openGraphTitle,
        );
      }

      const ogDescription = document.querySelector(
        'meta[property="og:description"]',
      );
      if (ogDescription) {
        ogDescription.setAttribute(
          "content",
          translations[newLocale].meta.openGraphDescription,
        );
      }

      // Update page title
      document.title = translations[newLocale].meta.title;

      // Handle routing for German locale
      if (newLocale === "de" && pathname === "/") {
        // Don't redirect if already on main page, just update language state
        // The middleware will handle future navigation
      } else if (newLocale === "en" && pathname.startsWith("/de")) {
        // Navigate back to English version
        router.push("/");
      }
    }
  };

  const t = translations[locale] as any;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

// Helper hook for getting translations without the full context
export function useTranslation() {
  const { t } = useI18n();
  return t;
}
