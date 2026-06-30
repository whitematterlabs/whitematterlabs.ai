import Image from "next/image";
import { Nav } from "./components/Nav";
import { GradientFlow } from "./components/GradientFlow";
import { Mark } from "./components/Mark";

const ethos = [
  "Runs on your machine",
  "Plain text, not a database",
  "Open source",
  "Built for macOS",
  "Yours, not rented",
  "Hackable by design",
];

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

const stats = [
  { v: "10", l: "drivers shipped: email, calendar, iMessage, WhatsApp, and more" },
  { v: "3", l: "ways in: TUI, web, headless" },
  { v: "Apache 2.0", l: "open source license" },
  { v: "macOS", l: "supported today" },
];

export default function Home() {
  return (
    <main id="top">
      <Nav />

      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <GradientFlow />
        {/* legibility wash anchored lower-left where the copy lives */}
        <div
          className="absolute inset-0 -z-[5]"
          style={{
            background:
              "radial-gradient(120% 90% at 18% 70%, rgba(10,9,16,0.55) 0%, rgba(10,9,16,0.15) 45%, transparent 70%)",
          }}
        />

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
        </div>

        {/* ethos marquee riding the bottom of the hero */}
        <div className="relative mt-20 overflow-hidden border-y border-white/15 py-4">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
            {[...ethos, ...ethos].map((e, i) => (
              <span
                key={i}
                className="flex items-center gap-12 font-mono text-xs uppercase tracking-[0.22em] text-white/55"
              >
                {e}
                <span className="text-white/25">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- PAI */}
      <section id="pai" className="relative bg-paper py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
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

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Image
                src="/brand/pai-logo.png"
                alt="PAI by White Matter Labs"
                width={150}
                height={150}
                className="h-14 w-auto"
              />
              <a
                href="https://github.com/whitematterlabs/pai"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:gap-3 transition-all"
              >
                See it on GitHub
                <span className="spectrum-text font-bold">→</span>
              </a>
            </div>
          </div>

          {/* visual temporarily removed — no canvas here for now */}
        </div>
      </section>

      {/* ----------------------------------------------------------- APPROACH */}
      <section id="approach" className="relative bg-paper-2 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-violet">How it&rsquo;s built</p>
            <h2 className="display mt-5 text-[clamp(2.2rem,4.5vw,3.4rem)] text-ink">
              A few things we&rsquo;re stubborn about.
            </h2>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {principles.map((p) => (
              <div
                key={p.k}
                className="group relative bg-paper p-9 transition-colors hover:bg-white"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full spectrum-bg" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist">
                    {p.k}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-mist">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- RESEARCH */}
      <section id="research" className="relative bg-paper py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
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
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
              {stats.map((s) => (
                <div key={s.l} className="bg-paper p-8">
                  <div className="spectrum-text text-4xl font-semibold tracking-tight">
                    {s.v}
                  </div>
                  <div className="mt-2 text-sm leading-snug text-mist">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <section id="cta" className="relative overflow-hidden bg-ink py-32">
        <div className="absolute inset-0 opacity-90">
          <GradientFlow />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Mark className="mx-auto h-12 w-12" fill="#ffffff" />
          <h2 className="display mt-8 text-[clamp(2.4rem,6vw,4.6rem)] text-white">
            Your AI should be yours.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            Be among the first to live with PAI. We&rsquo;re onboarding early
            users now.
          </p>
          <form
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            action="#"
          >
            <input
              type="email"
              required
              placeholder="you@domain.com"
              aria-label="Email address"
              className="flex-1 rounded-full border border-white/25 bg-white/10 px-5 py-3.5 text-white placeholder:text-white/50 backdrop-blur-md outline-none transition focus:border-white/60"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Request access
            </button>
          </form>
        </div>
      </section>

      {/* ------------------------------------------------------------ FOOTER */}
      <footer id="company" className="bg-ink pb-12 pt-16 text-white/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-10 border-t border-white/10 pt-12 md:flex-row">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5">
                <Mark className="h-6 w-6" fill="#ffffff" />
                <span className="font-medium text-white">
                  White Matter Labs
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                Building PAI — a Personal AI that&rsquo;s private by design and
                entirely yours.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
              <FooterCol
                title="Product"
                items={["PAI", "Early access", "Changelog"]}
              />
              <FooterCol
                title="Company"
                items={["Approach", "Research", "Careers"]}
              />
              <FooterCol
                title="Legal"
                items={["Privacy", "Terms", "Security"]}
              />
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 text-xs text-white/40 sm:flex-row">
            <span>
              © {new Date().getFullYear()} White Matter Labs. All rights
              reserved.
            </span>
            <span className="font-mono uppercase tracking-[0.2em]">
              whitematterlabs.ai
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i}>
            <a
              href="#"
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
