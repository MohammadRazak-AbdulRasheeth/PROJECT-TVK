import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Main App component with React Router setup
 */
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@styles/GlobalStyles';
import { theme } from '@styles/theme';
import { MembershipProvider } from '@context/MembershipContext';
import { AuthProvider } from '@context/AuthContext';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { AuthRedirectHandler } from '@components/AuthRedirectHandler';
import { NotFound } from '@components/NotFound';
import { HomePage } from '@pages/Home';
import { AboutPage } from '@pages/About';
import { MembershipPage } from '@pages/Membership';
import { MembershipDashboard } from '@pages/MembershipDashboard';
import { PaymentSuccessPage } from '@pages/PaymentSuccess';
import { MembershipInvoice } from '@pages/MembershipInvoice';
import { EventsPage } from '@pages/Events';
import { ProgramsPage } from '@pages/Programs';
import { JoinPage } from '@pages/Join';
import { GlobalNetworkPage } from '@pages/GlobalNetwork';
import { GalleryPage } from '@pages/Gallery';
import { ContactPage } from '@pages/Contact';
import { FAQPage } from '@pages/FAQ';
/**
 * Scroll to top on route change component
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [pathname]);
    return null;
};
/**
 * Main App component with conditional footer rendering
 */
const AppContent = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', minHeight: '100vh' }, children: [_jsx(Header, {}), _jsx("main", { style: { flex: 1 }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "/join", element: _jsx(JoinPage, {}) }), _jsx(Route, { path: "/programs", element: _jsx(ProgramsPage, {}) }), _jsx(Route, { path: "/membership", element: _jsx(MembershipPage, {}) }), _jsx(Route, { path: "/my-membership", element: _jsx(MembershipDashboard, {}) }), _jsx(Route, { path: "/payment-success", element: _jsx(PaymentSuccessPage, {}) }), _jsx(Route, { path: "/invoice", element: _jsx(MembershipInvoice, {}) }), _jsx(Route, { path: "/events", element: _jsx(EventsPage, {}) }), _jsx(Route, { path: "/global-network", element: _jsx(GlobalNetworkPage, {}) }), _jsx(Route, { path: "/gallery", element: _jsx(GalleryPage, {}) }), _jsx(Route, { path: "/contact", element: _jsx(ContactPage, {}) }), _jsx(Route, { path: "/faq", element: _jsx(FAQPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }), !isHomePage && _jsx(Footer, {})] }));
};
/**
 * App Component - Main application shell with routing
 */
export const App = () => {
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(GlobalStyles, {}), _jsx(AuthProvider, { children: _jsx(MembershipProvider, { children: _jsxs(Router, { children: [_jsx(AuthRedirectHandler, {}), _jsx(ScrollToTop, {}), _jsx(AppContent, {})] }) }) })] }));
};
