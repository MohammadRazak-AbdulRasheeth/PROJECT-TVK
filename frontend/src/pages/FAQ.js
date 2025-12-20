import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section } from '@components/Layout';
import { SEO } from '@components/SEO';
const FAQContainer = styled.div `
  max-width: 800px;
  margin: 0 auto;
`;
const FAQItem = styled.details `
  margin-bottom: ${theme.spacing.lg};
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  border: 2px solid ${theme.colors.border};
  cursor: pointer;
  transition: all ${theme.transitions.base};

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }

  &[open] {
    border-color: ${theme.colors.secondary};
    box-shadow: ${theme.shadows.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;
const FAQSummary = styled.summary `
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.sm};
  list-style: none;
  position: relative;
  padding-right: ${theme.spacing.lg};

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: '+';
    position: absolute;
    right: 0;
    top: 0;
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.secondary};
    transition: transform ${theme.transitions.base};
  }

  details[open] &::after {
    transform: rotate(45deg);
  }

  &:hover {
    color: ${theme.colors.secondary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.base};
  }
`;
const FAQAnswer = styled.div `
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};

  p {
    margin-bottom: ${theme.spacing.sm};
  }

  ul {
    margin-left: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.sm};
  }

  li {
    margin-bottom: ${theme.spacing.xs};
  }
`;
const CategorySection = styled.div `
  margin-bottom: ${theme.spacing.xxxl};

  h2 {
    color: ${theme.colors.primary};
    text-align: center;
    margin-bottom: ${theme.spacing.xl};
    font-size: ${theme.typography.fontSize['2xl']};
    
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background: ${theme.colors.secondary};
      margin: ${theme.spacing.md} auto 0;
      border-radius: ${theme.borderRadius.sm};
    }
  }
