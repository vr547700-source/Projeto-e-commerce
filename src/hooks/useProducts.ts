import useSWR from 'swr'
import { productsService } from '../services/products.service'
import { applyProductOverrides } from '../store/adminStore'

// All product fetches share one SWR key so admin overrides propagate everywhere.
const PRODUCTS_KEY = '/products'

const productsFetcher = async () => {
  const raw = await productsService.getAll()
  return applyProductOverrides(raw)
}

export const useProducts = (category?: string) => {
  const { data, ...rest } = useSWR(PRODUCTS_KEY, productsFetcher)
  return {
    ...rest,
    data: category ? data?.filter((p) => p.category === category) : data,
  }
}

export const useProduct = (id: number | undefined) => {
  const { data: all, ...rest } = useSWR(id ? PRODUCTS_KEY : null, productsFetcher)
  return {
    ...rest,
    data: id ? all?.find((p) => p.id === id) : undefined,
  }
}

export const useCategories = () =>
  useSWR('/products/categories', productsService.getCategories)
