import useSWR from 'swr'
import { productsService } from '../services/products.service'

export const useProducts = (category?: string) => {
  const key = category ? `/products/category/${category}` : '/products'
  const fetcher = () =>
    category ? productsService.getByCategory(category) : productsService.getAll()
  return useSWR(key, fetcher)
}

export const useProduct = (id: number | undefined) =>
  useSWR(id ? `/products/${id}` : null, () => productsService.getById(id!))

export const useCategories = () =>
  useSWR('/products/categories', productsService.getCategories)
