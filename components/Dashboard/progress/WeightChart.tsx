/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Dashboard/progress/WeightChart.tsx
'use client'

import { TrendingDown, TrendingUp, Target, Flag } from 'lucide-react'

type WeightData = {
  date: string
  weight: number
  label: string
}

type WeightChartProps = {
  data: WeightData[]
  timeRange: '7d' | '30d' | '90d' | 'all'
  onTimeRangeChange: (range: '7d' | '30d' | '90d' | 'all') => void
  currentWeight: number
  targetWeight: number
  startingWeight: number
}

export function WeightChart({
  data,
  timeRange,
  onTimeRangeChange,
  currentWeight,
  targetWeight,
  startingWeight,
}: WeightChartProps) {
  const chartWidth = 800
  const chartHeight = 300
  const padding = { top: 40, right: 30, bottom: 40, left: 50 }

  const minWeight = Math.min(...data.map(d => d.weight), targetWeight) - 1
  const maxWeight = Math.max(...data.map(d => d.weight), startingWeight) + 1

  const range = maxWeight - minWeight
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const points = data.map((d, i) => {
    const x = padding.left + (i * innerWidth) / (data.length - 1)
    const y = padding.top + ((maxWeight - d.weight) * innerHeight) / range
    return { x, y, ...d }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding.bottom} L ${points[0].x} ${chartHeight - padding.bottom} Z`

  // Target line position
  const targetY = padding.top + ((maxWeight - targetWeight) * innerHeight) / range

  const totalLost = startingWeight - currentWeight
  const totalToLose = startingWeight - targetWeight
  const progress = (totalLost / totalToLose) * 100

  const ranges = [
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' },
    { id: 'all', label: 'All' },
  ]

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-white">Weight Progress</h3>
            <span className="text-xs text-green-400 bg-green-600/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              {totalLost.toFixed(1)} kg lost
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {progress.toFixed(0)}% of goal · {totalToLose.toFixed(1)} kg target
          </p>
        </div>

        {/* Time Range */}
        <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-lg p-1">
          {ranges.map((range) => (
            <button
              key={range.id}
              onClick={() => onTimeRangeChange(range.id as any)}
              className={`
                px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md transition-all
                ${timeRange === range.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                }
              `}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full min-w-[500px] h-auto"
        >
          <defs>
            <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </linearGradient>
            <filter id="glowLine">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padding.top + (i * innerHeight) / 4
            const weightValue = maxWeight - (i * range) / 4
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={chartWidth - padding.right}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="1"
                  strokeDasharray={i === 4 ? '0' : '4 4'}
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="#4b5563"
                  fontSize="10"
                >
                  {weightValue.toFixed(1)}
                </text>
              </g>
            )
          })}

          {/* Target line */}
          <line
            x1={padding.left}
            y1={targetY}
            x2={chartWidth - padding.right}
            y2={targetY}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.6"
          />
          <g transform={`translate(${chartWidth - padding.right - 80}, ${targetY - 20})`}>
            <rect x="0" y="0" width="80" height="18" rx="4" fill="#10b981" fillOpacity="0.15" />
            <text x="40" y="12" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="600">
              🎯 Target: {targetWeight} kg
            </text>
          </g>

          {/* Area fill */}
          <path d={areaPath} fill="url(#weightGradient)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#dc2626"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowLine)"
          />

          {/* Data points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="#0a0a0b"
                stroke="#dc2626"
                strokeWidth="2.5"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="2"
                fill="#dc2626"
              />
            </g>
          ))}

          {/* X-axis labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={chartHeight - 12}
              textAnchor="middle"
              fill="#6b7280"
              fontSize="10"
            >
              {p.label}
            </text>
          ))}

          {/* Weight labels on top of points */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={p.y - 14}
              textAnchor="middle"
              fill="#e5e7eb"
              fontSize="10"
              fontWeight="600"
            >
              {p.weight}
            </text>
          ))}
        </svg>
      </div>

      {/* Bottom summary */}
      <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/[0.06]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flag className="w-3 h-3 text-gray-500" />
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Start</p>
          </div>
          <p className="text-sm sm:text-base font-bold text-white">{startingWeight} kg</p>
        </div>
        <div className="text-center border-x border-white/[0.06]">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingDown className="w-3 h-3 text-red-500" />
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Current</p>
          </div>
          <p className="text-sm sm:text-base font-bold text-red-500">{currentWeight} kg</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="w-3 h-3 text-green-500" />
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Goal</p>
          </div>
          <p className="text-sm sm:text-base font-bold text-green-500">{targetWeight} kg</p>
        </div>
      </div>
    </div>
  )
}