import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) { setLoading(false); return }
    try {
      const { data } = await api.get('/auth/me')
      setUser(data.user)
    } catch {
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchMe() }, [fetchMe])

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
# 2025-11-18T09:30:00 - feat: page de connexion avec formulaire et gestion des roles
# 2026-01-13T09:15:00 - fix: redirection incorrecte apres login selon le role
# 2026-05-13T11:00:00 - feat: protection des routes privees - redirection si non connecte
# 2026-05-14T10:00:00 - fix: l'utilisateur restait connecte apres expiration du token
# 2025-11-18T09:30:00 - feat: page de connexion avec formulaire et gestion des roles
# 2026-01-13T09:15:00 - fix: redirection incorrecte apres login selon le role
# 2026-05-13T11:00:00 - feat: protection des routes privees - redirection si non connecte
# 2026-05-14T10:00:00 - fix: l'utilisateur restait connecte apres expiration du token
# 2025-11-18T09:30:00 - feat: page de connexion avec formulaire et gestion des roles
# 2026-01-13T09:15:00 - fix: redirection incorrecte apres login selon le role
# 2026-05-13T11:00:00 - feat: protection des routes privees - redirection si non connecte
# 2026-05-14T10:00:00 - fix: l'utilisateur restait connecte apres expiration du token
# 2025-11-18T09:30:00 - feat: page de connexion avec formulaire et gestion des roles
