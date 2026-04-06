# AdStudio — AI Ad Creation Studio

A fully functional frontend demo for an AI-powered video ad creation tool. Built with Next.js 14, Tailwind CSS, and Framer Motion.

## Features

- **Generate ads from any URL** — paste a website URL, watch the AI "analyze" it, and get a fully rendered video ad with extracted brand data
- **Live ad editor** — edit text, colors, fonts, background style, music, and voiceover in real-time with instant canvas preview
- **Gallery** — browse, preview, and edit saved ads in a filterable grid
- **Dark cinematic design** — deep black UI with electric cyan accents, animated canvas previews, glassmorphism panels

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- HTML5 Canvas (animated ad previews)
- Google Fonts: Syne + Space Grotesk

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero URL input and showcase |
| `/generate` | Multi-step ad generation flow with animated loading |
| `/editor` | Split-panel live ad editor |
| `/gallery` | Saved ads gallery with preview modal |

## Project Structure

```
/app              ← Next.js App Router pages
/components
  /ui             ← Reusable UI primitives (Button, Input, Modal, Tabs, Badge)
  /editor         ← Editor-specific components + EditorContext
  /preview        ← AdCanvas (animated) + VideoPlayer
  Nav.tsx
  Providers.tsx
  ToastProvider.tsx
/lib
  mockData.ts     ← All mock business data, palettes, tracks, voices
/styles
  globals.css     ← Design tokens, CSS variables, base styles
```

## Demo Data

Three mock businesses are pre-configured. URL detection works by keyword matching:

| Keyword in URL | Business |
|---|---|
| `roof`, `alpine` | Alpine Roofing Co. |
| `bella`, `bak` | Bella's Bakery |
| `tech`, `flow`, `software` | TechFlow Solutions |
| anything else | Generic template |

## Oracle Cloud Deployment

For production on Oracle Cloud Infrastructure:

1. Build: `npm run build`
2. The output directory `.next` can be deployed on OCI Compute or Container Instances
3. Use OCI Application Load Balancer for traffic routing
4. Static assets can be served from OCI Object Storage CDN
5. For serverless: deploy as OCI Functions or use OCI Container Registry with Docker
