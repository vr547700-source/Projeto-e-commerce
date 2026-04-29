import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { useProducts, useCategories } from '../../hooks/useProducts'
import { useCart } from '../../contexts/cart/useCart'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import ErrorMessage from '../../components/shared/ErrorMessage'
import ProductCard from '../../components/shared/ProductCard'

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? undefined
  const search = searchParams.get('q') ?? ''
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default')

  const { data: products, error, isLoading, mutate } = useProducts(category)
  const { data: categories } = useCategories()
  const { addItem } = useCart()

  const setCategory = (cat: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (cat) params.set('category', cat)
    else params.delete('category')
    setSearchParams(params)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) return <ErrorMessage onRetry={() => mutate()} />

  const filtered = (products ?? []).filter((p) =>
    search ? p.title.toLowerCase().includes(search.toLowerCase()) : true
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'rating') return b.rating.rate - a.rating.rate
    return 0
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Produtos</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {sorted.length} {sorted.length === 1 ? 'resultado' : 'resultados'}
            {search && ` para "${search}"`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FunnelIcon className="h-4 w-4 text-slate-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            aria-label="Ordenar produtos"
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="default">Relevância</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="rating">Melhor avaliação</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-48 shrink-0 lg:block">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Categorias
          </p>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => setCategory(null)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  !category
                    ? 'bg-slate-900 font-medium text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                Todas
              </button>
            </li>
            {categories?.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm capitalize transition-colors ${
                    category === cat
                      ? 'bg-slate-900 font-medium text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">
          {sorted.length === 0 ? (
            <div className="py-16 text-center text-slate-500 dark:text-slate-400">
              Nenhum produto encontrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addItem} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
