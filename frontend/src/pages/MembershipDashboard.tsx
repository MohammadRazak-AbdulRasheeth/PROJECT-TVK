/**
 * Membership Dashboard Component
 */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
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
}

const DashboardCard = styled.div`
  background: ${theme.colors.surface}
  border-radius: ${theme.borderRadius['2xl']}
  padding: ${theme.spacing.xl}
  margin-bottom: ${theme.spacing.xl}
  border-left: 4px solid ${theme.colors.primary}
  box-shadow: ${theme.shadows.md}
`

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block
  padding: ${theme.spacing.sm} ${theme.spacing.md}
  border-radius: ${theme.borderRadius.full}
  font-size: ${theme.typography.fontSize.sm}
  font-weight: ${theme.typography.fontWeight.semibold}
  text-transform: uppercase
  
  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background: rgba(76, 175, 80, 0.1);
          color: ${theme.colors.success};
          border: 1px solid ${theme.colors.success};
        `
      case 'pending':
        return `
          background: rgba(255, 152, 0, 0.1);
          color: ${theme.colors.warning};
          border: 1px solid ${theme.colors.warning};
        `
      case 'expired':
      case 'cancelled':
        return `
          background: rgba(244, 67, 54, 0.1);
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error};
        `
      default:
        return `
          background: ${theme.colors.border};
          color: ${theme.colors.text.secondary};
        `
    }
  }}
`

const MembershipCard = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, #8b1428 100%)
  color: ${theme.colors.text.inverse}
  border-radius: ${theme.borderRadius['2xl']}
  padding: ${theme.spacing.xl}
  margin: ${theme.spacing.xl} 0
  position: relative
  overflow: hidden

  &::before {
    content: ''
    position: absolute
    top: -50%
    right: -50%
    width: 200%
    height: 200%
    background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)
    pointer-events: none
  }

  .card-header {
    display: flex
    justify-content: space-between
    align-items: flex-start
    margin-bottom: ${theme.spacing.lg}
    position: relative
    z-index: 1

    h3 {
      margin: 0
      font-size: ${theme.typography.fontSize['2xl']}
      font-weight: ${theme.typography.fontWeight.bold}
    }

    .logo {
      font-size: ${theme.typography.fontSize.lg}
      font-weight: ${theme.typography.fontWeight.bold}
      color: ${theme.colors.secondary}
    }
  }

  .member-info {
    position: relative
    z-index: 1

    .member-number {
      font-size: ${theme.typography.fontSize.xl}
      font-weight: ${theme.typography.fontWeight.bold}
      letter-spacing: 2px
      margin-bottom: ${theme.spacing.md}
    }

    .member-since {
      font-size: ${theme.typography.fontSize.sm}
      opacity: 0.9
    }
  }
`

const PerksList = styled.div`
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: ${theme.spacing.lg}
  margin: ${theme.spacing.xl} 0
`

const PerkCard = styled.div`
  background: ${theme.colors.background}
  border: 1px solid ${theme.colors.border}
  border-radius: ${theme.borderRadius.lg}
  padding: ${theme.spacing.lg}
  text-align: center
  transition: all ${theme.transitions.base}

  &:hover {
    border-color: ${theme.colors.primary}
    transform: translateY(-2px)
    box-shadow: ${theme.shadows.md}
  }

  .icon {
    font-size: 2rem
    margin-bottom: ${theme.spacing.md}
  }

  h4 {
    color: ${theme.colors.primary}
    margin: 0 0 ${theme.spacing.sm} 0
    font-size: ${theme.typography.fontSize.lg}
  }

  p {
    color: ${theme.colors.text.secondary}
    margin: 0
    font-size: ${theme.typography.fontSize.sm}
    line-height: 1.5
  }
`

const LoadingSpinner = styled.div`
  display: flex
  justify-content: center
  align-items: center
  height: 200px
  font-size: ${theme.typography.fontSize.lg}
  color: ${theme.colors.text.secondary}
