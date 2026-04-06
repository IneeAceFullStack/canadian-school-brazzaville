import { useEffect, useState, useCallback } from 'react'
import { Search, Plus, Pencil, Trash2, X, Users } from 'lucide-react'
import { studentsAPI } from '../../services/api'
import toast from 'react-hot-toast'

interface Student {
  id: string; idVie: string; nomComplet: string; classeActuelle: string
  sexe: string; statut: string; dateNaissance: string
  parent?: { nom: string; prenom: string; telephone: string }
}

const CLASSES = ['Maternelle PS','Maternelle MS','Maternelle GS','CP','CE1','CE2','CM1','CM2','6ème','5ème','4ème','3ème','2nde','1ère','Terminale']
const EMPTY: Omit<Student,'id'|'idVie'|'statut'> & Record<string,string> = {
  nomComplet:'', classeActuelle:'', sexe:'M', dateNaissance:'', lieuNaissance:'', nationalite:'Congolaise', anneeScolaire:'2024-2025', statut:'actif'
}

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [classeFilter, setClasseFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Student | null>(null)
  const [form, setForm] = useState<Record<string, string>>(EMPTY)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string,string> = {}
      if (search) params.search = search
      if (classeFilter) params.classe = classeFilter
      const { data } = await studentsAPI.list(params)
      setStudents(data.students)
      setTotal(data.total)
    } catch { toast.error('Erreur de chargement') }
    finally { setLoading(false) }
  }, [search, classeFilter])

  useEffect(() => { load() }, [load])

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowModal(true) }
  const openEdit = (s: Student) => { setEditing(s); setForm({ ...s, dateNaissance: s.dateNaissance?.split('T')[0] || '' }); setShowModal(true) }

  const handleSave = async () => {
    try {
      if (editing) {
        await studentsAPI.update(editing.id, form)
        toast.success('Élève mis à jour')
      } else {
        await studentsAPI.create({ ...form, idVie: `ECO-${Date.now()}` })
        toast.success('Élève ajouté')
      }
      setShowModal(false)
      load()
    } catch { toast.error('Erreur lors de la sauvegarde') }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet élève ?')) return
    try { await studentsAPI.delete(id); toast.success('Élève supprimé'); load() }
    catch { toast.error('Erreur lors de la suppression') }
  }

  const statut = (s: string) => {
    const m: Record<string,string> = { actif: 'badge-green', inactif: 'badge-gray', diplome: 'badge-blue', exclu: 'badge-red' }
    return m[s] || 'badge-gray'
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Élèves</h1>
          <p className="text-gray-500 text-sm">{total} élèves inscrits</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus size={16} /> Ajouter</button>
      </div>

      {/* Filtres */}
      <div className="card flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input-field pl-9 text-sm" placeholder="Rechercher par nom..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field w-auto text-sm" value={classeFilter} onChange={e => setClasseFilter(e.target.value)}>
          <option value="">Toutes les classes</option>
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['ID Vie','Nom complet','Classe','Sexe','Statut','Parent / Contact','Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={7} className="py-12 text-center text-gray-400">Chargement...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={7} className="py-12 text-center text-gray-400">
                  <Users size={32} className="mx-auto mb-2 opacity-40" />Aucun élève trouvé
                </td></tr>
              ) : students.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.idVie}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{s.nomComplet}</td>
                  <td className="px-4 py-3 text-gray-600">{s.classeActuelle}</td>
                  <td className="px-4 py-3 text-gray-600">{s.sexe === 'M' ? 'Masculin' : 'Féminin'}</td>
                  <td className="px-4 py-3"><span className={statut(s.statut)}>{s.statut}</span></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {s.parent ? `${s.parent.prenom} ${s.parent.nom} — ${s.parent.telephone}` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-gray-900">{editing ? 'Modifier' : 'Ajouter'} un élève</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[['nomComplet','Nom complet *'], ['dateNaissance','Date de naissance','date'], ['lieuNaissance','Lieu de naissance'], ['nationalite','Nationalité'], ['classeActuelle','Classe','select'], ['anneeScolaire','Année scolaire']].map(([k, label, type]) => (
                <div key={k}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  {type === 'select' ? (
                    <select className="input-field" value={form[k] || ''} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}>
                      <option value="">Choisir...</option>
                      {CLASSES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  ) : (
                    <input type={type || 'text'} className="input-field" value={form[k] || ''} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} />
                  )}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                <select className="input-field" value={form.sexe || 'M'} onChange={e => setForm(p => ({ ...p, sexe: e.target.value }))}>
                  <option value="M">Masculin</option><option value="F">Féminin</option>
                </select>
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
# 2025-11-21T10:30:00 - feat: CRUD eleves - creation, liste et recherche
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-02-04T11:00:00 - feat: pagination sur la liste des eleves
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
# 2026-04-09T10:00:00 - fix: les dates s'affichaient en format ISO dans les tableaux
# 2026-04-13T11:00:00 - feat: affichage du solde restant du par eleve
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2025-11-21T10:30:00 - feat: CRUD eleves - creation, liste et recherche
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-02-04T11:00:00 - feat: pagination sur la liste des eleves
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
# 2026-04-09T10:00:00 - fix: les dates s'affichaient en format ISO dans les tableaux
# 2026-04-13T11:00:00 - feat: affichage du solde restant du par eleve
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2025-11-21T10:30:00 - feat: CRUD eleves - creation, liste et recherche
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-02-04T11:00:00 - feat: pagination sur la liste des eleves
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
# 2026-04-09T10:00:00 - fix: les dates s'affichaient en format ISO dans les tableaux
# 2026-04-13T11:00:00 - feat: affichage du solde restant du par eleve
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2025-11-21T10:30:00 - feat: CRUD eleves - creation, liste et recherche
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-02-04T11:00:00 - feat: pagination sur la liste des eleves
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
