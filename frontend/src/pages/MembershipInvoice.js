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
import jsPDF from 'jspdf';
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
    const handleDownload = async () => {
        try {
            if (!invoiceData)
                return;
            // Show loading state
            const downloadBtn = document.querySelector('[data-download-btn]');
            const originalText = downloadBtn?.textContent;
            if (downloadBtn) {
                downloadBtn.disabled = true;
                downloadBtn.textContent = '📄 Generating PDF...';
            }
            // Create new PDF document
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            const pageWidth = pdf.internal.pageSize.width;
            const pageHeight = pdf.internal.pageSize.height;
            const margin = 20;
            const contentWidth = pageWidth - (margin * 2);
            let yPosition = margin;
            // Helper function to add text
            const addText = (text, x, y, fontSize = 10, isBold = false, color = '#000000') => {
                pdf.setFontSize(fontSize);
                pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
                pdf.setTextColor(color);
                pdf.text(text, x, y);
            };
            // Helper function to add centered text
            const addCenteredText = (text, y, fontSize = 10, isBold = false, color = '#000000') => {
                pdf.setFontSize(fontSize);
                pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
                pdf.setTextColor(color);
                const textWidth = pdf.getTextWidth(text);
                pdf.text(text, (pageWidth - textWidth) / 2, y);
            };
            // Header - Company Name and Logo area
            pdf.setFillColor(196, 30, 58); // TVK red
            pdf.rect(0, 0, pageWidth, 60, 'F');
            // Company name and subtitle - left aligned with better spacing
            addText('TVK CANADA', margin, 25, 20, true, '#FFFFFF');
            addText('Tamizhaga Vetri Kazhagam Canada', margin, 35, 12, false, '#FFFFFF');
            addText('123 Queen Street West, Toronto, ON M5H 2M9', margin, 45, 9, false, '#FFFFFF');
            addText('support@tvkcanada.com | (416) 555-0100', margin, 52, 9, false, '#FFFFFF');
            // Invoice title and number - properly positioned on right
            const invoiceBoxX = pageWidth - 70;
            const invoiceBoxY = 15;
            pdf.setFillColor(255, 255, 255); // White background
            pdf.rect(invoiceBoxX, invoiceBoxY, 60, 30, 'F');
            pdf.setDrawColor(255, 215, 0); // Gold border
            pdf.setLineWidth(2);
            pdf.rect(invoiceBoxX, invoiceBoxY, 60, 30, 'S');
            addText('INVOICE', invoiceBoxX + 5, invoiceBoxY + 12, 14, true, '#C41E3A');
            addText(`#${invoiceData.invoiceNumber}`, invoiceBoxX + 5, invoiceBoxY + 25, 11, false, '#C41E3A');
            yPosition = 80;
            // Company Info and Bill To - Two columns with better spacing
            const columnWidth = (contentWidth - 20) / 2;
            // Add separator line
            pdf.setDrawColor(220, 220, 220);
            pdf.setLineWidth(1);
            pdf.line(margin, yPosition - 5, margin + contentWidth, yPosition - 5);
            // Company Info (Left)
            addText('FROM:', margin, yPosition, 11, true, '#C41E3A');
            yPosition += 10;
            addText('TVK Canada', margin, yPosition, 11, true);
            yPosition += 7;
            addText('Tamizhaga Vetri Kazhagam Canada', margin, yPosition, 9, false, '#666666');
            yPosition += 6;
            addText('123 Queen Street West', margin, yPosition, 9);
            yPosition += 5;
            addText('Toronto, ON M5H 2M9, Canada', margin, yPosition, 9);
            yPosition += 5;
            addText('support@tvkcanada.com', margin, yPosition, 9, false, '#C41E3A');
            yPosition += 5;
            addText('(416) 555-0100', margin, yPosition, 9);
            // Bill To (Right) - Reset yPosition for right column
            let billToY = yPosition - 45; // Start at same level as FROM:
            const rightColumn = margin + columnWidth + 20;
            addText('BILL TO:', rightColumn, billToY, 11, true, '#C41E3A');
            billToY += 10;
            addText(invoiceData.customerName, rightColumn, billToY, 11, true);
            billToY += 7;
            addText(`Member ID: ${invoiceData.membershipNumber}`, rightColumn, billToY, 9, false, '#666666');
            billToY += 6;
            addText(invoiceData.email, rightColumn, billToY, 9, false, '#C41E3A');
            billToY += 5;
            if (invoiceData.phone) {
                addText(invoiceData.phone, rightColumn, billToY, 9);
                billToY += 5;
            }
            addText(invoiceData.address.street, rightColumn, billToY, 9);
            billToY += 5;
            addText(`${invoiceData.address.city}, ${invoiceData.address.province}`, rightColumn, billToY, 9);
            billToY += 5;
            addText(`${invoiceData.address.postalCode}, ${invoiceData.address.country}`, rightColumn, billToY, 9);
            yPosition = Math.max(yPosition, billToY) + 20;
            // Invoice Details - in a clean box
            pdf.setFillColor(248, 249, 250); // Light gray background
            pdf.rect(margin, yPosition - 5, contentWidth, 45, 'F');
            pdf.setDrawColor(196, 30, 58);
            pdf.setLineWidth(1);
            pdf.rect(margin, yPosition - 5, contentWidth, 45, 'S');
            addText('INVOICE DETAILS', margin + 5, yPosition + 5, 12, true, '#C41E3A');
            yPosition += 15;
            const details = [
                ['Invoice Date:', formatDate(invoiceData.issuedDate)],
                ['Due Date:', formatDate(invoiceData.dueDate)],
                ...(invoiceData.paidDate ? [['Paid Date:', formatDate(invoiceData.paidDate)]] : []),
                ['Payment Method:', invoiceData.paymentMethod]
            ];
            // Display details in two columns
            details.forEach(([label, value], index) => {
                const col = index % 2;
                const row = Math.floor(index / 2);
                const xPos = margin + 5 + (col * (contentWidth / 2));
                const yPos = yPosition + (row * 7);
                addText(label, xPos, yPos, 9, true);
                addText(value, xPos + 40, yPos, 9);
            });
            yPosition += 35;
            // Items Table with better styling
            yPosition += 10;
            // Table header with improved colors
            pdf.setFillColor(248, 249, 250); // Light gray instead of dark red
            pdf.rect(margin, yPosition - 2, contentWidth, 15, 'F');
            pdf.setDrawColor(196, 30, 58);
            pdf.setLineWidth(2);
            pdf.rect(margin, yPosition - 2, contentWidth, 15, 'S');
            addText('DESCRIPTION', margin + 3, yPosition + 8, 10, true, '#C41E3A');
            addText('QTY', margin + contentWidth * 0.65, yPosition + 8, 10, true, '#C41E3A');
            addText('UNIT PRICE', margin + contentWidth * 0.75, yPosition + 8, 10, true, '#C41E3A');
            addText('AMOUNT', margin + contentWidth * 0.88, yPosition + 8, 10, true, '#C41E3A');
            yPosition += 18;
            // Table row with proper spacing
            pdf.setFillColor(255, 255, 255); // White background
            pdf.rect(margin, yPosition - 2, contentWidth, 20, 'F');
            pdf.setDrawColor(220, 220, 220);
            pdf.setLineWidth(1);
            pdf.rect(margin, yPosition - 2, contentWidth, 20, 'S');
            addText(`${invoiceData.membershipType} Membership`, margin + 3, yPosition + 6, 11, true);
            addText('Premium benefits and exclusive member access', margin + 3, yPosition + 12, 8, false, '#666666');
            addText('1', margin + contentWidth * 0.65, yPosition + 6, 10);
            addText(formatCurrency(invoiceData.subtotal), margin + contentWidth * 0.75, yPosition + 6, 10);
            addText(formatCurrency(invoiceData.subtotal), margin + contentWidth * 0.88, yPosition + 6, 10, true, '#C41E3A');
            yPosition += 25;
            // Totals section with better alignment
            const totalsX = margin + contentWidth * 0.55;
            const labelX = totalsX + 5;
            const amountX = margin + contentWidth * 0.88;
            // Subtotal and tax
            pdf.setDrawColor(220, 220, 220);
            pdf.line(totalsX, yPosition, margin + contentWidth, yPosition);
            yPosition += 10;
            addText('Subtotal:', labelX, yPosition, 10);
            addText(formatCurrency(invoiceData.subtotal), amountX, yPosition, 10);
            yPosition += 8;
            addText('HST (13%):', labelX, yPosition, 10);
            addText(formatCurrency(invoiceData.taxAmount), amountX, yPosition, 10);
            yPosition += 12;
            // Total - properly highlighted
            pdf.setFillColor(248, 249, 250);
            pdf.rect(totalsX, yPosition - 6, contentWidth * 0.45, 16, 'F');
            pdf.setDrawColor(196, 30, 58);
            pdf.setLineWidth(2);
            pdf.rect(totalsX, yPosition - 6, contentWidth * 0.45, 16, 'S');
            addText('TOTAL AMOUNT:', labelX, yPosition + 3, 12, true, '#C41E3A');
            addText(formatCurrency(invoiceData.total), amountX, yPosition + 3, 12, true, '#C41E3A');
            yPosition += 25;
            // Check if we need a new page before payment status
            if (yPosition > pageHeight - 80) {
                pdf.addPage();
                yPosition = margin + 20;
            }
            // Payment Status with better positioning
            if (invoiceData.status === 'paid') {
                pdf.setFillColor(76, 175, 80, 0.2);
                pdf.rect(margin, yPosition - 3, 80, 12, 'F');
                pdf.setDrawColor(76, 175, 80);
                pdf.rect(margin, yPosition - 3, 80, 12, 'S');
                addText('PAID IN FULL', margin + 5, yPosition + 4, 11, true, '#4CAF50');
            }
            else {
                pdf.setFillColor(255, 152, 0, 0.2);
                pdf.rect(margin, yPosition - 3, 100, 12, 'F');
                pdf.setDrawColor(255, 152, 0);
                pdf.rect(margin, yPosition - 3, 100, 12, 'S');
                addText('PAYMENT PENDING', margin + 5, yPosition + 4, 11, true, '#FF9800');
            }
            yPosition += 25;
            // Professional Footer - ensure enough space
            if (yPosition > pageHeight - 80) {
                pdf.addPage();
                yPosition = margin + 20;
            }
            // Footer separator
            pdf.setDrawColor(196, 30, 58);
            pdf.setLineWidth(2);
            pdf.line(margin, pageHeight - 50, margin + contentWidth, pageHeight - 50);
            // Thank you message
            addCenteredText('Thank you for your membership with TVK Canada!', pageHeight - 38, 12, true, '#C41E3A');
            // Support information
            addCenteredText('Questions? Contact our support team:', pageHeight - 28, 9, false, '#666666');
            addCenteredText('support@tvkcanada.com • (416) 555-0100', pageHeight - 21, 9, false, '#C41E3A');
            // Website and address
            addCenteredText('TVK Canada • www.tvkcanada.com', pageHeight - 12, 8, false, '#666666');
            // Generate filename and save
            const filename = `TVK-Canada-Invoice-${invoiceData.invoiceNumber}-${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(filename);
            // Reset button state
            if (downloadBtn) {
                downloadBtn.disabled = false;
                downloadBtn.textContent = originalText;
            }
        }
        catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again or use the print option.');
            // Reset button state on error
            const downloadBtn = document.querySelector('[data-download-btn]');
            if (downloadBtn) {
                downloadBtn.disabled = false;
                downloadBtn.textContent = '📄 Download PDF';
            }
        }
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
    return (_jsx(InvoiceContainer, { children: _jsx(Container, { children: _jsxs(InvoiceCard, { id: "invoice-content", children: [_jsx(InvoiceHeader, { children: _jsxs("div", { className: "header-content", children: [_jsxs("div", { className: "company-info", children: [_jsx("h1", { children: "TVK CANADA" }), _jsx("p", { className: "subtitle", children: "Tamil Vijay Kumar Fan Club" })] }), _jsxs("div", { className: "invoice-badge", children: [_jsx("h2", { children: "Invoice" }), _jsxs("p", { className: "invoice-number", children: ["#", invoiceData.invoiceNumber] })] })] }) }), _jsxs(InvoiceBody, { children: [_jsxs(BillingSection, { children: [_jsxs("div", { className: "billing-info", children: [_jsx("h3", { children: "Bill To:" }), _jsx("p", { className: "highlight", children: invoiceData.customerName }), _jsxs("p", { children: ["Membership: ", invoiceData.membershipNumber] }), _jsx("p", { children: invoiceData.email }), _jsx("p", { children: invoiceData.phone }), _jsx("p", { children: invoiceData.address.street }), _jsxs("p", { children: [invoiceData.address.city, ", ", invoiceData.address.province, " ", invoiceData.address.postalCode] }), _jsx("p", { children: invoiceData.address.country })] }), _jsxs("div", { className: "billing-info", children: [_jsx("h3", { children: "Invoice Details:" }), _jsxs("p", { children: [_jsx("span", { className: "highlight", children: "Invoice Date:" }), " ", formatDate(invoiceData.issuedDate)] }), _jsxs("p", { children: [_jsx("span", { className: "highlight", children: "Due Date:" }), " ", formatDate(invoiceData.dueDate)] }), invoiceData.paidDate && (_jsxs("p", { children: [_jsx("span", { className: "highlight", children: "Paid Date:" }), " ", formatDate(invoiceData.paidDate)] })), _jsxs("p", { children: [_jsx("span", { className: "highlight", children: "Payment Method:" }), " ", invoiceData.paymentMethod] }), _jsx("p", { style: { marginTop: theme.spacing.lg }, children: _jsxs(PaymentStatus, { status: invoiceData.status, children: [invoiceData.status === 'paid' ? '✅' : '⏳', " ", invoiceData.status.toUpperCase()] }) })] })] }), _jsxs(InvoiceTable, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Description" }), _jsx("th", { children: "Quantity" }), _jsx("th", { children: "Unit Price" }), _jsx("th", { children: "Amount" })] }) }), _jsx("tbody", { children: _jsxs("tr", { children: [_jsxs("td", { children: [_jsxs("strong", { children: [invoiceData.membershipType, " Membership"] }), _jsx("br", {}), _jsx("small", { style: { color: theme.colors.text.secondary }, children: "Annual membership with premium benefits and exclusive access" })] }), _jsx("td", { children: "1" }), _jsx("td", { children: formatCurrency(invoiceData.subtotal) }), _jsx("td", { className: "amount", children: formatCurrency(invoiceData.subtotal) })] }) })] }), _jsxs(TotalSection, { children: [_jsxs("div", { className: "total-row", children: [_jsx("span", { className: "label", children: "Subtotal:" }), _jsx("span", { className: "amount", children: formatCurrency(invoiceData.subtotal) })] }), _jsxs("div", { className: "total-row", children: [_jsx("span", { className: "label", children: "HST (13%):" }), _jsx("span", { className: "amount", children: formatCurrency(invoiceData.taxAmount) })] }), _jsxs("div", { className: "total-row grand-total", children: [_jsx("span", { className: "label", children: "Total Amount:" }), _jsx("span", { className: "amount", children: formatCurrency(invoiceData.total) })] })] }), _jsxs(ActionButtons, { children: [_jsx(Button, { variant: "primary", onClick: handlePrint, children: "\uD83D\uDDA8\uFE0F Print Invoice" }), _jsx(Button, { variant: "secondary", onClick: handleDownload, "data-download-btn": "true", children: "\uD83D\uDCC4 Download PDF" }), _jsx(Button, { variant: "outline", onClick: () => navigate('/my-membership'), children: "\u2190 Back to Dashboard" })] })] }), _jsxs(Footer, { children: [_jsx("div", { className: "thank-you", children: "Thank you for your membership!" }), _jsx("p", { children: "This invoice was generated automatically. For any questions or concerns, please contact our support team at support@tvkcanada.com or call (416) 555-0100." }), _jsx("p", { children: "TVK Canada \u2022 123 Queen Street West, Toronto, ON M5H 2M9 \u2022 www.tvkcanada.com" })] })] }) }) }));
};
