/**
 * Professional Membership Invoice Component
 */

import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section } from '@components/Layout'
import { Button } from '@components/Button'
import { invoiceService } from '../services/api'

interface InvoiceData {
  id: string
  invoiceNumber: string
  membershipNumber: string
  customerName: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    province: string
    postalCode: string
    country: string
  }
  membershipType: string
  amount: number
  currency: string
  status: string
  issuedDate: string
  dueDate: string
  paidDate?: string
  paymentMethod: string
  stripePaymentId?: string
  taxAmount: number
  subtotal: number
  total: number
}

const InvoiceContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: ${theme.spacing.xl} 0;

  @media print {
    background: white;
    padding: 0;
  }
`

const InvoiceCard = styled.div`
  background: white;
  max-width: 800px;
  margin: 0 auto;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;

  @media print {
    box-shadow: none;
    border-radius: 0;
    max-width: none;
    margin: 0;
  }
`

const InvoiceHeader = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, #8b1428 100%);
  color: white;
  padding: ${theme.spacing.xxxl};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 60%);
  }

  .header-content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: ${theme.spacing.xl};
    align-items: center;

    @media (max-width: ${theme.breakpoints.tablet}) {
      grid-template-columns: 1fr;
      text-align: center;
      gap: ${theme.spacing.lg};
    }
  }

  .company-info {
    h1 {
      margin: 0;
      font-size: ${theme.typography.fontSize['3xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      margin-bottom: ${theme.spacing.sm};
    }

    .subtitle {
      font-size: ${theme.typography.fontSize.lg};
      opacity: 0.9;
      margin: 0;
    }
  }

  .invoice-badge {
    background: rgba(255, 215, 0, 0.2);
    border: 2px solid ${theme.colors.secondary};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    text-align: center;
    backdrop-filter: blur(10px);

    h2 {
      margin: 0;
      color: ${theme.colors.secondary};
      font-size: ${theme.typography.fontSize.xl};
      font-weight: ${theme.typography.fontWeight.bold};
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .invoice-number {
      margin: ${theme.spacing.sm} 0 0 0;
      font-size: ${theme.typography.fontSize.base};
      opacity: 0.9;
    }
  }

  @media print {
    background: white !important;
    color: black !important;
    padding: ${theme.spacing.xl};

    &::before {
      display: none;
    }

    .company-info h1,
    .invoice-badge h2 {
      color: ${theme.colors.primary} !important;
    }

    .invoice-badge {
      background: #f8f9fa !important;
      border-color: ${theme.colors.primary} !important;
    }
  }
`

const InvoiceBody = styled.div`
  padding: ${theme.spacing.xxxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl};
  }

  @media print {
    padding: ${theme.spacing.xl};
  }
`

const BillingSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }

  .billing-info {
    background: ${theme.colors.background};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.xl};
    border-left: 4px solid ${theme.colors.primary};

    h3 {
      margin: 0 0 ${theme.spacing.lg} 0;
      color: ${theme.colors.primary};
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.bold};
    }

    p {
      margin: ${theme.spacing.xs} 0;
      color: ${theme.colors.text.primary};
      line-height: 1.6;
    }

    .highlight {
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.text.primary};
    }
  }
`

const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${theme.spacing.xl} 0;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  thead {
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, #8b1428 100%);
    color: white;

    th {
      padding: ${theme.spacing.lg};
      text-align: left;
      font-weight: ${theme.typography.fontWeight.bold};
      font-size: ${theme.typography.fontSize.base};
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${theme.colors.border};
      
      &:hover {
        background: ${theme.colors.background};
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: ${theme.spacing.lg};
      color: ${theme.colors.text.primary};
      font-size: ${theme.typography.fontSize.base};

      &.amount {
        font-weight: ${theme.typography.fontWeight.semibold};
        text-align: right;
        color: ${theme.colors.primary};
      }
    }
  }

  @media print {
    thead {
      background: #f8f9fa !important;
      color: black !important;
    }

    thead th {
      border-bottom: 2px solid ${theme.colors.primary};
    }
  }
`

const TotalSection = styled.div`
  background: linear-gradient(135deg, ${theme.colors.background} 0%, #f8f9fa 100%);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  margin: ${theme.spacing.xl} 0;
  border: 2px solid ${theme.colors.border};

  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing.md} 0;
    
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.border};
    }

    &.grand-total {
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.primary};
      border-top: 2px solid ${theme.colors.primary};
      margin-top: ${theme.spacing.md};
      padding-top: ${theme.spacing.lg};
    }

    .label {
      font-size: ${theme.typography.fontSize.base};
      color: ${theme.colors.text.secondary};
    }

    .amount {
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.text.primary};
    }
  }
`

const PaymentStatus = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: ${theme.typography.fontSize.sm};

  ${props => {
    switch (props.status) {
      case 'paid':
        return `
          background: rgba(76, 175, 80, 0.1);
          color: ${theme.colors.success};
          border: 2px solid ${theme.colors.success};
        `
      case 'pending':
        return `
          background: rgba(255, 152, 0, 0.1);
          color: ${theme.colors.warning};
          border: 2px solid ${theme.colors.warning};
        `
      default:
        return `
          background: rgba(158, 158, 158, 0.1);
          color: ${theme.colors.text.secondary};
          border: 2px solid ${theme.colors.border};
        `
    }
  }}
