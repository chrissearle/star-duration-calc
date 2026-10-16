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
pnpm format:check # Prettier check (CI)
pnpm typecheck    # vue-tsc type check
```

There are no tests. Pre-commit hooks (Husky + lint-staged) run `pnpm lint:fix` on `.js`, `.ts`, `.vue` files automatically.

## Tech stack

- **Nuxt 4** (`future.compatibilityVersion: 4`) with SSR enabled
- **@nuxt/ui** (v4) + **Tailwind CSS v4** for UI components and styling
- **Pinia** for the calculator's reactive state
- **Valibot** for form validation on the main page
- **mise** manages Node (26) and pnpm (11) versions

## Architecture

All app code lives under `app/` (Nuxt 4 convention):

- `app/stores/calcStore.ts` — single Pinia store holding the two inputs (`focalLength`, `pixelSize`) and all derived computed values
- `app/pages/index.vue` — main calculator UI; reads/writes the store directly; camera presets are hardcoded here
- `app/pages/version.vue` — pre-rendered at build time; reads `NUXT_PUBLIC_IMAGE_TAG` (set via Docker `ARG IMAGE_TAG`)
- `app/components/nav/index.vue` — top navigation bar

## ESLint config

The project extends `@nuxt/eslint` with `eslint-plugin-prettier/recommended`: Prettier owns formatting (`.prettierrc`, no semicolons), so `pnpm lint` fails on formatting differences and `pnpm lint:fix` applies them. `pnpm format:check` covers the non-code files (CI runs it). The generated `.nuxt/eslint.config.mjs` must exist before ESLint can run — run `pnpm postinstall` (or `nuxt prepare`) if it's missing.

## Hosting

Nothing in the app may name a host it runs on or carry a site-specific id: no hardcoded URLs, no domain-specific config. The same image can run under another name (for staging, say), and everything deployment-specific comes from the deployment's env. The Flux manifests live in a separate repo; don't add k8s/Flux config here.

## Metrics and analytics

- **Prometheus:** `server/plugins/metrics.ts` serves `/metrics` on its own port (`runtimeConfig.metricsPort`, default 9090, `NUXT_METRICS_PORT`), which only Prometheus reaches; port 3000 answers `/metrics` with a 404. Series: the default `nodejs_*`/`process_*`, `app_build_info{version}` (from `NUXT_PUBLIC_IMAGE_TAG`) and `http_server_request_duration_seconds{method,route_group,status_code}`. `route_group` is a fixed set from `routeGroup()`, never the raw path, so bots probing random URLs can't grow the series count. Each 404 is logged as `[404] <method> <path> from <referer>`. Grafana: the shared "Nuxt Apps" dashboard.
- **Umami:** `app/plugins/umami.client.ts` fetches `/api/analytics` (`server/api/analytics.get.ts`), which answers with the server's `NUXT_UMAMI_WEBSITE_ID`, `NUXT_UMAMI_DOMAINS` (a JSON array) and `NUXT_UMAMI_SRC`. Without them it answers 204 and no tracker loads; the tracker is also skipped on a host that isn't in the domains. The plugin also sends `error-<status>` events with the path and referrer. The `scripts.registry.umamiAnalytics` entry in `nuxt.config.ts` (`trigger: false, proxy: false, bundle: false`) must stay: without it `@nuxt/scripts` bundles Umami Cloud's script at build time and sends to Umami Cloud.
- A page that throws a 404 must use `createError({ ..., fatal: true })`, or client-side navigation leaves a blank page and nothing is reported.
