import { motion, useReducedMotion } from 'motion/react'
import { useState, type Ref } from 'react'
import type { GalleryItem, ViewMode } from './types'
import { getReadableTextClasses } from './utils'

interface GalleryCardProps {
  item: GalleryItem
  viewMode: ViewMode
  ref?: Ref<HTMLDivElement>
}

const CARD_TRANSITION = { duration: 0.3, ease: 'easeOut' } as const
// Fade+blur dip while a card is mid-flight between layouts: ramps in fast
// (like an exit), holds through the move, then clears a touch slower once
// it lands (like an entrance).
const DIP_IN_TRANSITION = { duration: 0.15, ease: 'easeOut' } as const
const DIP_OUT_TRANSITION = { duration: 0.18, ease: 'easeOut' } as const

const GalleryCard = ({ item, viewMode, ref }: GalleryCardProps) => {
  const isList = viewMode === 'list'
  const text = getReadableTextClasses(item.color)
  const shouldReduceMotion = useReducedMotion()
  const [isFlying, setIsFlying] = useState(false)

  const layoutTransition = shouldReduceMotion ? { duration: 0 } : CARD_TRANSITION

  return (
    <motion.div
      ref={ref}
      layout
      animate={{
        opacity: isFlying ? 0.45 : 1,
        filter: isFlying ? 'blur(6px)' : 'blur(0px)',
      }}
      transition={{
        layout: layoutTransition,
        opacity: isFlying ? DIP_IN_TRANSITION : DIP_OUT_TRANSITION,
        filter: isFlying ? DIP_IN_TRANSITION : DIP_OUT_TRANSITION,
      }}
      onLayoutAnimationStart={() => !shouldReduceMotion && setIsFlying(true)}
      onLayoutAnimationComplete={() => setIsFlying(false)}
      tabIndex={0}
      role="img"
      aria-label={`${item.name ?? 'Color swatch'}, ${item.color}`}
      className={
        isList
          ? 'flex h-full w-full flex-row items-stretch overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
          : 'relative h-full w-full overflow-hidden rounded-xl shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
      }
    >
      <motion.div
        layout
        transition={layoutTransition}
        className={isList ? 'h-28 w-28 shrink-0 sm:w-36' : 'absolute inset-0 h-full w-full'}
        style={{ backgroundColor: item.color }}
      />

      <motion.div
        layout
        transition={layoutTransition}
        className={
          isList
            ? 'flex flex-1 flex-col justify-center gap-0.5 px-3 py-2 sm:px-4 sm:py-3'
            : 'absolute inset-x-0 bottom-0 flex flex-col pb-3 pl-3 pr-2'
        }
      >
        {item.name && (
          <p
            className={`truncate text-sm font-medium ${isList ? 'text-gray-900' : `${text.base} drop-shadow-sm`}`}
          >
            {item.name}
          </p>
        )}
        <p
          className={`truncate text-xs uppercase tracking-wide ${
            isList ? 'text-gray-500' : `${text.muted} drop-shadow-sm`
          }`}
        >
          {item.color}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default GalleryCard
