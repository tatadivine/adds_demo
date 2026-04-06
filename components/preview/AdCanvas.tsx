'use client'

import { useRef, useEffect } from 'react'
import { FontStyle, BackgroundStyle, AdFormat } from '@/components/editor/EditorContext'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  radius: number
}

interface AdCanvasProps {
  businessName: string
  tagline: string
  ctaText: string
  logoText: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  fontStyle?: FontStyle
  backgroundStyle?: BackgroundStyle
  format?: AdFormat
  animated?: boolean
  className?: string
}

const FORMAT_DIMS = {
  landscape: { display: { w: 640, h: 360 }, internal: { w: 1280, h: 720 } },
  vertical: { display: { w: 270, h: 480 }, internal: { w: 540, h: 960 } },
  square: { display: { w: 400, h: 400 }, internal: { w: 800, h: 800 } },
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16) || 0
  const g = parseInt(clean.substring(2, 4), 16) || 0
  const b = parseInt(clean.substring(4, 6), 16) || 0
  return [r, g, b]
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 3,
): number {
  const words = text.split(' ')
  let line = ''
  let linesDrawn = 0
  for (const word of words) {
    if (linesDrawn >= maxLines) break
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, y + linesDrawn * lineHeight)
      line = word + ' '
      linesDrawn++
    } else {
      line = test
    }
  }
  if (line && linesDrawn < maxLines) {
    ctx.fillText(line.trim(), x, y + linesDrawn * lineHeight)
    linesDrawn++
  }
  return linesDrawn
}

function getFontName(fontStyle: FontStyle | undefined): { display: string; body: string } {
  switch (fontStyle) {
    case 'bold': return { display: 'Syne', body: 'Space Grotesk' }
    case 'elegant': return { display: 'Georgia', body: 'Georgia' }
    case 'playful': return { display: 'Syne', body: 'Space Grotesk' }
    default: return { display: 'Syne', body: 'Space Grotesk' }
  }
}

