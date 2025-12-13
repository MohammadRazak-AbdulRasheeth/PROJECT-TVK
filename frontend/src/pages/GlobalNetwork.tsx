/**
 * TVK Global Network Page
 * Showcasing Vijay fan groups across the world under the TVK brand
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section, Grid } from '@components/Layout'
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

const InstagramCard = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 4px solid ${theme.colors.primary};
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
  }

  .header {
    padding: ${theme.spacing.lg};
    background: linear-gradient(135deg, ${theme.colors.surface} 0%, #f8f9fa 100%);
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

    .instagram-handle {
      background: linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 75%, #FD1D1D 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: ${theme.typography.fontWeight.bold};
      font-size: 16px;
      margin-bottom: ${theme.spacing.md};
      display: block;
    }

    p {
      color: ${theme.colors.text.secondary};
      line-height: 1.6;
      margin: ${theme.spacing.sm} 0;
      font-size: 14px;
    }

    .stats {
      display: flex;
      gap: ${theme.spacing.md};
      margin-top: ${theme.spacing.md};
      padding: ${theme.spacing.sm} 0;
      border-top: 1px solid ${theme.colors.border};

      .stat {
        text-align: center;
        flex: 1;

        .number {
          display: block;
          color: ${theme.colors.primary};
          font-weight: ${theme.typography.fontWeight.bold};
          font-size: 16px;
        }

        .label {
          color: ${theme.colors.text.secondary};
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .header {
      padding: ${theme.spacing.md};
      .flag {
        width: 60px;
        height: 60px;
        min-width: 60px;
      }
    }
    .content {
      padding: ${theme.spacing.md};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .header {
      padding: ${theme.spacing.sm};
      gap: ${theme.spacing.sm};
      .flag {
        width: 50px;
        height: 50px;
        min-width: 50px;
      }
    }
    .content {
      padding: ${theme.spacing.sm};
    }
  }
`

/**
 * TVK Global Network Page Component
 */
