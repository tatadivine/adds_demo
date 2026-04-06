import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, icon, className = '', ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-text-secondary font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-bg-elevated border rounded-xl px-4 py-3 text-text-primary text-sm
            placeholder:text-text-muted
            transition-all duration-150
            focus:outline-none focus:ring-2
            ${error
              ? 'border-red-600/60 focus:border-red-500 focus:ring-red-500/20'
              : 'border-border focus:border-accent-cyan focus:ring-accent-cyan/20'
            }
            ${icon ? 'pl-10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  )
})
