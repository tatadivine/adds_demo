'use client'

import { useEditor } from './EditorContext'
import { useToast } from '@/components/ToastProvider'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useState } from 'react'
import { Undo2, Redo2, Save, Download, Calendar } from 'lucide-react'

export function BottomBar() {
  const { businessName, undo, redo, canUndo, canRedo } = useEditor()
  const { toast } = useToast()
  const [exportModalOpen, setExportModalOpen] = useState(false)

  function handleSave() {
    if (typeof window === 'undefined') return
    try {
      const saved = JSON.parse(localStorage.getItem('adstudio_drafts') || '[]')
      saved.push({ id: Date.now(), businessName, savedAt: new Date().toISOString() })
      localStorage.setItem('adstudio_drafts', JSON.stringify(saved.slice(-20)))
      toast('Draft saved successfully!', 'success')
    } catch {
      toast('Failed to save draft.', 'error')
    }
  }

  function handleExport() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement | null
    if (canvas) {
      try {
        const link = document.createElement('a')
        link.download = `${businessName.replace(/\s+/g, '-').toLowerCase()}-ad.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
        toast('Ad exported as PNG!', 'success')
        return
      } catch {
        // fall through to modal
      }
    }
    setExportModalOpen(true)
  }

  return (
    <>
      <div className="border-t border-border glass px-5 py-3 flex items-center justify-between shrink-0">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Undo"
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Undo2 size={16} />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Redo"
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Redo2 size={16} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<Save size={14} />}
            onClick={handleSave}
          >
            Save Draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Download size={14} />}
            onClick={handleExport}
          >
            Export Ad
          </Button>
        </div>
      </div>

      <Modal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        title="Export Ad"
        size="sm"
      >
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} className="text-accent-cyan" />
          </div>
          <h3 className="font-display text-lg font-bold text-text-primary mb-2">
            Full Export Available in Production
          </h3>
          <p className="text-text-secondary text-sm mb-6 leading-relaxed">
            Export to MP4, GIF, and all major ad formats is available in the full
            version. Schedule a demo to see it in action and discuss your requirements.
          </p>
          <Button variant="primary" className="w-full" onClick={() => setExportModalOpen(false)}>
            Got It
          </Button>
        </div>
      </Modal>
    </>
  )
}
