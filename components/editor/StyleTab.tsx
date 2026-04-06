'use client'

import { useEditor, FontStyle, AdFormat } from './EditorContext'
import { COLOR_PALETTES } from '@/lib/mockData'
import { Monitor, Smartphone, Square } from 'lucide-react'

const FONT_OPTIONS: { id: FontStyle; label: string; sample: string }[] = [
  { id: 'modern', label: 'Modern', sample: 'Aa' },
  { id: 'bold', label: 'Bold', sample: 'Aa' },
  { id: 'elegant', label: 'Elegant', sample: 'Aa' },
  { id: 'playful', label: 'Playful', sample: 'Aa' },
]

const FORMAT_OPTIONS: { id: AdFormat; label: string; icon: React.ReactNode; ratio: string }[] = [
  { id: 'landscape', label: 'Landscape', icon: <Monitor size={16} />, ratio: '16:9' },
  { id: 'vertical', label: 'Vertical', icon: <Smartphone size={16} />, ratio: '9:16' },
  { id: 'square', label: 'Square', icon: <Square size={16} />, ratio: '1:1' },
]

export function StyleTab() {
  const { selectedPalette, fontStyle, adFormat, updateField } = useEditor()

  return (
    <div className="space-y-6">
      {/* Color Palettes */}
      <div>
        <p className="text-sm text-text-secondary font-medium mb-3">Color Theme</p>
        <div className="grid grid-cols-2 gap-2">
          {COLOR_PALETTES.map(palette => {
            const isActive = selectedPalette.id === palette.id
            return (
              <button
                key={palette.id}
                onClick={() => updateField('selectedPalette', palette)}
                className={`
                  p-3 rounded-xl border transition-all duration-150 text-left
                  ${isActive
                    ? 'border-accent-cyan bg-accent-cyan/5 ring-1 ring-accent-cyan/30'
                    : 'border-border bg-bg-elevated hover:border-border-bright'
                  }
                `}
              >
                <div className="flex gap-1.5 mb-2">
                  <div
                    className="w-5 h-5 rounded-md border border-white/10"
                    style={{ backgroundColor: palette.primary }}
                  />
                  <div
                    className="w-5 h-5 rounded-md border border-white/10"
                    style={{ backgroundColor: palette.secondary }}
                  />
                  <div
                    className="w-5 h-5 rounded-md border border-white/10"
                    style={{ backgroundColor: palette.background }}
                  />
                </div>
                <p className={`text-xs font-medium ${isActive ? 'text-accent-cyan' : 'text-text-secondary'}`}>
                  {palette.name}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Font Style */}
      <div>
        <p className="text-sm text-text-secondary font-medium mb-3">Font Style</p>
        <div className="grid grid-cols-2 gap-2">
          {FONT_OPTIONS.map(opt => {
            const isActive = fontStyle === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => updateField('fontStyle', opt.id)}
                className={`
                  p-3 rounded-xl border transition-all duration-150 flex items-center gap-3
                  ${isActive
                    ? 'border-accent-cyan bg-accent-cyan/5 text-accent-cyan'
                    : 'border-border bg-bg-elevated hover:border-border-bright text-text-secondary'
                  }
                `}
              >
                <span className="text-xl font-bold">{opt.sample}</span>
                <span className="text-xs font-medium">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Ad Format */}
      <div>
        <p className="text-sm text-text-secondary font-medium mb-3">Ad Format</p>
        <div className="flex gap-2">
          {FORMAT_OPTIONS.map(opt => {
            const isActive = adFormat === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => updateField('adFormat', opt.id)}
                className={`
                  flex-1 p-3 rounded-xl border transition-all duration-150 flex flex-col items-center gap-1.5
                  ${isActive
                    ? 'border-accent-cyan bg-accent-cyan/5 text-accent-cyan'
                    : 'border-border bg-bg-elevated hover:border-border-bright text-text-secondary'
                  }
                `}
              >
                {opt.icon}
                <span className="text-xs font-medium">{opt.label}</span>
                <span className="text-xs text-text-muted">{opt.ratio}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
