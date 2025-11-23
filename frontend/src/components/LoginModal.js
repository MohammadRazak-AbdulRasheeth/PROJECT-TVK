import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Login Modal Component
 * Handles user authentication with email/password and Google OAuth
 */
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Button } from '@components/Button';
import { useAuth } from '../context/AuthContext';
const ModalOverlay = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.md};
`;
const ModalContent = styled.div `
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  max-width: 400px;
  width: 100%;
  position: relative;
  box-shadow: ${theme.shadows.xl};
`;
const ModalHeader = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: ${theme.spacing.lg};

  h2 {
    color: ${theme.colors.primary};
    margin: 0;
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;
const CloseButton = styled.button `
  background: none;
  border: none;
  font-size: 24px;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  line-height: 1;

  &:hover {
    color: ${theme.colors.primary};
  }
`;
const FormGroup = styled.div `
  margin-bottom: ${theme.spacing.lg};

  label {
    display: block;
    margin-bottom: ${theme.spacing.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
  }

  input {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    font-size: ${theme.typography.fontSize.base};
    transition: border-color ${theme.transitions.base};

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
    }
  }
`;
const ErrorMessage = styled.div `
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid ${theme.colors.error};
  color: ${theme.colors.error};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
`;
const Divider = styled.div `
  display: flex;
  align-items: center;
  margin: ${theme.spacing.xl} 0;
  color: ${theme.colors.text.secondary};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${theme.colors.border};
  }

  span {
    padding: 0 ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
  }
`;
const GoogleButton = styled(Button) `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  background: #4285f4;
  border-color: #4285f4;

  &:hover {
    background: #357ae8;
    border-color: #357ae8;
  }

  &:before {
    content: '';
    width: 18px;
    height: 18px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffffff' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%23ffffff' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23ffffff' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23ffffff' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
const LoginInfo = styled.div `
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  border-left: 4px solid ${theme.colors.primary};

  h3 {
    margin: 0 0 ${theme.spacing.sm} 0;
    color: ${theme.colors.primary};
    font-size: ${theme.typography.fontSize.lg};
  }

  p {
    margin: 0;
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
  }
`;
export const LoginModal = ({ isOpen, onClose, onSuccess }) => {
    const { login, googleLogin, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
        try {
            await login(formData.email, formData.password);
            onSuccess?.();
            onClose();
        }
        catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };
    const handleGoogleLogin = () => {
        // Store callback for after Google login
        localStorage.setItem('loginCallback', 'membership');
        googleLogin();
    };
    if (!isOpen)
        return null;
    return (_jsx(ModalOverlay, { onClick: onClose, children: _jsxs(ModalContent, { onClick: e => e.stopPropagation(), children: [_jsxs(ModalHeader, { children: [_jsx("h2", { children: "Login Required" }), _jsx(CloseButton, { onClick: onClose, children: "\u00D7" })] }), _jsxs(LoginInfo, { children: [_jsx("h3", { children: "Join TVK Canada Community" }), _jsx("p", { children: "Please login to access membership subscriptions and exclusive member benefits." })] }), error && _jsx(ErrorMessage, { children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(FormGroup, { children: [_jsx("label", { children: "Email" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, placeholder: "your.email@example.com", required: true })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "Password" }), _jsx("input", { type: "password", name: "password", value: formData.password, onChange: handleInputChange, placeholder: "Enter your password", required: true })] }), _jsx(Button, { type: "submit", variant: "primary", fullWidth: true, disabled: isLoading, style: { marginBottom: theme.spacing.md }, children: isLoading ? 'Signing In...' : 'Sign In' })] }), _jsx(Divider, { children: _jsx("span", { children: "or" }) }), _jsx(GoogleButton, { variant: "primary", onClick: handleGoogleLogin, disabled: isLoading, children: "Continue with Google" }), _jsx("div", { style: {
                        textAlign: 'center',
                        marginTop: theme.spacing.lg,
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary
                    }, children: "Don't have an account? Contact us to join TVK Canada" })] }) }));
};
