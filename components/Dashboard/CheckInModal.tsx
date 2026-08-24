// components/dashboard/CheckInModal.tsx
'use client'

import { useState } from 'react'
import { X, Scale, Droplets, Moon, Zap } from 'lucide-react'

type CheckInModalProps = {
  onClose: () => void
}

export function CheckInModal({ onClose }: CheckInModalProps) {
  const [formData, setFormData] = useState({
    weight: '72.5',
    water: '1.5',
    sleep: '7',
    mood: '🙂',
    energy: 7,
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle check-in submission
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full sm:max-w-lg bg-[#111113] border border-white/10 rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white">Daily Check-in</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Weight */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Current Weight (kg)</label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-12 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50"
                placeholder="72.5"
              />
            </div>
          </div>

          {/* Water */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Water Intake (L)</label>
            <div className="relative">
              <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={formData.water}
                onChange={(e) => setFormData({ ...formData, water: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-12 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50"
                placeholder="1.5"
              />
            </div>
          </div>

          {/* Sleep */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Sleep (Hours)</label>
            <div className="relative">
              <Moon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={formData.sleep}
                onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-12 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50"
                placeholder="7"
              />
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">How do you feel?</label>
            <div className="grid grid-cols-5 gap-2">
              {['😞', '😕', '😐', '🙂', '😄'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: emoji })}
                  className={`p-2 rounded-xl text-xl text-center transition-all ${
                    formData.mood === emoji
                      ? 'bg-red-600/20 border border-red-500/50'
                      : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Energy Level</label>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <input
                type="range"
                min="1"
                max="10"
                value={formData.energy}
                onChange={(e) => setFormData({ ...formData, energy: parseInt(e.target.value) })}
                className="flex-1 accent-red-600"
              />
              <span className="text-sm text-white font-medium">{formData.energy}</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 min-h-[80px] resize-none"
              placeholder="How was your day?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20"
          >
            Save Check-in
          </button>
        </form>
      </div>
    </div>
  )
}