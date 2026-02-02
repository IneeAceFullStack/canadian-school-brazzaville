import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err.message)
  if (process.env.NODE_ENV === 'development') console.error(err.stack)
  res.status(500).json({
    error: 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { details: err.message }),
  })
}
# 2025-11-17T16:30:00 - feat: gestionnaire d'erreurs global
# 2026-02-02T10:15:00 - refactor: amelioration des messages d'erreur API
# 2025-11-17T16:30:00 - feat: gestionnaire d'erreurs global
# 2026-02-02T10:15:00 - refactor: amelioration des messages d'erreur API
# 2025-11-17T16:30:00 - feat: gestionnaire d'erreurs global
# 2026-02-02T10:15:00 - refactor: amelioration des messages d'erreur API
# 2025-11-17T16:30:00 - feat: gestionnaire d'erreurs global
# 2026-02-02T10:15:00 - refactor: amelioration des messages d'erreur API
