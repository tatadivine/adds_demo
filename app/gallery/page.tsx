'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Edit3, Eye, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { AdCanvas } from '@/components/preview/AdCanvas'
import { VideoPlayer } from '@/components/preview/VideoPlayer'
import { MOCK_ADS, MockAd, BRAND_PROFILES } from '@/lib/mockData'
import { useEditor } from '@/components/editor/EditorContext'
import Link from 'next/link'

type FilterFormat = 'all' | 'landscape' | 'vertical' | 'square'

const FORMAT_BADGE_VARIANTS: Record<string, 'cyan' | 'amber' | 'purple'> = {
  landscape: 'cyan',
  vertical: 'amber',
  square: 'purple',
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
}

export default function GalleryPage() {
  const router = useRouter()
  const { loadBrandProfile } = useEditor()
  const [filter, setFilter] = useState<FilterFormat>('all')
  const [previewAd, setPreviewAd] = useState<MockAd | null>(null)

  const filtered = filter === 'all' ? MOCK_ADS : MOCK_ADS.filter(a => a.format === filter)

  function handleEdit(ad: MockAd) {
    const profile = BRAND_PROFILES.find(p => p.businessName === ad.businessName) ?? BRAND_PROFILES[3]
    loadBrandProfile({
      ...profile,
      primaryColor: ad.primaryColor,
      secondaryColor: ad.secondaryColor,
      backgroundColor: ad.backgroundColor,
    })
    router.push('/editor')
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const FILTER_OPTIONS: { id: FilterFormat; label: string }[] = [
    { id: 'all', label: 'All Ads' },
    { id: 'landscape', label: 'Landscape' },
    { id: 'vertical', label: 'Vertical' },
    { id: 'square', label: 'Square' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="font-display text-4xl font-extrabold text-text-primary mb-1">
            Saved Ads
          </h1>
          <p className="text-text-secondary">{MOCK_ADS.length} ads in your library</p>
        </div>
        <Link href="/generate">
          <Button variant="primary" size="md" icon={<Plus size={15} />}>
            Create New Ad
          </Button>
        </Link>
      </motion.div>

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex gap-2 mb-8 border-b border-border pb-4"
      >
        {FILTER_OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => setFilter(opt.id)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150
              ${filter === opt.id
                ? 'bg-accent-cyan text-bg-base shadow-glow-cyan'
                : 'border border-border text-text-secondary hover:text-text-primary hover:border-border-bright'
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map(ad => (
          <motion.div
            key={ad.id}
            variants={itemVariants}
            className="group glass rounded-2xl overflow-hidden hover:border-border-bright transition-colors"
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden bg-black/20">
              <div className="flex items-center justify-center p-4">
                <AdCanvas
                  businessName={ad.businessName}
                  tagline={ad.tagline}
                  ctaText="Learn More"
                  logoText={ad.logoText}
                  primaryColor={ad.primaryColor}
                  secondaryColor={ad.secondaryColor}
                  backgroundColor={ad.backgroundColor}
                  format={ad.format}
                  animated={false}
                  className="rounded-lg"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Eye size={14} />}
                  onClick={() => setPreviewAd(ad)}
                  className="backdrop-blur-sm"
                >
                  Preview
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Edit3 size={14} />}
                  onClick={() => handleEdit(ad)}
                >
                  Edit
                </Button>
              </div>
            </div>

            {/* Card info */}
            <div className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-text-primary font-semibold text-sm truncate">{ad.businessName}</p>
                <p className="text-text-muted text-xs mt-0.5">{formatDate(ad.createdAt)} · {ad.duration}</p>
              </div>
              <Badge variant={FORMAT_BADGE_VARIANTS[ad.format] ?? 'neutral'} className="shrink-0 capitalize">
                {ad.format}
              </Badge>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-text-muted">
          <p className="text-lg">No {filter} ads found.</p>
        </div>
      )}

      {/* Preview modal */}
      <Modal
        isOpen={!!previewAd}
        onClose={() => setPreviewAd(null)}
        title={previewAd?.businessName}
        size="lg"
      >
        {previewAd && (
          <div className="p-5">
            <VideoPlayer ad={previewAd} />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex gap-2">
                <Badge variant={FORMAT_BADGE_VARIANTS[previewAd.format] ?? 'neutral'} className="capitalize">
                  {previewAd.format}
                </Badge>
                <Badge variant="neutral">{previewAd.duration}</Badge>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={<Edit3 size={14} />}
                onClick={() => { setPreviewAd(null); handleEdit(previewAd) }}
              >
                Edit Ad
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
