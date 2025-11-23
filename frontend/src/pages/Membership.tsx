/**
 * Membership Page
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section, Grid, Flex } from '@components/Layout'
import { Button } from '@components/Button'
import { membershipService } from '../services/api'

const PricingCard = styled.div<{ featured?: boolean }>`
  background: ${(props) => (props.featured ? theme.colors.primary : theme.colors.surface)};
  color: ${(props) => (props.featured ? theme.colors.text.inverse : theme.colors.text.primary)};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  text-align: center;
  box-shadow: ${(props) => (props.featured ? theme.shadows.xl : theme.shadows.md)};
  transform: ${(props) => (props.featured ? 'scale(1.05)' : 'scale(1)')};
  transition: all ${theme.transitions.base};
  border: 2px solid ${(props) => (props.featured ? theme.colors.secondary : 'transparent')};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
    transition: left 0.6s ease;
    pointer-events: none;
  }

  &:hover {
    box-shadow: ${(props) => (props.featured ? theme.shadows.xl : theme.shadows.lg)};
    transform: ${(props) => (props.featured ? 'scale(1.08) translateY(-6px)' : 'scale(1.02) translateY(-4px)')};
    border-color: ${theme.colors.secondary};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: ${(props) => (props.featured ? 'scale(1.06) translateY(-4px)' : 'scale(1.01) translateY(-2px)')};
  }

  @media (max-width: ${theme.breakpoints.desktop}) {
    &:active {
      transform: scale(0.97);

      &::before {
        display: none;
      }
    }
  }

  h3 {
    margin-bottom: ${theme.spacing.md};
    transition: color ${theme.transitions.base};
  }

  .price {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    margin: ${theme.spacing.lg} 0;
    transition: color ${theme.transitions.base};

    span {
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.normal};
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: ${theme.spacing.lg} 0;
    text-align: left;

    li {
      padding: ${theme.spacing.sm} 0;
      padding-left: ${theme.spacing.sm};
      border-bottom: 1px solid ${(props) => (props.featured ? 'rgba(255,255,255,0.2)' : theme.colors.border)};
      border-left: 3px solid transparent;
      transition: all ${theme.transitions.base};

      &:hover {
        padding-left: ${theme.spacing.lg};
        border-left-color: ${theme.colors.secondary};
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg};
    transform: ${(props) => (props.featured ? 'scale(1)' : 'scale(1)')};

    .price {
      font-size: ${theme.typography.fontSize['2xl']};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};

    .price {
      font-size: ${theme.typography.fontSize.xl};
    }

    h3 {
      font-size: ${theme.typography.fontSize.lg};
    }
  }
`

const OfferBanner = styled.div`
  background: linear-gradient(135deg, ${theme.colors.secondary} 0%, #ffed4e 100%);
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius['2xl']};
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.lg};

  h3 {
    margin-bottom: ${theme.spacing.md};
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: 0;
  }
`

const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${theme.spacing.xxl} 0;
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
  }

  &:before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${theme.colors.border};
    z-index: 0;

    @media (max-width: ${theme.breakpoints.tablet}) {
      display: none;
    }
  }
`

const StepItem = styled.div<{ active?: boolean }>`
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 1;

  &:not(:last-child) {
    margin-bottom: ${theme.spacing.xl};
  }

  .step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${(props) => (props.active ? theme.colors.primary : theme.colors.surface)};
    color: ${(props) => (props.active ? theme.colors.text.inverse : theme.colors.text.primary)};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${theme.typography.fontWeight.bold};
    margin: 0 auto ${theme.spacing.md};
    border: 2px solid ${theme.colors.primary};
  }

  h4 {
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    margin-bottom: 0;
  }
`

const FAQContainer = styled.div`
  margin-top: ${theme.spacing.xxl};
`

const FAQItem = styled.details`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};

  summary {
    cursor: pointer;
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.primary};
    user-select: none;

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  p {
    margin-top: ${theme.spacing.md};
    margin-bottom: 0;
    color: ${theme.colors.text.secondary};
  }
`

/**
 * Membership Page Component
 */
