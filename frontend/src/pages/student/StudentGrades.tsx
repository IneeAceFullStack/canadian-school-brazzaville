import { useEffect, useState } from 'react'
import { BookOpen, TrendingUp } from 'lucide-react'
import { gradesAPI } from '../../services/api'

interface Grade {
  id: string; matiere: string; note: number; noteMax: number
  coefficient: number; trimestre: string; commentaire?: string
}

const TRIMESTRES = ['T1', 'T2', 'T3']

function getMention(note: number, max: number) {
  const n = (note / max) * 20
  if (n >= 16) return { label: 'Très Bien', color: 'text-emerald-600 bg-emerald-50', bar: 'bg-emerald-500' }
  if (n >= 14) return { label: 'Bien', color: 'text-blue-600 bg-blue-50', bar: 'bg-blue-500' }
  if (n >= 12) return { label: 'Assez Bien', color: 'text-cyan-600 bg-cyan-50', bar: 'bg-cyan-500' }
  if (n >= 10) return { label: 'Passable', color: 'text-yellow-600 bg-yellow-50', bar: 'bg-yellow-500' }
  return { label: 'Insuffisant', color: 'text-red-600 bg-red-50', bar: 'bg-red-500' }
}

export default function StudentGrades() {
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [trimestre, setTrimestre] = useState('T1')

  useEffect(() => {
    setLoading(true)
    gradesAPI.list({ trimestre }).then(r => setGrades(r.data.grades)).catch(console.error).finally(() => setLoading(false))
  }, [trimestre])

  const filtered = grades
  const moyenne = filtered.length > 0
    ? filtered.reduce((acc, g) => acc + (g.note / g.noteMax) * 20 * g.coefficient, 0) / filtered.reduce((acc, g) => acc + g.coefficient, 0)
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mes notes</h1>
        <p className="text-gray-500 text-sm">Résultats par trimestre</p>
      </div>

      {/* Selector */}
      <div className="flex gap-2">
        {TRIMESTRES.map(t => (
          <button key={t} onClick={() => setTrimestre(t)}
            className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${trimestre === t ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'}`}>
            {t === 'T1' ? '1er Trimestre' : t === 'T2' ? '2e Trimestre' : '3e Trimestre'}
          </button>
        ))}
      </div>

      {/* Moyenne */}
      {moyenne !== null && (
        <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-primary-200 text-sm mb-1">Moyenne générale — {trimestre}</div>
              <div className="text-4xl font-extrabold">{moyenne.toFixed(2)}<span className="text-xl text-primary-300">/20</span></div>
              <div className="text-primary-200 text-sm mt-1">{getMention(moyenne, 20).label}</div>
            </div>
            <TrendingUp size={48} className="text-primary-400" />
          </div>
        </div>
      )}

      {/* Notes list */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <BookOpen size={32} className="mx-auto mb-2 opacity-30" />Aucune note pour ce trimestre
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>{['Matière','Note','Sur','Coeff.','Sur 20','Mention','Commentaire'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((g, i) => {
                const { label, color, bar } = getMention(g.note, g.noteMax)
                const sur20 = ((g.note / g.noteMax) * 20).toFixed(2)
                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{g.matiere}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">{g.note}</td>
                    <td className="px-4 py-3 text-gray-500">{g.noteMax}</td>
                    <td className="px-4 py-3 text-gray-500">×{g.coefficient}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-16">
                          <div className={`h-1.5 rounded-full ${bar}`} style={{ width: `${(Number(sur20) / 20) * 100}%` }} />
                        </div>
                        <span className="font-bold text-gray-900 text-xs">{sur20}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>{label}</span></td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{g.commentaire || '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
# 2025-12-05T09:30:00 - feat: page notes de l'eleve avec moyenne par trimestre
# 2026-03-11T14:30:00 - fix: la moyenne calculee ne prenait pas en compte le coefficient
# 2025-12-05T09:30:00 - feat: page notes de l'eleve avec moyenne par trimestre
# 2026-03-11T14:30:00 - fix: la moyenne calculee ne prenait pas en compte le coefficient
# 2025-12-05T09:30:00 - feat: page notes de l'eleve avec moyenne par trimestre
# 2026-03-11T14:30:00 - fix: la moyenne calculee ne prenait pas en compte le coefficient
# 2025-12-05T09:30:00 - feat: page notes de l'eleve avec moyenne par trimestre
# 2026-03-11T14:30:00 - fix: la moyenne calculee ne prenait pas en compte le coefficient
