/**
 * Authentication Context for TVK Canada
 * Manages user authentication state and login flow
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../services/api'

interface User {
  id: string
  name: string
  email: string
  isVerified: boolean
  createdAt: string
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
          setUser(response.user)
          console.log('Auth check successful:', response.user)
        } catch (error: any) {
          console.log('Profile fetch failed:', error.response?.status)
          // If token is invalid (401, 403), clear it and user state
          if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token')
            setUser(null)
          } else {
            // For other errors, keep the token and try to extract user info from token
            try {
              // Decode JWT token to get basic user info (if available)
              const payload = JSON.parse(atob(token.split('.')[1]))
              console.log('Token payload:', payload)
              
              // Create basic user object from token if profile fetch fails
              if (payload.id) {
                setUser({
                  id: payload.id,
                  name: 'User', // Placeholder
                  email: 'user@example.com', // Placeholder
                  isVerified: false,
                  createdAt: new Date().toISOString()
                })
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
    localStorage.removeItem('token')
    setUser(null)
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