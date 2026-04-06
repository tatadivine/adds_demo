'use client'

import { useEditor } from './EditorContext'
import { Input } from '@/components/ui/Input'

export function ContentTab() {
  const { businessName, tagline, ctaText, bodyCopy, updateField } = useEditor()

  return (
    <div className="space-y-5">
      <Input
        label="Business Name"
        value={businessName}
        onChange={e => updateField('businessName', e.target.value)}
        placeholder="e.g. TechFlow Solutions"
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-text-secondary font-medium flex justify-between">
          Tagline
          <span className={`text-xs ${tagline.length > 60 ? 'text-accent-amber' : 'text-text-muted'}`}>
            {tagline.length}/60
          </span>
        </label>
        <input
          value={tagline}
          onChange={e => updateField('tagline', e.target.value)}
          placeholder="Your compelling tagline here"
          maxLength={80}
          className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted transition-all duration-150 focus:outline-none focus:ring-2 focus:border-accent-cyan focus:ring-accent-cyan/20"
        />
      </div>
      <Input
        label="Call to Action"
        value={ctaText}
        onChange={e => updateField('ctaText', e.target.value)}
        placeholder="e.g. Get Started, Shop Now, Call Today"
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-text-secondary font-medium flex justify-between">
          Body Copy
          <span className={`text-xs ${bodyCopy.length > 150 ? 'text-accent-amber' : 'text-text-muted'}`}>
            {bodyCopy.length}/150
          </span>
        </label>
        <textarea
          value={bodyCopy}
          onChange={e => updateField('bodyCopy', e.target.value)}
          placeholder="Supporting copy that appears in your ad..."
          maxLength={200}
          rows={4}
          className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted resize-none transition-all duration-150 focus:outline-none focus:ring-2 focus:border-accent-cyan focus:ring-accent-cyan/20"
        />
      </div>
    </div>
  )
}
