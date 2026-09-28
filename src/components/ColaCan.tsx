"use client";

import { useState } from "react";

const COLORS: Record<string, string> = {
  k: "#242424",
  s: "#d9d9d9",
  R: "#8f0d18",
  r: "#d81324",
  w: "#f5f2ea",
};

const TOTAL_COLS = 17;
const BODY_L = 1;
const BODY_R = 15;
const INNER_L = 2;
const INNER_R = 14;

type Segment = [start: number, end: number, ch: string];

function buildRow(segments: Segment[]): string {
  const cells = new Array<string>(TOTAL_COLS).fill(".");
  for (const [start, end, ch] of segments) {
    for (let x = start; x <= end; x++) cells[x] = ch;
  }
  return cells.join("");
}

const LETTER_PATTERNS: Record<string, string[]> = {
  C: ["111", "100", "100", "100", "111"],
  O: ["111", "101", "101", "101", "111"],
  L: ["100", "100", "100", "100", "111"],
  A: ["111", "101", "111", "101", "101"],
};

function buildLabelRow(rowIndex: number): string {
  const segments: Segment[] = [
    [BODY_L, BODY_L, "R"],
    [INNER_L, INNER_R, "r"],
    [BODY_R, BODY_R, "R"],
  ];
  const row = buildRow(segments);
  const cells = row.split("");

  let col = 3;
  for (const letter of "COLA") {
    const pattern = LETTER_PATTERNS[letter][rowIndex];
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === "1") cells[col + i] = "w";
    }
    col += 3;
  }
  return cells.join("");
}

function buildSwirlRow(rowIndex: number): string {
  const stripeStart = Math.max(INNER_L, 11 - Math.floor(rowIndex / 2));
  const stripeEnd = Math.min(INNER_R, stripeStart + 1);
  return buildRow([
    [BODY_L, BODY_L, "R"],
    [INNER_L, INNER_R, "r"],
    [stripeStart, stripeEnd, "w"],
    [BODY_R, BODY_R, "R"],
  ]);
}

const LABEL_ROW_START = 6;
const LABEL_ROW_COUNT = 5;
const BODY_ROW_COUNT = 16;

const bodyRows: string[] = [];
for (let i = 0; i < BODY_ROW_COUNT; i++) {
  if (i >= LABEL_ROW_START && i < LABEL_ROW_START + LABEL_ROW_COUNT) {
    bodyRows.push(buildLabelRow(i - LABEL_ROW_START));
  } else {
    bodyRows.push(buildSwirlRow(i));
  }
}

const GRID = [
  buildRow([[BODY_L, BODY_R, "k"]]),
  buildRow([[BODY_L, BODY_L, "k"], [INNER_L, INNER_R, "s"], [BODY_R, BODY_R, "k"]]),
  buildRow([
    [BODY_L, BODY_L, "k"],
    [INNER_L, 6, "s"],
    [7, 9, "k"],
    [10, INNER_R, "s"],
    [BODY_R, BODY_R, "k"],
  ]),
  buildRow([[BODY_L, BODY_R, "k"]]),
  ...bodyRows,
  buildRow([[BODY_L, BODY_R, "k"]]),
  buildRow([[BODY_L, BODY_L, "k"], [INNER_L, INNER_R, "R"], [BODY_R, BODY_R, "k"]]),
];

const CAP_ROWS = 4;
const COLS = TOTAL_COLS;
const ROWS = GRID.length;

type Pixel = { x: number; y: number; color: string };

function collectPixels(rowFilter: (y: number) => boolean): Pixel[] {
  const pixels: Pixel[] = [];
  GRID.forEach((row, y) => {
    if (!rowFilter(y)) return;
    row.split("").forEach((ch, x) => {
      if (ch !== ".") pixels.push({ x, y, color: COLORS[ch] });
    });
  });
  return pixels;
}

const capPixels = collectPixels((y) => y < CAP_ROWS);
const bodyPixels = collectPixels((y) => y >= CAP_ROWS);

const BUBBLES = [
  { left: "42%", size: 5, delay: 0 },
  { left: "52%", size: 6, delay: 0.06 },
  { left: "47%", size: 4, delay: 0.16 },
  { left: "58%", size: 5, delay: 0.1 },
  { left: "37%", size: 4, delay: 0.22 },
  { left: "50%", size: 5, delay: 0.3 },
];

export default function ColaCan() {
  const [popped, setPopped] = useState(false);

  function handleClick() {
    if (popped) return;
    setPopped(true);
    window.setTimeout(() => setPopped(false), 1400);
  }

  const scale = 4;
  const width = COLS * scale;
  const height = ROWS * scale;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="콜라 캔"
      className="relative shrink-0 select-none bg-transparent p-0 drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
      style={{ width, height }}
    >
      <svg
        viewBox={`0 0 ${COLS} ${ROWS}`}
        width={width}
        height={height}
        shapeRendering="crispEdges"
        className={popped ? "cola-shake" : ""}
      >
        {bodyPixels.map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={1} height={1} fill={p.color} />
        ))}
        <g
          className={popped ? "cola-cap-pop" : ""}
          style={{ transformOrigin: `${COLS / 2}px ${CAP_ROWS}px` }}
        >
          {capPixels.map((p, i) => (
            <rect key={i} x={p.x} y={p.y} width={1} height={1} fill={p.color} />
          ))}
        </g>
      </svg>

      {popped && (
        <div className="pointer-events-none absolute inset-0">
          {BUBBLES.map((b, i) => (
            <span
              key={i}
              className="fizz-bubble absolute rounded-full bg-white/80"
              style={{
                left: b.left,
                top: `${(CAP_ROWS / ROWS) * 100}%`,
                width: b.size,
                height: b.size,
                animationDelay: `${b.delay}s`,
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
}
