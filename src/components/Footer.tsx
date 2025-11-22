/**
 * Footer component with social links and contact info
 */

import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: ${theme.colors.text.inverse};
  padding: ${theme.spacing.xxxl} ${theme.spacing.lg};
  margin-top: ${theme.spacing.xxxl};
  border-top: 3px solid ${theme.colors.secondary};
`

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const FooterSection = styled.div`
  h4 {
    color: ${theme.colors.secondary};
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.lg};
  }

  p, a {
    font-size: ${theme.typography.fontSize.sm};
    line-height: ${theme.typography.lineHeight.relaxed};
    color: #cccccc;

    &:hover {
      color: ${theme.colors.secondary};
    }
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.full};
    transition: all ${theme.transitions.base};

    &:hover {
      background-color: ${theme.colors.secondary};
      transform: translateY(-2px);
    }
  }
`

const FooterBottom = styled.div`
  max-width: 1280px;
  margin: ${theme.spacing.xxxl} auto 0;
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: ${theme.typography.fontSize.sm};
  color: #999999;
`

/**
 * Footer Component
 */
export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <h4>About TVK Canada</h4>
          <p>
            We are a fan club and nonprofit association dedicated to uniting Thalapathy Vijay
            supporters across Canada.
          </p>
        </FooterSection>

        <FooterSection>
          <h4>Quick Links</h4>
          <p>
            <a href="/">Home</a>
          </p>
          <p>
            <a href="/about">About Us</a>
          </p>
          <p>
            <a href="/membership">Membership</a>
          </p>
          <p>
            <a href="/events">Events</a>
          </p>
        </FooterSection>

        <FooterSection>
          <h4>Contact Us</h4>
          <p>Email: tvk.canada@gmail.com</p>
          <p>WhatsApp: Contact via WhatsApp</p>
          <p>Location: Canada</p>
        </FooterSection>

        <FooterSection>
          <h4>Follow Us</h4>
          <SocialLinks>
            <a href="https://twitter.com" title="Twitter" aria-label="Follow us on Twitter">
              𝕏
            </a>
            <a href="https://instagram.com" title="Instagram" aria-label="Follow us on Instagram">
              📷
            </a>
            <a href="https://facebook.com" title="Facebook" aria-label="Follow us on Facebook">
              f
            </a>
            <a href="https://tiktok.com" title="TikTok" aria-label="Follow us on TikTok">
              🎵
            </a>
            <a href="https://youtube.com" title="YouTube" aria-label="Subscribe on YouTube">
              ▶️
            </a>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>
          © {new Date().getFullYear()} TVK Canada - The Voice of Vijay Fans in Canada. All rights
          reserved.
        </p>
      </FooterBottom>
    </FooterWrapper>
  )
}
