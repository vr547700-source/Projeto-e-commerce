import useSWR from 'swr'
import { usersService } from '../services/users.service'

export const useUsers = () => useSWR('/users', usersService.getAll)

export const useUser = (id: number | undefined) =>
  useSWR(id ? `/users/${id}` : null, () => usersService.getById(id!))
