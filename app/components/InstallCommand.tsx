"use client";

import { useState } from "react";

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable, fail silently
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-white/35">terminal</span>
      </div>
      <div className="flex items-center gap-3 px-5 py-4">
        <code className="flex-1 overflow-x-auto whitespace-nowrap text-left font-mono text-xs leading-relaxed text-white/90 sm:text-[13px]">
          <span className="text-white/40">$ </span>
          {command}
        </code>
        <button
          type="button"
          onClick={onCopy}
          className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
