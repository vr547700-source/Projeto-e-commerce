import { Link } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import type { Product } from '../../types/product'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => (
  <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
    <Link
      to={`/products/${product.id}`}
      className="relative overflow-hidden rounded-t-2xl bg-slate-50 dark:bg-slate-800"
    >
      <img
        src={product.image}
        alt={product.title}
        className="mx-auto h-48 w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </Link>

    <div className="flex flex-1 flex-col p-4">
      <p className="mb-1 text-xs capitalize text-slate-400 dark:text-slate-500">
        {product.category}
      </p>
      <Link to={`/products/${product.id}`} className="flex-1">
        <h2 className="line-clamp-2 text-sm font-medium text-slate-800 transition-colors hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-400">
          {product.title}
        </h2>
      </Link>

      <div className="mt-3 flex items-center gap-1">
        <StarSolid className="h-3.5 w-3.5 text-amber-400" />
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {product.rating.rate}
        </span>
        <span className="text-xs text-slate-400">({product.rating.count})</span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-lg font-bold text-slate-900 dark:text-white">
          {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          aria-label={`Adicionar ${product.title} ao carrinho`}
          className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          <ShoppingCartIcon className="h-3.5 w-3.5" />
          Adicionar
        </button>
      </div>
    </div>
  </article>
)

export default ProductCard
