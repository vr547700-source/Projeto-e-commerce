import { Link } from 'react-router-dom'
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../contexts/cart/useCart'

const Cart = () => {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-32 text-center">
        <ShoppingBagIcon className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-700" />
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Carrinho vazio</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Explore nossos produtos e adicione ao carrinho.
        </p>
        <Link
          to="/products"
          className="mt-6 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
        >
          Ver produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Carrinho ({items.length} {items.length === 1 ? 'item' : 'itens'})
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-slate-400 transition-colors hover:text-rose-500"
        >
          Limpar carrinho
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-24 w-24 shrink-0 rounded-xl border border-slate-100 object-contain p-2 dark:border-slate-800"
              />
              <div className="flex flex-1 flex-col gap-2 overflow-hidden">
                <p className="text-sm capitalize text-slate-400 dark:text-slate-500">
                  {product.category}
                </p>
                <p className="font-medium leading-snug text-slate-900 dark:text-white">
                  {product.title}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      aria-label="Diminuir quantidade"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-medium text-slate-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      aria-label="Aumentar quantidade"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {(product.price * quantity).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label="Remover item"
                      className="text-slate-400 transition-colors hover:text-rose-500"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24 lg:self-start">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Resumo do pedido</h2>
          <div className="space-y-2 text-sm">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-slate-600 dark:text-slate-400">
                <span className="truncate pr-2">{product.title.slice(0, 24)}…</span>
                <span className="shrink-0">× {quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span>Total</span>
              <span>
                {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-slate-900 py-3 font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900"
          >
            Finalizar compra
          </Link>
        </aside>
      </div>
    </div>
  )
}

export default Cart
