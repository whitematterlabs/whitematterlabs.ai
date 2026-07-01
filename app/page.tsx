import { Nav } from "./components/Nav";
import { GradientFlow } from "./components/GradientFlow";
import { Mark } from "./components/Mark";
import { InstallCommand } from "./components/InstallCommand";
import { UseCases } from "./components/UseCases";

const INSTALL_COMMAND =
  "curl -fsSL https://raw.githubusercontent.com/whitematterlabs/pai/main/install.sh | sh";

const ethos = ["Free and open source", "Private", "Always local"];

// One marquee half, repeated wide enough to exceed any viewport so the
// translateX(-50%) loop (see .marquee-track in globals.css) never runs dry.
// The track renders this half twice; the two identical halves are what make
// the loop seamless.
const marqueeHalf = Array.from({ length: 5 }).flatMap(() => ethos);

const principles = [
  {
    k: "Memory",
    title: "It actually remembers",
    body: "Most assistants forget you the moment you close the tab. PAI keeps its memory as plain files on your own disk, so it picks up where you left off — and you can open it up and see exactly what it knows.",
  },
  {
    k: "Privacy",
    title: "It runs on your machine",
    body: "Everything PAI knows stays on your Mac. Nothing is shipped off to a cloud you don't control, and nothing is used to train someone else's model.",
  },
  {
    k: "Open",
    title: "You can read all of it",
    body: "There's no black box. PAI is open source, so you can read every line, tweak how it thinks, or build your own integration when it doesn't do quite what you need.",
  },
  {
    k: "Agency",
    title: "It acts, not just answers",
    body: "PAI plugs straight into the Mail and iMessage apps you already use, and drives your browser and computer the same way you would — drafting, scheduling, replying, clicking through — always with you in the loop.",
  },
];

const stats = [
  { v: "10+", l: "things it plugs into — email, calendar, iMessage, WhatsApp, and growing" },
  { v: "100%", l: "local — runs on your machine, your data never leaves" },
  { v: "Apache 2.0", l: "open source, every line of it" },
  { v: "macOS", l: "running today, more to come" },
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
          <h1
            className="display rise max-w-4xl text-[clamp(2.6rem,7vw,5.6rem)] text-white"
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
            personal AI that lives on your own Mac. It remembers what matters,
            works with the tools you already live in, and answers to you
            &mdash; not to a server farm. In alpha now, for people who live in
            the terminal.
          </p>
          <div
            className="rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.24s" }}
          >
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Install PAI
            </a>
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
            {[...marqueeHalf, ...marqueeHalf].map((e, i) => (
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
            <h2 className="display text-center text-[clamp(2.2rem,4.5vw,3.6rem)] text-ink">
              Your own intelligence,{" "}
              <span className="spectrum-text">running on your own machine.</span>
            </h2>
            <p className="mt-6 mx-auto max-w-lg text-lg leading-relaxed text-mist">
              PAI works the Mail and Messages apps you already have and drives
              your browser and computer just like you do &mdash; quietly in the
              background when you&rsquo;re there, acting in your stead when you
              aren&rsquo;t.
            </p>
          </div>
        </div>

        {/* what PAI actually does, day to day */}
        <div className="relative mx-auto mt-16 w-full max-w-5xl px-6">
          <UseCases />
        </div>
      </section>

      {/* ----------------------------------------------------------- APPROACH */}
      <section id="approach" className="relative bg-paper-2 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display text-[clamp(2.2rem,4.5vw,3.4rem)] text-ink">
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
              <h2 className="display text-[clamp(2.2rem,4.5vw,3.4rem)] text-ink">
                <span className="sm:whitespace-nowrap">Everyone&rsquo;s getting hacked.</span>
                <br />
                <span className="text-mist">Keep your data close.</span>
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
                  <div className="spectrum-text text-3xl font-semibold tracking-tight sm:text-4xl">
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
            PAI is in alpha and ready to install today. Bring your own API
            key and you&rsquo;re running in a couple minutes.
          </p>
          <div className="mt-10">
            <InstallCommand command={INSTALL_COMMAND} />
          </div>
          <a
            href="https://github.com/whitematterlabs/pai"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            View on GitHub
          </a>
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
                Building PAI, a local-first Personal AI you run on your own
                machine.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
              <FooterCol
                title="Product"
                items={[
                  { label: "PAI", href: "#pai" },
                  { label: "Install", href: "#cta" },
                  { label: "GitHub", href: "https://github.com/whitematterlabs/pai" },
                ]}
              />
              <FooterCol
                title="Company"
                items={[
                  { label: "Approach", href: "#approach" },
                  { label: "Why we're building this", href: "#research" },
                  { label: "Careers", href: "#" },
                ]}
              />
              <FooterCol
                title="Legal"
                items={[
                  { label: "Privacy", href: "#" },
                  { label: "Terms", href: "#" },
                  { label: "Security", href: "#" },
                ]}
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

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <a
              href={i.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
