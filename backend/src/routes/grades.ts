import { Router, Response } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()
router.use(authenticate)

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { studentId, classe, trimestre, matiere } = req.query
    const where: Record<string, unknown> = {}
    if (studentId) where.studentId = String(studentId)
    if (trimestre) where.trimestre = String(trimestre)
    if (matiere) where.matiere = { contains: String(matiere), mode: 'insensitive' }
    if (classe) where.student = { classeActuelle: String(classe) }
    const grades = await prisma.grade.findMany({
      where,
      include: {
        student: { select: { nomComplet: true, classeActuelle: true } },
        teacher: { select: { nom: true, prenom: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ grades })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.post('/', authorize('admin', 'teacher'), async (req: AuthRequest, res: Response) => {
  try {
    const teacher = await prisma.teacher.findFirst({ where: { userId: req.user!.id } })
    const grade = await prisma.grade.create({
      data: { ...req.body, teacherId: teacher?.id },
    })
    res.status(201).json({ grade })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.post('/bulk', authorize('admin', 'teacher'), async (req: AuthRequest, res: Response) => {
  try {
    const { grades } = req.body
    const teacher = await prisma.teacher.findFirst({ where: { userId: req.user!.id } })
    const created = await prisma.grade.createMany({
      data: grades.map((g: Record<string, unknown>) => ({ ...g, teacherId: teacher?.id })),
      skipDuplicates: true,
    })
    res.status(201).json({ created })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.put('/:id', authorize('admin', 'teacher'), async (req: AuthRequest, res: Response) => {
  try {
    const grade = await prisma.grade.update({ where: { id: req.params.id }, data: req.body })
    res.json({ grade })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.delete('/:id', authorize('admin', 'teacher'), async (req: AuthRequest, res: Response) => {
  try {
    await prisma.grade.delete({ where: { id: req.params.id } })
    res.json({ message: 'Note supprimée' })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

export default router
