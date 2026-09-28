"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "revealing" | "fading" | "done";

const DURATION_MS = 650;
const FADE_MS = 150;
const MAX_RADIUS = 2000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [radius, setRadius] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (phase !== "revealing") return;

    function step(ts: number) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / DURATION_MS);
      setRadius(easeOutCubic(t) * MAX_RADIUS);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setPhase("fading");
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase !== "fading") return;
    const id = window.setTimeout(() => setPhase("done"), FADE_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (phase === "done") return null;

  function handleClick() {
    if (phase !== "idle") return;
    setPhase("revealing");
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-[150ms] ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <mask id="intro-reveal-mask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="50%" cy="45%" r={radius} fill="black" />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#02030a"
          mask="url(#intro-reveal-mask)"
        />
      </svg>

      <div className="absolute left-1/2 top-[45%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5">
        {phase === "idle" && (
          <div className="flex flex-col items-center gap-1 text-white/90">
            <span className="animate-bounce text-2xl leading-none">↓</span>
            <span className="text-xs font-semibold tracking-[0.35em]">
              CLICK
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleClick}
          aria-label="태양을 클릭해서 링크나무 열기"
          className="sun-glow h-20 w-20 shrink-0 rounded-full bg-gradient-to-br from-yellow-100 via-amber-300 to-orange-500 transition-transform duration-200 hover:scale-105 active:scale-95"
        />
      </div>
    </div>
  );
}
