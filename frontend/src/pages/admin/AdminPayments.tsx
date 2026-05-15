import { useEffect, useState, useCallback } from 'react'
import { Check, X, FileText, CreditCard, RefreshCw } from 'lucide-react'
import { paymentsAPI } from '../../services/api'
import toast from 'react-hot-toast'
import jsPDF from 'jspdf'
import logoUrl from '../../assets/logo.png'

interface Payment {
 id: string; montant: number; type: string; statut: string
 modePaiement?: string; reference?: string; description?: string
 createdAt: string; confirmedAt?: string
 student?: { nomComplet: string; classeActuelle: string }
}

function generateReceipt(p: Payment) {
 const doc = new jsPDF()
 const pageW = doc.internal.pageSize.getWidth()
 const pageH = doc.internal.pageSize.getHeight()

 // ── Filigrane logo ──
 doc.saveGraphicsState()
 doc.setGState(new (doc as any).GState({ opacity: 0.25 }))
 const logoW = 250
 const logoH = 250
 doc.addImage(logoUrl, 'PNG', (pageW - logoW) / 2, (pageH - logoH) / 2, logoW, logoH)
 doc.restoreGraphicsState()

 // ── En-tête rouge ──
 doc.setFillColor(204, 0, 0)
 doc.rect(0, 0, pageW, 40, 'F')

 doc.setTextColor(255, 255, 255)
 doc.setFontSize(18)
 doc.setFont('helvetica', 'bold')
 doc.text('ÉCOLE CANADIENNE CANADIAN SCHOOL', pageW / 2, 18, { align: 'center' })
 doc.setFontSize(11)
 doc.setFont('helvetica', 'normal')
 doc.text('Brazzaville, République du Congo', pageW / 2, 28, { align: 'center' })
 doc.text('contact@ecole-canadienne.cg | +242 06 000 0000', pageW / 2, 35, { align: 'center' })

 doc.setTextColor(204, 0, 0)
 doc.setFontSize(16)
 doc.setFont('helvetica', 'bold')
 doc.text('REÇU DE PAIEMENT', pageW / 2, 58, { align: 'center' })

 doc.setDrawColor(204, 0, 0)
 doc.setLineWidth(0.5)
 doc.line(20, 62, pageW - 20, 62)

 doc.setTextColor(60, 60, 60)
 doc.setFontSize(10)
 doc.setFont('helvetica', 'normal')

 const rows = [
   ['N° Référence', p.reference || p.id.slice(0, 12).toUpperCase()],
   ['Date', new Date(p.confirmedAt || p.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })],
   ['Élève', p.student?.nomComplet || 'N/A'],
   ['Classe', p.student?.classeActuelle || 'N/A'],
   ['Type de paiement', p.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())],
   ['Mode de paiement', p.modePaiement || 'Espèces'],
   ['Description', p.description || '—'],
 ]

 let y = 75
 rows.forEach(([label, val]) => {
   doc.setFont('helvetica', 'bold')
   doc.text(`${label} :`, 22, y)
   doc.setFont('helvetica', 'normal')
   doc.text(String(val), 80, y)
   y += 10
 })

 doc.setFillColor(255, 245, 245)
 doc.roundedRect(20, y + 2, pageW - 40, 20, 3, 3, 'F')
 doc.setFont('helvetica', 'bold')
 doc.setFontSize(13)
 doc.setTextColor(204, 0, 0)
 doc.text('MONTANT PAYÉ', 30, y + 14)
 doc.setFontSize(14)
 doc.text(`${p.montant} FCFA`, pageW - 30, y + 14, { align: 'right' })

 doc.setFillColor(0, 160, 0)
 doc.roundedRect(pageW / 2 - 30, y + 30, 60, 12, 2, 2, 'F')
 doc.setTextColor(255, 255, 255)
 doc.setFontSize(10)
 doc.text('PAYE', pageW / 2, y + 38, { align: 'center' })

 doc.setTextColor(150, 150, 150)
 doc.setFontSize(8)
 doc.setFont('helvetica', 'italic')
 doc.text('Ce reçu est généré automatiquement par le système de gestion de l\'École Canadienne.', pageW / 2, 270, { align: 'center' })
 doc.text('Pour toute question : contact@ecole-canadienne.cg', pageW / 2, 276, { align: 'center' })

 doc.save(`recu-${p.reference || p.id.slice(0, 8)}.pdf`)
}

