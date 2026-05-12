# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A Nuxt 4 SPA that calculates the maximum untracked exposure time for astrophotography, given a focal length and camera pixel size. The math lives entirely in `app/stores/calcStore.ts` as Pinia computed properties.

## Commands

```bash
pnpm dev          # start dev server (http://localhost:3000)
pnpm build        # production build
pnpm lint         # ESLint check
pnpm lint:fix     # ESLint auto-fix
pnpm format       # Prettier format
```

There are no tests. Pre-commit hooks (Husky + lint-staged) run `pnpm lint:fix` on `.js`, `.ts`, `.vue` files automatically.

## Tech stack

- **Nuxt 4** (`future.compatibilityVersion: 4`) with SSR enabled
- **@nuxt/ui** (v4) + **Tailwind CSS v4** for UI components and styling
- **Pinia** with `pinia-plugin-persistedstate` — store state persists across page loads
- **Valibot** for form validation on the main page
- **mise** manages Node (26) and pnpm (11) versions

## Architecture

All app code lives under `app/` (Nuxt 4 convention):

- `app/stores/calcStore.ts` — single Pinia store holding the two inputs (`focalLength`, `pixelSize`) and all derived computed values
- `app/pages/index.vue` — main calculator UI; reads/writes the store directly; camera presets are hardcoded here
- `app/pages/version.vue` — pre-rendered at build time; reads `NUXT_PUBLIC_IMAGE_TAG` (set via Docker `ARG IMAGE_TAG`)
- `app/components/nav/index.vue` — top navigation bar

The calculator UI is wrapped in `<ClientOnly>` because the store uses `pinia-plugin-persistedstate` (localStorage), which requires the browser.

## ESLint config

The project extends `@nuxt/eslint` and enforces `semi: never`. The generated `.nuxt/eslint.config.mjs` must exist before ESLint can run — run `pnpm postinstall` (or `nuxt prepare`) if it's missing.
