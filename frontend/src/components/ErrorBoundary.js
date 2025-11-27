import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Button } from '@components/Button';
const ErrorContainer = styled.div `
  text-align: center;
  padding: ${theme.spacing.xxxl} 0;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ErrorTitle = styled.h1 `
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize['3xl']};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;
const ErrorMessage = styled.p `
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
  font-size: ${theme.typography.fontSize.lg};
  max-width: 500px;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize.base};
    margin-bottom: ${theme.spacing.lg};
  }
`;
const ButtonGroup = styled.div `
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "handleRetry", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
            }
        });
        Object.defineProperty(this, "handleGoHome", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                window.location.href = '/';
            }
        });
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('App Error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("section", { style: { padding: `${theme.spacing.xxxl} ${theme.spacing.lg}` }, children: _jsx("div", { style: { maxWidth: '1280px', margin: '0 auto' }, children: _jsxs(ErrorContainer, { children: [_jsx(ErrorTitle, { children: "\uD83D\uDEA8 Oops! Something went wrong" }), _jsx(ErrorMessage, { children: "We encountered an unexpected error. This has been logged and our team will look into it." }), _jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "primary", onClick: this.handleRetry, children: "\uD83D\uDD04 Try Again" }), _jsx(Button, { variant: "outline", onClick: this.handleGoHome, children: "\uD83C\uDFE0 Go Home" })] }), process.env.NODE_ENV === 'development' && this.state.error && (_jsxs("details", { style: { marginTop: theme.spacing.xl, textAlign: 'left', maxWidth: '600px' }, children: [_jsx("summary", { style: { cursor: 'pointer', color: theme.colors.primary }, children: "Debug Info (Development Only)" }), _jsx("pre", { style: {
                                            background: theme.colors.surface,
                                            padding: theme.spacing.md,
                                            borderRadius: theme.borderRadius.md,
                                            fontSize: theme.typography.fontSize.sm,
                                            overflow: 'auto',
                                            marginTop: theme.spacing.sm
                                        }, children: this.state.error.stack })] }))] }) }) }));
        }
        return this.props.children;
    }
}
