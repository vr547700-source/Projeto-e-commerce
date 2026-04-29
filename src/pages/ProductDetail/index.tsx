import { useParams, Link } from 'react-router-dom'
import { ShoppingCartIcon, ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid, HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { useState, useCallback } from 'react'
import { useProduct } from '../../hooks/useProducts'
import { useCart } from '../../contexts/cart/useCart'
import { useWishlist } from '../../contexts/wishlist/useWishlist'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import ErrorMessage from '../../components/shared/ErrorMessage'
import ReviewsSection from './ReviewsSection'

const ProductDetail = () => {
  const { productId } = useParams()
  const id = Number(productId)
  const { data: product, error, isLoading, mutate } = useProduct(id || undefined)
  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [added, setAdded] = useState(false)

  const handleAddToCart = useCallback(() => {
    if (!product) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }, [product, addItem])

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !product) return <ErrorMessage onRetry={() => mutate()} />

  const wishlisted = isWishlisted(product.id)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/products"
        className="mb-8 flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Voltar aos produtos
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 w-full object-contain"
          />
          <button
            type="button"
            onClick={() => toggle(product)}
            aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            className="absolute right-3 top-3 rounded-full bg-white/80 p-2 shadow transition-colors hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900"
          >
            {wishlisted ? (
              <HeartSolid className="h-5 w-5 text-rose-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-slate-400" />
            )}
          </button>
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-sm capitalize text-slate-400 dark:text-slate-500">
            {product.category}
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{product.title}</h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarSolid
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating.rate)
                      ? 'text-amber-400'
                      : 'text-slate-200 dark:text-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {product.rating.rate} ({product.rating.count} avaliações)
            </span>
          </div>

          <p className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>

          <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
            {product.description}
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            {added ? 'Adicionado!' : 'Adicionar ao carrinho'}
          </button>
        </div>
      </div>

      <ReviewsSection productId={id} />
    </div>
  )
}

export default ProductDetail
