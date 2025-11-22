/**
 * Contact Us Page (stub)
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section, Grid, Flex } from '@components/Layout'
import { Button } from '@components/Button'

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  label {
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    font-size: ${theme.typography.fontSize.base};
  }

  input,
  textarea,
  select {
    padding: ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.base};
    min-height: 44px;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    input,
    textarea,
    select {
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      font-size: ${theme.typography.fontSize.sm};
    }

    label {
      font-size: ${theme.typography.fontSize.sm};
    }

    textarea {
      min-height: 100px;
    }
  }
`

/**
 * Contact Us Page Component
 */
export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.surface}>
        <Container>
          <h1 style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>Contact Us</h1>
          <p
            style={{
              textAlign: 'center',
              marginBottom: theme.spacing.xxl,
              fontSize: '18px',
              color: theme.colors.text.secondary,
            }}
          >
            Have questions? We'd love to hear from you. Get in touch with the TVK Canada team.
          </p>

          <Grid columns={2} gap={theme.spacing.xl}>
            <div>
              <h3 style={{ marginBottom: theme.spacing.lg }}>Get in Touch</h3>
              <div style={{ marginBottom: theme.spacing.lg }}>
                <h4 style={{ color: theme.colors.primary, marginBottom: theme.spacing.sm }}>
                  📧 Email
                </h4>
                <p style={{ margin: 0 }}>
                  <a href="mailto:tvk.canada@gmail.com">tvk.canada@gmail.com</a>
                </p>
              </div>
              <div style={{ marginBottom: theme.spacing.lg }}>
                <h4 style={{ color: theme.colors.primary, marginBottom: theme.spacing.sm }}>
                  📱 WhatsApp
                </h4>
                <p style={{ margin: 0 }}>
                  <a href="https://wa.me/1234567890">Contact via WhatsApp</a>
                </p>
              </div>
              <div>
                <h4 style={{ color: theme.colors.primary, marginBottom: theme.spacing.sm }}>
                  📍 Location
                </h4>
                <p style={{ margin: 0 }}>Canada-wide</p>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: theme.spacing.lg }}>Send us a Message</h3>
              <ContactForm onSubmit={handleSubmit}>
                <FormGroup>
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" required />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="phone">Phone Number (Optional)</label>
                  <input type="tel" id="phone" name="phone" />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="city">City (Optional)</label>
                  <input type="text" id="city" name="city" placeholder="e.g., Toronto, Vancouver, Montreal" />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="subject">Subject *</label>
                  <select id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="membership">Membership Registration</option>
                    <option value="card">Membership Card Inquiry</option>
                    <option value="events">Event Information</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="partnership">Corporate Partnership</option>
                    <option value="media">Media/Press</option>
                    <option value="other">Other</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" required></textarea>
                </FormGroup>

                <Button variant="primary" type="submit">
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </Button>

                {submitted && (
                  <p
                    style={{
                      color: theme.colors.success,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}
                  >
                    Thank you for reaching out. Our team will get back to you within 24–48 hours.
                  </p>
                )}
              </ContactForm>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Social Media Links */}
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.surface}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>Follow Us Online</h2>
          <p style={{ textAlign: 'center', marginBottom: theme.spacing.xxxl, color: theme.colors.text.secondary }}>
            Stay updated with events, announcements, and community highlights.
          </p>
          <Flex gap={theme.spacing.lg} justify="center" style={{ flexWrap: 'wrap' }}>
            <a href="https://twitter.com/TVKCanada" target="_blank" rel="noopener noreferrer">
              𝕏 Twitter
            </a>
            <a href="https://instagram.com/TVKCanada" target="_blank" rel="noopener noreferrer">
              📷 Instagram
            </a>
            <a href="https://facebook.com/TVKCanadaOfficial" target="_blank" rel="noopener noreferrer">
              👍 Facebook
            </a>
            <a href="https://tiktok.com/@TVKCanada" target="_blank" rel="noopener noreferrer">
              🎵 TikTok
            </a>
            <a href="https://youtube.com/@TVKCanada" target="_blank" rel="noopener noreferrer">
              ▶️ YouTube
            </a>
          </Flex>
        </Container>
      </Section>

      {/* Corporate Partnership */}
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
            <h2 style={{ marginBottom: theme.spacing.lg }}>Corporate Partners & Business Sponsors</h2>
            <p style={{ marginBottom: theme.spacing.lg, fontSize: '16px', lineHeight: '1.6' }}>
              TVK Canada proudly collaborates with Canadian businesses to offer exclusive discounts, perks, and event benefits to our members.
              <br /><br />
              If you're a business looking to offer discounts to TVK members, sponsor a movie night or community event, provide giveaways or product samples, or become an official TVK Corporate Partner – we'd love to work with you!
              <br /><br />
              <em>Corporate partners gain visibility across our Canada-wide network, event promotions, social media spotlights, and special recognition within our membership community.</em>
            </p>
            <Button variant="secondary">Become a Corporate Partner</Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
