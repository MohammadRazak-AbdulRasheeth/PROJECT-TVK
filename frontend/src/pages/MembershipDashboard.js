import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Membership Dashboard Component
 */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section } from '@components/Layout';
import { Button } from '@components/Button';
import { membershipService } from '../services/api';
const DashboardCard = styled.div `
  background: ${theme.colors.surface}
  border-radius: ${theme.borderRadius['2xl']}
  padding: ${theme.spacing.xl}
  margin-bottom: ${theme.spacing.xl}
  border-left: 4px solid ${theme.colors.primary}
  box-shadow: ${theme.shadows.md}
`;
const StatusBadge = styled.span `
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
        `;
        case 'pending':
            return `
          background: rgba(255, 152, 0, 0.1);
          color: ${theme.colors.warning};
          border: 1px solid ${theme.colors.warning};
        `;
        case 'expired':
        case 'cancelled':
            return `
          background: rgba(244, 67, 54, 0.1);
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error};
        `;
        default:
            return `
          background: ${theme.colors.border};
          color: ${theme.colors.text.secondary};
        `;
    }
}}
`;
const MembershipCard = styled.div `
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
`;
const PerksList = styled.div `
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: ${theme.spacing.lg}
  margin: ${theme.spacing.xl} 0
`;
const PerkCard = styled.div `
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
`;
const LoadingSpinner = styled.div `
  display: flex
  justify-content: center
  align-items: center
  height: 200px
  font-size: ${theme.typography.fontSize.lg}
  color: ${theme.colors.text.secondary}
`;
const ErrorMessage = styled.div `
  background: rgba(244, 67, 54, 0.1)
  border: 1px solid ${theme.colors.error}
  color: ${theme.colors.error}
  padding: ${theme.spacing.lg}
  border-radius: ${theme.borderRadius.lg}
  margin: ${theme.spacing.xl} 0
  text-align: center
