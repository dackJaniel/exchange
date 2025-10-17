"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bell, BellOff, Settings, RotateCcw } from "lucide-react";
import { pwaManager } from "@/lib/pwa-features";
import { useTranslation } from "@/lib/i18n/provider";
import { toast } from "sonner";

export function NotificationSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [backgroundSyncSupported, setBackgroundSyncSupported] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    checkNotificationStatus();
    setBackgroundSyncSupported(
      pwaManager.backgroundSync.isBackgroundSyncSupported(),
    );
  }, []);

  const checkNotificationStatus = async () => {
    if (!pwaManager.notifications.isNotificationSupported()) {
      return;
    }

    const permission = pwaManager.notifications.getNotificationPermission();
    setNotificationPermission(permission);

    // Check if already subscribed to push notifications
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error("Failed to check subscription status:", error);
    }
  };

  const handleEnableNotifications = async () => {
    setLoading(true);
    try {
      const permission =
        await pwaManager.notifications.requestNotificationPermission();
      setNotificationPermission(permission);

      if (permission === "granted") {
        const subscription =
          await pwaManager.notifications.subscribeToPushNotifications();
        setIsSubscribed(!!subscription);

        if (subscription) {
          // Here you would typically send the subscription to your backend server
          console.log("Push subscription created:", subscription);

          toast.success(t.ui.notifications.enabled, {
            description: t.ui.notifications.enabledDescription,
          });

          // Show test notification
          await pwaManager.notifications.showLocalNotification({
            title: t.ui.notifications.testTitle,
            body: t.ui.notifications.testBody,
            tag: "test-notification",
          });
        }
      } else {
        toast.error(t.ui.notifications.permissionDenied);
      }
    } catch (error) {
      console.error("Failed to enable notifications:", error);
      toast.error(t.ui.notifications.error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setLoading(true);
    try {
      const success =
        await pwaManager.notifications.unsubscribeFromPushNotifications();
      // Always set to false and show success - if no subscription exists, that's fine
      setIsSubscribed(false);
      toast.success(t.ui.notifications.disabled);
    } catch (error) {
      console.error("Failed to disable notifications:", error);
      toast.error(t.ui.notifications.error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableBackgroundSync = async () => {
    setLoading(true);
    try {
      await pwaManager.backgroundSync.syncExchangeRates();
      // Show success toast for manual user action
      toast.success(t.ui.notifications.backgroundSyncEnabled, {
        description: t.ui.notifications.backgroundSyncDescription,
      });
    } catch (error) {
      console.error("Failed to enable background sync:", error);
      // Show error toast for manual user action
      toast.error(t.ui.notifications.backgroundSyncError);
    } finally {
      setLoading(false);
    }
  };

  const handleTestNotification = async () => {
    setLoading(true);
    try {
      if (notificationPermission !== "granted") {
        toast.error(t.ui.notifications.permissionRequired);
        return;
      }

      await pwaManager.notifications.showLocalNotification({
        title: t.ui.notifications.testTitle,
        body: t.ui.notifications.testBody,
        tag: "test-notification",
        requireInteraction: false,
      });

      toast.success(t.ui.notifications.testSent);
    } catch (error) {
      console.error("Failed to send test notification:", error);
      toast.error(t.ui.notifications.testError);
    } finally {
      setLoading(false);
    }
  };

  if (!pwaManager.notifications.isNotificationSupported()) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="m-0" asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-white hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-zinc-800 justify-start"
        >
          <Settings className="h-4 w-4 mr-3" />
          <span className="truncate">{t.ui.notifications.settings}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{t.ui.notifications.title}</span>
          </DialogTitle>
          <DialogDescription className="text-sm">
            {t.ui.notifications.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Notification Permission Status */}
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {notificationPermission === "granted" ? (
                  <Bell className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <BellOff className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-sm block leading-tight">
                    {t.ui.notifications.permission}
                  </span>
                </div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                  notificationPermission === "granted"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : notificationPermission === "denied"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {notificationPermission === "granted"
                  ? t.ui.notifications.granted
                  : notificationPermission === "denied"
                    ? t.ui.notifications.denied
                    : t.ui.notifications.notRequested}
              </span>
            </div>

            <div className="flex gap-2">
              {notificationPermission !== "granted" ? (
                <Button
                  onClick={handleEnableNotifications}
                  disabled={loading || notificationPermission === "denied"}
                  size="sm"
                  className="flex-1 text-xs h-8"
                >
                  {loading ? t.ui.loading : t.ui.notifications.enable}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleTestNotification}
                    disabled={loading}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs h-8"
                  >
                    {loading ? t.ui.loading : t.ui.notifications.test}
                  </Button>
                  <Button
                    onClick={handleDisableNotifications}
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    className="flex-1 text-xs h-8"
                  >
                    {loading ? t.ui.loading : t.ui.notifications.disable}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Push Notifications Status */}
          {notificationPermission === "granted" && (
            <div className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Bell className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-sm block leading-tight">
                      {t.ui.notifications.pushNotifications}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                    isSubscribed
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  }`}
                >
                  {isSubscribed
                    ? t.ui.notifications.active
                    : t.ui.notifications.inactive}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.ui.notifications.pushDescription}
              </p>
            </div>
          )}

          {/* Background Sync */}
          {backgroundSyncSupported && (
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3 mb-3">
                <RotateCcw className="h-4 w-4 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-sm block leading-tight">
                    {t.ui.notifications.backgroundSync}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                {t.ui.notifications.backgroundSyncDescription}
              </p>
              <Button
                onClick={handleEnableBackgroundSync}
                disabled={loading}
                variant="outline"
                size="sm"
                className="w-full text-xs h-8"
              >
                {loading
                  ? t.ui.loading
                  : t.ui.notifications.enableBackgroundSync}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
