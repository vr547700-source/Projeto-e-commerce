import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth')
  if (!raw) return config
  const { token } = JSON.parse(raw)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
