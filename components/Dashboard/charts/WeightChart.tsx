// components/dashboard/WeightChart.tsx
'use client'

export function WeightChart() {
  // Mock weight data
  const weightData = [
    { day: 'Mon', weight: 73.5 },
    { day: 'Tue', weight: 73.2 },
    { day: 'Wed', weight: 73.0 },
    { day: 'Thu', weight: 72.8 },
    { day: 'Fri', weight: 72.6 },
    { day: 'Sat', weight: 72.5 },
    { day: 'Sun', weight: 72.5 },
  ]

  const maxWeight = Math.max(...weightData.map(d => d.weight)) + 1
  const minWeight = Math.min(...weightData.map(d => d.weight)) - 1
  const chartWidth = 500
  const chartHeight = 200
  const padding = 30

  const points = weightData.map((d, i) => {
    const x = padding + (i * (chartWidth - 2 * padding)) / (weightData.length - 1)
    const y = padding + ((maxWeight - d.weight) * (chartHeight - 2 * padding)) / (maxWeight - minWeight)
    return { x, y, ...d }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full min-w-[400px] h-auto">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding + (i * (chartHeight - 2 * padding)) / 4
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={chartWidth - padding}
              y2={y}
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="1"
            />
          )
        })}

        {/* Gradient area */}
        <defs>
          <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path
          d={`${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`}
          fill="url(#weightGradient)"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#111113"
            stroke="#dc2626"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={chartHeight - 10}
            textAnchor="middle"
            fill="#6b7280"
            fontSize="10"
          >
            {p.day}
          </text>
        ))}

        {/* Weight labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={p.y - 10}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="10"
          >
            {p.weight}
          </text>
        ))}
      </svg>
    </div>
  )
}