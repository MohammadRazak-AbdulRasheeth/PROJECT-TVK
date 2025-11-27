import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Membership Page
 */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section, Grid, Flex } from '@components/Layout';
import { Button } from '@components/Button';
import { useAuth } from '../context/AuthContext';
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
const JoinModal = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.md};
  }
`;
const JoinModalContent = styled.div `
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${theme.shadows.xl};
  border: 2px solid ${theme.colors.secondary};

  h3 {
    text-align: center;
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.primary};
  }

  #joinit-widget-H4x4Dy5Mnr5eCYrSg {
    min-height: 500px;
    border-radius: ${theme.borderRadius.lg};
    overflow: hidden;

    iframe {
      border-radius: ${theme.borderRadius.lg};
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg};
    max-height: 85vh;
    
    #joinit-widget-H4x4Dy5Mnr5eCYrSg {
      min-height: 400px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    margin: ${theme.spacing.sm};
    max-height: 80vh;
  }
`;
const CloseButton = styled.button `
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  transition: all ${theme.transitions.base};
  z-index: 1001;

  &:hover {
    background: ${theme.colors.secondary};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;
const CurrentPlanBadge = styled.div `
  position: absolute;
  top: ${theme.spacing.sm};
  left: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  background: linear-gradient(135deg, ${theme.colors.secondary} 0%, #ffed4e 100%);
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  box-shadow: ${theme.shadows.lg};
  z-index: 2;
  animation: glow 2s ease-in-out infinite alternate;

  @keyframes glow {
    from {
      box-shadow: ${theme.shadows.lg};
    }
    to {
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.xs};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }
`;
// const JoinButton = styled(Button)`
//   background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent || '#8b1428'} 100%);
//   border: 2px solid ${theme.colors.secondary};
//   box-shadow: ${theme.shadows.lg};
//   font-weight: ${theme.typography.fontWeight.bold};
//   text-transform: none;
//   letter-spacing: 0.5px;
//   transition: all ${theme.transitions.base};
//   position: relative;
//   overflow: hidden;
//   white-space: nowrap;
//   /* Desktop styles */
//   font-size: ${theme.typography.fontSize.lg};
//   padding: ${theme.spacing.lg} ${theme.spacing.xxl};
//   min-height: 56px;
//   min-width: 320px;
//   /* Hover effect */
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
//     transition: left 0.6s ease;
//   }
//   &:hover {
//     transform: translateY(-3px) scale(1.02);
//     box-shadow: ${theme.shadows.xl};
//     background: linear-gradient(135deg, ${theme.colors.accent || '#8b1428'} 0%, ${theme.colors.primary} 100%);
//     &::before {
//       left: 100%;
//     }
//   }
//   &:active {
//     transform: translateY(-1px) scale(1.01);
//   }
//   /* Tablet styles */
//   @media (max-width: ${theme.breakpoints.desktop}) {
//     font-size: ${theme.typography.fontSize.base};
//     padding: ${theme.spacing.md} ${theme.spacing.xl};
//     min-height: 52px;
//     min-width: 280px;
//   }
//   /* Mobile styles */
//   @media (max-width: ${theme.breakpoints.tablet}) {
//     font-size: ${theme.typography.fontSize.base};
//     padding: ${theme.spacing.md} ${theme.spacing.lg};
//     min-height: 48px;
//     min-width: 250px;
//     width: 100%;
//     max-width: 320px;
//     margin: 0 auto;
//     /* Adjust text for smaller screens */
//     font-size: ${theme.typography.fontSize.sm};
//   }
//   /* Small mobile styles */
//   @media (max-width: ${theme.breakpoints.mobile}) {
//     font-size: ${theme.typography.fontSize.sm};
//     padding: ${theme.spacing.sm} ${theme.spacing.md};
//     min-height: 44px;
//     min-width: 200px;
//     letter-spacing: 0.25px;
//     /* Even more compact text for very small screens */
//     &::after {
//       content: '🚀 Join Now!';
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       width: 100%;
//       display: none;
//     }
//   }
//   /* Extra small screens - show shortened text */
//   @media (max-width: 320px) {
//     span {
//       display: none;
//     }
//     &::after {
//       display: block;
//     }
//   }
//   /* Ensure proper sizing on touch devices */
//   @media (hover: none) and (pointer: coarse) {
//     min-height: 48px;
//     padding: ${theme.spacing.md} ${theme.spacing.lg};
//     &:active {
//       transform: scale(0.97);
//       transition: transform 0.1s ease;
//     }
//   }
// `
// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0 ${theme.spacing.md};
//   width: 100%;
//   @media (max-width: ${theme.breakpoints.tablet}) {
//     padding: 0 ${theme.spacing.sm};
//   }
//   @media (max-width: ${theme.breakpoints.mobile}) {
//     padding: 0 ${theme.spacing.xs};
//   }
// `
/**
 * Membership Page Component
 */
export const MembershipPage = () => {
    const [selectedPlan] = useState('yearly');
    const [userMembership, setUserMembership] = useState(null);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const { isAuthenticated, hasValidToken, user, isLoading } = useAuth();
    // Debug logging
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Auth Debug:', {
            isAuthenticated,
            hasValidToken: hasValidToken(),
            user,
            isLoading,
            token: token ? 'Present' : 'None',
            tokenLength: token?.length
        });
    }, [isAuthenticated, hasValidToken, user, isLoading]);
    // Fetch user membership status if authenticated
    useEffect(() => {
        const fetchMembershipStatus = async () => {
            if (user && (isAuthenticated || hasValidToken())) {
                try {
                    // First check if user object already has membership info
                    if (user.membership) {
                        setUserMembership(user.membership);
                    }
                    else {
                        // Fallback to API call if needed
                        const membershipData = await membershipService.getMembershipStatus();
                        setUserMembership(membershipData);
                    }
                }
                catch (error) {
                    console.log('Failed to fetch membership status:', error);
                    setUserMembership(null);
                }
            }
            else {
                setUserMembership(null);
            }
        };
        fetchMembershipStatus();
    }, [user, isAuthenticated, hasValidToken]);
    // Load Join It widget script when modal opens
    useEffect(() => {
        if (showJoinModal) {
            const loadJoinItScript = () => {
                // Check if script already exists
                if (document.querySelector('script[src*="joinit.com/embed/widget"]')) {
                    return;
                }
                const script = document.createElement('script');
                script.src = 'https://app.joinit.com/embed/widget/H4x4Dy5Mnr5eCYrSg/embedCode';
                script.async = true;
                const firstScript = document.getElementsByTagName('script')[0];
                if (firstScript && firstScript.parentNode) {
                    firstScript.parentNode.insertBefore(script, firstScript);
                }
                // Add message listener for Join It widget
                const handleMessage = (event) => {
                    if (event.data === 'request-url') {
                        if (event.source) {
                            event.source.postMessage(window.location.href, { targetOrigin: event.origin });
                        }
                    }
                };
                window.addEventListener('message', handleMessage, false);
                return () => {
                    window.removeEventListener('message', handleMessage, false);
                };
            };
            const cleanup = loadJoinItScript();
            return cleanup;
        }
    }, [showJoinModal]);
    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && showJoinModal) {
                setShowJoinModal(false);
            }
        };
        if (showJoinModal) {
            document.addEventListener('keydown', handleEscKey);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [showJoinModal]);
    // Helper function to check if a plan is currently active
    const isPlanActivated = (planType) => {
        if (!userMembership || !userMembership.hasActiveMembership)
            return false;
        // Map plan types to match membership types
        const membershipType = userMembership.type;
        if (planType === 'yearly' && membershipType === 'yearly')
            return true;
        if (planType === 'monthly' && membershipType === 'monthly')
            return true;
        if (planType === 'student' && membershipType === 'student')
            return true;
        return false;
    };
    return (_jsxs(_Fragment, { children: [_jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsx(Container, { children: _jsxs(OfferBanner, { children: [_jsx("h3", { children: "\uD83C\uDF89 Limited Offer: First 200 Members Get 6 Months FREE!" }), _jsx("p", { children: "Join TVK Canada now and receive 6 months of membership absolutely FREE, plus a Special Edition Founding Member Physical Card." })] }) }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsxs(Container, { children: [_jsx("h2", { style: { textAlign: 'center', marginBottom: theme.spacing.xxl }, children: "Membership Plans" }), _jsxs(Grid, { columns: 3, gap: theme.spacing.xl, children: [_jsxs(PricingCard, { featured: selectedPlan === 'monthly', children: [isPlanActivated('monthly') && _jsx(CurrentPlanBadge, { children: "\u2713 Your Current Plan" }), _jsx("h3", { children: "Monthly" }), _jsxs("div", { className: "price", children: ["$10", _jsx("span", { children: "/month" })] }), _jsxs("ul", { children: [_jsx("li", { children: "Official TVK Canada membership card" }), _jsx("li", { children: "Access to exclusive events" }), _jsx("li", { children: "Member-only discounts" }), _jsx("li", { children: "Community forum access" }), _jsx("li", { children: "Event early registration" })] })] }), _jsxs(PricingCard, { featured: selectedPlan === 'yearly', children: [isPlanActivated('yearly') && _jsx(CurrentPlanBadge, { children: "\u2713 Your Current Plan" }), _jsx("h3", { style: { color: "#fff" }, children: "Annual - Save $20!" }), _jsxs("div", { className: "price", children: ["$100", _jsx("span", { children: "/year" })] }), _jsxs("ul", { children: [_jsx("li", { children: "Official TVK Canada membership card" }), _jsx("li", { children: "Access to all exclusive events" }), _jsx("li", { children: "Premium partner discounts" }), _jsx("li", { children: "VIP community forum access" }), _jsx("li", { children: "Priority event registration" }), _jsx("li", { children: "Annual celebration invitation" })] })] }), _jsxs(PricingCard, { featured: selectedPlan === 'student', children: [isPlanActivated('student') && _jsx(CurrentPlanBadge, { children: "\u2713 Your Current Plan" }), _jsx("h3", { children: "Student" }), _jsxs("div", { className: "price", children: ["$5", _jsx("span", { children: "/month" })] }), _jsxs("ul", { children: [_jsx("li", { children: "Student ID verification required" }), _jsx("li", { children: "Access to student events" }), _jsx("li", { children: "Student-only discounts" }), _jsx("li", { children: "Community forum access" }), _jsx("li", { children: "Movie night access" }), _jsx("li", { children: "Study group invitations" })] })] })] })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h2", { style: { textAlign: 'center', marginBottom: theme.spacing.xxl }, children: "How It Works" }), _jsxs(StepperContainer, { children: [_jsxs(StepItem, { active: true, children: [_jsx("div", { className: "step-circle", children: "1" }), _jsx("h4", { children: "Sign Up Online" }), _jsx("p", { children: "Create your account once registration opens" })] }), _jsxs(StepItem, { active: true, children: [_jsx("div", { className: "step-circle", children: "2" }), _jsx("h4", { children: "Choose Plan" }), _jsx("p", { children: "Select Monthly or Yearly membership" })] }), _jsxs(StepItem, { active: true, children: [_jsx("div", { className: "step-circle", children: "3" }), _jsx("h4", { children: "Receive Your Card" }), _jsx("p", { children: "Physical card delivered to your address (2\u20134 weeks)" })] }), _jsxs(StepItem, { children: [_jsx("div", { className: "step-circle", children: "4" }), _jsx("h4", { children: "Enjoy Member Perks" }), _jsx("p", { children: "At events and partner businesses" })] }), _jsxs(StepItem, { children: [_jsx("div", { className: "step-circle", children: "5" }), _jsx("h4", { children: "Stay Connected" }), _jsx("p", { children: "Receive exclusive updates and announcements" })] })] }), _jsx(Flex, { justify: "center", style: { marginTop: theme.spacing.xl }, children: _jsx(Button, { variant: "primary", size: "lg", children: "Get Started Now" }) })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsxs(Container, { children: [_jsx("h2", { style: { marginBottom: theme.spacing.xxl }, children: "Frequently Asked Questions" }), _jsx(FAQContainer, { children: [
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
                            ].map((item, idx) => (_jsxs(FAQItem, { children: [_jsx("summary", { children: item.q }), _jsx("p", { children: item.a })] }, idx))) })] }) }), _jsx(JoinModal, { isOpen: showJoinModal, children: _jsxs(JoinModalContent, { children: [_jsx(CloseButton, { onClick: () => setShowJoinModal(false), "aria-label": "Close modal", children: "\u00D7" }), _jsx("h3", { children: "Complete Your Membership Registration" }), _jsx("div", { id: "joinit-widget-H4x4Dy5Mnr5eCYrSg", children: _jsxs("noscript", { children: ["View ", _jsx("a", { href: "https://app.joinit.com/o/tvkcanada", children: "Membership Website" }), " powered by ", _jsx("a", { href: "https://joinit.com", children: "Membership Software by Join It" })] }) })] }) })] }));
};
