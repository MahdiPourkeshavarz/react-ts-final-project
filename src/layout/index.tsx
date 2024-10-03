import { Outlet } from 'react-router-dom'
import { Header } from '../components/header'
import { useStore } from '../context/shopStore'

export function Layout() {
  const { theme } = useStore()
  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100'
      }`}
    >
      <Header />
      <Outlet />
    </div>
  )
}
