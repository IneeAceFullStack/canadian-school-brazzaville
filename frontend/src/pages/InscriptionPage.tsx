import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronRight, User, FileText, CreditCard, CheckCircle } from 'lucide-react'
import { inscriptionsAPI } from '../services/api'
import toast from 'react-hot-toast'

const CLASSES = ['Maternelle PS', 'Maternelle MS', 'Maternelle GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale']
const SPECIALITES = ['Mathématiques approfondies', 'Sciences de la Vie et de la Terre', 'Physique-Chimie', 'Numérique et Sciences Informatiques', 'Économie et Gestion', 'Humanités et Littérature']
const FRAIS: Record<string, number> = {
  'Maternelle PS': 120000, 'Maternelle MS': 120000, 'Maternelle GS': 120000,
  CP: 150000, CE1: 150000, CE2: 150000, CM1: 150000, CM2: 150000,
  '6ème': 180000, '5ème': 180000, '4ème': 180000, '3ème': 180000,
  '2nde': 220000, '1ère': 220000, 'Terminale': 220000,
}

const steps = [
  { label: "Informations élève", icon: User },
  { label: "Informations parents", icon: FileText },
  { label: "Classe & Paiement", icon: CreditCard },
  { label: "Confirmation", icon: CheckCircle },
]

interface FormData {
  nomEleve: string; prenomEleve: string; dateNaissance: string; lieuNaissance: string
  sexe: string; nationalite: string; nomPere: string; prenomPere: string; professionPere: string
  nomMere: string; prenomMere: string; professionMere: string; telephoneContact: string
  emailContact: string; adresse: string; ancienneEcole: string; classeDemanee: string
  specialites: string[]; modePaiement: string
}

