// components/Dashboard/progress/MeasurementsTracker.tsx
'use client'

import { Ruler, TrendingDown, TrendingUp, Minus } from 'lucide-react'

type Measurement = {
  current: number
  previous: number
  unit: string
}

type MeasurementsTrackerProps = {
  measurements: {
    waist: Measurement
    chest: Measurement
    hips: Measurement
    arms: Measurement
    thighs: Measurement
    neck: Measurement
  }
}

export function MeasurementsTracker({ measurements }: MeasurementsTrackerProps) {
  const measurementList = [
    { key: 'waist', label: 'Waist', data: measurements.waist },
    { key: 'chest', label: 'Chest', data: measurements.chest },
    { key: 'hips', label: 'Hips', data: measurements.hips },
    { key: 'arms', label: 'Arms', data: measurements.arms },
    { key: 'thighs', label: 'Thighs', data: measurements.thighs },
    { key: 'neck', label: 'Neck', data: measurements.neck },
  ]

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
            <Ruler className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white">Body Measurements</h3>
            <p className="text-xs text-gray-500">Updated 3 days ago</p>
          </div>
        </div>
      </div>

      {/* Measurements Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {measurementList.map((item) => {
          const change = item.data.current - item.data.previous
          const TrendIcon = change < 0 ? TrendingDown : change > 0 ? TrendingUp : Minus
          const trendColor = change === 0 
            ? 'text-gray-400' 
            : change < 0 
            ? 'text-green-400' 
            : 'text-red-400'

          return (
            <div
              key={item.key}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 sm:p-4 hover:border-white/[0.12] transition-all"
            >
              <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase tracking-wider">
                {item.label}
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-lg sm:text-xl font-bold text-white">
                  {item.data.current}
                </span>
                <span className="text-[10px] text-gray-500">{item.data.unit}</span>
              </div>
              <div className={`flex items-center gap-1 text-[10px] ${trendColor}`}>
                <TrendIcon className="w-3 h-3" />
                <span className="font-medium">
                  {change > 0 ? '+' : ''}{change.toFixed(1)} {item.data.unit}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}