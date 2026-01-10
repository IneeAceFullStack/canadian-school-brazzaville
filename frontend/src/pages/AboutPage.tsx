import { Award, Target, Heart, Globe, Users, BookOpen, X, Mail, Phone, GraduationCap } from 'lucide-react'
import { useState } from 'react'

const values = [
  { icon: Award, titre: 'Excellence', desc: 'Nous visons les plus hauts standards académiques pour chaque élève.' },
  { icon: Heart, titre: 'Bienveillance', desc: 'Un environnement sécurisant et chaleureux où chaque enfant s\'épanouit.' },
  { icon: Globe, titre: 'Ouverture', desc: 'Enseignement bilingue et culturel pour des citoyens du monde.' },
  { icon: Target, titre: 'Ambition', desc: 'Préparer nos élèves aux défis du monde de demain.' },
]

const equipe = [
  {
    nom: 'Dr. MOUKISSA André',
    poste: 'Directeur Général',
    exp: '25 ans d\'enseignement',
    bio: 'Docteur en Sciences de l\'Éducation, Dr. MOUKISSA André a fondé l\'École Canadienne avec la vision d\'offrir un enseignement d\'excellence aux familles congolaises. Il supervise la stratégie globale de l\'établissement.',
    email: 'a.moukissa@ecole-canadienne.cg',
    tel: '+242 06 000 0001',
    diplome: 'Doctorat en Sciences de l\'Éducation',
  },
  {
    nom: 'Mme BOUANGA Claire',
    poste: 'Directrice Pédagogique',
    exp: 'Ancienne inspectrice',
    bio: 'Ancienne inspectrice de l\'Éducation Nationale, Mme BOUANGA Claire apporte une expertise pédagogique reconnue. Elle coordonne les programmes scolaires et veille à la qualité de l\'enseignement.',
    email: 'c.bouanga@ecole-canadienne.cg',
    tel: '+242 06 000 0002',
    diplome: 'Master en Sciences de l\'Éducation',
  },
  {
    nom: 'M. NKOUNKOU Pascal',
    poste: 'Directeur du Lycée',
    exp: 'Doctorat en Mathématiques',
    bio: 'Titulaire d\'un Doctorat en Mathématiques, M. NKOUNKOU Pascal dirige le lycée avec rigueur et passion. Il est également enseignant de Mathématiques et prépare les élèves aux grandes écoles.',
    email: 'p.nkounkou@ecole-canadienne.cg',
    tel: '+242 06 000 0003',
    diplome: 'Doctorat en Mathématiques',
  },
  {
    nom: 'Mme LOUZOLO Yvette',
    poste: 'Responsable Primaire',
    exp: '18 ans d\'expérience',
    bio: 'Forte de 18 ans d\'expérience dans l\'enseignement primaire, Mme LOUZOLO Yvette veille au bon développement des plus jeunes élèves. Elle coordonne les équipes pédagogiques du cycle primaire.',
    email: 'y.louzolo@ecole-canadienne.cg',
    tel: '+242 06 000 0004',
    diplome: 'Licence en Sciences de l\'Éducation',
  },
]

