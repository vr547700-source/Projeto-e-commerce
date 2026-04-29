import { createContext, useState, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../../types/product'

interface WishlistContextValue {
  items: Product[]
  toggle: (product: Product) => void
  isWishlisted: (id: number) => boolean
}

export const WishlistContext = createContext<WishlistContextValue | null>(null)

const loadWishlist = (): Product[] => {
  try {
    const raw = localStorage.getItem('wishlist')
    return raw ? (JSON.parse(raw) as Product[]) : []
  } catch {
    return []
  }
}

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>(loadWishlist)

  const toggle = useCallback((product: Product) => {
    setItems((prev) => {
      const next = prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
      localStorage.setItem('wishlist', JSON.stringify(next))
      return next
    })
  }, [])

  const isWishlisted = useCallback((id: number) => items.some((p) => p.id === id), [items])

  const value = useMemo(() => ({ items, toggle, isWishlisted }), [items, toggle, isWishlisted])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
