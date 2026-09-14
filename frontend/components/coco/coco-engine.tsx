import Image from 'next/image'
import {
  GlyphOtc,
  GlyphReal,
  GlyphLive,
  GlyphFuture,
  GlyphNews,
  GlyphRisk,
  GlyphFeed,
} from '@/components/coco/coco-glyphs'

type Tile = {
  key: string
  label: string
  icon: (p: { className?: string }) => React.JSX.Element
  bg: string
  ink: string
}

type Placed = { x: number; y: number; s: number }
type Wire = { d: string; dot?: [number, number]; c: string }

type Layout = {
  id: string
  w: number
  h: number
  core: { x: number; y: number; r: number }
  tiles: Record<string, Placed>
  wires: Wire[]
}

const TILES: Tile[] = [
  { key: 'otc', label: 'OTC Analyzer', icon: GlyphOtc, bg: 'linear-gradient(145deg,#8a4cf0 0%,#4a1f9e 100%)', ink: '#fff' },
  { key: 'real', label: 'Real Chart', icon: GlyphReal, bg: 'linear-gradient(145deg,#3d424f 0%,#1a1d25 100%)', ink: '#e8ecf5' },
  { key: 'live', label: 'Live Signals', icon: GlyphLive, bg: 'linear-gradient(145deg,#5b4df0 0%,#241c7a 100%)', ink: '#fff' },
  { key: 'future', label: 'Future Signals', icon: GlyphFuture, bg: 'linear-gradient(145deg,#4a3823 0%,#1f160c 100%)', ink: '#ff7a45' },
  { key: 'news', label: 'News Signals', icon: GlyphNews, bg: 'linear-gradient(145deg,#3b3a2f 0%,#1a1a14 100%)', ink: '#f2f2ec' },
  { key: 'risk', label: 'Risk Guard', icon: GlyphRisk, bg: 'linear-gradient(145deg,#3f3e86 0%,#1c1b4d 100%)', ink: '#c4a6ff' },
  { key: 'feed', label: 'Market Feed', icon: GlyphFeed, bg: 'linear-gradient(145deg,#d02c97 0%,#5c1148 100%)', ink: '#fff' },
]

const DESKTOP: Layout = {
  id: 'd',
  w: 720,
  h: 400,
  core: { x: 360, y: 200, r: 54 },
  tiles: {
    otc: { x: 120, y: 78, s: 64 },
    real: { x: 248, y: 128, s: 52 },
    live: { x: 498, y: 98, s: 58 },
    future: { x: 612, y: 112, s: 96 },
    news: { x: 128, y: 300, s: 96 },
    risk: { x: 516, y: 292, s: 72 },
    feed: { x: 632, y: 326, s: 48 },
  },
  wires: [
    { d: 'M120 110 V200 H360', dot: [120, 200], c: '#7c5cff' },
    { d: 'M274 128 H360 V200', dot: [360, 128], c: '#9aa3b5' },
    { d: 'M498 127 V200 H360', dot: [498, 200], c: '#3b82f6' },
    { d: 'M564 112 H440 V200', dot: [440, 112], c: '#ff7a45' },
    { d: 'M176 300 H300 V200', dot: [300, 300], c: '#b9b58a' },
    { d: 'M480 292 H360 V200', dot: [360, 292], c: '#6f6fe8' },
    { d: 'M632 302 V250 H360 V200', dot: [632, 250], c: '#e0409f' },
  ],
}

const MOBILE: Layout = {
  id: 'm',
  w: 360,
  h: 460,
  core: { x: 180, y: 230, r: 44 },
  tiles: {
    otc: { x: 70, y: 70, s: 56 },
    real: { x: 180, y: 60, s: 44 },
    live: { x: 290, y: 80, s: 56 },
    future: { x: 300, y: 205, s: 72 },
    news: { x: 60, y: 230, s: 72 },
    risk: { x: 90, y: 390, s: 64 },
    feed: { x: 270, y: 380, s: 56 },
  },
  wires: [
    { d: 'M70 98 V150 H180 V230', dot: [70, 150], c: '#7c5cff' },
    { d: 'M180 82 V230', dot: [180, 120], c: '#9aa3b5' },
    { d: 'M290 108 V160 H180 V230', dot: [290, 160], c: '#3b82f6' },
    { d: 'M264 205 H180 V230', dot: [230, 205], c: '#ff7a45' },
    { d: 'M96 230 H180', dot: [130, 230], c: '#b9b58a' },
    { d: 'M90 358 V300 H180 V230', dot: [90, 300], c: '#6f6fe8' },
    { d: 'M270 352 V300 H180', dot: [270, 300], c: '#e0409f' },
  ],
}

function pct(v: number, base: number) {
  return `${(v / base) * 100}%`
}

function Diagram({ layout, className }: { layout: Layout; className?: string }) {
  const { id, w, h, core, tiles, wires } = layout
  const step = 0.5
  const cycle = wires.length * step
  return (
    <div className={`relative w-full ${className ?? ''}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${w} ${h}`}
        aria-hidden="true"
      >
        <defs>
          <filter id={`cocoGlow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>
        {wires.map((wire, i) => (
          <g key={wire.d}>
            <path
              d={wire.d}
              fill="none"
              stroke="rgba(226,232,255,0.55)"
              strokeWidth="1.4"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="coco-dash-seq"
              d={wire.d}
              pathLength={100}
              fill="none"
              stroke="#c4a6ff"
              strokeOpacity="0.9"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="16 684"
              vectorEffect="non-scaling-stroke"
              filter={`url(#cocoGlow-${id})`}
              style={{ animationDelay: `${i * step}s`, animationDuration: `${cycle}s` }}
            />
            <path
              className="coco-dash-seq"
              d={wire.d}
              pathLength={100}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeDasharray="16 684"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * step}s`, animationDuration: `${cycle}s` }}
            />
            {wire.dot && (
              <circle
                cx={wire.dot[0]}
                cy={wire.dot[1]}
                r="5"
                fill="#141626"
                stroke={wire.c}
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>
        ))}
      </svg>

      {TILES.map((tile, i) => {
        const p = tiles[tile.key]
        return (
          <div
            key={tile.key}
            title={tile.label}
            className="coco-tile"
            data-testid={`engine-tile-${tile.key}`}
            style={
              {
                left: pct(p.x - p.s / 2, w),
                top: pct(p.y - p.s / 2, h),
                width: pct(p.s, w),
                background: tile.bg,
                color: tile.ink,
                '--d': `${200 + i * 90}ms`,
              } as React.CSSProperties
            }
          >
            <tile.icon className="coco-tile-icon" />
          </div>
        )
      })}

      <div
        className="coco-core"
        data-testid="engine-core"
        style={{
          left: pct(core.x - core.r, w),
          top: pct(core.y - core.r, h),
          width: pct(core.r * 2, w),
        }}
      >
        <span className="coco-core-halo" aria-hidden="true" />
        <span className="coco-core-img">
          <Image src="/coco-ai.jpg" alt="Coco AI core" fill sizes="120px" className="object-cover" />
        </span>
      </div>
    </div>
  )
}

export function CocoEngine() {
  return (
    <div className="coco-engine relative mx-auto w-full max-w-[820px]" data-testid="engine-diagram">
      <Diagram layout={DESKTOP} className="hidden sm:block" />
      <Diagram layout={MOBILE} className="mx-auto max-w-[360px] sm:hidden" />

    </div>
  )
}
