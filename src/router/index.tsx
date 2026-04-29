import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import ProtectedRoute from '../components/shared/ProtectedRoute'
import AdminRoute from '../components/shared/AdminRoute'
import Home from '../pages/Home'
import ProductList from '../pages/ProductList'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Account from '../pages/Account'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import AdminLayout from '../pages/admin/AdminLayout'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminProducts from '../pages/admin/Products'
import AdminUsers from '../pages/admin/Users'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <ProductList /> },
      { path: 'products/:productId', element: <ProductDetail /> },
      { path: 'login', element: <Login /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: 'cart', element: <Cart /> },
          { path: 'checkout', element: <Checkout /> },
          { path: 'account', element: <Account /> },
        ],
      },

      {
        path: 'admin',
        element: <AdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: 'products', element: <AdminProducts /> },
              { path: 'users', element: <AdminUsers /> },
            ],
          },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
])
