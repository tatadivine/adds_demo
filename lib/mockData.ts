export interface BrandProfile {
  id: string
  businessName: string
  tagline: string
  ctaText: string
  bodyCopy: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  industry: string
  logoText: string
  tone: string
}

export interface ColorPalette {
  id: string
  name: string
  primary: string
  secondary: string
  background: string
  text: string
}

export interface MusicTrack {
  id: string
  name: string
  genre: string
  bpm: number
  duration: string
  mood: string
}

export interface VoiceOption {
  id: string
  name: string
  accent: string
  gender: 'male' | 'female' | 'neutral'
  description: string
}

export interface MockAd {
  id: string
  businessName: string
  tagline: string
  format: 'landscape' | 'vertical' | 'square'
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  logoText: string
  createdAt: string
  duration: string
}

export const BRAND_PROFILES: BrandProfile[] = [
  {
    id: 'alpine-roofing',
    businessName: 'Alpine Roofing Co.',
    tagline: 'Built to Last. Installed Today.',
    ctaText: 'Get Free Quote',
    bodyCopy: 'Expert roofing services with 20+ years of experience. Licensed, insured, and ready to protect your home against the elements.',
    primaryColor: '#1E88E5',
    secondaryColor: '#F59E0B',
    backgroundColor: '#0D1B2A',
    industry: 'Home Services',
    logoText: 'ARC',
    tone: 'Professional',
  },
  {
    id: 'bellas-bakery',
    businessName: "Bella's Bakery",
    tagline: 'Handcrafted with Love, Baked Fresh Daily.',
    ctaText: 'Order Now',
    bodyCopy: 'Artisan pastries, custom celebration cakes, and seasonal specials made from locally sourced ingredients. Visit us at the corner of Main & Oak.',
    primaryColor: '#E91E8C',
    secondaryColor: '#FFD700',
    backgroundColor: '#1A0A12',
    industry: 'Food & Beverage',
    logoText: 'BB',
    tone: 'Warm & Friendly',
  },
  {
    id: 'techflow-solutions',
    businessName: 'TechFlow Solutions',
    tagline: 'Automate Everything. Scale Infinitely.',
    ctaText: 'Start Free Trial',
    bodyCopy: 'Enterprise workflow automation that integrates with your existing stack in under 30 minutes. Trusted by 500+ companies worldwide.',
    primaryColor: '#00D4FF',
    secondaryColor: '#7C3AED',
    backgroundColor: '#050510',
    industry: 'Technology',
    logoText: 'TF',
    tone: 'Bold & Innovative',
  },
  {
    id: 'generic',
    businessName: 'Your Business',
    tagline: 'Your Message. Your Brand.',
    ctaText: 'Learn More',
    bodyCopy: 'Delivering exceptional value and quality to customers everywhere. Discover what makes us different.',
    primaryColor: '#00D4FF',
    secondaryColor: '#F59E0B',
    backgroundColor: '#0A0A1A',
    industry: 'Business',
    logoText: 'YB',
    tone: 'Professional',
  },
]

export function detectBusiness(url: string): BrandProfile {
  const lower = url.toLowerCase()
  if (lower.includes('roof') || lower.includes('alpine')) return BRAND_PROFILES[0]
  if (lower.includes('bella') || lower.includes('bak') || lower.includes('pastry')) return BRAND_PROFILES[1]
  if (lower.includes('tech') || lower.includes('flow') || lower.includes('software') || lower.includes('saas')) return BRAND_PROFILES[2]
  return BRAND_PROFILES[3]
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'midnight-tech',
    name: 'Midnight Tech',
    primary: '#00D4FF',
    secondary: '#7C3AED',
    background: '#050510',
    text: '#F0F0FF',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    primary: '#F59E0B',
    secondary: '#EF4444',
    background: '#0F0A00',
    text: '#FFF8E7',
  },
  {
    id: 'arctic-minimal',
    name: 'Arctic Minimal',
    primary: '#E2E8F0',
    secondary: '#94A3B8',
    background: '#020408',
    text: '#FFFFFF',
  },
  {
    id: 'ember-bold',
    name: 'Ember Bold',
    primary: '#EF4444',
    secondary: '#F97316',
    background: '#0F0500',
    text: '#FFF0F0',
  },
  {
    id: 'ocean-deep',
    name: 'Ocean Deep',
    primary: '#06B6D4',
    secondary: '#0EA5E9',
    background: '#000A14',
    text: '#E0F7FF',
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    primary: '#FFFFFF',
    secondary: '#888888',
    background: '#000000',
    text: '#FFFFFF',
  },
]

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'cinematic-build',
    name: 'Cinematic Build',
    genre: 'Cinematic',
    bpm: 72,
    duration: '2:34',
    mood: 'Epic',
  },
  {
    id: 'upbeat-corporate',
    name: 'Upbeat Corporate',
    genre: 'Corporate',
    bpm: 120,
    duration: '1:58',
    mood: 'Energetic',
  },
  {
    id: 'lofi-chill',
    name: 'Lo-Fi Chill',
    genre: 'Lo-Fi',
    bpm: 88,
    duration: '3:12',
    mood: 'Relaxed',
  },
  {
    id: 'epic-orchestral',
    name: 'Epic Orchestral',
    genre: 'Orchestral',
    bpm: 96,
    duration: '2:48',
    mood: 'Dramatic',
  },
  {
    id: 'minimal-electronic',
    name: 'Minimal Electronic',
    genre: 'Electronic',
    bpm: 110,
    duration: '2:22',
    mood: 'Modern',
  },
]

