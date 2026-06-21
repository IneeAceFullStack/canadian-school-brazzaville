import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Megaphone } from 'lucide-react'
import { announcementsAPI } from '../../services/api'
import toast from 'react-hot-toast'

interface Announcement {
  id: string; titre: string; contenu: string; destinataire: string
  priorite: string; published: boolean; createdAt: string
  author: { name: string }
}

const EMPTY = { titre: '', contenu: '', destinataire: 'Tous', priorite: 'normale', published: true }

export default function AdminAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Announcement | null>(null)
  const [form, setForm] = useState<Record<string, unknown>>(EMPTY)

  const load = useCallback(async () => {
    setLoading(true)
    try { const { data } = await announcementsAPI.list(); setItems(data.announcements) }
    catch { toast.error('Erreur') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowModal(true) }
  const openEdit = (a: Announcement) => { setEditing(a); setForm({ titre: a.titre, contenu: a.contenu, destinataire: a.destinataire, priorite: a.priorite, published: a.published }); setShowModal(true) }

  const handleSave = async () => {
    try {
      if (editing) { await announcementsAPI.update(editing.id, form); toast.success('Annonce mise à jour') }
      else { await announcementsAPI.create(form); toast.success('Annonce publiée') }
      setShowModal(false); load()
    } catch { toast.error('Erreur') }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette annonce ?')) return
    try { await announcementsAPI.delete(id); toast.success('Annonce supprimée'); load() }
    catch { toast.error('Erreur') }
  }

  const prioriteClass = (p: string) => ({ haute: 'badge-red', normale: 'badge-blue', basse: 'badge-gray' }[p] || 'badge-gray')

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Annonces</h1>
          <p className="text-gray-500 text-sm">{items.length} annonce(s)</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus size={16} /> Nouvelle annonce</button>
      </div>

      <div className="space-y-3">
        {loading ? <div className="text-center py-12 text-gray-400">Chargement...</div>
        : items.length === 0 ? (
          <div className="card text-center py-12 text-gray-400">
            <Megaphone size={40} className="mx-auto mb-2 opacity-30" />Aucune annonce
          </div>
        ) : items.map(a => (
          <div key={a.id} className="card hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900">{a.titre}</h3>
                  <span className={prioriteClass(a.priorite)}>{a.priorite}</span>
                  {!a.published && <span className="badge-gray">Brouillon</span>}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{a.contenu}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>👥 {a.destinataire}</span>
                  <span>✍️ {a.author.name}</span>
                  <span>📅 {new Date(a.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(a)} className="p-1.5 rounded hover:bg-blue-50 text-blue-600"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(a.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-gray-900">{editing ? 'Modifier' : 'Nouvelle'} annonce</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                <input className="input-field" value={String(form.titre || '')} onChange={e => setForm(p => ({ ...p, titre: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenu *</label>
                <textarea className="input-field resize-none" rows={5} value={String(form.contenu || '')} onChange={e => setForm(p => ({ ...p, contenu: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destinataires</label>
                  <select className="input-field" value={String(form.destinataire || 'Tous')} onChange={e => setForm(p => ({ ...p, destinataire: e.target.value }))}>
                    <option>Tous</option><option>Primaire</option><option>Collège</option><option>Lycée</option><option>Enseignants</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select className="input-field" value={String(form.priorite || 'normale')} onChange={e => setForm(p => ({ ...p, priorite: e.target.value }))}>
                    <option value="basse">Basse</option><option value="normale">Normale</option><option value="haute">Haute</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" checked={Boolean(form.published)} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} />
                <span className="text-sm text-gray-700">Publier immédiatement</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Annuler</button>
              <button onClick={handleSave} disabled={!form.titre || !form.contenu} className="btn-primary flex-1">
                {editing ? 'Mettre à jour' : 'Publier'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
