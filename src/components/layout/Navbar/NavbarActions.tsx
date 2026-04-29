import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import IconButton from '../../ui/IconButton'
import Badge from '../../ui/Badge'
import { useDrawer } from '../../../contexts/drawer/useDrawer'

const NavbarActions = () => {
  const { state, toggleLeft, openRight } = useDrawer()
  const cartItemCount = 0

  return (
    <div className="flex items-center gap-1">
      <IconButton label="Abrir carrinho" onClick={() => openRight('cart')} aria-expanded={state.rightOpen}>
        <Badge count={cartItemCount}>
          <ShoppingCartIcon className="h-5 w-5" />
        </Badge>
      </IconButton>

      <Link
        to="/account"
        aria-label="Minha conta"
        className="flex items-center justify-center rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        <UserIcon className="h-5 w-5" />
      </Link>

      <IconButton
        label={state.leftOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
        onClick={toggleLeft}
        aria-expanded={state.leftOpen}
        aria-controls="left-drawer"
        className="md:hidden"
      >
        {state.leftOpen ? (
          <XMarkIcon className="h-5 w-5" />
        ) : (
          <Bars3Icon className="h-5 w-5" />
        )}
      </IconButton>
    </div>
  )
}

export default NavbarActions
