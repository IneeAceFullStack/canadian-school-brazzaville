import { useEffect, useState, useCallback } from 'react'
import { Check, X, Eye, ClipboardList } from 'lucide-react'
import { inscriptionsAPI } from '../../services/api'
import toast from 'react-hot-toast'

interface Inscription {
  id: string; type: string; nomEleve: string; prenomEleve: string; classeDemanee: string
  anneeScolaire: string; statut: string; telephoneContact: string; emailContact?: string
  specialites: string[]; createdAt: string
  payment?: { montant: number; statut: string }
}

export default function AdminInscriptions() {
  const [items, setItems] = useState<Inscription[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Inscription | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try { const { data } = await inscriptionsAPI.list(); setItems(data.inscriptions) }
    catch { toast.error('Erreur de chargement') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const updateStatus = async (id: string, statut: string) => {
    try {
      await inscriptionsAPI.updateStatus(id, { statut })
      toast.success(`Statut mis à jour : ${statut}`)
      load()
    } catch { toast.error('Erreur') }
  }

  const badge = (s: string) => ({
    en_attente: 'badge-yellow', acceptee: 'badge-green', refusee: 'badge-red', traitee: 'badge-blue'
  }[s] || 'badge-gray')

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inscriptions & Réinscriptions</h1>
          <p className="text-gray-500 text-sm">{items.length} demande(s) reçue(s)</p>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>{['Type','Élève','Classe','Contact','Spécialités','Paiement','Statut','Date','Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan={9} className="py-12 text-center text-gray-400">Chargement...</td></tr>
              : items.length === 0 ? (
                <tr><td colSpan={9} className="py-12 text-center text-gray-400">
                  <ClipboardList size={32} className="mx-auto mb-2 opacity-30" />Aucune demande
                </td></tr>
              ) : items.map(ins => (
                <tr key={ins.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className={ins.type === 'reinscription' ? 'badge-blue' : 'badge-green'}>
                      {ins.type === 'reinscription' ? 'Réinscription' : 'Inscription'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{ins.prenomEleve} {ins.nomEleve}</td>
                  <td className="px-4 py-3 text-gray-600">{ins.classeDemanee}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{ins.telephoneContact}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{ins.specialites.length > 0 ? ins.specialites.join(', ') : '—'}</td>
                  <td className="px-4 py-3">
                    {ins.payment ? (
                      <div className="text-xs">
                        <div className="font-medium text-gray-900">{ins.payment.montant.toLocaleString()} FCFA</div>
                        <span className={badge(ins.payment.statut)}>{ins.payment.statut.replace(/_/g,' ')}</span>
                      </div>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3"><span className={badge(ins.statut)}>{ins.statut.replace(/_/g,' ')}</span></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(ins.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setSelected(ins)} className="p-1.5 rounded hover:bg-blue-50 text-blue-600" title="Détails"><Eye size={14} /></button>
                      {ins.statut === 'en_attente' && (<>
                        <button onClick={() => updateStatus(ins.id, 'acceptee')} className="p-1.5 rounded hover:bg-green-50 text-green-600" title="Accepter"><Check size={14} /></button>
                        <button onClick={() => updateStatus(ins.id, 'refusee')} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Refuser"><X size={14} /></button>
                      </>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-gray-900">Détails de la demande</h2>
              <button onClick={() => setSelected(null)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[
                ['Type', selected.type === 'reinscription' ? 'Réinscription' : 'Nouvelle inscription'],
                ['Élève', `${selected.prenomEleve} ${selected.nomEleve}`],
                ['Classe demandée', selected.classeDemanee],
                ['Année scolaire', selected.anneeScolaire],
                ['Téléphone', selected.telephoneContact],
                ['Email', selected.emailContact || '—'],
                ['Spécialités', selected.specialites.join(', ') || 'Aucune'],
                ['Statut', selected.statut],
                ['Date de dépôt', new Date(selected.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-gray-900 text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="p-6 pt-0 flex gap-3">
              {selected.statut === 'en_attente' && (
                <button onClick={() => { updateStatus(selected.id, 'acceptee'); setSelected(null) }} className="btn-primary flex-1 flex items-center justify-center gap-2"><Check size={15} /> Accepter</button>
              )}
              <button onClick={() => setSelected(null)} className="btn-secondary flex-1">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
# 2025-11-26T10:00:00 - feat: page admin inscriptions avec filtres et statuts
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
# 2025-11-26T10:00:00 - feat: page admin inscriptions avec filtres et statuts
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
# 2025-11-26T10:00:00 - feat: page admin inscriptions avec filtres et statuts
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
# 2025-11-26T10:00:00 - feat: page admin inscriptions avec filtres et statuts
