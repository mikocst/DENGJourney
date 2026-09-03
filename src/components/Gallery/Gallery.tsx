import { useEffect, useState, type CSSProperties } from 'react'
import { LayoutGroup, motion, useReducedMotion } from 'motion/react'
import GalleryCard from './GalleryCard'
import LayoutToggle from './LayoutToggle'
import { SAMPLE_ITEMS } from './sampleData'
import type { GalleryItem, ViewMode } from './types'

const MOBILE_QUERY = '(max-width: 639px)'
const CONTAINER_TRANSITION = { duration: 0.3, ease: 'easeOut' } as const

const getBentoSpan = (index: number) => {
  if (index === 0) return 'col-span-2 row-span-2'
  if (index % 7 === 0) return 'col-span-2 row-span-1'
  return 'col-span-1 row-span-1'
}

const containerClass = (view: ViewMode) => {
  switch (view) {
    case 'list':
      return 'flex flex-col gap-3'
    case 'bento':
      return 'grid grid-cols-2 grid-flow-dense auto-rows-[110px] gap-4 sm:grid-cols-4'
    case 'masonry':
      return 'columns-2 gap-4 sm:columns-3 lg:columns-4'
    case 'justified':
      return 'flex flex-row flex-wrap gap-2'
    case 'standard-grid':
    default:
      return 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'
  }
}

const itemWrapperClass = (view: ViewMode, index: number) => {
  const base = 'overflow-hidden rounded-xl'
  switch (view) {
    case 'standard-grid':
      return `${base} aspect-square`
    case 'bento':
      return `${base} ${getBentoSpan(index)}`
    case 'masonry':
      return `${base} mb-4 break-inside-avoid`
    case 'justified':
    case 'list':
    default:
      return base
  }
}

const itemWrapperStyle = (view: ViewMode, item: GalleryItem): CSSProperties | undefined => {
  if (view === 'masonry') return { aspectRatio: item.aspectRatio ?? 1 }
  if (view === 'justified') {
    const ratio = item.aspectRatio ?? 1
    return { height: '12rem', flexGrow: ratio, flexBasis: `${ratio * 12}rem` }
  }
  return undefined
}

interface GalleryProps {
  items?: GalleryItem[]
}

const Gallery = ({ items = SAMPLE_ITEMS }: GalleryProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('standard-grid')
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Complex grids (bento/justified/masonry) don't hold up on narrow
  // viewports, so force Standard Grid and disable the toggle there.
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => setIsMobile(event.matches)
    handleChange(mql)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  const activeView: ViewMode = isMobile ? 'standard-grid' : viewMode

  return (
    <div className="flex flex-col gap-4">
      <LayoutToggle value={viewMode} onChange={setViewMode} disabled={isMobile} />

      {/* Cards keep a stable `key` across views so React reuses the same DOM
          node instead of remounting — motion's `layout` prop then animates
          the resulting position/size delta, and focus is never lost. The
          container itself also carries `layout` so its own height/width
          (which changes a lot between, say, Grid and List) glides to the
          new size instead of snapping instantly out from under the cards. */}
      <LayoutGroup>
        <motion.div
          layout
          transition={shouldReduceMotion ? { duration: 0 } : CONTAINER_TRANSITION}
          className={containerClass(activeView)}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={itemWrapperClass(activeView, index)}
              style={itemWrapperStyle(activeView, item)}
            >
              <GalleryCard item={item} viewMode={activeView} />
            </div>
          ))}
        </motion.div>
      </LayoutGroup>
    </div>
  )
}

export default Gallery
