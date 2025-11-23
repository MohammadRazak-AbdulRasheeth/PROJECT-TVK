/**
 * Premium Membership Dashboard Component - Impressive Design
 */

import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section } from '@components/Layout'
import { Button } from '@components/Button'
import { membershipService } from '../services/api'

interface MembershipData {
  id: string
  type: 'monthly' | 'yearly' | 'student'
  status: 'active' | 'pending' | 'expired' | 'cancelled'
  activatedAt?: string
  expiresAt?: string
  nextBillingDate?: string
  membershipNumber?: string
  digitalCardUrl?: string
  verificationStatus?: 'pending' | 'approved' | 'rejected'
  rejectionReason?: string
  firstName?: string
  lastName?: string
  email?: string
}

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

// Enhanced Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: 
    radial-gradient(circle at 20% 80%, rgba(196, 30, 58, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, 
      ${theme.colors.background} 0%, 
      #f8f9fa 50%, 
      ${theme.colors.background} 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(135deg, 
      rgba(196, 30, 58, 0.1) 0%, 
      rgba(255, 215, 0, 0.05) 50%,
      transparent 100%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%);
    z-index: 0;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`

const WelcomeSection = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxxl} 0;
  margin-bottom: ${theme.spacing.xl};

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${theme.spacing.lg};
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.text.secondary};
    font-weight: ${theme.typography.fontWeight.medium};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl} 0;
    
    h1 {
      font-size: ${theme.typography.fontSize['3xl']};
    }
    
    .subtitle {
      font-size: ${theme.typography.fontSize.lg};
    }
  }
`

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: ${shimmer} 2s infinite;
  }

  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background: linear-gradient(135deg, ${theme.colors.success} 0%, #4CAF50 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        `
      case 'pending':
        return `
          background: linear-gradient(135deg, ${theme.colors.warning} 0%, #FF9800 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
          animation: ${pulse} 2s infinite;
        `
      case 'expired':
      case 'cancelled':
        return `
          background: linear-gradient(135deg, ${theme.colors.error} 0%, #F44336 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
        `
      default:
        return `
          background: ${theme.colors.border};
          color: ${theme.colors.text.secondary};
        `
    }
  }}
`

const PremiumCard = styled.div`
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(255, 255, 255, 0.85) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius['3xl']};
  padding: ${theme.spacing.xxxl};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.08),
    0 15px 30px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  transition: all ${theme.transitions.base};
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 35px 70px rgba(0, 0, 0, 0.12),
      0 20px 40px rgba(0, 0, 0, 0.06);
    border-color: rgba(196, 30, 58, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 50%, ${theme.colors.primary} 100%);
    border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 8s ease-in-out infinite;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.lg};
  }
