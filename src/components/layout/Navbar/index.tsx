import NavbarLogo from './NavbarLogo'
import NavbarSearch from './NavbarSearch'
import NavbarActions from './NavbarActions'
import { mainNavLinks } from '../../../constants/navigation'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <header role="banner" className="sticky top-0 z-[var(--z-navbar)] border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
    <nav
      aria-label="Navegação principal"
      className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8"
    >
      <NavbarLogo />

      <div className="hidden items-center gap-6 md:flex">
        {mainNavLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-1 justify-center">
        <NavbarSearch />
      </div>

      <NavbarActions />
    </nav>
  </header>
)

export default Navbar
