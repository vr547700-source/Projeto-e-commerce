import { Link } from 'react-router-dom'

const NavbarLogo = () => (
  <Link
    to="/"
    className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white"
  >
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">
      E
    </span>
    <span>eShop</span>
  </Link>
)

export default NavbarLogo
