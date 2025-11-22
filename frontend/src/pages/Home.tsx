/**
 * Home Page - Premium Design
 */

import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section, Grid, Flex } from '@components/Layout'
import { Button } from '@components/Button'

const HeroSection = styled(Section)`
  background: ${theme.colors.gradient.primary};
  color: ${theme.colors.text.inverse};
  padding: ${theme.spacing.xxl} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -150px;
    left: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
    border-radius: 50%;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl} 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} 0;
  }
`

const HeroContent = styled(Container)`
  position: relative;
  z-index: 1;
  text-align: center;
`

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: ${theme.spacing.lg};
  line-height: ${theme.typography.lineHeight.tight};
  font-weight: ${theme.typography.fontWeight.extrabold};
  color: ${theme.colors.text.inverse};
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing.md};
  }
`

const HeroSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${theme.typography.lineHeight.relaxed};
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize.base};
    margin-bottom: ${theme.spacing.lg};
    max-width: 500px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.sm};
    margin-bottom: ${theme.spacing.md};
    max-width: 90%;
  }
`

const HeroButtons = styled(Flex)`
  justify-content: center;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const HighlightCard = styled.div<{ gradient?: boolean }>`
  background: ${props => props.gradient 
    ? `linear-gradient(135deg, ${theme.colors.secondary}15 0%, ${theme.colors.secondary}05 100%)` 
    : theme.colors.surface};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  text-align: center;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};
  border: 2px solid ${props => props.gradient ? theme.colors.secondary : 'transparent'};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
    border-radius: ${theme.borderRadius['2xl']} ${theme.borderRadius['2xl']} 0 0;
  }

  &:hover {
    box-shadow: ${theme.shadows.xl};
    transform: translateY(-8px) scale(1.02);
    border-color: ${theme.colors.primary};
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }

  h3 {
    font-size: ${theme.typography.fontSize.xl};
    margin: ${theme.spacing.md} 0;
    color: ${theme.colors.text.primary};
    transition: color ${theme.transitions.base};
  }

  p {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.secondary};
    line-height: ${theme.typography.lineHeight.relaxed};
    transition: color ${theme.transitions.base};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:active {
      transform: translateY(-2px) scale(1.01);
      box-shadow: ${theme.shadows.lg};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    touch-action: manipulation;

    h3 {
      font-size: ${theme.typography.fontSize.lg};
      margin: ${theme.spacing.sm} 0;
    }

    p {
      font-size: ${theme.typography.fontSize.sm};
    }

    &:active {
      transform: scale(0.98);
      box-shadow: ${theme.shadows.md};
    }
  }
`

const Badge = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, ${theme.colors.secondary} 0%, #ffed4e 100%);
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.xs};
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  font-size: ${theme.typography.fontSize['4xl']};
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.fontWeight.extrabold};
  position: relative;
  padding-bottom: ${theme.spacing.lg};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
    border-radius: ${theme.borderRadius.full};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.lg};
    padding-bottom: ${theme.spacing.md};
  }
`

const EventCard = styled(HighlightCard)`
  border-left: 6px solid ${theme.colors.secondary};
  border-top: none;
  background: linear-gradient(135deg, #fff8e7 0%, #fffaed 100%);
  border: 2px solid ${theme.colors.secondary};
  border-left: 6px solid ${theme.colors.secondary};

  &::before {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.secondary}, ${theme.colors.accent});
    border-radius: ${theme.borderRadius['2xl']} ${theme.borderRadius['2xl']} 0 0;
  }

  &:hover {
    background: linear-gradient(135deg, #ffeed4 0%, #fff5cc 100%);
    box-shadow: ${theme.shadows.xl};
    transform: translateY(-6px) translateX(4px);
    border-left-width: 8px;
  }

  .date {
    background: linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: ${theme.typography.fontWeight.bold};
    font-size: ${theme.typography.fontSize.sm};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: ${theme.spacing.md};
  }

  h3 {
    color: ${theme.colors.primary};
  }

  p {
    color: ${theme.colors.text.secondary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    background: linear-gradient(135deg, #fff8e7 0%, #fffaed 100%);

    &:active {
      transform: scale(0.97);
      box-shadow: ${theme.shadows.md};
    }

    &::after {
      display: none;
    }
  }
`

