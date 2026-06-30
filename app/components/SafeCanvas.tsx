"use client";

import { Component, ReactNode, useEffect, useState } from "react";

/**
 * WebGL is optional, never required. If a context can't be created (old
 * hardware, blocked GPU, headless), we render the CSS fallback instead of
 * letting the thrown error tear down the whole React tree.
 */
class CanvasBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    /* swallow — the fallback covers it */
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Mounts `children` (a 3D scene) only when the client supports WebGL, and
 * shows `fallback` otherwise or on any runtime failure.
 */
export function SafeCanvas({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const [state, setState] = useState<"pending" | "ok" | "no">("pending");
  useEffect(() => setState(hasWebGL() ? "ok" : "no"), []);

  if (state !== "ok") return <>{fallback}</>;
  return <CanvasBoundary fallback={fallback}>{children}</CanvasBoundary>;
}
