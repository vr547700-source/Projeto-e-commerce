import { Link } from 'react-router-dom'
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../../contexts/cart/useCart'
import { useDrawer } from '../../../contexts/drawer/useDrawer'

const CartPanel = () => {
  const { items, subtotal, removeItem, updateQuantity } = useCart()
  const { closeRight } = useDrawer()

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <ShoppingCartIcon className="h-8 w-8 text-slate-400" />
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-white">Carrinho vazio</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Adicione produtos para continuar
          </p>
        </div>
        <Link
          to="/products"
          onClick={closeRight}
          className="mt-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900"
        >
          Ver produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex gap-3 p-4">
            <img
              src={product.image}
              alt={product.title}
              className="h-16 w-16 shrink-0 rounded-lg border border-slate-100 object-contain p-1 dark:border-slate-800"
            />
            <div className="flex flex-1 flex-col gap-1 overflow-hidden">
              <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
                {product.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  aria-label="Diminuir quantidade"
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                >
                  −
                </button>
                <span className="w-4 text-center text-sm font-medium text-slate-800 dark:text-slate-200">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  aria-label="Aumentar quantidade"
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  aria-label="Remover item"
                  className="ml-auto text-slate-400 transition-colors hover:text-rose-500"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <Link
          to="/cart"
          onClick={closeRight}
          className="flex w-full items-center justify-center rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900"
        >
          Ver carrinho completo
        </Link>
      </div>
    </div>
  )
}

export default CartPanel
