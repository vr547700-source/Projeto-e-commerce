import { Field, Label, Select, Description } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  description?: string
  error?: string
  containerClassName?: string
}

const SelectField = ({
  label,
  description,
  error,
  containerClassName,
  className,
  children,
  ...props
}: SelectFieldProps) => (
  <Field className={cn('flex flex-col gap-1', containerClassName)}>
    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</Label>

    {description && (
      <Description className="text-xs text-slate-400 dark:text-slate-500">{description}</Description>
    )}

    <div className="relative">
      <Select
        className={cn(
          'w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 pr-9 text-sm text-slate-900',
          'transition-colors focus:border-slate-400 focus:bg-white focus:outline-none',
          'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:bg-slate-700',
          error && 'border-rose-400 focus:border-rose-500',
          className
        )}
        {...props}
      >
        {children}
      </Select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>

    {error && <p className="text-xs text-rose-500">{error}</p>}
  </Field>
)

export default SelectField
