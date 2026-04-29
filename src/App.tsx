import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { DrawerProvider } from './contexts/drawer/DrawerContext'

const App = () => (
  <DrawerProvider>
    <RouterProvider router={router} />
  </DrawerProvider>
)

export default App
