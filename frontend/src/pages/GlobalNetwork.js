import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section } from '@components/Layout';
import { Button } from '@components/Button';
import { SEO, seoData } from '@components/SEO';
const HeroSection = styled.div `
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, #a01829 100%);
  color: ${theme.colors.text.inverse};
  text-align: center;
  padding: ${theme.spacing.xxxl} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
    border-radius: 50%;
  }

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    margin-bottom: ${theme.spacing.lg};
    position: relative;
    z-index: 1;
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
  }

  p {
    font-size: 18px;
    margin: 0;
    opacity: 0.95;
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xxl} 0;
    h1 {
      font-size: ${theme.typography.fontSize['2xl']};
    }
    p {
      font-size: 16px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl} 0;
    h1 {
      font-size: ${theme.typography.fontSize.xl};
      margin-bottom: ${theme.spacing.md};
    }
    p {
      font-size: 14px;
    }
  }
`;
/**
 * TVK Global Network Page Component
 */
export const GlobalNetworkPage = () => {
    // Global Instagram hashtags for TVK community
    const globalHashtags = ['#ThalapathyVijay', '#TVK', '#Thalapathy', '#VijayFans'];
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { ...seoData.globalNetwork }), _jsx(HeroSection, { children: _jsxs(Container, { children: [_jsx("h1", { children: "TVK Global Network - Worldwide Thalapathy Vijay Fan Communities" }), _jsx("p", { children: "Connect with TVK fan groups worldwide through their official Instagram pages. Follow for updates, events, and community celebrations." })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsxs(Container, { children: [_jsx("h2", { style: { textAlign: 'center', marginBottom: theme.spacing.lg, color: theme.colors.primary, fontSize: theme.typography.fontSize['3xl'] }, children: "Follow @tvk.canada on Instagram" }), _jsx("p", { style: {
                                textAlign: 'center',
                                marginBottom: theme.spacing.xl,
                                color: theme.colors.text.secondary,
                                fontSize: '18px',
                                maxWidth: '700px',
                                margin: '0 auto',
                                lineHeight: '1.7'
                            }, children: "Stay connected with TVK Canada for the latest updates, event photos, and community highlights from Thalapathy Vijay fans across Canada." }), _jsx("div", { style: {
                                maxWidth: '500px',
                                margin: '0 auto',
                                marginTop: theme.spacing.xl,
                                marginBottom: theme.spacing.xxl
                            }, children: _jsxs("a", { href: "https://instagram.com/tvk.canada", target: "_blank", rel: "noopener noreferrer", style: {
                                    display: 'block',
                                    background: theme.colors.surface,
                                    borderRadius: theme.borderRadius['2xl'],
                                    padding: theme.spacing.xxl,
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    border: `3px solid ${theme.colors.primary}`,
                                    boxShadow: theme.shadows.lg,
                                    transition: 'all 0.3s ease'
                                }, onMouseOver: (e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(196, 22, 28, 0.3)';
                                }, onMouseOut: (e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = theme.shadows.lg;
                                }, children: [_jsx("div", { style: {
                                            width: '100px',
                                            height: '100px',
                                            margin: '0 auto',
                                            marginBottom: theme.spacing.lg,
                                            background: 'linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 75%, #FD1D1D 100%)',
                                            borderRadius: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '48px'
                                        }, children: "\uD83D\uDCF7" }), _jsx("h3", { style: {
                                            color: theme.colors.primary,
                                            marginBottom: theme.spacing.sm,
                                            fontSize: theme.typography.fontSize['2xl']
                                        }, children: "@tvk.canada" }), _jsx("p", { style: {
                                            color: theme.colors.text.secondary,
                                            marginBottom: theme.spacing.lg,
                                            fontSize: theme.typography.fontSize.base
                                        }, children: "TVK Canada Official Instagram" }), _jsx("div", { style: {
                                            background: 'linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 75%, #FD1D1D 100%)',
                                            color: '#fff',
                                            padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                                            borderRadius: theme.borderRadius.lg,
                                            fontWeight: theme.typography.fontWeight.bold,
                                            fontSize: theme.typography.fontSize.base,
                                            display: 'inline-block'
                                        }, children: "Follow on Instagram" })] }) }), _jsx("h3", { style: { textAlign: 'center', marginBottom: theme.spacing.lg, color: theme.colors.text.primary }, children: "Explore Global TVK Hashtags" }), _jsx("div", { style: {
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: theme.spacing.md,
                                marginBottom: theme.spacing.xxl
                            }, children: globalHashtags.map((hashtag) => (_jsx("a", { href: `https://www.instagram.com/explore/tags/${hashtag.replace('#', '')}/`, target: "_blank", rel: "noopener noreferrer", style: {
                                    background: 'linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 75%, #FD1D1D 100%)',
                                    color: '#fff',
                                    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                                    borderRadius: theme.borderRadius.xl,
                                    textDecoration: 'none',
                                    fontWeight: theme.typography.fontWeight.bold,
                                    fontSize: theme.typography.fontSize.base,
                                    boxShadow: theme.shadows.md,
                                    transition: 'all 0.3s ease',
                                    display: 'inline-block'
                                }, onMouseOver: (e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = theme.shadows.lg;
                                }, onMouseOut: (e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = theme.shadows.md;
                                }, children: hashtag }, hashtag))) }), _jsxs("div", { style: {
                                background: theme.colors.surface,
                                borderRadius: theme.borderRadius['2xl'],
                                padding: theme.spacing.xxl,
                                textAlign: 'center',
                                border: `2px solid ${theme.colors.border}`
                            }, children: [_jsx("div", { style: { fontSize: '48px', marginBottom: theme.spacing.md }, children: "\uD83C\uDF0D" }), _jsx("h3", { style: { color: theme.colors.primary, marginBottom: theme.spacing.md }, children: "Join the Global TVK Community" }), _jsx("p", { style: { color: theme.colors.text.secondary, marginBottom: theme.spacing.lg, maxWidth: '600px', margin: '0 auto' }, children: "Share your TVK moments on Instagram using our community hashtags. Tag @tvk.canada and your posts will be part of the worldwide Thalapathy Vijay fan network!" })] })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h2", { style: { textAlign: 'center', marginBottom: theme.spacing.xl, color: theme.colors.primary, fontSize: theme.typography.fontSize['3xl'] }, children: "Join TVK Canada Community" }), _jsx("div", { style: { textAlign: 'center', maxWidth: '700px', margin: '0 auto', marginBottom: theme.spacing.xl }, children: _jsx("p", { style: { fontSize: theme.typography.fontSize.lg, color: theme.colors.text.secondary, lineHeight: '1.7' }, children: "Based in Ottawa, ON, TVK Canada brings together Thalapathy Vijay fans across Canada for community events, charity work, and cultural celebrations." }) }), _jsxs("div", { style: {
                                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #a01829 100%)`,
                                color: theme.colors.text.inverse,
                                padding: theme.spacing.xl,
                                borderRadius: theme.borderRadius['2xl'],
                                textAlign: 'center',
                            }, children: [_jsx("h3", { style: { marginBottom: theme.spacing.lg, color: theme.colors.text.inverse }, children: "Ready to Connect with Our Global Family?" }), _jsx("p", { style: { marginBottom: theme.spacing.lg, fontSize: '16px', color: theme.colors.text.inverse, opacity: 0.95 }, children: "Follow us on Instagram and join the TVK Canada membership community." }), _jsxs("div", { style: { display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap' }, children: [_jsx("a", { href: "https://app.joinit.com/o/tvkcanada/", title: "Memberships for TVK Canada", style: {
                                                textDecoration: 'none',
                                                padding: '11px 20px',
                                                fontSize: '15px',
                                                color: '#fff',
                                                border: 'none',
                                                backgroundColor: '#c4161c',
                                                fontWeight: 400,
                                                borderRadius: '3px'
                                            }, target: "_blank", rel: "noopener noreferrer", children: "Join TVK Canada" }), _jsx(Button, { variant: "outline", onClick: () => window.open('https://instagram.com/tvk.canada', '_blank'), style: { background: 'transparent', borderColor: theme.colors.secondary, color: theme.colors.secondary }, children: "Follow @tvk.canada" })] })] })] }) })] }));
};
