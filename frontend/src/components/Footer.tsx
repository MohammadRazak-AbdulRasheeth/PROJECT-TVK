/**
 * Footer component with social links and contact info
 */

import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa6'

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
  flex-wrap: wrap;
`

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  border-radius: ${theme.borderRadius['2xl']};
  text-decoration: none;
  transition: all ${theme.transitions.base};
  font-size: 20px;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px) scale(1.1);
    border-color: ${theme.colors.secondary};
    background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary});
  }

  &:active {
    transform: scale(0.95);
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
          <p>
            <a href="/contact">Membership Card Inquiry</a>
          </p>
          <p>
            <a href="/contact">Partner with TVK Canada</a>
          </p>
        </FooterSection>

        <FooterSection>
          <h4>Contact Us</h4>
          <p>Email: contact@tvkcanada.family</p>
          <p>Phone: 613-666-6852</p>
          <p>Address: 203B - 2967 Dundas Street West</p>
          <p>Toronto, Ontario M6P 1Z2</p>
        </FooterSection>

        <FooterSection>
          <h4>Follow Us</h4>
          <SocialLinks>
            <SocialLink href="https://www.instagram.com/tvk.canada/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Follow us on Instagram">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="https://www.threads.com/@tvk.canada" target="_blank" rel="noopener noreferrer" title="Threads" aria-label="Follow us on Threads">
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>@</span>
            </SocialLink>
            <SocialLink href="https://www.facebook.com/profile.php?id=61572322798883" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Follow us on Facebook">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="https://www.tiktok.com/@tvk.canada" target="_blank" rel="noopener noreferrer" title="TikTok" aria-label="Follow us on TikTok">
              <FaTiktok />
            </SocialLink>
            <SocialLink href="http://www.youtube.com/@TamilagaVettriKazhagamCanada" target="_blank" rel="noopener noreferrer" title="YouTube" aria-label="Subscribe on YouTube">
              <FaYoutube />
            </SocialLink>
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
