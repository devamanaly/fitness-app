import { ReactNode } from 'react'

type PillProps = {
  label: string
  active: boolean
  onClick: () => void
  icon?: ReactNode
  description?: string
}

export function Pill({ label, active, onClick, icon, description }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-150 ${
        active
          ? 'bg-red-600/15 border-red-500 text-red-400'
          : 'bg-white/[0.02] border-white/[0.08] text-gray-400 hover:border-white/20 hover:bg-white/[0.04]'
      }`}
    >
      {icon && <span className={active ? 'text-red-500' : 'text-gray-600'}>{icon}</span>}
      <span>
        <span className="block text-sm font-medium text-white">{label}</span>
        {description && <span className="block text-xs text-gray-500 mt-0.5">{description}</span>}
      </span>
    </button>
  )
}