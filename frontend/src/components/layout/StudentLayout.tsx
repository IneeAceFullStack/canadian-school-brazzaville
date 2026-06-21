import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, BookOpen, Calendar, LogOut } from 'lucide-react'

const navItems = [
  { to: '/eleve', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/eleve/notes', label: 'Mes notes', icon: BookOpen },
  { to: '/eleve/emploi-du-temps', label: 'Emploi du temps', icon: Calendar },
]

export default function StudentLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-56 bg-primary-700 flex flex-col shrink-0">
        <div className="p-5 border-b border-primary-800">
          <div className="text-white font-bold text-sm">Espace Élève</div>
          <div className="text-primary-200 text-xs mt-1 truncate">{user?.name}</div>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? 'bg-white text-primary-700 font-medium' : 'text-primary-100 hover:bg-primary-800 hover:text-white'}`}>
              <Icon size={17} className="shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-primary-800">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-primary-200 hover:text-white hover:bg-primary-800 transition-all text-sm">
            <LogOut size={17} />Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6"><Outlet /></main>
    </div>
  )
}
