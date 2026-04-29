import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import IconButton from '../../ui/IconButton'
import Badge from '../../ui/Badge'
import { useDrawer } from '../../../contexts/drawer/useDrawer'
import { useAuth } from '../../../contexts/auth/useAuth'
import { useCart } from '../../../contexts/cart/useCart'
import { useTheme } from '../../../contexts/theme/useTheme'
import { cn } from '../../../utils/cn'

const NavbarActions = () => {
  const { state, toggleLeft, openRight } = useDrawer()
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const { totalItems } = useCart()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/login')
  }

  return (
    <div className="flex items-center gap-1">
      <IconButton
        label="Abrir carrinho"
        onClick={() => openRight('cart')}
        aria-expanded={state.rightOpen}
      >
        <Badge count={totalItems}>
          <ShoppingCartIcon className="h-5 w-5" />
        </Badge>
      </IconButton>

      <IconButton
        label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        onClick={toggleTheme}
      >
        {theme === 'dark' ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </IconButton>

      {isAuthenticated ? (
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu do usuário"
            aria-expanded={menuOpen}
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-bold uppercase text-slate-700 dark:bg-slate-700 dark:text-slate-300">
              {user?.name.firstname?.[0] ?? user?.username[0]}
            </div>
            <span className="hidden max-w-24 truncate md:block">{user?.name.firstname}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full z-50 mt-1 w-52 rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.name.firstname} {user?.name.lastname}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                <span
                  className={cn(
                    'mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase',
                    isAdmin
                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  )}
                >
                  {isAdmin ? 'Admin' : 'Cliente'}
                </span>
              </div>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Cog6ToothIcon className="h-4 w-4" />
                  Painel Admin
                </Link>
              )}

              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <UserIcon className="h-4 w-4" />
                Minha conta
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20"
              >
                <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                Sair
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          aria-label="Entrar"
          className="flex items-center justify-center rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <UserIcon className="h-5 w-5" />
        </Link>
      )}

      <IconButton
        label={state.leftOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
        onClick={toggleLeft}
        aria-expanded={state.leftOpen}
        aria-controls="left-drawer"
        className="lg:hidden"
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
