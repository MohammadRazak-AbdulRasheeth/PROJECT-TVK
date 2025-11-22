import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Membership Page
 */
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section, Grid, Flex } from '@components/Layout';
import { Button } from '@components/Button';
import { membershipService } from '../services/api';
const PricingCard = styled.div `
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
`;
const OfferBanner = styled.div `
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
`;
const StepperContainer = styled.div `
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
`;
const StepItem = styled.div `
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
`;
const FAQContainer = styled.div `
  margin-top: ${theme.spacing.xxl};
`;
const FAQItem = styled.details `
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
`;
/**
 * Membership Page Component
 */
export const MembershipPage = () => {
    const [selectedPlan, setSelectedPlan] = useState('yearly');
    const [loading, setLoading] = useState(false);
    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const response = await membershipService.subscribe(selectedPlan);
            window.location.href = response.url;
        }
        catch (error) {
            console.error('Subscription failed:', error);
            alert('Failed to start subscription. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsx(Container, { children: _jsxs(OfferBanner, { children: [_jsx("h3", { children: "\uD83C\uDF89 Limited Offer: First 200 Members Get 6 Months FREE!" }), _jsx("p", { children: "Join TVK Canada now and receive 6 months of membership absolutely FREE, plus a Special Edition Founding Member Physical Card." })] }) }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsxs(Container, { children: [_jsx("h2", { style: { textAlign: 'center', marginBottom: theme.spacing.xxl }, children: "Membership Plans" }), _jsxs(Grid, { columns: 2, gap: theme.spacing.xl, children: [_jsxs(PricingCard, { featured: selectedPlan === 'monthly', children: [_jsx("h3", { children: "Monthly" }), _jsxs("div", { className: "price", children: ["$10", _jsx("span", { children: "/month" })] }), _jsx(Button, { variant: selectedPlan === 'monthly' ? 'secondary' : 'outline', fullWidth: true, onClick: () => setSelectedPlan('monthly'), children: selectedPlan === 'monthly' ? 'Selected' : 'Choose Plan' }), _jsxs("ul", { children: [_jsx("li", { children: "Official TVK Canada membership card" }), _jsx("li", { children: "Access to exclusive events" }), _jsx("li", { children: "Member-only discounts" }), _jsx("li", { children: "Community forum access" }), _jsx("li", { children: "Event early registration" })] })] }), _jsxs(PricingCard, { featured: selectedPlan === 'yearly', children: [_jsx("h3", { children: "Annual - Save $20!" }), _jsxs("div", { className: "price", children: ["$100", _jsx("span", { children: "/year" })] }), _jsx(Button, { variant: selectedPlan === 'yearly' ? 'secondary' : 'outline', fullWidth: true, onClick: () => setSelectedPlan('yearly'), children: selectedPlan === 'yearly' ? 'Selected' : 'Choose Plan' }), _jsxs("ul", { children: [_jsx("li", { children: "Official TVK Canada membership card" }), _jsx("li", { children: "Access to all exclusive events" }), _jsx("li", { children: "Premium partner discounts" }), _jsx("li", { children: "VIP community forum access" }), _jsx("li", { children: "Priority event registration" }), _jsx("li", { children: "Annual celebration invitation" })] })] })] }), _jsx(Flex, { justify: "center", style: { marginTop: theme.spacing.xl }, children: _jsx(Button, { variant: "primary", size: "lg", onClick: handleSubscribe, disabled: loading, children: loading ? 'Processing...' : `Subscribe to ${selectedPlan === 'monthly' ? 'Monthly' : 'Yearly'} Plan` }) })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h2", { style: { textAlign: 'center', marginBottom: theme.spacing.xxl }, children: "How It Works" }), _jsxs(StepperContainer, { children: [_jsxs(StepItem, { active: true, children: [_jsx("div", { className: "step-circle", children: "1" }), _jsx("h4", { children: "Sign Up Online" }), _jsx("p", { children: "Create your account once registration opens" })] }), _jsxs(StepItem, { active: true, children: [_jsx("div", { className: "step-circle", children: "2" }), _jsx("h4", { children: "Choose Plan" }), _jsx("p", { children: "Select Monthly or Yearly membership" })] }), _jsxs(StepItem, { active: true, children: [_jsx("div", { className: "step-circle", children: "3" }), _jsx("h4", { children: "Receive Your Card" }), _jsx("p", { children: "Physical card delivered to your address (2\u20134 weeks)" })] }), _jsxs(StepItem, { children: [_jsx("div", { className: "step-circle", children: "4" }), _jsx("h4", { children: "Enjoy Member Perks" }), _jsx("p", { children: "At events and partner businesses" })] }), _jsxs(StepItem, { children: [_jsx("div", { className: "step-circle", children: "5" }), _jsx("h4", { children: "Stay Connected" }), _jsx("p", { children: "Receive exclusive updates and announcements" })] })] }), _jsx(Flex, { justify: "center", style: { marginTop: theme.spacing.xl }, children: _jsx(Button, { variant: "primary", size: "lg", children: "Get Started Now" }) })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsxs(Container, { children: [_jsx("h2", { style: { marginBottom: theme.spacing.xxl }, children: "Frequently Asked Questions" }), _jsx(FAQContainer, { children: [
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
                            ].map((item, idx) => (_jsxs(FAQItem, { children: [_jsx("summary", { children: item.q }), _jsx("p", { children: item.a })] }, idx))) })] }) })] }));
};
