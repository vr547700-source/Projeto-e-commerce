import { useEffect, useRef } from 'react'

export const useFocusTrap = <T extends HTMLElement>(active: boolean) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!active || !ref.current) return

    const panel = ref.current
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(selectors))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    panel.addEventListener('keydown', handleKeyDown)
    return () => panel.removeEventListener('keydown', handleKeyDown)
  }, [active])

  return ref
}
