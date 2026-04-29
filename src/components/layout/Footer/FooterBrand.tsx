import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const FooterBrand = () => (
  <div className="flex flex-col gap-4">
    <Link to="/" className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 dark:bg-white">
        <ShoppingBagIcon className="h-5 w-5 text-white dark:text-slate-900" />
      </div>
      <span className="text-lg font-bold text-slate-900 dark:text-white">eShop</span>
    </Link>

    <p className="max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
      Sua loja virtual com eletrônicos, moda, casa e muito mais. Compre com segurança e receba
      no conforto da sua casa.
    </p>

    <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
      Loja aberta 24h
    </div>
  </div>
)

export default FooterBrand
