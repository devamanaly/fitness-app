// components/forms/onboarding/Pill.tsx
'use client'

import { Check } from 'lucide-react'

type PillProps = {
  label: string
  active: boolean
  onClick: () => void
  icon?: React.ReactNode
  description?: string
}

export function Pill({ label, active, onClick, icon, description }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium
        border transition-all duration-200 text-left
        ${active 
          ? 'bg-red-600/15 border-red-500/50 text-red-400 shadow-lg shadow-red-500/10' 
          : 'bg-white/[0.02] border-white/[0.08] text-gray-400 hover:border-white/20 hover:bg-white/[0.04] hover:text-gray-300'
        }
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1">
        {label}
        {description && (
          <span className="block text-xs text-gray-500 mt-0.5">{description}</span>
        )}
      </span>
      {active && (
        <Check className="w-4 h-4 text-red-500 flex-shrink-0" strokeWidth={2.5} />
      )}
    </button>
  )
}