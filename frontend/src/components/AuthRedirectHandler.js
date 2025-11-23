/**
 * Authentication Redirect Handler
 * Handles redirects after Google OAuth login
 */
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export const AuthRedirectHandler = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, isLoading } = useAuth();
    useEffect(() => {
        // Handle token from Google OAuth
        const token = searchParams.get('token');
        const error = searchParams.get('error');
        if (token) {
            // Token is already handled by AuthContext, just need to redirect
            const loginCallback = localStorage.getItem('loginCallback');
            localStorage.removeItem('loginCallback');
            if (loginCallback === 'membership') {
                navigate('/membership?showSubscription=true');
                return;
            }
        }
        if (error) {
            console.error('Auth error:', error);
            navigate('/?error=' + error);
            return;
        }
        // Handle redirect after authentication for normal login
        if (!isLoading && user) {
            const redirectPath = localStorage.getItem('redirectPath');
            const loginCallback = localStorage.getItem('loginCallback');
            // Clean up storage
            localStorage.removeItem('redirectPath');
            localStorage.removeItem('loginCallback');
            // Only redirect if we have specific callback intent
            if (loginCallback === 'membership') {
                navigate('/membership?showSubscription=true');
            }
            else if (redirectPath && redirectPath !== '/') {
                navigate(redirectPath);
            }
            // Don't redirect to home for normal auth checks
        }
    }, [user, isLoading, navigate, searchParams]);
    return null; // This component doesn't render anything
};
