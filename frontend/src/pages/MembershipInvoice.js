import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Professional Membership Invoice Component
 */
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container } from '@components/Layout';
import { Button } from '@components/Button';
import { invoiceService } from '../services/api';
const InvoiceContainer = styled.div `
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: ${theme.spacing.xl} 0;

  @media print {
    background: white;
    padding: 0;
  }
`;
const InvoiceCard = styled.div `
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
`;
const InvoiceHeader = styled.div `
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
`;
const InvoiceBody = styled.div `
  padding: ${theme.spacing.xxxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl};
  }

  @media print {
    padding: ${theme.spacing.xl};
  }
`;
const BillingSection = styled.div `
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
`;
const InvoiceTable = styled.table `
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
`;
const TotalSection = styled.div `
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
`;
const PaymentStatus = styled.div `
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
        `;
        case 'pending':
            return `
          background: rgba(255, 152, 0, 0.1);
          color: ${theme.colors.warning};
          border: 2px solid ${theme.colors.warning};
        `;
        default:
            return `
          background: rgba(158, 158, 158, 0.1);
          color: ${theme.colors.text.secondary};
          border: 2px solid ${theme.colors.border};
        `;
    }
}}
`;
const ActionButtons = styled.div `
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
`;
const Footer = styled.div `
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
`;
export const MembershipInvoice = () => {
    const [searchParams] = useSearchParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const invoiceId = searchParams.get('id');
        if (invoiceId) {
            fetchInvoiceData(invoiceId);
        }
        else {
            setError('Invoice ID not provided');
            setLoading(false);
        }
    }, [searchParams]);
    const fetchInvoiceData = async (invoiceId) => {
        try {
            const invoice = await invoiceService.getMembershipInvoice(invoiceId);
            setInvoiceData(invoice);
        }
        catch (err) {
            setError('Failed to load invoice data');
        }
        finally {
            setLoading(false);
        }
    };
    const handlePrint = () => {
        window.print();
    };
    const handleDownload = () => {
        // In a real implementation, this would generate a PDF
        window.print();
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD'
        }).format(amount / 100);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    if (loading) {
        return (_jsx(InvoiceContainer, { children: _jsx(Container, { children: _jsx("div", { style: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '60vh',
                        fontSize: theme.typography.fontSize.lg
                    }, children: "Loading invoice..." }) }) }));
    }
    if (error || !invoiceData) {
        return (_jsx(InvoiceContainer, { children: _jsx(Container, { children: _jsxs("div", { style: { textAlign: 'center', padding: theme.spacing.xxxl }, children: [_jsx("h2", { children: "Invoice Not Found" }), _jsx("p", { children: error }), _jsx(Button, { variant: "primary", onClick: () => navigate('/my-membership'), children: "Back to Dashboard" })] }) }) }));
    }
    return (_jsx(InvoiceContainer, { children: _jsx(Container, { children: _jsxs(InvoiceCard, { children: [_jsx(InvoiceHeader, { children: _jsxs("div", { className: "header-content", children: [_jsxs("div", { className: "company-info", children: [_jsx("h1", { children: "TVK CANADA" }), _jsx("p", { className: "subtitle", children: "Tamil Vijay Kumar Fan Club" })] }), _jsxs("div", { className: "invoice-badge", children: [_jsx("h2", { children: "Invoice" }), _jsxs("p", { className: "invoice-number", children: ["#", invoiceData.invoiceNumber] })] })] }) }), _jsxs(InvoiceBody, { children: [_jsxs(BillingSection, { children: [_jsxs("div", { className: "billing-info", children: [_jsx("h3", { children: "Bill To:" }), _jsx("p", { className: "highlight", children: invoiceData.customerName }), _jsxs("p", { children: ["Membership: ", invoiceData.membershipNumber] }), _jsx("p", { children: invoiceData.email }), _jsx("p", { children: invoiceData.phone }), _jsx("p", { children: invoiceData.address.street }), _jsxs("p", { children: [invoiceData.address.city, ", ", invoiceData.address.province, " ", invoiceData.address.postalCode] }), _jsx("p", { children: invoiceData.address.country })] }), _jsxs("div", { className: "billing-info", children: [_jsx("h3", { children: "Invoice Details:" }), _jsxs("p", { children: [_jsx("span", { className: "highlight", children: "Invoice Date:" }), " ", formatDate(invoiceData.issuedDate)] }), _jsxs("p", { children: [_jsx("span", { className: "highlight", children: "Due Date:" }), " ", formatDate(invoiceData.dueDate)] }), invoiceData.paidDate && (_jsxs("p", { children: [_jsx("span", { className: "highlight", children: "Paid Date:" }), " ", formatDate(invoiceData.paidDate)] })), _jsxs("p", { children: [_jsx("span", { className: "highlight", children: "Payment Method:" }), " ", invoiceData.paymentMethod] }), _jsx("p", { style: { marginTop: theme.spacing.lg }, children: _jsxs(PaymentStatus, { status: invoiceData.status, children: [invoiceData.status === 'paid' ? '✅' : '⏳', " ", invoiceData.status.toUpperCase()] }) })] })] }), _jsxs(InvoiceTable, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Description" }), _jsx("th", { children: "Quantity" }), _jsx("th", { children: "Unit Price" }), _jsx("th", { children: "Amount" })] }) }), _jsx("tbody", { children: _jsxs("tr", { children: [_jsxs("td", { children: [_jsxs("strong", { children: [invoiceData.membershipType, " Membership"] }), _jsx("br", {}), _jsx("small", { style: { color: theme.colors.text.secondary }, children: "Annual membership with premium benefits and exclusive access" })] }), _jsx("td", { children: "1" }), _jsx("td", { children: formatCurrency(invoiceData.subtotal) }), _jsx("td", { className: "amount", children: formatCurrency(invoiceData.subtotal) })] }) })] }), _jsxs(TotalSection, { children: [_jsxs("div", { className: "total-row", children: [_jsx("span", { className: "label", children: "Subtotal:" }), _jsx("span", { className: "amount", children: formatCurrency(invoiceData.subtotal) })] }), _jsxs("div", { className: "total-row", children: [_jsx("span", { className: "label", children: "HST (13%):" }), _jsx("span", { className: "amount", children: formatCurrency(invoiceData.taxAmount) })] }), _jsxs("div", { className: "total-row grand-total", children: [_jsx("span", { className: "label", children: "Total Amount:" }), _jsx("span", { className: "amount", children: formatCurrency(invoiceData.total) })] })] }), _jsxs(ActionButtons, { children: [_jsx(Button, { variant: "primary", onClick: handlePrint, children: "\uD83D\uDDA8\uFE0F Print Invoice" }), _jsx(Button, { variant: "secondary", onClick: handleDownload, children: "\uD83D\uDCC4 Download PDF" }), _jsx(Button, { variant: "outline", onClick: () => navigate('/my-membership'), children: "\u2190 Back to Dashboard" })] })] }), _jsxs(Footer, { children: [_jsx("div", { className: "thank-you", children: "Thank you for your membership!" }), _jsx("p", { children: "This invoice was generated automatically. For any questions or concerns, please contact our support team at support@tvkcanada.com or call (416) 555-0100." }), _jsx("p", { children: "TVK Canada \u2022 123 Queen Street West, Toronto, ON M5H 2M9 \u2022 www.tvkcanada.com" })] })] }) }) }));
};
