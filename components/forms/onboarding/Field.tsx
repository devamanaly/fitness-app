type FieldProps = {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}

export function Field({ label, required, hint, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-600 mb-2">{hint}</p>}
      {!hint && <div className="mb-2" />}
      {children}
    </div>
  )
}

export const inputClass =
  'w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:bg-white/[0.04] focus:ring-2 focus:ring-red-500/10 transition-all'