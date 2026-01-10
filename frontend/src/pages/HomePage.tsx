import { Link } from 'react-router-dom'
import { GraduationCap, Users, Award, BookOpen, ChevronRight, Star, Phone, ArrowRight, Globe } from 'lucide-react'

const stats = [
  { label: 'Élèves inscrits', value: '1 200+', icon: Users },
  { label: 'Enseignants qualifiés', value: '80+', icon: GraduationCap },
  { label: "Années d'expérience", value: '20+', icon: Star },
  { label: 'Taux de réussite', value: '97%', icon: Award },
]

const programmes = [
  { titre: 'Maternelle', tranches: 'PS · MS · GS', desc: "Éveil et développement de l'enfant dans un cadre bienveillant et stimulant.", color: 'bg-pink-50 border-pink-200' },
  { titre: 'Primaire', tranches: 'CP · CE1 · CE2 · CM1 · CM2', desc: 'Acquisition des fondamentaux en français et en anglais avec une pédagogie moderne.', color: 'bg-blue-50 border-blue-200' },
  { titre: 'Collège', tranches: '6ème · 5ème · 4ème · 3ème', desc: 'Consolidation des savoirs avec des clubs sportifs, scientifiques et artistiques.', color: 'bg-green-50 border-green-200' },
  { titre: 'Lycée', tranches: '2nde · 1ère · Terminale', desc: 'Préparation au Baccalauréat avec filières S, L, STMG et spécialités.', color: 'bg-yellow-50 border-yellow-200' },
]

const testimonials = [
  { name: 'Marie BOUANGA', role: 'Parent d\'élève', text: 'Mon fils a rejoint l\'école en CP. Les progrès sont remarquables. Le corps enseignant est très disponible.' },
  { name: 'Prof. LOUZOLO', role: 'Enseignant de lycée', text: "Une équipe pédagogique passionnée, des infrastructures modernes. Je suis fier d'enseigner ici depuis 8 ans." },
  { name: 'Patrick N.', role: 'Ancien élève, Terminale S', text: "Grâce à l'École Canadienne, j'ai eu 18/20 au Bac et intégré une université au Canada. Merci !" },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
              <Globe size={14} /> Enseignement bilingue Français–Anglais
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              L'excellence scolaire<br /><span className="text-red-300">au cœur de Brazzaville</span>
            </h1>
            <p className="text-lg text-red-100 mb-8 leading-relaxed">
              De la maternelle au lycée, offrez à vos enfants un enseignement de qualité internationale dans un environnement bienveillant et stimulant.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/inscription" className="bg-white text-primary-700 hover:bg-red-50 font-bold py-3 px-7 rounded-lg transition-all shadow-lg hover:shadow-xl active:scale-95">
                S'inscrire maintenant
              </Link>
              <Link to="/programmes" className="border-2 border-white/50 hover:border-white text-white font-semibold py-3 px-7 rounded-lg transition-all flex items-center gap-2">
                Voir les programmes <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">
                <Icon size={28} className="text-red-300 mb-2" />
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-red-200 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats mobile */}
      <section className="md:hidden bg-primary-600 text-white py-8">
        <div className="grid grid-cols-2 gap-4 px-4">
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-red-200 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programmes */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <h2>Nos programmes scolaires</h2>
            <p>De la maternelle au lycée, un parcours d'excellence adapté à chaque âge</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programmes.map(p => (
              <div key={p.titre} className={`rounded-xl border-2 p-6 ${p.color} hover:shadow-lg transition-all group`}>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{p.titre}</h3>
                <p className="text-primary-600 text-sm font-medium mb-3">{p.tranches}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                <Link to="/programmes" className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                  En savoir plus <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À propos / Mission */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-block bg-primary-50 text-primary-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">Notre mission</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">Former les leaders de demain</h2>
            <p className="text-gray-500 mb-4 leading-relaxed">
              Fondée il y a plus de 20 ans, l'École Canadienne Canadian School offre un cadre éducatif d'excellence qui allie rigueur académique, épanouissement personnel et ouverture sur le monde.
            </p>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Notre approche bilingue français-anglais prépare nos élèves à réussir dans un monde globalisé, tout en ancrant leur identité congolaise.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[['Bilingue', 'Français & Anglais'], ['Certifié', 'Ministère de l\'Éducation'], ['Numérique', 'Tablettes & Labo Info'], ['Sport', 'Infrastructure complète']].map(([t, s]) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{t}</div>
                    <div className="text-gray-500 text-xs">{s}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/a-propos" className="btn-primary inline-flex items-center gap-2">
              En savoir plus <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-600 rounded-2xl p-6 text-white">
              <BookOpen size={32} className="mb-3" />
              <div className="text-3xl font-bold">1 200</div>
              <div className="text-red-200 text-sm">Élèves formés chaque année</div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 text-white mt-6">
              <Award size={32} className="mb-3 text-yellow-400" />
              <div className="text-3xl font-bold">97%</div>
              <div className="text-gray-400 text-sm">Taux de réussite au Bac</div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6 text-gray-800 mt-0">
              <Users size={32} className="mb-3 text-primary-600" />
              <div className="text-3xl font-bold text-gray-900">80+</div>
              <div className="text-gray-500 text-sm">Enseignants diplômés</div>
            </div>
            <div className="bg-primary-50 rounded-2xl p-6 text-gray-800">
              <GraduationCap size={32} className="mb-3 text-primary-600" />
              <div className="text-3xl font-bold text-gray-900">20+</div>
              <div className="text-gray-500 text-sm">Années d'expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <h2>Ce qu'ils disent de nous</h2>
            <p>Témoignages de parents, élèves et enseignants</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 text-sm italic">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Inscrivez votre enfant dès maintenant</h2>
          <p className="text-red-200 mb-8 text-lg">Places limitées pour l'année 2025–2026. Sécurisez la place de votre enfant.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/inscription" className="bg-white text-primary-700 font-bold py-3 px-8 rounded-lg hover:bg-red-50 transition-all shadow-lg">
              Nouvelle inscription
            </Link>
            <Link to="/reinscription" className="border-2 border-white/60 hover:border-white text-white font-semibold py-3 px-8 rounded-lg transition-all">
              Réinscription
            </Link>
            <a href="tel:+24206000000" className="flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-semibold py-3 px-8 rounded-lg transition-all">
              <Phone size={16} /> Nous appeler
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
# 2025-12-16T10:15:00 - feat: page d'accueil publique - hero, stats, programmes, temoignages
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
# 2026-03-02T10:00:00 - style: amelioration de la page d'accueil - section hero
# 2026-06-08T09:00:00 - style: amelioration finale de la page d'accueil
# 2025-12-16T10:15:00 - feat: page d'accueil publique - hero, stats, programmes, temoignages
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
# 2026-03-02T10:00:00 - style: amelioration de la page d'accueil - section hero
# 2026-06-08T09:00:00 - style: amelioration finale de la page d'accueil
# 2025-12-16T10:15:00 - feat: page d'accueil publique - hero, stats, programmes, temoignages
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
# 2026-03-02T10:00:00 - style: amelioration de la page d'accueil - section hero
# 2026-06-08T09:00:00 - style: amelioration finale de la page d'accueil
# 2025-12-16T10:15:00 - feat: page d'accueil publique - hero, stats, programmes, temoignages
# 2026-01-10T14:30:00 - style: responsive mobile sur toutes les pages publiques
