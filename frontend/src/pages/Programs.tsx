/**
 * Programs & Drop-In Activities Page
 * Community-first approach: wellness, mental health, sports, growth
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section, Grid } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { FaBrain, FaBasketball, FaPersonRunning, FaBaseballBatBall, FaFilm, FaSpa, FaTrophy, FaUsers, FaCalendarDays, FaDollarSign, FaLocationDot, FaStar } from 'react-icons/fa6'

const PageHeader = styled(Section)`
  background: ${theme.colors.gradient.primary};
  color: ${theme.colors.text.inverse};
  text-align: center;
  padding: ${theme.spacing.xxxl} ${theme.spacing.lg};

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    font-weight: ${theme.typography.fontWeight.extrabold};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    h1 { font-size: ${theme.typography.fontSize['2xl']}; }
    p { font-size: ${theme.typography.fontSize.base}; }
  }
`

const ProgramCard = styled.div<{ featured?: boolean }>`
  background: ${props => props.featured 
    ? `linear-gradient(135deg, ${theme.colors.primary}10 0%, ${theme.colors.secondary}15 100%)` 
    : theme.colors.surface};
  border: 2px solid ${props => props.featured ? theme.colors.secondary : theme.colors.border};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  transition: all ${theme.transitions.base};
  position: relative;
  overflow: hidden;

  ${props => props.featured && `
    &::before {
      content: 'Featured';
      position: absolute;
      top: ${theme.spacing.md};
      right: ${theme.spacing.md};
      background: ${theme.colors.secondary};
      color: ${theme.colors.text.primary};
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      border-radius: ${theme.borderRadius.full};
      font-size: ${theme.typography.fontSize.xs};
      font-weight: ${theme.typography.fontWeight.bold};
    }
  `}

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.secondary};
  }

  .program-icon {
    font-size: 48px;
    margin-bottom: ${theme.spacing.md};
  }

  h3 {
    color: ${theme.colors.primary};
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.sm};
  }

  .program-meta {
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.md};
  }

  .meta-tag {
    background: ${theme.colors.primary}15;
    color: ${theme.colors.primary};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.full};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.semibold};
  }

  .price-tag {
    background: ${theme.colors.secondary};
    color: ${theme.colors.text.primary};
  }

  p {
    color: ${theme.colors.text.secondary};
    line-height: ${theme.typography.lineHeight.relaxed};
    margin-bottom: ${theme.spacing.lg};
  }
`

const CategorySection = styled.div`
  margin-bottom: ${theme.spacing.xxxl};

  h2 {
    color: ${theme.colors.primary};
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.xl};
    padding-bottom: ${theme.spacing.md};
    border-bottom: 3px solid ${theme.colors.secondary};
    display: inline-block;
  }
`

const CTABox = styled.div`
  background: linear-gradient(135deg, ${theme.colors.secondary}20 0%, ${theme.colors.primary}10 100%);
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xxl};
  text-align: center;
  margin-top: ${theme.spacing.xxxl};

  h3 {
    color: ${theme.colors.primary};
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.lg};
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`

const FeaturedBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.secondary};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  display: flex;
  align-items: center;
  gap: 4px;
`

const IconWrapper = styled.div`
  font-size: 48px;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.primary};
`

const CategoryTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize['2xl']};
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 3px solid ${theme.colors.secondary};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`

const MetaIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
`

export const ProgramsPage: React.FC = () => {
  const navigate = useNavigate()

  const programs = {
    wellness: [
      {
        icon: <FaBrain />,
        title: 'Mental Health Drop-In',
        schedule: 'Weekly',
        price: 'Free',
        location: 'TBD',
        description: 'A safe, supportive space to connect, share, and grow together. Open conversations about mental wellness in a judgment-free environment. Starting after Pongal.',
        featured: true
      },
    ],
    sports: [
      {
        icon: <FaBasketball />,
        title: 'Basketball Drop-In',
        schedule: 'Weekly',
        price: '$15',
        location: 'Durham Region',
        description: '1.5 hours of play + 30 mins setup time. All skill levels welcome. Great way to stay active and meet fellow community members.',
        featured: true
      },
      {
        icon: <FaPersonRunning />,
        title: 'Indoor Sports On-Demand',
        schedule: 'Starting Jan 15',
        price: 'Varies',
        location: 'Multiple Locations',
        description: 'Have a sport your group wants to play? We organize based on community interest. Badminton, volleyball, table tennis, and more.',
        featured: false
      },
      {
        icon: <FaBaseballBatBall />,
        title: 'Summer Sports',
        schedule: 'Summer 2025',
        price: 'TBD',
        location: 'Outdoor Venues',
        description: 'Cricket and more outdoor activities coming this summer. Register your interest to help us plan.',
        featured: false
      },
    ],
    community: [
      {
        icon: <FaFilm />,
        title: 'Monthly Movie Watch Parties',
        schedule: 'Monthly',
        price: 'Members First',
        location: 'Various Theatres',
        description: 'Experience Thalapathy films together on the big screen. Members get priority access and best seats.',
        featured: true
      },
    ]
  }

  return (
    <>
      <SEO 
        title="Programs & Drop-In Activities | TVK Canada"
        description="Join TVK Canada's community programs: mental health support, sports drop-ins, movie nights, and more. Free and affordable activities for the whole family."
        keywords="TVK Canada programs, drop-in sports, mental health support, basketball, cricket, movie nights, community activities"
      />

      <PageHeader>
        <Container>
          <h1>Programs & Drop-In Activities</h1>
          <p>More than a fan club. A family that grows, supports, and serves together.</p>
        </Container>
      </PageHeader>

      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.background}>
        <Container>
          
          {/* Wellness Programs */}
          <CategorySection>
            <CategoryTitle><FaSpa /> Wellness & Mental Health</CategoryTitle>
            <Grid columns={1} gap={theme.spacing.xl}>
              {programs.wellness.map((program, idx) => (
                <ProgramCard key={idx} featured={program.featured}>
                  {program.featured && <FeaturedBadge><FaStar size={12} /> Featured</FeaturedBadge>}
                  <IconWrapper>{program.icon}</IconWrapper>
                  <h3>{program.title}</h3>
                  <div className="program-meta">
                    <span className="meta-tag"><MetaIcon><FaCalendarDays size={12} /></MetaIcon> {program.schedule}</span>
                    <span className="meta-tag price-tag"><MetaIcon><FaDollarSign size={12} /></MetaIcon> {program.price}</span>
                    <span className="meta-tag"><MetaIcon><FaLocationDot size={12} /></MetaIcon> {program.location}</span>
                  </div>
                  <p>{program.description}</p>
                  <Button variant="primary" onClick={() => navigate('/join')}>
                    Join to Get Updates
                  </Button>
                </ProgramCard>
              ))}
            </Grid>
          </CategorySection>

          {/* Sports Programs */}
          <CategorySection>
            <CategoryTitle><FaTrophy /> Sports & Recreation</CategoryTitle>
            <Grid columns={3} gap={theme.spacing.xl}>
              {programs.sports.map((program, idx) => (
                <ProgramCard key={idx} featured={program.featured}>
                  {program.featured && <FeaturedBadge><FaStar size={12} /> Featured</FeaturedBadge>}
                  <IconWrapper>{program.icon}</IconWrapper>
                  <h3>{program.title}</h3>
                  <div className="program-meta">
                    <span className="meta-tag"><MetaIcon><FaCalendarDays size={12} /></MetaIcon> {program.schedule}</span>
                    <span className="meta-tag price-tag"><MetaIcon><FaDollarSign size={12} /></MetaIcon> {program.price}</span>
                    <span className="meta-tag"><MetaIcon><FaLocationDot size={12} /></MetaIcon> {program.location}</span>
                  </div>
                  <p>{program.description}</p>
                  <Button variant="outline" onClick={() => navigate('/join')}>
                    Register Interest
                  </Button>
                </ProgramCard>
              ))}
            </Grid>
          </CategorySection>

          {/* Community Programs */}
          <CategorySection>
            <CategoryTitle><FaUsers /> Community & Entertainment</CategoryTitle>
            <Grid columns={1} gap={theme.spacing.xl}>
              {programs.community.map((program, idx) => (
                <ProgramCard key={idx} featured={program.featured}>
                  {program.featured && <FeaturedBadge><FaStar size={12} /> Featured</FeaturedBadge>}
                  <IconWrapper>{program.icon}</IconWrapper>
                  <h3>{program.title}</h3>
                  <div className="program-meta">
                    <span className="meta-tag"><MetaIcon><FaCalendarDays size={12} /></MetaIcon> {program.schedule}</span>
                    <span className="meta-tag price-tag"><MetaIcon><FaDollarSign size={12} /></MetaIcon> {program.price}</span>
                    <span className="meta-tag"><MetaIcon><FaLocationDot size={12} /></MetaIcon> {program.location}</span>
                  </div>
                  <p>{program.description}</p>
                  <Button variant="secondary" onClick={() => navigate('/join')}>
                    Become a Member
                  </Button>
                </ProgramCard>
              ))}
            </Grid>
          </CategorySection>

          {/* CTA Section */}
          <CTABox>
            <h3>Have a Program Idea?</h3>
            <p>
              We're building this community together. If you have a sport, activity, or program 
              you'd like to see, let us know! We organize based on what our members want.
            </p>
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
              Suggest a Program
            </Button>
          </CTABox>

        </Container>
      </Section>
    </>
  )
}
