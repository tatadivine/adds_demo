import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  children?: ReactNode
}

const variantClasses = {
  primary:
    'bg-accent-cyan text-bg-base font-semibold hover:brightness-110 shadow-glow-cyan hover:shadow-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'border border-border-bright text-text-primary bg-bg-elevated hover:border-accent-cyan hover:text-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-bg-elevated disabled:opacity-40 disabled:cursor-not-allowed',
  danger:
    'border border-red-800/60 text-red-400 hover:bg-red-950/40 hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-body transition-all duration-150 active:scale-[0.97] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  )
}
