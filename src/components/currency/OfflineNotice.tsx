'use client';

import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useCurrencyStore } from '@/lib/store/currency';
import { useTranslation } from '@/lib/i18n/provider';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineNotice() {
  const isOnline = useOnlineStatus();
  const hasEverBeenOnline = useCurrencyStore(
    (state) => state.hasEverBeenOnline
  );
  const lastUpdated = useCurrencyStore((state) => state.lastUpdated);
  const t = useTranslation();

  // Show different notices based on state
  if (isOnline) {
    return null; // No notice when online
  }

  // If user has never been online or no cached data available
  if (!hasEverBeenOnline || !lastUpdated) {
    return (
      <div className='bg-red-500/20 border border-red-500 rounded-lg p-3 mx-2 mb-3'>
        <div className='flex items-center gap-2 text-red-500'>
          <WifiOff className='h-4 w-4' />
          <div className='flex-1'>
            <h3 className='font-medium text-sm'>{t.ui.offlineTitle}</h3>
            <p className='text-xs text-red-400 mt-1'>
              {t.ui.offlineDescription}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // User is offline but has cached data
  return (
    <div className='bg-orange-500/20 border border-orange-500 rounded-lg p-3 mx-2 mb-3'>
      <div className='flex items-center gap-2 text-orange-500'>
        <WifiOff className='h-4 w-4' />
        <div className='flex-1'>
          <h3 className='font-medium text-sm'>Offline-Modus</h3>
          <p className='text-xs text-orange-400 mt-1'>
            Arbeitet mit zwischengespeicherten Daten. Zuletzt aktualisiert:{' '}
            {lastUpdated
              ? new Date(lastUpdated).toLocaleString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Unbekannt'}
          </p>
        </div>
      </div>
    </div>
  );
}
