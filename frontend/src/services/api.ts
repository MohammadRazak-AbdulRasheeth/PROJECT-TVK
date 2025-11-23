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
    const baseUrl = API_BASE_URL.replace(/\/api$/, '') // Remove /api suffix
    const googleUrl = `${baseUrl}/auth/google`
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