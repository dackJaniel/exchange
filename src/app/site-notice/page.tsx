import { NavigationHeader } from '@/components/layout/NavigationHeader';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Site Notice | Currency Calculator',
  description: 'Site Notice for the Currency Exchange Calculator',
  robots: 'noindex, nofollow',
};

export default function SiteNotice() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <NavigationHeader />
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='mb-6'>
          <Link
            href='/'
            className='inline-flex items-center text-zinc-400 hover:text-white transition-colors'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Calculator
          </Link>
        </div>

        <div className='prose prose-invert max-w-none'>
          <div className='space-y-6 text-zinc-300 leading-relaxed'>
            <div className='space-y-4'>
              <h1 className='text-3xl font-bold text-white mb-8'>
                Site Notice
              </h1>

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
                Contact
              </h2>
              <p>
                Phone: +4915209148907
                <br />
                E-mail: mail@danielhilmer.de
              </p>

              <h2 className='text-2xl font-semibold text-white mt-8 mb-4'>
                Dispute resolution proceedings in front of a consumer
                arbitration board
              </h2>
              <p>
                We are not willing or obliged to participate in dispute
                resolution proceedings in front of a consumer arbitration board.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
