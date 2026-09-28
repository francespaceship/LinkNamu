const COLORS: Record<string, string> = {
  w: "#f5f0e6",
  c: "#6f4426",
  k: "#241a12",
  s: "#e4e0d6",
};

const GRID = [
  "....wwwwww....",
  "....wwwwwwww..",
  "....wcccccww..",
  "....wwwwwwww..",
  "....wwwwwwwww.",
  "....wwwwwwwwww",
  "....wwwwwwwww.",
  "....wwwwwwww..",
  ".....wwwwww...",
  ".....kkkkkk...",
  "..ssssssssss..",
  "...kkkkkkkk...",
];

const COLS = GRID[0].length;
const ROWS = GRID.length;

type Pixel = { x: number; y: number; color: string };

const pixels: Pixel[] = [];
GRID.forEach((row, y) => {
  row.split("").forEach((ch, x) => {
    if (ch !== ".") pixels.push({ x, y, color: COLORS[ch] });
  });
});

const STEAM_WISPS = [
  { delay: "0s", height: 16 },
  { delay: "0.35s", height: 20 },
  { delay: "0.7s", height: 16 },
];

export default function CoffeeCup() {
  const scale = 4;
  const width = COLS * scale;
  const height = ROWS * scale;

  return (
    <div
      tabIndex={0}
      aria-label="커피"
      className="group relative flex select-none flex-col items-center outline-none"
      style={{ width }}
    >
      <div className="flex h-6 items-end justify-center gap-1.5">
        {STEAM_WISPS.map((s, i) => (
          <span
            key={i}
            className="steam-wisp w-1.5 rounded-full bg-white/70 blur-[1.5px]"
            style={{ height: s.height, animationDelay: s.delay }}
          />
        ))}
      </div>
      <svg
        viewBox={`0 0 ${COLS} ${ROWS}`}
        width={width}
        height={height}
        shapeRendering="crispEdges"
        className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
      >
        {pixels.map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={1} height={1} fill={p.color} />
        ))}
      </svg>
    </div>
  );
}
