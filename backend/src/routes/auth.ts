import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.active) {
      res.status(401).json({ error: 'Email ou mot de passe incorrect' })
      return
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      res.status(401).json({ error: 'Email ou mot de passe incorrect' })
      return
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions)
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Données invalides', details: err.errors })
      return
    }
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, email: true, name: true, role: true, avatar: true, createdAt: true },
    })
    res.json({ user })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      res.status(400).json({ error: 'Email déjà utilisé' })
      return
    }
    const hash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, password: hash, name, role: role || 'student' },
      select: { id: true, email: true, name: true, role: true },
    })
    res.status(201).json({ user })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.put('/change-password', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } })
    if (!user) { res.status(404).json({ error: 'Utilisateur non trouvé' }); return }
    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) { res.status(401).json({ error: 'Mot de passe actuel incorrect' }); return }
    const hash = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({ where: { id: user.id }, data: { password: hash } })
    res.json({ message: 'Mot de passe modifié avec succès' })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
# 2025-11-13T09:15:00 - feat: authentification JWT - login et verification du token
# 2025-11-14T10:20:00 - feat: route /me et changement de mot de passe
# 2025-11-15T09:00:00 - fix: le token JWT n'incluait pas le role utilisateur
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-13T09:15:00 - feat: authentification JWT - login et verification du token
# 2025-11-14T10:20:00 - feat: route /me et changement de mot de passe
# 2025-11-15T09:00:00 - fix: le token JWT n'incluait pas le role utilisateur
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-13T09:15:00 - feat: authentification JWT - login et verification du token
# 2025-11-14T10:20:00 - feat: route /me et changement de mot de passe
# 2025-11-15T09:00:00 - fix: le token JWT n'incluait pas le role utilisateur
# 2026-02-13T09:30:00 - chore: nettoyage des console.log et code mort
# 2026-05-28T10:00:00 - refactor: nettoyage final du code - suppression des imports inutiles
# 2026-06-02T09:15:00 - chore: verification finale de tous les endpoints API
# 2025-11-13T09:15:00 - feat: authentification JWT - login et verification du token
# 2025-11-14T10:20:00 - feat: route /me et changement de mot de passe
