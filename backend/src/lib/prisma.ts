import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
# 2025-11-08T11:15:00 - feat: configuration Prisma et connexion PostgreSQL
# 2025-11-08T11:15:00 - feat: configuration Prisma et connexion PostgreSQL
# 2025-11-08T11:15:00 - feat: configuration Prisma et connexion PostgreSQL
# 2025-11-08T11:15:00 - feat: configuration Prisma et connexion PostgreSQL
