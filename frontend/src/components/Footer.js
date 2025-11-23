import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa6';
const FooterWrapper = styled.footer `
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: ${theme.colors.text.inverse};
  padding: ${theme.spacing.xxxl} ${theme.spacing.lg};
  margin-top: ${theme.spacing.xxxl};
  border-top: 3px solid ${theme.colors.secondary};
`;
const FooterContent = styled.div `
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
const FooterSection = styled.div `
  h4 {
    color: ${theme.colors.secondary};
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.lg};
  }

  p, a {
    font-size: ${theme.typography.fontSize.sm};
    line-height: ${theme.typography.lineHeight.relaxed};
    color: #cccccc;

    &:hover {
      color: ${theme.colors.secondary};
    }
  }
`;
const SocialLinks = styled.div `
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  flex-wrap: wrap;
`;
const SocialLink = styled.a `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  border-radius: ${theme.borderRadius['2xl']};
  text-decoration: none;
  transition: all ${theme.transitions.base};
  font-size: 20px;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px) scale(1.1);
    border-color: ${theme.colors.secondary};
    background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary});
  }

  &:active {
    transform: scale(0.95);
  }
`;
const FooterBottom = styled.div `
  max-width: 1280px;
  margin: ${theme.spacing.xxxl} auto 0;
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: ${theme.typography.fontSize.sm};
  color: #999999;
`;
/**
 * Footer Component
 */
export const Footer = () => {
    return (_jsxs(FooterWrapper, { children: [_jsxs(FooterContent, { children: [_jsxs(FooterSection, { children: [_jsx("h4", { children: "About TVK Canada" }), _jsx("p", { children: "We are a fan club and nonprofit association dedicated to uniting Thalapathy Vijay supporters across Canada." })] }), _jsxs(FooterSection, { children: [_jsx("h4", { children: "Quick Links" }), _jsx("p", { children: _jsx("a", { href: "/", children: "Home" }) }), _jsx("p", { children: _jsx("a", { href: "/about", children: "About Us" }) }), _jsx("p", { children: _jsx("a", { href: "/membership", children: "Membership" }) }), _jsx("p", { children: _jsx("a", { href: "/events", children: "Events" }) })] }), _jsxs(FooterSection, { children: [_jsx("h4", { children: "Contact Us" }), _jsx("p", { children: "Email: tvk.canada@gmail.com" }), _jsx("p", { children: "WhatsApp: Contact via WhatsApp" }), _jsx("p", { children: "Location: Canada" })] }), _jsxs(FooterSection, { children: [_jsx("h4", { children: "Follow Us" }), _jsxs(SocialLinks, { children: [_jsx(SocialLink, { href: "https://www.instagram.com/tvk.canada/", target: "_blank", rel: "noopener noreferrer", title: "Instagram", "aria-label": "Follow us on Instagram", children: _jsx(FaInstagram, {}) }), _jsx(SocialLink, { href: "https://www.threads.com/@tvk.canada", target: "_blank", rel: "noopener noreferrer", title: "Threads", "aria-label": "Follow us on Threads", children: _jsx("span", { style: { fontSize: '18px', fontWeight: 'bold' }, children: "@" }) }), _jsx(SocialLink, { href: "https://www.facebook.com/profile.php?id=61572322798883", target: "_blank", rel: "noopener noreferrer", title: "Facebook", "aria-label": "Follow us on Facebook", children: _jsx(FaFacebook, {}) }), _jsx(SocialLink, { href: "https://www.tiktok.com/@tvk.canada", target: "_blank", rel: "noopener noreferrer", title: "TikTok", "aria-label": "Follow us on TikTok", children: _jsx(FaTiktok, {}) }), _jsx(SocialLink, { href: "http://www.youtube.com/@TamilagaVettriKazhagamCanada", target: "_blank", rel: "noopener noreferrer", title: "YouTube", "aria-label": "Subscribe on YouTube", children: _jsx(FaYoutube, {}) })] })] })] }), _jsx(FooterBottom, { children: _jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " TVK Canada - The Voice of Vijay Fans in Canada. All rights reserved."] }) })] }));
};
