// components/ui/Skeletons.tsx
'use client'

export function StatCardSkeleton() {
  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-white/[0.06] rounded-lg" />
        <div className="w-4 h-4 bg-white/[0.06] rounded" />
      </div>
      <div className="h-3 bg-white/[0.06] rounded w-20 mb-2" />
      <div className="h-6 bg-white/[0.06] rounded w-24 mb-2" />
      <div className="h-3 bg-white/[0.06] rounded w-16" />
    </div>
  )
}

export function WorkoutCardSkeleton() {
  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden animate-pulse">
      <div className="p-6 bg-gradient-to-r from-red-600/10 to-transparent">
        <div className="h-4 bg-white/[0.06] rounded w-24 mb-3" />
        <div className="h-6 bg-white/[0.06] rounded w-40" />
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="w-5 h-5 bg-white/[0.06] rounded mx-auto mb-2" />
              <div className="h-3 bg-white/[0.06] rounded w-12 mx-auto mb-1" />
              <div className="h-4 bg-white/[0.06] rounded w-8 mx-auto" />
            </div>
          ))}
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-white/[0.06] rounded-lg" />
        ))}
        <div className="h-12 bg-red-600/20 rounded-xl" />
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 bg-white/[0.06] rounded w-32" />
        <div className="h-8 bg-white/[0.06] rounded w-24" />
      </div>
      <div className="h-48 bg-white/[0.03] rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
          {[40, 60, 35, 70, 50, 65, 45].map((height, i) => (
            <div 
              key={i} 
              className="w-6 bg-red-600/20 rounded-t"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 bg-white/[0.06] rounded w-64" />
          <div className="h-4 bg-white/[0.06] rounded w-48" />
        </div>
        <div className="h-12 bg-red-600/20 rounded-xl w-40" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Main content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WorkoutCardSkeleton />
          <ChartSkeleton />
        </div>
        <div className="space-y-6">
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 animate-pulse">
            <div className="h-5 bg-white/[0.06] rounded w-28 mb-6" />
            <div className="grid grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-white/[0.06] rounded-full" />
                  <div className="h-3 bg-white/[0.06] rounded w-12 mt-2" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 animate-pulse">
            <div className="h-5 bg-white/[0.06] rounded w-28 mb-6" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-white/[0.06] rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/[0.06] rounded w-20" />
                  <div className="h-3 bg-white/[0.06] rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}