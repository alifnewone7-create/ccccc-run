'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  Radio,
  Telescope,
  Menu,
  ScanLine,
  ScanSearch,
  Newspaper,
  SlidersHorizontal,
  LogOut,
  Home,
  X,
  ChevronRight,
  Crosshair,
} from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { cn } from '@/lib/utils'

const MORE_LINKS = [
  { label: 'OTC Chart Analyzer', href: '/otc-chart-analyzer', icon: ScanLine },
  { label: 'Real Chart Analyzer', href: '/real-chart-analyzer', icon: ScanSearch },
  { label: 'News Signals', href: '/news-signals', icon: Newspaper },
  { label: 'Management', href: '/management', icon: SlidersHorizontal },
  { label: 'Landing page', href: '/', icon: Home },
]

const ANALYZERS = [
  { label: 'OTC Chart Analyzer', href: '/otc-chart-analyzer', icon: ScanLine },
  { label: 'Real Chart Analyzer', href: '/real-chart-analyzer', icon: ScanSearch },
]

export function CocoBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, logout } = useAuth()
  const [sheet, setSheet] = useState<'more' | 'analyzer' | null>(null)

  useEffect(() => setSheet(null), [pathname])

  useEffect(() => {
    if (!sheet) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [sheet])

  const analyzerActive = ANALYZERS.some((a) => a.href === pathname)
  const moreActive = MORE_LINKS.some((l) => l.href === pathname && l.href !== '/')

  async function handleLogout() {
    await logout()
    router.push('/login')
  }

  return (
    <>
      {sheet && (
        <div className="coco fixed inset-0 z-[90] md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setSheet(null)}
            className="absolute inset-0 cursor-default bg-[#07041a]/75 backdrop-blur-sm"
          />
          <div className="coco-sheet absolute inset-x-0 bottom-0 pb-[104px]">
            {sheet === 'more' ? (
              <>
                <div className="flex items-center gap-3 border-b border-white/8 px-5 pb-4 pt-5">
                  <span className="relative h-11 w-11 overflow-hidden rounded-2xl ring-1 ring-white/15">
                    <Image src="/coco-ai.jpg" alt="Coco AI" fill sizes="44px" className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="coco-sub truncate text-[15px] text-white">
                      {profile?.name || 'Trader'}
                    </p>
                    <p className="coco-mono text-[10px] uppercase tracking-[0.12em] text-[#c4a6ff]/80">
                      {profile?.plan || 'free'} plan
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSheet(null)}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] text-white/70"
                    data-testid="bottom-nav-more-close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1.5 px-3 py-3">
                  {MORE_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={cn('coco-sheet-link', pathname === l.href && 'is-active')}
                      data-testid={`bottom-nav-more-${l.href.replace(/\//g, '') || 'home'}`}
                    >
                      <span className="coco-sheet-link-icon">
                        <l.icon className="h-[18px] w-[18px]" />
                      </span>
                      {l.label}
                      <ChevronRight className="ml-auto h-4 w-4 text-white/30" />
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="coco-sheet-link text-[#ff8f8f]"
                    data-testid="bottom-nav-logout"
                  >
                    <span className="coco-sheet-link-icon border-[#ff8f8f]/25 bg-[#ff8f8f]/10 text-[#ff8f8f]">
                      <LogOut className="h-[18px] w-[18px]" />
                    </span>
                    Log out
                  </button>
                </nav>
              </>
            ) : (
              <nav className="flex flex-col gap-1.5 px-3 py-4">
                <p className="coco-mono px-3 pb-2 text-[10px] uppercase tracking-[0.14em] text-white/40">
                  Choose analyzer
                </p>
                {ANALYZERS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn('coco-sheet-link', pathname === l.href && 'is-active')}
                    data-testid={`bottom-nav-analyzer-${l.href.replace(/\//g, '')}`}
                  >
                    <span className="coco-sheet-link-icon">
                      <l.icon className="h-[18px] w-[18px]" />
                    </span>
                    {l.label}
                    <ChevronRight className="ml-auto h-4 w-4 text-white/30" />
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      )}

      <nav className="coco coco-bottom-nav md:hidden" data-testid="bottom-nav">
        <Link
          href="/dashboard"
          className={cn('coco-bnav-item', pathname === '/dashboard' && 'is-active')}
          data-testid="bottom-nav-dashboard"
        >
          <LayoutDashboard className="h-[19px] w-[19px]" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/live-signals"
          className={cn('coco-bnav-item', pathname === '/live-signals' && 'is-active')}
          data-testid="bottom-nav-live"
        >
          <Radio className="h-[19px] w-[19px]" />
          <span>Live</span>
        </Link>

        <button
          type="button"
          onClick={() => setSheet(sheet === 'analyzer' ? null : 'analyzer')}
          aria-label="Chart analyzer"
          className={cn('coco-bnav-center', analyzerActive && 'is-active')}
          data-testid="bottom-nav-analyzer"
        >
          <span className="coco-bnav-center-tile">
            <Crosshair className="h-6 w-6" />
          </span>
          <span className="coco-bnav-center-label">Analyzer</span>
        </button>

        <Link
          href="/future-signals"
          className={cn('coco-bnav-item', pathname === '/future-signals' && 'is-active')}
          data-testid="bottom-nav-future"
        >
          <Telescope className="h-[19px] w-[19px]" />
          <span>Future</span>
        </Link>

        <button
          type="button"
          onClick={() => setSheet(sheet === 'more' ? null : 'more')}
          className={cn('coco-bnav-item', (moreActive || sheet === 'more') && 'is-active')}
          data-testid="bottom-nav-more"
        >
          <Menu className="h-[19px] w-[19px]" />
          <span>More</span>
        </button>
      </nav>
    </>
  )
}
