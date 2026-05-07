import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { errorHandler } from './middleware/errorHandler'
import authRoutes from './routes/auth'
import studentsRoutes from './routes/students'
import teachersRoutes from './routes/teachers'
import inscriptionsRoutes from './routes/inscriptions'
import paymentsRoutes from './routes/payments'
import gradesRoutes from './routes/grades'
import scheduleRoutes from './routes/schedule'
import announcementsRoutes from './routes/announcements'
import statsRoutes from './routes/stats'
import contactRoutes from './routes/contact'

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))
app.use(compression())
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Trop de requêtes, veuillez réessayer plus tard.' },
})
app.use('/api', limiter)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/students', studentsRoutes)
app.use('/api/teachers', teachersRoutes)
app.use('/api/inscriptions', inscriptionsRoutes)
app.use('/api/payments', paymentsRoutes)
app.use('/api/grades', gradesRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/announcements', announcementsRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/contact', contactRoutes)

app.get('/api/healthz', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'École Canadienne API' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🏫 École Canadienne API démarrée sur http://localhost:${PORT}`)
})

export default app
# 2025-11-17T10:45:00 - feat: serveur Express - middleware, CORS, Helmet, rate limiting
# 2026-05-05T09:15:00 - feat: rate limiting sur les routes d'authentification
# 2026-05-06T11:00:00 - refactor: centralisation de la configuration dans index.ts
# 2026-05-07T10:30:00 - fix: CORS bloquait les requetes du frontend en developpement
# 2025-11-17T10:45:00 - feat: serveur Express - middleware, CORS, Helmet, rate limiting
# 2026-05-05T09:15:00 - feat: rate limiting sur les routes d'authentification
# 2026-05-06T11:00:00 - refactor: centralisation de la configuration dans index.ts
# 2026-05-07T10:30:00 - fix: CORS bloquait les requetes du frontend en developpement
# 2025-11-17T10:45:00 - feat: serveur Express - middleware, CORS, Helmet, rate limiting
# 2026-05-05T09:15:00 - feat: rate limiting sur les routes d'authentification
# 2026-05-06T11:00:00 - refactor: centralisation de la configuration dans index.ts
# 2026-05-07T10:30:00 - fix: CORS bloquait les requetes du frontend en developpement
# 2025-11-17T10:45:00 - feat: serveur Express - middleware, CORS, Helmet, rate limiting
# 2026-05-05T09:15:00 - feat: rate limiting sur les routes d'authentification
# 2026-05-06T11:00:00 - refactor: centralisation de la configuration dans index.ts
# 2026-05-07T10:30:00 - fix: CORS bloquait les requetes du frontend en developpement
