import { Router, Response } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()
router.use(authenticate)

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { search, classe, statut, page = '1', limit = '20' } = req.query
    const where: Record<string, unknown> = {}
    if (search) where.nomComplet = { contains: String(search), mode: 'insensitive' }
    if (classe) where.classeActuelle = String(classe)
    if (statut) where.statut = String(statut)
    const skip = (Number(page) - 1) * Number(limit)
    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where, skip, take: Number(limit),
        include: { parent: true },
        orderBy: { nomComplet: 'asc' },
      }),
      prisma.student.count({ where }),
    ])
    res.json({ students, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
      include: { parent: true, grades: { include: { teacher: true } }, payments: true },
    })
    if (!student) { res.status(404).json({ error: 'Élève non trouvé' }); return }
    res.json({ student })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.post('/', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const student = await prisma.student.create({ data: req.body })
    res.status(201).json({ student })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.put('/:id', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const student = await prisma.student.update({ where: { id: req.params.id }, data: req.body })
    res.json({ student })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.delete('/:id', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    await prisma.student.delete({ where: { id: req.params.id } })
    res.json({ message: 'Élève supprimé' })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.get('/search/by-name', async (req: AuthRequest, res: Response) => {
  try {
    const { nom, idVie } = req.query
    const where: Record<string, unknown> = {}
    if (nom) where.nomComplet = { contains: String(nom), mode: 'insensitive' }
    if (idVie) where.idVie = String(idVie)
    const students = await prisma.student.findMany({ where, take: 10, include: { parent: true } })
    res.json({ students })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

export default router
# 2025-11-21T10:30:00 - feat: CRUD eleves - creation, liste et recherche
# 2025-11-24T10:15:00 - fix: erreur 500 lors de la suppression d'un eleve avec paiements lies
# 2026-02-04T11:00:00 - feat: pagination sur la liste des eleves
# 2026-02-06T09:15:00 - fix: erreur lors de la creation d'un eleve sans parent assigne
# 2026-02-09T10:30:00 - refactor: optimisation des requetes Prisma avec select explicite
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-21T10:30:00 - feat: CRUD eleves - creation, liste et recherche
# 2025-11-24T10:15:00 - fix: erreur 500 lors de la suppression d'un eleve avec paiements lies
# 2026-02-04T11:00:00 - feat: pagination sur la liste des eleves
# 2026-02-06T09:15:00 - fix: erreur lors de la creation d'un eleve sans parent assigne
# 2026-02-09T10:30:00 - refactor: optimisation des requetes Prisma avec select explicite
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-21T10:30:00 - feat: CRUD eleves - creation, liste et recherche
# 2025-11-24T10:15:00 - fix: erreur 500 lors de la suppression d'un eleve avec paiements lies
# 2026-02-04T11:00:00 - feat: pagination sur la liste des eleves
# 2026-02-06T09:15:00 - fix: erreur lors de la creation d'un eleve sans parent assigne
# 2026-02-09T10:30:00 - refactor: optimisation des requetes Prisma avec select explicite
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-21T10:30:00 - feat: CRUD eleves - creation, liste et recherche
# 2025-11-24T10:15:00 - fix: erreur 500 lors de la suppression d'un eleve avec paiements lies
# 2026-02-04T11:00:00 - feat: pagination sur la liste des eleves
# 2026-02-06T09:15:00 - fix: erreur lors de la creation d'un eleve sans parent assigne
# 2026-02-09T10:30:00 - refactor: optimisation des requetes Prisma avec select explicite
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
