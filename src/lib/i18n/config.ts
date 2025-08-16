export const locales = ['en', 'de'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

// Helper function to detect browser language
export function detectLocale(): Locale {
    if (typeof window === 'undefined') return defaultLocale;

    const saved = localStorage.getItem('language');
    if (saved && locales.includes(saved as Locale)) {
        return saved as Locale;
    }

    const browserLang = navigator.language.split('-')[0];
    if (locales.includes(browserLang as Locale)) {
        return browserLang as Locale;
    }

    return defaultLocale;
}

// Helper function to save locale
export function saveLocale(locale: Locale) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('language', locale);
    }
}
