'use client';

export default function OfflinePage() {
  return (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto'>
      <div className='text-center'>
        <div className='text-6xl mb-6'>📱</div>
        <h1 className='text-2xl text-white mb-4'>Offline Modus</h1>
        <p className='text-zinc-400 mb-8 text-center'>
          Sie sind offline. Die App funktioniert weiterhin mit den zuletzt
          geladenen Wechselkursen.
        </p>
        <button
          onClick={() => window.location.reload()}
          className='inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 font-medium transition-colors'>
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