`

const ErrorMessage = styled.div`
  background: rgba(244, 67, 54, 0.1)
  border: 1px solid ${theme.colors.error}
  color: ${theme.colors.error}
  padding: ${theme.spacing.lg}
  border-radius: ${theme.borderRadius.lg}
  margin: ${theme.spacing.xl} 0
  text-align: center
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

  const getMembershipPerks = (type: string) => {
    const basePerks = [
      { icon: '🎟️', title: 'Event Access', description: 'Priority access to all TVK events' },
      { icon: '💰', title: 'Member Discounts', description: 'Exclusive discounts at partner businesses' },
      { icon: '💬', title: 'Community Forum', description: 'Access to member-only discussions' },
      { icon: '📰', title: 'Newsletter', description: 'Monthly updates and exclusive content' }
    ]

    if (type === 'student') {
      return [
        ...basePerks,
        { icon: '📚', title: 'Study Groups', description: 'Join student study sessions' },
        { icon: '🎬', title: 'Movie Nights', description: 'Free student movie screenings' }
      ]
    }

    if (type === 'yearly') {
      return [
        ...basePerks,
        { icon: '🏆', title: 'VIP Access', description: 'VIP seating at major events' },
        { icon: '🎁', title: 'Annual Gift', description: 'Exclusive annual member gift' }
      ]
    }

    return basePerks
  }

  if (loading) {
    return (
      <Section>
        <Container>
          <LoadingSpinner>Loading your membership details...</LoadingSpinner>
        </Container>
      </Section>
    )
  }

  if (error) {
    return (
      <Section>
        <Container>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </Section>
    )
  }

  if (!membershipData) {
    return (
      <Section>
        <Container>
          <DashboardCard>
            <h2>No Active Membership</h2>
            <p>You don't have an active membership yet. Join TVK Canada to access exclusive benefits!</p>
            <Button variant="primary" onClick={() => window.location.href = '/membership'}>
              View Membership Plans
            </Button>
          </DashboardCard>
        </Container>
      </Section>
    )
  }

  return (
    <Section>
      <Container>
        <h1 style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
          My TVK Canada Membership
        </h1>

        <DashboardCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
            <h2 style={{ margin: 0, textTransform: 'capitalize' }}>
              {membershipData.type} Membership
            </h2>
            <StatusBadge status={membershipData.status}>
              {membershipData.status}
            </StatusBadge>
          </div>

          {membershipData.status === 'pending' && membershipData.verificationStatus === 'pending' && (
            <div style={{ 
              background: 'rgba(255, 152, 0, 0.1)', 
              border: `1px solid ${theme.colors.warning}`,
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.lg,
              marginBottom: theme.spacing.lg 
            }}>
              <h4 style={{ color: theme.colors.warning, margin: '0 0 8px 0' }}>
                Verification Pending
              </h4>
              <p style={{ margin: 0, fontSize: theme.typography.fontSize.sm }}>
                Your student documents are being reviewed. You'll receive an email once your membership is activated.
                Expected processing time: 2-3 business days.
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
                <div className="member-number">#{membershipData.membershipNumber}</div>
                <div className="member-since">
                  Member since {membershipData.activatedAt && formatDate(membershipData.activatedAt)}
                </div>
              </div>
            </MembershipCard>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: theme.spacing.lg }}>
            {membershipData.activatedAt && (
              <div>
                <strong>Activated:</strong><br />
                {formatDate(membershipData.activatedAt)}
              </div>
            )}
            {membershipData.expiresAt && (
              <div>
                <strong>Expires:</strong><br />
                {formatDate(membershipData.expiresAt)}
              </div>
            )}
            {membershipData.nextBillingDate && (
              <div>
                <strong>Next Billing:</strong><br />
                {formatDate(membershipData.nextBillingDate)}
              </div>
            )}
          </div>

          {membershipData.status === 'active' && membershipData.digitalCardUrl && (
            <div style={{ marginTop: theme.spacing.lg }}>
              <Button variant="secondary" onClick={handleDownloadCard}>
                Download Digital Card
              </Button>
            </div>
          )}
        </DashboardCard>

        {membershipData.status === 'active' && (
          <DashboardCard>
            <h3 style={{ marginBottom: theme.spacing.xl }}>Your Membership Benefits</h3>
            <PerksList>
              {getMembershipPerks(membershipData.type).map((perk, index) => (
                <PerkCard key={index}>
                  <div className="icon">{perk.icon}</div>
                  <h4>{perk.title}</h4>
                  <p>{perk.description}</p>
                </PerkCard>
              ))}
            </PerksList>
          </DashboardCard>
        )}

        <DashboardCard>
          <h3>Need Help?</h3>
          <p style={{ marginBottom: theme.spacing.lg }}>
            Have questions about your membership or need support? We're here to help!
          </p>
          <div style={{ display: 'flex', gap: theme.spacing.md, flexWrap: 'wrap' }}>
            <Button variant="outline" onClick={() => window.location.href = '/contact'}>
              Contact Support
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/membership'}>
              View All Plans
            </Button>
          </div>
        </DashboardCard>
      </Container>
    </Section>
  )
}