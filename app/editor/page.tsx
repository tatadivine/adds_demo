'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, FileText, Palette, Image, Mic } from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'
import { AdCanvas } from '@/components/preview/AdCanvas'
import { ContentTab } from '@/components/editor/ContentTab'
import { StyleTab } from '@/components/editor/StyleTab'
import { MediaTab } from '@/components/editor/MediaTab'
import { VoiceoverTab } from '@/components/editor/VoiceoverTab'
import { BottomBar } from '@/components/editor/BottomBar'
import { useEditor } from '@/components/editor/EditorContext'

const EDITOR_TABS = [
  { id: 'content', label: 'Content', icon: <FileText size={14} /> },
  { id: 'style', label: 'Style', icon: <Palette size={14} /> },
  { id: 'media', label: 'Media', icon: <Image size={14} /> },
  { id: 'voiceover', label: 'Voiceover', icon: <Mic size={14} /> },
]

export default function EditorPage() {
  const {
    businessName,
    tagline,
    ctaText,
    bodyCopy,
    logoText,
    selectedPalette,
    fontStyle,
    adFormat,
    backgroundStyle,
  } = useEditor()

  const [activeTab, setActiveTab] = useState('content')
  const [playing, setPlaying] = useState(true)

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* ── LEFT: Canvas preview ───────────────────────────────────────── */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-bg-base p-6 gap-4 md:h-auto h-[50vh] shrink-0">
          <div className="relative">
            <AdCanvas
              businessName={businessName}
              tagline={tagline}
              ctaText={ctaText}
              bodyCopy={bodyCopy}
              logoText={logoText}
              primaryColor={selectedPalette.primary}
              secondaryColor={selectedPalette.secondary}
              backgroundColor={selectedPalette.background}
              fontStyle={fontStyle}
              backgroundStyle={backgroundStyle}
              format={adFormat}
              animated={playing}
              className="shadow-2xl max-w-full"
            />
          </div>

          {/* Playback controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPlaying(p => !p)}
              className="w-10 h-10 rounded-full border border-border bg-bg-elevated flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-cyan transition-all"
            >
              {playing
                ? <Pause size={16} fill="currentColor" />
                : <Play size={16} fill="currentColor" />
              }
            </button>

            {/* Timeline bar (decorative) */}
            <div className="flex-1 max-w-xs h-1 bg-border rounded-full relative overflow-hidden">
              {playing && (
                <motion.div
                  className="absolute left-0 top-0 h-full bg-accent-cyan rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
                />
              )}
            </div>

            <span className="text-text-muted text-xs tabular-nums">0:30</span>
          </div>
        </div>

        {/* ── RIGHT: Controls ───────────────────────────────────────────── */}
        <div className="w-full md:w-1/2 bg-bg-surface border-l border-border flex flex-col overflow-hidden">
          <Tabs tabs={EDITOR_TABS} activeTab={activeTab} onChange={setActiveTab} />

          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'content' && <ContentTab />}
            {activeTab === 'style' && <StyleTab />}
            {activeTab === 'media' && <MediaTab />}
            {activeTab === 'voiceover' && <VoiceoverTab />}
          </div>

          <BottomBar />
        </div>
      </div>
    </div>
  )
}
