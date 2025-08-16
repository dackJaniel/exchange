# App Update Strategien - Testing Guide

## 🚀 Verfügbare Update-Strategien

### 1. **Manuelle Updates mit Benachrichtigung** (Standard - empfohlen)

- **Datei**: `ServiceWorkerRegistration.tsx`
- **Verhalten**: Zeigt Toast-Benachrichtigung mit "Aktualisieren" Button
- **Vorteil**: Benutzer hat Kontrolle, keine unerwarteten Reloads

### 2. **Automatische Updates**

- **Datei**: `AutoUpdateServiceWorker.tsx`
- **Verhalten**: Lädt Updates automatisch im Hintergrund
- **Vorteil**: Immer neueste Version, nahtlose Experience

### 3. **Hook-basiert mit erweiterten Features**

- **Datei**: `useAppUpdates.ts`
- **Verhalten**: Flexible Update-Verwaltung mit Erinnerungen
- **Vorteil**: Vollständige Kontrolle über Update-UX

## 🛠️ Setup & Deployment

### Lokales Testing

1. **Service Worker Version erhöhen**:
   \`\`\`bash
   npm run update-version
   \`\`\`

2. **App builden und testen**:
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

3. **Update simulieren**:
   - Ändern Sie etwas in der App
   - Führen Sie erneut `npm run update-version` aus
   - Builden Sie die App erneut
   - Öffnen Sie die App im Browser -> Update-Notification erscheint

### Production Deployment

\`\`\`bash

# Automatisch Version inkrementieren und builden

npm run deploy

# Oder manuell:

npm run update-version
npm run build

# Deploy zu Ihrem Server (Vercel, Netlify, etc.)

\`\`\`

## 🔧 Welche Strategie verwenden?

### **Für Production** (empfohlen):

- Verwenden Sie `ServiceWorkerRegistration.tsx` für bessere UX
- Updates werden angezeigt, aber erst nach Benutzer-Bestätigung angewendet

### **Für interne Apps/Demos**:

- Verwenden Sie `AutoUpdateServiceWorker.tsx`
- Updates werden automatisch geladen

### **Für erweiterte Kontrolle**:

- Verwenden Sie `useAppUpdates.ts` Hook
- Implementieren Sie eigene Update-UI mit \`UpdateButton.tsx\`

## 📱 Testing auf verschiedenen Geräten

### Desktop:

1. Öffnen Sie Chrome DevTools
2. Gehen Sie zu Application > Service Workers
3. Klicken Sie "Update" um neue Versionen zu testen

### Mobile:

1. Installieren Sie die PWA auf dem Homescreen
2. Deployen Sie eine neue Version
3. Öffnen Sie die App -> Update-Notification erscheint

## 🚨 Wichtige Hinweise

- **Cache-Namen**: Jede neue Version sollte neue Cache-Namen haben
- **Service Worker**: Muss bei jeder App-Änderung aktualisiert werden
- **Testing**: Testen Sie Updates immer in einem Inkognito-Fenster
- **Offline**: Updates funktionieren auch offline (werden beim nächsten Online-Gang angewendet)

## 💡 Customization

Sie können die Update-Texte und -Verhalten in den entsprechenden Komponenten anpassen:

- **Toast-Nachrichten**: Ändern Sie die Texte in den \`toast()\` Aufrufen
- **Update-Intervall**: Ändern Sie die \`setInterval\` Zeiten
- **Auto-Update Delay**: Anpassen der \`setTimeout\` Werte
