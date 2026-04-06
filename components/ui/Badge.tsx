import { ReactNode } from 'react'

interface BadgeProps {
  variant?: 'cyan' | 'amber' | 'green' | 'red' | 'neutral' | 'purple'
  children: ReactNode
  className?: string
}

const variantClasses = {
  cyan: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30',
  amber: 'bg-accent-amber/10 text-accent-amber border-accent-amber/30',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  red: 'bg-red-500/10 text-red-400 border-red-500/30',
  neutral: 'bg-bg-elevated text-text-secondary border-border-bright',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
