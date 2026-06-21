import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, UserCheck } from 'lucide-react'
import { teachersAPI } from '../../services/api'
import toast from 'react-hot-toast'

interface Teacher {
  id: string; nom: string; prenom: string; email: string; telephone?: string
  matieres: string[]; classes: string[]; experience?: string; statut: string
}

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Teacher | null>(null)
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', matieres: '', classes: '', experience: '', statut: 'actif' })

  const load = useCallback(async () => {
    setLoading(true)
    try { const { data } = await teachersAPI.list(); setTeachers(data.teachers) }
    catch { toast.error('Erreur de chargement') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const openAdd = () => { setEditing(null); setForm({ nom:'',prenom:'',email:'',telephone:'',matieres:'',classes:'',experience:'',statut:'actif' }); setShowModal(true) }
  const openEdit = (t: Teacher) => {
    setEditing(t)
    setForm({ nom:t.nom, prenom:t.prenom, email:t.email, telephone:t.telephone||'', matieres:t.matieres.join(', '), classes:t.classes.join(', '), experience:t.experience||'', statut:t.statut })
    setShowModal(true)
  }

  const handleSave = async () => {
    const payload = { ...form, matieres: form.matieres.split(',').map(s => s.trim()).filter(Boolean), classes: form.classes.split(',').map(s => s.trim()).filter(Boolean) }
    try {
      if (editing) { await teachersAPI.update(editing.id, payload); toast.success('Enseignant mis à jour') }
      else { await teachersAPI.create(payload); toast.success('Enseignant ajouté') }
      setShowModal(false); load()
    } catch { toast.error('Erreur lors de la sauvegarde') }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet enseignant ?')) return
    try { await teachersAPI.delete(id); toast.success('Supprimé'); load() }
    catch { toast.error('Erreur') }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enseignants</h1>
          <p className="text-gray-500 text-sm">{teachers.length} enseignants</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus size={16} /> Ajouter</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 text-center py-12 text-gray-400">Chargement...</div>
        ) : teachers.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-gray-400">
            <UserCheck size={40} className="mx-auto mb-2 opacity-30" />Aucun enseignant enregistré
          </div>
        ) : teachers.map(t => (
          <div key={t.id} className="card hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold">
                  {t.prenom[0]}{t.nom[0]}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.prenom} {t.nom}</div>
                  <div className={`mt-0.5 ${t.statut === 'actif' ? 'badge-green' : 'badge-gray'}`}>{t.statut}</div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil size={13} /></button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-gray-500">
              <div>📧 {t.email}</div>
              {t.telephone && <div>📞 {t.telephone}</div>}
              {t.experience && <div>⏱ {t.experience} d'expérience</div>}
              <div className="flex flex-wrap gap-1 mt-2">
                {t.matieres.map(m => <span key={m} className="badge-blue text-xs">{m}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-gray-900">{editing ? 'Modifier' : 'Ajouter'} un enseignant</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[['nom','Nom *'], ['prenom','Prénom *'], ['email','Email *'], ['telephone','Téléphone'], ['experience','Expérience (ex: 10 ans)']].map(([k, label]) => (
                <div key={k}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input className="input-field" value={form[k as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Matières (séparées par virgule)</label>
                <input className="input-field" placeholder="Mathématiques, Physique-Chimie" value={form.matieres} onChange={e => setForm(p => ({ ...p, matieres: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classes enseignées (séparées par virgule)</label>
                <input className="input-field" placeholder="Terminale S, 1ère S, 3ème" value={form.classes} onChange={e => setForm(p => ({ ...p, classes: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Annuler</button>
              <button onClick={handleSave} className="btn-primary flex-1">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
