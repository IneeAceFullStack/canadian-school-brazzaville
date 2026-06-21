import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">ÉC</div>
            <div>
              <div className="font-bold text-white text-sm">École Canadienne</div>
              <div className="text-primary-400 text-xs">Canadian School · Brazzaville</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Un enseignement d'excellence bilingue (français-anglais) de la maternelle au lycée, au cœur de Brazzaville.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"><Facebook size={16} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"><Instagram size={16} /></a>
            <a href="https://wa.me/24206000000" target="_blank" rel="noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"><MessageCircle size={16} /></a>
          </div>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
          <ul className="space-y-2 text-sm">
            {[['/', 'Accueil'], ['/a-propos', 'À propos'], ['/programmes', 'Programmes'],
              ['/vie-scolaire', 'Vie scolaire'], ['/actualites', 'Actualités'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-primary-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Scolarité */}
        <div>
          <h3 className="text-white font-semibold mb-4">Scolarité</h3>
          <ul className="space-y-2 text-sm">
            {[['/inscription', 'Nouvelle inscription'], ['/reinscription', 'Réinscription'],
              ['/connexion', 'Espace élève'], ['/connexion', 'Espace enseignant'],
              ['/connexion', 'Administration']].map(([to, label]) => (
              <li key={label}><Link to={to} className="hover:text-primary-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={15} className="text-primary-400 mt-0.5 shrink-0" /><span>Avenue de la Paix, Brazzaville, République du Congo</span></li>
            <li className="flex items-center gap-2"><Phone size={15} className="text-primary-400 shrink-0" /><a href="tel:+24206000000" className="hover:text-primary-400">+242 06 000 0000</a></li>
            <li className="flex items-center gap-2"><Mail size={15} className="text-primary-400 shrink-0" /><a href="mailto:contact@ecole-canadienne.cg" className="hover:text-primary-400">contact@ecole-canadienne.cg</a></li>
            <li className="flex items-center gap-2"><Clock size={15} className="text-primary-400 shrink-0" /><span>Lun–Ven : 7h00–17h00</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 px-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} École Canadienne Canadian School · Brazzaville, Congo. Tous droits réservés.
      </div>
    </footer>
  )
}
