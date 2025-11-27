import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Button } from '@components/Button'
import { useNavigate } from 'react-router-dom'

const NotFoundContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxxl} 0;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NotFoundTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize['4xl']};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`

const NotFoundMessage = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.xl};
  max-width: 500px;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize.base};
  }
`

const EmojiIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`

export const NotFound: React.FC = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate('/')
  }

  return (
    <section style={{ padding: `${theme.spacing.xxxl} ${theme.spacing.lg}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <NotFoundContainer>
          <EmojiIcon>🔍</EmojiIcon>
          <NotFoundTitle>404 - Page Not Found</NotFoundTitle>
          <NotFoundMessage>
            Sorry, the page you are looking for could not be found. 
            It might have been moved, deleted, or you entered the wrong URL.
          </NotFoundMessage>
          <ButtonGroup>
            <Button variant="primary" onClick={handleGoHome}>
              🏠 Go Home
            </Button>
            <Button variant="outline" onClick={handleGoBack}>
              ← Go Back
            </Button>
          </ButtonGroup>
        </NotFoundContainer>
      </div>
    </section>
  )
}