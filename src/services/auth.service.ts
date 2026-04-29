import { api } from '../api/client'
import type { LoginCredentials, AuthState, AuthUser, User } from '../types/user'

const ADMIN_USERNAME = 'mor_2314'

const toRole = (username: string) =>
  username === ADMIN_USERNAME ? ('admin' as const) : ('client' as const)

export const login = async (credentials: LoginCredentials): Promise<AuthState> => {
  const { data } = await api.post<{ token: string }>('/auth/login', credentials)

  const usersRes = await api.get<User[]>('/users')
  const found = usersRes.data.find((u) => u.username === credentials.username)

  if (!found) throw new Error('Usuário não encontrado')

  const user: AuthUser = {
    id: found.id,
    username: found.username,
    email: found.email,
    name: found.name,
    role: toRole(found.username),
  }

  return { token: data.token, user }
}
