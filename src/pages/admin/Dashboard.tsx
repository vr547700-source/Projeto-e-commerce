import { CubeIcon, UsersIcon, CurrencyDollarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useProducts } from '../../hooks/useProducts'
import { useUsers } from '../../hooks/useUsers'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const Dashboard = () => {
  const { data: products, isLoading: loadingProducts } = useProducts()
  const { data: users, isLoading: loadingUsers } = useUsers()

  const avgPrice = products
    ? (products.reduce((s, p) => s + p.price, 0) / products.length).toFixed(2)
    : '0'

  const stats = [
    {
      label: 'Total de produtos',
      value: products?.length ?? 0,
      icon: CubeIcon,
      color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
      loading: loadingProducts,
    },
    {
      label: 'Total de usuários',
      value: users?.length ?? 0,
      icon: UsersIcon,
      color: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
      loading: loadingUsers,
    },
    {
      label: 'Preço médio',
      value: `R$ ${Number(avgPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: CurrencyDollarIcon,
      color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
      loading: loadingProducts,
    },
    {
      label: 'Categorias',
      value: products ? new Set(products.map((p) => p.category)).size : 0,
      icon: ShoppingCartIcon,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
      loading: loadingProducts,
    },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color, loading }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className={`mb-3 inline-flex rounded-xl p-2.5 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            )}
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
