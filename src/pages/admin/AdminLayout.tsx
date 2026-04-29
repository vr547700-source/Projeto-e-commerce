import { NavLink, Outlet } from 'react-router-dom'
import { Squares2X2Icon, CubeIcon, UsersIcon } from '@heroicons/react/24/outline'
import { cn } from '../../utils/cn'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: Squares2X2Icon, end: true },
  { to: '/admin/products', label: 'Produtos', icon: CubeIcon, end: false },
  { to: '/admin/users', label: 'Usuários', icon: UsersIcon, end: false },
]

const AdminLayout = () => (
  <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
    <aside className="hidden w-48 shrink-0 lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Admin
      </p>
      <nav className="space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>

    <main className="flex-1 min-w-0">
      <Outlet />
    </main>
  </div>
)

export default AdminLayout
