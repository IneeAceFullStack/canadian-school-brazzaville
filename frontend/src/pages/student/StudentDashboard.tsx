import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Calendar, TrendingUp, Bell } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { gradesAPI, scheduleAPI, announcementsAPI } from '../../services/api'

interface Grade { matiere: string; note: number; noteMax: number; coefficient: number; trimestre: string }
interface Slot { jour: string; heureDebut: string; heureFin: string; matiere: string; salle?: string }
interface Announce { titre: string; contenu: string; createdAt: string; priorite: string }

export default function StudentDashboard() {
  const { user } = useAuth()
  const [grades, setGrades] = useState<Grade[]>([])
  const [schedule, setSchedule] = useState<Slot[]>([])
  const [announcements, setAnnouncements] = useState<Announce[]>([])
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' })
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1)

  useEffect(() => {
    Promise.all([
      gradesAPI.list({ limit: '6' }).then(r => setGrades(r.data.grades)).catch(() => {}),
      scheduleAPI.list().then(r => setSchedule(r.data.schedule)).catch(() => {}),
      announcementsAPI.public().then(r => setAnnouncements(r.data.announcements.slice(0, 3))).catch(() => {}),
    ])
  }, [])

  const todaySlots = schedule.filter(s => s.jour === todayCapitalized)
  const t1Grades = grades.filter(g => g.trimestre === 'T1')
  const moyenne = t1Grades.length > 0
    ? t1Grades.reduce((acc, g) => acc + (g.note / g.noteMax) * 20 * g.coefficient, 0) / t1Grades.reduce((acc, g) => acc + g.coefficient, 0)
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bonjour, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-gray-500 text-sm">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Moyenne T1', value: moyenne ? `${moyenne.toFixed(2)}/20` : '—', icon: TrendingUp, color: 'text-primary-600 bg-primary-50' },
          { label: 'Notes T1', value: t1Grades.length, icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
          { label: 'Cours aujourd\'hui', value: todaySlots.length, icon: Calendar, color: 'text-green-600 bg-green-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}><Icon size={18} /></div>
            <div>
              <div className="text-xl font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Cours aujourd'hui */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-primary-600" /> Cours du {todayCapitalized}
          </h2>
          {todaySlots.length === 0 ? (
            <div className="text-gray-400 text-sm text-center py-6">Pas de cours aujourd'hui 🎉</div>
          ) : (
            <div className="space-y-2">
              {todaySlots.sort((a, b) => a.heureDebut.localeCompare(b.heureDebut)).map((s, i) => (
                <div key={i} className="flex gap-3 items-center p-2.5 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-400 w-20 shrink-0">{s.heureDebut} – {s.heureFin}</div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">{s.matiere}</div>
                    {s.salle && <div className="text-xs text-gray-400">{s.salle}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/eleve/emploi-du-temps" className="mt-4 text-primary-600 text-xs font-medium hover:underline block">Voir emploi du temps complet →</Link>
        </div>

        {/* Annonces */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Bell size={16} className="text-primary-600" /> Annonces récentes
          </h2>
          {announcements.length === 0 ? (
            <div className="text-gray-400 text-sm text-center py-6">Aucune annonce</div>
          ) : (
            <div className="space-y-3">
              {announcements.map((a, i) => (
                <div key={i} className="border-l-2 border-primary-400 pl-3">
                  <div className="font-medium text-sm text-gray-900">{a.titre}</div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{a.contenu}</p>
                  <div className="text-xs text-gray-400 mt-1">{new Date(a.createdAt).toLocaleDateString('fr-FR')}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dernières notes */}
      {grades.length > 0 && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen size={16} className="text-primary-600" /> Dernières notes
          </h2>
          <div className="space-y-2">
            {grades.slice(0, 5).map((g, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center text-xs font-bold">{g.trimestre}</div>
                  <span className="text-sm font-medium text-gray-900">{g.matiere}</span>
                </div>
                <div className={`font-bold ${(g.note / g.noteMax) * 20 >= 10 ? 'text-green-600' : 'text-red-600'}`}>
                  {g.note}/{g.noteMax}
                </div>
              </div>
            ))}
          </div>
          <Link to="/eleve/notes" className="mt-3 text-primary-600 text-xs font-medium hover:underline block">Voir toutes mes notes →</Link>
        </div>
      )}
    </div>
  )
}
# 2025-12-04T11:00:00 - feat: dashboard eleve - notes et emploi du temps
# 2025-12-04T11:00:00 - feat: dashboard eleve - notes et emploi du temps
# 2025-12-04T11:00:00 - feat: dashboard eleve - notes et emploi du temps
# 2025-12-04T11:00:00 - feat: dashboard eleve - notes et emploi du temps
