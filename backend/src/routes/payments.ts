import { Router, Response } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()
router.use(authenticate)

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { statut, type, page = '1', limit = '20' } = req.query
    const where: Record<string, unknown> = {}
    if (statut) where.statut = String(statut)
    if (type) where.type = String(type)
    const skip = (Number(page) - 1) * Number(limit)
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where, skip, take: Number(limit),
        include: { student: { select: { nomComplet: true, classeActuelle: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.payment.count({ where }),
    ])
    res.json({ payments, total })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.post('/', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const payment = await prisma.payment.create({ data: req.body })
    res.status(201).json({ payment })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.put('/:id/confirm', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const { modePaiement, reference } = req.body
    const payment = await prisma.payment.update({
      where: { id: req.params.id },
      data: {
        statut: 'confirme',
        modePaiement,
        reference: reference || undefined,
        confirmedAt: new Date(),
        confirmedBy: req.user!.id,
      },
    })
    res.json({ payment, message: 'Paiement confirmé' })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.put('/:id/refuse', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const payment = await prisma.payment.update({
      where: { id: req.params.id },
      data: { statut: 'refuse' },
    })
    res.json({ payment, message: 'Paiement refusé' })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.get('/stats', async (_req: AuthRequest, res: Response) => {
  try {
    const stats = await prisma.payment.groupBy({
      by: ['statut'],
      _count: { id: true },
      _sum: { montant: true },
    })
    res.json({ stats })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

export default router
# 2025-11-27T09:45:00 - feat: gestion des paiements - creation et confirmation
# 2026-02-09T10:30:00 - refactor: optimisation des requetes Prisma avec select explicite
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-27T09:45:00 - feat: gestion des paiements - creation et confirmation
# 2026-02-09T10:30:00 - refactor: optimisation des requetes Prisma avec select explicite
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-27T09:45:00 - feat: gestion des paiements - creation et confirmation
# 2026-02-09T10:30:00 - refactor: optimisation des requetes Prisma avec select explicite
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-27T09:45:00 - feat: gestion des paiements - creation et confirmation
# 2026-02-09T10:30:00 - refactor: optimisation des requetes Prisma avec select explicite
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
