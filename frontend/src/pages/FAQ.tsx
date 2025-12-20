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
              <h2>Membership</h2>
              
              <FAQItem>
                <FAQSummary>How much does membership cost?</FAQSummary>
                <FAQAnswer>
                  <p>We offer flexible membership options:</p>
                  <ul>
                    <li><strong>Monthly:</strong> $15/month</li>
                    <li><strong>Yearly:</strong> $150/year (Save $30!)</li>
                    <li><strong>Lifetime:</strong> $500 one-time (Best value)</li>
                  </ul>
                  <p>All memberships include access to exclusive events, community networking, and special member benefits.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Is membership currently open?</FAQSummary>
                <FAQAnswer>
                  <p><strong>Yes! Membership is now open.</strong> We're accepting new members and building our community across Canada. Join today to be part of the founding members of TVK Canada.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>What benefits do members get?</FAQSummary>
                <FAQAnswer>
                  <p>TVK Canada members enjoy:</p>
                  <ul>
                    <li>Exclusive access to member-only events and movie premieres</li>
                    <li>Early bird discounts for all TVK activities</li>
                    <li>Direct networking with Tamil professionals across Canada</li>
                    <li>Access to our private member community and forums</li>
                    <li>Special merchandise and collectibles</li>
                    <li>Priority booking for limited-capacity events</li>
                  </ul>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Can I cancel my membership anytime?</FAQSummary>
                <FAQAnswer>
                  <p>Yes, you can cancel your monthly or yearly membership at any time through your member dashboard. Lifetime memberships are non-refundable but provide permanent access to TVK Canada benefits.</p>
                </FAQAnswer>
              </FAQItem>
            </CategorySection>

            <CategorySection>
              <h2>Events & Activities</h2>
              
              <FAQItem>
                <FAQSummary>When will the TVK events start?</FAQSummary>
                <FAQAnswer>
                  <p>Our full service event rollout will begin once we reach 200 members. However, online events will start as soon as we reach 100 members, so members can begin engaging early.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>What kind of events are you looking to run?</FAQSummary>
                <FAQAnswer>
                  <p>We plan to offer motivational group sessions and organize recreational programs based on the interests and feedback of our members, ensuring events are relevant and community-driven.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Will we be charged before the events start?</FAQSummary>
                <FAQAnswer>
                  <p>No. We are currently offering a free promotional period, and this period will be extended if needed to ensure members experience value before any charges apply.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Are events held in all cities?</FAQSummary>
                <FAQAnswer>
                  <p>We aim to organize events in all major Canadian cities with significant Tamil populations. Initially, events will be concentrated in Toronto, Vancouver, and Calgary, with expansion to other cities as our membership grows.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Can non-members attend public events?</FAQSummary>
                <FAQAnswer>
                  <p>Some of our events are open to the general public, while others are exclusive to members. Check the event details on our Events page for specific access requirements.</p>
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
                <FAQSummary>How do I reset my password?</FAQSummary>
                <FAQAnswer>
                  <p>Click on "Forgot Password" on the login page, enter your email address, and we'll send you a password reset link. If you continue to have issues, contact our support team.</p>
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQSummary>Can I update my membership plan?</FAQSummary>
                <FAQAnswer>
                  <p>Yes, you can upgrade or downgrade your membership plan anytime through your member dashboard. Changes will take effect at your next billing cycle.</p>
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