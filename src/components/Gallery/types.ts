export type ViewMode = 'standard-grid' | 'masonry' | 'bento' | 'list' | 'justified'

export interface GalleryItem {
  id: string
  color: string
  name?: string
  /** width / height, used by the masonry and justified layouts */
  aspectRatio?: number
}

export const VIEW_MODES: { value: ViewMode; label: string }[] = [
  { value: 'standard-grid', label: 'Grid' },
  { value: 'masonry', label: 'Masonry' },
  { value: 'bento', label: 'Bento' },
  { value: 'list', label: 'List' },
  { value: 'justified', label: 'Justified' },
]
