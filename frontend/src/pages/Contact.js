import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Contact Us Page (stub)
 */
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section, Grid, Flex } from '@components/Layout';
import { Button } from '@components/Button';
import { FaXTwitter, FaInstagram, FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { FaWhatsapp, FaMapLocationDot, FaEnvelope } from 'react-icons/fa6';
import { contactService } from '../services/api';
const ContactForm = styled.form `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;
const SocialIconLink = styled.a `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  border-radius: ${theme.borderRadius['2xl']};
  text-decoration: none;
  transition: all ${theme.transitions.base};
  box-shadow: ${theme.shadows.md};
  font-size: 28px;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px) scale(1.1);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.secondary};
    background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary});
  }

  &:active {
    transform: scale(0.95);
    box-shadow: ${theme.shadows.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    font-size: 24px;

    &:active {
      transform: scale(0.9);
    }
  }
`;
const ContactInfoItem = styled.div `
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  align-items: flex-start;
  padding: ${theme.spacing.md};
  background: linear-gradient(135deg, ${theme.colors.surface} 0%, #fafafa 100%);
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${theme.colors.secondary};
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateX(8px);
    box-shadow: ${theme.shadows.md};
    border-left-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.md};
  }
`;
const ContactIcon = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  border-radius: ${theme.borderRadius.lg};
  font-size: 24px;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }
`;
const ContactDetails = styled.div `
  flex: 1;

  h4 {
    color: ${theme.colors.primary};
    margin: 0 0 ${theme.spacing.sm} 0;
    font-weight: ${theme.typography.fontWeight.bold};
  }

  p, a {
    margin: 0;
    color: ${theme.colors.text.secondary};
    text-decoration: none;
    font-size: ${theme.typography.fontSize.base};
    transition: color ${theme.transitions.base};

    &:hover {
      color: ${theme.colors.primary};
      text-decoration: underline;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    h4 {
      font-size: ${theme.typography.fontSize.sm};
    }

    p, a {
      font-size: ${theme.typography.fontSize.sm};
    }
  }
`;
const FormGroup = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  label {
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    font-size: ${theme.typography.fontSize.base};
  }

  input,
  textarea,
  select {
    padding: ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.base};
    min-height: 44px;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    input,
    textarea,
    select {
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      font-size: ${theme.typography.fontSize.sm};
    }

    label {
      font-size: ${theme.typography.fontSize.sm};
    }

    textarea {
      min-height: 100px;
    }
  }
