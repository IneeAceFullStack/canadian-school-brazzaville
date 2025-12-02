import { useEffect, useState, useCallback } from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import { gradesAPI, studentsAPI } from '../../services/api'
import toast from 'react-hot-toast'

interface Grade { id: string; matiere: string; note: number; noteMax: number; coefficient: number; trimestre: string; commentaire?: string; student: { nomComplet: string; classeActuelle: string } }
const MATIERES = ['Mathématiques','Français','Anglais','Sciences Physiques','SVT','Histoire-Géographie','EPS','Informatique','Philosophie','Économie','Arts plastiques']
const TRIMESTRES = ['T1','T2','T3']

export default function TeacherGrades() {
  const [grades, setGrades] = useState<Grade[]>([])
  const [students, setStudents] = useState<{ id: string; nomComplet: string; classeActuelle: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [trimestre, setTrimestre] = useState('T1')
  const [form, setForm] = useState({ studentId: '', matiere: '', note: '', noteMax: '20', coefficient: '1', trimestre: 'T1', commentaire: '' })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [gr, st] = await Promise.all([gradesAPI.list({ trimestre }), studentsAPI.list()])
      setGrades(gr.data.grades)
      setStudents(st.data.students)
    } catch { toast.error('Erreur') }
    finally { setLoading(false) }
  }, [trimestre])

  useEffect(() => { load() }, [load])

  const handleSave = async () => {
    try {
      await gradesAPI.create({ ...form, note: Number(form.note), noteMax: Number(form.noteMax), coefficient: Number(form.coefficient) })
      toast.success('Note enregistrée'); setShowModal(false); load()
    } catch { toast.error('Erreur') }
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ?')) return
    try { await gradesAPI.delete(id); toast.success('Note supprimée'); load() }
    catch { toast.error('Erreur') }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des notes</h1>
          <p className="text-gray-500 text-sm">{grades.length} notes — {trimestre}</p>
        </div>
        <button onClick={() => { setForm({ studentId:'',matiere:'',note:'',noteMax:'20',coefficient:'1',trimestre,commentaire:'' }); setShowModal(true) }}
          className="btn-primary flex items-center gap-2"><Plus size={16} /> Saisir</button>
      </div>

      <div className="flex gap-2">
        {TRIMESTRES.map(t => (
          <button key={t} onClick={() => setTrimestre(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${trimestre === t ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>{['Élève','Classe','Matière','Note','Coeff.','Mention','Commentaire','Action'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan={8} className="py-10 text-center text-gray-400">Chargement...</td></tr>
              : grades.length === 0 ? <tr><td colSpan={8} className="py-10 text-center text-gray-400">Aucune note pour {trimestre}</td></tr>
              : grades.map(g => {
                const n = (g.note / g.noteMax) * 20
                const mention = n >= 16 ? 'Très Bien' : n >= 14 ? 'Bien' : n >= 12 ? 'Assez Bien' : n >= 10 ? 'Passable' : 'Insuffisant'
                const mClass = n >= 14 ? 'text-green-600' : n >= 10 ? 'text-yellow-600' : 'text-red-600'
                return (
                  <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{g.student.nomComplet}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{g.student.classeActuelle}</td>
                    <td className="px-4 py-3 text-gray-700">{g.matiere}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">{g.note}/{g.noteMax}</td>
                    <td className="px-4 py-3 text-gray-500">×{g.coefficient}</td>
                    <td className={`px-4 py-3 font-medium text-xs ${mClass}`}>{mention}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{g.commentaire || '—'}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(g.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-gray-900">Saisir une note</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Élève *</label>
                <select className="input-field" value={form.studentId} onChange={e => setForm(p => ({ ...p, studentId: e.target.value }))}>
                  <option value="">Choisir un élève...</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.nomComplet} ({s.classeActuelle})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Matière *</label>
                <select className="input-field" value={form.matiere} onChange={e => setForm(p => ({ ...p, matiere: e.target.value }))}>
                  <option value="">Choisir...</option>
                  {MATIERES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Note *</label><input type="number" min="0" max="20" step="0.25" className="input-field" value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Sur</label><input type="number" className="input-field" value={form.noteMax} onChange={e => setForm(p => ({ ...p, noteMax: e.target.value }))} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Coeff.</label><input type="number" min="1" className="input-field" value={form.coefficient} onChange={e => setForm(p => ({ ...p, coefficient: e.target.value }))} /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trimestre</label>
                <select className="input-field" value={form.trimestre} onChange={e => setForm(p => ({ ...p, trimestre: e.target.value }))}>
                  {TRIMESTRES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
                <textarea className="input-field resize-none" rows={2} value={form.commentaire} onChange={e => setForm(p => ({ ...p, commentaire: e.target.value }))} placeholder="Appréciation optionnelle..." />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Annuler</button>
              <button onClick={handleSave} disabled={!form.studentId || !form.matiere || !form.note} className="btn-primary flex-1">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
# 2025-12-02T10:30:00 - feat: saisie des notes par l'enseignant
# 2025-12-02T10:30:00 - feat: saisie des notes par l'enseignant
# 2025-12-02T10:30:00 - feat: saisie des notes par l'enseignant
# 2025-12-02T10:30:00 - feat: saisie des notes par l'enseignant
