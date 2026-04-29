import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  children: ReactNode
}

const IconButton = ({ label, children, className, ...props }: IconButtonProps) => (
  <button
    type="button"
    aria-label={label}
    className={cn(
      'relative flex items-center justify-center rounded-md p-2',
      'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      'dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100',
      'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500',
      className
    )}
    {...props}
  >
    {children}
  </button>
)

export default IconButton
