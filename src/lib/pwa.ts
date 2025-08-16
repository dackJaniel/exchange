// PWA Utility Functions

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

interface WindowWithGtag extends Window {
    gtag?: (...args: unknown[]) => void;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

export function registerServiceWorker() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/',
                });

                console.log('SW registered: ', registration.scope);

                // Handle updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New version available
                                if (confirm('New version available! Reload to update?')) {
                                    window.location.reload();
                                }
                            }
                        });
                    }
                });

            } catch (error) {
                console.log('SW registration failed: ', error);
            }
        });
    }
}

export function setupInstallPrompt() {
    if (typeof window === 'undefined') return;

    let deferredPrompt: BeforeInstallPromptEvent | null = null;

    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('PWA install prompt available');
        e.preventDefault();
        deferredPrompt = e;

        // Show custom install button
        showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        hideInstallButton();
        deferredPrompt = null;

        // Track installation
        if (typeof window !== 'undefined' && 'gtag' in window) {
            (window as WindowWithGtag).gtag?.('event', 'pwa_install', {
                event_category: 'engagement',
                event_label: 'PWA Install',
            });
        }
    });

    // Custom install handler
    function showInstallButton() {
        const installButton = document.getElementById('install-button');
        if (installButton) {
            installButton.style.display = 'flex';
            installButton.addEventListener('click', handleInstallClick);
        }
    }

    function hideInstallButton() {
        const installButton = document.getElementById('install-button');
        if (installButton) {
            installButton.style.display = 'none';
            installButton.removeEventListener('click', handleInstallClick);
        }
    }

    async function handleInstallClick() {
        if (deferredPrompt) {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);

            if (outcome === 'accepted') {
                hideInstallButton();
            }

            deferredPrompt = null;
        }
    }
}

export function checkPWACapabilities() {
    if (typeof window === 'undefined') return {};

    const capabilities = {
        serviceWorker: 'serviceWorker' in navigator,
        notification: 'Notification' in window,
        pushManager: 'serviceWorker' in navigator && 'PushManager' in window,
        backgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
        webShare: 'share' in navigator,
        webShareTarget: 'serviceWorker' in navigator,
        installPrompt: false, // Will be set to true when beforeinstallprompt fires
    };

    console.log('PWA Capabilities:', capabilities);
    return capabilities;
}

export function isStandalone() {
    if (typeof window === 'undefined') return false;

    interface NavigatorWithStandalone extends Navigator {
        standalone?: boolean;
    }

    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as NavigatorWithStandalone).standalone === true ||
        document.referrer.includes('android-app://')
    );
}

export function trackPWAUsage() {
    if (typeof window === 'undefined') return;

    const isStandaloneApp = isStandalone();
    const installSource = isStandaloneApp ? 'installed_pwa' : 'browser';

    console.log('PWA Usage:', { installSource, isStandaloneApp });

    // Track with analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as WindowWithGtag).gtag?.('event', 'pwa_usage', {
            event_category: 'engagement',
            event_label: installSource,
            custom_map: { metric1: isStandaloneApp ? 1 : 0 },
        });
    }
}
