'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { AdCanvas } from './AdCanvas'
import { MockAd } from '@/lib/mockData'

interface VideoPlayerProps {
  ad: MockAd
}

export function VideoPlayer({ ad }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(true)
  const [progressPercent, setProgressPercent] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgressPercent(p => {
          if (p >= 100) { setPlaying(false); return 100 }
          return p + 0.33
        })
      }, 100)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing])

  function handlePlayPause() {
    if (progressPercent >= 100) {
      setProgressPercent(0)
      setPlaying(true)
    } else {
      setPlaying(p => !p)
    }
  }

  const [min, sec] = ad.duration.split(':').map(Number)
  const totalSecs = min * 60 + sec
  const elapsed = Math.floor((progressPercent / 100) * totalSecs)
  const elapsedMin = Math.floor(elapsed / 60)
  const elapsedSec = elapsed % 60

  return (
    <div className="flex flex-col gap-3">
      {/* Canvas */}
      <div className="flex justify-center bg-black/30 rounded-xl overflow-hidden">
        <AdCanvas
          businessName={ad.businessName}
          tagline={ad.tagline}
          ctaText="Watch Now"
          logoText={ad.logoText}
          primaryColor={ad.primaryColor}
          secondaryColor={ad.secondaryColor}
          backgroundColor={ad.backgroundColor}
          format={ad.format}
          animated={playing}
          className="rounded-xl"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 px-1">
        <button
          onClick={handlePlayPause}
          className="w-8 h-8 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan transition-all shrink-0"
        >
          {playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
        </button>

        {/* Progress bar */}
        <div
          className="flex-1 h-1 bg-border rounded-full relative overflow-hidden cursor-pointer"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const pct = ((e.clientX - rect.left) / rect.width) * 100
            setProgressPercent(Math.max(0, Math.min(100, pct)))
          }}
        >
          <div
            className="absolute left-0 top-0 h-full bg-accent-cyan rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <span className="text-text-muted text-xs tabular-nums shrink-0">
          {elapsedMin}:{String(elapsedSec).padStart(2, '0')} / {ad.duration}
        </span>
        <Volume2 size={14} className="text-text-muted shrink-0" />
      </div>
    </div>
  )
}
