# PWA Features Implementation

This document describes the enhanced PWA features that have been implemented in the Currency Exchange Calculator.

## Features Implemented

### 1. Push Notifications

- **Local Notifications**: Show notifications when exchange rates are updated
- **Background Notifications**: Notify users when background sync completes
- **Permission Management**: Request and manage notification permissions
- **Test Notifications**: Send test notifications to verify functionality

### 2. Background Sync

- **Automatic Rate Updates**: Sync exchange rates in the background when online
- **Offline Action Sync**: Placeholder for syncing offline actions (future feature)
- **Visibility Change Sync**: Trigger sync when the app becomes visible
- **Periodic Sync**: Register for periodic background updates (when supported)

### 3. Enhanced Service Worker

- **Push Event Handling**: Process incoming push notifications
- **Notification Click Handling**: Handle notification interactions
- **Background Sync Events**: Process background sync requests
- **Periodic Sync Support**: Register for periodic updates (experimental)

## Files Added/Modified

### New Files

- `src/lib/pwa-features.ts` - Core PWA functionality and managers
- `src/hooks/usePWAFeatures.ts` - React hooks for PWA features
- `src/components/ui/NotificationSettings.tsx` - UI for notification settings
- `src/components/AutomaticRateUpdates.tsx` - Auto-sync functionality
- `src/app/api/push-notifications/route.ts` - API endpoint for push notifications
- `.env.example` - Environment variables template

### Modified Files

- `public/sw.js` - Enhanced with push and sync event handlers
- `src/components/ServiceWorkerRegistration.tsx` - Initialize PWA features
- `src/components/layout/NavigationHeader.tsx` - Added notification settings
- `src/lib/i18n/translations.ts` - Added notification translations
- `src/app/page.tsx` - Added automatic rate updates component

## Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Generate VAPID keys using: npx web-push generate-vapid-keys
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key_here
VAPID_PRIVATE_KEY=your_vapid_private_key_here
VAPID_SUBJECT=mailto:your-email@example.com
```

### VAPID Keys Generation

To generate VAPID keys for push notifications:

1. Install web-push: `npm install -g web-push`
2. Generate keys: `npx web-push generate-vapid-keys`
3. Add the generated keys to your environment variables

## Usage

### Notification Settings

Users can access notification settings through the hamburger menu in the navigation header. The settings allow users to:

- Enable/disable push notifications
- Test notification functionality
- Enable background sync
- View permission status

### Automatic Features

The following features work automatically:

- **Background Sync**: Triggers when the app becomes visible and online
- **Auto Rate Updates**: Updates rates every 30 minutes when conditions are met
- **Push Notifications**: Shows notifications for background updates when the app is not visible

## Browser Support

### Push Notifications

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Limited support (requires user gesture)
- Mobile browsers: Varies by platform

### Background Sync

- Chrome/Edge: Full support
- Firefox: Limited support
- Safari: Not supported
- Mobile browsers: Chrome/Edge on Android

### Periodic Background Sync

- Chrome: Experimental (origin trial required)
- Other browsers: Not supported

## Security Considerations

1. **VAPID Keys**: Keep private keys secure and never expose them to the client
2. **Subscription Storage**: Store push subscriptions securely on your server
3. **Permission Requests**: Only request permissions when necessary
4. **Rate Limiting**: Implement rate limiting for push notification APIs

## Future Enhancements

1. **Server-Side Push**: Implement actual server-side push notifications
2. **Subscription Management**: Store and manage user subscriptions in a database
3. **Advanced Scheduling**: More sophisticated sync scheduling
4. **Rich Notifications**: Add images, buttons, and interactive features
5. **Analytics**: Track notification engagement and effectiveness

## Troubleshooting

### Common Issues

1. **Notifications Not Working**

   - Check browser permissions
   - Verify VAPID keys are configured
   - Ensure HTTPS connection

2. **Background Sync Not Triggering**

   - Check if browser supports background sync
   - Verify service worker registration
   - Check network connectivity

3. **Permission Denied**
   - Users must re-enable in browser settings
   - Clear site data and try again
   - Check if site is served over HTTPS

### Debug Mode

Enable debug logging by opening browser dev tools and checking the console for service worker logs prefixed with "SW:".
