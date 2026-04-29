import { ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

const ErrorMessage = ({ message = 'Algo deu errado.', onRetry }: ErrorMessageProps) => (
  <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
    <ExclamationCircleIcon className="h-12 w-12 text-rose-400" />
    <div>
      <p className="font-medium text-slate-900 dark:text-white">Erro ao carregar</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{message}</p>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <ArrowPathIcon className="h-4 w-4" />
        Tentar novamente
      </button>
    )}
  </div>
)

export default ErrorMessage
