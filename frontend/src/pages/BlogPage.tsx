import { useState } from 'react'
import { Calendar, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const articles = [
 { id: 1, titre: 'Résultats exceptionnels au Baccalauréat 2024', date: '15 juil. 2024', categorie: 'Résultats', extrait: 'Nos élèves de Terminale ont réalisé un taux de réussite de 97%, avec 23 mentions Très Bien. Félicitations à tous !', image: 'bg-gradient-to-br from-green-400 to-green-600' },
 { id: 2, titre: 'Concours de mathématiques : 1er prix national', date: '02 juin 2024', categorie: 'Concours', extrait: 'NKOUNKOU Jean-Pierre de la classe de Terminale S a remporté le 1er prix du concours national de mathématiques.', image: 'bg-gradient-to-br from-blue-400 to-blue-600' },
 { id: 3, titre: 'Semaine culturelle : célébration de la diversité', date: '18 mai 2024', categorie: 'Culture', extrait: 'La semaine culturelle annuelle a réuni élèves, parents et enseignants pour célébrer la richesse culturelle du Congo.', image: 'bg-gradient-to-br from-purple-400 to-purple-600' },
 { id: 4, titre: 'Nouveaux laboratoires inaugurés', date: '10 janv. 2024', categorie: 'Infrastructure', extrait: 'Deux nouveaux laboratoires de sciences ont été inaugurés ce mois, dotés d\'équipements modernes.', image: 'bg-gradient-to-br from-orange-400 to-orange-600' },
 { id: 5, titre: 'Partenariat avec une école canadienne', date: '05 nov. 2023', categorie: 'International', extrait: 'L\'École Canadienne a signé un accord d\'échange avec l\'École Secondaire de Montréal.', image: 'bg-gradient-to-br from-red-400 to-red-600' },
 { id: 6, titre: 'Tournoi de football inter-classes', date: '20 oct. 2023', categorie: 'Sport', extrait: 'Le tournoi annuel de football a mobilisé 12 équipes. La classe de 3ème A a remporté le trophée.', image: 'bg-gradient-to-br from-teal-400 to-teal-600' },
]

const categories = ['Tous', 'Résultats', 'Concours', 'Culture', 'Infrastructure', 'International', 'Sport']

export default function BlogPage() {
 const [actif, setActif] = useState('Tous')
 const navigate = useNavigate()

 const articlesFiltres = actif === 'Tous' ? articles : articles.filter(a => a.categorie === actif)

 return (
   <div>
     <section className="page-hero text-center">
       <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Actualités</h1>
       <p className="text-red-200 text-lg max-w-2xl mx-auto">Toute la vie de l'École Canadienne en direct</p>
     </section>

     <section className="py-16 px-4">
       <div className="max-w-6xl mx-auto">
         <div className="flex flex-wrap gap-2 justify-center mb-12">
           {categories.map(c => (
             <button
               key={c}
               onClick={() => setActif(c)}
               className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
                 actif === c
                   ? 'bg-primary-600 border-primary-600 text-white'
                   : 'hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600'
               }`}
             >
               {c}
             </button>
           ))}
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {articlesFiltres.map(a => (
             <article
               key={a.id}
               onClick={() => navigate(`/actualites/${a.id}`)}
               className="card hover:shadow-lg transition-all overflow-hidden p-0 group cursor-pointer"
             >
               <div className={`h-44 ${a.image} flex items-center justify-center`}>
                 <div className="text-6xl font-black text-white/20">{a.titre[0]}</div>
               </div>
               <div className="p-5">
                 <div className="flex items-center gap-3 mb-3">
                   <span className="badge-red"><Tag size={10} className="mr-1" />{a.categorie}</span>
                   <span className="flex items-center gap-1 text-gray-400 text-xs"><Calendar size={11} /> {a.date}</span>
                 </div>
                 <h2 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug">{a.titre}</h2>
                 <p className="text-gray-500 text-sm leading-relaxed">{a.extrait}</p>
               </div>
             </article>
           ))}
         </div>
       </div>
     </section>
   </div>
 )
}