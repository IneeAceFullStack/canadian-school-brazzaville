import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'

const demoAccounts = [
  { role: 'Admin', email: 'admin@ecole.cg', password: 'admin123', color: 'bg-red-50 border-red-200 text-red-700' },
  { role: 'Enseignant', email: 'prof@ecole.cg', password: 'prof123', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { role: 'Élève', email: 'eleve@ecole.cg', password: 'eleve123', color: 'bg-green-50 border-green-200 text-green-700' },
]

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  if (user) {
    const routes: Record<string, string> = { admin: '/admin', teacher: '/professeur', student: '/eleve' }
    navigate(routes[user.role] || '/')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Connexion réussie !')
    } catch {
      toast.error('Email ou mot de passe incorrect')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">ÉC</div>
            <div className="text-left">
              <div className="font-bold text-white text-sm">École Canadienne</div>
              <div className="text-primary-400 text-xs">Canadian School · Brazzaville</div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white">Connexion</h1>
          <p className="text-gray-400 text-sm mt-1">Accédez à votre espace personnel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="input-field" autoComplete="email" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} className="input-field pr-11" autoComplete="current-password"
                  value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
              <LogIn size={18} /> {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3">Comptes de démonstration</p>
            <div className="space-y-2">
              {demoAccounts.map(a => (
                <button key={a.role} onClick={() => setForm({ email: a.email, password: a.password })}
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-lg border text-xs ${a.color} hover:opacity-80 transition-opacity`}>
                  <span className="font-semibold">{a.role}</span>
                  <span className="font-mono">{a.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          <Link to="/" className="hover:text-white transition-colors">← Retour au site</Link>
        </p>
      </div>
    </div>
  )
}
# 2025-11-18T09:30:00 - feat: page de connexion avec formulaire et gestion des roles
# 2026-02-11T14:00:00 - style: amelioration de la page de connexion
# 2026-06-03T14:30:00 - style: ajout du logo dans le footer et la page de connexion
# 2025-11-18T09:30:00 - feat: page de connexion avec formulaire et gestion des roles
# 2026-02-11T14:00:00 - style: amelioration de la page de connexion
# 2026-06-03T14:30:00 - style: ajout du logo dans le footer et la page de connexion
# 2025-11-18T09:30:00 - feat: page de connexion avec formulaire et gestion des roles
# 2026-02-11T14:00:00 - style: amelioration de la page de connexion
# 2026-06-03T14:30:00 - style: ajout du logo dans le footer et la page de connexion
# 2025-11-18T09:30:00 - feat: page de connexion avec formulaire et gestion des roles
# 2026-02-11T14:00:00 - style: amelioration de la page de connexion