`

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  margin: ${theme.spacing.xl} 0;
  padding: ${theme.spacing.xl} 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }

  @media print {
    display: none;
  }
`

const Footer = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.xl};
  text-align: center;
  border-top: 1px solid ${theme.colors.border};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  line-height: 1.6;

  .thank-you {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
  }

  @media print {
    background: white !important;
    border-top: 2px solid ${theme.colors.primary};
  }
`

export const MembershipInvoice: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const invoiceId = searchParams.get('id')
    if (invoiceId) {
      fetchInvoiceData(invoiceId)
    } else {
      setError('Invoice ID not provided')
      setLoading(false)
    }
  }, [searchParams])

  const fetchInvoiceData = async (invoiceId: string) => {
    try {
      const invoice = await invoiceService.getMembershipInvoice(invoiceId)
      setInvoiceData(invoice)
    } catch (err: any) {
      setError('Failed to load invoice data')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    window.print()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount / 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <InvoiceContainer>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '60vh',
            fontSize: theme.typography.fontSize.lg
          }}>
            Loading invoice...
          </div>
        </Container>
      </InvoiceContainer>
    )
  }

  if (error || !invoiceData) {
    return (
      <InvoiceContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: theme.spacing.xxxl }}>
            <h2>Invoice Not Found</h2>
            <p>{error}</p>
            <Button variant="primary" onClick={() => navigate('/my-membership')}>
              Back to Dashboard
            </Button>
          </div>
        </Container>
      </InvoiceContainer>
    )
  }

  return (
    <InvoiceContainer>
      <Container>
        <InvoiceCard>
          <InvoiceHeader>
            <div className="header-content">
              <div className="company-info">
                <h1>TVK CANADA</h1>
                <p className="subtitle">Tamil Vijay Kumar Fan Club</p>
              </div>
              <div className="invoice-badge">
                <h2>Invoice</h2>
                <p className="invoice-number">#{invoiceData.invoiceNumber}</p>
              </div>
            </div>
          </InvoiceHeader>

          <InvoiceBody>
            <BillingSection>
              <div className="billing-info">
                <h3>Bill To:</h3>
                <p className="highlight">{invoiceData.customerName}</p>
                <p>Membership: {invoiceData.membershipNumber}</p>
                <p>{invoiceData.email}</p>
                <p>{invoiceData.phone}</p>
                <p>{invoiceData.address.street}</p>
                <p>{invoiceData.address.city}, {invoiceData.address.province} {invoiceData.address.postalCode}</p>
                <p>{invoiceData.address.country}</p>
              </div>

              <div className="billing-info">
                <h3>Invoice Details:</h3>
                <p><span className="highlight">Invoice Date:</span> {formatDate(invoiceData.issuedDate)}</p>
                <p><span className="highlight">Due Date:</span> {formatDate(invoiceData.dueDate)}</p>
                {invoiceData.paidDate && (
                  <p><span className="highlight">Paid Date:</span> {formatDate(invoiceData.paidDate)}</p>
                )}
                <p><span className="highlight">Payment Method:</span> {invoiceData.paymentMethod}</p>
                <p style={{ marginTop: theme.spacing.lg }}>
                  <PaymentStatus status={invoiceData.status}>
                    {invoiceData.status === 'paid' ? '✅' : '⏳'} {invoiceData.status.toUpperCase()}
                  </PaymentStatus>
                </p>
              </div>
            </BillingSection>

            <InvoiceTable>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{invoiceData.membershipType} Membership</strong>
                    <br />
                    <small style={{ color: theme.colors.text.secondary }}>
                      Annual membership with premium benefits and exclusive access
                    </small>
                  </td>
                  <td>1</td>
                  <td>{formatCurrency(invoiceData.subtotal)}</td>
                  <td className="amount">{formatCurrency(invoiceData.subtotal)}</td>
                </tr>
              </tbody>
            </InvoiceTable>

            <TotalSection>
              <div className="total-row">
                <span className="label">Subtotal:</span>
                <span className="amount">{formatCurrency(invoiceData.subtotal)}</span>
              </div>
              <div className="total-row">
                <span className="label">HST (13%):</span>
                <span className="amount">{formatCurrency(invoiceData.taxAmount)}</span>
              </div>
              <div className="total-row grand-total">
                <span className="label">Total Amount:</span>
                <span className="amount">{formatCurrency(invoiceData.total)}</span>
              </div>
            </TotalSection>

            <ActionButtons>
              <Button variant="primary" onClick={handlePrint}>
                🖨️ Print Invoice
              </Button>
              <Button variant="secondary" onClick={handleDownload}>
                📄 Download PDF
              </Button>
              <Button variant="outline" onClick={() => navigate('/my-membership')}>
                ← Back to Dashboard
              </Button>
            </ActionButtons>
          </InvoiceBody>

          <Footer>
            <div className="thank-you">Thank you for your membership!</div>
            <p>
              This invoice was generated automatically. For any questions or concerns,
              please contact our support team at support@tvkcanada.com or call (416) 555-0100.
            </p>
            <p>
              TVK Canada • 123 Queen Street West, Toronto, ON M5H 2M9 • www.tvkcanada.com
            </p>
          </Footer>
        </InvoiceCard>
      </Container>
    </InvoiceContainer>
  )
}