import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, BookOpen, LogOut } from 'lucide-react'

const navItems = [
  { to: '/professeur', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/professeur/notes', label: 'Gestion des notes', icon: BookOpen },
]

export default function TeacherLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-56 bg-gray-800 flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-700">
          <div className="text-white font-bold text-sm">Espace Enseignant</div>
          <div className="text-gray-400 text-xs mt-1 truncate">{user?.name}</div>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}>
              <Icon size={17} className="shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-700">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all text-sm">
            <LogOut size={17} />Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6"><Outlet /></main>
    </div>
  )
}
# 2025-11-19T15:40:00 - feat: layouts Student et Teacher
# 2026-06-05T09:30:00 - refactor: derniers ajustements sur les layouts mobile
# 2025-11-19T15:40:00 - feat: layouts Student et Teacher
# 2026-06-05T09:30:00 - refactor: derniers ajustements sur les layouts mobile
# 2025-11-19T15:40:00 - feat: layouts Student et Teacher
# 2026-06-05T09:30:00 - refactor: derniers ajustements sur les layouts mobile
# 2025-11-19T15:40:00 - feat: layouts Student et Teacher
# 2026-06-05T09:30:00 - refactor: derniers ajustements sur les layouts mobile
