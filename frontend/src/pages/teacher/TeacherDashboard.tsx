import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, Calendar } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { gradesAPI, studentsAPI } from '../../services/api'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [gradesCount, setGradesCount] = useState(0)
  const [studentsCount, setStudentsCount] = useState(0)

  useEffect(() => {
    gradesAPI.list().then(r => setGradesCount(r.data.grades.length)).catch(() => {})
    studentsAPI.list().then(r => setStudentsCount(r.data.total)).catch(() => {})
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bienvenue, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-gray-500 text-sm">Espace enseignant — {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Notes saisies', value: gradesCount, icon: BookOpen, color: 'text-primary-600 bg-primary-50' },
          { label: 'Élèves', value: studentsCount, icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Trimestres', value: 3, icon: Calendar, color: 'text-green-600 bg-green-50' },
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

      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link to="/professeur/notes" className="flex items-center gap-3 p-4 rounded-xl border hover:border-primary-300 hover:bg-primary-50 transition-all group">
            <BookOpen size={20} className="text-primary-600" />
            <div>
              <div className="font-medium text-gray-900 group-hover:text-primary-700 text-sm">Saisir des notes</div>
              <div className="text-xs text-gray-500">Ajouter ou modifier les notes de vos élèves</div>
            </div>
          </Link>
          <div className="flex items-center gap-3 p-4 rounded-xl border bg-gray-50 opacity-60 cursor-not-allowed">
            <Calendar size={20} className="text-gray-400" />
            <div>
              <div className="font-medium text-gray-700 text-sm">Mon emploi du temps</div>
              <div className="text-xs text-gray-500">Bientôt disponible</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-primary-50 border border-primary-200">
        <h2 className="font-semibold text-primary-800 mb-2">Rappel</h2>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• La saisie des notes du T1 est ouverte jusqu'au 15 décembre 2024</li>
          <li>• Le conseil de classe du T1 aura lieu le 20 décembre 2024</li>
          <li>• Merci de saisir un commentaire pour les élèves en difficulté</li>
        </ul>
      </div>
    </div>
  )
}
