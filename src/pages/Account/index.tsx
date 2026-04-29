import { useState, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/auth/useAuth'
import { useUser } from '../../hooks/useUsers'
import { usersService } from '../../services/users.service'
import { useToast } from '../../contexts/toast/useToast'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

interface PasswordForm {
  current: string
  next: string
  confirm: string
}

const emptyPasswordForm: PasswordForm = { current: '', next: '', confirm: '' }

const Account = () => {
  const { user: authUser, isAuthenticated, isAdmin } = useAuth()
  const { data: user, isLoading } = useUser(authUser?.id)
  const { toast } = useToast()
  const [pwForm, setPwForm] = useState<PasswordForm>(emptyPasswordForm)
  const [pwErrors, setPwErrors] = useState<Partial<PasswordForm>>({})
  const [showPw, setShowPw] = useState(false)
  const [savingPw, setSavingPw] = useState(false)

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

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPwForm((prev) => ({ ...prev, [name]: value }))
    if (pwErrors[name as keyof PasswordForm]) {
      setPwErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handlePwSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const errors: Partial<PasswordForm> = {}

      if (!pwForm.current) errors.current = 'Informe a senha atual.'
      if (pwForm.next.length < 6) errors.next = 'A nova senha deve ter pelo menos 6 caracteres.'
      if (pwForm.next !== pwForm.confirm) errors.confirm = 'As senhas não coincidem.'

      if (Object.keys(errors).length > 0) {
        setPwErrors(errors)
        return
      }

      if (!authUser) return
      setSavingPw(true)
      try {
        await usersService.update(authUser.id, { password: pwForm.next } as never)
        toast('Senha alterada com sucesso.', 'success')
        setPwForm(emptyPasswordForm)
      } catch {
        toast('Erro ao alterar senha. Tente novamente.', 'error')
      } finally {
        setSavingPw(false)
      }
    },
    [pwForm, authUser, toast]
  )

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

      <section className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <LockClosedIcon className="h-5 w-5 text-slate-400" />
          Alterar senha
        </h2>
        <form
          onSubmit={handlePwSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          {(
            [
              { name: 'current', label: 'Senha atual', placeholder: '••••••' },
              { name: 'next', label: 'Nova senha', placeholder: '••••••' },
              { name: 'confirm', label: 'Confirmar nova senha', placeholder: '••••••' },
            ] as { name: keyof PasswordForm; label: string; placeholder: string }[]
          ).map(({ name, label, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
              </label>
              <div className="relative">
                <input
                  id={name}
                  name={name}
                  type={showPw ? 'text' : 'password'}
                  value={pwForm[name]}
                  onChange={handlePwChange}
                  placeholder={placeholder}
                  className={`w-full rounded-lg border bg-slate-50 px-4 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 ${
                    pwErrors[name]
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 focus:border-slate-400 dark:border-slate-700'
                  }`}
                />
                {name === 'current' && (
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? 'Ocultar senha' : 'Mostrar senha'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPw ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                )}
              </div>
              {pwErrors[name] && (
                <p className="mt-1 text-xs text-rose-500">{pwErrors[name]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingPw}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {savingPw && <LoadingSpinner size="sm" />}
              {savingPw ? 'Salvando...' : 'Alterar senha'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Account
