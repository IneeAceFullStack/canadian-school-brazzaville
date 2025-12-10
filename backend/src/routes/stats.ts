import { Router, Response } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()
router.use(authenticate, authorize('admin'))

router.get('/', async (_req: AuthRequest, res: Response) => {
  try {
    const [totalStudents, totalTeachers, pendingPayments, totalInscriptions, revenueData] = await Promise.all([
      prisma.student.count({ where: { statut: 'actif' } }),
      prisma.teacher.count({ where: { statut: 'actif' } }),
      prisma.payment.count({ where: { statut: 'en_attente' } }),
      prisma.inscription.count(),
      prisma.payment.aggregate({ where: { statut: 'confirme' }, _sum: { montant: true } }),
    ])
    const classeStats = await prisma.student.groupBy({
      by: ['classeActuelle'],
      _count: { id: true },
      where: { statut: 'actif' },
    })
    const paymentStats = await prisma.payment.groupBy({
      by: ['statut'],
      _count: { id: true },
      _sum: { montant: true },
    })
    res.json({
      totalStudents,
      totalTeachers,
      pendingPayments,
      totalInscriptions,
      totalRevenue: revenueData._sum.montant || 0,
      classeStats,
      paymentStats,
    })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

export default router
# 2025-12-10T11:30:00 - feat: statistiques dashboard admin - eleves, paiements, inscriptions
# 2025-12-12T10:00:00 - fix: le calcul du taux d'inscription etait incorrect
# 2025-12-10T11:30:00 - feat: statistiques dashboard admin - eleves, paiements, inscriptions
# 2025-12-12T10:00:00 - fix: le calcul du taux d'inscription etait incorrect
# 2025-12-10T11:30:00 - feat: statistiques dashboard admin - eleves, paiements, inscriptions
# 2025-12-12T10:00:00 - fix: le calcul du taux d'inscription etait incorrect
# 2025-12-10T11:30:00 - feat: statistiques dashboard admin - eleves, paiements, inscriptions
