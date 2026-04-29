import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import LeftDrawer from '../../components/layout/LeftDrawer'
import RightDrawer from '../../components/layout/RightDrawer'
import { useDrawer } from '../../contexts/drawer/useDrawer'

const RootLayout = () => {
  const { closeAll } = useDrawer()
  const location = useLocation()

  useEffect(() => {
    closeAll()
  }, [location.pathname, closeAll])

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <LeftDrawer />
      <RightDrawer />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
