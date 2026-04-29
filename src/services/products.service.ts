import { api } from '../api/client'
import type { Product, CreateProductPayload } from '../types/product'

export const productsService = {
  getAll: () => api.get<Product[]>('/products').then((r) => r.data),
  getById: (id: number) => api.get<Product>(`/products/${id}`).then((r) => r.data),
  getCategories: () => api.get<string[]>('/products/categories').then((r) => r.data),
  getByCategory: (cat: string) =>
    api.get<Product[]>(`/products/category/${cat}`).then((r) => r.data),
  create: (payload: CreateProductPayload) =>
    api.post<Product>('/products', payload).then((r) => r.data),
  update: (id: number, payload: Partial<CreateProductPayload>) =>
    api.put<Product>(`/products/${id}`, payload).then((r) => r.data),
  remove: (id: number) => api.delete(`/products/${id}`).then((r) => r.data),
}
