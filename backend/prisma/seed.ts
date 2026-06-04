import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const adminPwd = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecole.cg' },
    update: {},
    create: { email: 'admin@ecole.cg', password: adminPwd, name: 'Directeur Admin', role: 'admin' },
  })

  const teacherPwd = await bcrypt.hash('prof123', 12)
  const teacherUser = await prisma.user.upsert({
    where: { email: 'prof@ecole.cg' },
    update: {},
    create: { email: 'prof@ecole.cg', password: teacherPwd, name: 'MOUKASSA Jean-Baptiste', role: 'teacher' },
  })

  const studentPwd = await bcrypt.hash('eleve123', 12)
  const studentUser = await prisma.user.upsert({
    where: { email: 'eleve@ecole.cg' },
    update: {},
    create: { email: 'eleve@ecole.cg', password: studentPwd, name: 'MBEMBA Jean-Paul', role: 'student' },
  })

  await prisma.teacher.upsert({
    where: { email: 'jb.moukassa@ecole.cg' },
    update: {},
    create: {
      nom: 'MOUKASSA', prenom: 'Jean-Baptiste',
      email: 'jb.moukassa@ecole.cg', telephone: '+242 06 111 2222',
      matieres: ['Mathématiques', 'Physique-Chimie'],
      classes: ['Terminale S', '1ère S', '3ème'],
      experience: '12 ans', statut: 'actif', userId: teacherUser.id,
    },
  })

  const parent = await prisma.parent.create({
    data: {
      nom: 'MBEMBA', prenom: 'Pierre',
      telephone: '+242 06 123 4567', email: 'pierre.mbemba@gmail.com',
      adresse: 'Avenue de la Paix, Brazzaville', lienParente: 'pere',
    },
  })

  const student1 = await prisma.student.upsert({
    where: { idVie: 'ECO-2024-001' },
    update: {},
    create: {
      idVie: 'ECO-2024-001', nomComplet: 'MBEMBA Jean-Paul',
      dateNaissance: new Date('2010-05-12'), lieuNaissance: 'Brazzaville',
      sexe: 'M', nationalite: 'Congolaise', classeActuelle: '3ème',
      anneeScolaire: '2024-2025', statut: 'actif',
      parentId: parent.id, userId: studentUser.id,
    },
  })

  const studentsData = [
    { idVie: 'ECO-2024-002', nomComplet: 'BOUANGA Marie', dateNaissance: new Date('2007-03-20'), lieuNaissance: 'Pointe-Noire', sexe: 'F' as const, classeActuelle: 'Terminale' },
    { idVie: 'ECO-2024-003', nomComplet: 'NGANGA Christelle', dateNaissance: new Date('2008-09-15'), lieuNaissance: 'Brazzaville', sexe: 'F' as const, classeActuelle: '1ère' },
    { idVie: 'ECO-2024-004', nomComplet: 'MOUKASSA Éric', dateNaissance: new Date('2014-01-08'), lieuNaissance: 'Brazzaville', sexe: 'M' as const, classeActuelle: 'CM2' },
    { idVie: 'ECO-2023-015', nomComplet: 'NKOUNKOU Patrick', dateNaissance: new Date('2013-07-22'), lieuNaissance: 'Brazzaville', sexe: 'M' as const, classeActuelle: '6ème' },
    { idVie: 'ECO-2024-006', nomComplet: 'BIYELA Aurélie', dateNaissance: new Date('2009-11-30'), lieuNaissance: 'Dolisie', sexe: 'F' as const, classeActuelle: '2nde' },
  ]

  for (const s of studentsData) {
    await prisma.student.upsert({
      where: { idVie: s.idVie },
      update: {},
      create: { ...s, nationalite: 'Congolaise', anneeScolaire: '2024-2025', statut: 'actif', parentId: parent.id },
    })
  }

  await prisma.grade.createMany({
    skipDuplicates: true,
    data: [
      { matiere: 'Mathématiques', note: 14.5, noteMax: 20, coefficient: 4, trimestre: 'T1', studentId: student1.id },
      { matiere: 'Français', note: 12, noteMax: 20, coefficient: 4, trimestre: 'T1', studentId: student1.id },
      { matiere: 'Sciences Physiques', note: 16, noteMax: 20, coefficient: 3, trimestre: 'T1', studentId: student1.id },
      { matiere: 'Histoire-Géographie', note: 13, noteMax: 20, coefficient: 3, trimestre: 'T1', studentId: student1.id },
      { matiere: 'Anglais', note: 15, noteMax: 20, coefficient: 2, trimestre: 'T1', studentId: student1.id },
      { matiere: 'EPS', note: 18, noteMax: 20, coefficient: 1, trimestre: 'T1', studentId: student1.id },
    ],
  })

  await prisma.schedule.createMany({
    skipDuplicates: true,
    data: [
      { jour: 'Lundi', heureDebut: '07:30', heureFin: '09:30', matiere: 'Mathématiques', classe: '3ème', salle: 'Salle 101' },
      { jour: 'Lundi', heureDebut: '09:30', heureFin: '11:30', matiere: 'Français', classe: '3ème', salle: 'Salle 102' },
      { jour: 'Lundi', heureDebut: '13:00', heureFin: '15:00', matiere: 'Histoire-Géo', classe: '3ème', salle: 'Salle 103' },
      { jour: 'Mardi', heureDebut: '07:30', heureFin: '09:30', matiere: 'Sciences Physiques', classe: '3ème', salle: 'Labo Sci.' },
      { jour: 'Mardi', heureDebut: '09:30', heureFin: '11:30', matiere: 'Anglais', classe: '3ème', salle: 'Salle 104' },
      { jour: 'Mercredi', heureDebut: '07:30', heureFin: '09:30', matiere: 'Mathématiques', classe: '3ème', salle: 'Salle 101' },
      { jour: 'Jeudi', heureDebut: '07:30', heureFin: '09:30', matiere: 'SVT', classe: '3ème', salle: 'Labo Sci.' },
      { jour: 'Jeudi', heureDebut: '09:30', heureFin: '11:30', matiere: 'Français', classe: '3ème', salle: 'Salle 102' },
      { jour: 'Vendredi', heureDebut: '07:30', heureFin: '09:30', matiere: 'EPS', classe: '3ème', salle: 'Terrain' },
      { jour: 'Vendredi', heureDebut: '09:30', heureFin: '11:30', matiere: 'Éducation Civique', classe: '3ème', salle: 'Salle 105' },
    ],
  })

  await prisma.announcement.createMany({
    skipDuplicates: true,
    data: [
      { titre: 'Réunion parents-professeurs', contenu: 'La réunion parents-professeurs du premier trimestre aura lieu le samedi 20 septembre 2025 à 9h00 dans le préau de l\'école.', destinataire: 'Tous', priorite: 'haute', authorId: admin.id },
      { titre: 'Ouverture des inscriptions 2025–2026', contenu: 'Les inscriptions pour la prochaine année scolaire sont désormais ouvertes en ligne et à l\'administration.', destinataire: 'Tous', priorite: 'normale', authorId: admin.id },
      { titre: 'Concours inter-scolaire de mathématiques', contenu: 'Les élèves de lycée peuvent s\'inscrire au concours de mathématiques. Dossier avant le 30 novembre.', destinataire: 'Lycée', priorite: 'normale', authorId: admin.id },
    ],
  })

  await prisma.payment.createMany({
    skipDuplicates: true,
    data: [
      { montant: 150000, type: 'inscription', statut: 'confirme', modePaiement: 'Espèces', description: 'Frais d\'inscription 2024-2025 - MBEMBA Jean-Paul', studentId: student1.id },
      { montant: 75000, type: 'frais_scolaires', statut: 'en_attente', description: 'Frais scolaires T1 2024-2025 - MBEMBA Jean-Paul', studentId: student1.id },
    ],
  })

  console.log('✅ Seed terminé !')
  console.log('   admin@ecole.cg / admin123')
  console.log('   prof@ecole.cg / prof123')
  console.log('   eleve@ecole.cg / eleve123')
}

main().catch(console.error).finally(() => prisma.$disconnect())
# 2026-01-15T10:30:00 - feat: seed de la base de donnees avec comptes de demonstration
# 2026-01-16T09:00:00 - fix: le seed echouait si la base n'etait pas vide
# 2026-06-04T10:00:00 - fix: le seed inserait des doublons si relance plusieurs fois
# 2026-01-15T10:30:00 - feat: seed de la base de donnees avec comptes de demonstration
# 2026-01-16T09:00:00 - fix: le seed echouait si la base n'etait pas vide
# 2026-06-04T10:00:00 - fix: le seed inserait des doublons si relance plusieurs fois
# 2026-01-15T10:30:00 - feat: seed de la base de donnees avec comptes de demonstration
# 2026-01-16T09:00:00 - fix: le seed echouait si la base n'etait pas vide
# 2026-06-04T10:00:00 - fix: le seed inserait des doublons si relance plusieurs fois
# 2026-01-15T10:30:00 - feat: seed de la base de donnees avec comptes de demonstration
# 2026-01-16T09:00:00 - fix: le seed echouait si la base n'etait pas vide
# 2026-06-04T10:00:00 - fix: le seed inserait des doublons si relance plusieurs fois
