import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Fully Responsive Header component with mobile menu
 */
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { images } from '@utils/images';
import { Button } from './Button';
import { authService } from '../services/api';
const HeaderWrapper = styled.header `
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: ${theme.shadows.lg};
  border-bottom: 2px solid ${theme.colors.secondary};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;
const HeaderContent = styled.div `
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.lg};
`;
const Logo = styled(Link) `
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.inverse};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex-shrink: 0;
  transition: all ${theme.transitions.base};
  z-index: 1002;

  &:hover {
    color: ${theme.colors.secondary};
    transform: scale(1.05);
  }

  img {
    height: 50px;
    width: auto;
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${theme.shadows.md};
  }

  @media (max-width: 1200px) {
    font-size: ${theme.typography.fontSize.xl};

    img {
      height: 45px;
    }
  }

  @media (max-width: 1024px) {
    font-size: ${theme.typography.fontSize.lg};

    img {
      height: 40px;
    }

    span {
      display: none;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize.xl};
    
    img {
      height: 40px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.lg};

    img {
      height: 35px;
    }

    span {
      display: none;
    }
  }
`;
const DesktopNav = styled.nav `
  display: flex;
  gap: ${theme.spacing.xl};
  align-items: center;
  flex: 1;
  margin: 0 ${theme.spacing.xl};

  @media (max-width: 1200px) {
    gap: ${theme.spacing.lg};
    margin: 0 ${theme.spacing.md};
  }

  @media (max-width: 1024px) {
    gap: ${theme.spacing.md};
    margin: 0 ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;
const MobileOverlay = styled.div `
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: ${props => (props.isOpen ? '1' : '0')};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    transition: opacity ${theme.transitions.base}, visibility ${theme.transitions.base};
    z-index: 999;
  }
`;
const MobileNav = styled.nav `
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 85%;
    max-width: 400px;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, #8b1428 100%);
    flex-direction: column;
    padding: 80px ${theme.spacing.xl} ${theme.spacing.xl};
    gap: ${theme.spacing.sm};
    overflow-y: auto;
    transform: translateX(${props => (props.isOpen ? '0' : '100%')});
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${theme.shadows.xl};
    border-left: 3px solid ${theme.colors.secondary};
    z-index: 1001;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 90%;
    padding: 70px ${theme.spacing.lg} ${theme.spacing.lg};
  }
`;
const NavLink = styled(Link) `
  color: ${theme.colors.text.inverse};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: all ${theme.transitions.base};
  padding: ${theme.spacing.sm} 0;
  border-bottom: 2px solid transparent;
  position: relative;
  white-space: nowrap;
  font-size: ${theme.typography.fontSize.base};

  &:hover {
    color: ${theme.colors.secondary};
    border-bottom-color: ${theme.colors.secondary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 4px;
    border-radius: ${theme.borderRadius.sm};
  }

  @media (max-width: 1200px) {
    font-size: ${theme.typography.fontSize.sm};
    padding: ${theme.spacing.xs} 0;
  }

  @media (max-width: 1024px) {
    font-size: ${theme.typography.fontSize.xs};
    padding: ${theme.spacing.xs} 0;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.lg};
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: ${theme.borderRadius.md};
    margin: ${theme.spacing.xs} 0;
    white-space: normal;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(8px);
      border-bottom-color: ${theme.colors.secondary};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.base};
  }
`;
const MobileMenuButton = styled.button `
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.text.inverse};
  font-size: 28px;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  transition: all ${theme.transitions.base};
  z-index: 1002;
  -webkit-tap-highlight-color: transparent;
  min-height: 44px;
  min-width: 44px;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.sm};

  &:hover {
    color: ${theme.colors.secondary};
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
  }
`;
const DesktopCTAButton = styled(Button) `
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;
const MobileCTAButton = styled(Button) `
  display: none;
  margin-top: ${theme.spacing.lg};
  width: 100%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;
const ButtonGroup = styled.div `
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-shrink: 0;
`;
const UserProfile = styled.div `
  position: relative;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.base};
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: ${theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid ${theme.colors.secondary};
    transition: all ${theme.transitions.base};
  }

  span {
    color: ${theme.colors.text.inverse};
    font-weight: ${theme.typography.fontWeight.semibold};
    font-size: ${theme.typography.fontSize.base};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;
const DropdownMenu = styled.div `
  position: absolute;
  top: 100%;
  right: 0;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  min-width: 220px;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transform: translateY(${props => (props.isOpen ? '0' : '-10px')});
  transition: all ${theme.transitions.base};
  z-index: 1000;
  margin-top: ${theme.spacing.md};
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 2px solid ${theme.colors.secondary};
`;
const DropdownItem = styled.button `
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all ${theme.transitions.base};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.text.inverse};
    transform: translateX(4px);
  }

  &:last-child {
    border-bottom: none;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: -2px;
  }

  &:active {
    transform: translateX(2px);
  }
