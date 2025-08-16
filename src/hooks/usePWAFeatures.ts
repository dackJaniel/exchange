'use client';

import { useState, useEffect, useCallback } from 'react';
import { pwaManager } from '@/lib/pwa-features';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n/provider';

export interface PWAFeatures {
    notifications: {
        isSupported: boolean;
        permission: NotificationPermission;
        isSubscribed: boolean;
        requestPermission: () => Promise<NotificationPermission>;
        subscribe: () => Promise<boolean>;
        unsubscribe: () => Promise<boolean>;
        sendTest: () => Promise<void>;
    };
    backgroundSync: {
        isSupported: boolean;
        syncRates: () => Promise<void>;
        syncOfflineActions: () => Promise<void>;
    };
    isLoading: boolean;
    error: string | null;
}

export function usePWAFeatures(): PWAFeatures {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const t = useTranslation();

    // Check initial status
    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        try {
            if (pwaManager.notifications.isNotificationSupported()) {
                const permission = pwaManager.notifications.getNotificationPermission();
                setNotificationPermission(permission);

                // Check subscription status
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.getSubscription();
                setIsSubscribed(!!subscription);
            }
        } catch (error) {
            console.error('Failed to check PWA status:', error);
        }
    };

    const requestNotificationPermission = useCallback(async (): Promise<NotificationPermission> => {
        setIsLoading(true);
        setError(null);

        try {
            const permission = await pwaManager.notifications.requestNotificationPermission();
            setNotificationPermission(permission);
            return permission;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setError(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const subscribeToNotifications = useCallback(async (): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const subscription = await pwaManager.notifications.subscribeToPushNotifications();
            const success = !!subscription;
            setIsSubscribed(success);

            if (success) {
                toast.success(t.ui.notifications.enabled, {
                    description: t.ui.notifications.enabledDescription,
                });
            }

            return success;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setError(errorMessage);
            toast.error(t.ui.notifications.error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [t.ui.notifications]);

    const unsubscribeFromNotifications = useCallback(async (): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const success = await pwaManager.notifications.unsubscribeFromPushNotifications();
            if (success) {
                setIsSubscribed(false);
                toast.success(t.ui.notifications.disabled);
            }
            return success;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setError(errorMessage);
            toast.error(t.ui.notifications.error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [t.ui.notifications]);

    const sendTestNotification = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            if (notificationPermission !== 'granted') {
                toast.error(t.ui.notifications.permissionRequired);
                return;
            }

            await pwaManager.notifications.showLocalNotification({
                title: t.ui.notifications.testTitle,
                body: t.ui.notifications.testBody,
                tag: 'test-notification',
                requireInteraction: false
            });

            toast.success(t.ui.notifications.testSent);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setError(errorMessage);
            toast.error(t.ui.notifications.testError);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [notificationPermission, t.ui.notifications]);

    const syncExchangeRates = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await pwaManager.backgroundSync.syncExchangeRates();
            toast.success(t.ui.notifications.backgroundSyncEnabled, {
                description: t.ui.notifications.backgroundSyncDescription,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setError(errorMessage);
            toast.error(t.ui.notifications.backgroundSyncError);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [t.ui.notifications]);

    const syncOfflineActions = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await pwaManager.backgroundSync.syncOfflineActions();
            toast.success('Offline actions synced');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setError(errorMessage);
            toast.error('Failed to sync offline actions');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        notifications: {
            isSupported: pwaManager.notifications.isNotificationSupported(),
            permission: notificationPermission,
            isSubscribed,
            requestPermission: requestNotificationPermission,
            subscribe: subscribeToNotifications,
            unsubscribe: unsubscribeFromNotifications,
            sendTest: sendTestNotification,
        },
        backgroundSync: {
            isSupported: pwaManager.backgroundSync.isBackgroundSyncSupported(),
            syncRates: syncExchangeRates,
            syncOfflineActions,
        },
        isLoading,
        error,
    };
}

// Listen for service worker messages about background updates
export function usePWAEventListeners() {
    const t = useTranslation();

    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;

        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'BACKGROUND_RATES_UPDATED') {
                toast.success(t.ui.ratesUpdated, {
                    description: t.ui.ratesUpdatedDescription,
                });
            }
        };

        navigator.serviceWorker.addEventListener('message', handleMessage);

        return () => {
            navigator.serviceWorker.removeEventListener('message', handleMessage);
        };
    }, [t.ui.ratesUpdated, t.ui.ratesUpdatedDescription]);
}
