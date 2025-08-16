// Push Notification and Background Sync utilities for PWA
export interface NotificationPayload {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    data?: Record<string, unknown>;
    tag?: string;
    requireInteraction?: boolean;
    silent?: boolean;
}

export interface PushSubscriptionInfo {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
}

export class PWANotificationManager {
    private static instance: PWANotificationManager;

    private constructor() { }

    static getInstance(): PWANotificationManager {
        if (!PWANotificationManager.instance) {
            PWANotificationManager.instance = new PWANotificationManager();
        }
        return PWANotificationManager.instance;
    }

    // Check if notifications are supported
    isNotificationSupported(): boolean {
        return 'Notification' in window && 'serviceWorker' in navigator;
    }

    // Check current notification permission
    getNotificationPermission(): NotificationPermission {
        return Notification.permission;
    }

    // Request notification permission
    async requestNotificationPermission(): Promise<NotificationPermission> {
        if (!this.isNotificationSupported()) {
            throw new Error('Notifications not supported');
        }

        const permission = await Notification.requestPermission();
        return permission;
    }

    // Subscribe to push notifications
    async subscribeToPushNotifications(): Promise<PushSubscriptionInfo | null> {
        if (!this.isNotificationSupported()) {
            return null;
        }

        try {
            const registration = await navigator.serviceWorker.ready;

            // Check if already subscribed
            const existingSubscription = await registration.pushManager.getSubscription();
            if (existingSubscription) {
                return this.subscriptionToInfo(existingSubscription);
            }

            // Create new subscription
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '') as BufferSource
            });

            return this.subscriptionToInfo(subscription);
        } catch (error) {
            console.error('Failed to subscribe to push notifications:', error);
            return null;
        }
    }

    // Unsubscribe from push notifications
    async unsubscribeFromPushNotifications(): Promise<boolean> {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                const successful = await subscription.unsubscribe();
                return successful;
            }
            return false;
        } catch (error) {
            console.error('Failed to unsubscribe from push notifications:', error);
            return false;
        }
    }

    // Show local notification (doesn't require server)
    async showLocalNotification(payload: NotificationPayload): Promise<void> {
        if (!this.isNotificationSupported()) {
            throw new Error('Notifications not supported');
        }

        if (Notification.permission !== 'granted') {
            throw new Error('Notification permission not granted');
        }

        try {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification(payload.title, {
                body: payload.body,
                icon: payload.icon || '/icons/icon-192x192.png',
                badge: payload.badge || '/icons/favicon-32x32.png',
                data: payload.data,
                tag: payload.tag,
                requireInteraction: payload.requireInteraction || false,
                silent: payload.silent || false,
                ...(('actions' in Notification.prototype) && {
                    actions: [
                        {
                            action: 'open',
                            title: 'Open App',
                            icon: '/icons/icon-192x192.png'
                        },
                        {
                            action: 'dismiss',
                            title: 'Dismiss'
                        }
                    ]
                })
            });
        } catch (error) {
            console.error('Failed to show notification:', error);
            throw error;
        }
    }

    // Convert subscription to serializable info
    private subscriptionToInfo(subscription: PushSubscription): PushSubscriptionInfo {
        const key = subscription.getKey('p256dh');
        const token = subscription.getKey('auth');

        return {
            endpoint: subscription.endpoint,
            keys: {
                p256dh: key ? this.arrayBufferToBase64(key) : '',
                auth: token ? this.arrayBufferToBase64(token) : ''
            }
        };
    }

    // Utility functions
    private urlBase64ToUint8Array(base64String: string): Uint8Array {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    private arrayBufferToBase64(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
}

// Background Sync Manager
export class PWABackgroundSyncManager {
    private static instance: PWABackgroundSyncManager;

    private constructor() { }

    static getInstance(): PWABackgroundSyncManager {
        if (!PWABackgroundSyncManager.instance) {
            PWABackgroundSyncManager.instance = new PWABackgroundSyncManager();
        }
        return PWABackgroundSyncManager.instance;
    }

    // Check if background sync is supported
    isBackgroundSyncSupported(): boolean {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
            return false;
        }

        try {
            return 'sync' in ServiceWorkerRegistration.prototype;
        } catch {
            return false;
        }
    }

    // Register a background sync
    async registerBackgroundSync(tag: string): Promise<void> {
        if (!this.isBackgroundSyncSupported()) {
            throw new Error('Background sync not supported');
        }

        try {
            const registration = await navigator.serviceWorker.ready;
            const syncReg = registration as unknown as { sync: { register: (tag: string) => Promise<void> } };
            await syncReg.sync.register(tag);
            console.log('Background sync registered:', tag);
        } catch (error) {
            console.error('Failed to register background sync:', error);
            throw error;
        }
    }

    // Common background sync operations
    async syncExchangeRates(): Promise<void> {
        await this.registerBackgroundSync('sync-exchange-rates');
    }

    async syncOfflineActions(): Promise<void> {
        await this.registerBackgroundSync('sync-offline-actions');
    }
}

// Unified PWA Manager
export class PWAManager {
    private notificationManager: PWANotificationManager;
    private backgroundSyncManager: PWABackgroundSyncManager;

    constructor() {
        this.notificationManager = PWANotificationManager.getInstance();
        this.backgroundSyncManager = PWABackgroundSyncManager.getInstance();
    }

    // Notification methods
    get notifications() {
        return this.notificationManager;
    }

    // Background sync methods
    get backgroundSync() {
        return this.backgroundSyncManager;
    }

    // Check overall PWA support
    isPWASupported(): boolean {
        return (
            'serviceWorker' in navigator &&
            this.notificationManager.isNotificationSupported() &&
            this.backgroundSyncManager.isBackgroundSyncSupported()
        );
    }

    // Initialize PWA features
    async initialize(): Promise<void> {
        try {
            // Wait for service worker to be ready
            await navigator.serviceWorker.ready;
            console.log('PWA Manager initialized');
        } catch (error) {
            console.error('Failed to initialize PWA Manager:', error);
            throw error;
        }
    }
}

export const pwaManager = new PWAManager();
