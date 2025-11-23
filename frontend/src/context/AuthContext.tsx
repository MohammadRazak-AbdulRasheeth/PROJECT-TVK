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
        const response = await authService.getProfile()
        setUser(response.user)
      }
    } catch (error) {
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

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    googleLogin,
    checkAuthStatus
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