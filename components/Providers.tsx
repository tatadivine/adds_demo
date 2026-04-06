'use client'

import { ReactNode } from 'react'
import { ToastProvider } from './ToastProvider'
import { EditorProvider } from './editor/EditorContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <EditorProvider>
        {children}
      </EditorProvider>
    </ToastProvider>
  )
}
