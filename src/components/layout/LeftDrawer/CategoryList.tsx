import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useCategories } from '../../../hooks/useProducts'
import { useDrawer } from '../../../contexts/drawer/useDrawer'

const CategoryList = () => {
  const { closeLeft } = useDrawer()
  const { data: categories } = useCategories()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const activeCategory = searchParams.get('category')

  const handleCategory = (cat: string | null) => {
    const params = new URLSearchParams()
    if (cat) params.set('category', cat)
    navigate(`/products${params.toString() ? `?${params.toString()}` : ''}`)
    closeLeft()
  }

  return (
    <nav aria-label="Categorias de produtos">
      <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        Categorias
      </p>
      <ul className="space-y-1">
        <li>
          <button
            type="button"
            onClick={() => handleCategory(null)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              !activeCategory
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
            }`}
          >
            Todas as categorias
          </button>
        </li>
        {categories?.map((cat) => (
          <li key={cat}>
            <button
              type="button"
              onClick={() => handleCategory(cat)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium capitalize transition-colors ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              }`}
            >
              {cat}
              <ChevronRightIcon className="h-4 w-4 opacity-50" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CategoryList
