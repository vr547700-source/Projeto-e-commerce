import { cn } from '../../utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }

const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => (
  <div
    role="status"
    aria-label="Carregando"
    className={cn(
      'animate-spin rounded-full border-2 border-slate-200 border-t-slate-600 dark:border-slate-700 dark:border-t-slate-300',
      sizes[size],
      className
    )}
  />
)

export default LoadingSpinner
