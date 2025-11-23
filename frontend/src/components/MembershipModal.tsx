/**
 * Membership Subscription Modal Component
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Button } from '@components/Button'
import { membershipService } from '../services/api'

interface MembershipModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: 'monthly' | 'yearly' | 'student'
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.md};
`

const ModalContent = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${theme.shadows.xl};
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: ${theme.spacing.lg};

  h2 {
    color: ${theme.colors.primary};
    margin: 0;
    font-size: ${theme.typography.fontSize['2xl']};
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  line-height: 1;

  &:hover {
    color: ${theme.colors.primary};
  }
`

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};

  label {
    display: block;
    margin-bottom: ${theme.spacing.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
  }

  input, select, textarea {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    font-size: ${theme.typography.fontSize.base};
    transition: border-color ${theme.transitions.base};

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`

const FileUploadArea = styled.div`
  border: 2px dashed ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
  cursor: pointer;
  transition: all ${theme.transitions.base};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.surface};
  }

  &.has-file {
    border-color: ${theme.colors.success};
    background: rgba(76, 175, 80, 0.1);
  }

  input[type="file"] {
    display: none;
  }

  .upload-text {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.sm};
  }

  .file-name {
    color: ${theme.colors.primary};
    font-weight: ${theme.typography.fontWeight.semibold};
  }
`

const PlanSummary = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  border-left: 4px solid ${theme.colors.primary};

  .plan-title {
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
  }

  .plan-price {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
  }

  .plan-features {
    margin-top: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
  }
`

const ErrorMessage = styled.div`
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid ${theme.colors.error};
  color: ${theme.colors.error};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
`

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    studentId: null as File | null,
    timetable: null as File | null,
    university: '',
    program: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const planDetails = {
    monthly: { title: 'Monthly Plan', price: '$10/month', features: 'All membership benefits' },
    yearly: { title: 'Annual Plan', price: '$100/year', features: 'All benefits + 2 months free' },
    student: { title: 'Student Plan', price: '$5/month', features: 'Student benefits + verification required' }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'studentId' | 'timetable') => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }))
    }
  }

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields')
      return false
    }

    if (selectedPlan === 'student') {
      if (!formData.studentId || !formData.timetable || !formData.university || !formData.program) {
        setError('Please fill in all student verification fields and upload required documents')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const formDataToSubmit = new FormData()
      
      // Add basic fields
      formDataToSubmit.append('plan', selectedPlan)
      formDataToSubmit.append('firstName', formData.firstName)
      formDataToSubmit.append('lastName', formData.lastName)
      formDataToSubmit.append('email', formData.email)
      formDataToSubmit.append('phone', formData.phone)
      formDataToSubmit.append('address', formData.address)
      formDataToSubmit.append('city', formData.city)
      formDataToSubmit.append('province', formData.province)
      formDataToSubmit.append('postalCode', formData.postalCode)

      // Add student fields if applicable
      if (selectedPlan === 'student') {
        formDataToSubmit.append('university', formData.university)
        formDataToSubmit.append('program', formData.program)
        if (formData.studentId) formDataToSubmit.append('studentId', formData.studentId)
        if (formData.timetable) formDataToSubmit.append('timetable', formData.timetable)
      }

      const response = await membershipService.createSubscription(formDataToSubmit)
      
      // Redirect to Stripe checkout
      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create subscription. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>Subscribe to {planDetails[selectedPlan].title}</h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <PlanSummary>
          <div className="plan-title">{planDetails[selectedPlan].title}</div>
          <div className="plan-price">{planDetails[selectedPlan].price}</div>
          <div className="plan-features">{planDetails[selectedPlan].features}</div>
        </PlanSummary>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street address"
            />
          </FormGroup>

          <FormGroup>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Province</label>
            <select name="province" value={formData.province} onChange={handleInputChange}>
              <option value="">Select Province</option>
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NS">Nova Scotia</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="NT">Northwest Territories</option>
              <option value="NU">Nunavut</option>
              <option value="YT">Yukon</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="A1A 1A1"
            />
          </FormGroup>

          {selectedPlan === 'student' && (
            <>
              <FormGroup>
                <label>University/College *</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  placeholder="e.g., University of Toronto"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Program/Major *</label>
                <input
                  type="text"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Student ID Document *</label>
                <FileUploadArea 
                  className={formData.studentId ? 'has-file' : ''}
                  onClick={() => document.getElementById('studentId')?.click()}
                >
                  <input
                    type="file"
                    id="studentId"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileUpload(e, 'studentId')}
                  />
                  <div className="upload-text">
                    {formData.studentId ? (
                      <div className="file-name">✓ {formData.studentId.name}</div>
                    ) : (
                      <div>
                        <div>Click to upload Student ID</div>
                        <small>JPG, PNG, or PDF (max 5MB)</small>
                      </div>
                    )}
                  </div>
                </FileUploadArea>
              </FormGroup>

              <FormGroup>
                <label>Current Timetable/Enrollment Proof *</label>
                <FileUploadArea 
                  className={formData.timetable ? 'has-file' : ''}
                  onClick={() => document.getElementById('timetable')?.click()}
                >
                  <input
                    type="file"
                    id="timetable"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileUpload(e, 'timetable')}
                  />
                  <div className="upload-text">
                    {formData.timetable ? (
                      <div className="file-name">✓ {formData.timetable.name}</div>
                    ) : (
                      <div>
                        <div>Click to upload Timetable</div>
                        <small>JPG, PNG, or PDF (max 5MB)</small>
                      </div>
                    )}
                  </div>
                </FileUploadArea>
              </FormGroup>
            </>
          )}

          <div style={{ display: 'flex', gap: theme.spacing.md, marginTop: theme.spacing.xl }}>
            <Button type="button" variant="outline" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  )
}