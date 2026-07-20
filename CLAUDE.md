# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static digital invitation ("Almi Mis XV") built with React + Vite + TypeScript. It's an npm workspaces monorepo with a single workspace, `frontend`. There is no backend — RSVP form submissions go directly to FormSubmit from the browser.

## Commands

Run from the repo root (npm workspaces):

```bash
npm install          # install deps for all workspaces
npm run dev           # start Vite dev server on http://localhost:8080
npm run build          # tsc typecheck + vite build (runs in frontend workspace)
npm run lint           # tsc --noEmit (there is no eslint config; "lint" is a typecheck)
```

These can also be run directly inside `frontend/` (e.g. `cd frontend && npm run dev`).

There is no test suite or test runner configured, despite `.github/workflows/ci.yml` invoking `npm run test` — that script does not exist in `package.json`, so CI will fail on that step until either a `test` script is added or the step is removed.

## Architecture

- **Single-event, config-driven design.** Nearly everything about the invitation (couple/event name, colors, fonts, location, dress code, gifts, RSVP recipient, countdown target, calendar details, Spotify playlist) is data-driven from `frontend/src/event.json`, typed by `EventConfig` in `frontend/src/types.ts`. To adapt this invitation for a different event, edit `event.json`, not the components.
- **Context, not props-drilling.** `EventContext` (`frontend/src/context/EventContext.tsx`) loads `event.json` and exposes it via `useEventConfig()`. `App.tsx` wraps everything in `EventProvider`, and `EventPage.tsx` is the sole place that reads the config and passes slices of it down to section components.
- **Page composition.** `frontend/src/pages/EventPage/EventPage.tsx` is the top-level layout: it assembles all section components in fixed order (FeaturedMedia, Countdown, Quote, Gallery, Location, DressCode, GiftSection, RSVP, Footer, FloatingMusic) inside `ThemeProvider` and `AnimationProvider`.
- **Theming via CSS variables.** `ThemeProvider` (`frontend/src/components/ThemeProvider/ThemeProvider.tsx`) takes `event.colors`/`event.typography` and sets them as CSS custom properties (`--color-primary`, `--font-heading`, etc.) on a wrapping `div`; component styles in `styles.css` consume those variables. There's no CSS-in-JS or theme object passed through props beyond this.
- **Animation defaults.** `AnimationProvider` wraps the page in Framer Motion's `MotionConfig` to set a shared transition (duration/easing) for all motion components, rather than each component configuring its own.
- **Music playback state.** `frontend/src/context/musicStore.ts` is a small Zustand store (`useMusicStore`) tracking background-music enabled/volume/user-interaction state, read by `FloatingMusic`. This is the only global client state outside of `EventContext`.
- **Assets are imported, not referenced by path.** Images/audio/video used in the page (e.g. gallery images, background music) live in `frontend/src/assets/events/almi/` and are imported as ES modules directly in `EventPage.tsx` (or the relevant component) so Vite fingerprints and bundles them correctly. Do not reference these assets via string paths.
- **RSVP + Calendar integration.** `frontend/src/utils/api.ts` has two responsibilities: `submitRsvp` POSTs form data to `https://formsubmit.co/ajax/<organizerEmail>` (organizer email comes from `event.json`'s `rsvp.organizerEmail`), and `createGoogleCalendarUrl` builds a "add to Google Calendar" URL client-side from `event.calendar` dates — no backend/API server is involved anywhere in this app.
- **Component folder convention.** Each component lives in its own directory under `frontend/src/components/<Name>/<Name>.tsx` (e.g. `components/RSVP/RSVP.tsx`), one component per folder.

## Deployment

`frontend/Dockerfile` builds the app (`npm run build`) and serves it via `vite preview` on port 8080. There's no separate static-file server config (e.g. nginx) in this repo.
