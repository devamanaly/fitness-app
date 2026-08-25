// components/ui/ButtonLoader.tsx
'use client'

type ButtonLoaderProps = {
  size?: 'sm' | 'md' | 'lg'
  color?: 'white' | 'red' | 'gray'
}

export function ButtonLoader({ size = 'sm', color = 'white' }: ButtonLoaderProps) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-6 h-6 border-[3px]',
  }

  const colorMap = {
    white: 'border-white/30 border-t-white',
    red: 'border-red-300/30 border-t-red-600',
    gray: 'border-gray-400/30 border-t-gray-600',
  }

  return (
    <div 
      className={`${sizeMap[size]} ${colorMap[color]} rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  )
}