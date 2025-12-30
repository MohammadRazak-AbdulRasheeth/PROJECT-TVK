/**
 * FAQ Page
 */

import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { Container, Section } from '@components/Layout'
import { SEO } from '@components/SEO'

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const FAQItem = styled.details`
  margin-bottom: ${theme.spacing.lg};
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  border: 2px solid ${theme.colors.border};
  cursor: pointer;
  transition: all ${theme.transitions.base};

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }

  &[open] {
    border-color: ${theme.colors.secondary};
    box-shadow: ${theme.shadows.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`

const FAQSummary = styled.summary`
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.sm};
  list-style: none;
  position: relative;
  padding-right: ${theme.spacing.lg};

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: '+';
    position: absolute;
    right: 0;
    top: 0;
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.secondary};
    transition: transform ${theme.transitions.base};
  }

  details[open] &::after {
    transform: rotate(45deg);
  }

  &:hover {
    color: ${theme.colors.secondary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.base};
  }
`

const FAQAnswer = styled.div`
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};

  p {
    margin-bottom: ${theme.spacing.sm};
  }

  ul {
    margin-left: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.sm};
  }

  li {
    margin-bottom: ${theme.spacing.xs};
  }
`

const CategorySection = styled.div`
  margin-bottom: ${theme.spacing.xxxl};

  h2 {
    color: ${theme.colors.primary};
    text-align: center;
    margin-bottom: ${theme.spacing.xl};
    font-size: ${theme.typography.fontSize['2xl']};
    
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background: ${theme.colors.secondary};
      margin: ${theme.spacing.md} auto 0;
      border-radius: ${theme.borderRadius.sm};
    }
  }
`

/**
 * FAQ Page Component
 */
