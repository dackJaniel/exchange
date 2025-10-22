"use client";

import { useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n/provider";
import { locales, type Locale, languageConfig } from "@/lib/i18n/config";

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useI18n();

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  const currentLanguage = languageConfig[locale];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
        aria-label="Select Language"
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-50">
          <div className="py-2 max-h-96 overflow-y-auto">
            {locales.map((loc) => {
              const config = languageConfig[loc];
              return (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-zinc-700 transition-colors text-left"
                  dir={config.direction}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{config.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{config.nativeName}</span>
                      <span className="text-xs text-gray-400">
                        {config.name}
                      </span>
                    </div>
                  </div>
                  {locale === loc && (
                    <Check className="w-4 h-4 text-orange-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
