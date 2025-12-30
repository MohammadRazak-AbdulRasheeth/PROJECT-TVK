import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Events & Calendar Page
 */
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section, Grid, Flex } from '@components/Layout';
import { Button } from '@components/Button';
import { useAuth } from '../context/AuthContext';
import { SEO, seoData } from '@components/SEO';
const CalendarContainer = styled.div `
  width: 100%;
  min-height: 600px;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
  margin-bottom: ${theme.spacing.xxxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 500px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 400px;
    margin-bottom: ${theme.spacing.xl};
  }
`;
const CalendarHeader = styled.div `
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, #8b1428 100%);
  color: white;
  padding: ${theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: ${theme.typography.fontSize.lg};
  }

  .controls {
    display: flex;
    gap: ${theme.spacing.sm};
    align-items: center;
  }

  button {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    cursor: pointer;
    font-size: ${theme.typography.fontSize.sm};

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
    text-align: center;
  }
`;
const GoogleCalendarEmbed = styled.div `
  width: 100%;
  height: 600px;
  max-width: 800px;
  margin: 0 auto;
  border: solid 1px #777;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 500px;
    max-width: 100%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 400px;
  }
`;
const EventCard = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'featured'
}) `
  background: ${props => props.featured ? `linear-gradient(135deg, ${theme.colors.primary}15 0%, ${theme.colors.secondary}15 100%)` : theme.colors.surface};
  border: 2px solid ${props => props.featured ? theme.colors.secondary : theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  transition: all ${theme.transitions.base};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,215,0,0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.secondary};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-4px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    
    &:active {
      transform: scale(0.98);
    }

    &::before {
      display: none;
    }
  }

  .event-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${theme.spacing.md};
    gap: ${theme.spacing.sm};

    @media (max-width: ${theme.breakpoints.mobile}) {
      flex-direction: column;
      gap: ${theme.spacing.xs};
    }
  }

  .event-badge {
    display: inline-flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    background: ${props => props.featured ? theme.colors.secondary : theme.colors.primary};
    color: white;
    border-radius: ${theme.borderRadius.full};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.bold};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  h4 {
    color: ${theme.colors.primary};
    margin: 0;
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
  }

  .date {
    color: ${theme.colors.secondary};
    font-weight: ${theme.typography.fontWeight.semibold};
    font-size: ${theme.typography.fontSize.base};
    margin: ${theme.spacing.sm} 0;
  }

  .location {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
    margin-bottom: ${theme.spacing.sm};
    
    &::before {
      content: '📍 ';
    }
  }

  p {
    margin: ${theme.spacing.sm} 0;
    color: ${theme.colors.text.primary};
    line-height: 1.6;
  }

  .rsvp-section {
    margin-top: ${theme.spacing.lg};
    padding-top: ${theme.spacing.md};
    border-top: 1px solid ${theme.colors.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${theme.spacing.md};

    @media (max-width: ${theme.breakpoints.mobile}) {
      flex-direction: column;
      gap: ${theme.spacing.sm};
    }
  }

  .attendees {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
  }
`;
const FilterTabs = styled.div `
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.xs};
  }
`;
const FilterTab = styled.button `
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 2px solid ${props => props.active ? theme.colors.primary : theme.colors.border};
  background: ${props => props.active ? theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : theme.colors.text.primary};
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: all ${theme.transitions.base};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${props => props.active ? theme.colors.primary : `${theme.colors.primary}15`};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
  }
`;
/**
 * Events & Calendar Page Component
 */
