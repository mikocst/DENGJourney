import { useRef, type KeyboardEvent } from 'react'
import { VIEW_MODES, type ViewMode } from './types'

interface LayoutToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
  disabled?: boolean
}

const LayoutToggle = ({ value, onChange, disabled = false }: LayoutToggleProps) => {
  const groupRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (disabled) return

    let nextIndex: number | null = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % VIEW_MODES.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      nextIndex = (index - 1 + VIEW_MODES.length) % VIEW_MODES.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = VIEW_MODES.length - 1

    if (nextIndex === null) return
    event.preventDefault()
    onChange(VIEW_MODES[nextIndex].value)
    const nextButton = groupRef.current?.querySelectorAll<HTMLButtonElement>('button')[nextIndex]
    nextButton?.focus()
  }

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Gallery layout"
      aria-disabled={disabled || undefined}
      className="inline-flex flex-wrap gap-1 rounded-lg border border-black/10 bg-white p-1 shadow-sm"
    >
      {VIEW_MODES.map((mode, index) => {
        const isActive = mode.value === value
        return (
          <button
            key={mode.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            onClick={() => onChange(mode.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
            } disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent`}
          >
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}

export default LayoutToggle
