'use client'

import { TopNav } from '@/components/top-nav'
import { CocoHeroBg } from '@/components/coco/coco-hero-bg'
import { DashProfile } from '@/components/dashboard/dash-profile'
import { DashTier } from '@/components/dashboard/dash-tier'
import { DashTools } from '@/components/dashboard/dash-tools'
import { type UserProfile } from '@/components/auth-provider'

export function DashboardContent({ profile }: { profile: UserProfile }) {
  return (
    <div className="coco min-h-dvh bg-[#0b0618]" data-testid="dashboard-page">
      {/* 1 — Profile (dark zone, same grading as the home hero) */}
      <div className="coco-dark">
        <TopNav />
        <div className="relative overflow-hidden">
          <CocoHeroBg />
          <DashProfile profile={profile} />
        </div>
      </div>

      {/* 2 — Tier + quota (light zone lifted by the home-page curve) */}
      <main className="pb-24 md:pb-0">
        <DashTier />
        {/* 3 — Tools */}
        <DashTools />
      </main>
    </div>
  )
}
