import { Router, Response } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()
router.use(authenticate)

router.get('/', async (_req: AuthRequest, res: Response) => {
  try {
    const teachers = await prisma.teacher.findMany({ orderBy: { nom: 'asc' } })
    res.json({ teachers })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: req.params.id },
      include: { grades: { include: { student: true } }, schedules: true },
    })
    if (!teacher) { res.status(404).json({ error: 'Enseignant non trouvé' }); return }
    res.json({ teacher })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.post('/', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const teacher = await prisma.teacher.create({ data: req.body })
    res.status(201).json({ teacher })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.put('/:id', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const teacher = await prisma.teacher.update({ where: { id: req.params.id }, data: req.body })
    res.json({ teacher })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.delete('/:id', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    await prisma.teacher.delete({ where: { id: req.params.id } })
    res.json({ message: 'Enseignant supprimé' })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

export default router
# 2025-11-22T09:00:00 - feat: CRUD enseignants
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-22T09:00:00 - feat: CRUD enseignants
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-22T09:00:00 - feat: CRUD enseignants
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-22T09:00:00 - feat: CRUD enseignants
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
