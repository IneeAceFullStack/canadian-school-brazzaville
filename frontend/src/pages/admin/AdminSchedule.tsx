import { useEffect, useState, useCallback } from 'react'
import { Plus, Trash2, X, Calendar } from 'lucide-react'
import { scheduleAPI, teachersAPI } from '../../services/api'
import toast from 'react-hot-toast'

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
const HEURES = ['07:30','08:30','09:30','10:30','11:30','12:30','13:00','14:00','15:00','16:00','17:00']
const CLASSES = ['Maternelle PS','Maternelle MS','Maternelle GS','CP','CE1','CE2','CM1','CM2','6ème','5ème','4ème','3ème','2nde','1ère','Terminale']
const MATIERES = ['Mathématiques','Français','Anglais','Sciences Physiques','SVT','Histoire-Géographie','EPS','Informatique','Éducation Civique','Arts plastiques','Philosophie','Économie']

interface Slot {
  id: string; jour: string; heureDebut: string; heureFin: string
  matiere: string; classe: string; salle?: string
  teacher?: { nom: string; prenom: string }
}

const COLORS: Record<string, string> = {
  'Mathématiques': 'bg-blue-100 text-blue-800 border-blue-200',
  'Français': 'bg-green-100 text-green-800 border-green-200',
  'Anglais': 'bg-purple-100 text-purple-800 border-purple-200',
  'Sciences Physiques': 'bg-orange-100 text-orange-800 border-orange-200',
  'SVT': 'bg-teal-100 text-teal-800 border-teal-200',
  'Histoire-Géographie': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'EPS': 'bg-red-100 text-red-800 border-red-200',
  'Informatique': 'bg-indigo-100 text-indigo-800 border-indigo-200',
}
const slotColor = (m: string) => COLORS[m] || 'bg-gray-100 text-gray-800 border-gray-200'

export default function AdminSchedule() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [teachers, setTeachers] = useState<{ id: string; nom: string; prenom: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [classeFilter, setClasseFilter] = useState('3ème')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ jour: 'Lundi', heureDebut: '07:30', heureFin: '09:30', matiere: '', classe: '3ème', salle: '', teacherId: '' })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [s, t] = await Promise.all([scheduleAPI.list({ classe: classeFilter }), teachersAPI.list()])
      setSlots(s.data.schedule)
      setTeachers(t.data.teachers)
    } catch { toast.error('Erreur') }
    finally { setLoading(false) }
  }, [classeFilter])

  useEffect(() => { load() }, [load])

  const handleSave = async () => {
    try {
      await scheduleAPI.create({ ...form, teacherId: form.teacherId || undefined })
      toast.success('Créneau ajouté'); setShowModal(false); load()
    } catch { toast.error('Erreur') }
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce créneau ?')) return
    try { await scheduleAPI.delete(id); toast.success('Supprimé'); load() }
    catch { toast.error('Erreur') }
  }

  const getSlots = (jour: string) => slots.filter(s => s.jour === jour).sort((a, b) => a.heureDebut.localeCompare(b.heureDebut))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Emploi du temps</h1>
          <p className="text-gray-500 text-sm">{slots.length} créneaux — {classeFilter}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2"><Plus size={16} /> Ajouter</button>
      </div>

      <div className="card p-4">
        <select className="input-field w-auto text-sm" value={classeFilter} onChange={e => setClasseFilter(e.target.value)}>
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {loading ? <div className="text-center py-12 text-gray-400">Chargement...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {JOURS.map(jour => (
            <div key={jour} className="card p-3">
              <h3 className="font-bold text-gray-800 text-sm text-center mb-3 pb-2 border-b">{jour}</h3>
              <div className="space-y-2">
                {getSlots(jour).length === 0 ? (
                  <div className="text-center text-gray-300 text-xs py-4 flex flex-col items-center gap-1">
                    <Calendar size={18} />Libre
                  </div>
                ) : getSlots(jour).map(slot => (
                  <div key={slot.id} className={`rounded-lg border p-2 text-xs group relative ${slotColor(slot.matiere)}`}>
                    <div className="font-bold truncate">{slot.matiere}</div>
                    <div className="mt-0.5 opacity-70">{slot.heureDebut} – {slot.heureFin}</div>
                    {slot.salle && <div className="opacity-60 truncate">📍 {slot.salle}</div>}
                    {slot.teacher && <div className="opacity-60 truncate">👤 {slot.teacher.prenom} {slot.teacher.nom}</div>}
                    <button onClick={() => handleDelete(slot.id)} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-600 bg-white rounded p-0.5 transition-opacity">
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-gray-900">Ajouter un créneau</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jour</label>
                  <select className="input-field" value={form.jour} onChange={e => setForm(p => ({ ...p, jour: e.target.value }))}>
                    {JOURS.map(j => <option key={j}>{j}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                  <select className="input-field" value={form.classe} onChange={e => setForm(p => ({ ...p, classe: e.target.value }))}>
                    {CLASSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Début</label>
                  <select className="input-field" value={form.heureDebut} onChange={e => setForm(p => ({ ...p, heureDebut: e.target.value }))}>
                    {HEURES.map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                  <select className="input-field" value={form.heureFin} onChange={e => setForm(p => ({ ...p, heureFin: e.target.value }))}>
                    {HEURES.map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
                <select className="input-field" value={form.matiere} onChange={e => setForm(p => ({ ...p, matiere: e.target.value }))}>
                  <option value="">Choisir...</option>
                  {MATIERES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salle</label>
                  <input className="input-field" placeholder="Ex: Salle 101" value={form.salle} onChange={e => setForm(p => ({ ...p, salle: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant</label>
                  <select className="input-field" value={form.teacherId} onChange={e => setForm(p => ({ ...p, teacherId: e.target.value }))}>
                    <option value="">Aucun assigné</option>
                    {teachers.map(t => <option key={t.id} value={t.id}>{t.prenom} {t.nom}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Annuler</button>
              <button onClick={handleSave} disabled={!form.matiere} className="btn-primary flex-1">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
# 2025-12-03T09:00:00 - feat: emploi du temps - creation et affichage par classe
# 2026-03-12T10:00:00 - style: amelioration de l'emploi du temps - affichage par jour
# 2025-12-03T09:00:00 - feat: emploi du temps - creation et affichage par classe
# 2026-03-12T10:00:00 - style: amelioration de l'emploi du temps - affichage par jour
# 2025-12-03T09:00:00 - feat: emploi du temps - creation et affichage par classe
# 2026-03-12T10:00:00 - style: amelioration de l'emploi du temps - affichage par jour
# 2025-12-03T09:00:00 - feat: emploi du temps - creation et affichage par classe
# 2026-03-12T10:00:00 - style: amelioration de l'emploi du temps - affichage par jour
