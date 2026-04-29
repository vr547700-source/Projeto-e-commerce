export type UserRole = 'admin' | 'client'

export interface UserName {
  firstname: string
  lastname: string
}

export interface UserAddress {
  city: string
  street: string
  number: number
  zipcode: string
}

export interface User {
  id: number
  username: string
  email: string
  password: string
  name: UserName
  phone: string
  address: UserAddress
}

export interface AuthUser {
  id: number
  username: string
  email: string
  name: UserName
  role: UserRole
}

export interface AuthState {
  token: string
  user: AuthUser
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface CreateUserPayload {
  username: string
  email: string
  password: string
  name: UserName
  phone: string
  address: UserAddress
}
