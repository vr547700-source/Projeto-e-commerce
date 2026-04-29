import useSWR from 'swr'
import { usersService } from '../services/users.service'
import { applyUserOverrides } from '../store/adminStore'

const USERS_KEY = '/users'

const usersFetcher = async () => {
  const raw = await usersService.getAll()
  return applyUserOverrides(raw)
}

export const useUsers = () => useSWR(USERS_KEY, usersFetcher)

export const useUser = (id: number | undefined) => {
  const { data: all, ...rest } = useSWR(id ? USERS_KEY : null, usersFetcher)
  return {
    ...rest,
    data: id ? all?.find((u) => u.id === id) : undefined,
  }
}
