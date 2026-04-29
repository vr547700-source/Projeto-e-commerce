import type { ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps {
  title: string
  onClose: () => void
  children: ReactNode
}

const Modal = ({ title, onClose, children }: ModalProps) => (
  <div
    className="fixed inset-0 z-[var(--z-toast)] flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-label={title}
  >
    <div
      aria-hidden="true"
      onClick={onClose}
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
    />
    <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      {children}
    </div>
  </div>
)

export default Modal
