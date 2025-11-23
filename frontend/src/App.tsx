/**
 * Main App component with React Router setup
 */

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '@styles/GlobalStyles'
import { theme } from '@styles/theme'
import { MembershipProvider } from '@context/MembershipContext'
import { AuthProvider } from '@context/AuthContext'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { HomePage } from '@pages/Home'
import { AboutPage } from '@pages/About'
import { MembershipPage } from '@pages/Membership'
import { MembershipDashboard } from '@pages/MembershipDashboard'
import { PaymentSuccessPage } from '@pages/PaymentSuccess'
import { EventsPage } from '@pages/Events'
import { GlobalNetworkPage } from '@pages/GlobalNetwork'
import { GalleryPage } from '@pages/Gallery'
import { ContactPage } from '@pages/Contact'

/**
 * Scroll to top on route change component
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return null
}

/**
 * App Component - Main application shell with routing
 */
export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <MembershipProvider>
          <Router>
            <ScrollToTop />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/membership" element={<MembershipPage />} />
                  <Route path="/my-membership" element={<MembershipDashboard />} />
                  <Route path="/payment-success" element={<PaymentSuccessPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/global-network" element={<GlobalNetworkPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<div style={{ padding: '40px', textAlign: 'center' }}>
                    <h1>404 - Page Not Found</h1>
                  </div>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </MembershipProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
