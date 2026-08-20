// components/forms/onboarding/Field.tsx
'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react'

type FieldProps = {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export const inputClass = `
  w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 
  text-white placeholder-gray-600 text-sm
  focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] 
  focus:ring-4 focus:ring-red-500/10
  transition-all duration-200
  hover:border-white/[0.15]
`

export function Field({ label, error, hint, required, children, className }: FieldProps) {
  return (
    <div className={`space-y-2 ${className || ''}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {hint && <span className="text-xs text-gray-600">{hint}</span>}
      </div>
      {children}
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </div>
      )}
    </div>
  )
}

// Enhanced Select Component
export function Select({ 
  options, 
  value, 
  onChange, 
  placeholder 
}: { 
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string 
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${inputClass} flex items-center justify-between text-left`}
      >
        <span className={value ? 'text-white' : 'text-gray-600'}>
          {value || placeholder || 'Select option'}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                value === option.value
                  ? 'bg-red-600/10 text-red-400'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}