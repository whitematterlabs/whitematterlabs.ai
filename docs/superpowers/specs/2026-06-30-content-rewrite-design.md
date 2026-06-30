# Content rewrite: honest PAI copy

## Why

The current `app/page.tsx` copy describes a polished consumer product (sub-120ms
latency claims, "100% on-device", an email waitlist) that doesn't match what
PAI actually is today: a local-first, filesystem-backed AI runtime in alpha,
installed via a curl script, aimed at technical users who are comfortable in
a terminal. The tone also leans on inflated startup language ("Four
convictions we won't compromise") the user wants replaced with something
lighter.

This is a copy-only change. No new sections, no new components, no layout
restructuring beyond what the copy requires (e.g. swapping an email form for
a copyable install command).

## Decisions

- **Audience**: technical early adopters, not a general consumer waitlist.
- **Primary CTA**: a copyable install one-liner
  (`curl -fsSL https://raw.githubusercontent.com/whitematterlabs/pai/main/install.sh | sh`),
  not an email capture form. Secondary CTA links to the GitHub repo.
- **Stats strip**: real, verifiable facts instead of invented numbers —
  driver count (10, from `pairegistry/drivers/`), surface count (3: TUI, web,
  headless), license (Apache 2.0), supported platform (macOS).
- **Tone**: no em-dashes. Section titles avoid grandiose words like
  "Convictions" in favor of plainer language ("A few things we're stubborn
  about").
- **Style guardrail**: no em-dashes anywhere in the new copy (user instruction).

## Section-by-section copy

### Hero
- Eyebrow: `White Matter Labs`
- H1: `An AI that actually lives with you.`
- Subhead: `PAI is a local-first AI that runs on your own Mac, keeps its memory as plain files you control, and connects to the tools you already use. It's in alpha today, built for people comfortable with a terminal.`
- Primary CTA: copyable install command box, replacing the current "Request early access" button:
  `curl -fsSL https://raw.githubusercontent.com/whitematterlabs/pai/main/install.sh | sh`
- Secondary CTA: `View on GitHub` linking to `https://github.com/whitematterlabs/pai`
- Ethos marquee (replaces vague claims with concrete, true ones):
  `Runs on your machine`, `Plain text, not a database`, `Open source`,
  `Built for macOS`, `Yours, not rented`, `Hackable by design`

### PAI section (`#pai`)
- Eyebrow: `The product · PAI`
- H2: `Your own intelligence, running on your own machine.`
- Body: `PAI isn't an app you open and close. It's a long-lived process that runs on your Mac, keeps its state as plain files under ~/.pai, and routes events from the tools you already use: email, calendar, iMessage, WhatsApp, through drivers you control.`
- CTA link: `See it on GitHub →` (replaces "Join the early access list")

### Approach section (`#approach`)
- Eyebrow: `How it's built`
- H2: `A few things we're stubborn about.` (replaces "Four convictions we won't compromise")
- Cards (replacing `Speed` with `Open`, since the latency claim isn't true today):
  - **Memory** — `It actually remembers` — `State lives as plain files on disk, not in a chat window that resets when you close it. Read it with cat, grep through it. No database required.`
  - **Privacy** — `It runs on your machine` — `PAI lives at ~/.pai on your own Mac. Your data isn't shipped off to train someone else's model.`
  - **Open** — `You can read all of it` — `Apache 2.0, source code you can read end to end. Edit a prompt, write your own driver, see exactly what it's doing.`
  - **Agency** — `It acts, not just answers` — `Connect drivers and PAI handles email, calendar, and messages on your behalf, with you in the loop the whole time.`

### Research section (`#research`)
- Eyebrow: `Why we're building this`
- H2: `Personal AI shouldn't live in someone else's data center.`
- Body: `Most AI today runs as a hosted service you rent by the month. We think the more useful version runs on your own machine, knows your context because it's been there the whole time, and answers to you instead of a quarterly earnings call.`
- Stats strip (real numbers, sourced from `pairegistry/drivers/` and `pai/LICENSE`):
  - `10` — drivers shipped (email, calendar, iMessage, WhatsApp, contacts, voice, and more)
  - `3` — ways in: TUI, web, headless
  - `Apache 2.0` — license
  - `macOS` — supported today

### CTA section (`#cta`)
- H2: `Your AI should be yours.` (unchanged, already true and simple)
- Subhead: `PAI is in alpha and ready to install today. Bring your own API key and you're running in a couple minutes.`
- Replace the email form with: the same copyable install command from the hero, plus a `View on GitHub` link as a secondary action. No email capture, since the product is install-now rather than waitlist-gated.

### Footer
- Tagline: `Building PAI, a local-first Personal AI you run on your own machine.`
- Product column: `PAI`, `Install`, `GitHub`
- Company column: `Approach`, `Why we're building this`, `Careers`
- Legal column: unchanged (`Privacy`, `Terms`, `Security`)

## Out of scope
- No visual/design changes (layout, animations, shaders, color tokens stay as-is).
- No new sections or components.
- No changes to `Nav`, `GradientFlow`, `PaiOrb`, or `SafeCanvas`.
