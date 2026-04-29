import { cn } from '../../utils/cn'

interface OverlayProps {
  visible: boolean
  onClick: () => void
}

const Overlay = ({ visible, onClick }: OverlayProps) => (
  <div
    aria-hidden="true"
    onClick={onClick}
    className={cn(
      'fixed inset-0 z-[var(--z-overlay)] bg-black/50 backdrop-blur-sm',
      'transition-opacity duration-300',
      visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    )}
  />
)

export default Overlay
