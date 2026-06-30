# Content Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the marketing site's copy (`app/page.tsx`) with honest content that matches the real PAI product (local-first alpha CLI tool for technical users) instead of the current generic consumer-AI-startup language.

**Architecture:** Single-file content edit. All changes are to the literal strings, arrays, and one CTA element inside `app/page.tsx`. No new components, no layout/styling changes, no changes to `Nav`, `GradientFlow`, `PaiOrb`, or `SafeCanvas`.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind v4. `pnpm build` is the only verification gate (no test suite exists in this repo).

## Global Constraints

- No em-dashes anywhere in the new copy (user instruction). Use periods, commas, or colons instead.
- No fabricated numbers/claims. Every stat must be traceable to a real fact (driver count from `~/Projects/pairegistry/drivers/`, license from `~/Projects/pai/LICENSE`, supported platform from `~/Projects/pai/README.md`).
- Audience is technical early adopters. Copy should read like it's talking to someone who'll run a `curl | sh` install, not someone signing up for a consumer waitlist.
- Section titles avoid grandiose words like "Convictions."
- No layout/visual changes — this is copy-only. Preserve all existing className strings, component structure, and the `FooterCol` helper unless a class needs to change to support new content shape (e.g. swapping a form for a code block).
- Spec reference: `docs/superpowers/specs/2026-06-30-content-rewrite-design.md`

---

### Task 1: Hero section — copy, ethos marquee, and install-command CTA

**Files:**
- Modify: `app/page.tsx:6-13` (the `ethos` array)
- Modify: `app/page.tsx:62-99` (hero copy and CTA buttons)

**Interfaces:**
- Produces: hero section renders an `<h1>`, subhead `<p>`, and a copyable install-command block replacing the old "Request early access" button. The "Read the approach" anchor link (`href="#approach"`) stays as-is.

- [ ] **Step 1: Replace the `ethos` array**

Replace lines 6-13 in `app/page.tsx`:

```tsx
const ethos = [
  "Runs on your machine",
  "Plain text, not a database",
  "Open source",
  "Built for macOS",
  "Yours, not rented",
  "Hackable by design",
];
```

- [ ] **Step 2: Replace the hero eyebrow, headline, and subhead**

Replace lines 62-79 in `app/page.tsx` (the block from `<div className="relative mx-auto w-full max-w-7xl px-6 pt-28">` through the end of the subhead `<p>`):

```tsx
        <div className="relative mx-auto w-full max-w-7xl px-6 pt-28">
          <p className="eyebrow rise text-white/75">White Matter Labs</p>
          <h1
            className="display rise mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.6rem)] text-white"
            style={{ animationDelay: "0.08s" }}
          >
            An AI that actually
            <br />
            lives with you.
          </h1>
          <p
            className="rise mt-8 max-w-xl text-lg leading-relaxed text-white/80"
            style={{ animationDelay: "0.16s" }}
          >
            <strong className="font-semibold text-white">PAI</strong> is a
            local-first AI that runs on your own Mac, keeps its memory as
            plain files you control, and connects to the tools you already
            use. It&rsquo;s in alpha today, built for people comfortable with
            a terminal.
          </p>
```

- [ ] **Step 3: Replace the CTA buttons with an install-command block**

Replace lines 80-99 in `app/page.tsx` (the `<div className="rise mt-10 flex flex-wrap items-center gap-4" ...>` block):

```tsx
          <div
            className="rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.24s" }}
          >
            <code className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-mono text-sm text-white backdrop-blur-sm">
              curl -fsSL https://raw.githubusercontent.com/whitematterlabs/pai/main/install.sh | sh
            </code>
            <a
              href="https://github.com/whitematterlabs/pai"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              View on GitHub
            </a>
          </div>
```

- [ ] **Step 4: Verify it builds**

Run: `pnpm build`
Expected: build succeeds with no type errors.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "content: rewrite hero copy for honest, technical-audience messaging"
```

---

### Task 2: PAI section copy

**Files:**
- Modify: `app/page.tsx:121-132` (the `#pai` section copy)
- Modify: `app/page.tsx:142-148` (the link below the PAI logo)

**Interfaces:**
- Consumes: nothing new from Task 1.
- Produces: no interface changes, this section's JSX structure (Image + link) is preserved, only text content and the link's `href`/label change.

- [ ] **Step 1: Replace the PAI section copy**

