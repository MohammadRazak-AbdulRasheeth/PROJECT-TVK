import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Fully Responsive Header component with mobile menu
 */
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { images } from '@utils/images';
import { Button } from './Button';
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
    height: 65px;
    width: auto;
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${theme.shadows.md};
  }

  @media (max-width: 1200px) {
    font-size: ${theme.typography.fontSize.xl};

    img {
      height: 58px;
    }
  }

  @media (max-width: 1024px) {
    font-size: ${theme.typography.fontSize.lg};

    img {
      height: 52px;
    }

    span {
      display: none;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize.xl};
    
    img {
      height: 50px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.lg};

    img {
      height: 45px;
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
const MobileOverlay = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isOpen'
}) `
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
const MobileNav = styled.nav.withConfig({
    shouldForwardProp: (prop) => prop !== 'isOpen'
}) `
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
const NavLink = styled(Link).withConfig({
    shouldForwardProp: (prop) => prop !== 'isActive'
}) `
  color: ${props => props.isActive ? theme.colors.secondary : theme.colors.text.inverse};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: all ${theme.transitions.base};
  padding: ${theme.spacing.sm} 0;
  border-bottom: 2px solid ${props => props.isActive ? theme.colors.secondary : 'transparent'};
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
    border-bottom: 1px solid ${props => props.isActive ? theme.colors.secondary : 'rgba(255, 255, 255, 0.1)'};
    border-radius: ${theme.borderRadius.md};
    margin: ${theme.spacing.xs} 0;
    white-space: normal;
    background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};

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
const ButtonGroup = styled.div `
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-shrink: 0;
`;
/**
 * Header Component with fully responsive mobile menu
 */
export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // Helper function to check if a path is active
    const isActivePath = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
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
                                    }, style: { objectFit: 'contain', background: 'transparent' } }), _jsx("span", { children: "TVK CANADA" })] }), _jsxs(DesktopNav, { children: [_jsx(NavLink, { to: "/", isActive: isActivePath('/'), children: "Home" }), _jsx(NavLink, { to: "/about", isActive: isActivePath('/about'), children: "About Us" }), _jsx(NavLink, { to: "/programs", isActive: isActivePath('/programs'), children: "Programs" }), _jsx(NavLink, { to: "/events", isActive: isActivePath('/events'), children: "Events" }), _jsx(NavLink, { to: "/join", isActive: isActivePath('/join'), children: "Join Free" }), _jsx(NavLink, { to: "/global-network", isActive: isActivePath('/global-network'), children: "Global Network" }), _jsx(NavLink, { to: "/gallery", isActive: isActivePath('/gallery'), children: "Gallery" }), _jsx(NavLink, { to: "/contact", isActive: isActivePath('/contact'), children: "Contact" })] }), _jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "secondary", size: "md", onClick: () => navigate('/join'), style: {
                                        backgroundColor: '#f5c400',
                                        color: '#fff',
                                        fontWeight: 400
                                    }, children: "JOIN" }), _jsx(MobileMenuButton, { onClick: toggleMenu, "aria-label": isMenuOpen ? 'Close menu' : 'Open menu', "aria-expanded": isMenuOpen, children: isMenuOpen ? '✕' : '☰' })] })] }) }), _jsxs(MobileNav, { isOpen: isMenuOpen, children: [_jsx(NavLink, { to: "/", onClick: closeMenu, isActive: isActivePath('/'), children: "Home" }), _jsx(NavLink, { to: "/about", onClick: closeMenu, isActive: isActivePath('/about'), children: "About Us" }), _jsx(NavLink, { to: "/programs", onClick: closeMenu, isActive: isActivePath('/programs'), children: "Programs" }), _jsx(NavLink, { to: "/events", onClick: closeMenu, isActive: isActivePath('/events'), children: "Events" }), _jsx(NavLink, { to: "/join", onClick: closeMenu, isActive: isActivePath('/join'), children: "Join Free" }), _jsx(NavLink, { to: "/global-network", onClick: closeMenu, isActive: isActivePath('/global-network'), children: "Global Network" }), _jsx(NavLink, { to: "/gallery", onClick: closeMenu, isActive: isActivePath('/gallery'), children: "Gallery" }), _jsx(NavLink, { to: "/contact", onClick: closeMenu, isActive: isActivePath('/contact'), children: "Contact" }), _jsx(Button, { variant: "secondary", size: "lg", fullWidth: true, onClick: () => { closeMenu(); navigate('/join'); }, style: {
                            backgroundColor: '#f5c400',
                            color: '#fff',
                            fontWeight: 400,
                            marginTop: theme.spacing.lg
                        }, children: "JOIN" })] })] }));
};