`;
/**
 * FAQ Page Component
 */
export const FAQPage = () => {
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "Frequently Asked Questions - TVK Canada", description: "Get answers to common questions about TVK Canada membership, events, and community activities.", keywords: "TVK Canada FAQ, Thalapathy Vijay fan club questions, membership FAQ, events FAQ, Tamil community Canada", canonicalUrl: "https://tvkcanada.family/faq" }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h1", { style: {
                                textAlign: 'center',
                                marginBottom: theme.spacing.lg,
                                fontSize: theme.typography.fontSize['4xl'],
                                fontWeight: theme.typography.fontWeight.bold,
                                color: theme.colors.primary
                            }, children: "Frequently Asked Questions (FAQ)" }), _jsx("p", { style: {
                                textAlign: 'center',
                                marginBottom: theme.spacing.xxxl,
                                fontSize: theme.typography.fontSize.lg,
                                color: theme.colors.text.secondary,
                                maxWidth: '600px',
                                margin: `0 auto ${theme.spacing.xxxl} auto`
                            }, children: "Find answers to common questions about TVK Canada membership, events, and community activities." })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsx(Container, { children: _jsxs(FAQContainer, { children: [_jsxs(CategorySection, { children: [_jsx("h2", { children: "General Information" }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "What is TVK Canada?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "TVK Canada (Tamizhaga Vetri Kazhagam Canada) is the official Thalapathy Vijay fan club for Canada. We're a membership-driven nonprofit organization dedicated to recreation, empowerment, and giving back to the Tamil community across Canada." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Who can join TVK Canada?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Anyone who is a fan of Thalapathy Vijay and shares our values of community, empowerment, and cultural celebration can join. Members must be residents of Canada or have strong ties to the Canadian Tamil community." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How is TVK Canada organized?" }), _jsxs(FAQAnswer, { children: [_jsx("p", { children: "We operate as a decentralized network with local chapters across major Canadian cities including:" }), _jsxs("ul", { children: [_jsx("li", { children: "Toronto & GTA (Greater Toronto Area)" }), _jsx("li", { children: "Vancouver & Lower Mainland" }), _jsx("li", { children: "Calgary & Edmonton" }), _jsx("li", { children: "Montreal & Quebec" }), _jsx("li", { children: "Other major cities with Tamil communities" })] })] })] })] }), _jsxs(CategorySection, { children: [_jsx("h2", { children: "Membership" }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How much does membership cost?" }), _jsxs(FAQAnswer, { children: [_jsx("p", { children: "We offer flexible membership options:" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Monthly:" }), " $15/month"] }), _jsxs("li", { children: [_jsx("strong", { children: "Yearly:" }), " $150/year (Save $30!)"] }), _jsxs("li", { children: [_jsx("strong", { children: "Lifetime:" }), " $500 one-time (Best value)"] })] }), _jsx("p", { children: "All memberships include access to exclusive events, community networking, and special member benefits." })] })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Is membership currently open?" }), _jsx(FAQAnswer, { children: _jsxs("p", { children: [_jsx("strong", { children: "Yes! Membership is now open." }), " We're accepting new members and building our community across Canada. Join today to be part of the founding members of TVK Canada."] }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "What benefits do members get?" }), _jsxs(FAQAnswer, { children: [_jsx("p", { children: "TVK Canada members enjoy:" }), _jsxs("ul", { children: [_jsx("li", { children: "Exclusive access to member-only events and movie premieres" }), _jsx("li", { children: "Early bird discounts for all TVK activities" }), _jsx("li", { children: "Direct networking with Tamil professionals across Canada" }), _jsx("li", { children: "Access to our private member community and forums" }), _jsx("li", { children: "Special merchandise and collectibles" }), _jsx("li", { children: "Priority booking for limited-capacity events" })] })] })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Can I cancel my membership anytime?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Yes, you can cancel your monthly or yearly membership at any time through your member dashboard. Lifetime memberships are non-refundable but provide permanent access to TVK Canada benefits." }) })] })] }), _jsxs(CategorySection, { children: [_jsx("h2", { children: "Events & Activities" }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "When will the TVK events start?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Our full service event rollout will begin once we reach 200 members. However, online events will start as soon as we reach 100 members, so members can begin engaging early." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "What kind of events are you looking to run?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "We plan to offer motivational group sessions and organize recreational programs based on the interests and feedback of our members, ensuring events are relevant and community-driven." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Will we be charged before the events start?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "No. We are currently offering a free promotional period, and this period will be extended if needed to ensure members experience value before any charges apply." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Are events held in all cities?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "We aim to organize events in all major Canadian cities with significant Tamil populations. Initially, events will be concentrated in Toronto, Vancouver, and Calgary, with expansion to other cities as our membership grows." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Can non-members attend public events?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Some of our events are open to the general public, while others are exclusive to members. Check the event details on our Events page for specific access requirements." }) })] })] }), _jsxs(CategorySection, { children: [_jsx("h2", { children: "Community & Support" }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How can I get involved beyond attending events?" }), _jsxs(FAQAnswer, { children: [_jsx("p", { children: "We welcome active community participation! You can:" }), _jsxs("ul", { children: [_jsx("li", { children: "Volunteer at events and community activities" }), _jsx("li", { children: "Join our social media team to help promote TVK Canada" }), _jsx("li", { children: "Suggest and help organize local events in your city" }), _jsx("li", { children: "Participate in our charitable initiatives" }), _jsx("li", { children: "Become a local chapter coordinator" })] })] })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Do you have any charitable initiatives?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Yes! As part of our commitment to giving back, we organize regular charitable activities including food drives, educational scholarships for Tamil students, and support for Tamil families in need across Canada." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How can I contact TVK Canada for support?" }), _jsxs(FAQAnswer, { children: [_jsx("p", { children: "You can reach us through:" }), _jsxs("ul", { children: [_jsx("li", { children: "Email: contact@tvkcanada.family" }), _jsx("li", { children: "Phone: +1 (647) 123-4567" }), _jsx("li", { children: "Contact form on our website" }), _jsx("li", { children: "Instagram: @tvk.canada" }), _jsx("li", { children: "Facebook: TVK Canada Official" })] }), _jsx("p", { children: "Our team typically responds within 24 hours." })] })] })] }), _jsxs(CategorySection, { children: [_jsx("h2", { children: "Technical & Website" }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How do I reset my password?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Click on \"Forgot Password\" on the login page, enter your email address, and we'll send you a password reset link. If you continue to have issues, contact our support team." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Can I update my membership plan?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Yes, you can upgrade or downgrade your membership plan anytime through your member dashboard. Changes will take effect at your next billing cycle." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Is my personal information secure?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Absolutely. We use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your explicit consent." }) })] })] })] }) }) })] }));
};
