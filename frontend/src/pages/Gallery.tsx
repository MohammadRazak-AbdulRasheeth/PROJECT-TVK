/**
 * Gallery Page - Premium Design
 */

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { getGalleryImages } from '@utils/images'
import { Container, Section, Grid } from '@components/Layout'

const GalleryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};
  border: 2px solid transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background: linear-gradient(135deg, ${theme.colors.surface} 0%, #f0f0f0 100%);

  &:hover {
    transform: scale(1.08) rotate(0.5deg);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.secondary};
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(1.04);
  }

  &[data-placeholder="true"] {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
    background: linear-gradient(135deg, ${theme.colors.primary}20 0%, ${theme.colors.secondary}20 100%);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 250px;

    &:active {
      transform: scale(1.06);
      box-shadow: ${theme.shadows.lg};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 200px;
    touch-action: manipulation;

    &:active {
      transform: scale(1.03);
      box-shadow: ${theme.shadows.md};
      filter: brightness(1.05);
    }
  }
`

const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxxl};

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    color: ${theme.colors.primary};
    font-weight: ${theme.typography.fontWeight.extrabold};
    margin-bottom: ${theme.spacing.lg};
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
      margin-bottom: ${theme.spacing.md};
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: ${theme.typography.fontSize['2xl']};
      padding-bottom: ${theme.spacing.md};
    }
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    max-width: 600px;
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

export const GalleryPage: React.FC = () => {
  const galleryImages = getGalleryImages()

  // SEO optimization
  useEffect(() => {
    document.title = 'TVK Canada Photo Gallery - Vijay Fan Events & Memories'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse TVK Canada\'s photo gallery featuring Thalapathy Vijay fan events, movie celebrations, and community gatherings.')
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'TVK Canada photos, Vijay fan events gallery, Thalapathy celebrations, Tamil community photos Canada')
    }
  }, [])

  return (
    <>
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.background}>
        <Container>
          <GalleryHeader>
            <h1>TVK Canada Gallery</h1>
            <p>
              Moments from our community celebrations and events across Canada. See the vibrant spirit of TVK!
            </p>
          </GalleryHeader>

          <Grid columns={3} gap={theme.spacing.lg}>
            {galleryImages.map((imgSrc, idx) => (
              <GalleryImage key={idx} src={imgSrc} alt={`Gallery moment ${idx + 1}`} loading="lazy" />
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  )
}
