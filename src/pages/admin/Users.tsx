import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { mutate } from 'swr'
import { useUsers } from '../../hooks/useUsers'
import { usersService } from '../../services/users.service'
import { storeCreateUser, storeUpdateUser, storeDeleteUser } from '../../store/adminStore'
import type { User, CreateUserPayload } from '../../types/user'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import ErrorMessage from '../../components/shared/ErrorMessage'
import Modal from '../../components/shared/Modal'
import AppDialog from '../../components/ui/AppDialog'
import InputField from '../../components/ui/InputField'
import { useToast } from '../../contexts/toast/useToast'

const ADMIN_USERNAME = 'mor_2314'
const USERS_KEY = '/users'

const emptyForm: CreateUserPayload = {
  username: '',
  email: '',
  password: '',
  name: { firstname: '', lastname: '' },
  phone: '',
  address: { city: '', street: '', number: 0, zipcode: '' },
}

type ModalMode = 'create' | 'edit'

const AdminUsers = () => {
  const { data: users, error, isLoading } = useUsers()
  const { toast } = useToast()
  const [modal, setModal] = useState<{ mode: ModalMode; user?: User } | null>(null)
  const [form, setForm] = useState<CreateUserPayload>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [confirmId, setConfirmId] = useState<number | null>(null)
  const [confirmInput, setConfirmInput] = useState('')
  const [deleting, setDeleting] = useState(false)

  const openCreate = () => {
    setForm(emptyForm)
    setModal({ mode: 'create' })
  }

  const openEdit = (user: User) => {
    setForm({
      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name,
      phone: user.phone,
      address: user.address,
    })
    setModal({ mode: 'edit', user })
  }

  const closeModal = () => setModal(null)

  const openConfirm = (id: number) => {
    setConfirmId(id)
    setConfirmInput('')
  }

  const closeConfirm = () => {
    setConfirmId(null)
    setConfirmInput('')
  }

  const set = (field: string, value: string) =>
    setForm((prev) => {
      if (field.startsWith('name.')) return { ...prev, name: { ...prev.name, [field.slice(5)]: value } }
      if (field.startsWith('address.')) return { ...prev, address: { ...prev.address, [field.slice(8)]: value } }
      return { ...prev, [field]: value }
    })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (modal?.mode === 'edit' && modal.user) {
        const updated: User = { ...modal.user, ...form }
        await usersService.update(modal.user.id, form)
        storeUpdateUser(updated)
        mutate(USERS_KEY, (prev: User[] | undefined) =>
          prev?.map((u) => (u.id === modal.user!.id ? updated : u)), { revalidate: false }
        )
        toast('Usuário atualizado com sucesso.', 'success')
      } else {
        await usersService.create(form)
        const newUser: User = { ...form, id: Date.now() }
        storeCreateUser(newUser)
        mutate(USERS_KEY, (prev: User[] | undefined) =>
          prev ? [...prev, newUser] : [newUser], { revalidate: false }
        )
        toast('Usuário criado com sucesso.', 'success')
      }
      closeModal()
    } catch {
      toast('Erro ao salvar usuário. Tente novamente.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (confirmId === null || String(confirmId) !== confirmInput) return
    setDeleting(true)
    try {
      await usersService.remove(confirmId)
      storeDeleteUser(confirmId)
      mutate(USERS_KEY, (prev: User[] | undefined) =>
        prev?.filter((u) => u.id !== confirmId), { revalidate: false }
      )
      toast('Usuário excluído com sucesso.', 'success')
      closeConfirm()
    } catch {
      toast('Erro ao excluir usuário. Tente novamente.', 'error')
    } finally {
      setDeleting(false)
    }
  }

  if (isLoading) return <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>
  if (error) return <ErrorMessage onRetry={() => mutate(USERS_KEY)} />

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Usuários</h1>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900"
        >
          <PlusIcon className="h-4 w-4" />
          Novo usuário
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">Usuário</th>
              <th className="hidden px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400 sm:table-cell">E-mail</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">Role</th>
              <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-slate-400">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {users?.map((user) => {
              const isAdmin = user.username === ADMIN_USERNAME
              return (
                <tr key={user.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold uppercase text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        {user.name.firstname?.[0] ?? user.username[0]}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {user.name.firstname} {user.name.lastname}
                        </p>
                        <p className="text-xs text-slate-400">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-slate-500 dark:text-slate-400 sm:table-cell">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      isAdmin
                        ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {isAdmin && <ShieldCheckIcon className="h-3 w-3" />}
                      {isAdmin ? 'Admin' : 'Cliente'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(user)}
                        aria-label="Editar usuário"
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openConfirm(user.id)}
                        aria-label="Excluir usuário"
                        disabled={isAdmin}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-rose-900/20"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title={modal.mode === 'create' ? 'Novo usuário' : 'Editar usuário'}
          onClose={closeModal}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  { field: 'name.firstname', label: 'Nome', placeholder: 'João', type: 'text' },
                  { field: 'name.lastname', label: 'Sobrenome', placeholder: 'Silva', type: 'text' },
                  { field: 'username', label: 'Usuário', placeholder: 'joao_silva', type: 'text' },
                  { field: 'email', label: 'E-mail', placeholder: 'joao@email.com', type: 'email' },
                  { field: 'phone', label: 'Telefone', placeholder: '(11) 99999-9999', type: 'tel' },
                  { field: 'password', label: 'Senha', placeholder: '••••••', type: 'password' },
                ] as { field: string; label: string; placeholder: string; type: string }[]
              ).map(({ field, label, placeholder, type }) => {
                const value = field.startsWith('name.')
                  ? form.name[field.slice(5) as keyof typeof form.name]
                  : (form as unknown as Record<string, string>)[field] ?? ''
                return (
                  <InputField
                    key={field}
                    label={label}
                    id={field}
                    type={type}
                    required
                    value={value as string}
                    onChange={(e) => set(field, e.target.value)}
                    placeholder={placeholder}
                  />
                )
              })}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-slate-900"
              >
                {saving && <LoadingSpinner size="sm" />}
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      <AppDialog open={confirmId !== null} onClose={closeConfirm} title="Confirmar exclusão" maxWidth="sm">
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
          Esta ação não pode ser desfeita. Digite o ID{' '}
          <strong className="text-slate-900 dark:text-white">{confirmId}</strong> para confirmar.
        </p>
        <InputField
          label="Confirmação"
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
          placeholder={`Digite ${confirmId}`}
        />
        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeConfirm}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={String(confirmId) !== confirmInput || deleting}
            className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700 disabled:opacity-50"
          >
            {deleting && <LoadingSpinner size="sm" />}
            {deleting ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </AppDialog>
    </div>
  )
}

export default AdminUsers
