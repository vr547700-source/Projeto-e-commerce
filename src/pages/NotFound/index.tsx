import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
    <p className="text-6xl font-bold text-slate-200 dark:text-slate-800">404</p>
    <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Página não encontrada</h1>
    <p className="mt-2 text-slate-500 dark:text-slate-400">A página que você procura não existe.</p>
    <Link
      to="/"
      className="mt-8 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900"
    >
      Voltar ao início
    </Link>
  </div>
)

export default NotFound
