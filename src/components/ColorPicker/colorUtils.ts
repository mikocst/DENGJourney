export type HSL = { h: number; s: number; l: number }

export const hexToHsl = (hex: string): HSL => {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  if (max === min) return { h: 0, s: 0, l: l * 100 }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

  let h = 0
  switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break
    case g: h = (b - r) / d + 2; break
    default: h = (r - g) / d + 4; break
  }
  h *= 60

  return { h, s: s * 100, l: l * 100 }
}

export const hslToHex = ({ h, s, l }: HSL): string => {
  const sat = s / 100
  const light = l / 100

  const c = (1 - Math.abs(2 * light - 1)) * sat
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = light - c / 2

  let [r, g, b] = [0, 0, 0]
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]

  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0')

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

export const isValidHex = (value: string): boolean => /^#?[0-9A-Fa-f]{6}$/.test(value.trim())

export const normalizeHex = (value: string): string => `#${value.trim().replace(/^#/, '').toUpperCase()}`

// Lightness stops used to build a shade ring, lightest to darkest (8 total shades incl. the anchor).
const SHADE_LIGHTNESS_STOPS = [92, 80, 68, 56, 44, 32, 20, 8]

/** Generates the ring of shade "petals" around `anchorHex`, with the anchor itself forced into its correct sorted slot. */
export const generateShadeRing = (anchorHex: string): string[] => {
  const { h, s, l } = hexToHsl(anchorHex)
  const stops = SHADE_LIGHTNESS_STOPS.map((stop) => hslToHex({ h, s, l: stop }))

  const closestIndex = stops.reduce((closest, hex, i) => {
    const stopL = hexToHsl(hex).l
    const closestL = hexToHsl(stops[closest]).l
    return Math.abs(stopL - l) < Math.abs(closestL - l) ? i : closest
  }, 0)
  stops[closestIndex] = anchorHex.toUpperCase()

  return Array.from(new Set(stops)).sort((a, b) => hexToHsl(b).l - hexToHsl(a).l)
}

export const INITIAL_COLOR = '#5388F8'

const RAINBOW_COUNT = 10
const RAINBOW_SATURATION = 72
const RAINBOW_LIGHTNESS = 55

export interface OuterSwatch {
  key: string
  hex: string
  h: number
  s: number
  l: number
}

/** Outer selectable layer: a full hue wheel plus two neutrals, for maximum variety. */
export const OUTER_SWATCHES: OuterSwatch[] = [
  ...Array.from({ length: RAINBOW_COUNT }, (_, i) => {
    const h = Math.round((360 / RAINBOW_COUNT) * i)
    return { key: `hue-${h}`, hex: hslToHex({ h, s: RAINBOW_SATURATION, l: RAINBOW_LIGHTNESS }), h, s: RAINBOW_SATURATION, l: RAINBOW_LIGHTNESS }
  }),
  { key: 'black', hex: '#262626', h: 0, s: 0, l: 15 },
  { key: 'gray', hex: '#9CA3AF', h: 0, s: 0, l: 65 },
]
