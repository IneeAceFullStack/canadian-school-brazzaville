import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

import PublicLayout from './components/layout/PublicLayout'
import AdminLayout from './components/layout/AdminLayout'
import StudentLayout from './components/layout/StudentLayout'
import TeacherLayout from './components/layout/TeacherLayout'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProgramsPage from './pages/ProgramsPage'
import InscriptionPage from './pages/InscriptionPage'
import ReinscriptionPage from './pages/ReinscriptionPage'
import VieScolairePage from './pages/VieScolairePage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/auth/LoginPage'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminTeachers from './pages/admin/AdminTeachers'
import AdminPayments from './pages/admin/AdminPayments'
import AdminGrades from './pages/admin/AdminGrades'
import AdminSchedule from './pages/admin/AdminSchedule'
import AdminAnnouncements from './pages/admin/AdminAnnouncements'
import AdminInscriptions from './pages/admin/AdminInscriptions'

import StudentDashboard from './pages/student/StudentDashboard'
import StudentGrades from './pages/student/StudentGrades'
import StudentSchedule from './pages/student/StudentSchedule'

import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherGrades from './pages/teacher/TeacherGrades'

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent" /></div>
  if (!user) return <Navigate to="/connexion" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/programmes" element={<ProgramsPage />} />
            <Route path="/inscription" element={<InscriptionPage />} />
            <Route path="/reinscription" element={<ReinscriptionPage />} />
            <Route path="/vie-scolaire" element={<VieScolairePage />} />
            <Route path="/actualites" element={<BlogPage />} />
            <Route path="/actualites/:id" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          <Route path="/connexion" element={<LoginPage />} />

          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="eleves" element={<AdminStudents />} />
            <Route path="enseignants" element={<AdminTeachers />} />
            <Route path="paiements" element={<AdminPayments />} />
            <Route path="notes" element={<AdminGrades />} />
            <Route path="emploi-du-temps" element={<AdminSchedule />} />
            <Route path="annonces" element={<AdminAnnouncements />} />
            <Route path="inscriptions" element={<AdminInscriptions />} />
          </Route>

          <Route path="/eleve" element={<ProtectedRoute roles={['student']}><StudentLayout /></ProtectedRoute>}>
            <Route index element={<StudentDashboard />} />
            <Route path="notes" element={<StudentGrades />} />
            <Route path="emploi-du-temps" element={<StudentSchedule />} />
          </Route>

          <Route path="/professeur" element={<ProtectedRoute roles={['teacher']}><TeacherLayout /></ProtectedRoute>}>
            <Route index element={<TeacherDashboard />} />
            <Route path="notes" element={<TeacherGrades />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
