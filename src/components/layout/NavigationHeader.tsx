'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShareButton } from '@/components/ui/ShareButton';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { NotificationSettings } from '@/components/ui/NotificationSettings';
import { Download, Menu, Coffee } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation, useI18n } from '@/lib/i18n/provider';

export function NavigationHeader() {
  const t = useTranslation();
  const { locale } = useI18n();
  return (
    <header className='border-b border-zinc-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50'>
      <nav className='flex items-center justify-between px-4 py-3'>
        {/* Logo */}
        <Link href='/' className='flex items-center space-x-2'>
          <Image
            src='/icons/favicon-32x32.png'
            alt='Currency Calculator Logo'
            width={28}
            height={28}
            className='rounded-sm'
          />
          <span className='text-white font-medium text-lg hidden sm:inline'>
            Currency Calculator
          </span>
        </Link>

        {/* Right side - Download & Hamburger Menu */}
        <div className='flex items-center space-x-2'>
          {/* PWA Install Button */}
          <Button
            id='install-button'
            variant='ghost'
            size='sm'
            className='text-zinc-400 hover:text-white hover:bg-zinc-800 hidden'
            title={t.ui.installApp}>
            <Download className='h-4 w-4 mr-2' />
            <span className='hidden sm:inline'>{t.ui.install}</span>
          </Button>

          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-zinc-400 hover:text-white hover:bg-zinc-800'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>{t.ui.menu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] bg-zinc-900'>
              <SheetHeader>
                <SheetTitle className='text-white'>{t.ui.menu}</SheetTitle>
                <SheetDescription className='text-zinc-400'>
                  {t.ui.navigationDescription}
                </SheetDescription>
              </SheetHeader>
              <div className='mt-6 flex flex-col space-y-4'>
                {/* Language Selection */}
                <div className='pb-2'>
                  <div className='text-sm text-zinc-400 mb-2'>
                    {t.ui.language}
                  </div>
                  <LanguageSelector />
                </div>

                {/* Notification Settings */}
                <div className='pb-2'>
                  <NotificationSettings />
                </div>

                {/* Coffee Donation Button */}
                <div className='pb-2'>
                  <Button
                    variant='outline'
                    className='w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-200'
                    asChild>
                    <a
                      href='https://paypal.me/DanielHilmerDE'
                      target='_blank'
                      rel='noopener noreferrer'>
                      <Coffee className='h-4 w-4 mr-2' />
                      Buy me a Coffee
                    </a>
                  </Button>
                </div>

                <Link
                  href={locale === 'de' ? '/datenschutz' : '/privacy'}
                  className='text-white hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-zinc-800'>
                  {locale === 'de' ? t.ui.dataProtection : t.ui.privacy}
                </Link>
                <Link
                  href={locale === 'de' ? '/impressum' : '/site-notice'}
                  className='text-white hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-zinc-800'>
                  {locale === 'de' ? t.ui.imprint : t.ui.siteNotice}
                </Link>

                {/* Share Button */}
                <div className='pt-2 border-t border-zinc-700'>
                  <ShareButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