Replace lines 121-132 in `app/page.tsx` (the `<div>` wrapping eyebrow through the body `<p>` — leave the outer `<div className="mx-auto max-w-3xl px-6 text-center">` on line 120 untouched):

```tsx
          <div>
            <p className="eyebrow text-magenta">The product · PAI</p>
            <h2 className="display mt-5 text-center text-[clamp(2.2rem,4.5vw,3.6rem)] text-ink">
              Your own intelligence,{" "}
              <span className="spectrum-text">running on your own machine.</span>
            </h2>
            <p className="mt-6 mx-auto max-w-lg text-lg leading-relaxed text-mist">
              PAI isn&rsquo;t an app you open and close. It&rsquo;s a
              long-lived process that runs on your Mac, keeps its state as
              plain files under <code className="font-mono">~/.pai</code>,
              and routes events from the tools you already use: email,
              calendar, iMessage, WhatsApp, through drivers you control.
            </p>
```

- [ ] **Step 2: Update the link below the logo**

Replace lines 142-148 in `app/page.tsx` (the `<a href="#cta" ...>` element):

```tsx
              <a
                href="https://github.com/whitematterlabs/pai"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:gap-3 transition-all"
              >
                See it on GitHub
                <span className="spectrum-text font-bold">→</span>
              </a>
```

- [ ] **Step 3: Verify it builds**

Run: `pnpm build`
Expected: build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "content: rewrite PAI section copy to describe the real product"
```

---

### Task 3: Approach section — title and four principle cards

**Files:**
- Modify: `app/page.tsx:15-36` (the `principles` array)
- Modify: `app/page.tsx:160-163` (section eyebrow/headline)

**Interfaces:**
- Consumes: the `principles` array is rendered by existing `.map()` JSX at lines 167-184 — unchanged, only the array's data changes (same `{k, title, body}` shape).

- [ ] **Step 1: Replace the `principles` array**

Replace lines 15-36 in `app/page.tsx`:

```tsx
const principles = [
  {
    k: "Memory",
    title: "It actually remembers",
    body: "State lives as plain files on disk, not in a chat window that resets when you close it. Read it with cat, grep through it. No database required.",
  },
  {
    k: "Privacy",
    title: "It runs on your machine",
    body: "PAI lives at ~/.pai on your own Mac. Your data isn't shipped off to train someone else's model.",
  },
  {
    k: "Open",
    title: "You can read all of it",
    body: "Apache 2.0, source code you can read end to end. Edit a prompt, write your own driver, see exactly what it's doing.",
  },
  {
    k: "Agency",
    title: "It acts, not just answers",
    body: "Connect drivers and PAI handles email, calendar, and messages on your behalf, with you in the loop the whole time.",
  },
];
```

- [ ] **Step 2: Replace the section eyebrow and headline**

Replace lines 160-163 in `app/page.tsx`:

```tsx
            <p className="eyebrow text-violet">How it&rsquo;s built</p>
            <h2 className="display mt-5 text-[clamp(2.2rem,4.5vw,3.4rem)] text-ink">
              A few things we&rsquo;re stubborn about.
            </h2>
```

- [ ] **Step 3: Verify it builds**

Run: `pnpm build`
Expected: build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "content: rewrite approach section with honest principle cards"
```

---

### Task 4: Research section copy and real stats

**Files:**
- Modify: `app/page.tsx:38-43` (the `stats` array)
- Modify: `app/page.tsx:192-206` (section eyebrow/headline/body)

**Interfaces:**
- Consumes: the `stats` array is rendered by existing `.map()` JSX at lines 209-218 — unchanged, only data changes (same `{v, l}` shape).

- [ ] **Step 1: Replace the `stats` array with real, sourced numbers**

Replace lines 38-43 in `app/page.tsx`:

```tsx
const stats = [
  { v: "10", l: "drivers shipped: email, calendar, iMessage, WhatsApp, and more" },
  { v: "3", l: "ways in: TUI, web, headless" },
  { v: "Apache 2.0", l: "open source license" },
  { v: "macOS", l: "supported today" },
];
```

- [ ] **Step 2: Replace the section eyebrow, headline, and body**

Replace lines 192-206 in `app/page.tsx` (from `<p className="eyebrow text-azure">Research</p>` through the closing of that body `<p>`):

