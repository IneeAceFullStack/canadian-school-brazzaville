/// <reference types="vite/client" />
import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || '') + '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/connexion'
    }
    return Promise.reject(err)
  }
)

export default api

export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
  changePassword: (data: { currentPassword: string; newPassword: string }) => api.put('/auth/change-password', data),
}

export const studentsAPI = {
  list: (params?: Record<string, string>) => api.get('/students', { params }),
  get: (id: string) => api.get(`/students/${id}`),
  create: (data: Record<string, unknown>) => api.post('/students', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/students/${id}`, data),
  delete: (id: string) => api.delete(`/students/${id}`),
  search: (params: Record<string, string>) => api.get('/students/search/by-name', { params }),
}

export const teachersAPI = {
  list: () => api.get('/teachers'),
  get: (id: string) => api.get(`/teachers/${id}`),
  create: (data: Record<string, unknown>) => api.post('/teachers', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/teachers/${id}`, data),
  delete: (id: string) => api.delete(`/teachers/${id}`),
}

export const paymentsAPI = {
  list: (params?: Record<string, string>) => api.get('/payments', { params }),
  create: (data: Record<string, unknown>) => api.post('/payments', data),
  confirm: (id: string, data?: Record<string, string>) => api.put(`/payments/${id}/confirm`, data),
  refuse: (id: string) => api.put(`/payments/${id}/refuse`),
  stats: () => api.get('/payments/stats'),
}

export const gradesAPI = {
  list: (params?: Record<string, string>) => api.get('/grades', { params }),
  create: (data: Record<string, unknown>) => api.post('/grades', data),
  bulk: (grades: Record<string, unknown>[]) => api.post('/grades/bulk', { grades }),
  update: (id: string, data: Record<string, unknown>) => api.put(`/grades/${id}`, data),
  delete: (id: string) => api.delete(`/grades/${id}`),
}

export const scheduleAPI = {
  list: (params?: Record<string, string>) => api.get('/schedule', { params }),
  create: (data: Record<string, unknown>) => api.post('/schedule', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/schedule/${id}`, data),
  delete: (id: string) => api.delete(`/schedule/${id}`),
}

export const announcementsAPI = {
  public: () => api.get('/announcements/public'),
  list: () => api.get('/announcements'),
  create: (data: Record<string, unknown>) => api.post('/announcements', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/announcements/${id}`, data),
  delete: (id: string) => api.delete(`/announcements/${id}`),
}

export const inscriptionsAPI = {
  create: (data: Record<string, unknown>) => api.post('/inscriptions', data),
  list: () => api.get('/inscriptions'),
  updateStatus: (id: string, data: { statut: string; notes?: string }) => api.put(`/inscriptions/${id}/status`, data),
}

export const statsAPI = {
  get: () => api.get('/stats'),
}

export const contactAPI = {
  send: (data: Record<string, string>) => api.post('/contact', data),
  list: () => api.get('/contact'),
}
