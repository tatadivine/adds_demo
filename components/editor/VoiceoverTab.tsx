'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEditor } from './EditorContext'
import { VOICE_OPTIONS } from '@/lib/mockData'
import { useToast } from '@/components/ToastProvider'
import { Mic, Mic2, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const SPEED_LABELS: Record<number, string> = {
  0.75: 'Slow',
  1: 'Normal',
  1.25: 'Fast',
  1.5: 'Very Fast',
}

export function VoiceoverTab() {
  const { voiceoverEnabled, selectedVoice, voiceSpeed, updateField } = useEditor()
  const { toast } = useToast()
  const [previewing, setPreviewing] = useState(false)

  async function handlePreview() {
    setPreviewing(true)
    await new Promise(r => setTimeout(r, 1500))
    setPreviewing(false)
    toast('Voiceover preview is not available in the demo.', 'info')
  }

  return (
    <div className="space-y-5">
      {/* Toggle */}
      <div className="flex items-center justify-between p-4 glass-bright rounded-xl">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${voiceoverEnabled ? 'bg-accent-cyan/20 text-accent-cyan' : 'bg-bg-elevated text-text-muted'}`}>
            {voiceoverEnabled ? <Mic size={16} /> : <Mic2 size={16} />}
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Auto-generated voiceover</p>
            <p className="text-xs text-text-muted">AI reads your ad copy aloud</p>
          </div>
        </div>
        <button
          onClick={() => updateField('voiceoverEnabled', !voiceoverEnabled)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-250 ${
            voiceoverEnabled ? 'bg-accent-cyan' : 'bg-border-bright'
          }`}
          role="switch"
          aria-checked={voiceoverEnabled}
        >
          <motion.div
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
            animate={{ left: voiceoverEnabled ? '28px' : '4px' }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {voiceoverEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden space-y-5"
          >
            {/* Voice picker */}
            <div>
              <p className="text-sm text-text-secondary font-medium mb-3">Select Voice</p>
              <div className="grid grid-cols-2 gap-2">
                {VOICE_OPTIONS.map(voice => {
                  const isActive = selectedVoice?.id === voice.id
                  return (
                    <button
                      key={voice.id}
                      onClick={() => updateField('selectedVoice', isActive ? null : voice)}
                      className={`
                        p-3 rounded-xl border transition-all duration-150 text-left
                        ${isActive
                          ? 'border-accent-cyan bg-accent-cyan/5'
                          : 'border-border bg-bg-elevated hover:border-border-bright'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          voice.gender === 'male'
                            ? 'bg-blue-500/20 text-blue-400'
                            : voice.gender === 'female'
                            ? 'bg-pink-500/20 text-pink-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {voice.name[0]}
                        </div>
                        <span className={`text-sm font-semibold ${isActive ? 'text-accent-cyan' : 'text-text-primary'}`}>
                          {voice.name}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">{voice.description}</p>
                      <p className="text-xs text-text-muted">{voice.accent}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Speed slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-text-secondary font-medium">Speed</p>
                <span className="text-sm text-accent-cyan font-semibold">
                  {SPEED_LABELS[voiceSpeed] || 'Normal'}
                </span>
              </div>
              <input
                type="range"
                min={0.75}
                max={1.5}
                step={0.25}
                value={voiceSpeed}
                onChange={e => updateField('voiceSpeed', parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>Slow</span>
                <span>Normal</span>
                <span>Fast</span>
                <span>Very Fast</span>
              </div>
            </div>

            {/* Preview */}
            <Button
              variant="secondary"
              className="w-full"
              icon={<Play size={14} fill="currentColor" />}
              loading={previewing}
              onClick={handlePreview}
              disabled={!selectedVoice}
            >
              {previewing ? 'Generating preview...' : 'Preview Voiceover'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
