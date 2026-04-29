import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { DrawerProvider } from './contexts/drawer/DrawerContext'
import { AuthProvider } from './contexts/auth/AuthContext'
import { CartProvider } from './contexts/cart/CartContext'
import { ToastProvider } from './contexts/toast/ToastContext'
import { ThemeProvider } from './contexts/theme/ThemeContext'
import { WishlistProvider } from './contexts/wishlist/WishlistContext'
import ToastContainer from './components/ui/ToastContainer'

const App = () => (
  <ThemeProvider>
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <DrawerProvider>
              <RouterProvider router={router} />
              <ToastContainer />
            </DrawerProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  </ThemeProvider>
)

export default App