`;
/**
 * Header Component with fully responsive mobile menu
 */
export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    const handleGoogleLogin = () => {
        authService.googleLogin();
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setDropdownOpen(false);
        navigate('/');
    };
    // Check for token in URL params (OAuth redirect)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            // Fetch user profile
            fetchUserProfile();
        }
        else {
            // Check for existing token
            const existingToken = localStorage.getItem('token');
            if (existingToken) {
                fetchUserProfile();
            }
        }
    }, []);
    const fetchUserProfile = async () => {
        try {
            const userData = await authService.getProfile();
            setUser(userData);
        }
        catch (error) {
            console.error('Failed to fetch user profile:', error);
            localStorage.removeItem('token');
        }
    };
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);
    // Close menu on window resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);
    return (_jsxs(_Fragment, { children: [_jsx(MobileOverlay, { isOpen: isMenuOpen, onClick: closeMenu }), _jsx(HeaderWrapper, { children: _jsxs(HeaderContent, { children: [_jsxs(Logo, { to: "/", onClick: closeMenu, children: [_jsx("img", { src: images.logo, alt: "TVK Canada Logo", title: "TVK Canada", onError: (e) => {
                                        const target = e.currentTarget;
                                        if (target.dataset.fallbackApplied)
                                            return;
                                        target.dataset.fallbackApplied = 'true';
                                        target.src = images.logoFallback || images.logo;
                                    }, style: { objectFit: 'contain', background: 'transparent' } }), _jsx("span", { children: "TVK CANADA" })] }), _jsxs(DesktopNav, { children: [_jsx(NavLink, { to: "/", children: "Home" }), _jsx(NavLink, { to: "/about", children: "About Us" }), _jsx(NavLink, { to: "/membership", children: "Membership" }), _jsx(NavLink, { to: "/events", children: "Events" }), _jsx(NavLink, { to: "/global-network", children: "Global Network" }), _jsx(NavLink, { to: "/gallery", children: "Gallery" }), _jsx(NavLink, { to: "/contact", children: "Contact" })] }), _jsxs(ButtonGroup, { children: [user ? (_jsxs(UserProfile, { ref: dropdownRef, onClick: () => setDropdownOpen(!dropdownOpen), title: "Click to open menu", children: [_jsx("img", { src: user.profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=C41E3A&color=FFD700&size=40`, alt: user.name }), _jsx("span", { children: user.name.split(' ')[0] }), _jsxs(DropdownMenu, { isOpen: dropdownOpen, children: [_jsx(DropdownItem, { onClick: () => { setDropdownOpen(false); navigate('/membership'); }, children: "My Membership" }), _jsx(DropdownItem, { onClick: () => { setDropdownOpen(false); navigate('/events'); }, children: "My Events" }), _jsx(DropdownItem, { onClick: handleLogout, children: "Logout" })] })] })) : (_jsx(DesktopCTAButton, { variant: "secondary", size: "md", onClick: handleGoogleLogin, children: "Login" })), _jsx(MobileMenuButton, { onClick: toggleMenu, "aria-label": isMenuOpen ? 'Close menu' : 'Open menu', "aria-expanded": isMenuOpen, children: isMenuOpen ? '✕' : '☰' })] })] }) }), _jsxs(MobileNav, { isOpen: isMenuOpen, children: [_jsx(NavLink, { to: "/", onClick: closeMenu, children: "Home" }), _jsx(NavLink, { to: "/about", onClick: closeMenu, children: "About Us" }), _jsx(NavLink, { to: "/membership", onClick: closeMenu, children: "Membership" }), _jsx(NavLink, { to: "/events", onClick: closeMenu, children: "Events" }), _jsx(NavLink, { to: "/global-network", onClick: closeMenu, children: "Global Network" }), _jsx(NavLink, { to: "/gallery", onClick: closeMenu, children: "Gallery" }), _jsx(NavLink, { to: "/contact", onClick: closeMenu, children: "Contact" }), user ? (_jsxs("div", { style: {
                            marginTop: theme.spacing.lg,
                            padding: theme.spacing.lg,
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: theme.borderRadius.lg,
                            border: `2px solid ${theme.colors.secondary}`,
                            backdropFilter: 'blur(10px)',
                            boxShadow: theme.shadows.lg
                        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: theme.spacing.md, marginBottom: theme.spacing.lg }, children: [_jsx("img", { src: user.profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=C41E3A&color=FFD700&size=40`, alt: user.name, style: {
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            border: `3px solid ${theme.colors.secondary}`,
                                            boxShadow: theme.shadows.md
                                        } }), _jsx("span", { style: {
                                            color: theme.colors.text.primary,
                                            fontWeight: theme.typography.fontWeight.bold,
                                            fontSize: theme.typography.fontSize.lg
                                        }, children: user.name })] }), _jsx(Button, { variant: "primary", size: "md", fullWidth: true, onClick: () => { closeMenu(); navigate('/membership'); }, style: {
                                    marginBottom: theme.spacing.md,
                                    fontSize: theme.typography.fontSize.base,
                                    fontWeight: theme.typography.fontWeight.semibold
                                }, children: "My Membership" }), _jsx(Button, { variant: "outline", size: "md", fullWidth: true, onClick: handleLogout, style: {
                                    borderColor: theme.colors.primary,
                                    color: theme.colors.primary,
                                    fontSize: theme.typography.fontSize.base,
                                    fontWeight: theme.typography.fontWeight.semibold
                                }, children: "Logout" })] })) : (_jsx(MobileCTAButton, { variant: "secondary", size: "md", onClick: handleGoogleLogin, children: "Login" }))] })] }));
};
