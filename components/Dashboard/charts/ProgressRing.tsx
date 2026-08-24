// components/dashboard/ProgressRing.tsx
'use client'

type ProgressRingProps = {
  progress: number
  size?: number
  label: string
  color?: string
}

export function ProgressRing({ progress, size = 100, label, color = '#dc2626' }: ProgressRingProps) {
  const strokeWidth = size * 0.08
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold text-white">{progress}%</span>
        </div>
      </div>
      <span className="text-xs sm:text-sm text-gray-400 mt-2">{label}</span>
    </div>
  )
}