# Currency Exchange Calculator - AI Agent Instructions

## Project Overview

This is a **Currency Exchange Calculator PWA** built with Next.js 15, combining real-time currency conversion with calculator functionality. The app mimics an iOS calculator design with black background, orange operators, and circular buttons.

## Architecture & Key Concepts

### Core Structure

- **Next.js 15** with App Router (`src/app/` directory)
- **Tailwind CSS v4** with inline theme configuration (no separate config file)
- **TypeScript** with strict mode and absolute imports via `@/*` paths
- **Progressive Web App** targeting mobile-first design

### Design System (from KONZEPT.md)

- **Color scheme**: Black background (`#000000`), orange operators (`#ff9500`), dark gray numbers (`#333333`)
- **Button layout**: 4-column grid with circular buttons (20x20 base, responsive scaling)
- **Typography**: Mono font for display, right-aligned text
- **Mobile-first**: Touch-optimized 44px+ button targets

## Development Patterns

### Tailwind CSS v4 Specifics

- Uses `@import "tailwindcss"` instead of separate directives
- Inline theme configuration in `globals.css` with `@theme inline`
- CSS variables for colors: `--color-background`, `--color-foreground`
- No separate `tailwind.config.ts` file - all config inline

### Component Architecture (Planned)

```
src/components/
├── calculator/          # Button logic, keypad grid
├── currency/           # Currency selection, exchange rates
├── layout/             # Display panel, mobile container
└── ui/                 # shadcn/ui components (to be added)
```

### State Management Strategy

- **Calculator State**: Display value, operations, history
- **Currency State**: Base/target currencies, exchange rates, caching
- **API Integration**: ExchangeRate-API with 15-min cache, offline fallback

## Key Development Commands

```bash
# Development with Turbopack (faster)
npm run dev

# Standard build process
npm run build
npm run start

# Linting (ESLint flat config)
npm run lint
```

## Planned Dependencies (Not Yet Installed)

- `shadcn/ui` components for UI elements
- `zustand` for state management
- Currency exchange API integration
- PWA service worker configuration

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

## Critical Implementation Notes

1. **Mobile-first PWA**: All UI decisions prioritize mobile usability
2. **Calculator Logic**: Standard calculator behavior with operation chaining
3. **Currency Integration**: Live rates with offline caching strategy
4. **Performance**: Optimized re-renders, virtualized lists for currency selection
5. **Accessibility**: Screen reader support, proper ARIA labels for calculator

## Next Steps for Implementation

1. Install and configure `shadcn/ui`
2. Implement calculator button grid with exact design specifications
3. Add currency API integration with caching
4. Configure PWA manifest and service worker
5. Implement responsive breakpoints per design system

Refer to `KONZEPT.md` for detailed design specifications, color codes, and complete implementation roadmap.
