import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useProducts } from '../../hooks/useProducts'
import { useCart } from '../../contexts/cart/useCart'
import ProductCard from '../../components/shared/ProductCard'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const Home = () => {
  const { data: products, isLoading } = useProducts()
  const { addItem } = useCart()

  const featured = products?.slice(0, 4) ?? []

  return (
    <div>
      <section className="bg-slate-900 dark:bg-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-24 sm:px-6 lg:px-8">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
            Novidades da temporada
          </span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Produtos selecionados para você
          </h1>
          <p className="max-w-lg text-lg text-slate-300">
            Explore nossa coleção com os melhores preços e entrega rápida para todo o Brasil.
          </p>
          <Link
            to="/products"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100"
          >
            Ver todos os produtos
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Em destaque</h2>
          <Link
            to="/products"
            className="flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Ver todos
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addItem} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