export default function AboutPage() {
  const [selected, setSelected] = useState<typeof equipe[0] | null>(null)

  return (
    <div>
      <section className="page-hero text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">À propos de l'École</h1>
        <p className="text-red-200 text-lg max-w-2xl mx-auto">20 ans d'excellence éducative au service des familles congolaises</p>
      </section>

      {/* Histoire */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-primary-600 font-semibold text-sm mb-2">Notre histoire</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">Fondée avec une vision</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              L'École Canadienne Canadian School a été fondée il y a plus de 20 ans par des éducateurs passionnés qui souhaitaient offrir un enseignement bilingue d'excellence aux familles de Brazzaville.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Inspirée du modèle canadien reconnu mondialement pour sa qualité, notre école a su adapter ces méthodes pédagogiques au contexte congolais tout en maintenant des standards internationaux.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Aujourd'hui, avec plus de 1 200 élèves et 80 enseignants qualifiés, nous sommes fiers d'être l'un des établissements de référence à Brazzaville.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6">Notre parcours</h3>
            {[['2004', 'Fondation de l\'école avec 80 élèves'], ['2008', 'Ouverture du collège'], ['2012', 'Lancement du lycée'], ['2016', 'Nouvelle infrastructure : laboratoires, bibliothèque'], ['2020', 'Digitalisation des outils pédagogiques'], ['2024', '1 200 élèves — référence à Brazzaville']].map(([year, event]) => (
              <div key={year} className="flex gap-4 mb-4">
                <div className="text-primary-300 font-bold text-sm w-10 shrink-0">{year}</div>
                <div className="text-red-100 text-sm">{event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="section-header">
            <h2>Nos valeurs fondatrices</h2>
            <p>Les principes qui guident chaque décision pédagogique et éducative</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, titre, desc }) => (
              <div key={titre} className="card text-center hover:shadow-md transition-all group">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors">
                  <Icon size={24} className="text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-header">
            <h2>Notre équipe de direction</h2>
            <p>Des professionnels expérimentés au service de vos enfants</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipe.map(p => (
              <div
                key={p.nom}
                onClick={() => setSelected(p)}
                className="card text-center hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {p.nom.split(' ')[1]?.[0] || p.nom[0]}
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{p.nom}</h3>
                <p className="text-primary-600 text-xs font-medium mt-1">{p.poste}</p>
                <p className="text-gray-500 text-xs mt-2">{p.exp}</p>
                <p className="text-primary-600 text-xs mt-3 font-medium">Voir le profil →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="py-16 px-4 bg-primary-700 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: '1 200+', l: 'Élèves', icon: Users },
            { v: '80+', l: 'Enseignants', icon: BookOpen },
            { v: '97%', l: 'Réussite au Bac', icon: Award },
            { v: '20+', l: "Années d'expérience", icon: Globe },
          ].map(({ v, l, icon: Icon }) => (
            <div key={l}>
              <Icon size={28} className="text-red-300 mx-auto mb-2" />
              <div className="text-4xl font-extrabold mb-1">{v}</div>
              <div className="text-red-200 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={22} />
            </button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                {selected.nom.split(' ')[1]?.[0] || selected.nom[0]}
              </div>
              <h3 className="font-bold text-gray-900 text-lg">{selected.nom}</h3>
              <p className="text-primary-600 text-sm font-medium mt-1">{selected.poste}</p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">{selected.bio}</p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <GraduationCap size={16} className="text-primary-600 shrink-0" />
                <span>{selected.diplome}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} className="text-primary-600 shrink-0" />
                <span>{selected.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={16} className="text-primary-600 shrink-0" />
                <span>{selected.tel}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}# 2025-12-17T09:30:00 - feat: page A propos - histoire, valeurs, equipe de direction
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
# 2026-03-03T09:15:00 - feat: cartes membres equipe cliquables avec modal biographie
# 2026-03-05T10:00:00 - fix: le modal ne se fermait pas en cliquant en dehors
# 2026-03-06T09:30:00 - style: effet hover et animation sur les cartes cliquables
# 2025-12-17T09:30:00 - feat: page A propos - histoire, valeurs, equipe de direction
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
# 2026-03-03T09:15:00 - feat: cartes membres equipe cliquables avec modal biographie
# 2026-03-05T10:00:00 - fix: le modal ne se fermait pas en cliquant en dehors
# 2026-03-06T09:30:00 - style: effet hover et animation sur les cartes cliquables
# 2025-12-17T09:30:00 - feat: page A propos - histoire, valeurs, equipe de direction
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
# 2026-03-03T09:15:00 - feat: cartes membres equipe cliquables avec modal biographie
# 2026-03-05T10:00:00 - fix: le modal ne se fermait pas en cliquant en dehors
# 2026-03-06T09:30:00 - style: effet hover et animation sur les cartes cliquables
# 2025-12-17T09:30:00 - feat: page A propos - histoire, valeurs, equipe de direction
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
