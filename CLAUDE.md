# CLAUDE.md

## Project overview
QuokkaTutor — AI character-based children's English learning platform.
Built with Express.js + TypeScript, deployed on Vercel. Frontend is vanilla HTML/CSS/JS.

## Tech stack
- **Runtime:** Node.js with ES modules (`"type": "module"`)
- **Framework:** Express 4
- **Language:** TypeScript (target ES2022, module NodeNext)
- **Package manager:** pnpm
- **Deployment:** Vercel (serverless)
- **AI Integration:** OpenClaw (local AI agent, `POST /openclaw/agent/tutor`)
- **Storage:** localStorage (MVP)

## Project structure
```
src/
  index.ts                — Express app entry point (default export)
  types/index.ts          — Shared TypeScript interfaces
  routes/
    pages.ts              — HTML page serving
    onboarding.ts         — POST /api/onboarding
    flashcards.ts         — GET /api/flashcards, POST /api/flashcards/progress
    typing.ts             — POST /api/typing/check
    chat.ts               — POST /api/chat
    report.ts             — POST /api/report/generate
  services/
    openclaw.ts           — OpenClaw HTTP client + fallback logic
    flashcard-data.ts     — Seed flashcard word data (50+ words)
    hint-generator.ts     — Typing game hint logic
  middleware/
    error-handler.ts      — Global error handler
components/               — HTML pages (home, onboarding, learn, flashcard, typing, chat, report)
public/
  style.css               — Duolingo-style CSS theme
  js/                     — Frontend JavaScript (storage, onboarding, flashcard, typing, chat, report, learn)
  audio/                  — Sound effects
```

## Commands
- `pnpm install` — Install dependencies

## Conventions
- Use ES module imports (no CommonJS `require`)
- `.js` extensions required in TypeScript imports (NodeNext resolution)
- `src/index.ts` default-exports the Express app for Vercel
- Static files served from `public/`
- HTML pages served from `components/`
- All OpenClaw calls have fallback responses (app never breaks if AI is down)
- Frontend state managed via localStorage (`QuokkaStorage` wrapper in `public/js/storage.js`)

## Environment variables
- `OPENCLAW_BASE_URL` — OpenClaw server URL (default: `http://localhost:3001`)
- `OPENCLAW_API_KEY` — OpenClaw API key
