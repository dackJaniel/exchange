import { useState, useEffect } from 'react';

/**
 * Custom hook to handle hydration state
 * Returns true only after the component has mounted on the client
 * This prevents hydration mismatches between server and client rendering
 */
export function useHydrated() {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return isHydrated;
}
