import { useEffect, useState, useCallback } from 'react';
import { useCurrencyStore } from '@/lib/store/currency';

// Simple connectivity test using the actual API we use for rates
const testConnectivity = async (): Promise<boolean> => {
    try {
        // Create a timeout promise with shorter timeout
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 5000) // Reduced from 8s to 5s
        );

        // Test with our actual API endpoint using HEAD request
        const fetchPromise = fetch('https://api.exchangerate-api.com/v4/latest/EUR', {
            method: 'HEAD',
            cache: 'no-cache',
        });

        const response = await Promise.race([fetchPromise, timeoutPromise]);
        return response.ok;
    } catch (error) {
        console.log('Connectivity test failed:', error);
        return false;
    }
};

export const useOnlineStatus = () => {
    // Initialize with browser's actual status
    const [isOnline, setIsOnline] = useState<boolean>(() => {
        if (typeof navigator !== 'undefined') {
            return navigator.onLine;
        }
        return true; // Fallback for SSR
    });

    const [isTestingConnectivity, setIsTestingConnectivity] = useState<boolean>(false);
    const [lastConnectivityCheck, setLastConnectivityCheck] = useState<number>(0);
    const setOnlineStatus = useCurrencyStore((state) => state.setOnlineStatus);

    // Function to verify actual connectivity
    const verifyConnectivity = useCallback(async () => {
        // Don't test if already testing or tested recently
        if (isTestingConnectivity) {
            return;
        }

        const now = Date.now();
        if (now - lastConnectivityCheck < 20000) { // Reduced from 30s to 20s
            return;
        }

        setIsTestingConnectivity(true);
        setLastConnectivityCheck(now);

        try {
            const actuallyOnline = await testConnectivity();

            // Only update state if there's a meaningful difference
            if (actuallyOnline !== isOnline) {
                console.log(`Connectivity verified: Browser=${navigator.onLine}, Test=${actuallyOnline}, Setting=${actuallyOnline}`);
                setIsOnline(actuallyOnline);
                setOnlineStatus(actuallyOnline);
            }
        } catch (error) {
            console.warn('Connectivity test failed:', error);
            // On test failure, trust browser status
            const browserStatus = navigator.onLine;
            if (browserStatus !== isOnline) {
                setIsOnline(browserStatus);
                setOnlineStatus(browserStatus);
            }
        } finally {
            setIsTestingConnectivity(false);
        }
    }, [isTestingConnectivity, lastConnectivityCheck, isOnline, setOnlineStatus]);

    // Update status based on browser events
    const updateOnlineStatus = useCallback((browserOnline: boolean) => {
        console.log(`Browser event: ${browserOnline ? 'online' : 'offline'}`);
        setIsOnline(browserOnline);
        setOnlineStatus(browserOnline);

        // If coming back online, verify with connectivity test after short delay
        if (browserOnline) {
            setTimeout(verifyConnectivity, 1000); // Reduced delay
        }
    }, [setOnlineStatus, verifyConnectivity]);

    useEffect(() => {
        // Don't run in SSR
        if (typeof navigator === 'undefined') {
            return;
        }

        // Set initial status
        const initialStatus = navigator.onLine;
        console.log(`Initial browser status: ${initialStatus}`);
        setIsOnline(initialStatus);
        setOnlineStatus(initialStatus);

        // Test actual connectivity on mount if browser says online
        if (initialStatus) {
            setTimeout(verifyConnectivity, 2000); // Reduced delay
        }

        const handleOnline = () => {
            console.log('Browser online event');
            updateOnlineStatus(true);
        };

        const handleOffline = () => {
            console.log('Browser offline event');
            updateOnlineStatus(false);
        };

        // Also check when page becomes visible (PWA focus)
        const handleVisibilityChange = () => {
            if (!document.hidden && navigator.onLine) {
                console.log('PWA focused and browser online - verifying connectivity');
                verifyConnectivity();
            }
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [setOnlineStatus, updateOnlineStatus, verifyConnectivity]);

    return isOnline;
};
