'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RefreshCw, Download, Edit3, Globe, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AdCanvas } from '@/components/preview/AdCanvas'
import { useToast } from '@/components/ToastProvider'
import { useEditor } from '@/components/editor/EditorContext'
import { detectBusiness, GENERATION_STEPS } from '@/lib/mockData'

type Step = 'input' | 'generating' | 'preview'

function GenerateInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { loadBrandProfile } = useEditor()

  const [step, setStep] = useState<Step>('input')
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [currentMsgIdx, setCurrentMsgIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [brand, setBrand] = useState(detectBusiness(''))
  const completedRef = useRef(false)

  // Auto-start if URL in query param
  useEffect(() => {
    const qUrl = searchParams.get('url')
    if (qUrl) {
      setUrl(qUrl)
      startGeneration(qUrl)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function startGeneration(targetUrl: string) {
    completedRef.current = false
    setStep('generating')
    setCurrentMsgIdx(0)
    setProgress(0)

    const total = GENERATION_STEPS.reduce((acc, s) => acc + s.duration, 0)
    let elapsed = 0

    for (let i = 0; i < GENERATION_STEPS.length; i++) {
      if (completedRef.current) return
      setCurrentMsgIdx(i)
      await new Promise(resolve => setTimeout(resolve, GENERATION_STEPS[i].duration))
      elapsed += GENERATION_STEPS[i].duration
      setProgress(Math.round((elapsed / total) * 100))
    }

    const detectedBrand = detectBusiness(targetUrl)
    setBrand(detectedBrand)
    setStep('preview')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) { setError('Please enter a URL.'); return }
    let cleanUrl = url.trim()
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl
    }
    setUrl(cleanUrl)
    setError('')
    startGeneration(cleanUrl)
  }

  function handleEdit() {
    loadBrandProfile(brand)
    router.push('/editor')
  }

  function handleReset() {
    completedRef.current = true
    setStep('input')
    setUrl('')
    setProgress(0)
    setCurrentMsgIdx(0)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">

          {/* ── STEP: INPUT ──────────────────────────────────────────────── */}
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="mb-2">
                <Badge variant="cyan">Step 1 of 3</Badge>
              </div>
              <h1 className="font-display text-4xl font-extrabold text-text-primary mt-4 mb-3">
                Enter your website URL
              </h1>
              <p className="text-text-secondary mb-8">
                We'll analyze your site and build a custom ad tailored to your brand.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  <input
                    type="text"
                    value={url}
                    onChange={e => { setUrl(e.target.value); setError('') }}
                    placeholder="https://yourbusiness.com"
                    autoFocus
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
                  Analyze
                </Button>
              </form>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <p className="text-text-muted text-sm w-full mb-1">Try a sample:</p>
                {['https://alpineroofing.com', 'https://bellasbakery.co', 'https://techflowsolutions.io'].map(s => (
                  <button
                    key={s}
                    onClick={() => { setUrl(s); setError('') }}
                    className="px-3 py-1.5 rounded-lg border border-border text-text-muted text-xs hover:border-accent-cyan hover:text-accent-cyan transition-colors"
                  >
                    {s.replace('https://', '')}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP: GENERATING ─────────────────────────────────────────── */}
          {step === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="max-w-lg mx-auto text-center"
            >
              {/* Spinner */}
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-border" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent-cyan border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-accent-cyan shadow-glow-cyan animate-pulse" />
                </div>
              </div>

              <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
                Creating your ad...
              </h2>

              {/* Status message with AnimatePresence */}
              <div className="h-8 flex items-center justify-center mb-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMsgIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-text-secondary text-base"
                  >
                    {GENERATION_STEPS[currentMsgIdx]?.message}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress bar */}
              <div className="relative h-1.5 bg-border rounded-full overflow-hidden mb-3">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-accent-cyan rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                />
              </div>

              {/* Step dots */}
              <div className="flex justify-center gap-1.5 mb-8">
                {GENERATION_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      i <= currentMsgIdx ? 'bg-accent-cyan' : 'bg-border'
                    }`}
                  />
                ))}
              </div>

              <p className="text-text-muted text-xs">
                Analyzing <span className="text-text-secondary font-medium">{url}</span>
              </p>
            </motion.div>
          )}

          {/* ── STEP: PREVIEW ────────────────────────────────────────────── */}
          {step === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle size={16} className="text-accent-cyan" />
                    <span className="text-accent-cyan text-sm font-medium">Ad Generated</span>
                  </div>
                  <h2 className="font-display text-3xl font-extrabold text-text-primary">
                    Here's your ad
                  </h2>
                </div>
                <Badge variant="neutral" className="text-xs">
                  {url.replace('https://', '').replace('http://', '').split('/')[0]}
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Canvas preview */}
                <div className="lg:col-span-3 flex flex-col items-center">
                  <div className="glass rounded-2xl p-6 w-full flex justify-center">
                    <AdCanvas
                      businessName={brand.businessName}
                      tagline={brand.tagline}
                      ctaText={brand.ctaText}
                      logoText={brand.logoText}
                      primaryColor={brand.primaryColor}
                      secondaryColor={brand.secondaryColor}
                      backgroundColor={brand.backgroundColor}
                      format="landscape"
                      backgroundStyle="particles"
                      animated={true}
                      className="rounded-lg shadow-2xl"
                    />
                  </div>
                </div>

                {/* Brand info panel */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <div className="glass rounded-2xl p-5">
                    <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
                      Extracted Brand Data
                    </p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-text-muted text-xs mb-0.5">Business Name</p>
                        <p className="text-text-primary font-semibold">{brand.businessName}</p>
                      </div>
                      <div>
                        <p className="text-text-muted text-xs mb-0.5">Tagline</p>
                        <p className="text-text-secondary text-sm">{brand.tagline}</p>
                      </div>
                      <div>
                        <p className="text-text-muted text-xs mb-1">Brand Colors</p>
                        <div className="flex gap-2">
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-6 h-6 rounded-lg border border-border-bright shadow-sm"
                              style={{ backgroundColor: brand.primaryColor }}
                            />
                            <span className="text-text-muted text-xs font-mono">{brand.primaryColor}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-6 h-6 rounded-lg border border-border-bright shadow-sm"
                              style={{ backgroundColor: brand.secondaryColor }}
                            />
                            <span className="text-text-muted text-xs font-mono">{brand.secondaryColor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="cyan">{brand.industry}</Badge>
                        <Badge variant="neutral">{brand.tone}</Badge>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-text-muted text-xs">
                        Detected from:{' '}
                        <span className="text-text-secondary font-medium truncate block">
                          {url}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      icon={<Edit3 size={16} />}
                      onClick={handleEdit}
                    >
                      Edit This Ad
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full"
                      icon={<RefreshCw size={15} />}
                      onClick={handleReset}
                    >
                      Generate Another
                    </Button>
                    <Button
                      variant="ghost"
                      size="md"
                      className="w-full"
                      icon={<Download size={15} />}
                      onClick={() => toast('Download available in the full version.', 'info')}
                    >
                      Download Preview
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" /></div>}>
      <GenerateInner />
    </Suspense>
  )
}
