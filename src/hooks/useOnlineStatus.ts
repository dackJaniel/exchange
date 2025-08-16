import { useEffect, useState } from 'react';
import { useCurrencyStore } from '@/lib/store/currency';

export const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(true);
    const setOnlineStatus = useCurrencyStore((state) => state.setOnlineStatus);

    useEffect(() => {
        // Check if we're in a browser environment
        if (typeof navigator === 'undefined') {
            return;
        }

        // Set initial online status
        const initialStatus = navigator.onLine;
        setIsOnline(initialStatus);
        setOnlineStatus(initialStatus);

        const handleOnline = () => {
            setIsOnline(true);
            setOnlineStatus(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setOnlineStatus(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [setOnlineStatus]);

    return isOnline;
};
