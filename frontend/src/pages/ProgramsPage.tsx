import { Link } from 'react-router-dom'
import { BookOpen, Clock, Users, ChevronRight } from 'lucide-react'

const programmes = [
  {
    cycle: 'Maternelle', age: '3 – 5 ans', color: 'border-pink-300 bg-pink-50',
    iconColor: 'text-pink-500 bg-pink-100',
    classes: ['Petite Section (PS)', 'Moyenne Section (MS)', 'Grande Section (GS)'],
    matieres: ['Langage et communication', 'Éveil musical', 'Arts plastiques', 'Motricité', 'Découverte du monde', 'Anglais débutant'],
    horaires: '7h30 – 15h00', effectif: '20 élèves max/classe',
    desc: "Accueil bienveillant, éveil par le jeu et développement global de l'enfant dans un environnement sécurisant.",
  },
  {
    cycle: 'Primaire', age: '6 – 11 ans', color: 'border-blue-300 bg-blue-50',
    iconColor: 'text-blue-500 bg-blue-100',
    classes: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
    matieres: ['Mathématiques', 'Français', 'Anglais', 'Sciences', 'Histoire-Géographie', 'EPS', 'Informatique', 'Arts'],
    horaires: '7h30 – 16h00', effectif: '25 élèves max/classe',
    desc: 'Acquisition des fondamentaux académiques et développement du bilinguisme en français et en anglais.',
  },
  {
    cycle: 'Collège', age: '12 – 15 ans', color: 'border-green-300 bg-green-50',
    iconColor: 'text-green-500 bg-green-100',
    classes: ['6ème', '5ème', '4ème', '3ème'],
    matieres: ['Mathématiques', 'Français', 'Anglais', 'Espagnol', 'Sciences Physiques', 'SVT', 'Histoire-Géo', 'Éducation Civique', 'Technologie', 'EPS'],
    horaires: '7h30 – 17h00', effectif: '28 élèves max/classe',
    desc: "Approfondissement des savoirs, développement de l'autonomie et préparation au lycée.",
  },
  {
    cycle: 'Lycée', age: '16 – 18 ans', color: 'border-yellow-300 bg-yellow-50',
    iconColor: 'text-yellow-600 bg-yellow-100',
    classes: ['2nde', '1ère (S, L, STMG)', 'Terminale (S, L, STMG)'],
    matieres: ['Mathématiques', 'Physique-Chimie', 'SVT', 'Français/Philo', 'Histoire-Géo', 'Anglais', 'Espagnol', 'Économie', 'EPS'],
    specialites: ['Mathématiques approfondies', 'Sciences de la Vie et de la Terre', 'Physique-Chimie', 'Numérique et Sciences Informatiques', 'Économie', 'Humanités Littéraires'],
    horaires: '7h30 – 17h30', effectif: '30 élèves max/classe',
    desc: 'Préparation intensive au Baccalauréat avec orientation vers les grandes universités africaines et internationales.',
  },
]

export default function ProgramsPage() {
  return (
    <div>
      <section className="page-hero text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Nos Programmes</h1>
        <p className="text-red-200 text-lg max-w-2xl mx-auto">Un parcours d'excellence de la maternelle au baccalauréat</p>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          {programmes.map(p => (
            <div key={p.cycle} className={`border-2 rounded-2xl p-8 ${p.color} hover:shadow-lg transition-all`}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${p.iconColor}`}>
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{p.cycle}</h2>
                    <span className="text-gray-500 text-sm">{p.age}</span>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1"><Clock size={14} /> {p.horaires}</div>
                  <div className="flex items-center gap-1"><Users size={14} /> {p.effectif}</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{p.desc}</p>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Classes</h3>
                  <ul className="space-y-1">
                    {p.classes.map(c => (
                      <li key={c} className="flex items-center gap-2 text-sm text-gray-700">
                        <ChevronRight size={14} className="text-primary-500" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Matières enseignées</h3>
                  <div className="flex flex-wrap gap-2">
                    {p.matieres.map(m => (
                      <span key={m} className="bg-white/70 border border-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                  {p.specialites && (
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-800 mb-2 text-sm">Spécialités (1ère & Terminale)</h3>
                      <div className="flex flex-wrap gap-2">
                        {p.specialites.map(s => (
                          <span key={s} className="bg-primary-100 text-primary-700 text-xs px-2.5 py-1 rounded-full font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 bg-primary-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à rejoindre l'école ?</h2>
        <p className="text-red-200 mb-6">Inscrivez votre enfant et commencez son parcours d'excellence dès maintenant.</p>
        <Link to="/inscription" className="bg-white text-primary-700 font-bold py-3 px-8 rounded-lg hover:bg-red-50 transition-all">
          Formulaire d'inscription
        </Link>
      </section>
    </div>
  )
}
