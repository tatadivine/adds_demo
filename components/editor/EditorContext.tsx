'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import {
  BrandProfile,
  ColorPalette,
  MusicTrack,
  VoiceOption,
  COLOR_PALETTES,
  BRAND_PROFILES,
} from '@/lib/mockData'

export type FontStyle = 'modern' | 'bold' | 'elegant' | 'playful'
export type AdFormat = 'landscape' | 'vertical' | 'square'
export type BackgroundStyle = 'gradient' | 'particles' | 'geometric' | 'minimal'

export interface EditorState {
  businessName: string
  tagline: string
  ctaText: string
  bodyCopy: string
  selectedPalette: ColorPalette
  fontStyle: FontStyle
  adFormat: AdFormat
  logoText: string
  logoDataUrl?: string
  backgroundStyle: BackgroundStyle
  selectedTrack: MusicTrack | null
  voiceoverEnabled: boolean
  selectedVoice: VoiceOption | null
  voiceSpeed: number
}

type HistoryEntry = Omit<EditorState, never>

interface EditorContextValue extends EditorState {
  updateField: <K extends keyof EditorState>(key: K, value: EditorState[K]) => void
  loadBrandProfile: (profile: BrandProfile) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const DEFAULT_STATE: EditorState = {
  businessName: BRAND_PROFILES[2].businessName,
  tagline: BRAND_PROFILES[2].tagline,
  ctaText: BRAND_PROFILES[2].ctaText,
  bodyCopy: BRAND_PROFILES[2].bodyCopy,
  selectedPalette: COLOR_PALETTES[0],
  fontStyle: 'modern',
  adFormat: 'landscape',
  logoText: BRAND_PROFILES[2].logoText,
  backgroundStyle: 'particles',
  selectedTrack: null,
  voiceoverEnabled: false,
  selectedVoice: null,
  voiceSpeed: 1,
}

const EditorContext = createContext<EditorContextValue | null>(null)

export function useEditor() {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error('useEditor must be used within EditorProvider')
  return ctx
}

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>(DEFAULT_STATE)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const pushHistory = useCallback((current: EditorState) => {
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), { ...current }].slice(-20)
      setHistoryIndex(newHistory.length - 1)
      return newHistory
    })
  }, [historyIndex])

  const updateField = useCallback(<K extends keyof EditorState>(key: K, value: EditorState[K]) => {
    setState(prev => {
      pushHistory(prev)
      return { ...prev, [key]: value }
    })
  }, [pushHistory])

  const loadBrandProfile = useCallback((profile: BrandProfile) => {
    setState(prev => ({
      ...prev,
      businessName: profile.businessName,
      tagline: profile.tagline,
      ctaText: profile.ctaText,
      bodyCopy: profile.bodyCopy,
      logoText: profile.logoText,
      selectedPalette: {
        id: profile.id,
        name: profile.businessName,
        primary: profile.primaryColor,
        secondary: profile.secondaryColor,
        background: profile.backgroundColor,
        text: '#F0F0FF',
      },
    }))
  }, [])

  const undo = useCallback(() => {
    if (historyIndex < 0) return
    const prev = history[historyIndex]
    if (prev) {
      setState(prev)
      setHistoryIndex(i => i - 1)
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return
    const next = history[historyIndex + 1]
    if (next) {
      setState(next)
      setHistoryIndex(i => i + 1)
    }
  }, [history, historyIndex])

  return (
    <EditorContext.Provider value={{
      ...state,
      updateField,
      loadBrandProfile,
      undo,
      redo,
      canUndo: historyIndex >= 0,
      canRedo: historyIndex < history.length - 1,
    }}>
      {children}
    </EditorContext.Provider>
  )
}
