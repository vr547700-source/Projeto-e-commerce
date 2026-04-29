import { HeartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDrawer } from '../../../contexts/drawer/useDrawer'

const WishlistPanel = () => {
  const { closeRight } = useDrawer()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <HeartIcon className="h-8 w-8 text-slate-400" />
      </div>
      <div>
        <p className="font-medium text-slate-900 dark:text-white">Lista de desejos vazia</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Salve produtos que você gostou
        </p>
      </div>
      <Link
        to="/products"
        onClick={closeRight}
        className="mt-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Explorar produtos
      </Link>
    </div>
  )
}

export default WishlistPanel
