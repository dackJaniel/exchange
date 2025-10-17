import { useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n/provider";

// Global locale access for update notifications

declare global {
  interface Window {
    __i18n_current_locale__?: string;
  }
}

// Zentrale automatische Update-Verwaltung
class AutoUpdateManager {
  private static instance: AutoUpdateManager;
  private updateInProgress = false;
  private lastUpdateTimestamp = 0;
  private updateCompletedToastId: string | null = null;
  private actualUpdateOccurred = false;

  private constructor() {}

  static getInstance(): AutoUpdateManager {
    if (!AutoUpdateManager.instance) {
      AutoUpdateManager.instance = new AutoUpdateManager();
    }
    return AutoUpdateManager.instance;
  }

  async handleAutoUpdate(
    registration: ServiceWorkerRegistration,
  ): Promise<void> {
    // Verhindere mehrfache parallele Updates
    if (this.updateInProgress) {
      console.log(
        "Auto Update Manager: Update bereits in Bearbeitung, überspringe...",
      );
      return;
    }

    // Verhindere zu häufige Updates (mindestens 10 Sekunden Abstand)
    const now = Date.now();
    if (now - this.lastUpdateTimestamp < 10000) {
      console.log("Auto Update Manager: Update zu häufig, überspringe...");
      return;
    }

    this.updateInProgress = true;
    this.lastUpdateTimestamp = now;

    console.log("Auto Update Manager: Starting automatic background update...");

    try {
      // Verwerfe alle bestehenden Update-Toasts
      this.dismissAllUpdateToasts();

      if (registration.waiting) {
        // Markiere, dass ein tatsächliches Update stattfindet
        this.actualUpdateOccurred = true;

        // Update im Hintergrund anwenden
        registration.waiting.postMessage({ type: "SKIP_WAITING" });

        // Kurz warten bis Service Worker aktiviert ist
        await this.waitForActivation(registration);

        // Benachrichtige Service Worker über erfolgreiches Update
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: "APP_UPDATE_COMPLETE",
          });
        }

        // Seite neu laden für das Update
        console.log("Auto Update Manager: Reloading page with new version...");

        // Speichere Update-Flag für nach dem Reload
        sessionStorage.setItem("app_update_completed", "true");

        window.location.reload();
      }
    } catch (error) {
      console.error("Auto Update Manager: Update failed:", error);
      this.updateInProgress = false;
      this.actualUpdateOccurred = false;
    }
  }

  private async waitForActivation(
    registration: ServiceWorkerRegistration,
  ): Promise<void> {
    return new Promise((resolve) => {
      const checkActivation = () => {
        if (registration.active) {
          console.log("Auto Update Manager: New service worker is active");
          resolve();
        } else {
          setTimeout(checkActivation, 100);
        }
      };
      checkActivation();
    });
  }

  showUpdateCompleteNotification(): void {
    // Prüfe ob tatsächlich ein Update stattgefunden hat
    const updateCompleted = sessionStorage.getItem("app_update_completed");

    if (!updateCompleted && !this.actualUpdateOccurred) {
      console.log(
        "Auto Update Manager: No actual update occurred, skipping notification",
      );
      return;
    }

    // Verhindere mehrfache "Update erfolgreich" Nachrichten
    if (this.updateCompletedToastId) {
      toast.dismiss(this.updateCompletedToastId);
    }

    console.log("Auto Update Manager: Showing update complete notification");

    const toastId = `update-complete-${Date.now()}`;
    this.updateCompletedToastId = toastId;

    // Get update message based on current locale
    const getUpdateMessage = () => {
      try {
        // Check current locale from global window
        const locale = window.__i18n_current_locale__;

        if (locale === "en") {
          return {
            title: "App successfully updated! ✨",
            description: "The newest version is now available.",
          };
        }
      } catch {
        // Continue to German fallback
      }

      // Default to German
      return {
        title: "App erfolgreich aktualisiert! ✨",
        description: "Die neueste Version ist jetzt verfügbar.",
      };
    };

    const message = getUpdateMessage();

    toast.success(message.title, {
      description: message.description,
      duration: 4000,
      id: toastId,
    });

    // Entferne Update-Flag nach Anzeige der Benachrichtigung
    sessionStorage.removeItem("app_update_completed");
    this.actualUpdateOccurred = false;

    // Nach Anzeige der Benachrichtigung Reset
    setTimeout(() => {
      this.updateInProgress = false;
      this.updateCompletedToastId = null;
    }, 1000);
  }

  checkForCompletedUpdate(): void {
    // Prüfe nur einmal beim App-Start, ob ein Update abgeschlossen wurde
    const updateCompleted = sessionStorage.getItem("app_update_completed");

    if (updateCompleted) {
      console.log(
        "Auto Update Manager: Detected completed update from previous session",
      );
      this.showUpdateCompleteNotification();
    }
  }

  private dismissAllUpdateToasts(): void {
    // Verwerfe alle möglichen Update-Toast IDs
    const possibleToastIds = [
      "sw-update",
      "app-update",
      "update-available",
      "update-reminder",
    ];

    possibleToastIds.forEach((id) => {
      toast.dismiss(id);
    });

    // Verwerfe auch Toasts mit Timestamp-basierten IDs (letzte 60 Sekunden)
    const now = Date.now();
    for (let i = 0; i < 600; i++) {
      // 60 Sekunden * 10 (100ms Intervalle)
      const timestamp = now - i * 100;
      toast.dismiss(`sw-update-${timestamp}`);
      toast.dismiss(`update-complete-${timestamp}`);
    }
  }

  reset(): void {
    this.updateInProgress = false;
    this.updateCompletedToastId = null;
    this.actualUpdateOccurred = false;
    this.dismissAllUpdateToasts();
    // Behalte sessionStorage für Update-Detection bei
  }
}

export function useAutoUpdates() {
  const managerRef = useRef(AutoUpdateManager.getInstance());
  const t = useTranslation();

  // Make current locale available globally for the manager
  useEffect(() => {
    // Get current locale from i18n context
    const currentLocale =
      typeof window !== "undefined"
        ? document.documentElement.lang || "de"
        : "de";
    window.__i18n_current_locale__ = currentLocale;
  }, [t]);

  const handleAutoUpdate = useCallback(
    (registration: ServiceWorkerRegistration) => {
      managerRef.current.handleAutoUpdate(registration);
    },
    [],
  );

  const showUpdateCompleteNotification = useCallback(() => {
    managerRef.current.showUpdateCompleteNotification();
  }, []);

  const checkForCompletedUpdate = useCallback(() => {
    managerRef.current.checkForCompletedUpdate();
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

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return {
    handleAutoUpdate,
    showUpdateCompleteNotification,
    checkForCompletedUpdate,
    resetAutoUpdates,
  };
}
