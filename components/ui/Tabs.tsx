'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Tab {
  id: string
  label: string
  icon?: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex border-b border-border ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            relative px-5 py-3.5 text-sm font-medium flex items-center gap-2 transition-colors duration-150
            ${activeTab === tab.id ? 'text-accent-cyan' : 'text-text-secondary hover:text-text-primary'}
          `}
        >
          {tab.icon}
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-cyan rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
