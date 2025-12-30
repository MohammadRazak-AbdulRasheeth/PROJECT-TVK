/**
 * Join TVK Canada (Free) Page
 * Master signup form for community membership
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { communityMemberService } from '@services/api'
import { FaBrain, FaBasketball, FaFilm, FaBriefcase, FaHandshake, FaChartLine, FaCheck, FaHandsPraying } from 'react-icons/fa6'

const PageHeader = styled(Section)`
  background: ${theme.colors.gradient.primary};
  color: ${theme.colors.text.inverse};
  text-align: center;
  padding: ${theme.spacing.xxxl} ${theme.spacing.lg};

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    font-weight: ${theme.typography.fontWeight.extrabold};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    h1 { font-size: ${theme.typography.fontSize['2xl']}; }
    p { font-size: ${theme.typography.fontSize.base}; }
  }
`

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.xl};
  border: 2px solid ${theme.colors.border};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
  }
`

const FormGroup = styled.div<{ hasError?: boolean }>`
  margin-bottom: ${theme.spacing.lg};

  label {
    display: block;
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.sm};
  }

  input, select {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 2px solid ${props => props.hasError ? '#dc2626' : theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    font-size: ${theme.typography.fontSize.base};
    transition: all ${theme.transitions.base};

    &:focus {
      outline: none;
      border-color: ${props => props.hasError ? '#dc2626' : theme.colors.primary};
      box-shadow: 0 0 0 3px ${props => props.hasError ? '#dc262620' : `${theme.colors.primary}20`};
    }
  }
`

const ErrorMessage = styled.span`
  display: block;
  color: #dc2626;
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.xs};
`

const FormErrorSummary = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  color: #dc2626;
  font-size: ${theme.typography.fontSize.sm};
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const CheckboxGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};

  .group-label {
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.md};
    display: block;
  }

  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.sm};

    @media (max-width: ${theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
    }
  }
`

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.base};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}05;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${theme.colors.primary};
    cursor: pointer;
    flex-shrink: 0;
    margin: 0;
  }

  span {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.primary};
    display: flex;
    align-items: center;
  }
`

const ConsentBox = styled.div`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  .consent-item {
    display: flex;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.md};

    &:last-child {
      margin-bottom: 0;
    }

    input {
      margin-top: 4px;
      accent-color: ${theme.colors.primary};
    }

    span {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.text.secondary};
      line-height: 1.5;
    }
  }
`

const BenefitsList = styled.div`
  background: linear-gradient(135deg, ${theme.colors.secondary}15 0%, ${theme.colors.primary}10 100%);
  border: 2px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  h3 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.xl};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: ${theme.spacing.sm} 0;
      color: ${theme.colors.text.primary};
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};

      &::before {
        content: '';
      }
    }
  }
`

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};

  .icon {
    font-size: 64px;
    margin-bottom: ${theme.spacing.lg};
  }

  h2 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.lg};
  }
`

const SuccessIcon = styled.div`
  font-size: 64px;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.primary};
`

const InterestIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
`

export const JoinPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    ageRange: '',
    interests: [] as string[],
    emailConsent: false,
    smsConsent: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }
    if (!formData.ageRange) {
      newErrors.ageRange = 'Age range is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Check for duplicate email
      const emailCheck = await communityMemberService.checkEmail(formData.email)
      if (emailCheck.exists) {
        setErrors(prev => ({ 
          ...prev, 
          email: 'This email is already registered. Please use a different email or contact us if you need help.' 
        }))
        setIsSubmitting(false)
        return
      }
      
      // Submit the form
      await communityMemberService.signup(formData)
      setIsSubmitted(true)
    } catch (error: any) {
      // Handle API errors
      if (error.response?.status === 409) {
        // Duplicate email error from backend
        setErrors(prev => ({ 
          ...prev, 
          email: 'This email is already registered. Please use a different email or contact us if you need help.' 
        }))
      } else {
        setSubmitError('Something went wrong. Please try again later.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const interests = [
    { id: 'mental-health', label: 'Mental Health', icon: <FaBrain /> },
    { id: 'sports', label: 'Sports', icon: <FaBasketball /> },
    { id: 'movies', label: 'Movies', icon: <FaFilm /> },
    { id: 'business', label: 'Business', icon: <FaBriefcase /> },
    { id: 'volunteering', label: 'Volunteering', icon: <FaHandshake /> },
    { id: 'growth', label: 'Personal Growth', icon: <FaChartLine /> }
  ]

  const ageRanges = [
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55+'
  ]

  if (isSubmitted) {
    return (
      <>
        <SEO 
          title="Welcome to TVK Canada!"
          description="Thank you for joining TVK Canada community."
          keywords="TVK Canada, welcome, community, Thalapathy Vijay fans"
        />
        <PageHeader>
          <Container>
            <h1>Welcome to the Family!</h1>
          </Container>
        </PageHeader>
        <Section padding={`${theme.spacing.xxxl} 0`}>
          <Container>
            <FormContainer>
              <SuccessMessage>
                <SuccessIcon><FaHandsPraying /></SuccessIcon>
                <h2>You're In!</h2>
                <p>
                  Welcome to TVK Canada! You'll receive updates about our programs, 
                  events, and community activities. We're excited to have you as part of our family.
                </p>
                <Button variant="primary" onClick={() => window.location.href = '/programs'}>
                  Explore Programs
                </Button>
              </SuccessMessage>
            </FormContainer>
          </Container>
        </Section>
      </>
    )
  }

  return (
    <>
      <SEO 
        title="Join TVK Canada (Free) | Community Membership"
        description="Join TVK Canada for free! Get updates on wellness programs, sports drop-ins, movie nights, and community events. No payment required."
        keywords="TVK Canada, join free, community membership, Thalapathy Vijay fans, wellness, sports, mental health"
      />

      <PageHeader>
        <Container>
          <h1>Join TVK Canada (Free)</h1>
          <p>Free community membership. No payment required.</p>
        </Container>
      </PageHeader>

      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.background}>
        <Container>
          <FormContainer>
            <BenefitsList>
              <h3>What You Get (Free)</h3>
              <ul>
                <li><FaCheck style={{ color: theme.colors.primary }} /> Updates on programs and events</li>
                <li><FaCheck style={{ color: theme.colors.primary }} /> Early access to drop-in registrations</li>
                <li><FaCheck style={{ color: theme.colors.primary }} /> Priority booking for movie nights</li>
                <li><FaCheck style={{ color: theme.colors.primary }} /> Community newsletter</li>
                <li><FaCheck style={{ color: theme.colors.primary }} /> Future member perks and discounts</li>
              </ul>
            </BenefitsList>

            <form onSubmit={handleSubmit}>
              {submitError && (
                <FormErrorSummary>
                  {submitError}
                </FormErrorSummary>
              )}
              {Object.keys(errors).length > 0 && !submitError && (
                <FormErrorSummary>
                  Please fix the errors below to continue.
                </FormErrorSummary>
              )}
              
              <FormRow>
                <FormGroup hasError={!!errors.firstName}>
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Your first name"
                  />
                  {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
                </FormGroup>
                <FormGroup hasError={!!errors.lastName}>
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Your last name"
                  />
                  {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
                </FormGroup>
              </FormRow>

              <FormGroup hasError={!!errors.email}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              <FormGroup hasError={!!errors.phone}>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>

              <FormRow>
                <FormGroup hasError={!!errors.city}>
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Your city"
                  />
                  {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                </FormGroup>
                <FormGroup hasError={!!errors.ageRange}>
                  <label htmlFor="ageRange">Age Range *</label>
                  <select
                    id="ageRange"
                    name="ageRange"
                    value={formData.ageRange}
                    onChange={handleInputChange}
                  >
                    <option value="">Select age range</option>
                    {ageRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                  {errors.ageRange && <ErrorMessage>{errors.ageRange}</ErrorMessage>}
                </FormGroup>
              </FormRow>

              <CheckboxGroup>
                <span className="group-label">What are you interested in?</span>
                <div className="checkbox-grid">
                  {interests.map(interest => (
                    <CheckboxItem key={interest.id} htmlFor={`interest-${interest.id}`}>
                      <input
                        type="checkbox"
                        id={`interest-${interest.id}`}
                        checked={formData.interests.includes(interest.id)}
                        onChange={() => handleInterestChange(interest.id)}
                      />
                      <span><InterestIcon>{interest.icon}</InterestIcon> {interest.label}</span>
                    </CheckboxItem>
                  ))}
                </div>
              </CheckboxGroup>

              <ConsentBox>
                <div className="consent-item">
                  <input
                    type="checkbox"
                    id="emailConsent"
                    name="emailConsent"
                    checked={formData.emailConsent}
                    onChange={handleCheckboxChange}
                  />
                  <span>
                    I agree to receive email updates about TVK Canada programs, events, and community news.
                  </span>
                </div>
                <div className="consent-item">
                  <input
                    type="checkbox"
                    id="smsConsent"
                    name="smsConsent"
                    checked={formData.smsConsent}
                    onChange={handleCheckboxChange}
                  />
                  <span>
                    I agree to receive SMS/text updates for time-sensitive announcements (optional).
                  </span>
                </div>
              </ConsentBox>

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join TVK Canada (Free)'}
              </Button>
            </form>
          </FormContainer>
        </Container>
      </Section>
    </>
  )
}