```tsx
              <p className="eyebrow text-azure">Why we&rsquo;re building this</p>
              <h2 className="display mt-5 text-[clamp(2.2rem,4.5vw,3.4rem)] text-ink">
                Personal AI shouldn&rsquo;t live in
                <br />
                <span className="text-mist">someone else&rsquo;s data center.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
                Most AI today runs as a hosted service you rent by the month.
                We think the more useful version runs on your own machine,
                knows your context because it&rsquo;s been there the whole
                time, and answers to you instead of a quarterly earnings
                call.
              </p>
```

- [ ] **Step 3: Verify it builds**

Run: `pnpm build`
Expected: build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "content: rewrite research section with real, sourced stats"
```

---

### Task 5: CTA section — copy and install-command (replace email form)

**Files:**
- Modify: `app/page.tsx:224-257` (the `#cta` section)

**Interfaces:**
- Produces: the CTA section no longer renders a `<form action="#">` email input. It renders the same install-command `<code>` block pattern introduced in Task 1, plus a GitHub link.

- [ ] **Step 1: Replace the CTA section body**

Replace lines 229-257 in `app/page.tsx` (from `<div className="relative mx-auto max-w-4xl px-6 text-center">` through the closing `</section>` is NOT included, stop right before `</section>`):

```tsx
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Mark className="mx-auto h-12 w-12" fill="#ffffff" />
          <h2 className="display mt-8 text-[clamp(2.4rem,6vw,4.6rem)] text-white">
            Your AI should be yours.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            PAI is in alpha and ready to install today. Bring your own API
            key and you&rsquo;re running in a couple minutes.
          </p>
          <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <code className="rounded-full border border-white/25 bg-white/10 px-6 py-3.5 font-mono text-sm text-white backdrop-blur-md">
              curl -fsSL https://raw.githubusercontent.com/whitematterlabs/pai/main/install.sh | sh
            </code>
            <a
              href="https://github.com/whitematterlabs/pai"
              className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              View on GitHub
            </a>
          </div>
        </div>
```

- [ ] **Step 2: Verify it builds**

Run: `pnpm build`
Expected: build succeeds with no type errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "content: replace CTA email form with install command"
```

---

### Task 6: Footer copy

**Files:**
- Modify: `app/page.tsx:270-289` (tagline and footer columns)

**Interfaces:**
- Consumes: `FooterCol` component (defined at the bottom of the file, unchanged) — `{title, items}: {title: string; items: string[]}`.

- [ ] **Step 1: Replace the footer tagline**

Replace lines 270-273 in `app/page.tsx`:

```tsx
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                Building PAI, a local-first Personal AI you run on your own
                machine.
              </p>
```

- [ ] **Step 2: Replace the footer columns**

Replace lines 277-288 in `app/page.tsx`:

```tsx
              <FooterCol
                title="Product"
                items={["PAI", "Install", "GitHub"]}
              />
              <FooterCol
                title="Company"
                items={["Approach", "Why we're building this", "Careers"]}
              />
              <FooterCol
                title="Legal"
                items={["Privacy", "Terms", "Security"]}
              />
```

- [ ] **Step 3: Verify it builds**

Run: `pnpm build`
Expected: build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "content: rewrite footer tagline and link labels"
```

---

### Task 7: Full-page visual verification

**Files:**
- None modified — verification only.

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`

- [ ] **Step 2: Open http://localhost:3000 and check every section**

Confirm:
- Hero: headline reads "An AI that actually lives with you.", ethos marquee shows the new 6 items, install command and "View on GitHub" link both render and are not visually broken (code block wraps/truncates sensibly at narrow widths).
- PAI section: new headline/body render, "See it on GitHub" link points at `https://github.com/whitematterlabs/pai`.
- Approach section: headline reads "A few things we're stubborn about.", all four cards (Memory/Privacy/Open/Agency) show new titles and bodies.
- Research section: headline/body updated, stats strip shows `10`, `3`, `Apache 2.0`, `macOS` with correct labels, no layout overflow from the longer `Apache 2.0` value.
- CTA section: install command renders, no leftover email `<input>` anywhere on the page.
- Footer: new tagline and link labels render correctly.
- Search the rendered page (browser find, Cmd+F) for the `—` (em-dash) character: zero matches.

- [ ] **Step 3: Stop the dev server**

Ctrl+C in the terminal running `pnpm dev`.
