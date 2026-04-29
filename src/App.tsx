import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { DrawerProvider } from './contexts/drawer/DrawerContext'
import { AuthProvider } from './contexts/auth/AuthContext'
import { CartProvider } from './contexts/cart/CartContext'

const App = () => (
  <AuthProvider>
    <CartProvider>
      <DrawerProvider>
        <RouterProvider router={router} />
      </DrawerProvider>
    </CartProvider>
  </AuthProvider>
)

export default App
