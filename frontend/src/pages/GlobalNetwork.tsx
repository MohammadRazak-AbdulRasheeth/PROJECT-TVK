/**
 * TVK Global Network Page
 * Showcasing Vijay fan groups across the world under the TVK brand
 */

import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO, seoData } from '@components/SEO'

const HeroSection = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, #a01829 100%);
  color: ${theme.colors.text.inverse};
  text-align: center;
  padding: ${theme.spacing.xxxl} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
    border-radius: 50%;
  }

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    margin-bottom: ${theme.spacing.lg};
    position: relative;
    z-index: 1;
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
  }

  p {
    font-size: 18px;
    margin: 0;
    opacity: 0.95;
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xxl} 0;
    h1 {
      font-size: ${theme.typography.fontSize['2xl']};
    }
    p {
      font-size: 16px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl} 0;
    h1 {
      font-size: ${theme.typography.fontSize.xl};
      margin-bottom: ${theme.spacing.md};
    }
    p {
      font-size: 14px;
    }
  }
`

/**
 * TVK Global Network Page Component
 */
export const GlobalNetworkPage: React.FC = () => {
  // Global Instagram hashtags for TVK community
  const globalHashtags = ['#ThalapathyVijay', '#TVK', '#Thalapathy', '#VijayFans']

  return (
    <>
      <SEO {...seoData.globalNetwork} />
      
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <h1>TVK Global Network - Worldwide Thalapathy Vijay Fan Communities</h1>
          <p>
            Connect with TVK fan groups worldwide through their official Instagram pages. Follow for updates, events, and community celebrations.
          </p>
        </Container>
      </HeroSection>

      {/* TVK Canada Instagram Profile Section */}
      <Section padding={`${theme.spacing.xxxl} 0`}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.lg, color: theme.colors.primary, fontSize: theme.typography.fontSize['3xl'] }}>
            Follow @tvk.canada on Instagram
          </h2>
          <p
            style={{
              textAlign: 'center',
              marginBottom: theme.spacing.xl,
              color: theme.colors.text.secondary,
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}
          >
            Stay connected with TVK Canada for the latest updates, event photos, and community highlights from Thalapathy Vijay fans across Canada.
          </p>
          
          {/* Instagram Profile Card */}
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            marginTop: theme.spacing.xl,
            marginBottom: theme.spacing.xxl
          }}>
            <a
              href="https://instagram.com/tvk.canada"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: theme.colors.surface,
                borderRadius: theme.borderRadius['2xl'],
                padding: theme.spacing.xxl,
                textAlign: 'center',
                textDecoration: 'none',
                border: `3px solid ${theme.colors.primary}`,
                boxShadow: theme.shadows.lg,
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(196, 22, 28, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = theme.shadows.lg
              }}
            >
              {/* Instagram Icon */}
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto',
                marginBottom: theme.spacing.lg,
                background: 'linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 75%, #FD1D1D 100%)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
              }}>
                📷
              </div>
              <h3 style={{ 
                color: theme.colors.primary, 
                marginBottom: theme.spacing.sm,
                fontSize: theme.typography.fontSize['2xl']
              }}>
                @tvk.canada
              </h3>
              <p style={{ 
                color: theme.colors.text.secondary, 
                marginBottom: theme.spacing.lg,
                fontSize: theme.typography.fontSize.base
              }}>
                TVK Canada Official Instagram
              </p>
              <div style={{
                background: 'linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 75%, #FD1D1D 100%)',
                color: '#fff',
                padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                borderRadius: theme.borderRadius.lg,
                fontWeight: theme.typography.fontWeight.bold,
                fontSize: theme.typography.fontSize.base,
                display: 'inline-block'
              }}>
                Follow on Instagram
              </div>
            </a>
          </div>

          {/* Global Hashtags */}
          <h3 style={{ textAlign: 'center', marginBottom: theme.spacing.lg, color: theme.colors.text.primary }}>
            Explore Global TVK Hashtags
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: theme.spacing.md, 
            marginBottom: theme.spacing.xxl 
          }}>
            {globalHashtags.map((hashtag) => (
              <a
                key={hashtag}
                href={`https://www.instagram.com/explore/tags/${hashtag.replace('#', '')}/`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 75%, #FD1D1D 100%)',
                  color: '#fff',
                  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                  borderRadius: theme.borderRadius.xl,
                  textDecoration: 'none',
                  fontWeight: theme.typography.fontWeight.bold,
                  fontSize: theme.typography.fontSize.base,
                  boxShadow: theme.shadows.md,
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = theme.shadows.lg
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = theme.shadows.md
                }}
              >
                {hashtag}
              </a>
            ))}
          </div>

          {/* Call to Action */}
          <div style={{
            background: theme.colors.surface,
            borderRadius: theme.borderRadius['2xl'],
            padding: theme.spacing.xxl,
            textAlign: 'center',
            border: `2px solid ${theme.colors.border}`
          }}>
            <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>🌍</div>
            <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>
              Join the Global TVK Community
            </h3>
            <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.lg, maxWidth: '600px', margin: '0 auto' }}>
              Share your TVK moments on Instagram using our community hashtags. Tag @tvk.canada and your posts will be part of the worldwide Thalapathy Vijay fan network!
            </p>
          </div>
        </Container>
      </Section>
      {/* Membership Section */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.surface}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.xl, color: theme.colors.primary, fontSize: theme.typography.fontSize['3xl'] }}>
            Join TVK Canada Community
          </h2>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', marginBottom: theme.spacing.xl }}>
            <p style={{ fontSize: theme.typography.fontSize.lg, color: theme.colors.text.secondary, lineHeight: '1.7' }}>
              Based in Ottawa, ON, TVK Canada brings together Thalapathy Vijay fans across Canada for community events, charity work, and cultural celebrations.
            </p>
          </div>
          <div
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #a01829 100%)`,
              color: theme.colors.text.inverse,
              padding: theme.spacing.xl,
              borderRadius: theme.borderRadius['2xl'],
              textAlign: 'center',
            }}
          >
            <h3 style={{ marginBottom: theme.spacing.lg, color: theme.colors.text.inverse }}>Ready to Connect with Our Global Family?</h3>
            <p style={{ marginBottom: theme.spacing.lg, fontSize: '16px', color: theme.colors.text.inverse, opacity: 0.95 }}>
              Follow us on Instagram and join the TVK Canada membership community.
            </p>
            <div style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="https://app.joinit.com/o/tvkcanada/" 
                title="Memberships for TVK Canada" 
                style={{
                  textDecoration: 'none',
                  padding: '11px 20px',
                  fontSize: '15px',
                  color: '#fff',
                  border: 'none',
                  backgroundColor: '#c4161c',
                  fontWeight: 400,
                  borderRadius: '3px'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join TVK Canada
              </a>
              <Button 
                variant="outline" 
                onClick={() => window.open('https://instagram.com/tvk.canada', '_blank')}
                style={{ background: 'transparent', borderColor: theme.colors.secondary, color: theme.colors.secondary }}
              >
                Follow @tvk.canada
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
