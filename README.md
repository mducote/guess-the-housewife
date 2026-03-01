# Guess the Housewife

A Real Housewives quote trivia game. A quote is shown — guess which housewife said it, then reveal the answer with her name, franchise city, season, and a Tenor GIF.

Built with Vite + React + TypeScript. No backend — all data is client-side JSON.

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npx tsc --noEmit` | Type-check without emitting |

## How to Play

1. Read the quote displayed on screen
2. Type your guess in the input field — first name, last name, or full name all work
3. Hit **Submit** to check your answer, or **Reveal** to skip straight to the answer
4. After the answer is revealed, click **Next Quote** or press **Enter** to continue

## Project Structure

```
src/
  App.tsx              # Main game state, shuffle logic, guess validation
  App.css              # Global styles and CSS variables
  types.ts             # Quote interface
  data/
    quotes.json        # Quote dataset (54 entries)
  components/
    QuoteCard.tsx      # Displays the quote and progress counter
    GuessInput.tsx     # Text input, submit, and reveal buttons
    AnswerReveal.tsx   # Answer name, city/season meta, Tenor GIF, Next button
```

## Adding Quotes

Add entries to `src/data/quotes.json`. Each entry follows this shape:

```json
{
  "id": 55,
  "housewife": "Housewife Name",
  "quote": "The quote text",
  "city": "Franchise City",
  "season": 3,
  "tenorId": "12345678"
}
```

- `season` is optional — the season line is hidden when omitted
- `tenorId` is the Tenor post ID from a GIF embed code (`data-postid="..."`) — also optional; a placeholder is shown when omitted

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tenor](https://tenor.com/) GIF embeds
- Plain CSS (no framework) — glam/Bravo-inspired dark theme with gold accents
