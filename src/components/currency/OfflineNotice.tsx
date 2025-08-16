'use client';

import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useCurrencyStore } from '@/lib/store/currency';
import { WifiOff } from 'lucide-react';

export function OfflineNotice() {
  const isOnline = useOnlineStatus();
  const hasEverBeenOnline = useCurrencyStore(
    (state) => state.hasEverBeenOnline
  );

  // Only show notice if user has never been online
  if (hasEverBeenOnline || isOnline) {
    return null;
  }

  return (
    <div className='bg-orange-500/20 border border-orange-500 rounded-lg p-3 mx-2 mb-3'>
      <div className='flex items-center gap-2 text-orange-500'>
        <WifiOff className='h-4 w-4' />
        <div className='flex-1'>
          <h3 className='font-medium text-sm'>
            Internet-Verbindung erforderlich
          </h3>
          <p className='text-xs text-orange-400 mt-1'>
            Für die erste Nutzung ist eine Online-Verbindung nötig, um aktuelle
            Wechselkurse zu laden. Danach funktioniert die App auch offline.
          </p>
        </div>
      </div>
    </div>
  );
}
