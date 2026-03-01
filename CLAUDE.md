# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Session name:** `housewives-quiz-app`

## Project Overview

"Guess the Housewife" — a Real Housewives quote trivia game built with Vite + React + TypeScript. Users see a quote, guess which housewife said it, then reveal the answer (name, city, season, GIF). No backend; all data is client-side JSON.

## Commands

- `npm run dev` — start dev server (Vite, hot reload)
- `npm run build` — production build to `dist/`
- `npx tsc --noEmit` — type-check without emitting
- `npm run preview` — preview production build locally

## Architecture

- **`src/App.tsx`** — main game state: shuffled quote order, current index, reveal state. Fisher-Yates shuffle, reshuffles when all quotes are exhausted. Also owns `isCorrectGuess` logic and the Enter-key listener (advances to next quote when revealed).
- **`src/data/quotes.json`** — quote dataset (54 entries). Each entry: `id`, `quote`, `housewife`, `city`, optional `season`, optional `tenorId` (Tenor post ID string).
- **`src/components/`** — three components:
  - `QuoteCard` — displays quote text and progress counter
  - `GuessInput` — text input + submit/reveal buttons
  - `AnswerReveal` — shows answer name, city/season meta, full-width Tenor GIF embed, and Next Quote button. Does **not** handle guess result feedback (moved to `App.tsx`).
- **`src/types.ts`** — `Quote` interface

## Layout

- **Mobile**: single column — QuoteCard → GuessInput (pre-reveal) or guess-result badge → AnswerReveal (post-reveal), all stacked.
- **Desktop/tablet (≥768px, post-reveal)**: two-column row. Left panel: QuoteCard + guess-result badge. Right panel: AnswerReveal (name, GIF, Next button). The `.app` container widens to `1100px` only when the answer is revealed (`.app.revealed`).

## Guess Result Badge

Rendered in `App.tsx` inside the left panel, below the QuoteCard. Left-border card style:
- **Correct**: teal left border, 👑 crown emoji, "You got it!"
- **Incorrect**: red left border, SVG ✕ icon, "Not quite! You guessed "...""

`isCorrectGuess` lives in `App.tsx` (case-insensitive, accepts first name, last name, full name, or partial match via `includes`).

## Keyboard Shortcuts

- **Enter** (when answer is revealed) — advances to the next quote. Listener is attached/cleaned up via `useEffect` in `App.tsx`.

## Adding Quotes

Add entries to `src/data/quotes.json`. Set `tenorId` to the Tenor post ID from the embed code (`data-postid="..."`). The `tenorId` and `season` fields are optional — a placeholder is shown when `tenorId` is omitted, and the season line is hidden when `season` is omitted.

## Styling

Glam/Bravo-inspired theme: dark background (`#1a1118`), gold accents (`#c9a84c`), Playfair Display serif for headings, Inter for body. All CSS variables in `src/App.css` `:root`. No CSS framework — plain CSS.

Key layout details:
- Thin gold border (`rgba(201,168,76,0.35)`) below the header separates the title from the game area.
- `.answer-image` is `width: 100%` — the GIF fills the full right-panel width, matching the Next Quote button.
- `.app-header` has `width: 100%` so the border spans the full container.
