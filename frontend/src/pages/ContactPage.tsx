import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle, Send } from 'lucide-react'
import { contactAPI } from '../services/api'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', sujet: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await contactAPI.send(form)
      toast.success('Message envoyé avec succès ! Nous vous répondrons sous 24h.')
      setForm({ nom: '', email: '', telephone: '', sujet: '', message: '' })
    } catch {
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <section className="page-hero text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contactez-nous</h1>
        <p className="text-red-200 text-lg max-w-2xl mx-auto">Notre équipe est disponible pour répondre à toutes vos questions</p>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Infos */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
            <div className="space-y-5 mb-8">
              {[
                { icon: MapPin, titre: 'Adresse', val: 'Avenue de la Paix, Brazzaville\nRépublique du Congo' },
                { icon: Phone, titre: 'Téléphone', val: '+242 06 000 0000\n+242 05 000 0000' },
                { icon: Mail, titre: 'Email', val: 'contact@ecole-canadienne.cg\nadmin@ecole-canadienne.cg' },
                { icon: Clock, titre: 'Horaires', val: 'Lundi – Vendredi : 7h00 – 17h00\nSamedi : 8h00 – 12h00' },
              ].map(({ icon: Icon, titre, val }) => (
                <div key={titre} className="flex gap-4">
                  <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{titre}</div>
                    <div className="text-gray-500 text-sm whitespace-pre-line">{val}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-gray-900 mb-3">Suivez-nous</h3>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <Facebook size={16} /> Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-opacity">
                <Instagram size={16} /> Instagram
              </a>
              <a href="https://wa.me/24206000000" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>

            <div className="mt-8 bg-gray-100 rounded-xl p-4 h-48 flex items-center justify-center text-gray-400 text-sm">
              <MapPin size={20} className="mr-2" /> Carte Google Maps — Brazzaville, Congo
            </div>
          </div>

          {/* Formulaire */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyer un message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input className="input-field" value={form.nom} onChange={e => setForm(p => ({ ...p, nom: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input className="input-field" value={form.telephone} onChange={e => setForm(p => ({ ...p, telephone: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" className="input-field" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                <select className="input-field" value={form.sujet} onChange={e => setForm(p => ({ ...p, sujet: e.target.value }))} required>
                  <option value="">Choisir un sujet...</option>
                  <option>Renseignements inscription</option>
                  <option>Réinscription</option>
                  <option>Programmes scolaires</option>
                  <option>Paiements et frais</option>
                  <option>Vie scolaire</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea className="input-field resize-none" rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                {loading ? 'Envoi en cours...' : <><Send size={16} /> Envoyer le message</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
# 2025-12-09T09:15:00 - feat: formulaire de contact public
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
# 2026-04-10T09:30:00 - style: amelioration de la page Contact - carte et reseaux sociaux
# 2026-05-11T10:15:00 - fix: le formulaire de contact ne reinitialise pas apres envoi
# 2025-12-09T09:15:00 - feat: formulaire de contact public
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
# 2026-04-10T09:30:00 - style: amelioration de la page Contact - carte et reseaux sociaux
# 2026-05-11T10:15:00 - fix: le formulaire de contact ne reinitialise pas apres envoi
# 2025-12-09T09:15:00 - feat: formulaire de contact public
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
# 2026-04-10T09:30:00 - style: amelioration de la page Contact - carte et reseaux sociaux
# 2026-05-11T10:15:00 - fix: le formulaire de contact ne reinitialise pas apres envoi
# 2025-12-09T09:15:00 - feat: formulaire de contact public
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
# 2026-04-10T09:30:00 - style: amelioration de la page Contact - carte et reseaux sociaux