export default function AdminPayments() {
 const [payments, setPayments] = useState<Payment[]>([])
 const [loading, setLoading] = useState(true)
 const [filter, setFilter] = useState('')

 const load = useCallback(async () => {
   setLoading(true)
   try {
     const params: Record<string,string> = {}
     if (filter) params.statut = filter
     const { data } = await paymentsAPI.list(params)
     setPayments(data.payments)
   } catch { toast.error('Erreur de chargement') }
   finally { setLoading(false) }
 }, [filter])

 useEffect(() => { load() }, [load])

 const handleConfirm = async (id: string) => {
   const modePaiement = prompt('Mode de paiement (Espèces, MTN Mobile Money, Airtel Money...) :', 'Espèces')
   if (!modePaiement) return
   try { await paymentsAPI.confirm(id, { modePaiement }); toast.success('Paiement confirmé'); load() }
   catch { toast.error('Erreur') }
 }

 const handleRefuse = async (id: string) => {
   if (!confirm('Refuser ce paiement ?')) return
   try { await paymentsAPI.refuse(id); toast.success('Paiement refusé'); load() }
   catch { toast.error('Erreur') }
 }

 const badge = (s: string) => ({
   confirme: 'badge-green', en_attente: 'badge-yellow', refuse: 'badge-red', rembourse: 'badge-blue'
 }[s] || 'badge-gray')

 return (
   <div className="space-y-5">
     <div className="flex items-center justify-between">
       <div>
         <h1 className="text-2xl font-bold text-gray-900">Paiements</h1>
         <p className="text-gray-500 text-sm">{payments.length} paiements</p>
       </div>
       <button onClick={load} className="btn-secondary flex items-center gap-2 text-sm"><RefreshCw size={14} /> Actualiser</button>
     </div>

     <div className="card p-4 flex gap-3">
       <select className="input-field w-auto text-sm" value={filter} onChange={e => setFilter(e.target.value)}>
         <option value="">Tous les statuts</option>
         <option value="en_attente">En attente</option>
         <option value="confirme">Confirmés</option>
         <option value="refuse">Refusés</option>
       </select>
     </div>

     <div className="card p-0 overflow-hidden">
       <div className="overflow-x-auto">
         <table className="w-full text-sm">
           <thead className="bg-gray-50 border-b">
             <tr>
               {['Référence','Élève','Classe','Type','Montant','Mode','Statut','Date','Actions'].map(h => (
                 <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
               ))}
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
             {loading ? (
               <tr><td colSpan={9} className="py-12 text-center text-gray-400">Chargement...</td></tr>
             ) : payments.length === 0 ? (
               <tr><td colSpan={9} className="py-12 text-center text-gray-400">
                 <CreditCard size={32} className="mx-auto mb-2 opacity-30" />Aucun paiement
               </td></tr>
             ) : payments.map(p => (
               <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                 <td className="px-4 py-3 font-mono text-xs text-gray-500">{(p.reference || p.id).slice(0, 10).toUpperCase()}</td>
                 <td className="px-4 py-3 font-medium text-gray-900">{p.student?.nomComplet || '—'}</td>
                 <td className="px-4 py-3 text-gray-600 text-xs">{p.student?.classeActuelle || '—'}</td>
                 <td className="px-4 py-3 text-gray-600 text-xs capitalize">{p.type.replace(/_/g,' ')}</td>
                 <td className="px-4 py-3 font-bold text-gray-900">{p.montant.toLocaleString()} <span className="text-xs font-normal text-gray-400">FCFA</span></td>
                 <td className="px-4 py-3 text-gray-500 text-xs">{p.modePaiement || '—'}</td>
                 <td className="px-4 py-3"><span className={badge(p.statut)}>{p.statut.replace(/_/g,' ')}</span></td>
                 <td className="px-4 py-3 text-gray-500 text-xs">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
                 <td className="px-4 py-3">
                   <div className="flex gap-1">
                     {p.statut === 'en_attente' && (<>
                       <button onClick={() => handleConfirm(p.id)} title="Confirmer" className="p-1.5 rounded hover:bg-green-50 text-green-600"><Check size={14} /></button>
                       <button onClick={() => handleRefuse(p.id)} title="Refuser" className="p-1.5 rounded hover:bg-red-50 text-red-500"><X size={14} /></button>
                     </>)}
                     {p.statut === 'confirme' && (
                       <button onClick={() => generateReceipt(p)} title="Télécharger reçu PDF" className="p-1.5 rounded hover:bg-blue-50 text-blue-600"><FileText size={14} /></button>
                     )}
                   </div>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   </div>
 )
}# 2025-11-28T14:30:00 - feat: generation de recu PDF avec jsPDF
# 2025-11-29T10:00:00 - fix: le PDF generait une erreur si la reference etait vide
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-02-05T10:00:00 - feat: recherche et filtres sur les paiements
# 2026-02-10T09:00:00 - fix: le formulaire de paiement ne se resetait pas apres soumission
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
# 2026-04-14T10:00:00 - fix: le filtre par statut de paiement ne fonctionnait pas
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
# 2026-06-07T10:15:00 - fix: correction de l'affichage des montants en FCFA
# 2025-11-28T14:30:00 - feat: generation de recu PDF avec jsPDF
# 2025-11-29T10:00:00 - fix: le PDF generait une erreur si la reference etait vide
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-02-05T10:00:00 - feat: recherche et filtres sur les paiements
# 2026-02-10T09:00:00 - fix: le formulaire de paiement ne se resetait pas apres soumission
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
# 2026-04-14T10:00:00 - fix: le filtre par statut de paiement ne fonctionnait pas
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
# 2026-06-07T10:15:00 - fix: correction de l'affichage des montants en FCFA
# 2025-11-28T14:30:00 - feat: generation de recu PDF avec jsPDF
# 2025-11-29T10:00:00 - fix: le PDF generait une erreur si la reference etait vide
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-02-05T10:00:00 - feat: recherche et filtres sur les paiements
# 2026-02-10T09:00:00 - fix: le formulaire de paiement ne se resetait pas apres soumission
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
# 2026-04-14T10:00:00 - fix: le filtre par statut de paiement ne fonctionnait pas
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
# 2026-06-07T10:15:00 - fix: correction de l'affichage des montants en FCFA
# 2025-11-28T14:30:00 - feat: generation de recu PDF avec jsPDF
# 2025-11-29T10:00:00 - fix: le PDF generait une erreur si la reference etait vide
# 2026-02-03T09:30:00 - style: uniformisation des badges de statut dans l'interface admin
# 2026-02-05T10:00:00 - feat: recherche et filtres sur les paiements
# 2026-02-10T09:00:00 - fix: le formulaire de paiement ne se resetait pas apres soumission
# 2026-04-06T10:30:00 - style: responsive mobile - corrections sur les pages admin
# 2026-04-14T10:00:00 - fix: le filtre par statut de paiement ne fonctionnait pas
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
