/**
 * Mobile Debug Component for TVK Canada Subscription Issues
 */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container } from '@components/Layout'
import { Button } from '@components/Button'
import { membershipService } from '../services/api'

const DebugContainer = styled.div`
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
`

const TestButton = styled(Button)`
  margin: ${theme.spacing.xs} ${theme.spacing.xs} ${theme.spacing.xs} 0;
`

export const MobileDebugPage: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [testResults, setTestResults] = useState<any>({})
  const [loading, setLoading] = useState('')

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
      connection: (navigator as any).connection ? {
        effectiveType: (navigator as any).connection.effectiveType,
        downlink: (navigator as any).connection.downlink,
        rtt: (navigator as any).connection.rtt
      } : 'Not available',
      localStorage: {
        available: typeof(Storage) !== 'undefined',
        token: localStorage.getItem('token') ? 'Present' : 'None'
      },
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      timestamp: new Date().toISOString()
    }
    
    setDebugInfo(info)
  }, [])

  const testApiConnection = async () => {
    setLoading('api')
    try {
      const response = await fetch('/api/memberships/plans', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const data = await response.json()
      setTestResults((prev: any) => ({
        ...prev,
        api: {
          status: response.ok ? 'success' : 'error',
          statusCode: response.status,
          data: data,
          headers: Object.fromEntries(response.headers.entries())
        }
      }))
    } catch (error: any) {
      setTestResults((prev: any) => ({
        ...prev,
        api: {
          status: 'error',
          error: error.message,
          name: error.name
        }
      }))
    }
    setLoading('')
  }

  const testFormSubmission = async () => {
    setLoading('form')
    try {
      const testData = new FormData()
      testData.append('plan', 'monthly')
      testData.append('firstName', 'Test')
      testData.append('lastName', 'User')
      testData.append('email', 'test@example.com')
      testData.append('phone', '1234567890')
      
      const response = await membershipService.createSubscription(testData)
      setTestResults((prev: any) => ({
        ...prev,
        form: {
          status: 'success',
          data: response
        }
      }))
    } catch (error: any) {
      setTestResults((prev: any) => ({
        ...prev,
        form: {
          status: 'error',
          error: error.message,
          response: error.response?.data,
          statusCode: error.response?.status
        }
      }))
    }
    setLoading('')
  }

  const testFileUpload = async () => {
    setLoading('file')
    try {
      // Create a small test file
      const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
      const formData = new FormData()
      formData.append('plan', 'student')
      formData.append('firstName', 'Test')
      formData.append('lastName', 'Student')
      formData.append('email', 'student@test.com')
      formData.append('phone', '1234567890')
      formData.append('university', 'Test University')
      formData.append('program', 'Test Program')
      formData.append('studentId', testFile)
      formData.append('timetable', testFile)
      
      const response = await membershipService.createSubscription(formData)
      setTestResults((prev: any) => ({
        ...prev,
        file: {
          status: 'success',
          data: response
        }
      }))
    } catch (error: any) {
      setTestResults((prev: any) => ({
        ...prev,
        file: {
          status: 'error',
          error: error.message,
          response: error.response?.data,
          statusCode: error.response?.status
        }
      }))
    }
    setLoading('')
  }

  return (
    <Container>
      <div style={{ padding: `${theme.spacing.xl} 0` }}>
        <h1>Mobile Subscription Debug</h1>
        <p>Use this page to diagnose mobile subscription issues.</p>

        <DebugContainer>
          <h3>Device Information</h3>
          <div className={`status ${debugInfo.isMobile ? 'warning' : 'success'}`}>
            {debugInfo.isMobile ? 'Mobile Device Detected' : 'Desktop Device'}
          </div>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </DebugContainer>

        <DebugContainer>
          <h3>Connection Tests</h3>
          
          <div style={{ marginBottom: theme.spacing.md }}>
            <TestButton 
              variant="outline" 
              size="sm" 
              onClick={testApiConnection}
              disabled={loading === 'api'}
            >
              {loading === 'api' ? 'Testing...' : 'Test API Connection'}
            </TestButton>
            
            <TestButton 
              variant="outline" 
              size="sm" 
              onClick={testFormSubmission}
              disabled={loading === 'form'}
            >
              {loading === 'form' ? 'Testing...' : 'Test Basic Subscription'}
            </TestButton>
            
            <TestButton 
              variant="outline" 
              size="sm" 
              onClick={testFileUpload}
              disabled={loading === 'file'}
            >
              {loading === 'file' ? 'Testing...' : 'Test File Upload'}
            </TestButton>
          </div>

          {Object.keys(testResults).map(test => (
            <div key={test}>
              <h4>{test.charAt(0).toUpperCase() + test.slice(1)} Test Results:</h4>
              <div className={`status ${testResults[test]?.status || 'loading'}`}>
                {testResults[test]?.status?.charAt(0).toUpperCase() + testResults[test]?.status?.slice(1) || 'No results yet'}
              </div>
              <pre>{JSON.stringify(testResults[test], null, 2)}</pre>
            </div>
          ))}
        </DebugContainer>

        <DebugContainer>
          <h3>Common Mobile Issues & Solutions</h3>
          <ul>
            <li><strong>Network Timeout:</strong> Mobile networks can be slower - increased timeout to 60s</li>
            <li><strong>File Size Limits:</strong> Mobile uploads limited to 5MB per file</li>
            <li><strong>CORS Issues:</strong> Local mobile IP addresses now whitelisted</li>
            <li><strong>Popup Blockers:</strong> Using _self redirect for better mobile compatibility</li>
            <li><strong>Connection Issues:</strong> Added retry logic with exponential backoff</li>
          </ul>
        </DebugContainer>
      </div>
    </Container>
  )
}