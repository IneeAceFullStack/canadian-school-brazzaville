import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Users, UserCheck, CreditCard, BookOpen,
  Calendar, Megaphone, ClipboardList, Menu, X, LogOut, ChevronRight
} from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/eleves', label: 'Élèves', icon: Users },
  { to: '/admin/enseignants', label: 'Enseignants', icon: UserCheck },
  { to: '/admin/inscriptions', label: 'Inscriptions', icon: ClipboardList },
  { to: '/admin/paiements', label: 'Paiements', icon: CreditCard },
  { to: '/admin/notes', label: 'Notes', icon: BookOpen },
  { to: '/admin/emploi-du-temps', label: 'Emploi du temps', icon: Calendar },
  { to: '/admin/annonces', label: 'Annonces', icon: Megaphone },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} bg-gray-900 flex flex-col transition-all duration-300 shrink-0`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {sidebarOpen && <span className="text-white font-bold text-sm truncate">Administration</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition-colors ml-auto">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${isActive ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              <Icon size={18} className="shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800">
          {sidebarOpen && (
            <div className="text-xs text-gray-500 mb-2 px-2 truncate">{user?.name}</div>
          )}
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all text-sm">
            <LogOut size={18} className="shrink-0" />
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <span className="text-primary-600 font-medium">Administration</span>
          <ChevronRight size={14} />
          <span className="text-gray-700">Tableau de bord</span>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
# 2025-11-19T10:00:00 - feat: layout admin avec sidebar et navigation
# 2026-06-05T09:30:00 - refactor: derniers ajustements sur les layouts mobile
# 2025-11-19T10:00:00 - feat: layout admin avec sidebar et navigation
# 2026-06-05T09:30:00 - refactor: derniers ajustements sur les layouts mobile
# 2025-11-19T10:00:00 - feat: layout admin avec sidebar et navigation
# 2026-06-05T09:30:00 - refactor: derniers ajustements sur les layouts mobile
# 2025-11-19T10:00:00 - feat: layout admin avec sidebar et navigation
