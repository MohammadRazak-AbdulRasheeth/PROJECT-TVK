"use strict";
n;
nimport;
React, { useState, useEffect };
from;
'react';
nimport;
styled;
from;
'styled-components';
nimport;
{
    theme;
}
from;
'@styles/theme';
nimport;
{
    Container;
}
from;
'@components/Layout';
nimport;
{
    Button;
}
from;
'@components/Button';
nimport;
{
    membershipService;
}
from;
'../services/api';
n;
nconst;
DebugContainer = styled.div `\n  background: ${theme.colors.surface};\n  border-radius: ${theme.borderRadius.lg};\n  padding: ${theme.spacing.lg};\n  margin: ${theme.spacing.lg} 0;\n  \n  h3 {\n    color: ${theme.colors.primary};\n    margin-bottom: ${theme.spacing.md};\n  }\n  \n  pre {\n    background: ${theme.colors.background};\n    border: 1px solid ${theme.colors.border};\n    border-radius: ${theme.borderRadius.sm};\n    padding: ${theme.spacing.sm};\n    overflow-x: auto;\n    font-size: ${theme.typography.fontSize.sm};\n    white-space: pre-wrap;\n  }\n  \n  .status {\n    display: inline-block;\n    padding: ${theme.spacing.xs} ${theme.spacing.sm};\n    border-radius: ${theme.borderRadius.sm};\n    font-size: ${theme.typography.fontSize.xs};\n    font-weight: ${theme.typography.fontWeight.bold};\n    \n    &.success {\n      background: rgba(76, 175, 80, 0.1);\n      color: #4caf50;\n    }\n    \n    &.error {\n      background: rgba(244, 67, 54, 0.1);\n      color: #f44336;\n    }\n    \n    &.warning {\n      background: rgba(255, 152, 0, 0.1);\n      color: #ff9800;\n    }\n  }\n`;
n;
nconst;
TestButton = styled(Button) `\n  margin: ${theme.spacing.xs} ${theme.spacing.xs} ${theme.spacing.xs} 0;\n`;
n;
nexport;
const MobileDebugPage = () => { n; const [debugInfo, setDebugInfo] = useState({}), n; const [testResults, setTestResults] = useState({}), n; const [loading, setLoading] = useState(''), n, n, useEffect; (() => { n; }); }; // Collect device and network information\n    const info = {\n      userAgent: navigator.userAgent,\n      platform: navigator.platform,\n      language: navigator.language,\n      cookieEnabled: navigator.cookieEnabled,\n      onLine: navigator.onLine,\n      screen: {\n        width: screen.width,\n        height: screen.height,\n        pixelRatio: window.devicePixelRatio\n      },\n      window: {\n        innerWidth: window.innerWidth,\n        innerHeight: window.innerHeight\n      },\n      connection: (navigator as any).connection ? {\n        effectiveType: (navigator as any).connection.effectiveType,\n        downlink: (navigator as any).connection.downlink,\n        rtt: (navigator as any).connection.rtt\n      } : 'Not available',\n      localStorage: {\n        available: typeof(Storage) !== 'undefined',\n        token: localStorage.getItem('token') ? 'Present' : 'None'\n      },\n      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),\n      timestamp: new Date().toISOString()\n    }\n    \n    setDebugInfo(info)\n  }, [])\n\n  const testApiConnection = async () => {\n    setLoading('api')\n    try {\n      const response = await fetch('/api/memberships/plans', {\n        method: 'GET',\n        headers: {\n          'Content-Type': 'application/json'\n        }\n      })\n      \n      const data = await response.json()\n      setTestResults(prev => ({\n        ...prev,\n        api: {\n          status: response.ok ? 'success' : 'error',\n          statusCode: response.status,\n          data: data,\n          headers: Object.fromEntries(response.headers.entries())\n        }\n      }))\n    } catch (error) {\n      setTestResults(prev => ({\n        ...prev,\n        api: {\n          status: 'error',\n          error: error.message,\n          name: error.name\n        }\n      }))\n    }\n    setLoading('')\n  }\n\n  const testFormSubmission = async () => {\n    setLoading('form')\n    try {\n      const testData = new FormData()\n      testData.append('plan', 'monthly')\n      testData.append('firstName', 'Test')\n      testData.append('lastName', 'User')\n      testData.append('email', 'test@example.com')\n      testData.append('phone', '1234567890')\n      \n      const response = await membershipService.createSubscription(testData)\n      setTestResults(prev => ({\n        ...prev,\n        form: {\n          status: 'success',\n          data: response\n        }\n      }))\n    } catch (error) {\n      setTestResults(prev => ({\n        ...prev,\n        form: {\n          status: 'error',\n          error: error.message,\n          response: error.response?.data,\n          statusCode: error.response?.status\n        }\n      }))\n    }\n    setLoading('')\n  }\n\n  const testFileUpload = async () => {\n    setLoading('file')\n    try {\n      // Create a small test file\n      const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' })\n      const formData = new FormData()\n      formData.append('plan', 'student')\n      formData.append('firstName', 'Test')\n      formData.append('lastName', 'Student')\n      formData.append('email', 'student@test.com')\n      formData.append('phone', '1234567890')\n      formData.append('university', 'Test University')\n      formData.append('program', 'Test Program')\n      formData.append('studentId', testFile)\n      formData.append('timetable', testFile)\n      \n      const response = await membershipService.createSubscription(formData)\n      setTestResults(prev => ({\n        ...prev,\n        file: {\n          status: 'success',\n          data: response\n        }\n      }))\n    } catch (error) {\n      setTestResults(prev => ({\n        ...prev,\n        file: {\n          status: 'error',\n          error: error.message,\n          response: error.response?.data,\n          statusCode: error.response?.status\n        }\n      }))\n    }\n    setLoading('')\n  }\n\n  return (\n    <Container>\n      <div style={{ padding: `${theme.spacing.xl} 0` }}>\n        <h1>Mobile Subscription Debug</h1>\n        <p>Use this page to diagnose mobile subscription issues.</p>\n\n        <DebugContainer>\n          <h3>Device Information</h3>\n          <div className={`status ${debugInfo.isMobile ? 'warning' : 'success'}`}>\n            {debugInfo.isMobile ? 'Mobile Device Detected' : 'Desktop Device'}\n          </div>\n          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>\n        </DebugContainer>\n\n        <DebugContainer>\n          <h3>Connection Tests</h3>\n          \n          <div style={{ marginBottom: theme.spacing.md }}>\n            <TestButton \n              variant=\"outline\" \n              size=\"sm\" \n              onClick={testApiConnection}\n              disabled={loading === 'api'}\n            >\n              {loading === 'api' ? 'Testing...' : 'Test API Connection'}\n            </TestButton>\n            \n            <TestButton \n              variant=\"outline\" \n              size=\"sm\" \n              onClick={testFormSubmission}\n              disabled={loading === 'form'}\n            >\n              {loading === 'form' ? 'Testing...' : 'Test Basic Subscription'}\n            </TestButton>\n            \n            <TestButton \n              variant=\"outline\" \n              size=\"sm\" \n              onClick={testFileUpload}\n              disabled={loading === 'file'}\n            >\n              {loading === 'file' ? 'Testing...' : 'Test File Upload'}\n            </TestButton>\n          </div>\n\n          {Object.keys(testResults).map(test => (\n            <div key={test}>\n              <h4>{test.charAt(0).toUpperCase() + test.slice(1)} Test Results:</h4>\n              <div className={`status ${testResults[test].status}`}>\n                {testResults[test].status.charAt(0).toUpperCase() + testResults[test].status.slice(1)}\n              </div>\n              <pre>{JSON.stringify(testResults[test], null, 2)}</pre>\n            </div>\n          ))}\n        </DebugContainer>\n\n        <DebugContainer>\n          <h3>Common Mobile Issues & Solutions</h3>\n          <ul>\n            <li><strong>Network Timeout:</strong> Mobile networks can be slower - increased timeout to 60s</li>\n            <li><strong>File Size Limits:</strong> Mobile uploads limited to 5MB per file</li>\n            <li><strong>CORS Issues:</strong> Local mobile IP addresses now whitelisted</li>\n            <li><strong>Popup Blockers:</strong> Using _self redirect for better mobile compatibility</li>\n            <li><strong>Connection Issues:</strong> Added retry logic with exponential backoff</li>\n          </ul>\n        </DebugContainer>\n      </div>\n    </Container>\n  )\n}\n
