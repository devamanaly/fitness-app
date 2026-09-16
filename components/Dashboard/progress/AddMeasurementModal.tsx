// components/Dashboard/progress/AddMeasurementModal.tsx
'use client'

import { useState } from 'react'
import { X, Ruler, Scale, Save } from 'lucide-react'

type AddMeasurementModalProps = {
  onClose: () => void
}

export function AddMeasurementModal({ onClose }: AddMeasurementModalProps) {
  const [formData, setFormData] = useState({
    weight: '',
    waist: '',
    chest: '',
    hips: '',
    arms: '',
    thighs: '',
    neck: '',
    notes: '',
  })

  const handleSave = () => {
    // Will connect to backend later
    onClose()
  }

  const fields = [
    { key: 'weight', label: 'Weight', unit: 'kg', icon: Scale },
    { key: 'waist', label: 'Waist', unit: 'cm', icon: Ruler },
    { key: 'chest', label: 'Chest', unit: 'cm', icon: Ruler },
    { key: 'hips', label: 'Hips', unit: 'cm', icon: Ruler },
    { key: 'arms', label: 'Arms', unit: 'cm', icon: Ruler },
    { key: 'thighs', label: 'Thighs', unit: 'cm', icon: Ruler },
    { key: 'neck', label: 'Neck', unit: 'cm', icon: Ruler },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full sm:max-w-lg bg-[#111113] border border-white/10 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
              <Ruler className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Log Measurements</h2>
              <p className="text-xs text-gray-500 mt-0.5">Track your body changes</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Weight (highlighted) */}
          <div className="p-4 bg-red-600/5 border border-red-500/20 rounded-xl">
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Scale className="w-4 h-4 text-red-500" />
              Current Weight
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="72.5"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-lg font-bold text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">kg</span>
            </div>
          </div>

          {/* Body Measurements */}
          <div>
            <label className="block text-sm text-gray-400 mb-3">Body Measurements</label>
            <div className="grid grid-cols-2 gap-3">
              {fields.slice(1).map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-gray-500 mb-1.5">{field.label}</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder="0"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      {field.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="How are you feeling? Anything to note?"
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 min-h-[80px] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/[0.06] shrink-0 bg-[#0d0d0e]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 rounded-xl font-medium transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-red-900/40"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}