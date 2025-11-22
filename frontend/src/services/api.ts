import { api, API_BASE_URL } from '../utils/helpers'

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password })
    return response.data
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },
  
  googleLogin: () => {
    window.location.href = `${API_BASE_URL}/auth/google`
  }
}

// Membership services
export const membershipService = {
  getPlans: async () => {
    const response = await api.get('/memberships/plans')
    return response.data
  },
  
  subscribe: async (planId: string) => {
    const response = await api.post('/memberships/subscribe', { planId })
    return response.data
  }
}

// Event services
export const eventService = {
  getEvents: async () => {
    const response = await api.get('/events')
    return response.data
  },
  
  rsvp: async (eventId: string) => {
    const response = await api.post(`/events/${eventId}/rsvp`)
    return response.data
  }
}

// Gallery services
export const galleryService = {
  getGallery: async () => {
    const response = await api.get('/gallery')
    return response.data
  }
}

// Contact services
export const contactService = {
  submitForm: async (data: any) => {
    const response = await api.post('/contact/submit', data)
    return response.data
  }
}

// Global Network services
export const globalNetworkService = {
  getGroups: async () => {
    const response = await api.get('/global-network/groups')
    return response.data
  }
}