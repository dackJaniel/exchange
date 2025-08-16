'use client';

import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useCurrencyStore } from '@/lib/store/currency';
import { useHydrated } from '@/hooks/useHydrated';
import { useEffect, useState } from 'react';

export function OnlineStatusDebug() {
  const isHydrated = useHydrated();
  const isOnlineHook = useOnlineStatus();
  const { isOnline: storeOnline, hasEverBeenOnline } = useCurrencyStore();
  const [navigatorOnline, setNavigatorOnline] = useState<boolean | null>(null);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setNavigatorOnline(navigator.onLine);

      // Check Network Information API if available
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');

        const updateConnection = () => {
          setConnectionType(connection.effectiveType || 'unknown');
        };

        connection.addEventListener('change', updateConnection);
        return () => connection.removeEventListener('change', updateConnection);
      }
    }
  }, []);

  if (!isHydrated) {
    return null;
  }

  // Only show debug in development
  const isDebug = process.env.NODE_ENV === 'development';

  if (!isDebug) {
    return null;
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-black/80 text-white p-2 text-xs font-mono'>
      <div className='flex flex-wrap gap-4'>
        <div>
          Navigator: {navigatorOnline ? '🟢' : '🔴'} {String(navigatorOnline)}
        </div>
        <div>
          Hook: {isOnlineHook ? '🟢' : '🔴'} {String(isOnlineHook)}
        </div>
        <div>
          Store: {storeOnline ? '🟢' : '🔴'} {String(storeOnline)}
        </div>
        <div>Ever Online: {hasEverBeenOnline ? '✅' : '❌'}</div>
        <div>Connection: {connectionType}</div>
        <div>Hydrated: {isHydrated ? '✅' : '❌'}</div>
      </div>
    </div>
  );
}
