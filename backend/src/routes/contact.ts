import { Router, Request, Response } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { nom, email, telephone, sujet, message } = req.body
    if (!nom || !email || !sujet || !message) {
      res.status(400).json({ error: 'Champs obligatoires manquants' })
      return
    }
    const contact = await prisma.contactMessage.create({
      data: { nom, email, telephone, sujet, message },
    })
    res.status(201).json({ contact, message: 'Message envoyé avec succès' })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.get('/', authenticate, authorize('admin'), async (_req: AuthRequest, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
    res.json({ messages })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.put('/:id/read', authenticate, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    await prisma.contactMessage.update({ where: { id: req.params.id }, data: { lu: true } })
    res.json({ message: 'Marqué comme lu' })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

export default router
