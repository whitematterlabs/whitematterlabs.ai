# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for **White Matter Labs** and its product **PAI** (Personal AI). A single-page
Next.js 14 App Router site whose visual identity is carried by two custom-shader React Three Fiber
scenes skinned in the brand "spectrum." Not a product app — there is no backend, no data layer, and
the email form `action="#"` is a placeholder.

## Commands

```bash
pnpm install
pnpm dev      # dev server on http://localhost:3000
pnpm build    # production build (run this to typecheck — tsconfig is noEmit)
pnpm start    # serve the production build
pnpm lint     # next lint
```

There are no tests. `pnpm build` is the closest thing to a CI gate (it runs the type checker).
pnpm is the package manager (`pnpm-lock.yaml`); don't introduce npm/yarn lockfiles.

## Architecture

The entire page is `app/page.tsx` — one server component composing stacked `<section>`s (hero, PAI,
approach, research, CTA, footer). Section content (ethos, principles, stats, footer columns) lives in
plain arrays at the top of that file; edit copy there. `app/layout.tsx` wires Geist fonts and global
metadata.

Three client components are interactive (`"use client"`): `Nav` (scroll-driven white→ink color
inversion over the hero), `GradientFlow`, and `PaiOrb`. Everything else is static markup.

### The 3D layer (the heart of the site)

Two R3F scenes, both sharing the same 8-stop `SPECTRUM` color array (duplicated in each file — keep
them in sync if you retune colors):

- **`GradientFlow.tsx`** — full-bleed hero/CTA backdrop. A 220×220 plane displaced by
  domain-warped Ashima simplex noise (vertex shader) and swept through the spectrum (fragment shader).
  Tracks the pointer via a lerped `uMouse` uniform. Used twice (hero + CTA section).
- **`PaiOrb.tsx`** — a spectral **orbit system** of solid meshes: a spinning central sphere that
  sweeps the full spectrum, with three smaller single-hue spheres revolving along thin gray orbit
  rings on a tilted ecliptic (the middle orbiter has its own Saturn-style ring). Soft flat-gradient
  shading via small `ShaderMaterial`s, no lighting. (Note: the README is stale — the code is the
  source of truth; it is discrete sphere/ring meshes, not the old points/splat system.)

**WebGL is treated as optional.** Every `Canvas` is wrapped by `SafeCanvas.tsx`, which feature-detects
a WebGL context and provides a React error boundary; on failure or absence it renders an animated
CSS-gradient `Fallback`/`OrbFallback` instead, so the page never goes blank. Both 3D components also
gate on a `ready` state set in `useEffect` to avoid SSR-mounting the canvas. Preserve this pattern
when touching the 3D — never mount a `Canvas` that can take down the tree.

### Styling — Tailwind v4 + brand tokens

Tailwind v4 is configured CSS-first (no `tailwind.config.js`). All design tokens live in the
`@theme` block of `app/globals.css` and are consumed as utility classes (e.g. `--color-magenta`
→ `text-magenta`, `bg-paper`). Brand-specific helpers also defined there: `.spectrum-text`,
`.spectrum-bg`, `.display`, `.eyebrow`, `.grain` (body texture), `.rise`/`.marquee-track` animations.
`prefers-reduced-motion` is honored globally at the bottom of `globals.css`. Add new brand colors as
`--color-*` tokens in `@theme`, not as ad-hoc hex in components.

The spectrum hex values exist in three places that must agree: the `@theme` tokens, the CSS
`--spectrum` gradient, and the `SPECTRUM` arrays in the two shader files.

### Brand assets

Canonical assets live in `public/brand/` (referenced by the app). The root-level `*.png`/`*.svg`
logo files are originals/source material, not wired into the site. The `Mark` component
(`components/Mark.tsx`) is the "WЖ" monogram inlined as SVG so it can inherit `currentColor`.

`@/*` path alias maps to the repo root (`tsconfig.json`).
