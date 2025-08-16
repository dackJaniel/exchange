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
import { Download, Menu, Coffee } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function NavigationHeader() {
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
            title='App installieren'>
            <Download className='h-4 w-4 mr-2' />
            <span className='hidden sm:inline'>Installieren</span>
          </Button>

          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-zinc-400 hover:text-white hover:bg-zinc-800'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Menü öffnen</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] bg-zinc-900'>
              <SheetHeader>
                <SheetTitle className='text-white'>Menü</SheetTitle>
                <SheetDescription className='text-zinc-400'>
                  Navigation und rechtliche Informationen
                </SheetDescription>
              </SheetHeader>
              <div className='mt-6 flex flex-col space-y-4'>
                {/* Coffee Donation Button */}
                <div className='pb-2 '>
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
                  href='/datenschutz'
                  className='text-white hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-zinc-800'>
                  Datenschutz
                </Link>
                <Link
                  href='/privacy'
                  className='text-white hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-zinc-800'>
                  Privacy Policy
                </Link>
                <Link
                  href='/impressum'
                  className='text-white hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-zinc-800'>
                  Impressum
                </Link>
                <Link
                  href='/site-notice'
                  className='text-white hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-zinc-800'>
                  Site Notice
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
