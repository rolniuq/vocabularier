# Vocaburarier — Agent Guidelines

## Project Overview

**Vocaburarier** is a personal IELTS vocabulary learning app built with **Next.js 16** (App Router). It helps users master IELTS Band 6.5+ vocabulary through active recall, spaced repetition (SM-2 algorithm), and multiple practice modes. All data is persisted client-side via `localStorage` — there is no backend.

## Tech Stack

| Layer       | Technology                                          |
|-------------|-----------------------------------------------------|
| Framework   | **Next.js 16.2.1** (App Router, `src/app/`)         |
| UI          | **React 19.2.4**, TypeScript 5                      |
| Styling     | **Tailwind CSS v4** via `@tailwindcss/postcss`      |
| State       | **Zustand 5** with `persist` middleware (localStorage) |
| IDs         | `uuid` v13                                          |
| Dates       | `date-fns` v4                                       |
| TTS         | Web Speech API (no external service)                |
| Fonts       | Geist Sans + Geist Mono (via `next/font/google`)    |
| Linting     | ESLint 9 + `eslint-config-next` (Core Web Vitals + TypeScript) |

<!-- BEGIN:nextjs-agent-rules -->
## ⚠️ Next.js 16 — This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.** Heed deprecation notices.

Key docs paths:
- App Router guides: `node_modules/next/dist/docs/01-app/`
- Getting started: `node_modules/next/dist/docs/01-app/01-getting-started/`
- Fonts: `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`
- CSS/Tailwind: `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- Server vs Client Components: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
<!-- END:nextjs-agent-rules -->

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Server Component) — fonts, metadata, html/body
│   ├── page.tsx                  # Home page ('use client') — main SPA with tab-based navigation
│   ├── globals.css               # Tailwind v4 import + CSS variables + custom scrollbar + focus styles
│   └── favicon.ico
├── components/                   # React components (all client-side)
│   ├── index.ts                  # Barrel exports
│   ├── WordCard.tsx              # Word display card with expandable details
│   ├── FlashCard.tsx             # Flip-card review with SRS quality rating
│   ├── QuizMode.tsx              # Multiple-choice quiz
│   ├── WritingPractice.tsx       # Fill-in-the-blank spelling practice
│   ├── StatsDisplay.tsx          # Statistics dashboard
│   ├── Achievements.tsx          # Milestone achievements display
│   ├── AddWordForm.tsx           # Form to add custom vocabulary
│   ├── SearchFilterBar.tsx       # Search + topic/difficulty filters
│   ├── ExportImport.tsx          # JSON export/import for vocabulary
│   ├── ThemeToggle.tsx           # Dark/Light theme switcher
│   ├── KeyboardShortcutsHelp.tsx # Shortcuts help modal
│   └── NotificationSettings.tsx  # Browser notification settings
├── hooks/                        # Custom React hooks
│   ├── index.ts                  # Barrel exports
│   ├── useHydration.ts           # SSR-safe hydration check (prevents localStorage access during SSR)
│   ├── useKeyboardShortcuts.ts   # Global keyboard shortcut handler
│   ├── useNotification.ts        # Browser Notification API + daily reminders
│   ├── useQuiz.ts                # Quiz state machine logic
│   ├── useSearchFilter.ts        # Search/filter state for word browsing
│   └── useTTS.ts                 # Text-to-speech hook wrapping Web Speech API
├── lib/                          # Core logic (framework-agnostic)
│   ├── store.ts                  # Zustand store — single source of truth for all app state
│   ├── srs.ts                    # SM-2 spaced repetition algorithm (calculateNextReview, getWordsDueForReview, etc.)
│   └── tts.ts                    # TextToSpeech singleton class using Web Speech API
├── data/                         # Static vocabulary datasets
│   ├── ielts-vocabulary.ts       # Primary IELTS word list (imported by store)
│   ├── awl-vocabulary.ts         # Academic Word List
│   └── extended-vocabulary.ts    # Extended vocabulary set
└── types/                        # TypeScript types
    ├── index.ts                  # Barrel exports
    └── vocabulary.ts             # Core types: Word, UserProgress, DailySession, Statistics, AppSettings, ReviewQuality
```

## Architecture & Conventions

### Single-Page App via App Router
- The app is essentially a **client-side SPA** living in `src/app/page.tsx` with tab-based navigation (`ViewMode` type). There is no file-based routing beyond the single page.
- `layout.tsx` is the only Server Component — it sets up fonts, metadata, and the HTML shell.
- **All other components are client-side** — most have `'use client'` or are imported by client components.

### State Management
- **Single Zustand store** (`useVocabularyStore`) manages everything: words, user progress, daily sessions, statistics, and settings.
- State is persisted to `localStorage` under key `'vocaburarier-storage'` via Zustand's `persist` middleware.
- The `useHydration` hook guards against SSR/hydration mismatches — always check `isHydrated` before accessing browser APIs.

### Spaced Repetition System (SRS)
- Implements the **SM-2 algorithm** (same as Anki).
- Quality ratings use the `ReviewQuality` enum (0-5 scale): BLACKOUT, INCORRECT, HARD, GOOD, EASY, PERFECT.
- Quality ≥ GOOD (3) counts as correct; below resets repetition count.
- Key functions: `calculateNextReview()`, `getWordsDueForReview()`, `sortByReviewPriority()`.

### Word Data Model
- Each `Word` has: id, word, phonetic (IPA), partOfSpeech, definition, examples[], synonyms[], antonyms[], collocations[], ieltsContext, difficulty (beginner/intermediate/advanced), topics[], source (official/user).
- User-added words get `source: 'user'`; built-in words are `source: 'official'`.

### Styling
- **Tailwind CSS v4** with the new `@import "tailwindcss"` syntax and `@theme inline` directive.
- Custom CSS variables for background/foreground colors with dark mode via `prefers-color-scheme`.
- Uses Tailwind's `dark:` variant extensively for dark mode support.

### Path Aliases
- `@/*` maps to `./src/*` (configured in `tsconfig.json`).

## Development Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Patterns to Follow

1. **Always use `'use client'`** for any component that uses hooks, state, or browser APIs.
2. **Guard browser APIs** with `useHydration` or `typeof window !== 'undefined'` checks.
3. **Import from barrel files** (`@/components`, `@/hooks`, `@/types`) when possible.
4. **Keep `lib/` framework-agnostic** — no React imports in `lib/` files.
5. **Use the existing Zustand store pattern** — add actions to `VocabularyStore` interface, implement in `create()`.
6. **Follow Tailwind v4 conventions** — `@theme inline` for design tokens, no `tailwind.config` file.
7. **Preserve existing comments and docstrings** when editing code.