`;
/**
 * Contact Us Page Component
 */
export const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            city: formData.get('city'),
            type: formData.get('subject'),
            message: formData.get('message')
        };
        try {
            await contactService.submitForm(data);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            e.target.reset();
        }
        catch (error) {
            console.error('Failed to submit form:', error);
            alert('Failed to send message. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h1", { style: { textAlign: 'center', marginBottom: theme.spacing.lg }, children: "Contact Us" }), _jsx("p", { style: {
                                textAlign: 'center',
                                marginBottom: theme.spacing.xxl,
                                fontSize: '18px',
                                color: theme.colors.text.secondary,
                            }, children: "Have questions? We'd love to hear from you. Get in touch with the TVK Canada team." }), _jsxs(Grid, { columns: 2, gap: theme.spacing.xl, children: [_jsxs("div", { children: [_jsx("h3", { style: { marginBottom: theme.spacing.lg }, children: "Get in Touch" }), _jsxs(ContactInfoItem, { children: [_jsx(ContactIcon, { children: _jsx(FaEnvelope, {}) }), _jsxs(ContactDetails, { children: [_jsx("h4", { children: "Email" }), _jsx("a", { href: "mailto:tvk.canada@gmail.com", children: "tvk.canada@gmail.com" })] })] }), _jsxs(ContactInfoItem, { children: [_jsx(ContactIcon, { children: _jsx(FaWhatsapp, {}) }), _jsxs(ContactDetails, { children: [_jsx("h4", { children: "WhatsApp" }), _jsx("a", { href: "https://wa.me/1234567890", children: "Contact via WhatsApp" })] })] }), _jsxs(ContactInfoItem, { children: [_jsx(ContactIcon, { children: _jsx(FaMapLocationDot, {}) }), _jsxs(ContactDetails, { children: [_jsx("h4", { children: "Location" }), _jsx("p", { children: "Canada-wide" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { marginBottom: theme.spacing.lg }, children: "Send us a Message" }), _jsxs(ContactForm, { onSubmit: handleSubmit, children: [_jsxs(FormGroup, { children: [_jsx("label", { htmlFor: "name", children: "Full Name *" }), _jsx("input", { type: "text", id: "name", name: "name", required: true })] }), _jsxs(FormGroup, { children: [_jsx("label", { htmlFor: "email", children: "Email Address *" }), _jsx("input", { type: "email", id: "email", name: "email", required: true })] }), _jsxs(FormGroup, { children: [_jsx("label", { htmlFor: "phone", children: "Phone Number (Optional)" }), _jsx("input", { type: "tel", id: "phone", name: "phone" })] }), _jsxs(FormGroup, { children: [_jsx("label", { htmlFor: "city", children: "City (Optional)" }), _jsx("input", { type: "text", id: "city", name: "city", placeholder: "e.g., Toronto, Vancouver, Montreal" })] }), _jsxs(FormGroup, { children: [_jsx("label", { htmlFor: "subject", children: "Subject *" }), _jsxs("select", { id: "subject", name: "subject", required: true, children: [_jsx("option", { value: "", children: "Select a subject" }), _jsx("option", { value: "general", children: "General Inquiry" }), _jsx("option", { value: "membership", children: "Membership Registration" }), _jsx("option", { value: "card", children: "Membership Card Inquiry" }), _jsx("option", { value: "events", children: "Event Information" }), _jsx("option", { value: "volunteer", children: "Volunteer Opportunities" }), _jsx("option", { value: "partnership", children: "Corporate Partnership" }), _jsx("option", { value: "media", children: "Media/Press" }), _jsx("option", { value: "other", children: "Other" })] })] }), _jsxs(FormGroup, { children: [_jsx("label", { htmlFor: "message", children: "Message *" }), _jsx("textarea", { id: "message", name: "message", required: true })] }), _jsx(Button, { variant: "primary", type: "submit", disabled: loading, children: loading ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message' }), submitted && (_jsx("p", { style: {
                                                        color: theme.colors.success,
                                                        fontWeight: theme.typography.fontWeight.semibold,
                                                    }, children: "Thank you for reaching out. Our team will get back to you within 24\u201348 hours." }))] })] })] })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h2", { style: { textAlign: 'center', marginBottom: theme.spacing.lg }, children: "Follow Us Online" }), _jsx("p", { style: { textAlign: 'center', marginBottom: theme.spacing.xxxl, color: theme.colors.text.secondary }, children: "Stay updated with events, announcements, and community highlights." }), _jsxs(Flex, { gap: theme.spacing.lg, justify: "center", style: { flexWrap: 'wrap' }, children: [_jsx(SocialIconLink, { href: "https://twitter.com/TVKCanada", target: "_blank", rel: "noopener noreferrer", title: "Twitter", children: _jsx(FaXTwitter, {}) }), _jsx(SocialIconLink, { href: "https://instagram.com/TVKCanada", target: "_blank", rel: "noopener noreferrer", title: "Instagram", children: _jsx(FaInstagram, {}) }), _jsx(SocialIconLink, { href: "https://facebook.com/TVKCanadaOfficial", target: "_blank", rel: "noopener noreferrer", title: "Facebook", children: _jsx(FaFacebook, {}) }), _jsx(SocialIconLink, { href: "https://tiktok.com/@TVKCanada", target: "_blank", rel: "noopener noreferrer", title: "TikTok", children: _jsx(FaTiktok, {}) }), _jsx(SocialIconLink, { href: "https://youtube.com/@TVKCanada", target: "_blank", rel: "noopener noreferrer", title: "YouTube", children: _jsx(FaYoutube, {}) })] })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsx(Container, { children: _jsxs("div", { style: {
                            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #a01829 100%)`,
                            color: theme.colors.text.inverse,
                            padding: theme.spacing.xl,
                            borderRadius: theme.borderRadius['2xl'],
                            textAlign: 'center',
                        }, children: [_jsx("h2", { style: { marginBottom: theme.spacing.lg }, children: "Corporate Partners & Business Sponsors" }), _jsxs("p", { style: { marginBottom: theme.spacing.lg, fontSize: '16px', lineHeight: '1.6' }, children: ["TVK Canada proudly collaborates with Canadian businesses to offer exclusive discounts, perks, and event benefits to our members.", _jsx("br", {}), _jsx("br", {}), "If you're a business looking to offer discounts to TVK members, sponsor a movie night or community event, provide giveaways or product samples, or become an official TVK Corporate Partner \u2013 we'd love to work with you!", _jsx("br", {}), _jsx("br", {}), _jsx("em", { children: "Corporate partners gain visibility across our Canada-wide network, event promotions, social media spotlights, and special recognition within our membership community." })] }), _jsx(Button, { variant: "secondary", children: "Become a Corporate Partner" })] }) }) })] }));
};
