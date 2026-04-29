import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { ReactNode } from 'react'

interface AppDialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg'
}

const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

const AppDialog = ({ open, onClose, title, children, maxWidth = 'md' }: AppDialogProps) => (
  <Dialog open={open} onClose={onClose} className="relative z-[var(--z-toast)]">
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

    <div className="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel
        className={`w-full ${widths[maxWidth]} rounded-2xl border border-slate-200 bg-white p-6 shadow-xl transition-all dark:border-slate-800 dark:bg-slate-900`}
      >
        <div className="mb-5 flex items-center justify-between">
          <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </DialogTitle>
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
      </DialogPanel>
    </div>
  </Dialog>
)

export default AppDialog