`

const MembershipCard = styled.div`
  background: linear-gradient(135deg, 
    ${theme.colors.primary} 0%, 
    #8b1428 50%, 
    #2d0a0e 100%);
  color: ${theme.colors.text.inverse};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xxxl};
  margin: ${theme.spacing.xl} 0;
  position: relative;
  overflow: hidden;
  min-height: 200px;
  animation: ${float} 6s ease-in-out infinite;
  box-shadow: 
    0 20px 40px rgba(196, 30, 58, 0.3),
    0 10px 20px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(255, 215, 0, 0.15) 0%,
      rgba(255, 215, 0, 0.05) 40%,
      transparent 70%
    );
    animation: ${float} 8s ease-in-out infinite reverse;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -30%;
    width: 150%;
    height: 150%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 60%
    );
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${theme.spacing.xl};
    position: relative;
    z-index: 2;

    h3 {
      margin: 0;
      font-size: ${theme.typography.fontSize['2xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .logo {
      font-size: ${theme.typography.fontSize['2xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.secondary};
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      background: rgba(255, 215, 0, 0.2);
      border-radius: ${theme.borderRadius.lg};
      border: 2px solid ${theme.colors.secondary};
    }
  }

  .member-info {
    position: relative;
    z-index: 2;

    .member-number {
      font-size: ${theme.typography.fontSize['2xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      letter-spacing: 3px;
      margin-bottom: ${theme.spacing.md};
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      color: ${theme.colors.secondary};
    }

    .member-since {
      font-size: ${theme.typography.fontSize.base};
      opacity: 0.9;
      font-weight: ${theme.typography.fontWeight.medium};
    }

    .member-name {
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.semibold};
      margin-bottom: ${theme.spacing.sm};
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl};
    
    .card-header {
      flex-direction: column;
      gap: ${theme.spacing.md};
      
      .logo {
        align-self: flex-end;
      }
    }
    
    .member-info {
      .member-number {
        font-size: ${theme.typography.fontSize.xl};
        letter-spacing: 2px;
      }
    }
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  text-align: center;
  transition: all ${theme.transitions.base};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  }

  .stat-label {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    font-weight: ${theme.typography.fontWeight.semibold};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${theme.spacing.xs};
  }

  .stat-value {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.xs};
  }

  .stat-extra {
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
  }
`

const PerksList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`

const PerkCard = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 255, 255, 0.7) 100%);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-align: center;
  transition: all ${theme.transitions.base};
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out var(--delay, 0s) both;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(196, 30, 58, 0.15),
      0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: ${theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
    transform: scaleX(0);
    transition: transform ${theme.transitions.base};
  }

  &:hover::before {
    transform: scaleX(1);
  }

  .icon {
    font-size: 3rem;
    margin-bottom: ${theme.spacing.lg};
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    animation: ${float} 4s ease-in-out infinite;
    animation-delay: var(--icon-delay, 0s);
  }

  h4 {
    color: ${theme.colors.primary};
    margin: 0 0 ${theme.spacing.md} 0;
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin: 0;
    font-size: ${theme.typography.fontSize.base};
    line-height: 1.6;
    font-weight: ${theme.typography.fontWeight.medium};
  }
`

const ActionSection = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
  margin: ${theme.spacing.xxxl} 0 ${theme.spacing.xl} 0;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`

const EnhancedButton = styled(Button)`
  position: relative;
  overflow: hidden;
  font-weight: ${theme.typography.fontWeight.bold};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  min-width: 180px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  gap: ${theme.spacing.lg};

  .spinner {
    width: 60px;
    height: 60px;
    border: 4px solid ${theme.colors.border};
    border-top: 4px solid ${theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    font-weight: ${theme.typography.fontWeight.medium};
    animation: ${pulse} 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const ErrorCard = styled(PremiumCard)`
  border-left: 4px solid ${theme.colors.error};
  background: linear-gradient(135deg, 
    rgba(244, 67, 54, 0.05) 0%, 
    rgba(255, 255, 255, 0.95) 100%);

  h2 {
    color: ${theme.colors.error};
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.base};
    line-height: 1.6;
  }
