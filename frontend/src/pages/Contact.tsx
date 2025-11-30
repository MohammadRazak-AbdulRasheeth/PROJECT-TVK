/**
 * Contact Us Page (stub)
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section, Grid, Flex } from '@components/Layout'
import { Button } from '@components/Button'
import { FaXTwitter, FaInstagram, FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { FaWhatsapp, FaMapLocationDot, FaEnvelope } from 'react-icons/fa6'
import { contactService } from '../services/api'

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const SocialIconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  border-radius: ${theme.borderRadius['2xl']};
  text-decoration: none;
  transition: all ${theme.transitions.base};
  box-shadow: ${theme.shadows.md};
  font-size: 28px;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px) scale(1.1);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.secondary};
    background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary});
  }

  &:active {
    transform: scale(0.95);
    box-shadow: ${theme.shadows.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    font-size: 24px;

    &:active {
      transform: scale(0.9);
    }
  }
`

const ContactInfoItem = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  align-items: flex-start;
  padding: ${theme.spacing.md};
  background: linear-gradient(135deg, ${theme.colors.surface} 0%, #fafafa 100%);
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${theme.colors.secondary};
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateX(8px);
    box-shadow: ${theme.shadows.md};
    border-left-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.md};
  }
`

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  border-radius: ${theme.borderRadius.lg};
  font-size: 24px;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }
`

const ContactDetails = styled.div`
  flex: 1;

  h4 {
    color: ${theme.colors.primary};
    margin: 0 0 ${theme.spacing.sm} 0;
    font-weight: ${theme.typography.fontWeight.bold};
  }

  p, a {
    margin: 0;
    color: ${theme.colors.text.secondary};
    text-decoration: none;
    font-size: ${theme.typography.fontSize.base};
    transition: color ${theme.transitions.base};

    &:hover {
      color: ${theme.colors.primary};
      text-decoration: underline;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    h4 {
      font-size: ${theme.typography.fontSize.sm};
    }

    p, a {
      font-size: ${theme.typography.fontSize.sm};
    }
  }
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
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      city: formData.get('city'),
      type: formData.get('subject'),
      message: formData.get('message')
    }
    
    try {
      await contactService.submitForm(data)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Failed to submit form:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
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
              <ContactInfoItem>
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <ContactDetails>
                  <h4>Email</h4>
                  <a href="mailto:contact@tvkcanada.family">contact@tvkcanada.family</a>
                </ContactDetails>
              </ContactInfoItem>
              <ContactInfoItem>
                <ContactIcon>
                  <FaWhatsapp />
                </ContactIcon>
                <ContactDetails>
                  <h4>WhatsApp</h4>
                  <a href="https://wa.me/1234567890">Contact via WhatsApp</a>
                </ContactDetails>
              </ContactInfoItem>
              <ContactInfoItem>
                <ContactIcon>
                  <FaMapLocationDot />
                </ContactIcon>
                <ContactDetails>
                  <h4>Location</h4>
                  <p>Canada-wide</p>
                </ContactDetails>
              </ContactInfoItem>
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

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message'}
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
            <SocialIconLink href="https://twitter.com/TVKCanada" target="_blank" rel="noopener noreferrer" title="Twitter">
              <FaXTwitter />
            </SocialIconLink>
            <SocialIconLink href="https://www.instagram.com/tvk.canada/" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink href="https://www.threads.com/@tvk.canada" target="_blank" rel="noopener noreferrer" title="Threads">
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>@</span>
            </SocialIconLink>
            <SocialIconLink href="https://www.facebook.com/profile.php?id=61572322798883" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebook />
            </SocialIconLink>
            <SocialIconLink href="https://www.tiktok.com/@tvk.canada" target="_blank" rel="noopener noreferrer" title="TikTok">
              <FaTiktok />
            </SocialIconLink>
            <SocialIconLink href="http://www.youtube.com/@TamilagaVettriKazhagamCanada" target="_blank" rel="noopener noreferrer" title="YouTube">
              <FaYoutube />
            </SocialIconLink>
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
