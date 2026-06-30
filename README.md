# White Matter Labs — whitematterlabs.ai

Marketing site for White Matter Labs and its first product, **PAI** (Personal AI).
Next.js (App Router) + React + Three.js via React Three Fiber, styled with Tailwind v4.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **@react-three/fiber** + **three** — fluid GPU gradient meshes
- **Tailwind CSS v4** — brand token system in `app/globals.css`
- **Geist** — display + mono typefaces
- **pnpm** — package manager

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
```

## The 3D

Two custom-shader R3F scenes carry the motion, both skinned in the brand spectrum:

- `app/components/GradientFlow.tsx` — the hero's full-bleed **liquid silk** surface.
  A 220×220 plane displaced by domain-warped simplex noise (vertex) and swept
  through the spectrum with a flowing fragment shader. Reacts to the pointer.
- `app/components/PaiOrb.tsx` — the product section's **morphing spectral orb**.
  A 64-subdivision icosphere that breathes via noise displacement with a fresnel
  rim light.

WebGL is treated as optional. `app/components/SafeCanvas.tsx` feature-detects a
context and wraps each `Canvas` in an error boundary; if WebGL is missing or
fails, an animated CSS-gradient fallback renders instead, so the page never
goes blank.

## Brand

The spectrum and the "WЖ" monogram are sampled verbatim from the supplied assets.
Tokens live in the `@theme` block of `app/globals.css`; logos are in `public/brand/`.

| token | hex | | token | hex |
|-------|-----|-|-------|-----|
| flare | `#E0531B` | | violet | `#8730CE` |
| amber | `#F4A93C` | | purple | `#6600C6` |
| rose  | `#E11D74` | | indigo | `#2F39A9` |
| magenta | `#C01FAE` | | azure | `#0F5BCD` |

## Accessibility

Responsive to mobile, visible keyboard focus, and `prefers-reduced-motion` is
respected (marquee and animations disable).