export const GlobalNetworkPage: React.FC = () => {
  const navigate = useNavigate()

  const handleJoinClick = () => {
    navigate('/membership')
  }

  // Instagram data for TVK groups worldwide
  const instagramGroups = [
    {
      id: 1,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/ca.svg',
      countryCode: 'CA',
      name: 'TVK Canada - Ottawa, ON',
      region: 'Canada (Ottawa, ON)',
      instagramHandle: '@tvkcanada_official',
      instagramUrl: 'https://instagram.com/tvkcanada_official',
      description: 'Official Canadian chapter based in Ottawa, ON. Follow for updates on community events, charity work, and fan activities.',
      followers: '2.5K',
      posts: '180'
    },
    {
      id: 2,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/in.svg',
      countryCode: 'IN',
      name: 'Vijay Makkal Mandram',
      region: 'India - Tamil Nadu',
      instagramHandle: '@vijay_makkal_mandram',
      instagramUrl: 'https://instagram.com/vijay_makkal_mandram',
      description: 'The original TVK network in Tamil Nadu. Follow for movie updates, community events, and fan celebrations.',
      followers: '500K+',
      posts: '1.2K+'
    },
    {
      id: 3,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/us.svg',
      countryCode: 'US',
      name: 'USA Vijay Fans',
      region: 'United States',
      instagramHandle: '@vijay_fans_usa',
      instagramUrl: 'https://instagram.com/vijay_fans_usa',
      description: 'Connect with Vijay fans across American cities. Events in Dallas, California, Chicago, and New Jersey.',
      followers: '15K+',
      posts: '400+'
    },
    {
      id: 4,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/gb.svg',
      countryCode: 'GB',
      name: 'UK Vijay Fans Network',
      region: 'United Kingdom',
      instagramHandle: '@uk_vijay_fans',
      instagramUrl: 'https://instagram.com/uk_vijay_fans',
      description: 'London and UK-wide Vijay fan community. Follow for screenings, meetups, and cultural events.',
      followers: '8K+',
      posts: '250+'
    },
    {
      id: 5,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/au.svg',
      countryCode: 'AU',
      name: 'Australia Vijay Fans',
      region: 'Australia',
      instagramHandle: '@australia_vijay_fans',
      instagramUrl: 'https://instagram.com/australia_vijay_fans',
      description: 'Sydney, Melbourne, Brisbane fan community. Follow for Aussie Vijay events and celebrations.',
      followers: '12K+',
      posts: '350+'
    },
    {
      id: 6,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/ae.svg',
      countryCode: 'AE',
      name: 'UAE & Middle East Vijay Fans',
      region: 'UAE & Middle East',
      instagramHandle: '@uae_vijay_fans',
      instagramUrl: 'https://instagram.com/uae_vijay_fans',
      description: 'Dubai, UAE, and Middle East Vijay fan network. Follow for massive celebrations and fan events.',
      followers: '25K+',
      posts: '600+'
    },
    {
      id: 7,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/my.svg',
      countryCode: 'MY',
      name: 'Malaysia Vijay Fans',
      region: 'Malaysia',
      instagramHandle: '@malaysia_vijay_fans',
      instagramUrl: 'https://instagram.com/malaysia_vijay_fans',
      description: 'Malaysian Vijay fan community. Follow for stadium-level celebrations and charity events.',
      followers: '30K+',
      posts: '750+'
    },
    {
      id: 8,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/sg.svg',
      countryCode: 'SG',
      name: 'Singapore Vijay FC',
      region: 'Singapore',
      instagramHandle: '@singapore_vijay_fc',
      instagramUrl: 'https://instagram.com/singapore_vijay_fc',
      description: 'Singapore Vijay fan club. Follow for professional events, screenings, and community programs.',
      followers: '7K+',
      posts: '200+'
    },
    {
      id: 9,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/lk.svg',
      countryCode: 'LK',
      name: 'Sri Lanka Vijay Fans',
      region: 'Sri Lanka',
      instagramHandle: '@srilanka_vijay_fans',
      instagramUrl: 'https://instagram.com/srilanka_vijay_fans',
      description: 'Sri Lankan Vijay fan community. Follow for screenings, youth activities, and community unity.',
      followers: '20K+',
      posts: '500+'
    },
    {
      id: 10,
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.14.0/flags/4x3/fr.svg',
      countryCode: 'FR',
      name: 'France & Europe Vijay Fans',
      region: 'France & Europe',
      instagramHandle: '@europe_vijay_fans',
      instagramUrl: 'https://instagram.com/europe_vijay_fans',
      description: 'European Vijay fan network. Follow for street celebrations, meetups, and cultural events.',
      followers: '5K+',
      posts: '150+'
    }
  ]

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

      {/* Instagram Groups Section */}
      <Section padding={`${theme.spacing.xxxl} 0`}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.lg, color: theme.colors.primary, fontSize: theme.typography.fontSize['3xl'] }}>
            Follow Our Global Instagram Community
          </h2>
          <p
            style={{
              textAlign: 'center',
              marginBottom: theme.spacing.xxxl,
              color: theme.colors.text.secondary,
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}
          >
            Stay connected with TVK fan groups around the world. Follow their Instagram pages for the latest updates, event photos, and community highlights.
          </p>
          <Grid columns={3} gap={theme.spacing.xl}>
            {instagramGroups.map((group) => (
              <InstagramCard
                key={group.id}
                onClick={() => window.open(group.instagramUrl, '_blank')}
              >
                <div className="header">
                  <div
                    className="flag"
                    style={{
                      backgroundImage: `url(${group.flag})`,
                    }}
                  />
                  <div className="header-content">
                    <h3>{group.name}</h3>
                    <p className="region">{group.region}</p>
                  </div>
                </div>
                <div className="content">
                  <span className="instagram-handle">{group.instagramHandle}</span>
                  <p>{group.description}</p>
                  <div className="stats">
                    <div className="stat">
                      <span className="number">{group.followers}</span>
                      <span className="label">Followers</span>
                    </div>
                    <div className="stat">
                      <span className="number">{group.posts}</span>
                      <span className="label">Posts</span>
                    </div>
                  </div>
                </div>
              </InstagramCard>
            ))}
          </Grid>
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
              <Button variant="secondary" onClick={handleJoinClick}>Join TVK Canada</Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('https://instagram.com/tvkcanada_official', '_blank')}
                style={{ background: 'transparent', borderColor: theme.colors.secondary, color: theme.colors.secondary }}
              >
                Follow on Instagram
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