/**
 * Home Page Component - Premium Design
 */
export const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            TVK CANADA – The Voice of Vijay Fans in Canada
          </HeroTitle>
          <HeroSubtitle>
            Unite with thousands of Thalapathy supporters across Canada. 
            <br />
            Celebrate culture and community.
          </HeroSubtitle>
          <HeroButtons>
            <Button variant="secondary" size="lg">
              Join TVK Canada
            </Button>
            <Button variant="outline" size="lg" style={{ 
              borderColor: 'white', 
              color: 'white'
            }}>
              Learn More
            </Button>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      {/* Membership Highlights */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.background}>
        <Container>
          <SectionTitle>Membership Benefits</SectionTitle>
          <Grid columns={3} gap={theme.spacing.xl}>
            <HighlightCard gradient>
              <Badge>Pricing</Badge>
              <h3>Affordable Plans</h3>
              <p>
                <strong>$10/month</strong> or <strong>$100/year</strong> – Choose what works best for you. Cancel anytime.
              </p>
            </HighlightCard>

            <HighlightCard gradient>
              <Badge>First 200 Members</Badge>
              <h3>Exclusive Offer</h3>
              <p>
                Get <strong>6 months FREE</strong> membership plus a Special Edition Founding Member Physical Card!
              </p>
            </HighlightCard>

            <HighlightCard gradient>
              <Badge>Member Benefits</Badge>
              <h3>Member Exclusive Benefits</h3>
              <p>
                Discounts, community access, priority events, and special recognition within our growing network.
              </p>
            </HighlightCard>
          </Grid>
        </Container>
      </Section>

      {/* Weekly Events */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.surface}>
        <Container>
          <SectionTitle>Weekly Events & Gatherings</SectionTitle>
          <Grid columns={3} gap={theme.spacing.xl}>
            {[
              {
                title: 'Weekly Meetups',
                date: 'Every Week',
                description: 'Build friendships and community spirit with fellow TVK members across Canada.',
              },
              {
                title: 'Cultural Events',
                date: 'Monthly',
                description:
                  'Celebrate Tamil culture with traditional celebrations and community gatherings.',
              },
              {
                title: 'Community Gatherings',
                date: 'Throughout Year',
                description: 'Family-friendly, engaging activities that bring our community together.',
              },
            ].map((event, idx) => (
              <EventCard key={idx}>
                <div className="date">📅 {event.date}</div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </EventCard>
            ))}
          </Grid>
          <Flex justify="center" style={{ marginTop: theme.spacing.xl }}>
            <Button variant="primary" size="lg">
              View All Events
            </Button>
          </Flex>
        </Container>
      </Section>

      {/* Global Network Preview */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.background}>
        <Container>
          <SectionTitle>Global Network</SectionTitle>
          <p style={{ textAlign: 'center', marginBottom: theme.spacing.xxl, color: theme.colors.text.secondary, fontSize: '18px', lineHeight: theme.typography.lineHeight.relaxed }}>
            TVK Community spans across continents. Connect with Vijay supporters and be part of a global movement.
          </p>
          <Flex justify="center">
            <Button variant="primary" size="lg">
              Explore Global Network
            </Button>
          </Flex>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section
        padding={`${theme.spacing.xxxl} 0`}
        background={`linear-gradient(135deg, ${theme.colors.primary} 0%, #8b1428 100%)`}
      >
        <Container>
          <div style={{ textAlign: 'center', color: theme.colors.text.inverse }}>
            <h2 style={{ fontSize: theme.typography.fontSize['4xl'], marginBottom: theme.spacing.lg }}>Ready to Join?</h2>
            <p style={{ fontSize: '18px', marginBottom: theme.spacing.xl, maxWidth: '600px', margin: '0 auto 2rem' }}>
              Become part of Canada's premier Thalapathy Vijay fan community.
            </p>
            <Button variant="secondary" size="lg">
              Join Now
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
