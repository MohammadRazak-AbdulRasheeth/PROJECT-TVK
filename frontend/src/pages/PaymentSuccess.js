import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Payment Success Page - Handles Stripe payment success callback
 */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section } from '@components/Layout';
import { Button } from '@components/Button';
import { membershipService } from '../services/api';
import { FaGift } from 'react-icons/fa6';
const SuccessCard = styled.div `
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
`;
const LoadingSpinner = styled.div `
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
`;
const ErrorCard = styled.div `
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid ${theme.colors.error};
  color: ${theme.colors.error};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;
export const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [membershipData, setMembershipData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        if (!sessionId) {
            setError('Invalid payment session. Please contact support.');
            setLoading(false);
            return;
        }
        confirmPayment(sessionId);
    }, [searchParams]);
    const confirmPayment = async (sessionId) => {
        try {
            const result = await membershipService.confirmPayment(sessionId);
            setMembershipData(result);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to confirm payment. Please contact support.');
        }
        finally {
            setLoading(false);
        }
    };
    const goToDashboard = () => {
        navigate('/my-membership');
    };
    if (loading) {
        return (_jsx(Section, { children: _jsx(Container, { children: _jsxs(LoadingSpinner, { children: [_jsx("div", { className: "spinner" }), "Processing your payment..."] }) }) }));
    }
    if (error) {
        return (_jsx(Section, { children: _jsx(Container, { children: _jsxs(ErrorCard, { children: [_jsx("h2", { children: "Payment Processing Error" }), _jsx("p", { children: error }), _jsx("div", { style: { marginTop: theme.spacing.lg }, children: _jsx(Button, { variant: "primary", onClick: () => navigate('/membership'), children: "Back to Membership" }) })] }) }) }));
    }
    return (_jsx(Section, { children: _jsx(Container, { children: _jsxs(SuccessCard, { children: [_jsx("div", { className: "success-icon", children: _jsx(FaGift, { size: 64 }) }), _jsx("h1", { children: "Welcome to TVK Canada!" }), membershipData?.status === 'active' ? (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Your membership is now active!" }), _jsxs("p", { style: { marginBottom: theme.spacing.lg, fontSize: theme.typography.fontSize.lg }, children: ["Congratulations! Your ", membershipData.type, " membership has been activated."] }), _jsxs("p", { style: { marginBottom: theme.spacing.xl }, children: ["Membership Number: ", _jsxs("strong", { children: ["#", membershipData.membershipNumber] })] })] })) : membershipData?.type === 'student' ? (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Payment received - verification pending" }), _jsx("p", { style: { marginBottom: theme.spacing.lg, fontSize: theme.typography.fontSize.lg }, children: "Thank you for your payment! Your student documents are being reviewed." }), _jsx("div", { style: {
                                    background: 'rgba(255, 152, 0, 0.1)',
                                    border: `1px solid ${theme.colors.warning}`,
                                    padding: theme.spacing.lg,
                                    borderRadius: theme.borderRadius.lg,
                                    marginBottom: theme.spacing.xl
                                }, children: _jsxs("p", { style: { margin: 0, color: theme.colors.warning }, children: [_jsx("strong", { children: "What's next?" }), _jsx("br", {}), "Our team will review your student ID and enrollment documents within 2-3 business days. You'll receive an email confirmation once your membership is approved and activated."] }) })] })) : (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Payment confirmed!" }), _jsx("p", { style: { marginBottom: theme.spacing.xl, fontSize: theme.typography.fontSize.lg }, children: "Your membership will be activated shortly. You'll receive a confirmation email with details." })] })), _jsxs("div", { style: { display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap' }, children: [_jsx(Button, { variant: "primary", onClick: goToDashboard, children: "View My Membership" }), _jsx(Button, { variant: "outline", onClick: () => navigate('/'), children: "Back to Home" })] }), _jsxs("div", { style: { marginTop: theme.spacing.xl, padding: theme.spacing.lg, background: theme.colors.background, borderRadius: theme.borderRadius.lg }, children: [_jsx("h4", { style: { color: theme.colors.primary, marginBottom: theme.spacing.md }, children: "What you get with your membership:" }), _jsxs("ul", { style: { textAlign: 'left', margin: 0, paddingLeft: theme.spacing.lg }, children: [_jsx("li", { children: "Access to exclusive TVK Canada events" }), _jsx("li", { children: "Member-only discounts at partner businesses" }), _jsx("li", { children: "Community forum access" }), _jsx("li", { children: "Monthly newsletters with exclusive content" }), membershipData?.type === 'student' && (_jsxs(_Fragment, { children: [_jsx("li", { children: "Student-only events and study groups" }), _jsx("li", { children: "Free movie nights and screenings" })] })), membershipData?.type === 'yearly' && (_jsxs(_Fragment, { children: [_jsx("li", { children: "VIP seating at major events" }), _jsx("li", { children: "Annual exclusive member gift" })] }))] })] })] }) }) }));
};