export const MembershipPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | 'student'>('yearly')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (selectedPlan === 'student') {
      alert('Student verification required. Please contact us at tvk.canada@gmail.com with your valid student ID and enrollment documents.')
      return
    }
    
    setLoading(true)
    try {
      const response = await membershipService.subscribe(selectedPlan)
      window.location.href = response.url
    } catch (error) {
      console.error('Subscription failed:', error)
      alert('Failed to start subscription. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* First 200 Offer */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.surface}>
        <Container>
          <OfferBanner>
            <h3>🎉 Limited Offer: First 200 Members Get 6 Months FREE!</h3>
            <p>
              Join TVK Canada now and receive 6 months of membership absolutely FREE, plus a Special Edition Founding Member Physical Card.
            </p>
          </OfferBanner>
        </Container>
      </Section>

      {/* Pricing Plans */}
      <Section padding={`${theme.spacing.xxxl} 0`}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.xxl }}>
            Membership Plans
          </h2>

          <Grid columns={3} gap={theme.spacing.xl}>
            <PricingCard featured={selectedPlan === 'monthly'}>
              <h3>Monthly</h3>
              <div className="price">
                $10<span>/month</span>
              </div>
              <Button
                variant={selectedPlan === 'monthly' ? 'secondary' : 'outline'}
                fullWidth
                onClick={() => setSelectedPlan('monthly')}
              >
                {selectedPlan === 'monthly' ? 'Selected' : 'Choose Plan'}
              </Button>
              <ul>
                <li>Official TVK Canada membership card</li>
                <li>Access to exclusive events</li>
                <li>Member-only discounts</li>
                <li>Community forum access</li>
                <li>Event early registration</li>
              </ul>
            </PricingCard>

            <PricingCard featured={selectedPlan === 'yearly'}>
              <h3>Annual - Save $20!</h3>
              <div className="price">
                $100<span>/year</span>
              </div>
              <Button
                variant={selectedPlan === 'yearly' ? 'secondary' : 'outline'}
                fullWidth
                onClick={() => setSelectedPlan('yearly')}
              >
                {selectedPlan === 'yearly' ? 'Selected' : 'Choose Plan'}
              </Button>
              <ul>
                <li>Official TVK Canada membership card</li>
                <li>Access to all exclusive events</li>
                <li>Premium partner discounts</li>
                <li>VIP community forum access</li>
                <li>Priority event registration</li>
                <li>Annual celebration invitation</li>
              </ul>
            </PricingCard>

            <PricingCard featured={selectedPlan === 'student'}>
              <h3>Student</h3>
              <div className="price">
                $5<span>/month</span>
              </div>
              <Button
                variant={selectedPlan === 'student' ? 'secondary' : 'outline'}
                fullWidth
                onClick={() => setSelectedPlan('student')}
              >
                {selectedPlan === 'student' ? 'Selected' : 'Choose Plan'}
              </Button>
              <ul>
                <li>Student ID verification required</li>
                <li>Access to student events</li>
                <li>Student-only discounts</li>
                <li>Community forum access</li>
                <li>Movie night access</li>
                <li>Study group invitations</li>
              </ul>
            </PricingCard>
          </Grid>

          <Flex justify="center" style={{ marginTop: theme.spacing.xl }}>
            <Button variant="primary" size="lg" onClick={handleSubscribe} disabled={loading}>
              {loading ? 'Processing...' : selectedPlan === 'student' ? 'Apply for Student Plan' : `Subscribe to ${selectedPlan === 'monthly' ? 'Monthly' : 'Yearly'} Plan`}
            </Button>
          </Flex>
        </Container>
      </Section>

      {/* Membership Workflow */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.surface}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.xxl }}>
            How It Works
          </h2>

          <StepperContainer>
            <StepItem active>
              <div className="step-circle">1</div>
              <h4>Sign Up Online</h4>
              <p>Create your account once registration opens</p>
            </StepItem>
            <StepItem active>
              <div className="step-circle">2</div>
              <h4>Choose Plan</h4>
              <p>Select Monthly or Yearly membership</p>
            </StepItem>
            <StepItem active>
              <div className="step-circle">3</div>
              <h4>Receive Your Card</h4>
              <p>Physical card delivered to your address (2–4 weeks)</p>
            </StepItem>
            <StepItem>
              <div className="step-circle">4</div>
              <h4>Enjoy Member Perks</h4>
              <p>At events and partner businesses</p>
            </StepItem>
            <StepItem>
              <div className="step-circle">5</div>
              <h4>Stay Connected</h4>
              <p>Receive exclusive updates and announcements</p>
            </StepItem>
          </StepperContainer>

          <Flex justify="center" style={{ marginTop: theme.spacing.xl }}>
            <Button variant="primary" size="lg">
              Get Started Now
            </Button>
          </Flex>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section padding={`${theme.spacing.xxxl} 0`}>
        <Container>
          <h2 style={{ marginBottom: theme.spacing.xxl }}>Frequently Asked Questions</h2>

          <FAQContainer>
            {[
              {
                q: '1. When does membership launch?',
                a: 'Membership will officially open soon. Announcements will be posted on our website and social media.',
              },
              {
                q: '2. How do I get my membership card?',
                a: 'Your physical membership card will be mailed to the address you provide. Delivery takes approximately 2–4 weeks.',
              },
              {
                q: '3. What is the Special Edition Founding Member Card?',
                a: 'A limited-edition card with premium design, given only to the first 200 members.',
              },
              {
                q: '4. What discounts do members get?',
                a: 'TVK partners with Canadian businesses to provide: Event discounts, Food & product offers, Free & discounted movie nights, Exclusive promotions. A full list of partner benefits will appear on the website.',
              },
              {
                q: '5. Do you offer family or group plans?',
                a: 'Not at launch, but we plan to roll out family packages in the future.',
              },
              {
                q: '6. Can I cancel my membership?',
                a: 'Yes. Monthly memberships can be cancelled anytime. Yearly memberships are final but include additional perks.',
              },
              {
                q: '7. Do I need my card for events?',
                a: 'Yes. Your physical membership card must be shown to receive member pricing, discounts, and access.',
              },
              {
                q: '8. Are events only in Toronto?',
                a: 'No. TVK Canada will host events all across Canada, including: Toronto, GTA, Ottawa, Montreal, Calgary, Edmonton, Winnipeg, Vancouver, Surrey, Halifax, and more. Our goal is to bring TVK events to every major Canadian city.',
              },
              {
                q: '9. How often are events held?',
                a: 'We plan to host weekly events, plus major gatherings for movie releases and special celebrations.',
              },
              {
                q: '10. How will I receive event updates?',
                a: 'Members will get priority email notifications, text alerts, and access to exclusive member communication channels.',
              },
              {
                q: '11. How do I apply for Student Membership?',
                a: 'Student membership is available for $5/month with valid student ID verification. Contact us with your enrollment documents, student ID, and proof of current enrollment status. Student members get access to student-only events, discounts, and study group invitations.',
              },
            ].map((item, idx) => (
              <FAQItem key={idx}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </FAQItem>
            ))}
          </FAQContainer>
        </Container>
      </Section>
    </>
  )
}
