import { createContext, useReducer, useCallback, useMemo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { cartReducer, initialCartState } from './cartReducer'
import type { CartState, CartAction } from '../../types/cart'
import type { Product } from '../../types/product'
import { useToast } from '../toast/useToast'

const STORAGE_KEY = 'cart'
const MAX_QUANTITY = 10

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
  const { toast } = useToast()

  const addItem = useCallback(
    (product: Product) => {
      const existing = state.items.find((i) => i.product.id === product.id)
      const currentQty = existing?.quantity ?? 0

      if (currentQty >= MAX_QUANTITY) {
        toast(
          'Limite de 10 unidades atingido. Um gerente entrará em contato para pedidos maiores.',
          'warning'
        )
        return
      }

      dispatch({ type: 'ADD_ITEM', product })
      toast(`"${product.title.slice(0, 30)}..." adicionado ao carrinho.`, 'success')
    },
    [state.items, toast]
  )

  const removeItem = useCallback(
    (productId: number) => {
      dispatch({ type: 'REMOVE_ITEM', productId })
      toast('Item removido do carrinho.', 'info')
    },
    [toast]
  )

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity > MAX_QUANTITY) {
        toast(
          'Limite de 10 unidades atingido. Um gerente entrará em contato para pedidos maiores.',
          'warning'
        )
        dispatch({ type: 'UPDATE_QUANTITY', productId, quantity: MAX_QUANTITY })
        return
      }
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity })
    },
    [toast]
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

  useEffect(() => {
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
