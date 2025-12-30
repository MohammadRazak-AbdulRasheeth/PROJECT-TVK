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
                            }, children: "Find answers to common questions about TVK Canada membership, events, and community activities." })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsx(Container, { children: _jsxs(FAQContainer, { children: [_jsxs(CategorySection, { children: [_jsx("h2", { children: "General Information" }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "What is TVK Canada?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "TVK Canada (Tamizhaga Vetri Kazhagam Canada) is the official Thalapathy Vijay fan club for Canada. We're a membership-driven nonprofit organization dedicated to recreation, empowerment, and giving back to the Tamil community across Canada." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Who can join TVK Canada?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Anyone who is a fan of Thalapathy Vijay and shares our values of community, empowerment, and cultural celebration can join. Members must be residents of Canada or have strong ties to the Canadian Tamil community." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How is TVK Canada organized?" }), _jsxs(FAQAnswer, { children: [_jsx("p", { children: "We operate as a decentralized network with local chapters across major Canadian cities including:" }), _jsxs("ul", { children: [_jsx("li", { children: "Toronto & GTA (Greater Toronto Area)" }), _jsx("li", { children: "Vancouver & Lower Mainland" }), _jsx("li", { children: "Calgary & Edmonton" }), _jsx("li", { children: "Montreal & Quebec" }), _jsx("li", { children: "Other major cities with Tamil communities" })] })] })] })] }), _jsxs(CategorySection, { children: [_jsx("h2", { children: "Community Membership" }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Is it free to join TVK Canada?" }), _jsx(FAQAnswer, { children: _jsxs("p", { children: [_jsx("strong", { children: "Yes! Joining TVK Canada is completely free." }), " We're a community-first organization focused on wellness, mental health, sports, and growth. No payment is required to become a community member."] }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Is membership currently open?" }), _jsx(FAQAnswer, { children: _jsxs("p", { children: [_jsx("strong", { children: "Yes! Community membership is now open." }), " We're welcoming new members and building our family across Canada. Join today to be part of the TVK Canada community."] }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "What benefits do community members get?" }), _jsxs(FAQAnswer, { children: [_jsx("p", { children: "TVK Canada community members enjoy:" }), _jsxs("ul", { children: [_jsx("li", { children: "Updates on programs and events" }), _jsx("li", { children: "Early access to drop-in registrations" }), _jsx("li", { children: "Priority booking for movie nights" }), _jsx("li", { children: "Community newsletter" }), _jsx("li", { children: "Networking with Tamil community members across Canada" }), _jsx("li", { children: "Future member perks and discounts" })] })] })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Are there any paid programs?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Some drop-in programs have a small fee to cover venue costs (e.g., Basketball Drop-In is $15 per session). However, many programs like Mental Health Drop-In are completely free. Check the Programs page for specific pricing." }) })] })] }), _jsxs(CategorySection, { children: [_jsx("h2", { children: "Events & Activities" }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "What programs does TVK Canada offer?" }), _jsxs(FAQAnswer, { children: [_jsx("p", { children: "We offer a variety of community programs including:" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Mental Health Drop-In:" }), " Weekly, free sessions starting after Pongal"] }), _jsxs("li", { children: [_jsx("strong", { children: "Basketball Drop-In:" }), " Weekly in Durham Region, $15 per session"] }), _jsxs("li", { children: [_jsx("strong", { children: "Indoor Sports On-Demand:" }), " Starting January 15, based on group interest"] }), _jsxs("li", { children: [_jsx("strong", { children: "Summer Sports:" }), " Cricket and more outdoor activities"] }), _jsxs("li", { children: [_jsx("strong", { children: "Monthly Movie Watch Parties:" }), " Community members get priority access"] })] })] })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How do I participate in drop-in programs?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Simply join TVK Canada for free to receive updates about upcoming programs. When a program is scheduled, community members get early access to register. Some programs may have a small fee to cover venue costs." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Can I suggest a new program or sport?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Absolutely! We organize programs based on community interest. If you have a sport or activity you'd like to see, contact us through our Contact page or reach out on social media. We're building this community together!" }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Are events held in all cities?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "We aim to organize events in all major Canadian cities with significant Tamil populations. Initially, events will be concentrated in Toronto, Vancouver, and Calgary, with expansion to other cities as our community grows." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Can anyone attend events?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Most of our programs are open to all community members. Some events may have limited capacity, in which case registered community members get priority. Check the event details on our Events page for specific information." }) })] })] }), _jsxs(CategorySection, { children: [_jsx("h2", { children: "Community & Support" }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How can I get involved beyond attending events?" }), _jsxs(FAQAnswer, { children: [_jsx("p", { children: "We welcome active community participation! You can:" }), _jsxs("ul", { children: [_jsx("li", { children: "Volunteer at events and community activities" }), _jsx("li", { children: "Join our social media team to help promote TVK Canada" }), _jsx("li", { children: "Suggest and help organize local events in your city" }), _jsx("li", { children: "Participate in our charitable initiatives" }), _jsx("li", { children: "Become a local chapter coordinator" })] })] })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Do you have any charitable initiatives?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Yes! As part of our commitment to giving back, we organize regular charitable activities including food drives, educational scholarships for Tamil students, and support for Tamil families in need across Canada." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How can I contact TVK Canada for support?" }), _jsxs(FAQAnswer, { children: [_jsx("p", { children: "You can reach us through:" }), _jsxs("ul", { children: [_jsx("li", { children: "Email: contact@tvkcanada.family" }), _jsx("li", { children: "Phone: +1 (647) 123-4567" }), _jsx("li", { children: "Contact form on our website" }), _jsx("li", { children: "Instagram: @tvk.canada" }), _jsx("li", { children: "Facebook: TVK Canada Official" })] }), _jsx("p", { children: "Our team typically responds within 24 hours." })] })] })] }), _jsxs(CategorySection, { children: [_jsx("h2", { children: "Technical & Website" }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How do I update my profile information?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "You can update your profile information by logging into your account and visiting your profile settings. If you need to change your email address, please contact our support team." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "How do I stay updated on programs and events?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Join TVK Canada for free to receive email updates about programs and events. You can also follow us on social media for the latest announcements." }) })] }), _jsxs(FAQItem, { children: [_jsx(FAQSummary, { children: "Is my personal information secure?" }), _jsx(FAQAnswer, { children: _jsx("p", { children: "Absolutely. We use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your explicit consent." }) })] })] })] }) }) })] }));
};
