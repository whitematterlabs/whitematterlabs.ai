"use client";

/* ---------------------------------------------------------------------------
   UseCases — real, multi-step workflows PAI pulls off end to end, shown as a
   live chat transcript. You ask, PAI reports what it found, asks to confirm,
   you approve, and it acts and reports back. Messages stream in with a typing
   indicator so each slide plays like a real conversation; under reduced-motion
   the whole transcript appears at once. A bullet carousel (. . . ● . . .) below
   the window switches between workflows and auto-advances, pausing on
   hover/focus.

   Edit copy in the `workflows` array below.
--------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";

// PAI's chat avatar — a simple friendly smiley, drawn on currentColor.
function Smiley({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="8.75" cy="9.75" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.25" cy="9.75" r="1.1" fill="currentColor" stroke="none" />
      <path d="M8 14.25 Q12 18.5 16 14.25" />
    </svg>
  );
}

type Message = { from: "you" | "pai"; text: string };
type Workflow = { k: string; messages: Message[] };

const workflows: Workflow[] = [
  {
    k: "Workday",
    messages: [
      { from: "you", text: "Good morning — get me set up for the day." },
      {
        from: "pai",
        text: "Morning. Three meetings today: a 10am standup, a 1pm with Acme, and a 4pm design review.",
      },
      { from: "pai", text: "Want me to spin up Zoom links and send them out?" },
      { from: "you", text: "Yeah, go ahead." },
      {
        from: "pai",
        text: "Done. Generated a link for each and emailed all nine attendees their invite. ✓",
      },
    ],
  },
  {
    k: "Markets",
    messages: [
      { from: "you", text: "What are the politicians buying lately?" },
      {
        from: "pai",
        text: "Pulled the latest disclosures. Biggest fresh move: Rep. Calder bought $1–5M of a defense contractor two days ago.",
      },
      {
        from: "pai",
        text: "It lines up with a committee markup next week. Want the full breakdown?",
      },
      { from: "you", text: "Show me." },
      {
        from: "pai",
        text: "Sent it to your inbox — the trade, the timing, and the three filings I cross-checked against it. ✓",
      },
    ],
  },
  {
    k: "Housing",
    messages: [
      { from: "you", text: "Find me a place in SF under $3,500." },
      {
        from: "pai",
        text: "Scanned 40-odd fresh listings and filtered to your budget and a sub-30-minute commute. Six look solid.",
      },
      {
        from: "pai",
        text: "I toured the promising ones and read the fine print — three are worth chasing. Want me to reach out to the landlords?",
      },
      { from: "you", text: "Please." },
      {
        from: "pai",
        text: "Emailed all three landlords to check availability and line up viewings. I'll forward whatever comes back. ✓",
      },
    ],
  },
];

const REVEAL_MS = 1400; // gap between messages arriving
const HOLD_MS = 3800; // pause on a finished transcript before advancing

export function UseCases() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(1); // messages shown in current slide
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);

  const current = workflows[active];
  const total = current.messages.length;

  // honor prefers-reduced-motion: show the whole transcript, don't auto-play
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(m.matches);
    sync();
    m.addEventListener?.("change", sync);
    return () => m.removeEventListener?.("change", sync);
  }, []);

  const go = (i: number) => {
    const next = (i + workflows.length) % workflows.length;
    setActive(next);
    setRevealed(reduced ? workflows[next].messages.length : 1);
  };

  // drive the transcript: reveal messages one by one, then advance to the next
  useEffect(() => {
    if (paused || reduced) return;
    if (revealed < total) {
      const id = setTimeout(() => setRevealed((r) => r + 1), REVEAL_MS);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % workflows.length);
      setRevealed(1);
    }, HOLD_MS);
    return () => clearTimeout(id);
  }, [active, revealed, paused, reduced, total]);

  const count = reduced ? total : revealed;
  const shown = current.messages.slice(0, count);
  const showTyping =
    !reduced &&
    !paused &&
    revealed < total &&
    current.messages[revealed]?.from === "pai";
  const typingHasAvatar = shown[shown.length - 1]?.from !== "pai";

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Conversations PAI runs end to end"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
    >
      {/* the window — one conversation */}
      <div
        className="w-full overflow-hidden rounded-2xl border border-line bg-paper"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <div className="flex min-h-[340px] flex-col gap-3 p-6 sm:min-h-[360px] sm:p-10">
          {shown.map((m, i) => {
            const you = m.from === "you";
            const avatar = !you && (i === 0 || shown[i - 1].from !== "pai");
            return you ? (
              <div key={i} className="chat-in flex justify-end">
                <p className="max-w-[82%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-sm leading-snug text-paper sm:text-[0.95rem]">
                  {m.text}
                </p>
              </div>
            ) : (
              <div key={i} className="chat-in flex items-end gap-2.5">
                {avatar ? (
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line bg-paper"
                    aria-hidden="true"
                  >
                    <Smiley className="h-[22px] w-[22px] text-ink" />
                  </span>
                ) : (
                  <span className="w-7 shrink-0" aria-hidden="true" />
                )}
                <p className="max-w-[82%] rounded-2xl rounded-bl-md border border-line bg-paper-2 px-4 py-2.5 text-sm leading-snug text-ink-soft sm:text-[0.95rem]">
                  {m.text}
                </p>
              </div>
            );
          })}

          {showTyping && (
            <div className="chat-in flex items-end gap-2.5">
              {typingHasAvatar ? (
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line bg-paper"
                  aria-hidden="true"
                >
                  <Smiley className="h-[22px] w-[22px] text-ink" />
                </span>
              ) : (
                <span className="w-7 shrink-0" aria-hidden="true" />
              )}
              <span
                className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-paper-2 px-4 py-3.5"
                aria-label="PAI is typing"
              >
                <i className="typing-dot" style={{ animationDelay: "0ms" }} />
                <i className="typing-dot" style={{ animationDelay: "160ms" }} />
                <i className="typing-dot" style={{ animationDelay: "320ms" }} />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* bullet carousel — . . . ● . . . */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {workflows.map((w, i) => {
          const selected = i === active;
          return (
            <button
              key={w.k}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show the ${w.k} conversation`}
              aria-current={selected}
              className={`rounded-full transition-all ${
                selected
                  ? "h-2.5 w-2.5 bg-ink-soft"
                  : "h-2 w-2 bg-line hover:bg-mist"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
