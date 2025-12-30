/**
 * Payment Success Page - Handles Stripe payment success callback
 */

import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section } from '@components/Layout'
import { Button } from '@components/Button'
import { membershipService } from '../services/api'
import { FaGift } from 'react-icons/fa6'

const SuccessCard = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xxxl};
  text-align: center;
  border-left: 4px solid ${theme.colors.success};
  box-shadow: ${theme.shadows.lg};
  max-width: 600px;
  margin: 0 auto;

  .success-icon {
    font-size: 4rem;
    color: ${theme.colors.success};
    margin-bottom: ${theme.spacing.lg};
  }

  h1 {
    color: ${theme.colors.success};
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize['3xl']};
  }

  h2 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
  }
`

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.secondary};

  .spinner {
    border: 3px solid ${theme.colors.border};
    border-top: 3px solid ${theme.colors.primary};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-right: ${theme.spacing.md};
  }

  @keyframes spin {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }
`

const ErrorCard = styled.div`
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid ${theme.colors.error};
  color: ${theme.colors.error};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`

export const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [membershipData, setMembershipData] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (!sessionId) {
      setError('Invalid payment session. Please contact support.')
      setLoading(false)
      return
    }

    confirmPayment(sessionId)
  }, [searchParams])

  const confirmPayment = async (sessionId: string) => {
    try {
      const result = await membershipService.confirmPayment(sessionId)
      setMembershipData(result)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to confirm payment. Please contact support.')
    } finally {
      setLoading(false)
    }
  }

  const goToDashboard = () => {
    navigate('/my-membership')
  }

  if (loading) {
    return (
      <Section>
        <Container>
          <LoadingSpinner>
            <div className="spinner"></div>
            Processing your payment...
          </LoadingSpinner>
        </Container>
      </Section>
    )
  }

  if (error) {
    return (
      <Section>
        <Container>
          <ErrorCard>
            <h2>Payment Processing Error</h2>
            <p>{error}</p>
            <div style={{ marginTop: theme.spacing.lg }}>
              <Button variant="primary" onClick={() => navigate('/membership')}>
                Back to Membership
              </Button>
            </div>
          </ErrorCard>
        </Container>
      </Section>
    )
  }

  return (
    <Section>
      <Container>
        <SuccessCard>
          <div className="success-icon"><FaGift size={64} /></div>
          <h1>Welcome to TVK Canada!</h1>
          
          {membershipData?.status === 'active' ? (
            <>
              <h2>Your membership is now active!</h2>
              <p style={{ marginBottom: theme.spacing.lg, fontSize: theme.typography.fontSize.lg }}>
                Congratulations! Your {membershipData.type} membership has been activated.
              </p>
              <p style={{ marginBottom: theme.spacing.xl }}>
                Membership Number: <strong>#{membershipData.membershipNumber}</strong>
              </p>
            </>
          ) : membershipData?.type === 'student' ? (
            <>
              <h2>Payment received - verification pending</h2>
              <p style={{ marginBottom: theme.spacing.lg, fontSize: theme.typography.fontSize.lg }}>
                Thank you for your payment! Your student documents are being reviewed.
              </p>
              <div style={{ 
                background: 'rgba(255, 152, 0, 0.1)', 
                border: `1px solid ${theme.colors.warning}`,
                padding: theme.spacing.lg,
                borderRadius: theme.borderRadius.lg,
                marginBottom: theme.spacing.xl 
              }}>
                <p style={{ margin: 0, color: theme.colors.warning }}>
                  <strong>What's next?</strong><br />
                  Our team will review your student ID and enrollment documents within 2-3 business days.
                  You'll receive an email confirmation once your membership is approved and activated.
                </p>
              </div>
            </>
          ) : (
            <>
              <h2>Payment confirmed!</h2>
              <p style={{ marginBottom: theme.spacing.xl, fontSize: theme.typography.fontSize.lg }}>
                Your membership will be activated shortly. You'll receive a confirmation email with details.
              </p>
            </>
          )}

          <div style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={goToDashboard}>
              View My Membership
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>

          <div style={{ marginTop: theme.spacing.xl, padding: theme.spacing.lg, background: theme.colors.background, borderRadius: theme.borderRadius.lg }}>
            <h4 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>
              What you get with your membership:
            </h4>
            <ul style={{ textAlign: 'left', margin: 0, paddingLeft: theme.spacing.lg }}>
              <li>Access to exclusive TVK Canada events</li>
              <li>Member-only discounts at partner businesses</li>
              <li>Community forum access</li>
              <li>Monthly newsletters with exclusive content</li>
              {membershipData?.type === 'student' && (
                <>
                  <li>Student-only events and study groups</li>
                  <li>Free movie nights and screenings</li>
                </>
              )}
              {membershipData?.type === 'yearly' && (
                <>
                  <li>VIP seating at major events</li>
                  <li>Annual exclusive member gift</li>
                </>
              )}
            </ul>
          </div>
        </SuccessCard>
      </Container>
    </Section>
  )
}