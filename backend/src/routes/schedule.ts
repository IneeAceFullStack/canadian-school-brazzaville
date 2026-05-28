import { Router, Response } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()
router.use(authenticate)

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { classe, teacherId } = req.query
    const where: Record<string, unknown> = {}
    if (classe) where.classe = String(classe)
    if (teacherId) where.teacherId = String(teacherId)
    const schedule = await prisma.schedule.findMany({
      where,
      include: { teacher: { select: { nom: true, prenom: true } } },
      orderBy: [{ jour: 'asc' }, { heureDebut: 'asc' }],
    })
    res.json({ schedule })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.post('/', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const slot = await prisma.schedule.create({ data: req.body })
    res.status(201).json({ slot })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.put('/:id', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const slot = await prisma.schedule.update({ where: { id: req.params.id }, data: req.body })
    res.json({ slot })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.delete('/:id', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    await prisma.schedule.delete({ where: { id: req.params.id } })
    res.json({ message: 'Créneau supprimé' })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

export default router
# 2025-12-03T09:00:00 - feat: emploi du temps - creation et affichage par classe
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2025-12-03T09:00:00 - feat: emploi du temps - creation et affichage par classe
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2025-12-03T09:00:00 - feat: emploi du temps - creation et affichage par classe
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2025-12-03T09:00:00 - feat: emploi du temps - creation et affichage par classe
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
