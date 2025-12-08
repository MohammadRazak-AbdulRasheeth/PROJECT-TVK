import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Events & Calendar Page
 */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section, Grid, Flex } from '@components/Layout';
import { Button } from '@components/Button';
import { useAuth } from '../context/AuthContext';
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
    // SEO optimization for Events page
    useEffect(() => {
        document.title = 'TVK Canada Events - Thalapathy Vijay Fan Gatherings';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Join upcoming TVK Canada events! Movie screenings, fan meetups, cultural celebrations, and exclusive Thalapathy Vijay gatherings.');
        }
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', 'TVK Canada events, Vijay movie screenings, Tamil events Canada, Thalapathy fan meetups, Vijay celebrations');
        }
    }, []);
    const upcomingEvents = [
        {
            id: 1,
            title: 'Weekly Community Meetup',
            date: 'December 4, 2025 • 6:00 PM EST',
            location: 'Scarborough Town Centre, Toronto',
            type: 'weekly',
            description: 'Join us for casual discussions, networking, and community building. Light refreshments provided.',
            memberOnly: false,
            featured: true,
            attendees: 45,
            maxAttendees: 100
        },
        {
            id: 2,
            title: 'Vijay Movie Marathon Night',
            date: 'December 7, 2025 • 7:00 PM EST',
            location: 'Cineplex Cinemas Yonge-Dundas',
            type: 'movie',
            description: 'Experience classic Vijay films together! Members get discounted tickets and premium seating.',
            memberOnly: true,
            featured: false,
            attendees: 78,
            maxAttendees: 120
        },
        {
            id: 3,
            title: 'Tamil Cultural Festival',
            date: 'December 15, 2025 • 2:00 PM EST',
            location: 'Metro Toronto Convention Centre',
            type: 'cultural',
            description: 'Celebrate Tamil culture with traditional music, dance, food, and family activities.',
            memberOnly: false,
            featured: true,
            attendees: 156,
            maxAttendees: 500
        },
        {
            id: 4,
            title: 'New Year Watch Party',
            date: 'December 31, 2025 • 10:00 PM EST',
            location: 'TVK Canada Headquarters',
            type: 'watch-party',
            description: 'Ring in the new year with fellow TVK fans! Special movie screening and countdown celebration.',
            memberOnly: true,
            featured: false,
            attendees: 23,
            maxAttendees: 80
        },
        {
            id: 5,
            title: 'Montreal Chapter Meetup',
            date: 'January 5, 2026 • 3:00 PM EST',
            location: 'Place des Arts, Montreal',
            type: 'meetup',
            description: 'Connect with TVK Montreal members for discussions and community building.',
            memberOnly: false,
            featured: false,
            attendees: 12,
            maxAttendees: 50
        },
        {
            id: 6,
            title: 'Family Fun Day',
            date: 'January 12, 2026 • 11:00 AM EST',
            location: 'Harbourfront Centre, Toronto',
            type: 'family',
            description: 'Bring the whole family for games, activities, and entertainment suitable for all ages.',
            memberOnly: false,
            featured: false,
            attendees: 34,
            maxAttendees: 200
        },
    ];
    const filters = [
        { key: 'all', label: 'All Events', count: upcomingEvents.length },
        { key: 'member', label: 'Member Only', count: upcomingEvents.filter(e => e.memberOnly).length },
        { key: 'public', label: 'Public Events', count: upcomingEvents.filter(e => !e.memberOnly).length },
        { key: 'featured', label: 'Featured', count: upcomingEvents.filter(e => e.featured).length }
    ];
    const filteredEvents = upcomingEvents.filter(event => {
        switch (activeFilter) {
            case 'member': return event.memberOnly;
            case 'public': return !event.memberOnly;
            case 'featured': return event.featured;
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
    return (_jsxs(_Fragment, { children: [_jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h1", { style: { textAlign: 'center', marginBottom: theme.spacing.lg }, children: "Events & Calendar" }), _jsx("p", { style: {
                                textAlign: 'center',
                                marginBottom: theme.spacing.xxxl,
                                fontSize: '18px',
                                color: theme.colors.text.secondary,
                                maxWidth: '600px',
                                margin: `0 auto ${theme.spacing.xxxl} auto`
                            }, children: "Join Tamizhaga Vetri Kazhagam Canada for weekly events, cultural gatherings, and community celebrations across the country." })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsxs(Container, { children: [_jsx("h2", { style: { marginBottom: theme.spacing.lg, textAlign: 'center' }, children: "Public Calendar" }), _jsxs(CalendarContainer, { children: [_jsxs(CalendarHeader, { children: [_jsxs("h3", { children: ["\uD83D\uDCC5 TVK Canada Events - ", currentMonth] }), _jsxs("div", { className: "controls", children: [_jsx("button", { onClick: () => setCurrentMonth(new Date().toLocaleString('default', { month: 'long', year: 'numeric' })), children: "Today" }), _jsx("button", { onClick: () => window.open(calendarEmbedUrl.replace('/embed', ''), '_blank'), children: "Full Calendar" })] })] }), _jsx(GoogleCalendarEmbed, { children: _jsx("iframe", { src: calendarEmbedUrl, title: "TVK Canada Events Calendar", frameBorder: "0", scrolling: "no" }) })] })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h2", { style: { marginBottom: theme.spacing.xl, textAlign: 'center' }, children: "Upcoming Events" }), _jsx(FilterTabs, { children: filters.map(filter => (_jsxs(FilterTab, { active: activeFilter === filter.key, onClick: () => setActiveFilter(filter.key), children: [filter.label, " (", filter.count, ")"] }, filter.key))) }), _jsx(Grid, { columns: 2, gap: theme.spacing.xl, children: filteredEvents.map((event) => (_jsxs(EventCard, { featured: event.featured, children: [_jsxs("div", { className: "event-header", children: [_jsx("h4", { children: event.title }), _jsx("div", { className: "event-badge", children: event.memberOnly ? '🔒 Member Only' : '🌟 Open to All' })] }), _jsx("div", { className: "date", children: event.date }), _jsx("div", { className: "location", children: event.location }), _jsx("p", { children: event.description }), _jsxs("div", { className: "rsvp-section", children: [_jsxs("div", { className: "attendees", children: ["\uD83D\uDC65 ", event.attendees, "/", event.maxAttendees, " attending"] }), _jsx(Button, { variant: event.featured ? "secondary" : "primary", size: "sm", onClick: () => handleRSVP(event.id), disabled: event.memberOnly && !isAuthenticated, children: event.memberOnly && !isAuthenticated ? 'Login Required' : 'RSVP' })] })] }, event.id))) }), filteredEvents.length === 0 && (_jsxs("div", { style: { textAlign: 'center', padding: theme.spacing.xxxl, color: theme.colors.text.secondary }, children: [_jsx("h3", { children: "No events found for the selected filter." }), _jsx("p", { children: "Try selecting a different filter or check back later for new events." })] }))] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsx(Container, { children: _jsxs("div", { style: {
                            textAlign: 'center',
                            background: `linear-gradient(135deg, ${theme.colors.primary}15 0%, ${theme.colors.secondary}15 100%)`,
                            padding: theme.spacing.xxxl,
                            borderRadius: theme.borderRadius.xl,
                            border: `2px solid ${theme.colors.secondary}`
                        }, children: [_jsx("h3", { style: { color: theme.colors.primary, marginBottom: theme.spacing.md }, children: "Never Miss an Event!" }), _jsx("p", { style: { marginBottom: theme.spacing.lg, color: theme.colors.text.secondary }, children: "Subscribe to our calendar to get automatic notifications about upcoming TVK Canada events." }), _jsxs(Flex, { justify: "center", gap: theme.spacing.md, style: { flexWrap: 'wrap' }, children: [_jsx(Button, { variant: "primary", onClick: () => window.open(calendarEmbedUrl.replace('/embed', ''), '_blank'), children: "\uD83D\uDCC5 Subscribe to Calendar" }), _jsx(Button, { variant: "outline", onClick: () => window.open('https://www.instagram.com/tvk.canada/', '_blank'), children: "\uD83D\uDCF1 Follow on Instagram" })] })] }) }) })] }));
};