export const VOICE_OPTIONS: VoiceOption[] = [
  {
    id: 'james',
    name: 'James',
    accent: 'American',
    gender: 'male',
    description: 'Deep & Authoritative',
  },
  {
    id: 'sofia',
    name: 'Sofia',
    accent: 'American',
    gender: 'female',
    description: 'Warm & Friendly',
  },
  {
    id: 'oliver',
    name: 'Oliver',
    accent: 'British',
    gender: 'male',
    description: 'Crisp & Professional',
  },
  {
    id: 'maya',
    name: 'Maya',
    accent: 'Australian',
    gender: 'female',
    description: 'Bright & Conversational',
  },
  {
    id: 'alex',
    name: 'Alex',
    accent: 'American',
    gender: 'neutral',
    description: 'Clear & Neutral',
  },
  {
    id: 'elena',
    name: 'Elena',
    accent: 'British',
    gender: 'female',
    description: 'Elegant & Refined',
  },
]

export const MOCK_ADS: MockAd[] = [
  {
    id: 'ad-001',
    businessName: 'TechFlow Solutions',
    tagline: 'Automate Everything. Scale Infinitely.',
    format: 'landscape',
    primaryColor: '#00D4FF',
    secondaryColor: '#7C3AED',
    backgroundColor: '#050510',
    logoText: 'TF',
    createdAt: '2026-04-01',
    duration: '0:30',
  },
  {
    id: 'ad-002',
    businessName: "Bella's Bakery",
    tagline: 'Handcrafted with Love, Baked Fresh Daily.',
    format: 'vertical',
    primaryColor: '#E91E8C',
    secondaryColor: '#FFD700',
    backgroundColor: '#1A0A12',
    logoText: 'BB',
    createdAt: '2026-03-29',
    duration: '0:15',
  },
  {
    id: 'ad-003',
    businessName: 'Alpine Roofing Co.',
    tagline: 'Built to Last. Installed Today.',
    format: 'square',
    primaryColor: '#1E88E5',
    secondaryColor: '#F59E0B',
    backgroundColor: '#0D1B2A',
    logoText: 'ARC',
    createdAt: '2026-03-25',
    duration: '0:30',
  },
  {
    id: 'ad-004',
    businessName: 'TechFlow Solutions',
    tagline: 'Your Workflow, Reinvented.',
    format: 'vertical',
    primaryColor: '#7C3AED',
    secondaryColor: '#00D4FF',
    backgroundColor: '#080512',
    logoText: 'TF',
    createdAt: '2026-03-22',
    duration: '0:60',
  },
  {
    id: 'ad-005',
    businessName: "Bella's Bakery",
    tagline: 'Every Bite, a Little Celebration.',
    format: 'landscape',
    primaryColor: '#FFD700',
    secondaryColor: '#E91E8C',
    backgroundColor: '#140D00',
    logoText: 'BB',
    createdAt: '2026-03-18',
    duration: '0:30',
  },
  {
    id: 'ad-006',
    businessName: 'Alpine Roofing Co.',
    tagline: 'Protect What Matters Most.',
    format: 'square',
    primaryColor: '#F59E0B',
    secondaryColor: '#1E88E5',
    backgroundColor: '#120A00',
    logoText: 'ARC',
    createdAt: '2026-03-15',
    duration: '0:15',
  },
]

export const GENERATION_STEPS = [
  { message: 'Fetching website content...', duration: 1100 },
  { message: 'Analyzing brand identity...', duration: 1000 },
  { message: 'Extracting color palette...', duration: 900 },
  { message: 'Generating ad copy...', duration: 1200 },
  { message: 'Composing visual layout...', duration: 1300 },
  { message: 'Rendering final preview...', duration: 800 },
]
