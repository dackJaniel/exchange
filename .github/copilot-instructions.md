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
- **Currency State**: Base/target currencies, exchange rates with 15-min cache, offline handling (Zustand)
- **i18n State**: Language preferences with automatic detection and localStorage persistence (React Context)
- **Online Status**: Smart offline detection with conservative approach and proper fallback (Custom Hook)
- **API Integration**: ExchangeRate-API with 10-second timeout, offline caching, and graceful degradation

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

- **Full Internationalization System**: English/German with automatic detection and localStorage persistence
- **PWA Implementation**: Service worker, manifest, offline support with proper fallback handling
- **SEO Optimization**: Multilingual sitemaps, hreflang tags, robots.txt
- **Component Architecture**: All major UI components implemented and translated
- **State Management**: Zustand stores for calculator and currency operations with offline caching
- **Responsive Design**: Mobile-first with touch optimization
- **Accessibility**: Screen reader support, proper ARIA labels
- **Offline-First Functionality**: Smart offline detection, cached data usage, proper error handling
- **Navigation UX**: Language selector moved to hamburger menu for better mobile experience
- **Currency Exchange**: Real-time rates with 15-minute caching and offline fallback
- **Pull-to-Refresh**: Smart refresh with offline detection and appropriate messaging

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
3. **Currency Integration**: Live rates with smart offline caching and 10-second API timeout
4. **Offline-First Architecture**: Conservative online detection, cached data prioritization, graceful degradation
5. **Performance**: Optimized re-renders, efficient state management, minimal API calls
6. **Accessibility**: Screen reader support, proper ARIA labels for calculator
7. **SEO**: Multilingual support with proper hreflang tags and sitemaps
8. **i18n**: Full internationalization with automatic detection and localStorage persistence
9. **Error Handling**: Context-specific error messages, offline-aware UI states
10. **UX Optimization**: Language selector in hamburger menu, clear offline indicators

## Development Guidelines

### Adding New Components

1. Use `useTranslation()` hook for all user-facing strings
2. Add translation keys to both English and German dictionaries
3. Follow TypeScript patterns with proper type definitions
4. Ensure mobile-first responsive design
5. Add proper ARIA labels for accessibility
6. Consider offline behavior and error states
7. Implement proper loading states and feedback

### Translation Management

- **Add new strings**: Update `src/lib/i18n/translations.ts` with type-safe keys
- **Language detection**: Handled automatically by `detectLocale()` with localStorage persistence
- **SEO metadata**: Include both languages in meta tags and manifests
- **PWA manifest**: Use dynamic generation based on locale
- **Navigation**: Language selector is located in hamburger menu

### Offline-First Development

- **API Calls**: Always check online status before making requests
- **Timeout Handling**: Use 10-second timeouts for all external requests
- **Caching Strategy**: 15-minute cache duration for exchange rates
- **Error Messages**: Provide context-specific messages for offline scenarios
- **State Management**: Clear loading states when going offline
- **User Feedback**: Show appropriate offline notices and indicators

## Recent Improvements (August 2025)

### ✅ Offline-Mode Fixes

- **Fixed offline status detection**: Conservative approach, no connectivity tests when browser reports offline
- **Eliminated endless loading**: API calls properly check online status before execution
- **Improved currency conversion**: Works immediately with cached data when offline
- **Enhanced error handling**: Context-specific error messages for different offline scenarios

### ✅ UX Enhancements

- **Language selector moved**: From main navigation to hamburger menu for better mobile UX
- **Complete translations**: All UI elements now available in English and German
- **Automatic language persistence**: Selected language is saved and restored automatically
- **Better offline feedback**: Clear indicators and notices for offline state

### ✅ Technical Improvements

- **API timeout implementation**: 10-second timeout for all external requests
- **Smart state management**: Loading states are cleared appropriately when going offline
- **Improved caching**: 15-minute cache duration with intelligent fallback strategies
- **Enhanced pull-to-refresh**: Offline-aware with appropriate messaging

## Known Issues & Limitations

- Service Worker updates only function when online
- Initial currency data download required for first-time usage
- Cache validity limited to 15 minutes for exchange rates
- Browser offline detection can sometimes be delayed

## Next Steps for Enhancement

1. ✅ ~~Complete offline functionality~~ - COMPLETED
2. ✅ ~~Implement proper error handling~~ - COMPLETED
3. ✅ ~~Add comprehensive translations~~ - COMPLETED
4. ✅ ~~Optimize navigation UX~~ - COMPLETED
5. Add haptic feedback for mobile interactions
6. Enhance PWA features (push notifications, background sync)
7. Add more currencies and exchange rate providers
8. Implement advanced calculator features

Refer to `KONZEPT.md` for detailed design specifications, `OFFLINE_TEST.md` for testing guidelines, and color codes for complete implementation roadmap.