export const EventsPage = () => {
    const { isAuthenticated } = useAuth();
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
    const upcomingEvents = [
        {
            id: 1,
            title: 'Mental Health Drop-In',
            date: 'Weekly (Starting after Pongal)',
            location: 'To Be Announced',
            type: 'wellness',
            description: 'A safe, supportive space to connect, share, and grow together. Open conversations about mental wellness in a judgment-free environment.',
            memberOnly: false,
            featured: true,
            attendees: 0,
            maxAttendees: 20,
            price: 'Free'
        },
        {
            id: 2,
            title: 'Basketball Drop-In',
            date: 'Weekly',
            location: 'Durham Region',
            type: 'sports',
            description: '1.5 hours of play + 30 mins setup. All skill levels welcome. Great way to stay active and meet fellow community members.',
            memberOnly: false,
            featured: true,
            attendees: 8,
            maxAttendees: 20,
            price: '$15'
        },
        {
            id: 3,
            title: 'Indoor Sports On-Demand',
            date: 'Starting January 15, 2025',
            location: 'Multiple Locations',
            type: 'sports',
            description: 'Have a sport your group wants to play? We organize based on community interest. Badminton, volleyball, table tennis, and more.',
            memberOnly: false,
            featured: false,
            attendees: 0,
            maxAttendees: 30,
            price: 'Varies'
        },
        {
            id: 4,
            title: 'Jana Nayagan Music Launch Watch Party',
            date: 'December 20, 2025 • 7:00 PM EST',
            location: 'To Be Determined',
            type: 'watch-party',
            description: 'Join us for the exclusive music launch of Jana Nayagan! Experience Thalapathy Vijay\'s latest musical masterpiece with fellow fans across Canada.',
            memberOnly: true,
            featured: true,
            attendees: 25,
            maxAttendees: 100,
            price: 'Members First'
        },
        {
            id: 5,
            title: 'Jana Nayagan Movie WATCH PARTY',
            date: 'January 15, 2026 • 8:00 PM EST',
            location: 'To Be Determined',
            type: 'movie',
            description: 'Experience Jana Nayagan on the big screen with TVK Canada community! Special group booking with premium seating for all members.',
            memberOnly: true,
            featured: true,
            attendees: 45,
            maxAttendees: 150,
            price: 'Members First'
        },
    ];
    const filters = [
        { key: 'all', label: 'All Events', count: upcomingEvents.length },
        { key: 'sports', label: 'Sports', count: upcomingEvents.filter(e => e.type === 'sports').length },
        { key: 'wellness', label: 'Wellness', count: upcomingEvents.filter(e => e.type === 'wellness').length },
        { key: 'movie', label: 'Movies', count: upcomingEvents.filter(e => e.type === 'movie' || e.type === 'watch-party').length },
        { key: 'member', label: 'Member Only', count: upcomingEvents.filter(e => e.memberOnly).length }
    ];
    const filteredEvents = upcomingEvents.filter(event => {
        switch (activeFilter) {
            case 'member': return event.memberOnly;
            case 'sports': return event.type === 'sports';
            case 'wellness': return event.type === 'wellness';
            case 'movie': return event.type === 'movie' || event.type === 'watch-party';
            default: return true;
        }
    });
    const handleRSVP = (eventId) => {
        if (!isAuthenticated) {
            alert('Please login to RSVP for events');
            return;
        }
        alert(`RSVP functionality coming soon! Event ID: ${eventId}`);
    };
    // Google Calendar embed URL (you can replace this with your actual calendar)
    const calendarEmbedUrl = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&showPrint=0&title=TVK%20CANADA%20CALENDAR&src=MzMyMjcxOWZmZDcyMzQ0Y2RkMGI5YzYxZTE3ZGY3NzA2YmRkNmM1ZGNhYWI5ZGIxNDY4YmI3YThkNDE0YTliYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%238e24aa";
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { ...seoData.events }), _jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "EventSeries",
                        "name": "TVK Canada Events",
                        "description": "Exclusive Thalapathy Vijay fan events and Tamil community gatherings across Canada",
                        "organizer": {
                            "@type": "Organization",
                            "name": "TVK Canada",
                            "url": "https://tvkcanada.family"
                        },
                        "location": {
                            "@type": "Place",
                            "name": "Various Locations across Canada",
                            "address": {
                                "@type": "PostalAddress",
                                "addressCountry": "CA"
                            }
                        }
                    })
                } }), _jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "Event",
                            "name": "Jana Nayagan Music Launch Watch Party",
                            "description": "Join us for the exclusive music launch of Jana Nayagan! Experience Thalapathy Vijay's latest musical masterpiece with fellow fans across Canada.",
                            "startDate": "2025-12-20T19:00:00-05:00",
                            "endDate": "2025-12-20T21:00:00-05:00",
                            "eventStatus": "https://schema.org/EventScheduled",
                            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                            "location": {
                                "@type": "VirtualLocation",
                                "name": "Online Event (Zoom)",
                                "url": "https://tvkcanada.family/events"
                            },
                            "organizer": {
                                "@type": "Organization",
                                "name": "TVK Canada",
                                "url": "https://tvkcanada.family"
                            },
                            "image": "https://tvkcanada.family/android-chrome-192x192.png",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "CAD",
                                "availability": "https://schema.org/InStock",
                                "validFrom": "2025-12-14",
                                "description": "Free for TVK Canada members"
                            },
                            "performer": {
                                "@type": "Person",
                                "name": "Thalapathy Vijay"
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "Event",
                            "name": "Jana Nayagan Movie WATCH PARTY",
                            "description": "Experience Jana Nayagan on the big screen with TVK Canada community! Special group booking with premium seating for all members.",
                            "startDate": "2026-01-15T20:00:00-05:00",
                            "endDate": "2026-01-15T23:00:00-05:00",
                            "eventStatus": "https://schema.org/EventScheduled",
                            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                            "location": {
                                "@type": "Place",
                                "name": "To Be Determined",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressCountry": "CA"
                                }
                            },
                            "organizer": {
                                "@type": "Organization",
                                "name": "TVK Canada",
                                "url": "https://tvkcanada.family"
                            },
                            "image": "https://tvkcanada.family/android-chrome-192x192.png",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "CAD",
                                "availability": "https://schema.org/InStock",
                                "validFrom": "2025-12-14",
                                "description": "Free for TVK Canada members"
                            },
                            "performer": {
                                "@type": "Person",
                                "name": "Thalapathy Vijay"
                            }
                        }
                    ])
                } }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h1", { style: {
                                textAlign: 'center',
                                marginBottom: theme.spacing.lg,
                                fontSize: theme.typography.fontSize['4xl'],
                                fontWeight: theme.typography.fontWeight.bold,
                                color: theme.colors.primary
                            }, children: "Programs & Events" }), _jsx("p", { style: {
                                textAlign: 'center',
                                marginBottom: theme.spacing.xxxl,
                                fontSize: '18px',
                                color: theme.colors.text.secondary,
                                maxWidth: '700px',
                                margin: `0 auto ${theme.spacing.xxxl} auto`
                            }, children: "Drop-in sports, mental health support, movie nights, and community gatherings. Join us for activities that bring our family together." })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsxs(Container, { children: [_jsx("h2", { style: { marginBottom: theme.spacing.lg, textAlign: 'center' }, children: "Public Calendar" }), _jsxs(CalendarContainer, { children: [_jsxs(CalendarHeader, { children: [_jsxs("h3", { children: ["\uD83D\uDCC5 TVK Canada Events - ", currentMonth] }), _jsxs("div", { className: "controls", children: [_jsx("button", { onClick: () => setCurrentMonth(new Date().toLocaleString('default', { month: 'long', year: 'numeric' })), children: "Today" }), _jsx("button", { onClick: () => window.open(calendarEmbedUrl.replace('/embed', ''), '_blank'), children: "Full Calendar" })] })] }), _jsx(GoogleCalendarEmbed, { children: _jsx("iframe", { src: calendarEmbedUrl, title: "TVK Canada Events Calendar", frameBorder: "0", scrolling: "no" }) })] })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h2", { style: { marginBottom: theme.spacing.xl, textAlign: 'center' }, children: "Upcoming Events" }), _jsx(FilterTabs, { children: filters.map(filter => (_jsxs(FilterTab, { active: activeFilter === filter.key, onClick: () => setActiveFilter(filter.key), children: [filter.label, " (", filter.count, ")"] }, filter.key))) }), _jsx(Grid, { columns: 2, gap: theme.spacing.xl, children: filteredEvents.map((event) => (_jsxs(EventCard, { featured: event.featured, children: [_jsxs("div", { className: "event-header", children: [_jsx("h4", { children: event.title }), _jsx("div", { className: "event-badge", children: event.memberOnly ? '🔒 Member Only' : '🌟 Open to All' })] }), _jsx("div", { className: "date", children: event.date }), _jsx("div", { className: "location", children: event.location }), _jsx("p", { children: event.description }), _jsxs("div", { className: "rsvp-section", children: [_jsxs("div", { className: "attendees", children: [_jsxs("span", { style: { marginRight: '12px' }, children: ["\uD83D\uDCB0 ", event.price] }), "\uD83D\uDC65 ", event.attendees, "/", event.maxAttendees, " attending"] }), _jsx(Button, { variant: event.featured ? "secondary" : "primary", size: "sm", onClick: () => handleRSVP(event.id), disabled: event.memberOnly && !isAuthenticated, children: event.memberOnly && !isAuthenticated ? 'Login Required' : 'RSVP' })] })] }, event.id))) }), filteredEvents.length === 0 && (_jsxs("div", { style: { textAlign: 'center', padding: theme.spacing.xxxl, color: theme.colors.text.secondary }, children: [_jsx("h3", { children: "No events found for the selected filter." }), _jsx("p", { children: "Try selecting a different filter or check back later for new events." })] }))] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsx(Container, { children: _jsxs("div", { style: {
                            textAlign: 'center',
                            background: `linear-gradient(135deg, ${theme.colors.primary}15 0%, ${theme.colors.secondary}15 100%)`,
                            padding: theme.spacing.xxxl,
                            borderRadius: theme.borderRadius.xl,
                            border: `2px solid ${theme.colors.secondary}`
                        }, children: [_jsx("h3", { style: { color: theme.colors.primary, marginBottom: theme.spacing.md }, children: "Never Miss an Event!" }), _jsx("p", { style: { marginBottom: theme.spacing.lg, color: theme.colors.text.secondary }, children: "Subscribe to our calendar to get automatic notifications about upcoming TVK Canada events." }), _jsxs(Flex, { justify: "center", gap: theme.spacing.md, style: { flexWrap: 'wrap' }, children: [_jsx(Button, { variant: "primary", onClick: () => window.open(calendarEmbedUrl.replace('/embed', ''), '_blank'), children: "\uD83D\uDCC5 Subscribe to Calendar" }), _jsx(Button, { variant: "outline", onClick: () => window.open('https://www.instagram.com/tvk.canada/', '_blank'), children: "\uD83D\uDCF1 Follow on Instagram" })] })] }) }) })] }));
};
