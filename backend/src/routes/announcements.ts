import { Router, Request, Response } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()

router.get('/public', async (_req: Request, res: Response) => {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { published: true },
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
    res.json({ announcements })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.get('/', authenticate, async (_req: AuthRequest, res: Response) => {
  try {
    const announcements = await prisma.announcement.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ announcements })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.post('/', authenticate, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const announcement = await prisma.announcement.create({
      data: { ...req.body, authorId: req.user!.id },
    })
    res.status(201).json({ announcement })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.put('/:id', authenticate, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const announcement = await prisma.announcement.update({ where: { id: req.params.id as string }, data: req.body })
    res.json({ announcement })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.delete('/:id', authenticate, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    await prisma.announcement.delete({ where: { id: req.params.id as string } })
    res.json({ message: 'Annonce supprimée' })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

export default router