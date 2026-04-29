import { Navigate } from 'react-router-dom'
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/auth/useAuth'
import { useUser } from '../../hooks/useUsers'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const Account = () => {
  const { user: authUser, isAuthenticated, isAdmin } = useAuth()
  const { data: user, isLoading } = useUser(authUser?.id)

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const rows = [
    { icon: UserIcon, label: 'Nome', value: `${user?.name.firstname} ${user?.name.lastname}` },
    { icon: EnvelopeIcon, label: 'E-mail', value: user?.email },
    { icon: PhoneIcon, label: 'Telefone', value: user?.phone },
    {
      icon: MapPinIcon,
      label: 'Endereço',
      value: user
        ? `${user.address.street}, ${user.address.number} — ${user.address.city}`
        : '',
    },
  ]

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold uppercase text-slate-700 dark:bg-slate-700 dark:text-slate-300">
          {authUser?.name.firstname?.[0]}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {authUser?.name.firstname} {authUser?.name.lastname}
          </h1>
          <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            isAdmin
              ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
          }`}>
            {isAdmin ? 'Administrador' : 'Cliente'}
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 px-6 py-4">
            <Icon className="h-5 w-5 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
              <p className="font-medium text-slate-900 dark:text-white">{value || '—'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Account
