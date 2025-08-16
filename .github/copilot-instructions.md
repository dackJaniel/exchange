# Currency Exchange Calculator - AI Agent Instructions

## Project Overview

This is a **Currency Exchange Calculator PWA** built with Next.js 15, combining real-time currency conversion with calculator functionality. The app features a clean, dark design with full internationalization (i18n) support for English and German.

## Architecture & Key Concepts

### Core Structure

- **Next.js 15.4.6** with App Router (`src/app/` directory)
- **Tailwind CSS v4** with inline theme configuration (no separate config file)
- **TypeScript** with strict mode and absolute imports via `@/*` paths
- **Progressive Web App** targeting mobile-first design
- **Full Internationalization (i18n)** with React Context provider
- **SEO Optimization** with hreflang tags and multilingual sitemaps

### Design System

- **Color scheme**: Dark theme with black background, orange accents for interactive elements
- **Button layout**: Responsive grid layout with touch-optimized interactions
- **Typography**: System fonts with mono font for displays
- **Mobile-first**: Touch-optimized with haptic feedback support
- **Accessibility**: Screen reader support, proper ARIA labels, high contrast ratios

### Internationalization (i18n) System

- **Supported Languages**: English (default) and German
- **Architecture**: React Context provider with hooks (`useI18n`, `useTranslation`)
- **Browser Detection**: Automatic language detection with localStorage persistence
- **SEO Integration**: hreflang tags, multilingual sitemaps, locale-specific metadata
- **Dynamic Content**: All UI strings, metadata, and PWA manifest are translated

### State Management

- **Zustand**: Modern state management for calculator and currency operations
- **React Context**: i18n state management with persistence
- **Local Storage**: Language preferences, offline caching

## Development Patterns

### Tailwind CSS v4 Specifics

- Uses `@import "tailwindcss"` instead of separate directives
- Inline theme configuration in `globals.css` with `@theme inline`
- CSS variables for colors: `--color-background`, `--color-foreground`
- No separate `tailwind.config.ts` file - all config inline

### Component Architecture (Implemented)

```
src/components/
├── calculator/          # Calculator button component
├── currency/           # Currency selection, exchange rates, offline notices
├── layout/             # Display panel, keypad grid, navigation header
├── ui/                 # shadcn/ui components, language selector, share button
└── ServiceWorkerRegistration.tsx  # PWA service worker management
```

### File Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes (manifest generation)
│   ├── [locale]/       # Localized routes (datenschutz, impressum, etc.)
│   ├── sitemap.ts      # Multilingual sitemap generation
│   └── robots.ts       # SEO robots configuration
├── components/         # React components (see architecture above)
├── hooks/              # Custom React hooks (useAppUpdates, useOnlineStatus, etc.)
├── lib/
│   ├── i18n/          # Internationalization system
│   │   ├── config.ts   # Locale configuration and detection
│   │   ├── provider.tsx # React context provider
│   │   └── translations.ts # Translation dictionaries
│   ├── store/         # Zustand state management
│   └── utils.ts       # Utility functions
└── types/             # TypeScript type definitions
```

### State Management Strategy

- **Calculator State**: Display value, operations, history (Zustand)
- **Currency State**: Base/target currencies, exchange rates, caching (Zustand)
- **i18n State**: Language preferences, translations (React Context)
- **API Integration**: ExchangeRate-API with 15-min cache, offline fallback

## Installed Dependencies

### Production Dependencies

- **Next.js 15.4.6**: React framework with App Router
- **React 19.1.0**: Latest React version with concurrent features
- **Zustand 5.0.7**: Modern state management library
- **Tailwind CSS v4**: Latest version with inline configuration
- **Radix UI**: Accessible component primitives (Dialog, Popover, Select)
- **Lucide React**: Icon library
- **Sonner**: Toast notifications
- **Next Themes**: Theme management
- **CMDK**: Command palette component
- **Class Variance Authority**: Utility for component variants

### Development Tools

- **TypeScript 5**: Strict type checking
- **ESLint 9**: Modern flat config linting
- **Sharp**: Image optimization
- **PostCSS**: CSS processing

## Key Development Commands

```bash
# Development with Turbopack (faster)
npm run dev

# Standard build process
npm run build
npm run start

# Icon generation (automatic in prebuild)
npm run generate-icons

# Version management
npm run update-version

# Linting (ESLint flat config)
npm run lint

# Production deployment
npm run deploy
```

## Current Implementation Status

### ✅ Completed Features

- **Full Internationalization System**: English/German with automatic detection
- **PWA Implementation**: Service worker, manifest, offline support
- **SEO Optimization**: Multilingual sitemaps, hreflang tags, robots.txt
- **Component Architecture**: All major UI components implemented
- **State Management**: Zustand stores for calculator and currency operations
- **Responsive Design**: Mobile-first with touch optimization
- **Accessibility**: Screen reader support, proper ARIA labels

## File Patterns

### Component Styling

- Use standard Tailwind classes, avoid custom CSS
- Button variants: `bg-zinc-700` (numbers), `bg-orange-500` (operators), `bg-gray-400` (functions)
- Responsive sizing: `w-16 h-16 sm:w-20 sm:h-20` pattern
- Dark theme by default with CSS variables

### TypeScript Conventions

- Strict mode enabled
- Interface-based type definitions
- Absolute imports with `@/` prefix
- React 19 with latest type definitions

### Internationalization Patterns

- **Translation Keys**: Nested structure (`t.ui.button.clear`)
- **Hook Usage**: `useI18n()` for locale, `useTranslation()` for strings
- **Type Safety**: Full TypeScript support for translation keys
- **Context Provider**: Wrap app in `<I18nProvider>` for state management

## Critical Implementation Notes

1. **Mobile-first PWA**: All UI decisions prioritize mobile usability
2. **Calculator Logic**: Standard calculator behavior with operation chaining
3. **Currency Integration**: Live rates with offline caching strategy
4. **Performance**: Optimized re-renders, virtualized lists for currency selection
5. **Accessibility**: Screen reader support, proper ARIA labels for calculator
6. **SEO**: Multilingual support with proper hreflang tags and sitemaps
7. **i18n**: Full internationalization with automatic language detection

## Development Guidelines

### Adding New Components

1. Use `useTranslation()` hook for all user-facing strings
2. Add translation keys to both English and German dictionaries
3. Follow TypeScript patterns with proper type definitions
4. Ensure mobile-first responsive design
5. Add proper ARIA labels for accessibility

### Translation Management

- **Add new strings**: Update `src/lib/i18n/translations.ts`
- **Language detection**: Handled automatically by `detectLocale()`
- **SEO metadata**: Include both languages in meta tags
- **PWA manifest**: Use dynamic generation based on locale

## Next Steps for Enhancement

1. Complete currency API integration with caching
2. Implement calculator functionality with proper state management
3. Add haptic feedback for mobile interactions
4. Enhance PWA features (push notifications, background sync)
5. Add more languages as needed

Refer to `KONZEPT.md` for detailed design specifications, color codes, and complete implementation roadmap.

Refer to `KONZEPT.md` for detailed design specifications, color codes, and complete implementation roadmap.
