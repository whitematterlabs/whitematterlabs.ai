"use client";

import { useEffect, useState } from "react";
import { Mark } from "./Mark";

const links = [
  { label: "PAI", href: "#pai" },
  { label: "Approach", href: "#approach" },
  { label: "Research", href: "#research" },
  { label: "Company", href: "#company" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // over the dark hero the nav is white; once scrolled onto paper it inverts
  const onPaper = scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        onPaper
          ? "border-b border-line bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="White Matter Labs home"
        >
          <Mark
            className="h-7 w-7"
            fill={onPaper ? "#0a0910" : "#ffffff"}
          />
          <span
            className={`text-[15px] font-medium tracking-tight transition-colors ${
              onPaper ? "text-ink" : "text-white"
            }`}
          >
            White Matter Labs
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                onPaper
                  ? "text-mist hover:text-ink"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#pai"
            className={`hidden rounded-full px-4 py-2 text-sm font-medium transition-all sm:inline-flex ${
              onPaper
                ? "bg-ink text-white hover:bg-ink-soft"
                : "bg-white text-ink hover:bg-white/90"
            }`}
          >
            Get early access
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-6 transition ${
                onPaper ? "bg-ink" : "bg-white"
              }`}
            />
            <span
              className={`mt-1.5 block h-px w-6 transition ${
                onPaper ? "bg-ink" : "bg-white"
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper px-6 py-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
