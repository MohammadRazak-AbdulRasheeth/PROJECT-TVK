import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section, Grid } from '@components/Layout';
const CalendarPlaceholder = styled.div `
  width: 100%;
  min-height: 500px;
  background: ${theme.colors.surface};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xxxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 300px;
    font-size: 16px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 250px;
    font-size: 14px;
    padding: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.xl};
  }
`;
const EventCard = styled.div `
  background: ${theme.colors.surface};
  border-left: 4px solid ${theme.colors.primary};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.base};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,215,0,0.1), transparent);
    transition: left ${theme.transitions.base};
  }

  &:hover {
    transform: translateY(-6px) translateX(4px);
    box-shadow: ${theme.shadows.xl};
    border-left-width: 6px;

    &::after {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    touch-action: manipulation;

    &:active {
      transform: scale(0.97);
      box-shadow: ${theme.shadows.md};
    }

    &::after {
      display: none;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    &:active {
      transform: translateY(-3px) translateX(2px);
      box-shadow: ${theme.shadows.lg};
    }
  }

  h4 {
    color: ${theme.colors.primary};
    margin: 0 0 ${theme.spacing.sm} 0;
    font-size: 16px;
  }

  .date {
    color: ${theme.colors.secondary};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.xs};
  }

  .type {
    display: inline-block;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    background: ${theme.colors.secondary}15;
    color: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.sm};
    font-size: 12px;
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    margin: ${theme.spacing.sm} 0;
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.md};
  }
`;
/**
 * Events & Calendar Page Component
 */
export const EventsPage = () => {
    const upcomingEvents = [
        {
            id: 1,
            title: 'Weekly Meetup - Toronto',
            date: 'Every Wednesday, 6:00 PM',
            type: 'weekly',
            description: 'Join us for casual hangouts, discussions, and community building.',
            memberOnly: false,
        },
        {
            id: 2,
            title: 'Movie Night - Vijay Classics',
            date: 'Every Saturday, 7:00 PM',
            type: 'movie',
            description: 'Experience Vijay\'s films together in a communal, family-friendly setting.',
            memberOnly: true,
        },
        {
            id: 3,
            title: 'Cultural Gathering - Diwali Celebration',
            date: 'Coming Soon',
            type: 'cultural',
            description: 'Celebrate culture and tradition with TVK Canada members across the country.',
            memberOnly: false,
        },
        {
            id: 4,
            title: 'Watch Party - Major Release',
            date: 'Announced on Social Media',
            type: 'watch-party',
            description: 'Join members for special screenings of major Vijay releases with member-only pricing.',
            memberOnly: true,
        },
        {
            id: 5,
            title: 'Community Meetup - Montreal',
            date: 'First Sunday of each month',
            type: 'meetup',
            description: 'Build friendships and community spirit with fellow fans in Montreal.',
            memberOnly: false,
        },
        {
            id: 6,
            title: 'Family-Friendly Event - Vancouver',
            date: 'Every Other Saturday',
            type: 'family',
            description: 'Exciting activities and celebrations for the whole family.',
            memberOnly: false,
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h1", { style: { textAlign: 'center', marginBottom: theme.spacing.lg }, children: "Events & Calendar" }), _jsx("p", { style: {
                                textAlign: 'center',
                                marginBottom: theme.spacing.xxxl,
                                fontSize: '18px',
                                color: theme.colors.text.secondary,
                            }, children: "Stay connected with weekly events, cultural gatherings, and community celebrations across Canada." })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsxs(Container, { children: [_jsx("h2", { style: { marginBottom: theme.spacing.lg, textAlign: 'center' }, children: "Public Calendar" }), _jsxs(CalendarPlaceholder, { children: ["Google Calendar Integration - Coming Soon!", _jsx("br", {}), _jsx("span", { style: { fontSize: '14px', marginTop: '10px' }, children: "Subscribe to stay updated on all TVK Canada events" })] })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h2", { style: { marginBottom: theme.spacing.xxxl, textAlign: 'center' }, children: "Upcoming Events" }), _jsx(Grid, { columns: 2, gap: theme.spacing.lg, children: upcomingEvents.map((event) => (_jsxs(EventCard, { children: [_jsx("div", { className: "type", children: event.memberOnly ? 'Member-Only' : 'Open to All' }), _jsx("h4", { children: event.title }), _jsx("div", { className: "date", children: event.date }), _jsx("p", { children: event.description })] }, event.id))) })] }) })] }));
};
