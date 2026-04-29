import { api } from '../api/client'
import type { User, CreateUserPayload } from '../types/user'

export const usersService = {
  getAll: () => api.get<User[]>('/users').then((r) => r.data),
  getById: (id: number) => api.get<User>(`/users/${id}`).then((r) => r.data),
  create: (payload: CreateUserPayload) =>
    api.post<User>('/users', payload).then((r) => r.data),
  update: (id: number, payload: Partial<CreateUserPayload>) =>
    api.put<User>(`/users/${id}`, payload).then((r) => r.data),
  remove: (id: number) => api.delete(`/users/${id}`).then((r) => r.data),
}
