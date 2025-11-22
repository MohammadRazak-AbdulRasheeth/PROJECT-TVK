/**
 * TVK Global Network Page
 * Showcasing Vijay fan groups across the world under the TVK brand
 */

import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section, Grid } from '@components/Layout'
import { Button } from '@components/Button'

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

const GroupCard = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 4px solid ${theme.colors.primary};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
  }

  .header {
    padding: ${theme.spacing.lg};
    background: ${theme.colors.surface};
    border-bottom: 1px solid ${theme.colors.border};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: ${theme.spacing.lg};

    .flag {
      width: 80px;
      height: 80px;
      min-width: 80px;
      border-radius: ${theme.borderRadius.lg};
      position: relative;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .header-content {
      flex: 1;

      h3 {
        color: ${theme.colors.primary};
        margin: 0 0 ${theme.spacing.xs} 0;
        font-size: 18px;
      }

      .region {
        color: ${theme.colors.text.secondary};
        font-size: 14px;
        margin: 0;
      }
    }
  }

  .content {
    padding: ${theme.spacing.lg};

    p {
      color: ${theme.colors.text.secondary};
      line-height: 1.6;
      margin: ${theme.spacing.sm} 0;
      font-size: 14px;
    }

    strong {
      color: ${theme.colors.primary};
      display: block;
      margin-top: ${theme.spacing.md};
      margin-bottom: ${theme.spacing.sm};
    }

    .hashtags {
      color: ${theme.colors.primary};
      font-size: 13px;
      margin-top: ${theme.spacing.md};
      font-weight: ${theme.typography.fontWeight.semibold};
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .header {
      padding: ${theme.spacing.md};
      .flag {
        font-size: 36px;
        margin-bottom: ${theme.spacing.sm};
      }
    }
    .content {
      padding: ${theme.spacing.md};
    }
  }
`

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
  text-align: center;

  .value {
    padding: ${theme.spacing.lg};
    background: ${theme.colors.surface};
    border-radius: ${theme.borderRadius.lg};
    border-left: 4px solid ${theme.colors.secondary};

    h4 {
      color: ${theme.colors.primary};
      margin-bottom: ${theme.spacing.sm};
      font-size: 16px;
    }

    p {
      color: ${theme.colors.text.secondary};
      font-size: 14px;
      margin: 0;
      line-height: 1.5;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.md};

    .value {
      padding: ${theme.spacing.md};
    }
  }
`

/**
 * TVK Global Network Page Component
 */
export const GlobalNetworkPage: React.FC = () => {
  const globalGroups = [
    {
      id: 1,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/in.svg',
      countryCode: 'IN',
      name: 'Vijay Makkal Mandram',
      region: 'India – Tamil Nadu',
      description:
        'The original and largest TVK-aligned fan network, active in community events, volunteer programs, and massive fan celebrations.',
      known_for: 'Community events, Volunteer programs, Large-scale celebrations',
      hashtags: '#VijayMakkalMandram #TMM #TamilPride',
    },
    {
      id: 2,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/lk.svg',
      countryCode: 'LK',
      name: 'Sri Lanka Vijay Fans',
      region: 'Sri Lanka',
      description:
        'Organized screenings, youth activities, and strong community unity. One of the most loyal overseas Vijay fan bases.',
      known_for: 'Screenings, Youth programs, Community unity',
      hashtags: '#SriLankaVijayFans #VijayLove #SLFans',
    },
    {
      id: 3,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/my.svg',
      countryCode: 'MY',
      name: 'Malaysia Vijay Fans',
      region: 'Malaysia',
      description: 'Huge fan following with stadium-level celebrations during major movie releases. Highly active in charity and cultural events.',
      known_for: 'Stadium-level celebrations, Charity events, Cultural programs',
      hashtags: '#MalaysiaVijayFans #VijayPride #AkKami',
    },
    {
      id: 4,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/sg.svg',
      countryCode: 'SG',
      name: 'Singapore Vijay FC',
      region: 'Singapore',
      description: 'Professional, disciplined, and well-respected. Organizes screenings, community meetups, and youth programs.',
      known_for: 'Professional events, Screenings, Youth programs',
      hashtags: '#SingaporeVijayFC #VijayFans #SGPride',
    },
    {
      id: 5,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/gb.svg',
      countryCode: 'GB',
      name: 'UK Vijay Fans Network',
      region: 'United Kingdom',
      description: 'A growing group active in London and other major cities, known for elegant celebrations and culturally rich events.',
      known_for: 'Elegant celebrations, Cultural events, Community meetups',
      hashtags: '#UKVijayFans #LondonFans #VijayInUK',
    },
    {
      id: 6,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/us.svg',
      countryCode: 'US',
      name: 'USA Vijay Fans Groups',
      region: 'USA (Dallas, New Jersey, California, Chicago)',
      description: 'Strong fan groups across major cities regularly hosting screenings and large family events.',
      known_for: 'Family events, Large-scale screenings, Community celebrations',
      hashtags: '#USAVijayFans #AmericaFans #VijayLove',
    },
    {
      id: 7,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/au.svg',
      countryCode: 'AU',
      name: 'Australia Vijay Fans Association',
      region: 'Australia (Sydney, Melbourne, Brisbane)',
      description: 'Active in sports-themed events, cultural days, and big movie celebrations.',
      known_for: 'Sports events, Cultural days, Movie celebrations',
      hashtags: '#AustraliaVijayFans #AussieVijay #VijayDown Under',
    },
    {
      id: 8,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/ae.svg',
      countryCode: 'AE',
      name: 'UAE & Middle East Vijay Fans',
      region: 'UAE, Saudi, Kuwait, Qatar',
      description: 'One of the most energetic fan bases outside India, known for creative displays, massive cutouts, and group celebrations.',
      known_for: 'Creative displays, Massive celebrations, Community events',
      hashtags: '#UAEVijayFans #MiddleEastLove #VijayPride',
    },
    {
      id: 9,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/fr.svg',
      countryCode: 'FR',
      name: 'France Vijay Fans Club',
      region: 'France & Europe',
      description: 'A passionate European community known for street celebrations, meetups, and screenings.',
      known_for: 'Street celebrations, Meetups, Screenings',
      hashtags: '#FranceVijayFans #EuropeFans #VijayInEurope',
    },
    {
      id: 10,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/za.svg',
      countryCode: 'ZA',
      name: 'South Africa Vijay Supporters',
      region: 'South Africa',
      description: 'A growing fan community hosting local screenings and cultural nights.',
      known_for: 'Screenings, Cultural events, Community building',
      hashtags: '#SAVijayFans #AfricaPride #VijayLove',
    },
    {
      id: 11,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/nz.svg',
      countryCode: 'NZ',
      name: 'New Zealand Vijay Fans',
      region: 'New Zealand',
      description: 'Growing community of Vijay supporters organizing meetups and cultural celebrations.',
      known_for: 'Community meetups, Cultural celebrations',
      hashtags: '#NZVijayFans #KiwiVijay #AotearoaFans',
    },
    {
      id: 12,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/ca.svg',
      countryCode: 'CA',
      name: 'TVK Canada',
      region: 'Canada',
      description:
        'The official Canadian fan community of Thalapathy Vijay, bringing people together through meaningful community building and memorable events.',
      known_for: 'Community events, Nationwide meetups, Family-friendly activities',
      hashtags: '#TVKCanada #VijayCanada #CanadianFans',
    },
  ]

  const globalValues = [
    { title: 'Unity', description: 'Forming strong bonds across cities and cultures' },
    { title: 'Respect', description: 'Treating everyone with kindness and dignity' },
    { title: 'Community', description: 'Building meaningful connections together' },
    { title: 'Culture', description: 'Celebrating Tamil heritage and values' },
    { title: 'Positivity', description: 'Spreading joy and inspiration' },
    { title: 'Brotherhood', description: 'United as one global TVK family' },
  ]

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <h1>TVK Around the World</h1>
          <p>
            Proudly showcasing TVK fan groups that represent Thalapathy Vijay and support the global TVK brand across continents.
          </p>
        </Container>
      </HeroSection>

      {/* Global Groups Section */}
      <Section padding={`${theme.spacing.xxxl} 0`}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>Featured Global Groups</h2>
          <p
            style={{
              textAlign: 'center',
              marginBottom: theme.spacing.xxxl,
              color: theme.colors.text.secondary,
              fontSize: '16px',
            }}
          >
            From India to Australia, from USA to Europe – the TVK family spans continents. Here are the vibrant communities keeping Vijay's spirit alive worldwide.
          </p>
          <Grid columns={3} gap={theme.spacing.lg}>
            {globalGroups.map((group) => (
              <GroupCard key={group.id}>
                <div className="header">
                  <div 
                    className="flag" 
                    style={{
                      backgroundImage: `url('${group.flag}')`,
                    }}
                    title={group.countryCode}
                  />
                  <div className="header-content">
                    <h3>{group.name}</h3>
                    <p className="region">{group.region}</p>
                  </div>
                </div>
                <div className="content">
                  <p>{group.description}</p>
                  <strong>Known For:</strong>
                  <p>{group.known_for}</p>
                  <div className="hashtags">{group.hashtags}</div>
                </div>
              </GroupCard>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Global Values Section */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.surface}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.xxxl }}>TVK Global Family Values</h2>
          <ValuesGrid>
            {globalValues.map((value, idx) => (
              <div key={idx} className="value">
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </ValuesGrid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding={`${theme.spacing.xxxl} 0`}>
        <Container>
          <div
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #a01829 100%)`,
              color: theme.colors.text.inverse,
              padding: theme.spacing.xl,
              borderRadius: theme.borderRadius['2xl'],
              textAlign: 'center',
            }}
          >
            <h2 style={{ marginBottom: theme.spacing.lg }}>TVK is Global. Be Part of It.</h2>
            <p style={{ marginBottom: theme.spacing.lg, fontSize: '16px' }}>
              Join the largest fan network celebrating Thalapathy Vijay across the world.
            </p>
            <Button variant="secondary">Join TVK Canada</Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
