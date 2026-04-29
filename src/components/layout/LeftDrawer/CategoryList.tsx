import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { productCategories } from '../../../constants/navigation'
import { useDrawer } from '../../../contexts/drawer/useDrawer'

const CategoryList = () => {
  const { closeLeft } = useDrawer()

  return (
    <nav aria-label="Categorias de produtos">
      <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        Categorias
      </p>
      <ul className="space-y-1">
        {productCategories.map((category) => (
          <li key={category.href}>
            <Link
              to={category.href}
              onClick={closeLeft}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {category.label}
              <ChevronRightIcon className="h-4 w-4 text-slate-400" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CategoryList