export default function InscriptionPage() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form, setForm] = useState<FormData>({
    nomEleve: '', prenomEleve: '', dateNaissance: '', lieuNaissance: '', sexe: '', nationalite: 'Congolaise',
    nomPere: '', prenomPere: '', professionPere: '', nomMere: '', prenomMere: '', professionMere: '',
    telephoneContact: '', emailContact: '', adresse: '', ancienneEcole: '', classeDemanee: '',
    specialites: [], modePaiement: 'Espèces',
  })

  const set = (k: keyof FormData, v: string) => setForm(p => ({ ...p, [k]: v }))
  const needsSpecialite = ['1ère', 'Terminale'].includes(form.classeDemanee)
  const montant = FRAIS[form.classeDemanee] || 0
  const toggleSpec = (s: string) => {
    setForm(p => ({
      ...p,
      specialites: p.specialites.includes(s)
        ? p.specialites.filter(x => x !== s)
        : p.specialites.length < 3 ? [...p.specialites, s] : p.specialites
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await inscriptionsAPI.create({ ...form, type: 'inscription', anneeScolaire: '2025-2026', montantInscription: montant })
      toast.success('Inscription envoyée avec succès !')
      setStep(3)
    } catch {
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle Inscription</h1>
          <p className="text-gray-500 mt-2">Année scolaire 2025–2026</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-9 h-9 rounded-full border-2 font-bold text-sm shrink-0 transition-all
                ${i < step ? 'bg-primary-600 border-primary-600 text-white'
                : i === step ? 'border-primary-600 text-primary-600 bg-white'
                : 'border-gray-300 text-gray-400 bg-white'}`}>
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <div className="hidden sm:block ml-2 text-xs font-medium text-gray-600 mr-2">{s.label}</div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-primary-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card">
          {/* Step 0: Élève */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Informations de l'élève</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label><input className="input-field" value={form.nomEleve} onChange={e => set('nomEleve', e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s) *</label><input className="input-field" value={form.prenomEleve} onChange={e => set('prenomEleve', e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance *</label><input type="date" className="input-field" value={form.dateNaissance} onChange={e => set('dateNaissance', e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance *</label><input className="input-field" value={form.lieuNaissance} onChange={e => set('lieuNaissance', e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Sexe *</label>
                  <select className="input-field" value={form.sexe} onChange={e => set('sexe', e.target.value)}>
                    <option value="">Choisir...</option><option value="M">Masculin</option><option value="F">Féminin</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label><input className="input-field" value={form.nationalite} onChange={e => set('nationalite', e.target.value)} /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Ancienne école (si applicable)</label><input className="input-field" value={form.ancienneEcole} onChange={e => set('ancienneEcole', e.target.value)} /></div>
              <button onClick={() => setStep(1)} disabled={!form.nomEleve || !form.prenomEleve || !form.dateNaissance || !form.sexe} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
                Suivant <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Step 1: Parents */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Informations des parents</h2>
              <h3 className="font-medium text-gray-700 text-sm">Père</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom</label><input className="input-field" value={form.nomPere} onChange={e => set('nomPere', e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label><input className="input-field" value={form.prenomPere} onChange={e => set('prenomPere', e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Profession</label><input className="input-field" value={form.professionPere} onChange={e => set('professionPere', e.target.value)} /></div>
              </div>
              <h3 className="font-medium text-gray-700 text-sm mt-2">Mère</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom</label><input className="input-field" value={form.nomMere} onChange={e => set('nomMere', e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label><input className="input-field" value={form.prenomMere} onChange={e => set('prenomMere', e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Profession</label><input className="input-field" value={form.professionMere} onChange={e => set('professionMere', e.target.value)} /></div>
              </div>
              <h3 className="font-medium text-gray-700 text-sm mt-2">Contact principal *</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label><input className="input-field" value={form.telephoneContact} onChange={e => set('telephoneContact', e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="input-field" value={form.emailContact} onChange={e => set('emailContact', e.target.value)} /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label><input className="input-field" value={form.adresse} onChange={e => set('adresse', e.target.value)} /></div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="btn-secondary flex-1">Retour</button>
                <button onClick={() => setStep(2)} disabled={!form.telephoneContact} className="btn-primary flex-1 flex items-center justify-center gap-2">Suivant <ChevronRight size={16} /></button>
              </div>
            </div>
          )}

          {/* Step 2: Classe & Paiement */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Classe & Paiement</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classe demandée *</label>
                <select className="input-field" value={form.classeDemanee} onChange={e => { set('classeDemanee', e.target.value); setForm(p => ({ ...p, specialites: [] })) }}>
                  <option value="">Choisir une classe...</option>
                  {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {needsSpecialite && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spécialités (max 3)</label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {SPECIALITES.map(s => (
                      <button key={s} type="button" onClick={() => toggleSpec(s)}
                        className={`text-left px-3 py-2 rounded-lg border text-sm transition-all ${form.specialites.includes(s) ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 text-gray-700 hover:border-primary-400'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {form.classeDemanee && (
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                  <div className="text-sm font-medium text-gray-700">Frais d'inscription pour {form.classeDemanee}</div>
                  <div className="text-2xl font-bold text-primary-600">{montant.toLocaleString()} FCFA</div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode de paiement</label>
                <select className="input-field" value={form.modePaiement} onChange={e => set('modePaiement', e.target.value)}>
                  <option>Espèces</option><option>MTN Mobile Money</option><option>Airtel Money</option><option>Virement bancaire</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1">Retour</button>
                <button onClick={handleSubmit} disabled={!form.classeDemanee || loading} className="btn-primary flex-1">
                  {loading ? 'Envoi...' : 'Soumettre la demande'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Demande envoyée !</h2>
              <p className="text-gray-500 mb-2">
                La demande d'inscription de <strong>{form.prenomEleve} {form.nomEleve}</strong> pour la classe de <strong>{form.classeDemanee}</strong> a bien été enregistrée.
              </p>
              <p className="text-gray-500 mb-8 text-sm">
                Notre équipe vous contactera sous 48h au <strong>{form.telephoneContact}</strong> pour confirmer votre inscription et les modalités de paiement.
              </p>
              <button onClick={() => navigate('/')} className="btn-primary">Retour à l'accueil</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
# 2026-01-05T10:00:00 - feat: page Inscription publique - formulaire 4 etapes
# 2026-01-09T09:45:00 - fix: le formulaire d'inscription ne validait pas le champ email
# 2026-04-15T09:15:00 - style: amelioration des formulaires - validation visuelle
# 2026-01-05T10:00:00 - feat: page Inscription publique - formulaire 4 etapes
# 2026-01-09T09:45:00 - fix: le formulaire d'inscription ne validait pas le champ email
# 2026-04-15T09:15:00 - style: amelioration des formulaires - validation visuelle
# 2026-01-05T10:00:00 - feat: page Inscription publique - formulaire 4 etapes
# 2026-01-09T09:45:00 - fix: le formulaire d'inscription ne validait pas le champ email
# 2026-04-15T09:15:00 - style: amelioration des formulaires - validation visuelle
# 2026-01-05T10:00:00 - feat: page Inscription publique - formulaire 4 etapes
# 2026-01-09T09:45:00 - fix: le formulaire d'inscription ne validait pas le champ email
