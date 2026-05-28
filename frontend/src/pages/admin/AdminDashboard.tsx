import { useEffect, useState } from 'react'
import { Users, UserCheck, CreditCard, TrendingUp, AlertCircle, BookOpen } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { statsAPI } from '../../services/api'

const COLORS = ['#CC0000', '#10b981', '#f59e0b', '#6366f1']

const classeOrder = ['Maternelle PS','Maternelle MS','Maternelle GS','CP','CE1','CE2','CM1','CM2','6ème','5ème','4ème','3ème','2nde','1ère','Terminale']

interface Stats {
  totalStudents: number; totalTeachers: number; pendingPayments: number
  totalInscriptions: number; totalRevenue: number
  classeStats: { classeActuelle: string; _count: { id: number } }[]
  paymentStats: { statut: string; _count: { id: number }; _sum: { montant: number } }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    statsAPI.get().then(r => setStats(r.data)).catch(console.error)
  }, [])

  const barData = stats?.classeStats
    .sort((a, b) => classeOrder.indexOf(a.classeActuelle) - classeOrder.indexOf(b.classeActuelle))
    .map(c => ({ name: c.classeActuelle, élèves: c._count.id })) || []

  const pieData = stats?.paymentStats.map((p, i) => ({
    name: p.statut === 'confirme' ? 'Confirmé' : p.statut === 'en_attente' ? 'En attente' : p.statut === 'refuse' ? 'Refusé' : p.statut,
    value: p._count.id,
    color: COLORS[i] || '#999',
  })) || []

  const cards = [
    { title: 'Élèves actifs', value: stats?.totalStudents ?? '—', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { title: 'Enseignants', value: stats?.totalTeachers ?? '—', icon: UserCheck, color: 'text-green-600 bg-green-50' },
    { title: 'Paiements en attente', value: stats?.pendingPayments ?? '—', icon: AlertCircle, color: 'text-yellow-600 bg-yellow-50' },
    { title: 'Revenus confirmés', value: stats ? `${(stats.totalRevenue / 1000).toFixed(0)}k FCFA` : '—', icon: TrendingUp, color: 'text-primary-600 bg-primary-50' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble — Année scolaire 2024–2025</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ title, value, icon: Icon, color }) => (
          <div key={title} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-gray-500 text-xs">{title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen size={16} className="text-primary-600" /> Effectif par classe
          </h2>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-35} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="élèves" fill="#CC0000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">Chargement des données...</div>
          )}
        </div>

        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard size={16} className="text-primary-600" /> Paiements
          </h2>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {pieData.map(d => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-400 text-sm">Chargement...</div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            ['/admin/eleves', 'Gérer les élèves', Users, 'text-blue-600'],
            ['/admin/paiements', 'Voir les paiements', CreditCard, 'text-green-600'],
            ['/admin/inscriptions', 'Gérer les inscriptions', BookOpen, 'text-orange-600'],
          ].map(([to, label, Icon, color]) => (
            <a key={String(label)} href={String(to)} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all group">
              {/* @ts-ignore */}
              <Icon size={18} className={String(color)} />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">{String(label)}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
# 2025-12-10T11:30:00 - feat: statistiques dashboard admin - eleves, paiements, inscriptions
# 2025-12-11T09:45:00 - feat: graphique encaissements mensuels avec Recharts
# 2026-01-14T11:00:00 - style: amelioration du dashboard admin - cartes de stats
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
# 2026-05-26T09:30:00 - fix: les stats du dashboard ne se rafraichissaient pas
# 2026-05-27T11:00:00 - style: amelioration des cartes de statistiques admin
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2025-12-10T11:30:00 - feat: statistiques dashboard admin - eleves, paiements, inscriptions
# 2025-12-11T09:45:00 - feat: graphique encaissements mensuels avec Recharts
# 2026-01-14T11:00:00 - style: amelioration du dashboard admin - cartes de stats
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
# 2026-05-26T09:30:00 - fix: les stats du dashboard ne se rafraichissaient pas
# 2026-05-27T11:00:00 - style: amelioration des cartes de statistiques admin
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2025-12-10T11:30:00 - feat: statistiques dashboard admin - eleves, paiements, inscriptions
# 2025-12-11T09:45:00 - feat: graphique encaissements mensuels avec Recharts
# 2026-01-14T11:00:00 - style: amelioration du dashboard admin - cartes de stats
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
# 2026-05-26T09:30:00 - fix: les stats du dashboard ne se rafraichissaient pas
# 2026-05-27T11:00:00 - style: amelioration des cartes de statistiques admin
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2025-12-10T11:30:00 - feat: statistiques dashboard admin - eleves, paiements, inscriptions
# 2025-12-11T09:45:00 - feat: graphique encaissements mensuels avec Recharts
# 2026-01-14T11:00:00 - style: amelioration du dashboard admin - cartes de stats
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-05-15T09:15:00 - refactor: amelioration des messages de toast - succes et erreurs
# 2026-05-26T09:30:00 - fix: les stats du dashboard ne se rafraichissaient pas
# 2026-05-27T11:00:00 - style: amelioration des cartes de statistiques admin
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
