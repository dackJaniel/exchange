# Currency Exchange Calculator App - Konzept & Anleitung

## 📱 Projektübersicht

Eine moderne Next.js Progressive Web App (PWA) für Währungsumrechnung mit integriertem Taschenrechner. Die App kombiniert Echtzeit-Wechselkurse mit einer benutzerfreundlichen Rechenfunktion.

## 🎨 Design-Analyse (basierend auf Screenshot)

### Farbschema

- **Hintergrund**: Tiefschwarzes Theme (#000000)
- **Primärfarbe**: Orange (#ff9500) für Operatoren und Aktionen
- **Sekundärfarbe**: Dunkelgrau (#333333) für Zahlen
- **Textfarbe**: Weiß (#ffffff) für maximalen Kontrast
- **Akzent**: Hellgrau (#666666) für spezielle Funktionen

#### Phase 4: Polish & Deploy (Woche 5)

- [ ] Animationen mit Framer Motion
- [x] Performance Optimizations (Build erfolgreich, 142kB First Load)
- [ ] Testing (Unit & E2E)
- [ ] Deployment SetupElemente aus Screenshot

- **Großes Display**: Zeigt aktuellen Wert und Währung (1.000 CZK → 339,21 €)
- **Runde Buttons**: Kreisförmige Tasten in Grid-Layout
- **Operatoren rechts**: Division (÷), Multiplikation (×), Subtraktion (-), Addition (+), Equals (=)
- **Zahlenblock**: Standard 0-9 Layout
- **Spezialfunktionen**: AC (All Clear), +/-, % (Prozent)
- **Währungswechsel**: Pfeil-Icon für Währungstausch

## 🚀 Kern-Features

### 1. Währungsumrechner

- **Echtzeit-Kurse**: Automatischer Abruf über API (z.B. ExchangeRate-API, Fixer.io)
- **Multi-Währung**: Unterstützung für 20+ Hauptwährungen
- **Offline-Modus**: Letzte Kurse werden gecacht
- **Währungstausch**: Schneller Wechsel zwischen Basis- und Zielwährung

### 2. Taschenrechner-Funktionen

- **Grundoperationen**: +, -, ×, ÷
- **Erweiterte Funktionen**: Prozent, Vorzeichenwechsel
- **Speicher**: Zwischenergebnisse für komplexe Berechnungen
- **Verlauf**: Historie der letzten Berechnungen

### 3. Progressive Web App Features

- **Installierbar**: Kann wie native App installiert werden
- **Offline-fähig**: Service Worker für Offline-Funktionalität
- **Responsive**: Optimiert für alle Bildschirmgrößen
- **Touch-optimiert**: Große, fingerfreundliche Buttons

## 🛠 Technologie-Stack

### Frontend

```
Next.js 14+ (App Router)
├── shadcn/ui Components
├── Tailwind CSS (Dark Theme)
├── TypeScript
├── Framer Motion (Animationen)
└── PWA Features
```

### APIs & Services

```
Währungsdaten
├── ExchangeRate-API (kostenlos)
├── Fixer.io (Backup)
└── Local Storage (Caching)
```

### State Management

```
Zustand
├── Calculator State
├── Currency Rates
├── Settings & Preferences
└── Calculation History
```

## 📱 Komponenten-Architektur

### 1. Layout-Komponenten

```
src/components/layout/
├── MobileContainer.tsx     # Haupt-Container
├── DisplayPanel.tsx        # Oberes Display
├── KeypadGrid.tsx          # Button-Raster
└── StatusBar.tsx           # Währungsinfo
```

### 2. Taschenrechner-Komponenten

```
src/components/calculator/
├── CalculatorButton.tsx    # Einzelne Taste
├── NumberPad.tsx          # Zahlenblock
├── OperatorPad.tsx        # Operatoren
└── FunctionKeys.tsx       # AC, +/-, %
```

### 3. Währungs-Komponenten

```
src/components/currency/
├── CurrencySelector.tsx   # Währungsauswahl
├── ExchangeRate.tsx       # Kurs-Anzeige
├── CurrencySwap.tsx       # Tausch-Button
└── RateHistory.tsx        # Kursverlauf
```

### 4. Utility-Komponenten

```
src/components/ui/ (shadcn)
├── button.tsx
├── select.tsx
├── dialog.tsx
├── toast.tsx
└── loading-spinner.tsx
```

## 🎯 Benutzerinteraktion & Flow

### 1. Haupt-Workflow

```
1. App öffnen → Standardwährung (EUR/USD) / Merken welche Währungen das letzte mal verwendet wurden
2. Betrag eingeben → Live-Umrechnung
3. Währung wechseln → Sofortige Neuberechnung
4. Rechnen → Normale Taschenrechner-Logik
5. Ergebnis → In gewählter Währung anzeigen
```

### 2. Gesten & Bedienung

- **Tap**: Button-Eingabe
- **Long Press**: Erweiterte Funktionen
- **Swipe Links/Rechts**: Währungswechsel
- **Pull-to-Refresh**: Kurse aktualisieren

## 📊 Datenstruktur

### Calculator State

```typescript
interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation | null;
  waitingForNewValue: boolean;
  history: Calculation[];
}

interface Calculation {
  id: string;
  expression: string;
  result: number;
  timestamp: Date;
  currencies: {
    from: Currency;
    to: Currency;
    rate: number;
  };
}
```

### Currency State

```typescript
interface CurrencyState {
  baseCurrency: Currency;
  targetCurrency: Currency;
  rates: Record<string, number>;
  lastUpdated: Date;
  isLoading: boolean;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}
```

## 🎨 shadcn/ui Integration

### Custom Theme (dark)

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(0 0% 0%)', // Schwarz
        foreground: 'hsl(0 0% 100%)', // Weiß
        primary: {
          DEFAULT: 'hsl(24 100% 50%)', // Orange
          foreground: 'hsl(0 0% 0%)', // Schwarz auf Orange
        },
        secondary: {
          DEFAULT: 'hsl(0 0% 20%)', // Dunkelgrau
          foreground: 'hsl(0 0% 100%)', // Weiß
        },
      },
    },
  },
};
```

### Komponenten-Konfiguration

```
shadcn/ui Components:
├── Button (customized für Taschenrechner)
├── Select (Währungsauswahl)
├── Dialog (Einstellungen, Verlauf)
├── Toast (Fehlermeldungen, Updates)
├── Badge (Währungskennzeichen)
└── Skeleton (Loading States)
```

## 🎨 TailwindCSS Integration & Styling

### Installation & Konfiguration

```bash
# TailwindCSS Installation (bereits mit Next.js installiert)
npm install -D @tailwindcss/forms
```

### Standard Tailwind Konfiguration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Nur shadcn/ui CSS Variablen - keine custom colors
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
```

### Component Styling mit Standard Tailwind

#### 1. Calculator Button Styling (nur Standard-Klassen)

```tsx
// CalculatorButton.tsx - Nur Standard Tailwind Classes
const buttonVariants = {
  // Zahlen-Buttons (dunkelgrau wie im Screenshot)
  number: `
    w-20 h-20 
    bg-zinc-700 hover:bg-zinc-600
    text-white text-xl font-medium
    rounded-full
    shadow-lg active:shadow-md
    transition-all duration-100
    active:scale-95
    border border-zinc-600
  `,

  // Operator-Buttons (orange wie im Screenshot)
  operator: `
    w-20 h-20
    bg-orange-500 hover:bg-orange-400
    text-black text-xl font-semibold
    rounded-full
    shadow-lg active:shadow-md
    transition-all duration-100
    active:scale-95
    border border-orange-400
  `,

  // Funktions-Buttons (hellgrau)
  function: `
    w-20 h-20
    bg-gray-400 hover:bg-gray-300
    text-black text-lg font-medium
    rounded-full
    shadow-lg active:shadow-md
    transition-all duration-100
    active:scale-95
    border border-gray-300
  `,

  // Zero-Button (breiter)
  zero: `
    col-span-2 
    px-8
    bg-zinc-700 hover:bg-zinc-600
    text-white text-xl font-medium
    rounded-full
    shadow-lg active:shadow-md
    transition-all duration-100
    active:scale-95
    border border-zinc-600
  `,
};
```

#### 2. Display Panel Styling

```tsx
// DisplayPanel.tsx - Standard Tailwind
const displayClasses = `
  w-full 
  bg-black
  rounded-xl
  shadow-xl
  p-8 mb-6
  border border-zinc-800
`;

const primaryDisplayClasses = `
  text-5xl font-light
  text-white text-right
  tracking-wider
  transition-all duration-200
  font-mono
`;

const secondaryDisplayClasses = `
  text-lg
  text-zinc-400 text-right
  mt-2
  font-mono
`;

const currencyDisplayClasses = `
  text-sm
  text-zinc-500 text-right
  mt-1
  uppercase tracking-wide
`;
```

#### 3. Layout Grid Styling

```tsx
// KeypadGrid.tsx - Standard Grid
const keypadGridClasses = `
  grid grid-cols-4 gap-4
  p-6
  max-w-sm mx-auto
  bg-black
`;

// Container für die gesamte App
const appContainerClasses = `
  min-h-screen 
  bg-black 
  flex flex-col
  justify-end
  px-4 py-8
`;
```

### Responsive Design mit Standard Breakpoints

```tsx
// Mobile-First Responsive Classes
const responsiveButtonSizes = {
  // Mobile (default)
  mobile: 'w-16 h-16 text-lg',

  // Small screens (sm:)
  small: 'sm:w-18 sm:h-18 sm:text-xl',

  // Medium screens (md:)
  medium: 'md:w-20 md:h-20 md:text-2xl',

  // Large screens (lg:)
  large: 'lg:w-22 lg:h-22 lg:text-2xl',
};

// Kombiniert für vollständige Responsive-Klasse
const fullResponsiveButton = `
  w-16 h-16 text-lg
  sm:w-18 sm:h-18 sm:text-xl
  md:w-20 md:h-20 md:text-2xl
  lg:w-22 lg:h-22 lg:text-2xl
`;
```

### Dark Theme mit Standard Tailwind

```css
/* globals.css - Nur Standard Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Standard shadcn/ui CSS Variablen */
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}

/* App auf dark theme setzen */
html {
  @apply dark;
}

body {
  @apply bg-black text-white;
}
```

### Utility Classes mit Standard Tailwind

```tsx
// Häufig verwendete Standard-Tailwind-Kombinationen
export const tailwindUtils = {
  // Container Styles
  appContainer: 'min-h-screen bg-black flex flex-col justify-end px-4 py-8',
  displayContainer:
    'w-full bg-black rounded-xl shadow-xl p-8 mb-6 border border-zinc-800',

  // Button Base Classes
  buttonBase:
    'rounded-full shadow-lg active:shadow-md transition-all duration-100 active:scale-95',

  // Button Variants (Standard Farben)
  numberButton: 'bg-zinc-700 hover:bg-zinc-600 text-white border-zinc-600',
  operatorButton:
    'bg-orange-500 hover:bg-orange-400 text-black border-orange-400',
  functionButton: 'bg-gray-400 hover:bg-gray-300 text-black border-gray-300',

  // Sizes
  buttonSize: 'w-20 h-20 text-xl font-medium',
  buttonSizeResponsive:
    'w-16 h-16 text-lg sm:w-18 sm:h-18 sm:text-xl md:w-20 md:h-20 md:text-2xl',

  // Display Text
  primaryDisplay:
    'text-5xl font-light text-white text-right tracking-wider font-mono',
  secondaryDisplay: 'text-lg text-zinc-400 text-right mt-2 font-mono',
  currencyDisplay:
    'text-sm text-zinc-500 text-right mt-1 uppercase tracking-wide',

  // Grid Layouts
  buttonGrid: 'grid grid-cols-4 gap-4 p-6 max-w-sm mx-auto',
  currencySelector: 'grid grid-cols-2 gap-4 p-4',

  // States (Standard Tailwind)
  loading: 'animate-pulse opacity-50',
  disabled: 'opacity-50 cursor-not-allowed',
  active: 'ring-2 ring-orange-500 ring-offset-2 ring-offset-black',
};
```

### Standard Tailwind Farbpalette

```tsx
// Verwendete Standard-Farben basierend auf Screenshot
const colorPalette = {
  // Hintergrunde
  appBackground: 'bg-black', // #000000
  displayBackground: 'bg-black', // Display Panel

  // Buttons
  numberButton: 'bg-zinc-700', // Dunkelgrau #374151
  operatorButton: 'bg-orange-500', // Orange #f97316
  functionButton: 'bg-gray-400', // Hellgrau #9ca3af

  // Hover States
  numberHover: 'hover:bg-zinc-600', // #4b5563
  operatorHover: 'hover:bg-orange-400', // #fb923c
  functionHover: 'hover:bg-gray-300', // #d1d5db

  // Text
  primaryText: 'text-white', // #ffffff
  secondaryText: 'text-zinc-400', // #9ca3af
  operatorText: 'text-black', // #000000 auf Orange

  // Borders
  border: 'border-zinc-800', // #1f2937
  buttonBorder: 'border-zinc-600', // #4b5563
};
```

## ⚡ Performance & Optimierung

### 1. API-Optimierung

- **Caching**: 15-Minuten Cache für Wechselkurse
- **Batch Requests**: Alle Kurse in einem Request
- **Fallback**: Offline-Modus mit letzten Kursen

### 2. UI-Performance

- **Virtual Scrolling**: Für lange Listen
- **Lazy Loading**: Komponenten nach Bedarf
- **Optimized Re-renders**: Memo für Calculator Buttons

### 3. PWA-Optimierung

- **Service Worker**: Aggressive Caching-Strategie
- **App Shell**: Instant Loading Architecture
- **Background Sync**: Kurse im Hintergrund aktualisieren

## 📱 Mobile-First Considerations

### Responsive Breakpoints

```css
/* Mobile First - wie im Screenshot */
sm: 640px   /* Größere Phones */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
```

### Touch Optimizations

- **Button Größe**: Minimum 44px (iOS Standard)
- **Spacing**: Ausreichend Abstand zwischen Buttons
- **Feedback**: Haptic/Visual Feedback bei Tap
- **Accessibility**: Screen Reader Support

## 🔧 Implementierungs-Phasen

### Phase 1: Core Calculator (Woche 1-2)

- [x] Basic Next.js Setup mit shadcn/ui
- [x] Calculator Logic Implementation (Zustand Store mit Persistierung)
- [x] UI Layout wie im Screenshot (schwarzes Theme, runde Buttons)
- [x] Button Grid & Interactions (vollständiges Keypad)

### Phase 2: Currency Features (Woche 3)

- [x] API Integration (ExchangeRate-API mit 15-Min Cache)
- [x] Currency Selection Interface (CurrencyCombobox mit 11 Währungen)
- [x] Real-time Conversion Logic (automatische Umrechnung)
- [x] Error Handling & Loading States (Toasts, Offline Fallback)

### Phase 3: Advanced Features (Woche 4)

- [x] Calculation History (persistiert in Local Storage)
- [x] Settings & Preferences (Währungsauswahl wird gespeichert)
- [x] Offline Support (Service Worker, gecachte Wechselkurse)
- [x] PWA Configuration (vollständige Manifest.json)

### Phase 4: Polish & Deploy (Woche 5)

- [ ] Animations mit Framer Motion
- [ ] Performance Optimizations
- [ ] Testing (Unit & E2E)
- [ ] Deployment Setup

## 🧪 Testing Strategy

### Unit Tests

```
src/lib/
├── calculator.test.ts     # Calculator Logic
├── currency.test.ts       # Currency Conversion
└── utils.test.ts          # Helper Functions
```

### Component Tests

```
src/components/__tests__/
├── Calculator.test.tsx
├── CurrencySelector.test.tsx
└── Button.test.tsx
```

### E2E Tests

```
Basic User Flows:
1. Enter number → See result
2. Change currency → See conversion
3. Perform calculation → Get result
4. Work offline → Use cached rates
```

## 📦 Deployment & Distribution

### PWA Distribution

- **Android**: Add to Home Screen

## 💡 Zukünftige Erweiterungen

## 📋 Entwicklungs-Checkliste

### Setup

- [x] Next.js Projekt initialisiert
- [x] shadcn/ui installiert und konfiguriert
- [x] Tailwind mit Custom Theme (TailwindCSS v4 mit inline theme)
- [x] TypeScript Konfiguration
- [x] ESLint & Prettier Setup

### Development

- [x] Calculator Logic implementiert (Zustand Store)
- [x] Currency API integriert (mit Caching & Offline Support)
- [x] UI Komponenten erstellt (alle Komponenten vorhanden)
- [x] Responsive Design getestet (Mobile-first Design)
- [x] PWA Features hinzugefügt (Manifest, Service Worker)

### Testing & Quality

- [ ] Unit Tests geschrieben
- [ ] Component Tests erstellt
- [ ] E2E Tests implementiert
- [x] Performance optimiert (Build erfolgreich, optimiert)
- [ ] Accessibility überprüft

### Deployment

- [ ] Vercel Setup konfiguriert
- [ ] Environment Variables gesetzt
- [x] PWA Manifest erstellt
- [x] Service Worker implementiert
- [ ] Analytics integriert

---

## 🚀 Quick Start Guide

1. **Installation**:

   ```bash
   npm install
   npm run dev
   ```

2. **shadcn/ui Setup**:

   ```bash
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button select dialog sonner
   ```

3. **API Key Setup**:

   ```bash
   # .env.local
   EXCHANGE_API_KEY=your_api_key_here
   ```

4. **Development**:
   ```bash
   npm run dev      # Development Server
   npm run build    # Production Build
   npm run test     # Run Tests
   ```

Dieses Konzept bildet die Grundlage für eine professionelle, mobile-optimierte Währungsumrechner-App mit modernem Design und ausgezeichneter User Experience.
