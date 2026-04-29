import { createContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { AuthState, AuthUser, LoginCredentials } from '../../types/user'
import { login as loginService } from '../../services/auth.service'

const STORAGE_KEY = 'auth'

const loadFromStorage = (): AuthState | null => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthState
  } catch {
    return null
  }
}

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState | null>(loadFromStorage)

  const login = useCallback(async (credentials: LoginCredentials) => {
    const result = await loginService(credentials)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    setAuth(result)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setAuth(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: auth?.user ?? null,
        token: auth?.token ?? null,
        isAuthenticated: !!auth,
        isAdmin: auth?.user.role === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
