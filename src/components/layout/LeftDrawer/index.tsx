import { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '../../../utils/cn'
import { useDrawer } from '../../../contexts/drawer/useDrawer'
import { useFocusTrap } from '../../../hooks/useFocusTrap'
import Overlay from '../../ui/Overlay'
import IconButton from '../../ui/IconButton'
import CategoryList from './CategoryList'
import { mainNavLinks } from '../../../constants/navigation'
import { Link } from 'react-router-dom'

const LeftDrawer = () => {
  const { state, closeLeft } = useDrawer()
  const panelRef = useFocusTrap<HTMLElement>(state.leftOpen)

  useEffect(() => {
    document.body.style.overflow = state.leftOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [state.leftOpen])

  return (
    <>
      <Overlay visible={state.leftOpen} onClick={closeLeft} />

      <aside
        id="left-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          'fixed inset-y-0 left-0 z-(--z-drawer) flex w-72 flex-col bg-white dark:bg-slate-950',
          'border-r border-slate-200 dark:border-slate-800',
          'transform transition-transform duration-300 ease-in-out',
          state.leftOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Menu</span>
          <IconButton label="Fechar menu" onClick={closeLeft}>
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav aria-label="Links principais" className="mb-8">
            <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Navegação
            </p>
            <ul className="space-y-1">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={closeLeft}
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <CategoryList />
        </div>
      </aside>
    </>
  )
}

export default LeftDrawer
