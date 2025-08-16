import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useCurrencyStore } from '@/lib/store/currency';

interface UpdateState {
    updateAvailable: boolean;
    installing: boolean;
    registration: ServiceWorkerRegistration | null;
}

export function useAppUpdates() {
    const [state, setState] = useState<UpdateState>({
        updateAvailable: false,
        installing: false,
        registration: null,
    });

    const isOnline = useCurrencyStore((state) => state.isOnline);

    const applyUpdate = useCallback(() => {
        if (state.registration?.waiting) {
            setState(prev => ({ ...prev, installing: true }));
            state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });

            // Show loading toast
            toast.loading('App wird aktualisiert...', {
                id: 'app-update',
            });

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }, [state.registration]);

    const applyUpdateSilently = useCallback(() => {
        if (state.registration?.waiting) {
            setState(prev => ({ ...prev, installing: true }));
            state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });

            // Show success notification after silent update
            toast.success('App aktualisiert', {
                description: 'Die App wurde im Hintergrund aktualisiert.',
                duration: 4000,
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }, [state.registration]);

    const checkForUpdates = useCallback(() => {
        // Only check for updates when online
        if (isOnline && state.registration) {
            console.log('Checking for app updates...');
            state.registration.update();
        } else if (!isOnline) {
            console.log('Offline - skipping update check');
        }
    }, [isOnline, state.registration]);

    const checkForUpdatesAndApply = useCallback(async () => {
        // Only check when online
        if (!isOnline) {
            console.log('Offline - skipping update check and apply');
            return false;
        }

        if (state.registration) {
            // Force a check for updates
            console.log('Checking for updates and applying if available...');
            await state.registration.update();

            // If an update is already waiting, apply it immediately
            if (state.registration.waiting) {
                applyUpdateSilently();
                return true; // Update was applied
            }

            return false; // No update available
        }
        return false;
    }, [isOnline, state.registration, applyUpdateSilently]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    setState(prev => ({ ...prev, registration }));

                    // Check for updates periodically, but only when online
                    const updateInterval = setInterval(() => {
                        if (isOnline) {
                            console.log('Periodic update check (online)');
                            registration.update();
                        } else {
                            console.log('Skipping periodic update check (offline)');
                        }
                    }, 120000); // Check every 2 minutes (only when online)

                    const handleUpdateFound = () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    setState(prev => ({ ...prev, updateAvailable: true }));

                                    // Only show persistent notification for background updates
                                    // Silent updates will be handled via checkForUpdatesAndApply
                                    toast('Neue App-Version verfügbar! 🎉', {
                                        description: 'Möchten Sie jetzt aktualisieren?',
                                        action: {
                                            label: 'Jetzt aktualisieren',
                                            onClick: applyUpdate,
                                        },
                                        cancel: {
                                            label: 'Später',
                                            onClick: () => {
                                                // Show reminder in 5 minutes
                                                setTimeout(() => {
                                                    if (state.updateAvailable) {
                                                        toast.info('Update-Erinnerung', {
                                                            description: 'Vergessen Sie nicht, die App zu aktualisieren!',
                                                            action: {
                                                                label: 'Aktualisieren',
                                                                onClick: applyUpdate,
                                                            },
                                                        });
                                                    }
                                                }, 5 * 60 * 1000);
                                            },
                                        },
                                        duration: Infinity, // Keep toast until user interacts
                                    });
                                }
                            });
                        }
                    };

                    registration.addEventListener('updatefound', handleUpdateFound);

                    // Check if update is already waiting
                    if (registration.waiting) {
                        setState(prev => ({ ...prev, updateAvailable: true }));
                        handleUpdateFound();
                    }

                    // Cleanup interval on unmount
                    return () => clearInterval(updateInterval);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });

            // Listen for service worker messages
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data?.type === 'RATES_UPDATED') {
                    toast.success('Wechselkurse aktualisiert', {
                        description: 'Die neuesten Kurse sind verfügbar.',
                        duration: 4000,
                    });
                }
            });
        }
    }, [applyUpdate, state.updateAvailable, isOnline]);

    return {
        updateAvailable: state.updateAvailable,
        installing: state.installing,
        applyUpdate,
        applyUpdateSilently,
        checkForUpdates,
        checkForUpdatesAndApply,
    };
}
