'use client';

// DEAKTIVIERT: Diese Komponente wird durch AutoBackgroundUpdates ersetzt
// Die neue Komponente verhindert mehrfache Benachrichtigungen und
// führt Updates vollautomatisch im Hintergrund durch

export function AutoUpdateServiceWorker() {
  console.log(
    'AutoUpdateServiceWorker: Component is disabled - using AutoBackgroundUpdates instead'
  );
  return null;
}
