import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string; name: string }
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token manquant' })
      return
    }
    const token = authHeader.split(' ')[1]
    const secret = process.env.JWT_SECRET || 'dev-secret-change-in-production'
    const decoded = jwt.verify(token, secret) as { userId: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, name: true, active: true },
    })
    if (!user || !user.active) {
      res.status(401).json({ error: 'Utilisateur non trouvé ou inactif' })
      return
    }
    req.user = { id: user.id, email: user.email, role: user.role, name: user.name }
    next()
  } catch {
    res.status(401).json({ error: 'Token invalide ou expiré' })
  }
}

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Accès refusé' })
      return
    }
    next()
  }
}
# 2025-11-13T09:15:00 - feat: authentification JWT - login et verification du token
# 2025-11-13T15:50:00 - feat: middleware de verification des roles (admin, teacher, student)
# 2025-11-13T09:15:00 - feat: authentification JWT - login et verification du token
# 2025-11-13T15:50:00 - feat: middleware de verification des roles (admin, teacher, student)
# 2025-11-13T09:15:00 - feat: authentification JWT - login et verification du token
# 2025-11-13T15:50:00 - feat: middleware de verification des roles (admin, teacher, student)
# 2025-11-13T09:15:00 - feat: authentification JWT - login et verification du token
# 2025-11-13T15:50:00 - feat: middleware de verification des roles (admin, teacher, student)
