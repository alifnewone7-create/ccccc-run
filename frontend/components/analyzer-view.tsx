'use client'

import { TopNav } from '@/components/top-nav'
import { CocoBottomNav } from '@/components/coco/coco-bottom-nav'
import { CocoHeroBg } from '@/components/coco/coco-hero-bg'
import { AuthGuard } from '@/components/auth-guard'
import { ChartAnalyzer } from '@/components/chart-analyzer'
import { AnalyzerModeSwitch } from '@/components/analyzer-mode-switch'
import { GlyphQuota, GlyphOrbit, GlyphToolkit } from '@/components/dashboard/dash-glyphs'
import { GlyphOtcPrism, GlyphRealPulse } from '@/components/analyzer-glyphs'

type Mode = 'otc' | 'real'

const COPY = {
  otc: {
    eyebrow: 'OTC engine',
    title: 'OTC Chart Analyzer',
  },
  real: {
    eyebrow: 'Real market engine',
    title: 'Real Chart Analyzer',
  },
} as const

const STEPS = [
  {
    glyph: GlyphToolkit,
    title: 'Drop the screenshot',
    desc: 'A clean candlestick screenshot with the pair and timeframe visible gives the sharpest read.',
  },
  {
    glyph: GlyphQuota,
    title: 'The engine reads it',
    desc: 'Structure, pattern, momentum and indicators are scored in parallel before any verdict is released.',
  },
  {
    glyph: GlyphOrbit,
    title: 'Take the verdict',
    desc: 'You get direction, option type, confidence and the levels that matter — nothing else to decode.',
  },
]

export function AnalyzerView({ mode }: { mode: Mode }) {
  const copy = COPY[mode]
  const Glyph = mode === 'otc' ? GlyphOtcPrism : GlyphRealPulse

  return (
    <AuthGuard>
      {() => (
        <div
          className="coco coco-analyzer relative min-h-dvh bg-[#0b0618]"
          data-testid={`analyzer-page-${mode}`}
        >
          <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] [&>*]:pointer-events-auto">
            <TopNav bottomNav={false} />
          </div>
          <CocoBottomNav />

          {/* Dark zone — header + analyzer console */}
          <div className="coco-dark">
            <div className="relative overflow-hidden pt-0 md:pt-[84px]">
              <CocoHeroBg />

              <div className="relative z-10 mx-auto flex max-w-[980px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8">
                <header className="text-center">
                  <span className="coco-eyebrow">
                    <Glyph className="h-3.5 w-3.5" />
                    {copy.eyebrow}
                  </span>
                  <h1 className="coco-display coco-title-gradient mx-auto mt-4 max-w-[20ch] text-balance text-[1.75rem] leading-tight sm:text-[2.4rem]">
                    {copy.title}
                  </h1>
                </header>

                <AnalyzerModeSwitch mode={mode} />

                <div className="coco-analyzer-panel">
                  <span className="coco-d2-hero-line" aria-hidden="true" />
                  <ChartAnalyzer mode={mode} />
                </div>
              </div>
            </div>
          </div>

          {/* Light zone — lifted by the home-page curve */}
          <main className="coco-light coco-curve-top pb-28 md:pb-0">
            <div className="mx-auto max-w-[1140px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
              <div className="text-center">
                <span className="coco-eyebrow">
                  <GlyphQuota className="h-3.5 w-3.5" />
                  How the read works
                </span>
                <h2 className="coco-display coco-title-gradient mx-auto mt-4 max-w-[26ch] text-balance text-[1.5rem] sm:text-[2.1rem]">
                  Three steps from screenshot to verdict.
                </h2>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {STEPS.map((s, i) => (
                  <article key={s.title} className="coco-card flex flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="coco-icon h-11 w-11 flex-none">
                        <s.glyph className="h-5 w-5" />
                      </span>
                      <span className="coco-mono text-[10px] uppercase tracking-[0.16em] text-[var(--dim)]">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="coco-sub mt-4 text-[17px]">{s.title}</h3>
                    <p className="coco-muted mt-1.5 text-[13.5px] leading-relaxed">{s.desc}</p>
                  </article>
                ))}
              </div>

              <p className="coco-muted mx-auto mt-8 max-w-[62ch] text-center text-[12.5px] leading-relaxed">
                Coco AI gives a probability-scored read, not a guarantee. Always size positions
                inside your own risk plan.
              </p>
            </div>
          </main>
        </div>
      )}
    </AuthGuard>
  )
}
