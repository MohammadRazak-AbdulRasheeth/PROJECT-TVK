/**
 * Authentication Context for TVK Canada
 * Manages user authentication state and login flow
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../services/api'

interface Membership {
  type?: 'monthly' | 'yearly' | 'student'
  status?: 'active' | 'pending' | 'expired' | 'cancelled'
  membershipNumber?: string
  expiresAt?: string
  hasActiveMembership: boolean
}

interface User {
  id: string
  name: string
  email: string
  isVerified: boolean
  createdAt: string
  membership?: Membership
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  googleLogin: () => void
  checkAuthStatus: () => void
  hasValidToken: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const normalizeUser = (raw: any): User => {
    if (!raw || typeof raw !== 'object') {
      return {
        id: 'unknown',
        name: 'Member',
        email: 'member@example.com',
        isVerified: false,
        createdAt: new Date().toISOString(),
        membership: { hasActiveMembership: false }
      }
    }
    
    // Try multiple name sources and clean them
    let nameSource = ''
    if (raw.name && typeof raw.name === 'string') {
      nameSource = raw.name.trim()
    } else if (raw.firstName || raw.lastName) {
      nameSource = `${raw.firstName || ''} ${raw.lastName || ''}`.trim()
    } else if (raw.given_name || raw.family_name) {
      nameSource = `${raw.given_name || ''} ${raw.family_name || ''}`.trim()
    }
    
    // Filter out bad names
    const isBadName = !nameSource || 
                      nameSource.includes('undefined') || 
                      nameSource.includes('null') || 
                      nameSource === 'null null' ||
                      nameSource.trim() === ''
    const fallbackName = raw.email?.split('@')[0] || 'Member'
    
    return {
      id: raw.id || raw._id || raw.sub || 'unknown',
      name: isBadName ? fallbackName : nameSource,
      email: raw.email || 'member@example.com',
      isVerified: !!raw.isVerified || !!raw.email_verified,
      createdAt: raw.createdAt || new Date().toISOString(),
      membership: raw.membership || { hasActiveMembership: false }
    }
  }

  const checkAuthStatus = async () => {
    try {
      // Check for token in URL first (from Google OAuth redirect)
      const urlParams = new URLSearchParams(window.location.search)
      const urlToken = urlParams.get('token')
      
      if (urlToken) {
        localStorage.setItem('token', urlToken)
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }

      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await authService.getProfile()
          const normalized = normalizeUser(response)
          setUser(normalized)
          console.log('Auth check successful - Raw:', response)
          console.log('Auth check successful - Normalized:', normalized)
        } catch (error: any) {
          console.log('Profile fetch failed:', error.response?.status)
          // If token is invalid (401, 403), clear it and user state
          if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token')
            setUser(null)
          } else {
            // For other errors, attempt graceful degradation using token payload
            try {
              const payloadRaw = token.split('.')[1]
              const payloadJson = atob(payloadRaw.replace(/-/g, '+').replace(/_/g, '/'))
              const payload = JSON.parse(payloadJson)
              
              const derivedName = payload.name || [payload.given_name, payload.family_name].filter(Boolean).join(' ') || 'Member'
              const derivedEmail = payload.email || 'user@example.com'
              
              if (payload.id || payload.sub) {
                const fallbackUser = normalizeUser(payload)
                setUser(fallbackUser)
              }
            } catch (tokenError) {
              console.log('Token decode failed:', tokenError)
              localStorage.removeItem('token')
              setUser(null)
            }
          }
        }
      } else {
        console.log('No token found')
        setUser(null)
      }
    } catch (error) {
      console.log('Auth check error:', error)
      // Token is invalid, clear it
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authService.login(email, password)
      localStorage.setItem('token', response.token)
      setUser(response.user)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear all authentication-related localStorage items
    localStorage.removeItem('token')
    localStorage.removeItem('loginCallback')
    localStorage.removeItem('redirectPath')
    
    // Clear user state
    setUser(null)
    
    console.log('User logged out - all tokens and auth data cleared')
  }

  const googleLogin = () => {
    // Store current location for redirect after login
    localStorage.setItem('redirectPath', window.location.pathname + window.location.search)
    authService.googleLogin()
  }

  const hasValidToken = (): boolean => {
    const token = localStorage.getItem('token')
    if (!token) return false
    
    try {
      // Check if JWT token is valid and not expired
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      
      // Check if token has expiration and if it's not expired
      if (payload.exp && payload.exp < currentTime) {
        localStorage.removeItem('token')
        return false
      }
      
      return true
    } catch (error) {
      localStorage.removeItem('token')
      return false
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user || hasValidToken(),
    isLoading,
    login,
    logout,
    googleLogin,
    checkAuthStatus,
    hasValidToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}