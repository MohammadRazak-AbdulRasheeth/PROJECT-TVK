/**
 * About Us Page - Premium Design
 */

import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section, Grid } from '@components/Layout'

const Mission = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxxl};

  h2 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize['3xl']};
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
      font-size: ${theme.typography.fontSize['2xl']};
      margin-bottom: ${theme.spacing.md};
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: ${theme.typography.fontSize.xl};
      padding-bottom: ${theme.spacing.md};
    }
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    max-width: 900px;
    margin: 0 auto;
    line-height: ${theme.typography.lineHeight.relaxed};

    @media (max-width: ${theme.breakpoints.tablet}) {
      font-size: ${theme.typography.fontSize.base};
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: ${theme.typography.fontSize.sm};
    }
  }
`

const ValuesGrid = styled(Grid)`
  margin: ${theme.spacing.xxxl} 0;
`

const ValueCard = styled.div`
  background: linear-gradient(135deg, ${theme.colors.surface} 0%, #ffffff 100%);
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius['2xl']};
  border-top: 4px solid ${theme.colors.primary};
  text-align: center;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};
  position: relative;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bold;
    color: white;
    transition: all ${theme.transitions.base};
    box-shadow: ${theme.shadows.lg};
  }

  &:hover {
    transform: translateY(-12px) scale(1.03);
    box-shadow: ${theme.shadows.xl};
    border-top-color: ${theme.colors.secondary};

    &::before {
      transform: translateX(-50%) scale(1.15);
      box-shadow: ${theme.shadows.xl};
    }
  }

  &:active {
    transform: translateY(-6px) scale(1.01);
  }

  h3 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
    margin-top: ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    transition: color ${theme.transitions.base};
  }

  p {
    margin-bottom: 0;
    color: ${theme.colors.text.secondary};
    line-height: ${theme.typography.lineHeight.relaxed};
    transition: color ${theme.transitions.base};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    touch-action: manipulation;

    &:active {
      transform: scale(0.97);
      box-shadow: ${theme.shadows.md};
    }

    &::before {
      width: 40px;
      height: 40px;
    }
  }
`

const ActivitiesSection = styled.div`
  margin-top: ${theme.spacing.xxl};

  h3 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
  }
`

const ActivityItem = styled.div`
  background: linear-gradient(135deg, ${theme.colors.secondary}10 0%, transparent 100%);
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  border-left: 5px solid ${theme.colors.secondary};
  transition: all ${theme.transitions.base};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,215,0,0.08), transparent);
    transition: right ${theme.transitions.base};
  }

  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateX(8px);
    border-left-width: 7px;

    &::after {
      right: 100%;
    }
  }

  &:active {
    transform: translateX(4px);
    box-shadow: ${theme.shadows.sm};
  }

  h4 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
    font-weight: ${theme.typography.fontWeight.bold};
    transition: color ${theme.transitions.base};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: 0;
    transition: color ${theme.transitions.base};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    touch-action: manipulation;

    &:active {
      transform: scale(0.98);
      box-shadow: ${theme.shadows.sm};
    }

    &::after {
      display: none;
    }
  }
`;

const PhilosophyBox = styled.div`
  background: linear-gradient(135deg, ${theme.colors.secondary}20 0%, ${theme.colors.primary}10 100%);
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius['2xl']};
  text-align: center;
  border: 2px solid ${theme.colors.primary};
  box-shadow: ${theme.shadows.lg};

  h2 {
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.primary};
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.extrabold};
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    line-height: ${theme.typography.lineHeight.relaxed};
    margin: 0;
  }
`

/**
 * About Us Page Component - Premium Design
 */
export const AboutPage: React.FC = () => {
  return (
    <>
      {/* Who Are We Section */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.background}>
        <Container>
          <Mission>
            <h2>Who Are We</h2>
            <p>
              TVK Canada is the official fan club for Thalapathy Vijay in Canada, created to unite
              fans, families, and Tamil Canadians through celebration, culture, and community. We
              are a nonprofit organization built on passion, togetherness, and the shared
              admiration for Vijay's talent, discipline, and values.
            </p>
          </Mission>

          <Mission>
            <h2>Our Mission</h2>
            <p>
              Our mission is to bring people together through meaningful community building,
              memorable events, and a positive fan experience. We aim to create a welcoming space
              where supporters of Vijay can connect, celebrate, and enjoy being part of a vibrant
              Canadian fan community.
            </p>
          </Mission>
        </Container>
      </Section>

      {/* Core Values */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.surface}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.xxl, fontSize: theme.typography.fontSize['3xl'], color: theme.colors.primary, fontWeight: theme.typography.fontWeight.extrabold }}>
            Our Core Values
          </h2>
          <ValuesGrid columns={3}>
            <ValueCard>
              <h3>Unity</h3>
              <p>
                Forming strong bonds across cities and cultures, bringing people together with
                shared passion and purpose.
              </p>
            </ValueCard>

            <ValueCard>
              <h3>Democracy</h3>
              <p>
                Encouraging openness, equality, and fairness within our community. Every voice
                matters in our decision-making.
              </p>
            </ValueCard>

            <ValueCard>
              <h3>Respect</h3>
              <p>
                Treating everyone with kindness, dignity, and inclusiveness. We respect diverse
                perspectives and backgrounds.
              </p>
            </ValueCard>
          </ValuesGrid>
        </Container>
      </Section>

      {/* What We Do */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.background}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.xxl, fontSize: theme.typography.fontSize['3xl'], color: theme.colors.primary, fontWeight: theme.typography.fontWeight.extrabold }}>
            What We Do
          </h2>

          <Grid columns={2} gap={theme.spacing.xl}>
            <div>
              <ActivitiesSection>
                <ActivityItem>
                  <h4>Movie Nights</h4>
                  <p>
                    Enjoy Vijay's films together with fellow fans in a communal, family-friendly
                    setting.
                  </p>
                </ActivityItem>

                <ActivityItem>
                  <h4>Watch Parties</h4>
                  <p>
                    Experience major releases and special moments together as a community.
                  </p>
                </ActivityItem>
              </ActivitiesSection>
            </div>

            <div>
              <ActivitiesSection>
                <ActivityItem>
                  <h4>Weekly Meetups</h4>
                  <p>
                    Build friendships and community spirit through regular gatherings.
                  </p>
                </ActivityItem>

                <ActivityItem>
                  <h4>Cultural Gatherings</h4>
                  <p>
                    Celebrate Tamil culture through festivals, celebrations, and community events.
                  </p>
                </ActivityItem>
              </ActivitiesSection>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Community Philosophy */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.surface}>
        <Container>
          <PhilosophyBox>
            <h2>More Than a Fan Club</h2>
            <p>
              We are a joyful and growing Canadian community brought together by our love and
              admiration for Thalapathy Vijay. More than just followers, we are a family united by
              shared values, passion for culture, and commitment to meaningful community building.
            </p>
          </PhilosophyBox>
        </Container>
      </Section>
    </>
  )
}
