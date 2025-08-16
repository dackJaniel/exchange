import { useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';

// Zentrale Update-Benachrichtigungsverwaltung
class UpdateNotificationManager {
    private static instance: UpdateNotificationManager;
    private lastNotificationId: string | null = null;
    private notificationShown = false;
    private pendingUpdateCallback: (() => void) | null = null;

    private constructor() { }

    static getInstance(): UpdateNotificationManager {
        if (!UpdateNotificationManager.instance) {
            UpdateNotificationManager.instance = new UpdateNotificationManager();
        }
        return UpdateNotificationManager.instance;
    }

    showUpdateNotification(
        title: string,
        description: string,
        buttonLabel: string,
        laterLabel: string,
        updateCallback: () => void,
        onDismiss?: () => void
    ): void {
        // Verwerfe vorherige Benachrichtigung wenn sie noch da ist
        if (this.lastNotificationId) {
            toast.dismiss(this.lastNotificationId);
        }

        // Setze neue Update-Callback
        this.pendingUpdateCallback = updateCallback;
        this.notificationShown = true;

        // Erstelle neue Benachrichtigung mit eindeutiger ID
        const notificationId = `sw-update-${Date.now()}`;
        this.lastNotificationId = notificationId;

        console.log('Update Manager: Showing notification:', notificationId);

        toast(title, {
            description,
            action: {
                label: buttonLabel,
                onClick: () => {
                    console.log('Update Manager: Applying update via notification');
                    this.notificationShown = false;
                    this.lastNotificationId = null;
                    this.pendingUpdateCallback?.();
                    this.pendingUpdateCallback = null;
                },
            },
            cancel: {
                label: laterLabel,
                onClick: () => {
                    console.log('Update Manager: Update dismissed by user');
                    this.notificationShown = false;
                    this.lastNotificationId = null;
                    this.pendingUpdateCallback = null;
                    onDismiss?.();
                },
            },
            duration: 15000,
            id: notificationId,
        });
    }

    hasActiveNotification(): boolean {
        return this.notificationShown && this.lastNotificationId !== null;
    }

    dismissCurrentNotification(): void {
        if (this.lastNotificationId) {
            toast.dismiss(this.lastNotificationId);
            this.lastNotificationId = null;
            this.notificationShown = false;
            this.pendingUpdateCallback = null;
        }
    }

    reset(): void {
        this.dismissCurrentNotification();
    }
}

export function useUpdateNotifications() {
    const managerRef = useRef(UpdateNotificationManager.getInstance());

    const showUpdateNotification = useCallback(
        (
            title: string,
            description: string,
            buttonLabel: string,
            laterLabel: string,
            updateCallback: () => void,
            onDismiss?: () => void
        ) => {
            managerRef.current.showUpdateNotification(
                title,
                description,
                buttonLabel,
                laterLabel,
                updateCallback,
                onDismiss
            );
        },
        []
    );

    const hasActiveNotification = useCallback(() => {
        return managerRef.current.hasActiveNotification();
    }, []);

    const dismissCurrentNotification = useCallback(() => {
        managerRef.current.dismissCurrentNotification();
    }, []);

    const resetNotifications = useCallback(() => {
        managerRef.current.reset();
    }, []);

    // Cleanup bei Komponenten-Unmount
    useEffect(() => {
        return () => {
            // Optional: Reset bei Seiten-Wechsel
            // managerRef.current.reset();
        };
    }, []);

    return {
        showUpdateNotification,
        hasActiveNotification,
        dismissCurrentNotification,
        resetNotifications,
    };
}