export const FAQPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Frequently Asked Questions - TVK Canada"
        description="Get answers to common questions about TVK Canada membership, events, and community activities."
        keywords="TVK Canada FAQ, Thalapathy Vijay fan club questions, membership FAQ, events FAQ, Tamil community Canada"
        canonicalUrl="https://tvkcanada.family/faq"
      />
      
      <Section padding={`${theme.spacing.xxxl} 0`} background={theme.colors.surface}>
        <Container>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: theme.spacing.lg,
            fontSize: theme.typography.fontSize['4xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.primary
          }}>
            Frequently Asked Questions (FAQ)
          </h1>
          <p style={{
            textAlign: 'center',
            marginBottom: theme.spacing.xxxl,
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.text.secondary,
            maxWidth: '600px',
            margin: `0 auto ${theme.spacing.xxxl} auto`
          }}>
            Find answers to common questions about TVK Canada membership, events, and community activities.
          </p>
        </Container>
      </Section>

      {/* General Questions */}
      <Section padding={`${theme.spacing.xxxl} 0`}>
        <Container>
          <FAQContainer>
            <CategorySection>
              <h2>General Information</h2>
              
              <FAQItem>
                <FAQSummary>What is TVK Canada?</FAQSummary>
                <FAQAnswer>
                  <p>TVK Canada (Tamizhaga Vetri Kazhagam Canada) is the official Thalapathy Vijay fan club for Canada. We're a membership-driven nonprofit organization dedicated to recreation, empowerment, and giving back to the Tamil community across Canada.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Who can join TVK Canada?</FAQSummary>
                <FAQAnswer>
                  <p>Anyone who is a fan of Thalapathy Vijay and shares our values of community, empowerment, and cultural celebration can join. Members must be residents of Canada or have strong ties to the Canadian Tamil community.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>How is TVK Canada organized?</FAQSummary>
                <FAQAnswer>
                  <p>We operate as a decentralized network with local chapters across major Canadian cities including:</p>
                  <ul>
                    <li>Toronto & GTA (Greater Toronto Area)</li>
                    <li>Vancouver & Lower Mainland</li>
                    <li>Calgary & Edmonton</li>
                    <li>Montreal & Quebec</li>
                    <li>Other major cities with Tamil communities</li>
                  </ul>
                </FAQAnswer>
              </FAQItem>
            </CategorySection>

            <CategorySection>
              <h2>Community Membership</h2>
              
              <FAQItem>
                <FAQSummary>Is it free to join TVK Canada?</FAQSummary>
                <FAQAnswer>
                  <p><strong>Yes! Joining TVK Canada is completely free.</strong> We're a community-first organization focused on wellness, mental health, sports, and growth. No payment is required to become a community member.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Is membership currently open?</FAQSummary>
                <FAQAnswer>
                  <p><strong>Yes! Community membership is now open.</strong> We're welcoming new members and building our family across Canada. Join today to be part of the TVK Canada community.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>What benefits do community members get?</FAQSummary>
                <FAQAnswer>
                  <p>TVK Canada community members enjoy:</p>
                  <ul>
                    <li>Updates on programs and events</li>
                    <li>Early access to drop-in registrations</li>
                    <li>Priority booking for movie nights</li>
                    <li>Community newsletter</li>
                    <li>Networking with Tamil community members across Canada</li>
                    <li>Future member perks and discounts</li>
                  </ul>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Are there any paid programs?</FAQSummary>
                <FAQAnswer>
                  <p>Some drop-in programs have a small fee to cover venue costs (e.g., Basketball Drop-In is $15 per session). However, many programs like Mental Health Drop-In are completely free. Check the Programs page for specific pricing.</p>
                </FAQAnswer>
              </FAQItem>
            </CategorySection>

            <CategorySection>
              <h2>Events & Activities</h2>
              
              <FAQItem>
                <FAQSummary>What programs does TVK Canada offer?</FAQSummary>
                <FAQAnswer>
                  <p>We offer a variety of community programs including:</p>
                  <ul>
                    <li><strong>Mental Health Drop-In:</strong> Weekly, free sessions starting after Pongal</li>
                    <li><strong>Basketball Drop-In:</strong> Weekly in Durham Region, $15 per session</li>
                    <li><strong>Indoor Sports On-Demand:</strong> Starting January 15, based on group interest</li>
                    <li><strong>Summer Sports:</strong> Cricket and more outdoor activities</li>
                    <li><strong>Monthly Movie Watch Parties:</strong> Community members get priority access</li>
                  </ul>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>How do I participate in drop-in programs?</FAQSummary>
                <FAQAnswer>
                  <p>Simply join TVK Canada for free to receive updates about upcoming programs. When a program is scheduled, community members get early access to register. Some programs may have a small fee to cover venue costs.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Can I suggest a new program or sport?</FAQSummary>
                <FAQAnswer>
                  <p>Absolutely! We organize programs based on community interest. If you have a sport or activity you'd like to see, contact us through our Contact page or reach out on social media. We're building this community together!</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Are events held in all cities?</FAQSummary>
                <FAQAnswer>
                  <p>We aim to organize events in all major Canadian cities with significant Tamil populations. Initially, events will be concentrated in Toronto, Vancouver, and Calgary, with expansion to other cities as our community grows.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Can anyone attend events?</FAQSummary>
                <FAQAnswer>
                  <p>Most of our programs are open to all community members. Some events may have limited capacity, in which case registered community members get priority. Check the event details on our Events page for specific information.</p>
                </FAQAnswer>
              </FAQItem>
            </CategorySection>

            <CategorySection>
              <h2>Community & Support</h2>
              
              <FAQItem>
                <FAQSummary>How can I get involved beyond attending events?</FAQSummary>
                <FAQAnswer>
                  <p>We welcome active community participation! You can:</p>
                  <ul>
                    <li>Volunteer at events and community activities</li>
                    <li>Join our social media team to help promote TVK Canada</li>
                    <li>Suggest and help organize local events in your city</li>
                    <li>Participate in our charitable initiatives</li>
                    <li>Become a local chapter coordinator</li>
                  </ul>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Do you have any charitable initiatives?</FAQSummary>
                <FAQAnswer>
                  <p>Yes! As part of our commitment to giving back, we organize regular charitable activities including food drives, educational scholarships for Tamil students, and support for Tamil families in need across Canada.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>How can I contact TVK Canada for support?</FAQSummary>
                <FAQAnswer>
                  <p>You can reach us through:</p>
                  <ul>
                    <li>Email: contact@tvkcanada.family</li>
                    <li>Phone: +1 (647) 123-4567</li>
                    <li>Contact form on our website</li>
                    <li>Instagram: @tvk.canada</li>
                    <li>Facebook: TVK Canada Official</li>
                  </ul>
                  <p>Our team typically responds within 24 hours.</p>
                </FAQAnswer>
              </FAQItem>
            </CategorySection>

            <CategorySection>
              <h2>Technical & Website</h2>
              
              <FAQItem>
                <FAQSummary>How do I update my profile information?</FAQSummary>
                <FAQAnswer>
                  <p>You can update your profile information by logging into your account and visiting your profile settings. If you need to change your email address, please contact our support team.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>How do I stay updated on programs and events?</FAQSummary>
                <FAQAnswer>
                  <p>Join TVK Canada for free to receive email updates about programs and events. You can also follow us on social media for the latest announcements.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Is my personal information secure?</FAQSummary>
                <FAQAnswer>
                  <p>Absolutely. We use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your explicit consent.</p>
                </FAQAnswer>
              </FAQItem>
            </CategorySection>
          </FAQContainer>
        </Container>
      </Section>
    </>
  )
}