import { useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';

// Zentrale automatische Update-Verwaltung
class AutoUpdateManager {
    private static instance: AutoUpdateManager;
    private updateInProgress = false;
    private lastUpdateTimestamp = 0;
    private updateCompletedToastId: string | null = null;

    private constructor() { }

    static getInstance(): AutoUpdateManager {
        if (!AutoUpdateManager.instance) {
            AutoUpdateManager.instance = new AutoUpdateManager();
        }
        return AutoUpdateManager.instance;
    }

    async handleAutoUpdate(registration: ServiceWorkerRegistration): Promise<void> {
        // Verhindere mehrfache parallele Updates
        if (this.updateInProgress) {
            console.log('Auto Update Manager: Update bereits in Bearbeitung, überspringe...');
            return;
        }

        // Verhindere zu häufige Updates (mindestens 10 Sekunden Abstand)
        const now = Date.now();
        if (now - this.lastUpdateTimestamp < 10000) {
            console.log('Auto Update Manager: Update zu häufig, überspringe...');
            return;
        }

        this.updateInProgress = true;
        this.lastUpdateTimestamp = now;

        console.log('Auto Update Manager: Starting automatic background update...');

        try {
            // Verwerfe alle bestehenden Update-Toasts
            this.dismissAllUpdateToasts();

            if (registration.waiting) {
                // Update im Hintergrund anwenden
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });

                // Kurz warten bis Service Worker aktiviert ist
                await this.waitForActivation(registration);

                // Seite neu laden für das Update
                console.log('Auto Update Manager: Reloading page with new version...');
                window.location.reload();
            }
        } catch (error) {
            console.error('Auto Update Manager: Update failed:', error);
            this.updateInProgress = false;
        }
    }

    private async waitForActivation(registration: ServiceWorkerRegistration): Promise<void> {
        return new Promise((resolve) => {
            const checkActivation = () => {
                if (registration.active) {
                    console.log('Auto Update Manager: New service worker is active');
                    resolve();
                } else {
                    setTimeout(checkActivation, 100);
                }
            };
            checkActivation();
        });
    }

    showUpdateCompleteNotification(): void {
        // Verhindere mehrfache "Update erfolgreich" Nachrichten
        if (this.updateCompletedToastId) {
            toast.dismiss(this.updateCompletedToastId);
        }

        console.log('Auto Update Manager: Showing update complete notification');

        const toastId = `update-complete-${Date.now()}`;
        this.updateCompletedToastId = toastId;

        toast.success('App erfolgreich aktualisiert! ✨', {
            description: 'Die neueste Version ist jetzt verfügbar.',
            duration: 4000,
            id: toastId,
        });

        // Nach Anzeige der Benachrichtigung Reset
        setTimeout(() => {
            this.updateInProgress = false;
            this.updateCompletedToastId = null;
        }, 1000);
    }

    private dismissAllUpdateToasts(): void {
        // Verwerfe alle möglichen Update-Toast IDs
        const possibleToastIds = [
            'sw-update',
            'app-update',
            'update-available',
            'update-reminder',
        ];

        possibleToastIds.forEach(id => {
            toast.dismiss(id);
        });

        // Verwerfe auch Toasts mit Timestamp-basierten IDs (letzte 60 Sekunden)
        const now = Date.now();
        for (let i = 0; i < 600; i++) { // 60 Sekunden * 10 (100ms Intervalle)
            const timestamp = now - (i * 100);
            toast.dismiss(`sw-update-${timestamp}`);
            toast.dismiss(`update-complete-${timestamp}`);
        }
    }

    reset(): void {
        this.updateInProgress = false;
        this.updateCompletedToastId = null;
        this.dismissAllUpdateToasts();
    }
}

export function useAutoUpdates() {
    const managerRef = useRef(AutoUpdateManager.getInstance());

    const handleAutoUpdate = useCallback((registration: ServiceWorkerRegistration) => {
        managerRef.current.handleAutoUpdate(registration);
    }, []);

    const showUpdateCompleteNotification = useCallback(() => {
        managerRef.current.showUpdateCompleteNotification();
    }, []);

    const resetAutoUpdates = useCallback(() => {
        managerRef.current.reset();
    }, []);

    // Cleanup bei Komponenten-Unmount
    useEffect(() => {
        // Reset nur bei App-Close, nicht bei normalen Komponenten-Wechseln
        const handleBeforeUnload = () => {
            managerRef.current.reset();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return {
        handleAutoUpdate,
        showUpdateCompleteNotification,
        resetAutoUpdates,
    };
}
