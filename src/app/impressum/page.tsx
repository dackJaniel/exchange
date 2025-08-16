import { NavigationHeader } from '@/components/layout/NavigationHeader';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | Currency Calculator',
  description: 'Impressum für den Currency Exchange Calculator',
  robots: 'noindex, nofollow',
};

export default function Impressum() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <NavigationHeader />
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='mb-6'>
          <Link
            href='/'
            className='inline-flex items-center text-zinc-400 hover:text-white transition-colors'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Zurück zum Rechner
          </Link>
        </div>

        <div className='prose prose-invert max-w-none'>
          <div className='space-y-6 text-zinc-300 leading-relaxed'>
            <div className='space-y-4'>
              <h1 className='text-3xl font-bold text-white mb-8'>Impressum</h1>

              <div className='bg-zinc-800 p-4 rounded-md'>
                <p>
                  Daniel Hilmer
                  <br />
                  Lorenzstraße 10
                  <br />
                  81737 München
                </p>
              </div>

              <h2 className='text-2xl font-semibold text-white mt-8 mb-4'>
                Kontakt
              </h2>
              <p>
                Telefon: +4915209148907
                <br />
                E-Mail: mail@danielhilmer.de
              </p>

              <h2 className='text-2xl font-semibold text-white mt-8 mb-4'>
                Verbraucherstreitbeilegung/Universalschlichtungsstelle
              </h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
