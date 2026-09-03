const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '')
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized
  const value = parseInt(expanded, 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}

const relativeLuminance = (hex: string) => {
  const { r, g, b } = hexToRgb(hex)
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Full literal class strings (not concatenated) so Tailwind's static
 * scanner can find them even though they're picked at runtime.
 */
export const getReadableTextClasses = (hex: string) => {
  const isLight = relativeLuminance(hex) > 0.45
  return isLight
    ? { base: 'text-neutral-900', muted: 'text-neutral-900/70' }
    : { base: 'text-white', muted: 'text-white/90' }
}