`;
export const MembershipDashboard = () => {
    const [membershipData, setMembershipData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        fetchMembershipData();
    }, []);
    const fetchMembershipData = async () => {
        try {
            const data = await membershipService.getMembershipStatus();
            setMembershipData(data);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to load membership data');
        }
        finally {
            setLoading(false);
        }
    };
    const handleDownloadCard = async () => {
        if (membershipData?.digitalCardUrl) {
            window.open(membershipData.digitalCardUrl, '_blank');
        }
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const getMembershipPerks = (type) => {
        const basePerks = [
            { icon: '🎟️', title: 'Event Access', description: 'Priority access to all TVK events' },
            { icon: '💰', title: 'Member Discounts', description: 'Exclusive discounts at partner businesses' },
            { icon: '💬', title: 'Community Forum', description: 'Access to member-only discussions' },
            { icon: '📰', title: 'Newsletter', description: 'Monthly updates and exclusive content' }
        ];
        if (type === 'student') {
            return [
                ...basePerks,
                { icon: '📚', title: 'Study Groups', description: 'Join student study sessions' },
                { icon: '🎬', title: 'Movie Nights', description: 'Free student movie screenings' }
            ];
        }
        if (type === 'yearly') {
            return [
                ...basePerks,
                { icon: '🏆', title: 'VIP Access', description: 'VIP seating at major events' },
                { icon: '🎁', title: 'Annual Gift', description: 'Exclusive annual member gift' }
            ];
        }
        return basePerks;
    };
    if (loading) {
        return (_jsx(Section, { children: _jsx(Container, { children: _jsx(LoadingSpinner, { children: "Loading your membership details..." }) }) }));
    }
    if (error) {
        return (_jsx(Section, { children: _jsx(Container, { children: _jsx(ErrorMessage, { children: error }) }) }));
    }
    if (!membershipData) {
        return (_jsx(Section, { children: _jsx(Container, { children: _jsxs(DashboardCard, { children: [_jsx("h2", { children: "No Active Membership" }), _jsx("p", { children: "You don't have an active membership yet. Join TVK Canada to access exclusive benefits!" }), _jsx(Button, { variant: "primary", onClick: () => window.location.href = '/membership', children: "View Membership Plans" })] }) }) }));
    }
    return (_jsx(Section, { children: _jsxs(Container, { children: [_jsx("h1", { style: { textAlign: 'center', marginBottom: theme.spacing.xl }, children: "My TVK Canada Membership" }), _jsxs(DashboardCard, { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }, children: [_jsxs("h2", { style: { margin: 0, textTransform: 'capitalize' }, children: [membershipData.type, " Membership"] }), _jsx(StatusBadge, { status: membershipData.status, children: membershipData.status })] }), membershipData.status === 'pending' && membershipData.verificationStatus === 'pending' && (_jsxs("div", { style: {
                                background: 'rgba(255, 152, 0, 0.1)',
                                border: `1px solid ${theme.colors.warning}`,
                                padding: theme.spacing.lg,
                                borderRadius: theme.borderRadius.lg,
                                marginBottom: theme.spacing.lg
                            }, children: [_jsx("h4", { style: { color: theme.colors.warning, margin: '0 0 8px 0' }, children: "Verification Pending" }), _jsx("p", { style: { margin: 0, fontSize: theme.typography.fontSize.sm }, children: "Your student documents are being reviewed. You'll receive an email once your membership is activated. Expected processing time: 2-3 business days." })] })), membershipData.status === 'active' && (_jsxs(MembershipCard, { children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { children: "TVK CANADA" }), _jsx("div", { className: "logo", children: "TVK" })] }), _jsxs("div", { className: "member-info", children: [_jsxs("div", { className: "member-number", children: ["#", membershipData.membershipNumber] }), _jsxs("div", { className: "member-since", children: ["Member since ", membershipData.activatedAt && formatDate(membershipData.activatedAt)] })] })] })), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: theme.spacing.lg }, children: [membershipData.activatedAt && (_jsxs("div", { children: [_jsx("strong", { children: "Activated:" }), _jsx("br", {}), formatDate(membershipData.activatedAt)] })), membershipData.expiresAt && (_jsxs("div", { children: [_jsx("strong", { children: "Expires:" }), _jsx("br", {}), formatDate(membershipData.expiresAt)] })), membershipData.nextBillingDate && (_jsxs("div", { children: [_jsx("strong", { children: "Next Billing:" }), _jsx("br", {}), formatDate(membershipData.nextBillingDate)] }))] }), membershipData.status === 'active' && membershipData.digitalCardUrl && (_jsx("div", { style: { marginTop: theme.spacing.lg }, children: _jsx(Button, { variant: "secondary", onClick: handleDownloadCard, children: "Download Digital Card" }) }))] }), membershipData.status === 'active' && (_jsxs(DashboardCard, { children: [_jsx("h3", { style: { marginBottom: theme.spacing.xl }, children: "Your Membership Benefits" }), _jsx(PerksList, { children: getMembershipPerks(membershipData.type).map((perk, index) => (_jsxs(PerkCard, { children: [_jsx("div", { className: "icon", children: perk.icon }), _jsx("h4", { children: perk.title }), _jsx("p", { children: perk.description })] }, index))) })] })), _jsxs(DashboardCard, { children: [_jsx("h3", { children: "Need Help?" }), _jsx("p", { style: { marginBottom: theme.spacing.lg }, children: "Have questions about your membership or need support? We're here to help!" }), _jsxs("div", { style: { display: 'flex', gap: theme.spacing.md, flexWrap: 'wrap' }, children: [_jsx(Button, { variant: "outline", onClick: () => window.location.href = '/contact', children: "Contact Support" }), _jsx(Button, { variant: "outline", onClick: () => window.location.href = '/membership', children: "View All Plans" })] })] })] }) }));
};
