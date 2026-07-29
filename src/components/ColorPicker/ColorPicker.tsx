import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Icon from '../Icon'
import {
  hexToHsl,
  hslToHex,
  isValidHex,
  normalizeHex,
  generateShadeRing,
  INITIAL_COLOR,
  OUTER_SWATCHES,
  type OuterSwatch,
} from './colorUtils'

const CENTER_SIZE = 64
const SHADE_SIZE = 34
const OUTER_SIZE = 32
const INNER_RADIUS = 44
const OUTER_RADIUS = 110
// Distance from the wrapper's top edge to the flower's center point. Fixed,
// so the sphere never moves as the wrapper's height animates open/closed.
const ANCHOR_TOP = CENTER_SIZE / 2
// Wrapper height when open: just enough to reach the lowest outer petal, so
// the controls below sit right under the bloom instead of a full diameter down.
const OPEN_HEIGHT = ANCHOR_TOP + OUTER_RADIUS + OUTER_SIZE / 2

const petalOffset = (index: number, total: number, radius: number) => {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
}

/** Index of the ring stop closest in lightness to the live center — robust to HSL round-trip drift. */
const closestLightnessIndex = (stops: string[], targetL: number) =>
  stops.reduce((closest, hex, i) => {
    const diff = Math.abs(hexToHsl(hex).l - targetL)
    const closestDiff = Math.abs(hexToHsl(stops[closest]).l - targetL)
    return diff < closestDiff ? i : closest
  }, 0)

interface PetalProps {
  hex: string
  size: number
  x: number
  y: number
  delay: number
  onClick: () => void
  label: string
}