export function AdCanvas({
  businessName,
  tagline,
  ctaText,
  logoText,
  primaryColor,
  secondaryColor,
  backgroundColor,
  fontStyle = 'modern',
  backgroundStyle = 'gradient',
  format = 'landscape',
  animated = true,
  className = '',
}: AdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const propsRef = useRef({
    businessName, tagline, ctaText, logoText,
    primaryColor, secondaryColor, backgroundColor,
    fontStyle, backgroundStyle, format, animated,
  })

  // Keep latest props accessible from RAF without restarting loop
  useEffect(() => {
    propsRef.current = {
      businessName, tagline, ctaText, logoText,
      primaryColor, secondaryColor, backgroundColor,
      fontStyle, backgroundStyle, format, animated,
    }
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dims = FORMAT_DIMS[format]
    const scale = Math.min(typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1, 2)

    canvas.width = dims.internal.w
    canvas.height = dims.internal.h
    canvas.style.width = `${dims.display.w}px`
    canvas.style.height = `${dims.display.h}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dims.internal.w / dims.display.w, dims.internal.h / dims.display.h)

    const W = dims.display.w
    const H = dims.display.h

    // Initialize particles once
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.1,
          radius: Math.random() * 2 + 0.5,
        })
      }
    }

    let startTime: number | null = null

    function draw(timestamp: number) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const t = elapsed * 0.001 // seconds

      const p = propsRef.current
      const [pr, pg, pb] = hexToRgb(p.primaryColor)
      const [br, bg_c, bb] = hexToRgb(p.backgroundColor)
      const fonts = getFontName(p.fontStyle)

      // ─── Layer 1: Background ───────────────────────────────────────────────
      if (p.backgroundStyle === 'gradient') {
        const offset = Math.sin(t * 0.3) * 0.15
        const grad = ctx.createLinearGradient(
          W * (0.2 + offset), 0,
          W * (0.8 - offset), H,
        )
        grad.addColorStop(0, p.backgroundColor)
        grad.addColorStop(0.45 + Math.sin(t * 0.2) * 0.1, `rgba(${pr},${pg},${pb},0.22)`)
        grad.addColorStop(1, p.backgroundColor)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)

        // secondary accent blob
        const [sr, sg, sb] = hexToRgb(p.secondaryColor)
        const blobGrad = ctx.createRadialGradient(
          W * (0.7 + Math.sin(t * 0.4) * 0.1),
          H * (0.3 + Math.cos(t * 0.3) * 0.1),
          0,
          W * 0.7, H * 0.3, W * 0.5,
        )
        blobGrad.addColorStop(0, `rgba(${sr},${sg},${sb},0.18)`)
        blobGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = blobGrad
        ctx.fillRect(0, 0, W, H)

      } else if (p.backgroundStyle === 'particles') {
        ctx.fillStyle = p.backgroundColor
        ctx.fillRect(0, 0, W, H)

        const pts = particlesRef.current
        pts.forEach(pt => {
          pt.x += pt.vx
          pt.y += pt.vy
          if (pt.x < 0) pt.x = W
          if (pt.x > W) pt.x = 0
          if (pt.y < 0) pt.y = H
          if (pt.y > H) pt.y = 0

          ctx.beginPath()
          ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${pr},${pg},${pb},${pt.opacity * 0.8})`
          ctx.fill()
        })

        // Connect nearby particles
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x
            const dy = pts[i].y - pts[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 80) {
              ctx.beginPath()
              ctx.moveTo(pts[i].x, pts[i].y)
              ctx.lineTo(pts[j].x, pts[j].y)
              ctx.strokeStyle = `rgba(${pr},${pg},${pb},${(1 - dist / 80) * 0.2})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }

      } else if (p.backgroundStyle === 'geometric') {
        ctx.fillStyle = p.backgroundColor
        ctx.fillRect(0, 0, W, H)

        for (let i = 0; i < 7; i++) {
          ctx.save()
          ctx.translate(W * (0.1 + (i * 0.14)), H * (0.2 + Math.sin(i) * 0.3))
          ctx.rotate((t * 0.1 + i * 0.8) % (Math.PI * 2))
          const size = 60 + i * 25
          roundRect(ctx, -size / 2, -size / 2, size, size, 8)
          ctx.strokeStyle = `rgba(${pr},${pg},${pb},${0.06 + (i % 3) * 0.04})`
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.restore()
        }

      } else {
        // minimal
        ctx.fillStyle = p.backgroundColor
        ctx.fillRect(0, 0, W, H)
        const band = ctx.createLinearGradient(0, H * 0.6, 0, H)
        band.addColorStop(0, 'transparent')
        band.addColorStop(1, `rgba(${pr},${pg},${pb},0.1)`)
        ctx.fillStyle = band
        ctx.fillRect(0, 0, W, H)
      }

      // ─── Layer 2: Vignette ────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.85)
      vig.addColorStop(0, 'transparent')
      vig.addColorStop(1, `rgba(${br},${bg_c},${bb},0.55)`)
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      // ─── Layer 3: Logo badge ──────────────────────────────────────────────
      const badgeX = 20
      const badgeY = 20
      const badgeH = 32
      const badgeW = Math.max(64, logoText.length * 14 + 20)
      roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 8)
      ctx.fillStyle = `rgba(${pr},${pg},${pb},0.9)`
      ctx.fill()
      ctx.font = `700 13px '${fonts.body}'`
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(logoText, badgeX + badgeW / 2, badgeY + badgeH / 2)

      // ─── Layer 4: Business name ───────────────────────────────────────────
      const nameSize = format === 'vertical' ? 22 : format === 'square' ? 26 : 30
      ctx.font = `800 ${nameSize}px '${fonts.display}'`
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'
      const nameY = format === 'vertical' ? H * 0.42 : H * 0.38
      ctx.fillText(p.businessName, 28, nameY)

      // ─── Layer 5: Tagline ─────────────────────────────────────────────────
      const tagSize = format === 'vertical' ? 13 : format === 'square' ? 14 : 15
      ctx.font = `400 ${tagSize}px '${fonts.body}'`
      ctx.fillStyle = `rgba(240,240,255,0.75)`
      const tagMaxW = format === 'vertical' ? W - 56 : W - 80
      wrapText(ctx, p.tagline, 28, nameY + nameSize * 1.3, tagMaxW, tagSize * 1.55, 2)

      // ─── Layer 6: Body copy ───────────────────────────────────────────────
      if (format === 'landscape') {
        const bodySize = 12
        ctx.font = `300 ${bodySize}px '${fonts.body}'`
        ctx.fillStyle = `rgba(240,240,255,0.5)`
        wrapText(ctx, p.bodyCopy, 28, nameY + nameSize * 1.3 + tagSize * 1.55 * 2 + 14, W - 100, bodySize * 1.7, 2)
      }

      // ─── Layer 7: CTA button ──────────────────────────────────────────────
      const pulse = 1 + Math.sin(t * 2.2) * 0.015
      const btnH = format === 'vertical' ? 36 : 40
      const btnPadX = 24
      const ctaFontSize = format === 'vertical' ? 12 : 14
      ctx.font = `700 ${ctaFontSize}px '${fonts.body}'`
      const btnW = (ctx.measureText(p.ctaText).width + btnPadX * 2) * pulse
      const btnX = 28
      const btnY = H - (format === 'vertical' ? 60 : 70)

      roundRect(ctx, btnX, btnY, btnW, btnH * pulse, 8)
      ctx.fillStyle = `rgba(${pr},${pg},${pb},0.95)`
      ctx.fill()

      roundRect(ctx, btnX, btnY, btnW, btnH * pulse, 8)
      ctx.strokeStyle = `rgba(${pr},${pg},${pb},0.4)`
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.font = `700 ${ctaFontSize}px '${fonts.body}'`
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(p.ctaText, btnX + btnW / 2, btnY + (btnH * pulse) / 2)

      // ─── Layer 8: Shimmer streak ──────────────────────────────────────────
      const shimmerCycle = 3500
      const shimmerPos = (elapsed % shimmerCycle) / shimmerCycle
      if (shimmerPos < 0.25) {
        const x = -W * 0.15 + shimmerPos * W * 1.6
        const shimGrad = ctx.createLinearGradient(x - 60, 0, x + 60, H)
        shimGrad.addColorStop(0, 'transparent')
        shimGrad.addColorStop(0.5, 'rgba(255,255,255,0.04)')
        shimGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = shimGrad
        ctx.fillRect(0, 0, W, H)
      }

      if (p.animated) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    cancelAnimationFrame(rafRef.current)

    // Wait for fonts to be loaded before starting loop
    document.fonts.ready.then(() => {
      if (animated) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        requestAnimationFrame(draw)
      }
    })

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, animated])

  const dims = FORMAT_DIMS[format]

  return (
    <canvas
      ref={canvasRef}
      className={`rounded-xl ${className}`}
      style={{ width: dims.display.w, height: dims.display.h }}
    />
  )
}
