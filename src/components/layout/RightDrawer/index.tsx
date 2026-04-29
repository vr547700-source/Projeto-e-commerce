import { useEffect } from 'react'
import { XMarkIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { cn } from '../../../utils/cn'
import { useDrawer } from '../../../contexts/drawer/useDrawer'
import { useFocusTrap } from '../../../hooks/useFocusTrap'
import Overlay from '../../ui/Overlay'
import IconButton from '../../ui/IconButton'
import CartPanel from './CartPanel'
import WishlistPanel from './WishlistPanel'
import type { RightDrawerTab } from '../../../types/drawer'

const tabs: { id: RightDrawerTab; label: string; icon: typeof ShoppingCartIcon }[] = [
  { id: 'cart', label: 'Carrinho', icon: ShoppingCartIcon },
  { id: 'wishlist', label: 'Favoritos', icon: HeartIcon },
]

const RightDrawer = () => {
  const { state, closeRight, dispatch } = useDrawer()
  const panelRef = useFocusTrap<HTMLElement>(state.rightOpen)

  useEffect(() => {
    document.body.style.overflow = state.rightOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [state.rightOpen])

  return (
    <>
      <Overlay visible={state.rightOpen} onClick={closeRight} />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho e favoritos"
        className={cn(
          'fixed inset-y-0 right-0 z-(--z-drawer) flex w-80 flex-col bg-white dark:bg-slate-950',
          'border-l border-slate-200 dark:border-slate-800',
          'transform transition-transform duration-300 ease-in-out',
          state.rightOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => dispatch({ type: 'SET_RIGHT_TAB', tab: tab.id })}
                  aria-pressed={state.rightTab === tab.id}
                  className={cn(
                    'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    state.rightTab === tab.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <IconButton label="Fechar painel" onClick={closeRight}>
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto">
          {state.rightTab === 'cart' ? <CartPanel /> : <WishlistPanel />}
        </div>
      </aside>
    </>
  )
}

export default RightDrawer
