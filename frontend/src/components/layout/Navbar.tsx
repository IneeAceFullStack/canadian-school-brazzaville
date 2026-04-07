import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, Mail, Facebook, Instagram } from 'lucide-react'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/programmes', label: 'Programmes' },
  { to: '/vie-scolaire', label: 'Vie scolaire' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-primary-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:+24206000000" className="flex items-center gap-1 hover:text-red-200 transition-colors">
              <Phone size={12} /> +242 06 000 0000
            </a>
            <a href="mailto:contact@ecole-canadienne.cg" className="flex items-center gap-1 hover:text-red-200 transition-colors">
              <Mail size={12} /> contact@ecole-canadienne.cg
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-red-200 transition-colors"><Facebook size={13} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-red-200 transition-colors"><Instagram size={13} /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">ÉC</div>
          <div>
            <div className="font-bold text-gray-900 leading-tight text-sm">École Canadienne</div>
            <div className="text-primary-600 text-xs font-medium">Canadian School · Brazzaville</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/inscription" className="btn-primary text-sm py-2 px-4">Inscription</Link>
          <Link to="/connexion" className="btn-secondary text-sm py-2 px-4">Connexion</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-700'}`}>
              {l.label}
            </NavLink>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link to="/inscription" onClick={() => setOpen(false)} className="btn-primary text-sm text-center">Inscription</Link>
            <Link to="/connexion" onClick={() => setOpen(false)} className="btn-secondary text-sm text-center">Connexion</Link>
          </div>
        </div>
      )}
    </header>
  )
}
# 2025-11-20T09:15:00 - feat: Navbar et Footer du site public
# 2025-12-20T09:15:00 - fix: la navbar ne se fermait pas sur mobile apres navigation
# 2026-04-02T09:15:00 - fix: la couleur primaire n'etait pas appliquee sur la navbar
# 2026-04-03T11:00:00 - feat: logo de l'ecole integre dans la navbar
# 2026-04-07T09:00:00 - fix: le menu mobile ne se fermait pas correctement
# 2025-11-20T09:15:00 - feat: Navbar et Footer du site public
# 2025-12-20T09:15:00 - fix: la navbar ne se fermait pas sur mobile apres navigation
# 2026-04-02T09:15:00 - fix: la couleur primaire n'etait pas appliquee sur la navbar
# 2026-04-03T11:00:00 - feat: logo de l'ecole integre dans la navbar
# 2026-04-07T09:00:00 - fix: le menu mobile ne se fermait pas correctement
# 2025-11-20T09:15:00 - feat: Navbar et Footer du site public
# 2025-12-20T09:15:00 - fix: la navbar ne se fermait pas sur mobile apres navigation
# 2026-04-02T09:15:00 - fix: la couleur primaire n'etait pas appliquee sur la navbar
# 2026-04-03T11:00:00 - feat: logo de l'ecole integre dans la navbar
# 2026-04-07T09:00:00 - fix: le menu mobile ne se fermait pas correctement
# 2025-11-20T09:15:00 - feat: Navbar et Footer du site public
# 2025-12-20T09:15:00 - fix: la navbar ne se fermait pas sur mobile apres navigation
# 2026-04-02T09:15:00 - fix: la couleur primaire n'etait pas appliquee sur la navbar
# 2026-04-03T11:00:00 - feat: logo de l'ecole integre dans la navbar
# 2026-04-07T09:00:00 - fix: le menu mobile ne se fermait pas correctement
