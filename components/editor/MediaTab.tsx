'use client'

import { useRef } from 'react'
import { useEditor, BackgroundStyle } from './EditorContext'
import { MUSIC_TRACKS } from '@/lib/mockData'
import { useToast } from '@/components/ToastProvider'
import { Upload, Play, Layers, Circle, Cpu, Minus, Music } from 'lucide-react'

const BG_STYLES: { id: BackgroundStyle; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'gradient', label: 'AI Gradient', icon: <Layers size={14} />, desc: 'Animated color wash' },
  { id: 'particles', label: 'Particles', icon: <Circle size={14} />, desc: 'Connected particle field' },
  { id: 'geometric', label: 'Geometric', icon: <Cpu size={14} />, desc: 'Rotating shapes' },
  { id: 'minimal', label: 'Minimal', icon: <Minus size={14} />, desc: 'Clean solid fill' },
]

export function MediaTab() {
  const { backgroundStyle, selectedTrack, updateField } = useEditor()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      updateField('logoDataUrl', reader.result as string)
      toast('Logo uploaded successfully!', 'success')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      {/* Logo upload */}
      <div>
        <p className="text-sm text-text-secondary font-medium mb-3">Logo</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all duration-150 group"
        >
          <Upload size={20} className="text-text-muted group-hover:text-accent-cyan transition-colors" />
          <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
            Drop your logo here or <span className="text-accent-cyan">browse</span>
          </p>
          <p className="text-xs text-text-muted">PNG, SVG, or JPG — max 2MB</p>
        </button>
      </div>

      {/* Background style */}
      <div>
        <p className="text-sm text-text-secondary font-medium mb-3">Background Style</p>
        <div className="grid grid-cols-2 gap-2">
          {BG_STYLES.map(style => {
            const isActive = backgroundStyle === style.id
            return (
              <button
                key={style.id}
                onClick={() => updateField('backgroundStyle', style.id)}
                className={`
                  p-3 rounded-xl border transition-all duration-150 text-left
                  ${isActive
                    ? 'border-accent-cyan bg-accent-cyan/5'
                    : 'border-border bg-bg-elevated hover:border-border-bright'
                  }
                `}
              >
                <div className={`flex items-center gap-1.5 mb-1 ${isActive ? 'text-accent-cyan' : 'text-text-secondary'}`}>
                  {style.icon}
                  <span className="text-xs font-semibold">{style.label}</span>
                </div>
                <p className="text-xs text-text-muted">{style.desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Music tracks */}
      <div>
        <p className="text-sm text-text-secondary font-medium mb-3 flex items-center gap-2">
          <Music size={14} />
          Background Music
        </p>
        <div className="space-y-1.5">
          {MUSIC_TRACKS.map(track => {
            const isActive = selectedTrack?.id === track.id
            return (
              <button
                key={track.id}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-150
                  ${isActive
                    ? 'border-accent-cyan bg-accent-cyan/5'
                    : 'border-border bg-bg-elevated hover:border-border-bright'
                  }
                `}
                onClick={() => updateField('selectedTrack', isActive ? null : track)}
              >
                <button
                  onClick={e => {
                    e.stopPropagation()
                    toast('Music preview is not available in the demo.', 'info')
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                    isActive
                      ? 'bg-accent-cyan/20 border-accent-cyan text-accent-cyan'
                      : 'border-border text-text-muted hover:border-border-bright hover:text-text-secondary'
                  }`}
                >
                  <Play size={12} fill="currentColor" />
                </button>
                <div className="flex-1 text-left min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? 'text-accent-cyan' : 'text-text-primary'}`}>
                    {track.name}
                  </p>
                  <p className="text-xs text-text-muted">{track.genre} · {track.bpm} BPM · {track.mood}</p>
                </div>
                <span className="text-xs text-text-muted shrink-0">{track.duration}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
