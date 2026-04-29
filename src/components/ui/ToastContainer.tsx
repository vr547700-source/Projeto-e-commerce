import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useToast } from '../../contexts/toast/useToast'
import type { ToastType } from '../../contexts/toast/ToastContext'

const icons: Record<ToastType, React.ElementType> = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
  warning: ExclamationTriangleIcon,
}

const styles: Record<ToastType, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
  error: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200',
  info: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-200',
  warning: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200',
}

const iconStyles: Record<ToastType, string> = {
  success: 'text-emerald-500',
  error: 'text-rose-500',
  info: 'text-sky-500',
  warning: 'text-amber-500',
}

const ToastContainer = () => {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-4 right-4 z-[var(--z-toast)] flex flex-col gap-2"
    >
      {toasts.map((t) => {
        const Icon = icons[t.type]
        return (
          <div
            key={t.id}
            role="alert"
            className={`flex w-80 items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${styles[t.type]}`}
          >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconStyles[t.type]}`} />
            <p className="flex-1 text-sm font-medium">{t.message}</p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Fechar notificação"
              className="shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default ToastContainer
