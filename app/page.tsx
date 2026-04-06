'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Sparkles, Clock, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AdCanvas } from '@/components/preview/AdCanvas'
import { Badge } from '@/components/ui/Badge'
import { BRAND_PROFILES } from '@/lib/mockData'

const SHOWCASE_ADS = [
  {
    ...BRAND_PROFILES[2],
    format: 'landscape' as const,
    backgroundStyle: 'particles' as const,
  },
  {
    ...BRAND_PROFILES[1],
    format: 'square' as const,
    backgroundStyle: 'gradient' as const,
  },
  {
    ...BRAND_PROFILES[0],
    format: 'landscape' as const,
    backgroundStyle: 'geometric' as const,
  },
]

const FEATURES = [
  {
    icon: <Clock size={20} className="text-accent-cyan" />,
    title: 'URL to Ad in Seconds',
    desc: 'Paste any business URL and watch our AI extract brand identity, copy, and visuals automatically.',
  },
  {
    icon: <Sparkles size={20} className="text-accent-amber" />,
    title: 'AI-Powered Copywriting',
    desc: 'Generate on-brand headlines, taglines, and calls-to-action tuned to your industry and tone.',
  },
  {
    icon: <Download size={20} className="text-accent-cyan" />,
    title: 'Export-Ready Assets',
    desc: 'Download 16:9, 9:16, or 1:1 formats optimized for every major ad platform.',
  },
]

export default function HomePage() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) {
      setError('Please enter a URL.')
      return
    }
    let cleanUrl = url.trim()
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl
    }
    setError('')
    router.push(`/generate?url=${encodeURIComponent(cleanUrl)}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-100"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.07) 0%, transparent 65%)',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 text-accent-cyan text-sm font-medium mb-8"
          >
            <Sparkles size={14} />
            AI-Powered Ad Creation
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-text-primary mb-4 leading-[1.05] tracking-tight">
            Create Stunning Ads
            <br />
            <span className="text-accent-cyan">With AI</span>
          </h1>

          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Paste any business URL. We scan it, extract the brand, and generate a
            polished video ad — ready to publish in under a minute.
          </p>

          {/* URL input */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Globe
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
              <input
                type="text"
                value={url}
                onChange={e => { setUrl(e.target.value); setError('') }}
                placeholder="https://yourbusiness.com"
                className={`
                  w-full bg-bg-elevated border rounded-xl pl-10 pr-4 py-4 text-text-primary text-base
                  placeholder:text-text-muted transition-all duration-150 focus:outline-none focus:ring-2
                  ${error
                    ? 'border-red-600/60 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-border focus:border-accent-cyan focus:ring-accent-cyan/20'
                  }
                `}
              />
            </div>
            <Button type="submit" size="lg" variant="primary" icon={<ArrowRight size={18} />}>
              Generate Ad
            </Button>
          </form>
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
          <p className="text-text-muted text-sm mt-4">
            No account required · Free demo · Results in seconds
          </p>
        </motion.div>
      </section>

      {/* Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-text-muted text-sm font-medium uppercase tracking-widest mb-3">
            Example Outputs
          </p>
          <h2 className="font-display text-3xl font-bold text-text-primary">
            From URL to Ad in Seconds
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHOWCASE_ADS.map((ad, i) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative glass rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="flex items-center justify-center p-4 bg-black/20">
                <AdCanvas
                  businessName={ad.businessName}
                  tagline={ad.tagline}
                  ctaText={ad.ctaText}
                  logoText={ad.logoText}
                  primaryColor={ad.primaryColor}
                  secondaryColor={ad.secondaryColor}
                  backgroundColor={ad.backgroundColor}
                  format={ad.format}
                  backgroundStyle={ad.backgroundStyle}
                  animated={false}
                  className="rounded-lg"
                />
              </div>
              <div className="px-5 py-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-text-primary text-sm">{ad.businessName}</p>
                    <p className="text-text-muted text-xs mt-0.5 line-clamp-1">{ad.tagline}</p>
                  </div>
                  <Badge variant="cyan" className="shrink-0">{ad.industry}</Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features strip */}
      <section className="border-t border-border bg-bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">{f.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl font-bold text-text-primary mb-4">
            Ready to see it in action?
          </h2>
          <p className="text-text-secondary mb-8">
            Enter your website URL above or try one of our sample businesses.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['alpineroofing.com', 'bellasbakery.co', 'techflowsolutions.io'].map(sample => (
              <button
                key={sample}
                onClick={() => router.push(`/generate?url=https://${sample}`)}
                className="px-4 py-2 rounded-xl border border-border text-text-secondary text-sm hover:border-accent-cyan hover:text-accent-cyan transition-all duration-150 hover:bg-accent-cyan/5"
              >
                {sample}
              </button>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
