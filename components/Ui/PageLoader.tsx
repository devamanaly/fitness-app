// components/ui/PageLoader.tsx
'use client'

import { Loader } from './Loader'

type PageLoaderProps = {
  text?: string
  minHeight?: string
}

export function PageLoader({ text = 'Loading your dashboard...', minHeight = 'min-h-[60vh]' }: PageLoaderProps) {
  return (
    <div className={`${minHeight} flex items-center justify-center`}>
      <Loader size="lg" text={text} />
    </div>
  )
}