const Petal = ({ hex, size, x, y, delay, onClick, label }: PetalProps) => (
  <motion.button
    type="button"
    className="absolute rounded-full border-2 border-white cursor-pointer shadow-md"
    style={{
      width: size,
      height: size,
      left: '50%',
      top: ANCHOR_TOP,
      marginLeft: -size / 2,
      marginTop: -size / 2,
      backgroundColor: hex,
    }}
    initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
    animate={{ x, y, opacity: 1, scale: 1 }}
    exit={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
    transition={{ type: 'spring', stiffness: 300, damping: 30, delay }}
    whileHover={{ scale: 1.1, transition: { duration: 0.15, ease: 'easeOut' } }}
    whileTap={{ scale: 0.97, transition: { duration: 0.1, ease: 'easeOut' } }}
    onClick={onClick}
    aria-label={label}
  />
)

const ColorPicker = () => {
  const initialHsl = hexToHsl(INITIAL_COLOR)
  const [hue, setHue] = useState(initialHsl.h)
  const [sat, setSat] = useState(initialHsl.s)
  const [lightness, setLightness] = useState(initialHsl.l)
  // The color the shade ring is generated from. Only updates when a genuinely
  // new color is committed (outer swatch, slider release, hex commit) — not
  // on a shade-petal click, and not on every slider drag tick — so picking an
  // existing shade never reshuffles or remounts the ring.
  const [ringAnchor, setRingAnchor] = useState(INITIAL_COLOR)
  const [isOpen, setIsOpen] = useState(false)
  const [hexDraft, setHexDraft] = useState(INITIAL_COLOR)
  const [isHexFocused, setIsHexFocused] = useState(false)
  const [copied, setCopied] = useState(false)

  const center = hslToHex({ h: hue, s: sat, l: lightness })
  const containerSize = OUTER_RADIUS * 2 + OUTER_SIZE

  const ringStops = generateShadeRing(ringAnchor)
  const hiddenIndex = closestLightnessIndex(ringStops, hexToHsl(center).l)
  const shadeStops = ringStops.filter((_, i) => i !== hiddenIndex)

  // Mirror the committed color into the hex field, but only while the user
  // isn't actively typing in it.
  useEffect(() => {
    if (!isHexFocused) setHexDraft(center)
  }, [center, isHexFocused])

  const applyHsl = (h: number, s: number, l: number) => {
    setHue(h)
    setSat(s)
    setLightness(l)
  }

  // Ring keys include ringAnchor, so this only reassigns the same 7 mounted
  // petals' colors (instant, no remount) instead of triggering flight.
  const handleShadeClick = (hex: string) => {
    setLightness(hexToHsl(hex).l)
  }

  // These three all change ringAnchor, which changes every ring petal's key
  // at once — a full remount, so the flight animation plays as intended.
  const handleSwatchClick = (swatch: OuterSwatch) => {
    applyHsl(swatch.h, swatch.s, swatch.l)
    setRingAnchor(swatch.hex)
  }

  const commitSliderAnchor = () => {
    setRingAnchor(hslToHex({ h: hue, s: sat, l: lightness }))
  }

  const commitHexEdit = () => {
    if (isValidHex(hexDraft)) {
      const normalized = normalizeHex(hexDraft)
      const hsl = hexToHsl(normalized)
      applyHsl(hsl.h, hsl.s, hsl.l)
      setRingAnchor(normalized)
    }
    setIsHexFocused(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(center)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // clipboard unavailable (e.g. insecure context/permissions) — no-op
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <motion.div
        className="relative"
        style={{ width: containerSize }}
        animate={{ height: isOpen ? OPEN_HEIGHT : CENTER_SIZE }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <AnimatePresence>
          {isOpen &&
            OUTER_SWATCHES.map((swatch, i) => {
              const { x, y } = petalOffset(i, OUTER_SWATCHES.length, OUTER_RADIUS)
              return (
                <Petal
                  key={swatch.key}
                  hex={swatch.hex}
                  size={OUTER_SIZE}
                  x={x}
                  y={y}
                  delay={i * 0.015}
                  onClick={() => handleSwatchClick(swatch)}
                  label={`Switch to ${swatch.key.replace('hue-', 'hue ')}`}
                />
              )
            })}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen &&
            shadeStops.map((hex, i) => {
              const { x, y } = petalOffset(i, shadeStops.length, INNER_RADIUS)
              return (
                <Petal
                  key={`${ringAnchor}-${i}`}
                  hex={hex}
                  size={SHADE_SIZE}
                  x={x}
                  y={y}
                  delay={i * 0.02}
                  onClick={() => handleShadeClick(hex)}
                  label={`Select shade ${hex}`}
                />
              )
            })}
        </AnimatePresence>

        <motion.button
          type="button"
          className="absolute z-10 rounded-full border-4 border-white cursor-pointer shadow-lg"
          style={{
            width: CENTER_SIZE,
            height: CENTER_SIZE,
            left: '50%',
            top: ANCHOR_TOP,
            marginLeft: -CENTER_SIZE / 2,
            marginTop: -CENTER_SIZE / 2,
          }}
          initial={{ backgroundColor: center }}
          animate={{ backgroundColor: center }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          whileHover={{ scale: 1.1, transition: { duration: 0.15, ease: 'easeOut' } }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1, ease: 'easeOut' } }}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Collapse color picker' : 'Expand color picker'}
        />
      </motion.div>

      <input
        type="range"
        min={6}
        max={94}
        value={lightness}
        onChange={(e) => setLightness(Number(e.target.value))}
        onPointerUp={commitSliderAnchor}
        onKeyUp={commitSliderAnchor}
        style={{ accentColor: center }}
        className="w-40 cursor-pointer"
        aria-label="Shade lightness"
      />

      <div className="flex items-center gap-1.5">
        <input
          value={hexDraft}
          onChange={(e) => setHexDraft(e.target.value)}
          onFocus={(e) => {
            setIsHexFocused(true)
            e.target.select()
          }}
          onBlur={commitHexEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
            if (e.key === 'Escape') {
              setHexDraft(center)
              e.currentTarget.blur()
            }
          }}
          spellCheck={false}
          aria-label="Hex code"
          className="w-24 rounded border border-gray-300 bg-white px-2 py-1 text-center font-mono text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy hex code"
          title={copied ? 'Copied!' : 'Copy hex code'}
          className="flex items-center justify-center w-7 h-7 rounded border border-gray-300 text-gray-500 cursor-pointer hover:bg-gray-50 hover:text-gray-700"
        >
          <Icon name={copied ? 'check' : 'copy'} size="14px" />
        </button>
      </div>
    </div>
  )
}

export default ColorPicker
