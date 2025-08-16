// Utility function to provide haptic feedback on supported devices
export const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light') => {
    // Check if device supports haptic feedback
    if ('vibrate' in navigator) {
        switch (type) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(20);
                break;
            case 'heavy':
                navigator.vibrate(50);
                break;
            case 'success':
                navigator.vibrate([10, 50, 10]);
                break;
            case 'warning':
                navigator.vibrate([25, 50, 25]);
                break;
            case 'error':
                navigator.vibrate([50, 100, 50]);
                break;
        }
    }

    // For iOS devices with Taptic Engine
    if ('Taptic' in window && (window as unknown as { Taptic?: unknown }).Taptic) {
        const taptic = (window as unknown as {
            Taptic: {
                impact: (type: string) => void;
                notification: (type: string) => void;
            }
        }).Taptic;
        switch (type) {
            case 'light':
                taptic.impact('light');
                break;
            case 'medium':
                taptic.impact('medium');
                break;
            case 'heavy':
                taptic.impact('heavy');
                break;
            case 'success':
                taptic.notification('success');
                break;
            case 'warning':
                taptic.notification('warning');
                break;
            case 'error':
                taptic.notification('error');
                break;
        }
    }
};
