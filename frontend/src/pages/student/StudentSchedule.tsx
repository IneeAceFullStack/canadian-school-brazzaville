import { useEffect, useState } from 'react'
import { scheduleAPI } from '../../services/api'
import { Calendar } from 'lucide-react'

interface Slot { jour: string; heureDebut: string; heureFin: string; matiere: string; salle?: string; teacher?: { nom: string; prenom: string } }

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
const COLORS: Record<string, string> = {
  'Mathématiques': 'bg-blue-100 border-blue-300 text-blue-800',
  'Français': 'bg-green-100 border-green-300 text-green-800',
  'Anglais': 'bg-purple-100 border-purple-300 text-purple-800',
  'Sciences Physiques': 'bg-orange-100 border-orange-300 text-orange-800',
  'SVT': 'bg-teal-100 border-teal-300 text-teal-800',
  'Histoire-Géographie': 'bg-yellow-100 border-yellow-300 text-yellow-800',
  'EPS': 'bg-red-100 border-red-300 text-red-800',
  'Informatique': 'bg-indigo-100 border-indigo-300 text-indigo-800',
}
const color = (m: string) => COLORS[m] || 'bg-gray-100 border-gray-300 text-gray-800'

export default function StudentSchedule() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(true)
  const todayName = new Date().toLocaleDateString('fr-FR', { weekday: 'long' })
  const today = todayName.charAt(0).toUpperCase() + todayName.slice(1)

  useEffect(() => {
    scheduleAPI.list().then(r => setSlots(r.data.schedule)).catch(console.error).finally(() => setLoading(false))
  }, [])

  const getSlots = (jour: string) => slots.filter(s => s.jour === jour).sort((a, b) => a.heureDebut.localeCompare(b.heureDebut))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Emploi du temps</h1>
        <p className="text-gray-500 text-sm">Semaine — {today} <span className="text-primary-600 font-medium">(aujourd'hui)</span></p>
      </div>

      {loading ? <div className="text-center py-12 text-gray-400">Chargement...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {JOURS.map(jour => (
            <div key={jour} className={`card p-0 overflow-hidden ${jour === today ? 'ring-2 ring-primary-500' : ''}`}>
              <div className={`px-4 py-3 text-sm font-bold text-center ${jour === today ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-700 border-b'}`}>
                {jour} {jour === today && '📍'}
              </div>
              <div className="p-3 space-y-2 min-h-24">
                {getSlots(jour).length === 0 ? (
                  <div className="text-center text-gray-300 text-xs py-5 flex flex-col items-center gap-1">
                    <Calendar size={20} />Libre
                  </div>
                ) : getSlots(jour).map((s, i) => (
                  <div key={i} className={`rounded-lg border p-2.5 text-xs ${color(s.matiere)}`}>
                    <div className="font-bold">{s.matiere}</div>
                    <div className="mt-0.5 opacity-70">{s.heureDebut} – {s.heureFin}</div>
                    {s.salle && <div className="opacity-60">📍 {s.salle}</div>}
                    {s.teacher && <div className="opacity-60">👤 {s.teacher.prenom} {s.teacher.nom}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
# 2025-12-06T14:20:00 - feat: emploi du temps de l'eleve
# 2025-12-06T14:20:00 - feat: emploi du temps de l'eleve
# 2025-12-06T14:20:00 - feat: emploi du temps de l'eleve
# 2025-12-06T14:20:00 - feat: emploi du temps de l'eleve
