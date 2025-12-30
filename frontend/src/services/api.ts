import { api } from '../utils/helpers'

// Get API base URL using Vite environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

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
    const googleUrl = `${API_BASE_URL}/auth/google`
    console.log('Redirecting to Google OAuth:', googleUrl)
    window.location.href = googleUrl
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
  },

  createSubscription: async (formData: FormData) => {
    const response = await api.post('/memberships/simple-subscription', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  getMembershipStatus: async () => {
    const response = await api.get('/memberships/status')
    return response.data
  },

  confirmPayment: async (sessionId: string) => {
    const response = await api.post('/memberships/confirm-payment', { sessionId })
    return response.data
  }
}

// Invoice services
export const invoiceService = {
  getMembershipInvoice: async (membershipId: string) => {
    const response = await api.get(`/invoices/membership/${membershipId}`)
    return response.data
  },

  getUserInvoices: async () => {
    const response = await api.get('/invoices/user')
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

// Community Member services
export const communityMemberService = {
  checkEmail: async (email: string) => {
    const response = await api.get(`/community/check-email?email=${encodeURIComponent(email)}`)
    return response.data
  },
  
  signup: async (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    city: string
    ageRange: string
    interests: string[]
    emailConsent: boolean
    smsConsent: boolean
  }) => {
    const response = await api.post('/community/signup', data)
    return response.data
  }
}