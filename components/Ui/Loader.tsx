// components/ui/Loader.tsx
'use client'

import { Dumbbell } from 'lucide-react'

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'fullscreen' | 'inline' | 'overlay'
  text?: string
  className?: string
}

export function Loader({ 
  size = 'md', 
  variant = 'inline', 
  text = 'Loading...',
  className = '' 
}: LoaderProps) {
  
  const sizeMap = {
    sm: {
      container: 'w-8 h-8',
      icon: 'w-4 h-4',
      ring: 'w-8 h-8',
      text: 'text-xs',
    },
    md: {
      container: 'w-12 h-12',
      icon: 'w-6 h-6',
      ring: 'w-12 h-12',
      text: 'text-sm',
    },
    lg: {
      container: 'w-16 h-16',
      icon: 'w-8 h-8',
      ring: 'w-16 h-16',
      text: 'text-base',
    },
    xl: {
      container: 'w-24 h-24',
      icon: 'w-12 h-12',
      ring: 'w-24 h-24',
      text: 'text-lg',
    },
  }

  const sizes = sizeMap[size]

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0b]">
        <div className="relative">
          {/* Pulsing rings */}
          <div className={`${sizes.ring} absolute inset-0 rounded-full bg-red-600/20 animate-ping`} />
          <div className={`${sizes.ring} absolute inset-0 rounded-full bg-red-600/10 animate-pulse`} />
          
          {/* Spinning ring */}
          <div className={`${sizes.container} relative flex items-center justify-center`}>
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-600 animate-spin" />
            
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`${sizes.container} bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg shadow-red-900/40`}>
                <Dumbbell className={`${sizes.icon} text-white animate-pulse`} />
              </div>
            </div>
          </div>
        </div>
        
        {text && (
          <div className="mt-8 text-center">
            <p className={`${sizes.text} text-gray-400 font-medium animate-pulse`}>{text}</p>
            <div className="flex items-center justify-center gap-1 mt-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.1s]" />
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]" />
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'overlay') {
    return (
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0b]/80 backdrop-blur-sm">
        <div className="relative">
          <div className={`${sizes.ring} absolute inset-0 rounded-full bg-red-600/20 animate-ping`} />
          <div className={`${sizes.container} relative flex items-center justify-center`}>
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`${sizes.container} bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center`}>
                <Dumbbell className={`${sizes.icon} text-white animate-pulse`} />
              </div>
            </div>
          </div>
        </div>
        {text && (
          <p className={`${sizes.text} text-gray-400 font-medium mt-4 animate-pulse`}>{text}</p>
        )}
      </div>
    )
  }

  // Inline variant (default)
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <div className={`${sizes.container} relative flex items-center justify-center`}>
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
              <Dumbbell className={`${sizes.icon} text-white`} />
            </div>
          </div>
        </div>
      </div>
      {text && (
        <p className={`${sizes.text} text-gray-400 font-medium mt-3 animate-pulse`}>{text}</p>
      )}
    </div>
  )
}