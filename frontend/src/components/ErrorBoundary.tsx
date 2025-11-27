import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Button } from '@components/Button'

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxxl} 0;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ErrorTitle = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize['3xl']};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`

const ErrorMessage = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
  font-size: ${theme.typography.fontSize.lg};
  max-width: 500px;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize.base};
    margin-bottom: ${theme.spacing.lg};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{ padding: `${theme.spacing.xxxl} ${theme.spacing.lg}` }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <ErrorContainer>
              <ErrorTitle>🚨 Oops! Something went wrong</ErrorTitle>
              <ErrorMessage>
                We encountered an unexpected error. This has been logged and our team will look into it.
              </ErrorMessage>
              <ButtonGroup>
                <Button variant="primary" onClick={this.handleRetry}>
                  🔄 Try Again
                </Button>
                <Button variant="outline" onClick={this.handleGoHome}>
                  🏠 Go Home
                </Button>
              </ButtonGroup>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details style={{ marginTop: theme.spacing.xl, textAlign: 'left', maxWidth: '600px' }}>
                  <summary style={{ cursor: 'pointer', color: theme.colors.primary }}>
                    Debug Info (Development Only)
                  </summary>
                  <pre style={{ 
                    background: theme.colors.surface, 
                    padding: theme.spacing.md, 
                    borderRadius: theme.borderRadius.md,
                    fontSize: theme.typography.fontSize.sm,
                    overflow: 'auto',
                    marginTop: theme.spacing.sm
                  }}>
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </ErrorContainer>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}