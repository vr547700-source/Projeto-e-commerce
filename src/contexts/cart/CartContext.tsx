import { createContext, useReducer, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { cartReducer, initialCartState } from './cartReducer'
import type { CartState, CartAction } from '../../types/cart'
import type { Product } from '../../types/product'

const STORAGE_KEY = 'cart'

const loadCart = (): CartState => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return initialCartState
  try {
    return JSON.parse(raw) as CartState
  } catch {
    return initialCartState
  }
}

interface CartContextValue {
  items: CartState['items']
  totalItems: number
  subtotal: number
  dispatch: React.Dispatch<CartAction>
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart)

  const addItem = useCallback(
    (product: Product) => dispatch({ type: 'ADD_ITEM', product }),
    []
  )
  const removeItem = useCallback(
    (productId: number) => dispatch({ type: 'REMOVE_ITEM', productId }),
    []
  )
  const updateQuantity = useCallback(
    (productId: number, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
    []
  )
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])

  const totalItems = useMemo(
    () => state.items.reduce((s, i) => s + i.quantity, 0),
    [state.items]
  )
  const subtotal = useMemo(
    () => state.items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    [state.items]
  )

  useMemo(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return (
    <CartContext.Provider
      value={{ items: state.items, totalItems, subtotal, dispatch, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
