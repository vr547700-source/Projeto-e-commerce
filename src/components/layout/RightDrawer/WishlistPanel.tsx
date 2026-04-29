import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDrawer } from '../../../contexts/drawer/useDrawer'
import { useWishlist } from '../../../contexts/wishlist/useWishlist'
import { useCart } from '../../../contexts/cart/useCart'

const WishlistPanel = () => {
  const { closeRight } = useDrawer()
  const { items, toggle } = useWishlist()
  const { addItem } = useCart()

  if (items.length === 0) {
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

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {items.map((product) => (
          <li key={product.id} className="flex items-center gap-3 px-4 py-3">
            <Link
              to={`/products/${product.id}`}
              onClick={closeRight}
              className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain p-1"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Link
                to={`/products/${product.id}`}
                onClick={closeRight}
                className="line-clamp-2 text-xs font-medium text-slate-800 hover:text-slate-600 dark:text-slate-200"
              >
                {product.title}
              </Link>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <button
                type="button"
                onClick={() => { addItem(product); closeRight() }}
                className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900"
              >
                Adicionar
              </button>
              <button
                type="button"
                onClick={() => toggle(product)}
                aria-label="Remover dos favoritos"
                className="rounded p-1 text-slate-400 transition-colors hover:text-rose-500"
              >
                <TrashIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WishlistPanel
