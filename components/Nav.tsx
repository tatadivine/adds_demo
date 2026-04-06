'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { Button } from './ui/Button'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/generate', label: 'Generate' },
  { href: '/editor', label: 'Editor' },
  { href: '/gallery', label: 'Gallery' },
]

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-accent-cyan rounded-lg flex items-center justify-center shadow-glow-cyan group-hover:shadow-glow-cyan-lg transition-shadow">
              <Zap size={14} className="text-bg-base" fill="currentColor" />
            </div>
            <span className="font-display text-lg font-bold text-text-primary tracking-tight">
              Ad<span className="text-accent-cyan">Studio</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150
                    ${isActive ? 'text-accent-cyan' : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'}
                  `}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-cyan rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/generate">
              <Button size="sm" variant="primary">
                Create Ad
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      px-4 py-3 rounded-xl text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-accent-cyan/10 text-accent-cyan'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-2 pb-1">
                <Link href="/generate" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" className="w-full">Create Ad</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
