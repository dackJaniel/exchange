"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useAutoUpdates } from "@/hooks/useAutoUpdates";

export function AutoBackgroundUpdates() {
  const {
    handleAutoUpdate,
    showUpdateCompleteNotification,
    checkForCompletedUpdate,
    resetAutoUpdates,
  } = useAutoUpdates();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log("Auto Background Updates: Initializing update listeners...");

      // Don't register service worker here - that's done in ServiceWorkerRegistration
      // Just get the existing registration and listen for updates
      navigator.serviceWorker.ready
        .then((registration) => {
          console.log("Auto Background Updates: SW ready");

          // Prüfe sofort auf wartende Updates
          if (registration.waiting) {
            console.log(
              "Auto Background Updates: Found waiting worker on ready",
            );
            handleAutoUpdate(registration);
            return;
          }

          // Lausche auf neue Updates
          registration.addEventListener("updatefound", () => {
            console.log("Auto Background Updates: Update found");
            const newWorker = registration.installing;

            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                console.log(
                  "Auto Background Updates: Worker state changed to:",
                  newWorker.state,
                );

                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  console.log(
                    "Auto Background Updates: New worker installed, starting auto update",
                  );
                  // Automatisches Update ohne Benutzerinteraktion
                  handleAutoUpdate(registration);
                }
              });
            }
          });

          // Regelmäßige Update-Checks (alle 2 Minuten)
          const updateCheckInterval = setInterval(() => {
            if (navigator.onLine) {
              console.log("Auto Background Updates: Checking for updates...");
              registration.update();
            }
          }, 120000);

          return () => {
            clearInterval(updateCheckInterval);
          };
        })
        .catch((error) => {
          console.error(
            "Auto Background Updates: Failed to get SW registration:",
            error,
          );
        });

      // Lausche auf Service Worker Nachrichten
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data?.type === "RATES_UPDATED") {
          toast.info("Wechselkurse aktualisiert", {
            duration: 3000,
          });
        } else if (event.data?.type === "APP_UPDATE_COMPLETE") {
          // Nur bei tatsächlichem App-Update eine Erfolgsmeldung zeigen
          console.log(
            "Auto Background Updates: Received app update complete signal",
          );
          showUpdateCompleteNotification();
        }
      });

      // Einmalige Prüfung beim App-Start auf abgeschlossene Updates
      // Warte kurz bis die App vollständig geladen ist
      setTimeout(() => {
        checkForCompletedUpdate();
      }, 1000);
    }

    return () => {
      // Cleanup beim Unmount
      resetAutoUpdates();
    };
  }, [
    handleAutoUpdate,
    showUpdateCompleteNotification,
    checkForCompletedUpdate,
    resetAutoUpdates,
  ]);

  return null;
}
