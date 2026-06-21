import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'

const articles = [
  { id: 1, titre: 'Résultats exceptionnels au Baccalauréat 2024', date: '15 juil. 2024', categorie: 'Résultats', extrait: 'Nos élèves de Terminale ont réalisé un taux de réussite de 97%, avec 23 mentions Très Bien. Félicitations à tous !', image: 'bg-gradient-to-br from-green-400 to-green-600' },
  { id: 2, titre: 'Concours de mathématiques : 1er prix national', date: '02 juin 2024', categorie: 'Concours', extrait: 'NKOUNKOU Jean-Pierre de la classe de Terminale S a remporté le 1er prix du concours national de mathématiques.', image: 'bg-gradient-to-br from-blue-400 to-blue-600' },
  { id: 3, titre: 'Semaine culturelle : célébration de la diversité', date: '18 mai 2024', categorie: 'Culture', extrait: 'La semaine culturelle annuelle a réuni élèves, parents et enseignants pour célébrer la richesse culturelle du Congo.', image: 'bg-gradient-to-br from-purple-400 to-purple-600' },
  { id: 4, titre: 'Nouveaux laboratoires inaugurés', date: '10 janv. 2024', categorie: 'Infrastructure', extrait: 'Deux nouveaux laboratoires de sciences ont été inaugurés ce mois, dotés d\'équipements modernes.', image: 'bg-gradient-to-br from-orange-400 to-orange-600' },
  { id: 5, titre: 'Partenariat avec une école canadienne', date: '05 nov. 2023', categorie: 'International', extrait: 'L\'École Canadienne a signé un accord d\'échange avec l\'École Secondaire de Montréal.', image: 'bg-gradient-to-br from-red-400 to-red-600' },
  { id: 6, titre: 'Tournoi de football inter-classes', date: '20 oct. 2023', categorie: 'Sport', extrait: 'Le tournoi annuel de football a mobilisé 12 équipes. La classe de 3ème A a remporté le trophée.', image: 'bg-gradient-to-br from-teal-400 to-teal-600' },
]

export default function BlogDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = articles.find(a => a.id === Number(id))

  if (!article) return (
    <div className="text-center py-32">
      <p className="text-gray-500 text-lg">Article introuvable.</p>
      <button onClick={() => navigate('/actualites')} className="mt-4 text-primary-600 hover:underline">Retour aux actualités</button>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <button onClick={() => navigate('/actualites')} className="flex items-center gap-2 text-primary-600 hover:underline mb-8">
        <ArrowLeft size={16} /> Retour aux actualités
      </button>
      <div className={`h-64 rounded-2xl ${article.image} flex items-center justify-center mb-8`}>
        <div className="text-8xl font-black text-white/20">{article.titre[0]}</div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="badge-red"><Tag size={10} className="mr-1" />{article.categorie}</span>
        <span className="flex items-center gap-1 text-gray-400 text-xs"><Calendar size={11} /> {article.date}</span>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{article.titre}</h1>
      <p className="text-gray-600 leading-relaxed text-lg">{article.extrait}</p>
    </div>
  )
}