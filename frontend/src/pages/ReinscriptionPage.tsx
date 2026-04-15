import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Check, CheckCircle, AlertCircle } from 'lucide-react'
import { studentsAPI, inscriptionsAPI } from '../services/api'
import toast from 'react-hot-toast'

const CLASSES_SUIVANTES: Record<string, string> = {
  'CP': 'CE1', 'CE1': 'CE2', 'CE2': 'CM1', 'CM1': 'CM2', 'CM2': '6ème',
  '6ème': '5ème', '5ème': '4ème', '4ème': '3ème', '3ème': '2nde',
  '2nde': '1ère', '1ère': 'Terminale', 'Terminale': 'Sortie',
  'Maternelle PS': 'Maternelle MS', 'Maternelle MS': 'Maternelle GS', 'Maternelle GS': 'CP',
}

const SPECIALITES = ['Mathématiques approfondies', 'Sciences de la Vie et de la Terre', 'Physique-Chimie', 'Numérique et Sciences Informatiques', 'Économie et Gestion', 'Humanités et Littérature']

interface StudentResult {
  id: string; idVie: string; nomComplet: string; classeActuelle: string; anneeScolaire: string; statut: string
}

export default function ReinscriptionPage() {
  const [step, setStep] = useState(0)
  const [search, setSearch] = useState({ nom: '', idVie: '' })
  const [student, setStudent] = useState<StudentResult | null>(null)
  const [searching, setSearching] = useState(false)
  const [loading, setLoading] = useState(false)
  const [specialites, setSpecialites] = useState<string[]>([])
  const [telephone, setTelephone] = useState('')
  const [modePaiement, setModePaiement] = useState('Espèces')
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (!search.nom && !search.idVie) { toast.error('Entrez un nom ou un numéro d\'identification'); return }
    setSearching(true)
    try {
      const { data } = await studentsAPI.search(search)
      if (data.students.length === 0) { toast.error('Aucun élève trouvé'); return }
      setStudent(data.students[0])
      setStep(1)
    } catch {
      toast.error('Erreur de recherche')
    } finally { setSearching(false) }
  }

  const classeSuivante = student ? CLASSES_SUIVANTES[student.classeActuelle] || student.classeActuelle : ''
  const needsSpecialite = ['1ère', 'Terminale'].includes(classeSuivante)
  const toggleSpec = (s: string) => {
    setSpecialites(p => p.includes(s) ? p.filter(x => x !== s) : p.length < 3 ? [...p, s] : p)
  }

  const handleSubmit = async () => {
    if (!student) return
    setLoading(true)
    try {
      await inscriptionsAPI.create({
        type: 'reinscription', anneeScolaire: '2025-2026',
        classeDemanee: classeSuivante, specialites,
        nomEleve: student.nomComplet.split(' ')[0],
        prenomEleve: student.nomComplet.split(' ').slice(1).join(' '),
        dateNaissance: new Date().toISOString(), lieuNaissance: 'Brazzaville',
        sexe: 'M', nationalite: 'Congolaise',
        telephoneContact: telephone, studentId: student.id,
        montantInscription: 80000,
      })
      toast.success('Réinscription enregistrée !')
      setStep(3)
    } catch {
      toast.error('Erreur lors de la réinscription')
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Réinscription</h1>
          <p className="text-gray-500 mt-2">Année scolaire 2025–2026</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8 justify-center">
          {['Recherche', 'Vérification', 'Confirmation', 'Succès'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                ${i < step ? 'bg-primary-600 border-primary-600 text-white'
                : i === step ? 'border-primary-600 text-primary-600 bg-white'
                : 'border-gray-300 text-gray-400 bg-white'}`}>
                {i < step ? <Check size={12} /> : i + 1}
              </div>
              <span className="hidden sm:inline text-xs text-gray-500">{s}</span>
              {i < 3 && <div className={`w-8 h-0.5 ${i < step ? 'bg-primary-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card">
          {/* Step 0: Recherche */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Rechercher l'élève</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet de l'élève</label>
                <input className="input-field" placeholder="Ex: MBEMBA Jean-Paul" value={search.nom} onChange={e => setSearch(p => ({ ...p, nom: e.target.value }))} />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-gray-400 text-xs">ou</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro d'identification (ID Vie)</label>
                <input className="input-field" placeholder="Ex: ECO-2024-001" value={search.idVie} onChange={e => setSearch(p => ({ ...p, idVie: e.target.value }))} />
              </div>
              <button onClick={handleSearch} disabled={searching} className="btn-primary w-full flex items-center justify-center gap-2">
                <Search size={16} /> {searching ? 'Recherche...' : 'Rechercher'}
              </button>
            </div>
          )}

          {/* Step 1: Vérification */}
          {step === 1 && student && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900">Vérification des informations</h2>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-700 font-medium mb-3">
                  <Check size={16} /> Élève trouvé
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {[['Nom complet', student.nomComplet], ['ID Vie', student.idVie], ['Classe actuelle', student.classeActuelle], ['Statut', student.statut]].map(([k, v]) => (
                    <div key={k}><span className="text-gray-500">{k} : </span><span className="font-medium text-gray-900">{v}</span></div>
                  ))}
                </div>
              </div>
              {classeSuivante === 'Sortie' ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="text-yellow-600 shrink-0" size={20} />
                  <div className="text-sm text-yellow-800">
                    <strong>Information :</strong> Cet élève est en Terminale. Si vous souhaitez une réinscription, veuillez contacter l'administration.
                  </div>
                </div>
              ) : (
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Classe prévue pour 2025–2026</div>
                  <div className="text-xl font-bold text-primary-600">{classeSuivante}</div>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="btn-secondary flex-1">Retour</button>
                {classeSuivante !== 'Sortie' && (
                  <button onClick={() => setStep(2)} className="btn-primary flex-1">Confirmer l'élève</button>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Données complémentaires */}
          {step === 2 && student && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Confirmer la réinscription</h2>
              <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <strong>{student.nomComplet}</strong> → Classe de <strong>{classeSuivante}</strong>
              </div>
              {needsSpecialite && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spécialités choisies pour {classeSuivante} (max 3)</label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {SPECIALITES.map(s => (
                      <button key={s} type="button" onClick={() => toggleSpec(s)}
                        className={`text-left px-3 py-2 rounded-lg border text-sm transition-all ${specialites.includes(s) ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 text-gray-700 hover:border-primary-400'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone de contact *</label>
                <input className="input-field" value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="+242 06 ..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode de paiement</label>
                <select className="input-field" value={modePaiement} onChange={e => setModePaiement(e.target.value)}>
                  <option>Espèces</option><option>MTN Mobile Money</option><option>Airtel Money</option><option>Virement bancaire</option>
                </select>
              </div>
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">Frais de réinscription</span>
                <span className="text-xl font-bold text-primary-600">80 000 FCFA</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1">Retour</button>
                <button onClick={handleSubmit} disabled={!telephone || loading} className="btn-primary flex-1">
                  {loading ? 'Enregistrement...' : 'Valider la réinscription'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Succès */}
          {step === 3 && student && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Réinscription confirmée !</h2>
              <p className="text-gray-500 mb-2">
                <strong>{student.nomComplet}</strong> est réinscrit(e) en classe de <strong>{classeSuivante}</strong> pour l'année 2025–2026.
              </p>
              <p className="text-gray-500 mb-8 text-sm">Un reçu de réinscription vous sera remis lors du paiement des frais à l'administration.</p>
              <button onClick={() => navigate('/')} className="btn-primary">Retour à l'accueil</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
# 2026-01-06T09:30:00 - feat: page Reinscription - recherche eleve et confirmation
# 2026-04-15T09:15:00 - style: amelioration des formulaires - validation visuelle
# 2026-01-06T09:30:00 - feat: page Reinscription - recherche eleve et confirmation
# 2026-04-15T09:15:00 - style: amelioration des formulaires - validation visuelle
# 2026-01-06T09:30:00 - feat: page Reinscription - recherche eleve et confirmation
# 2026-04-15T09:15:00 - style: amelioration des formulaires - validation visuelle
# 2026-01-06T09:30:00 - feat: page Reinscription - recherche eleve et confirmation
# 2026-04-15T09:15:00 - style: amelioration des formulaires - validation visuelle
