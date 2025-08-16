'use client';

import { useI18n } from '@/lib/i18n/provider';
import { Locale, locales } from '@/lib/i18n/config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages } from 'lucide-react';

const languageNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
};

const flagEmojis: Record<Locale, string> = {
  en: '🇺🇸',
  de: '🇩🇪',
};

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <Select
      value={locale}
      onValueChange={(value) => setLocale(value as Locale)}>
      <SelectTrigger className='w-full bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'>
        <div className='flex items-center gap-2'>
          <Languages className='h-4 w-4' />
          <SelectValue>
            <span className='flex items-center gap-2'>
              <span>{flagEmojis[locale]}</span>
              <span>{languageNames[locale]}</span>
            </span>
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent className='bg-zinc-800 border-zinc-700'>
        {locales.map((lang) => (
          <SelectItem
            key={lang}
            value={lang}
            className='text-white hover:bg-zinc-700 focus:bg-zinc-700'>
            <span className='flex items-center gap-2'>
              <span>{flagEmojis[lang]}</span>
              <span>{languageNames[lang]}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
