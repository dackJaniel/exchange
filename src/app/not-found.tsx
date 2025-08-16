import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto'>
      <div className='text-center'>
        <h1 className='text-6xl font-light text-orange-500 mb-4'>404</h1>
        <h2 className='text-xl text-white mb-6'>Page Not Found</h2>
        <p className='text-zinc-400 mb-8'>
          Die angeforderte Seite konnte nicht gefunden werden.
        </p>
        <Link
          href='/'
          className='inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 font-medium transition-colors'>
          Zurück zum Calculator
        </Link>
      </div>
    </div>
  );
}
