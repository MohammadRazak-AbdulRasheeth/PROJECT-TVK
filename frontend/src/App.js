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
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { HomePage } from '@pages/Home';
import { AboutPage } from '@pages/About';
import { MembershipPage } from '@pages/Membership';
import { EventsPage } from '@pages/Events';
import { GlobalNetworkPage } from '@pages/GlobalNetwork';
import { GalleryPage } from '@pages/Gallery';
import { ContactPage } from '@pages/Contact';
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
 * App Component - Main application shell with routing
 */
export const App = () => {
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(GlobalStyles, {}), _jsx(MembershipProvider, { children: _jsxs(Router, { children: [_jsx(ScrollToTop, {}), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', minHeight: '100vh' }, children: [_jsx(Header, {}), _jsx("main", { style: { flex: 1 }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "/membership", element: _jsx(MembershipPage, {}) }), _jsx(Route, { path: "/events", element: _jsx(EventsPage, {}) }), _jsx(Route, { path: "/global-network", element: _jsx(GlobalNetworkPage, {}) }), _jsx(Route, { path: "/gallery", element: _jsx(GalleryPage, {}) }), _jsx(Route, { path: "/contact", element: _jsx(ContactPage, {}) }), _jsx(Route, { path: "*", element: _jsx("div", { style: { padding: '40px', textAlign: 'center' }, children: _jsx("h1", { children: "404 - Page Not Found" }) }) })] }) }), _jsx(Footer, {})] })] }) })] }));
};
