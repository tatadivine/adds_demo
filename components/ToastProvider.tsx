'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface ToastContextValue {
  toast: (message: string, type?: Toast['type']) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

const icons = {
  success: <CheckCircle size={16} className="text-accent-cyan shrink-0" />,
  error: <AlertCircle size={16} className="text-red-400 shrink-0" />,
  info: <Info size={16} className="text-accent-cyan shrink-0" />,
  warning: <AlertTriangle size={16} className="text-accent-amber shrink-0" />,
}

const borderColors = {
  success: 'border-accent-cyan/40',
  error: 'border-red-500/40',
  info: 'border-accent-cyan/40',
  warning: 'border-accent-amber/40',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence mode="sync">
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className={`glass-bright rounded-xl px-4 py-3 flex items-start gap-3 pointer-events-auto border ${borderColors[t.type]}`}
            >
              {icons[t.type]}
              <p className="text-sm text-text-primary leading-snug flex-1">{t.message}</p>
              <button
                onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
                className="text-text-muted hover:text-text-primary transition-colors shrink-0 mt-0.5"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
