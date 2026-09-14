'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Copy, Headset } from 'lucide-react'
import { type UserProfile } from '@/components/auth-provider'
import { normalizeTier, TIER_LABEL, TIER_DAILY_LIMIT } from '@/lib/tiers'
import {
  GlyphOperator,
  GlyphTier,
  GlyphMailRune,
  GlyphKeyId,
  GlyphClockRing,
} from '@/components/dashboard/dash-glyphs'

function formatJoined(ts: number) {
  if (!ts) return '—'
  try {
    return new Date(ts).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return '—'
  }
}

export function DashProfile({ profile }: { profile: UserProfile }) {
  const [copied, setCopied] = useState(false)
  const tier = normalizeTier(profile.plan)
  const limit = TIER_DAILY_LIMIT[tier]
  const firstName = profile.name.split(' ')[0] || 'Trader'

  const copyUid = async () => {
    try {
      await navigator.clipboard.writeText(profile.uid)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section
      id="profile"
      className="relative z-10 mx-auto w-full max-w-[1140px] px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8"
      data-testid="dashboard-profile"
    >
      <div className="coco-d2-hero coco-rise" style={{ '--d': '40ms' } as React.CSSProperties}>
        <span className="coco-d2-hero-line" aria-hidden="true" />

        <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-7 sm:text-left">
          <span className="coco-d2-avatar">
            <Image
              src="/coco-ai.jpg"
              alt={`${firstName} avatar`}
              width={128}
              height={128}
              className="h-full w-full rounded-[21px] object-cover"
              priority
            />
          </span>

          <div className="min-w-0 flex-1">
            <span className="coco-eyebrow">
              <GlyphOperator className="h-3.5 w-3.5" />
              Operator profile
            </span>

            <div className="mt-3 flex flex-col items-center gap-2.5 sm:flex-row sm:items-center">
              <h1
                className="coco-display coco-title-gradient text-balance text-[1.7rem] leading-tight sm:text-[2.3rem]"
                data-testid="dashboard-name"
              >
                {profile.name}
              </h1>
              <span className="coco-d2-plan" data-testid="dashboard-plan">
                <GlyphTier className="h-3.5 w-3.5" />
                {TIER_LABEL[tier]}
              </span>
            </div>

            <p className="mx-auto mt-3 max-w-[52ch] text-pretty text-[13px] leading-relaxed text-white/60 sm:mx-0 sm:text-sm">
              Welcome back, {firstName}. Your engine is synced and reading OTC and real market
              charts — precise, AI-verified calls, on demand.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a href="#tools" className="coco-btn coco-btn-primary w-full sm:w-auto">
                Open toolkit
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/management" className="coco-btn coco-btn-ghost w-full sm:w-auto">
                <Headset className="h-4 w-4" />
                Account & support
              </Link>
            </div>
          </div>
        </div>

        {/* identity meta */}
        <div className="relative mt-7 grid gap-2.5 sm:grid-cols-3">
          <div className="coco-d2-meta">
            <span className="coco-d2-meta-icon">
              <GlyphMailRune className="h-[17px] w-[17px]" />
            </span>
            <div className="min-w-0">
              <p className="coco-mono text-[9.5px] uppercase tracking-[0.16em] text-white/40">
                Email
              </p>
              <p className="truncate text-[13px] text-white/80" data-testid="dashboard-email">
                {profile.email}
              </p>
            </div>
          </div>

          <button type="button" onClick={copyUid} className="coco-d2-meta text-left">
            <span className="coco-d2-meta-icon">
              <GlyphKeyId className="h-[17px] w-[17px]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="coco-mono text-[9.5px] uppercase tracking-[0.16em] text-white/40">
                Operator ID
              </p>
              <p className="truncate font-mono text-[12.5px] text-white/80">{profile.uid}</p>
            </div>
            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg text-white/55">
              {copied ? (
                <Check className="h-3.5 w-3.5 text-[#8ef0c4]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </span>
          </button>

          <div className="coco-d2-meta">
            <span className="coco-d2-meta-icon">
              <GlyphClockRing className="h-[17px] w-[17px]" />
            </span>
            <div className="min-w-0">
              <p className="coco-mono text-[9.5px] uppercase tracking-[0.16em] text-white/40">
                Member since
              </p>
              <p className="truncate text-[13px] text-white/80">
                {formatJoined(profile.createdAt)}
                <span className="ml-2 text-white/40">
                  ·{' '}
                  {limit === null
                    ? 'unlimited'
                    : limit === 0
                      ? 'locked'
                      : `${limit}/tool daily`}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
