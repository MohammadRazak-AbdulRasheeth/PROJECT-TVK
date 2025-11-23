/**
 * Utility functions for the TVK Canada application
 */

import type { ContactFormData } from '../types'

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Axios instance for API calls
import axios from 'axios'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds timeout for mobile networks
  headers: {
    'Content-Type': 'application/json',
  },
  // Mobile-specific configurations
  withCredentials: false,
  maxRedirects: 3,
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  }
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { api }

/**
 * Validates an email address format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates a phone number (basic format)
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  return phone.length >= 10 && phoneRegex.test(phone)
}

/**
 * Validates contact form data
 */
export const validateContactForm = (data: ContactFormData): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required'
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (!data.subject.trim()) {
    errors.subject = 'Please select a subject'
  }

  if (!data.message.trim() || data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return errors
}

/**
 * Formats a date to readable format
 */
export const formatDate = (date: Date | string, locale = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Formats a date and time
 */
export const formatDateTime = (date: Date | string, locale = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Groups events by date
 */
export const groupEventsByDate = (events: any[]) => {
  return events.reduce((acc: Record<string, any[]>, event) => {
    const dateKey = formatDate(event.date)
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(event)
    return acc
  }, {})
}

/**
 * Generates a unique ID
 */
export const generateId = (prefix = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Converts a contact form submission to an object suitable for API calls
 */
export const serializeContactForm = (data: ContactFormData): Record<string, any> => {
  return {
    ...data,
    submittedAt: new Date().toISOString(),
  }
}

/**
 * Checks if a screen is mobile size
 */
export const isMobileScreen = (width: number = window.innerWidth): boolean => {
  return width < 768 // tablet breakpoint
}

/**
 * Scrolls smoothly to an element
 */
export const scrollToElement = (elementId: string, offset = 80): void => {
  const element = document.getElementById(elementId)
  if (element) {
    const yOffset = -offset
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

/**
 * Debounce function for event handlers
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Checks if an element is in viewport
 */
export const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Gets social media share URL
 */
export const getSocialShareUrl = (
  platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp',
  options: { text?: string; url?: string; hashtags?: string[] }
): string => {
  const { text = '', url = window.location.href, hashtags = [] } = options

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
        url
      )}&hashtags=${hashtags.join(',')}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    default:
      return '#'
  }
}
