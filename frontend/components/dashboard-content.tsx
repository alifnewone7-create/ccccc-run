'use client'

import Image from 'next/image'
import {
  Gift,
  Rocket,
  Star,
  Crown,
  ShieldCheck,
  LayoutGrid,
  BrainCircuit,
  type LucideIcon,
} from 'lucide-react'
import { TopNav } from '@/components/top-nav'
import { TradingChart } from '@/components/trading-chart'
import { ToolCards } from '@/components/tool-cards'
import { type UserProfile } from '@/components/auth-provider'
import { normalizeTier, type Tier } from '@/lib/tiers'

const TIER_ICON: Record<Tier, LucideIcon> = {
  free: Gift,
  basic: Rocket,
  standard: Star,
  premium: Crown,
  admin: ShieldCheck,
}

export function DashboardContent({ profile }: { profile: UserProfile }) {
  const firstName = profile.name.split(' ')[0] || 'Trader'
  const tier = normalizeTier(profile.plan)
  const TierIcon = TIER_ICON[tier]

  return (
    <main className="coco coco-dark relative min-h-dvh overflow-hidden bg-[#0b0618]">
      <span className="coco-dash-glow coco-dash-glow-a" aria-hidden="true" />
      <span className="coco-dash-glow coco-dash-glow-b" aria-hidden="true" />

      <TopNav />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-4 px-4 pb-32 pt-6 sm:gap-6 sm:px-6 sm:pt-8 md:pb-14 lg:pt-10">
        {/* Operator card */}
        <section className="coco-dash-hero" data-testid="dashboard-profile">
          <span className="coco-dash-hero-glow" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
            <span className="coco-dash-avatar">
              <Image
                src="/coco-ai.jpg"
                alt={`${firstName} avatar`}
                width={112}
                height={112}
                className="h-full w-full rounded-[18px] object-cover"
                priority
              />
            </span>

            <div className="min-w-0 flex-1">
              <span className="coco-eyebrow">
                <BrainCircuit className="h-3 w-3" />
                Welcome back
              </span>
              <div className="mt-3 flex flex-col items-center gap-2.5 sm:flex-row sm:items-center">
                <h1
                  className="coco-display coco-title-gradient text-balance text-[1.6rem] leading-tight sm:text-[2.1rem]"
                  data-testid="dashboard-name"
                >
                  {profile.name}
                </h1>
                <span className="coco-dash-plan" data-testid="dashboard-plan">
                  <TierIcon className="h-3 w-3" />
                  {profile.plan}
                </span>
              </div>
              <p className="mx-auto mt-3 max-w-[48ch] text-pretty text-[13px] leading-relaxed text-white/58 sm:mx-0 sm:text-sm">
                Your intelligent trading companion — reading OTC and real market charts to deliver
                fast, precise, AI-powered signals.
              </p>
            </div>
          </div>
        </section>

        {/* Daily usage */}
        <section>
          <TradingChart />
        </section>

        {/* Trading tools */}
        <section className="coco-dash-panel" data-testid="dashboard-tools">
          <div className="relative z-10">
            <div className="flex items-start gap-3.5">
              <span className="coco-dash-panel-icon">
                <LayoutGrid className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="coco-sub text-[18px] text-white sm:text-[21px]">Trading tools</h2>
                <p className="mt-0.5 text-[13px] text-white/55">
                  AI-powered chart analysis, ready to use.
                </p>
              </div>
            </div>

            <div className="my-5 h-px w-full bg-gradient-to-r from-[rgba(196,166,255,0.45)] via-white/10 to-transparent" />

            <ToolCards />
          </div>
        </section>
      </div>
    </main>
  )
}
