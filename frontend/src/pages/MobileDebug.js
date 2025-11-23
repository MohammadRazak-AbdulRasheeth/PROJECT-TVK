import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Mobile Debug Component for TVK Canada Subscription Issues
 */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container } from '@components/Layout';
import { Button } from '@components/Button';
import { membershipService } from '../services/api';
const DebugContainer = styled.div `
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.lg} 0;
  
  h3 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
  }
  
  pre {
    background: ${theme.colors.background};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
    padding: ${theme.spacing.sm};
    overflow-x: auto;
    font-size: ${theme.typography.fontSize.sm};
    white-space: pre-wrap;
  }
  
  .status {
    display: inline-block;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.bold};
    
    &.success {
      background: rgba(76, 175, 80, 0.1);
      color: #4caf50;
    }
    
    &.error {
      background: rgba(244, 67, 54, 0.1);
      color: #f44336;
    }
    
    &.warning {
      background: rgba(255, 152, 0, 0.1);
      color: #ff9800;
    }
  }
`;
const TestButton = styled(Button) `
  margin: ${theme.spacing.xs} ${theme.spacing.xs} ${theme.spacing.xs} 0;
`;
export const MobileDebugPage = () => {
    const [debugInfo, setDebugInfo] = useState({});
    const [testResults, setTestResults] = useState({});
    const [loading, setLoading] = useState('');
    useEffect(() => {
        // Collect device and network information
        const info = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            screen: {
                width: screen.width,
                height: screen.height,
                pixelRatio: window.devicePixelRatio
            },
            window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight
            },
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : 'Not available',
            localStorage: {
                available: typeof (Storage) !== 'undefined',
                token: localStorage.getItem('token') ? 'Present' : 'None'
            },
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            timestamp: new Date().toISOString()
        };
        setDebugInfo(info);
    }, []);
    const testApiConnection = async () => {
        setLoading('api');
        try {
            const response = await fetch('/api/memberships/plans', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setTestResults((prev) => ({
                ...prev,
                api: {
                    status: response.ok ? 'success' : 'error',
                    statusCode: response.status,
                    data: data,
                    headers: Object.fromEntries(response.headers.entries())
                }
            }));
        }
        catch (error) {
            setTestResults((prev) => ({
                ...prev,
                api: {
                    status: 'error',
                    error: error.message,
                    name: error.name
                }
            }));
        }
        setLoading('');
    };
    const testFormSubmission = async () => {
        setLoading('form');
        try {
            const testData = new FormData();
            testData.append('plan', 'monthly');
            testData.append('firstName', 'Test');
            testData.append('lastName', 'User');
            testData.append('email', 'test@example.com');
            testData.append('phone', '1234567890');
            const response = await membershipService.createSubscription(testData);
            setTestResults((prev) => ({
                ...prev,
                form: {
                    status: 'success',
                    data: response
                }
            }));
        }
        catch (error) {
            setTestResults((prev) => ({
                ...prev,
                form: {
                    status: 'error',
                    error: error.message,
                    response: error.response?.data,
                    statusCode: error.response?.status
                }
            }));
        }
        setLoading('');
    };
    const testFileUpload = async () => {
        setLoading('file');
        try {
            // Create a small test file
            const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
            const formData = new FormData();
            formData.append('plan', 'student');
            formData.append('firstName', 'Test');
            formData.append('lastName', 'Student');
            formData.append('email', 'student@test.com');
            formData.append('phone', '1234567890');
            formData.append('university', 'Test University');
            formData.append('program', 'Test Program');
            formData.append('studentId', testFile);
            formData.append('timetable', testFile);
            const response = await membershipService.createSubscription(formData);
            setTestResults((prev) => ({
                ...prev,
                file: {
                    status: 'success',
                    data: response
                }
            }));
        }
        catch (error) {
            setTestResults((prev) => ({
                ...prev,
                file: {
                    status: 'error',
                    error: error.message,
                    response: error.response?.data,
                    statusCode: error.response?.status
                }
            }));
        }
        setLoading('');
    };
    return (_jsx(Container, { children: _jsxs("div", { style: { padding: `${theme.spacing.xl} 0` }, children: [_jsx("h1", { children: "Mobile Subscription Debug" }), _jsx("p", { children: "Use this page to diagnose mobile subscription issues." }), _jsxs(DebugContainer, { children: [_jsx("h3", { children: "Device Information" }), _jsx("div", { className: `status ${debugInfo.isMobile ? 'warning' : 'success'}`, children: debugInfo.isMobile ? 'Mobile Device Detected' : 'Desktop Device' }), _jsx("pre", { children: JSON.stringify(debugInfo, null, 2) })] }), _jsxs(DebugContainer, { children: [_jsx("h3", { children: "Connection Tests" }), _jsxs("div", { style: { marginBottom: theme.spacing.md }, children: [_jsx(TestButton, { variant: "outline", size: "sm", onClick: testApiConnection, disabled: loading === 'api', children: loading === 'api' ? 'Testing...' : 'Test API Connection' }), _jsx(TestButton, { variant: "outline", size: "sm", onClick: testFormSubmission, disabled: loading === 'form', children: loading === 'form' ? 'Testing...' : 'Test Basic Subscription' }), _jsx(TestButton, { variant: "outline", size: "sm", onClick: testFileUpload, disabled: loading === 'file', children: loading === 'file' ? 'Testing...' : 'Test File Upload' })] }), Object.keys(testResults).map(test => (_jsxs("div", { children: [_jsxs("h4", { children: [test.charAt(0).toUpperCase() + test.slice(1), " Test Results:"] }), _jsx("div", { className: `status ${testResults[test]?.status || 'loading'}`, children: testResults[test]?.status?.charAt(0).toUpperCase() + testResults[test]?.status?.slice(1) || 'No results yet' }), _jsx("pre", { children: JSON.stringify(testResults[test], null, 2) })] }, test)))] }), _jsxs(DebugContainer, { children: [_jsx("h3", { children: "Common Mobile Issues & Solutions" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Network Timeout:" }), " Mobile networks can be slower - increased timeout to 60s"] }), _jsxs("li", { children: [_jsx("strong", { children: "File Size Limits:" }), " Mobile uploads limited to 5MB per file"] }), _jsxs("li", { children: [_jsx("strong", { children: "CORS Issues:" }), " Local mobile IP addresses now whitelisted"] }), _jsxs("li", { children: [_jsx("strong", { children: "Popup Blockers:" }), " Using _self redirect for better mobile compatibility"] }), _jsxs("li", { children: [_jsx("strong", { children: "Connection Issues:" }), " Added retry logic with exponential backoff"] })] })] })] }) }));
};
