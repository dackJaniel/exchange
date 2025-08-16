'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Bell, BellOff, Settings, RotateCcw } from 'lucide-react';
import { pwaManager } from '@/lib/pwa-features';
import { useTranslation } from '@/lib/i18n/provider';
import { toast } from 'sonner';

export function NotificationSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [backgroundSyncSupported, setBackgroundSyncSupported] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    checkNotificationStatus();
    setBackgroundSyncSupported(
      pwaManager.backgroundSync.isBackgroundSyncSupported()
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
      console.error('Failed to check subscription status:', error);
    }
  };

  const handleEnableNotifications = async () => {
    setLoading(true);
    try {
      const permission =
        await pwaManager.notifications.requestNotificationPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        const subscription =
          await pwaManager.notifications.subscribeToPushNotifications();
        setIsSubscribed(!!subscription);

        if (subscription) {
          // Here you would typically send the subscription to your backend server
          console.log('Push subscription created:', subscription);

          toast.success(t.ui.notifications.enabled, {
            description: t.ui.notifications.enabledDescription,
          });

          // Show test notification
          await pwaManager.notifications.showLocalNotification({
            title: t.ui.notifications.testTitle,
            body: t.ui.notifications.testBody,
            tag: 'test-notification',
          });
        }
      } else {
        toast.error(t.ui.notifications.permissionDenied);
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
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
      if (success) {
        setIsSubscribed(false);
        toast.success(t.ui.notifications.disabled);
      } else {
        toast.error(t.ui.notifications.error);
      }
    } catch (error) {
      console.error('Failed to disable notifications:', error);
      toast.error(t.ui.notifications.error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableBackgroundSync = async () => {
    setLoading(true);
    try {
      await pwaManager.backgroundSync.syncExchangeRates();
      toast.success(t.ui.notifications.backgroundSyncEnabled, {
        description: t.ui.notifications.backgroundSyncDescription,
      });
    } catch (error) {
      console.error('Failed to enable background sync:', error);
      toast.error(t.ui.notifications.backgroundSyncError);
    } finally {
      setLoading(false);
    }
  };

  const handleTestNotification = async () => {
    setLoading(true);
    try {
      if (notificationPermission !== 'granted') {
        toast.error(t.ui.notifications.permissionRequired);
        return;
      }

      await pwaManager.notifications.showLocalNotification({
        title: t.ui.notifications.testTitle,
        body: t.ui.notifications.testBody,
        tag: 'test-notification',
        requireInteraction: false,
      });

      toast.success(t.ui.notifications.testSent);
    } catch (error) {
      console.error('Failed to send test notification:', error);
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
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='flex items-center gap-2'>
          <Settings className='h-4 w-4' />
          {t.ui.notifications.settings}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Bell className='h-5 w-5' />
            {t.ui.notifications.title}
          </DialogTitle>
          <DialogDescription>
            {t.ui.notifications.description}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Notification Permission Status */}
          <div className='rounded-lg border p-4'>
            <div className='flex items-center justify-between mb-3'>
              <div className='flex items-center gap-2'>
                {notificationPermission === 'granted' ? (
                  <Bell className='h-4 w-4 text-green-500' />
                ) : (
                  <BellOff className='h-4 w-4 text-gray-400' />
                )}
                <span className='font-medium'>
                  {t.ui.notifications.permission}
                </span>
              </div>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  notificationPermission === 'granted'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : notificationPermission === 'denied'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}>
                {notificationPermission === 'granted'
                  ? t.ui.notifications.granted
                  : notificationPermission === 'denied'
                  ? t.ui.notifications.denied
                  : t.ui.notifications.notRequested}
              </span>
            </div>

            <div className='flex gap-2'>
              {notificationPermission !== 'granted' ? (
                <Button
                  onClick={handleEnableNotifications}
                  disabled={loading || notificationPermission === 'denied'}
                  size='sm'
                  className='flex-1'>
                  {loading ? t.ui.loading : t.ui.notifications.enable}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleTestNotification}
                    disabled={loading}
                    variant='outline'
                    size='sm'
                    className='flex-1'>
                    {loading ? t.ui.loading : t.ui.notifications.test}
                  </Button>
                  <Button
                    onClick={handleDisableNotifications}
                    disabled={loading}
                    variant='destructive'
                    size='sm'
                    className='flex-1'>
                    {loading ? t.ui.loading : t.ui.notifications.disable}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Push Notifications Status */}
          {notificationPermission === 'granted' && (
            <div className='rounded-lg border p-4'>
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-2'>
                  <Bell className='h-4 w-4' />
                  <span className='font-medium'>
                    {t.ui.notifications.pushNotifications}
                  </span>
                </div>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    isSubscribed
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                  {isSubscribed
                    ? t.ui.notifications.active
                    : t.ui.notifications.inactive}
                </span>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                {t.ui.notifications.pushDescription}
              </p>
            </div>
          )}

          {/* Background Sync */}
          {backgroundSyncSupported && (
            <div className='rounded-lg border p-4'>
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-2'>
                  <RotateCcw className='h-4 w-4' />
                  <span className='font-medium'>
                    {t.ui.notifications.backgroundSync}
                  </span>
                </div>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                {t.ui.notifications.backgroundSyncDescription}
              </p>
              <Button
                onClick={handleEnableBackgroundSync}
                disabled={loading}
                variant='outline'
                size='sm'
                className='w-full'>
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
