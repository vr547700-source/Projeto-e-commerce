import { Field, Label, Textarea, Description } from '@headlessui/react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  description?: string
  error?: string
  containerClassName?: string
}

const TextAreaField = ({
  label,
  description,
  error,
  containerClassName,
  className,
  ...props
}: TextAreaFieldProps) => (
  <Field className={cn('flex flex-col gap-1', containerClassName)}>
    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</Label>

    {description && (
      <Description className="text-xs text-slate-400 dark:text-slate-500">{description}</Description>
    )}

    <Textarea
      className={cn(
        'w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400',
        'transition-colors focus:border-slate-400 focus:bg-white focus:outline-none',
        'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-slate-500',
        error && 'border-rose-400 focus:border-rose-500',
        className
      )}
      {...props}
    />

    {error && <p className="text-xs text-rose-500">{error}</p>}
  </Field>
)

export default TextAreaField
