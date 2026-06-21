import { Music, Palette, Dumbbell, Cpu, Globe, BookOpen, X } from 'lucide-react'
import { useState } from 'react'

const activites = [
  {
    icon: Music,
    titre: 'Musique & Chorale',
    desc: 'Cours de chant, instruments et concerts annuels.',
    details: 'Notre club Musique & Chorale accueille les élèves du primaire au lycée. Les élèves apprennent le chant choral, la guitare, le piano et les percussions. Un grand concert annuel est organisé en fin d\'année devant les parents.',
    horaire: 'Mardi et Jeudi : 15h30 – 17h00',
    responsable: 'M. IBARA Jean-Claude',
    niveau: 'Tous niveaux',
  },
  {
    icon: Palette,
    titre: 'Arts plastiques',
    desc: 'Peinture, sculpture et expositions scolaires.',
    details: 'L\'atelier Arts plastiques permet aux élèves d\'explorer leur créativité à travers la peinture, la sculpture et les arts graphiques. Une exposition annuelle présente les œuvres des élèves aux familles.',
    horaire: 'Mercredi : 14h00 – 16h00',
    responsable: 'Mme MOUELA Sandrine',
    niveau: 'Primaire et Collège',
  },
  {
    icon: Dumbbell,
    titre: 'Sport',
    desc: 'Football, basketball, athlétisme, sports collectifs.',
    details: 'Le club sportif propose plusieurs disciplines : football, basketball, athlétisme et sports collectifs. Des compétitions inter-écoles sont organisées tout au long de l\'année scolaire.',
    horaire: 'Lundi, Mercredi et Vendredi : 15h30 – 17h30',
    responsable: 'M. OSSETE Patrick',
    niveau: 'Collège et Lycée',
  },
  {
    icon: Cpu,
    titre: 'Club Informatique',
    desc: 'Initiation à la programmation et aux outils numériques.',
    details: 'Le Club Informatique initie les élèves à la programmation (Scratch, Python), au design graphique et aux outils bureautiques. Les élèves avancés participent à des hackathons régionaux.',
    horaire: 'Mardi : 15h30 – 17h00',
    responsable: 'M. BAZINGA Roméo',
    niveau: 'CM1 au Lycée',
  },
  {
    icon: Globe,
    titre: 'Club Anglais',
    desc: 'Débats, théâtre anglophone et correspondance internationale.',
    details: 'Le Club Anglais renforce la pratique orale de la langue anglaise à travers des débats, des pièces de théâtre et des échanges avec des écoles partenaires au Canada et en France.',
    horaire: 'Jeudi : 15h30 – 17h00',
    responsable: 'Mme OKEMBA Grace',
    niveau: 'Collège et Lycée',
  },
  {
    icon: BookOpen,
    titre: 'Club Science',
    desc: 'Expériences, concours scientifiques et olympiades.',
    details: 'Le Club Science prépare les élèves aux olympiades de mathématiques, physique et biologie. Des expériences pratiques sont réalisées chaque semaine dans nos laboratoires équipés.',
    horaire: 'Vendredi : 15h30 – 17h30',
    responsable: 'M. NKOUNKOU Pascal',
    niveau: 'Collège et Lycée',
  },
]

const infrastructures = [
  {
    titre: 'Bibliothèque',
    desc: '5 000 ouvrages, espace lecture, accès internet.',
    details: 'Notre bibliothèque moderne dispose de 5 000 ouvrages couvrant toutes les disciplines. Un espace lecture calme, des postes informatiques connectés et un fonds documentaire régulièrement mis à jour sont à disposition des élèves et enseignants.',
    horaire: 'Lundi – Vendredi : 7h30 – 17h00',
    capacite: '60 places assises',
  },
  {
    titre: 'Laboratoires',
    desc: 'Labo de sciences physiques, chimie et SVT équipés.',
    details: 'Trois laboratoires entièrement équipés permettent aux élèves de réaliser des expériences pratiques en physique, chimie et sciences de la vie. Chaque poste est équipé du matériel nécessaire aux programmes officiels.',
    horaire: 'Disponibles pendant les cours et sur réservation',
    capacite: '30 élèves par labo',
  },
  {
    titre: 'Salle Informatique',
    desc: '40 postes connectés, logiciels éducatifs.',
    details: 'La salle informatique dispose de 40 postes récents connectés à internet haut débit. Les logiciels éducatifs couvrent la bureautique, la programmation et les outils pédagogiques utilisés dans les classes.',
    horaire: 'Lundi – Vendredi : 7h30 – 17h00',
    capacite: '40 postes',
  },
  {
    titre: 'Terrain de sport',
    desc: 'Terrain de football, basketball et piste d\'athlétisme.',
    details: 'Le complexe sportif comprend un terrain de football homologué, deux terrains de basketball et une piste d\'athlétisme. Les équipements sont entretenus régulièrement pour garantir la sécurité des élèves.',
    horaire: 'Disponible pendant les cours d\'EPS et les clubs',
    capacite: 'Capacité : 200 élèves',
  },
  {
    titre: 'Cantine scolaire',
    desc: 'Repas équilibrés, menu hebdomadaire varié.',
    details: 'La cantine propose des repas équilibrés préparés sur place chaque jour. Le menu hebdomadaire est affiché en ligne et tient compte des besoins nutritionnels des élèves. Une option végétarienne est disponible sur demande.',
    horaire: 'Service : 12h00 – 13h30',
    capacite: '150 couverts par service',
  },
  {
    titre: 'Infirmerie',
    desc: 'Infirmière disponible tous les jours ouvrables.',
    details: 'L\'infirmerie est tenue par une infirmière diplômée présente tous les jours ouvrables. Elle assure les premiers soins, suit les dossiers médicaux des élèves et peut contacter les parents en cas d\'urgence.',
    horaire: 'Lundi – Vendredi : 7h30 – 17h00',
    capacite: '4 lits de repos',
  },
]

