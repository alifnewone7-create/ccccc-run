type GlyphProps = { className?: string }

const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/* OTC Analyzer: reversal loop inside a scanning aperture */
export function GlyphTelegram({ className }: GlyphProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.94 3.4a1.2 1.2 0 0 0-1.27-.2L2.9 10.47c-.9.36-.86 1.66.06 1.96l4.2 1.37 1.6 5.03c.23.72 1.14.93 1.66.38l2.3-2.42 4.3 3.16c.6.44 1.45.12 1.62-.6l3.68-14.7a1.2 1.2 0 0 0-.38-1.25ZM9.6 13.9l8.1-5.03-6.3 6.6c-.15.16-.24.37-.25.6l-.1 2.1-1.05-3.3a.9.9 0 0 0-.4-.97Z" />
    </svg>
  )
}

export function GlyphOtc({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M7 3.5H4.5A1.5 1.5 0 0 0 3 5v2.5M25 3.5h2.5A1.5 1.5 0 0 1 29 5v2.5M3 24.5V27a1.5 1.5 0 0 0 1.5 1.5H7M29 24.5V27a1.5 1.5 0 0 1-1.5 1.5H25" {...base} strokeWidth="1.8" opacity="0.55" />
      <circle cx="16" cy="16" r="8.5" {...base} strokeWidth="1.9" opacity="0.35" />
      <path d="M22.5 13.5A7 7 0 0 0 10 12.5" {...base} strokeWidth="2.2" />
      <path d="M9.5 18.5A7 7 0 0 0 22 19.5" {...base} strokeWidth="2.2" />
      <path d="M9.5 9.5v3.5H13M22.5 22.5V19h-3.5" {...base} strokeWidth="2.2" />
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
    </svg>
  )
}

/* Real Chart: solid candles with a rising sparkline */
export function GlyphReal({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M8 6v20M16 4v24M24 8v18" {...base} strokeWidth="1.6" opacity="0.5" />
      <rect x="5.5" y="12" width="5" height="9" rx="1.4" fill="currentColor" opacity="0.85" />
      <rect x="13.5" y="8" width="5" height="12" rx="1.4" fill="currentColor" />
      <rect x="21.5" y="13" width="5" height="7" rx="1.4" fill="currentColor" opacity="0.85" />
      <path d="M4 25.5c4-1 6.5-6 10-6.5s5 3 8 2 4.5-4.5 6.5-6" {...base} strokeWidth="2" opacity="0.9" />
    </svg>
  )
}

/* Live Signals: bolt inside expanding broadcast rings */
export function GlyphLive({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M6.5 7.5a13.5 13.5 0 0 0 0 17M25.5 7.5a13.5 13.5 0 0 1 0 17" {...base} strokeWidth="2" opacity="0.4" />
      <path d="M10.5 11a7.5 7.5 0 0 0 0 10M21.5 11a7.5 7.5 0 0 1 0 10" {...base} strokeWidth="2" opacity="0.7" />
      <path d="M17.5 7.5 13 17h3.5l-1 7.5 5-10H17l.5-7z" fill="currentColor" />
    </svg>
  )
}

/* Future Signals: planet, orbit and a forward star */
export function GlyphFuture({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="15" cy="17" r="6.5" fill="currentColor" />
      <path d="M3.5 21.5c4 3.5 15.5 1 21-4.5s6-10.5 3.5-12" {...base} strokeWidth="2" opacity="0.75" />
      <path d="M4.5 12.5c3-5 12-7.5 18-4" {...base} strokeWidth="1.6" opacity="0.35" />
      <path d="M25.5 21.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" fill="currentColor" />
    </svg>
  )
}

/* News Signals: globe with a headline pulse */
export function GlyphNews({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="11.5" {...base} strokeWidth="2" opacity="0.85" />
      <path d="M16 4.5c-4 3.5-4 19.5 0 23M16 4.5c4 3.5 4 19.5 0 23" {...base} strokeWidth="1.6" opacity="0.45" />
      <path d="M5 13h22M5 19h22" {...base} strokeWidth="1.6" opacity="0.45" />
      <path d="M3 16h5l2-4 3 8 3-6 2 4h11" {...base} strokeWidth="2.4" />
    </svg>
  )
}

/* Risk Guard: layered shield with inner lock notch */
export function GlyphRisk({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 3.5 5.5 7.5v8c0 6.5 4.5 11 10.5 13 6-2 10.5-6.5 10.5-13v-8L16 3.5z" {...base} strokeWidth="2" opacity="0.55" />
      <path d="M16 8 9.5 10.5v5.5c0 4.2 2.8 7.2 6.5 8.5 3.7-1.3 6.5-4.3 6.5-8.5v-5.5L16 8z" fill="currentColor" opacity="0.92" />
      <path d="M12.8 16.2 15 18.4l4.4-4.6" fill="none" stroke="#0e1030" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Market Feed: streaming bars with uplink arrow */
export function GlyphFeed({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="4" y="18" width="4.5" height="10" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="10.5" y="13" width="4.5" height="15" rx="1.5" fill="currentColor" opacity="0.8" />
      <rect x="17" y="16" width="4.5" height="12" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="23.5" y="9" width="4.5" height="19" rx="1.5" fill="currentColor" />
      <path d="M4.5 10.5 11 6l5 3.5L27 3.5" {...base} strokeWidth="2.2" />
      <path d="M22.5 3.5H27V8" {...base} strokeWidth="2.2" />
    </svg>
  )
}
