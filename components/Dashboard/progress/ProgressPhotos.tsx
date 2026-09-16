// components/Dashboard/progress/ProgressPhotos.tsx
'use client'

import { Camera, Plus, ZoomIn, MoreVertical } from 'lucide-react'
import { useState } from 'react'

type Photo = {
  id: number
  date: string
  label: string
  weight: number
}

type ProgressPhotosProps = {
  photos: Photo[]
}

export function ProgressPhotos({ photos }: ProgressPhotosProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white">Progress Photos</h3>
            <p className="text-xs text-gray-500">{photos.length} photos · Compare your transformation</p>
          </div>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] rounded-lg text-xs font-medium text-gray-300 transition-all">
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Photo</span>
        </button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-white/[0.06] hover:border-red-500/40 transition-all"
          >
            {/* Placeholder image */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-white/[0.06] rounded-full flex items-center justify-center mb-2">
                <Camera className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-[10px] text-gray-600">Photo</p>
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 flex flex-col justify-end p-3">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">{photo.label}</p>
                  <p className="text-[10px] text-gray-400">{photo.weight} kg</p>
                </div>
                <div className="w-6 h-6 bg-white/10 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            {/* Weight badge */}
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-600/90 backdrop-blur rounded-full">
              <p className="text-[10px] font-bold text-white">{photo.weight} kg</p>
            </div>
          </button>
        ))}

        {/* Add photo placeholder */}
        <button className="aspect-[3/4] border-2 border-dashed border-white/[0.08] hover:border-red-500/40 rounded-xl flex flex-col items-center justify-center transition-all group">
          <div className="w-10 h-10 bg-white/[0.03] group-hover:bg-red-600/10 rounded-full flex items-center justify-center mb-2 transition-colors">
            <Plus className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
          </div>
          <p className="text-[10px] text-gray-600 group-hover:text-red-500 transition-colors">
            Add Photo
          </p>
        </button>
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedPhoto(null)} />
          <div className="relative max-w-2xl w-full bg-[#111113] border border-white/10 rounded-2xl overflow-hidden">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
              <div className="text-center">
                <Camera className="w-16 h-16 text-gray-700 mx-auto mb-3" />
                <p className="text-sm text-gray-600">{selectedPhoto.label} Photo</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{selectedPhoto.label}</p>
                <p className="text-xs text-gray-500">{selectedPhoto.date} · {selectedPhoto.weight} kg</p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg text-xs text-white transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}