export default function VieScolairePage() {
  const [selectedActivite, setSelectedActivite] = useState<typeof activites[0] | null>(null)
  const [selectedInfra, setSelectedInfra] = useState<typeof infrastructures[0] | null>(null)

  return (
    <div>
      <section className="page-hero text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Vie scolaire</h1>
        <p className="text-red-200 text-lg max-w-2xl mx-auto">Au-delà des cours, une vie scolaire riche et épanouissante</p>
      </section>

      {/* Activités */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-header">
            <h2>Activités parascolaires</h2>
            <p>Des clubs et ateliers pour développer les talents de chaque élève</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activites.map(({ icon: Icon, titre, desc, ...rest }) => (
              <div
                key={titre}
                onClick={() => setSelectedActivite({ icon: Icon, titre, desc, ...rest })}
                className="card hover:shadow-lg transition-all group cursor-pointer hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon size={22} className="text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
                <p className="text-primary-600 text-xs mt-3 font-medium">En savoir plus →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructures */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="section-header">
            <h2>Nos infrastructures</h2>
            <p>Des équipements modernes pour un enseignement de qualité</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructures.map(({ titre, desc, ...rest }) => (
              <div
                key={titre}
                onClick={() => setSelectedInfra({ titre, desc, ...rest })}
                className="card hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="w-2 h-8 bg-primary-600 rounded-full mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
                <p className="text-primary-600 text-xs mt-3 font-medium">En savoir plus →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Règlement */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="section-header">
            <h2>Règlement et vie en communauté</h2>
            <p>Des règles claires pour un environnement serein et propice aux apprentissages</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Tenue vestimentaire', 'Uniforme obligatoire : chemise blanche, pantalon/jupe gris(e), ceinture noire.'],
              ['Ponctualité', 'Accueil à partir de 7h15. Retard signalé aux parents. 3 retards = convocation.'],
              ['Téléphones', 'Téléphones interdits en classe. Autorisés en récréation uniquement.'],
              ['Absences', 'Toute absence doit être justifiée par écrit par les parents dans les 48h.'],
              ['Respect', 'Tolérance zéro pour le harcèlement, l\'intimidation ou les violences.'],
              ['Évaluation', 'Trois trimestres. Conseils de classe en décembre, mars et juin.'],
            ].map(([titre, desc]) => (
              <div key={titre} className="flex gap-4">
                <div className="w-1.5 bg-primary-500 rounded-full shrink-0 mt-1" style={{ height: '100%' }} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{titre}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Activité */}
      {selectedActivite && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedActivite(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedActivite(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
              <X size={22} />
            </button>
            <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
              <selectedActivite.icon size={26} className="text-primary-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{selectedActivite.titre}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{selectedActivite.details}</p>
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between"><span className="text-gray-400">Horaire</span><span className="text-gray-700 font-medium">{selectedActivite.horaire}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Responsable</span><span className="text-gray-700 font-medium">{selectedActivite.responsable}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Niveau</span><span className="text-gray-700 font-medium">{selectedActivite.niveau}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Infrastructure */}
      {selectedInfra && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedInfra(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedInfra(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
              <X size={22} />
            </button>
            <div className="w-2 h-10 bg-primary-600 rounded-full mb-4" />
            <h3 className="font-bold text-gray-900 text-lg mb-1">{selectedInfra.titre}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{selectedInfra.details}</p>
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between"><span className="text-gray-400">Horaire</span><span className="text-gray-700 font-medium">{selectedInfra.horaire}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Capacité</span><span className="text-gray-700 font-medium">{selectedInfra.capacite}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}