`

export const MembershipDashboard: React.FC = () => {
  const [membershipData, setMembershipData] = useState<MembershipData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMembershipData()
  }, [])

  const fetchMembershipData = async () => {
    try {
      const data = await membershipService.getMembershipStatus()
      setMembershipData(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load membership data')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadCard = async () => {
    if (membershipData?.digitalCardUrl) {
      window.open(membershipData.digitalCardUrl, '_blank')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysRemaining = (expiresAt: string) => {
    const today = new Date()
    const expiryDate = new Date(expiresAt)
    const timeDiff = expiryDate.getTime() - today.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return daysDiff
  }

  const formatDaysRemaining = (expiresAt: string) => {
    const days = getDaysRemaining(expiresAt)
    if (days < 0) return 'Expired'
    if (days === 0) return 'Expires today'
    if (days === 1) return '1 day remaining'
    if (days <= 30) return `${days} days remaining`
    if (days <= 365) {
      const months = Math.floor(days / 30)
      return months === 1 ? '1 month remaining' : `${months} months remaining`
    }
    const years = Math.floor(days / 365)
    return years === 1 ? '1 year remaining' : `${years} years remaining`
  }

  const getMembershipPerks = (type: string) => {
    const basePerks = [
      { 
        icon: '🎟️', 
        title: 'Priority Event Access', 
        description: 'Early access to all TVK events with reserved seating and exclusive member sections',
        delay: '0.1s',
        iconDelay: '0s'
      },
      { 
        icon: '💰', 
        title: 'Exclusive Discounts', 
        description: 'Special member rates at partner restaurants, shops, and entertainment venues',
        delay: '0.2s',
        iconDelay: '0.5s'
      },
      { 
        icon: '💬', 
        title: 'VIP Community', 
        description: 'Access to private member forums, networking events, and exclusive discussions',
        delay: '0.3s',
        iconDelay: '1s'
      },
      { 
        icon: '📰', 
        title: 'Premium Content', 
        description: 'Monthly newsletters, behind-the-scenes content, and member-only announcements',
        delay: '0.4s',
        iconDelay: '1.5s'
      }
    ]

    if (type === 'student') {
      return [
        ...basePerks,
        { 
          icon: '📚', 
          title: 'Study Networks', 
          description: 'Connect with fellow students, join study groups, and access academic resources',
          delay: '0.5s',
          iconDelay: '2s'
        },
        { 
          icon: '🎬', 
          title: 'Student Events', 
          description: 'Free movie screenings, cultural events, and student-only gatherings',
          delay: '0.6s',
          iconDelay: '2.5s'
        }
      ]
    }

    if (type === 'yearly') {
      return [
        ...basePerks,
        { 
          icon: '🏆', 
          title: 'VIP Treatment', 
          description: 'Premium seating, backstage access, and meet-and-greet opportunities at major events',
          delay: '0.5s',
          iconDelay: '2s'
        },
        { 
          icon: '🎁', 
          title: 'Exclusive Gifts', 
          description: 'Annual premium merchandise, limited edition items, and celebration packages',
          delay: '0.6s',
          iconDelay: '2.5s'
        }
      ]
    }

    return basePerks
  }

  if (loading) {
    return (
      <DashboardContainer>
        <Section>
          <Container>
            <LoadingScreen>
              <div className="spinner"></div>
              <div className="loading-text">Loading your premium membership...</div>
            </LoadingScreen>
          </Container>
        </Section>
      </DashboardContainer>
    )
  }

  if (error) {
    return (
      <DashboardContainer>
        <Section>
          <Container>
            <ContentWrapper>
              <ErrorCard>
                <h2>Unable to Load Membership</h2>
                <p>{error}</p>
                <ActionSection>
                  <EnhancedButton variant="primary" onClick={fetchMembershipData}>
                    Try Again
                  </EnhancedButton>
                  <EnhancedButton variant="outline" onClick={() => window.location.href = '/contact'}>
                    Contact Support
                  </EnhancedButton>
                </ActionSection>
              </ErrorCard>
            </ContentWrapper>
          </Container>
        </Section>
      </DashboardContainer>
    )
  }

  if (!membershipData) {
    return (
      <DashboardContainer>
        <Section>
          <Container>
            <ContentWrapper>
              <WelcomeSection>
                <h1>Join TVK Canada Today</h1>
                <div className="subtitle">Unlock exclusive benefits and connect with our amazing community</div>
              </WelcomeSection>
              
              <PremiumCard>
                <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>No Active Membership</h2>
                <p style={{ textAlign: 'center', fontSize: theme.typography.fontSize.lg, marginBottom: theme.spacing.xl }}>
                  You don't have an active membership yet. Join TVK Canada to access exclusive benefits, 
                  premium events, and connect with fellow fans across Canada!
                </p>
                <ActionSection>
                  <EnhancedButton variant="primary" onClick={() => window.location.href = '/membership'}>
                    View Membership Plans
                  </EnhancedButton>
                  <EnhancedButton variant="outline" onClick={() => window.location.href = '/about'}>
                    Learn More
                  </EnhancedButton>
                </ActionSection>
              </PremiumCard>
            </ContentWrapper>
          </Container>
        </Section>
      </DashboardContainer>
    )
  }

  return (
    <DashboardContainer>
      <Section>
        <Container>
          <ContentWrapper>
            <WelcomeSection>
              <h1>Welcome Back, {membershipData.firstName || 'Member'}!</h1>
              <div className="subtitle">Your Premium TVK Canada Experience</div>
            </WelcomeSection>

            <PremiumCard>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: theme.spacing.xl,
                flexWrap: 'wrap',
                gap: theme.spacing.md
              }}>
                <h2 style={{ 
                  margin: 0, 
                  textTransform: 'capitalize',
                  fontSize: theme.typography.fontSize['2xl'],
                  background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {membershipData.type} Membership
                </h2>
                <StatusBadge status={membershipData.status}>
                  ✨ {membershipData.status}
                </StatusBadge>
              </div>

              {membershipData.status === 'pending' && membershipData.verificationStatus === 'pending' && (
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)', 
                  border: `2px solid ${theme.colors.warning}`,
                  padding: theme.spacing.xl,
                  borderRadius: theme.borderRadius.xl,
                  marginBottom: theme.spacing.xl,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <h4 style={{ 
                    color: theme.colors.warning, 
                    margin: '0 0 12px 0',
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold
                  }}>
                    🔍 Verification in Progress
                  </h4>
                  <p style={{ 
                    margin: 0, 
                    fontSize: theme.typography.fontSize.base,
                    lineHeight: 1.6,
                    color: theme.colors.text.primary
                  }}>
                    Your student documents are being carefully reviewed by our verification team. 
                    You'll receive an email notification once your membership is activated.
                    <br /><br />
                    <strong>Expected processing time:</strong> 2-3 business days
                  </p>
                </div>
              )}

              {membershipData.status === 'active' && (
                <MembershipCard>
                  <div className="card-header">
                    <h3>TVK CANADA</h3>
                    <div className="logo">TVK</div>
                  </div>
                  <div className="member-info">
                    <div className="member-name">
                      {membershipData.firstName} {membershipData.lastName}
                    </div>
                    <div className="member-number">#{membershipData.membershipNumber}</div>
                    <div className="member-since">
                      Member since {membershipData.activatedAt && formatDate(membershipData.activatedAt)}
                    </div>
                  </div>
                </MembershipCard>
              )}

              <StatsGrid>
                {membershipData.activatedAt && (
                  <StatCard>
                    <div className="stat-label">Activated</div>
                    <div className="stat-value">{formatDate(membershipData.activatedAt)}</div>
                    <div className="stat-extra" style={{ color: theme.colors.success }}>✅ Active</div>
                  </StatCard>
                )}
                {membershipData.expiresAt && (
                  <StatCard>
                    <div className="stat-label">Expires</div>
                    <div className="stat-value">{formatDate(membershipData.expiresAt)}</div>
                    <div className="stat-extra" style={{ 
                      color: getDaysRemaining(membershipData.expiresAt) <= 30 ? theme.colors.warning : theme.colors.success,
                      fontWeight: theme.typography.fontWeight.bold
                    }}>
                      {formatDaysRemaining(membershipData.expiresAt)}
                    </div>
                  </StatCard>
                )}
                {membershipData.nextBillingDate && (
                  <StatCard>
                    <div className="stat-label">Next Billing</div>
                    <div className="stat-value">{formatDate(membershipData.nextBillingDate)}</div>
                    <div className="stat-extra" style={{ color: theme.colors.primary }}>💳 Auto-renewal</div>
                  </StatCard>
                )}
                <StatCard>
                  <div className="stat-label">Membership Type</div>
                  <div className="stat-value" style={{ textTransform: 'capitalize' }}>{membershipData.type}</div>
                  <div className="stat-extra" style={{ color: theme.colors.secondary }}>⭐ Premium</div>
                </StatCard>
              </StatsGrid>

              {membershipData.status === 'active' && (
                <ActionSection>
                  {membershipData.digitalCardUrl && (
                    <EnhancedButton variant="secondary" onClick={handleDownloadCard}>
                      📱 Download Digital Card
                    </EnhancedButton>
                  )}
                  <EnhancedButton variant="outline" onClick={() => window.location.href = `/invoice?id=${membershipData.id}`}>
                    🧾 View Invoice
                  </EnhancedButton>
                  <EnhancedButton variant="outline" onClick={() => window.location.href = '/events'}>
                    🎟️ Upcoming Events
                  </EnhancedButton>
                  <EnhancedButton variant="outline" onClick={() => window.location.href = '/gallery'}>
                    📸 Member Gallery
                  </EnhancedButton>
                </ActionSection>
              )}
            </PremiumCard>

            {membershipData.status === 'active' && (
              <PremiumCard>
                <h3 style={{ 
                  marginBottom: theme.spacing.xl,
                  fontSize: theme.typography.fontSize['2xl'],
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  🌟 Your Premium Benefits
                </h3>
                <PerksList>
                  {getMembershipPerks(membershipData.type).map((perk, index) => (
                    <PerkCard 
                      key={index}
                      style={{ 
                        '--delay': perk.delay,
                        '--icon-delay': perk.iconDelay
                      } as React.CSSProperties}
                    >
                      <div className="icon">{perk.icon}</div>
                      <h4>{perk.title}</h4>
                      <p>{perk.description}</p>
                    </PerkCard>
                  ))}
                </PerksList>
              </PremiumCard>
            )}

            <PremiumCard>
              <h3 style={{ 
                marginBottom: theme.spacing.lg,
                fontSize: theme.typography.fontSize.xl,
                color: theme.colors.primary
              }}>
                🤝 Need Assistance?
              </h3>
              <p style={{ 
                marginBottom: theme.spacing.xl,
                fontSize: theme.typography.fontSize.base,
                lineHeight: 1.6,
                color: theme.colors.text.secondary
              }}>
                Our dedicated support team is here to help with any questions about your membership, 
                upcoming events, or technical issues. We're committed to providing you with the best possible experience.
              </p>
              <ActionSection>
                <EnhancedButton variant="outline" onClick={() => window.location.href = '/contact'}>
                  📞 Contact Support
                </EnhancedButton>
                <EnhancedButton variant="outline" onClick={() => window.location.href = '/membership'}>
                  📋 All Plans
                </EnhancedButton>
                <EnhancedButton variant="outline" onClick={() => window.location.href = '/global-network'}>
                  🌍 Global Network
                </EnhancedButton>
              </ActionSection>
            </PremiumCard>
          </ContentWrapper>
        </Container>
      </Section>
    </DashboardContainer>
  )
}