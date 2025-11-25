import { Router, Request, Response } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { type, anneeScolaire, classeDemanee, specialites, nomEleve, prenomEleve,
      dateNaissance, lieuNaissance, sexe, nationalite, nomPere, prenomPere,
      professionPere, nomMere, prenomMere, professionMere, telephoneContact,
      emailContact, adresse, ancienneEcole, classeActuelle, montantInscription } = req.body

    const inscription = await prisma.inscription.create({
      data: {
        type, anneeScolaire, classeDemanee, specialites: specialites || [],
        nomEleve, prenomEleve, dateNaissance: new Date(dateNaissance),
        lieuNaissance, sexe, nationalite: nationalite || 'Congolaise',
        nomPere, prenomPere, professionPere,
        nomMere, prenomMere, professionMere,
        telephoneContact, emailContact, adresse,
        ancienneEcole, classeActuelle, statut: 'en_attente',
      },
    })

    if (montantInscription) {
      await prisma.payment.create({
        data: {
          montant: Number(montantInscription),
          type: type === 'reinscription' ? 'reinscription' : 'inscription',
          statut: 'en_attente',
          description: `${type === 'reinscription' ? 'Réinscription' : 'Inscription'} - ${classeDemanee} - ${nomEleve} ${prenomEleve}`,
          inscriptionId: inscription.id,
        },
      })
    }

    res.status(201).json({ inscription, message: 'Demande enregistrée avec succès' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.get('/', authenticate, authorize('admin'), async (_req: AuthRequest, res: Response) => {
  try {
    const inscriptions = await prisma.inscription.findMany({
      include: { payment: true, student: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ inscriptions })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

router.put('/:id/status', authenticate, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const { statut, notes } = req.body
    const inscription = await prisma.inscription.update({
      where: { id: req.params.id },
      data: { statut, notes },
    })
    res.json({ inscription })
  } catch { res.status(500).json({ error: 'Erreur serveur' }) }
})

export default router
# 2025-11-25T09:30:00 - feat: gestion des inscriptions - nouvelle inscription multi-etapes
# 2025-11-25T15:00:00 - feat: gestion des reinscriptions avec recherche de l'eleve
# 2025-11-25T09:30:00 - feat: gestion des inscriptions - nouvelle inscription multi-etapes
# 2025-11-25T15:00:00 - feat: gestion des reinscriptions avec recherche de l'eleve
# 2025-11-25T09:30:00 - feat: gestion des inscriptions - nouvelle inscription multi-etapes
# 2025-11-25T15:00:00 - feat: gestion des reinscriptions avec recherche de l'eleve
# 2025-11-25T09:30:00 - feat: gestion des inscriptions - nouvelle inscription multi-etapes
