# Update-Benachrichtigungen Optimierung

## Problem

Bei mehreren aufeinanderfolgenden Updates wurden mehrere Toast-Benachrichtigungen gleichzeitig angezeigt, was zu einer schlechten Benutzererfahrung führte.

## Lösung

### Neuer zentraler Update-Manager

**Datei**: `src/hooks/useUpdateNotifications.ts`

Der neue Hook `useUpdateNotifications` bietet eine zentrale Verwaltung aller Update-Benachrichtigungen:

- **Singleton-Pattern**: Nur eine Instanz des Update-Managers pro App
- **Letzte Benachrichtigung gewinnt**: Neue Updates verwerfen automatisch vorherige Benachrichtigungen
- **Eindeutige IDs**: Jede Benachrichtigung hat eine eindeutige ID mit Timestamp
- **Status-Tracking**: Verfolgt aktive Benachrichtigungen und verhindert Duplikate

### Funktionen

```typescript
const {
  showUpdateNotification, // Zeigt neue Update-Benachrichtigung
  hasActiveNotification, // Prüft ob bereits eine aktiv ist
  dismissCurrentNotification, // Verwirft aktuelle Benachrichtigung
  resetNotifications, // Reset aller Benachrichtigungen
} = useUpdateNotifications();
```

### Integrierte Komponenten

#### 1. ServiceWorkerRegistration.tsx

- Verwendet den zentralen Update-Manager
- Prüft vor jeder neuen Benachrichtigung auf aktive Notifications
- Automatische Bereinigung von Duplikaten

#### 2. useAppUpdates.ts

- Vollständig überarbeitet mit zentraler Verwaltung
- Intelligente Erinnerungen (5 Minuten später)
- Verhindert mehrfache Benachrichtigungen für das gleiche Update

#### 3. AutoUpdateServiceWorker.tsx

- Verwirft automatisch bestehende Benachrichtigungen bei Auto-Updates
- Saubere Integration mit dem zentralen System

## Verhalten

### Vor der Optimierung

```
[Update 1] → Toast 1: "Update verfügbar"
[Update 2] → Toast 2: "Update verfügbar" (zusätzlich zu Toast 1)
[Update 3] → Toast 3: "Update verfügbar" (zusätzlich zu Toast 1 & 2)
```

### Nach der Optimierung

```
[Update 1] → Toast 1: "Update verfügbar"
[Update 2] → Toast 1 wird verworfen → Toast 2: "Update verfügbar"
[Update 3] → Toast 2 wird verworfen → Toast 3: "Update verfügbar"
```

## Technische Details

### Update-Manager Features

1. **Automatische Verwerfung**: Neue Benachrichtigungen verwerfen automatisch alte
2. **Status-Tracking**: Verhindert das Anzeigen mehrerer gleichzeitiger Notifications
3. **Callback-Management**: Speichert Update-Callbacks zentral
4. **Console-Logging**: Detailliertes Logging für Debugging

### Backward-Kompatibilität

Alle bestehenden Komponenten funktionieren weiterhin, nutzen aber intern den neuen Manager:

- `ServiceWorkerRegistration` - Standard PWA Updates mit Benutzerinteraktion
- `AutoUpdateServiceWorker` - Automatische Updates ohne Benutzeraktion
- `useAppUpdates` - Programmatische Update-Kontrolle

## Testing

### Schneller Test für mehrfache Updates

1. **Terminal 1**: `npm run dev` - Starte Dev-Server
2. **Terminal 2**: Mehrfache Updates pushen:
   ```bash
   npm run update-version
   npm run update-version
   npm run update-version
   ```
3. **Ergebnis**: Nur die letzte Update-Benachrichtigung wird angezeigt

### Debug-Output

Der Manager loggt alle Aktionen:

```
Update Manager: Showing notification: sw-update-1692108123456
Update Manager: Dismissing previous notification: sw-update-1692108098765
Update Manager: Applying update via notification
```

## Migration

Keine Breaking Changes - alle bestehenden APIs bleiben funktionsfähig. Die Optimierung erfolgt transparent im Hintergrund.

## Fazit

✅ **Problem gelöst**: Nur noch eine Update-Benachrichtigung gleichzeitig
✅ **Bessere UX**: Klare, nicht verwirrende Update-Meldungen  
✅ **Zentrale Verwaltung**: Ein System für alle Update-Typen
✅ **Debugging**: Detailliertes Logging für bessere Nachverfolgung
