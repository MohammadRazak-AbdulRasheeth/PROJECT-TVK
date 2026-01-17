import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section, Grid } from '@components/Layout';
import { SEO, seoData } from '@components/SEO';
import { AdUnit } from '@components/AdUnit';
import { FaHandshake, FaBrain, FaPersonRunning, FaStar, FaFilm, FaGlobe, FaSpa, FaBasketball, FaClapperboard, FaPeopleGroup } from 'react-icons/fa6';
const Mission = styled.div `
  text-align: center;
  margin-bottom: ${theme.spacing.xxxl};

  h2 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.extrabold};
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
      font-size: ${theme.typography.fontSize['2xl']};
      margin-bottom: ${theme.spacing.md};
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: ${theme.typography.fontSize.xl};
      padding-bottom: ${theme.spacing.md};
    }
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    max-width: 900px;
    margin: 0 auto;
    line-height: ${theme.typography.lineHeight.relaxed};

    @media (max-width: ${theme.breakpoints.tablet}) {
      font-size: ${theme.typography.fontSize.base};
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: ${theme.typography.fontSize.sm};
    }
  }
`;
const ValuesGrid = styled(Grid) `
  margin: ${theme.spacing.xxxl} 0;
`;
const ValueCard = styled.div `
  background: linear-gradient(135deg, ${theme.colors.surface} 0%, #ffffff 100%);
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius['2xl']};
  border-top: 4px solid ${theme.colors.primary};
  text-align: center;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};
  position: relative;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bold;
    color: white;
    transition: all ${theme.transitions.base};
    box-shadow: ${theme.shadows.lg};
  }

  &:hover {
    transform: translateY(-12px) scale(1.03);
    box-shadow: ${theme.shadows.xl};
    border-top-color: ${theme.colors.secondary};

    &::before {
      transform: translateX(-50%) scale(1.15);
      box-shadow: ${theme.shadows.xl};
    }
  }

  &:active {
    transform: translateY(-6px) scale(1.01);
  }

  h3 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
    margin-top: ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    transition: color ${theme.transitions.base};
  }

  p {
    margin-bottom: 0;
    color: ${theme.colors.text.secondary};
    line-height: ${theme.typography.lineHeight.relaxed};
    transition: color ${theme.transitions.base};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    touch-action: manipulation;

    &:active {
      transform: scale(0.97);
      box-shadow: ${theme.shadows.md};
    }

    &::before {
      width: 40px;
      height: 40px;
    }
  }
`;
const ActivitiesSection = styled.div `
  margin-top: ${theme.spacing.xxl};

  h3 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
  }
`;
const ActivityItem = styled.div `
  background: linear-gradient(135deg, ${theme.colors.secondary}10 0%, transparent 100%);
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  border-left: 5px solid ${theme.colors.secondary};
  transition: all ${theme.transitions.base};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,215,0,0.08), transparent);
    transition: right ${theme.transitions.base};
  }

  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateX(8px);
    border-left-width: 7px;

    &::after {
      right: 100%;
    }
  }

  &:active {
    transform: translateX(4px);
    box-shadow: ${theme.shadows.sm};
  }

  h4 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
    font-weight: ${theme.typography.fontWeight.bold};
    transition: color ${theme.transitions.base};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: 0;
    transition: color ${theme.transitions.base};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    touch-action: manipulation;

    &:active {
      transform: scale(0.98);
      box-shadow: ${theme.shadows.sm};
    }

    &::after {
      display: none;
    }
  }
`;
const PhilosophyBox = styled.div `
  background: linear-gradient(135deg, ${theme.colors.secondary}20 0%, ${theme.colors.primary}10 100%);
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius['2xl']};
  text-align: center;
  border: 2px solid ${theme.colors.primary};
  box-shadow: ${theme.shadows.lg};

  h2 {
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.primary};
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.extrabold};
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    line-height: ${theme.typography.lineHeight.relaxed};
    margin: 0;
  }
`;
const ValueIcon = styled.div `
  font-size: 32px;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;
const ActivityIcon = styled.span `
  display: inline-flex;
  align-items: center;
  margin-right: ${theme.spacing.sm};
  color: ${theme.colors.primary};
`;
/**
 * About Us Page Component - Community-First Design
 */
export const AboutPage = () => {
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { ...seoData.about }), _jsx(Section, { padding: `${theme.spacing.xl} 0`, background: theme.colors.primary, children: _jsxs(Container, { children: [_jsx("h1", { style: {
                                color: theme.colors.text.inverse,
                                textAlign: 'center',
                                fontSize: theme.typography.fontSize['4xl'],
                                fontWeight: theme.typography.fontWeight.extrabold,
                                margin: 0
                            }, children: "About TVK Canada" }), _jsx("p", { style: {
                                color: theme.colors.text.inverse,
                                textAlign: 'center',
                                fontSize: theme.typography.fontSize.lg,
                                opacity: 0.9,
                                marginTop: theme.spacing.md,
                                marginBottom: 0
                            }, children: "More than a fan club. A family that grows, supports, and serves." })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.background, children: _jsxs(Container, { children: [_jsxs(Mission, { children: [_jsx("h2", { children: "Who We Are" }), _jsx("p", { children: "TVK Canada is a family of like-minded Thalapathy fans who support one another in wellness, growth, and community service. We are more than just a fan club \u2013 we are a community united by shared values, passion for culture, and commitment to meaningful connections." })] }), _jsxs(Mission, { children: [_jsx("h2", { children: "Our Purpose" }), _jsx("p", { children: "We exist to create a welcoming space where fans and families can come together beyond movies. Our focus is on wellness, mental health, sports, personal growth, and giving back to our communities across Canada." })] }), _jsx(AdUnit, {})] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsxs(Container, { children: [_jsx("h2", { style: { textAlign: 'center', marginBottom: theme.spacing.xxl, fontSize: theme.typography.fontSize['3xl'], color: theme.colors.primary, fontWeight: theme.typography.fontWeight.extrabold }, children: "What We Stand For" }), _jsxs(ValuesGrid, { columns: 3, children: [_jsxs(ValueCard, { children: [_jsx(ValueIcon, { children: _jsx(FaHandshake, {}) }), _jsx("h3", { children: "Family First" }), _jsx("p", { children: "We treat every member as family. Supporting each other through life's challenges and celebrating together in good times." })] }), _jsxs(ValueCard, { children: [_jsx(ValueIcon, { children: _jsx(FaBrain, {}) }), _jsx("h3", { children: "Wellness & Growth" }), _jsx("p", { children: "Mental health matters. We create safe spaces for open conversations, personal development, and holistic well-being." })] }), _jsxs(ValueCard, { children: [_jsx(ValueIcon, { children: _jsx(FaPersonRunning, {}) }), _jsx("h3", { children: "Active Living" }), _jsx("p", { children: "Sports and recreation bring us together. From basketball to cricket, we stay active and build friendships through play." })] }), _jsxs(ValueCard, { children: [_jsx(ValueIcon, { children: _jsx(FaStar, {}) }), _jsx("h3", { children: "Giving Back" }), _jsx("p", { children: "Civic responsibility is in our DNA. We volunteer, support local causes, and contribute positively to Canadian society." })] }), _jsxs(ValueCard, { children: [_jsx(ValueIcon, { children: _jsx(FaFilm, {}) }), _jsx("h3", { children: "Celebrating Culture" }), _jsx("p", { children: "Thalapathy's films inspire us, but our bond goes deeper. We celebrate Tamil culture, arts, and the values Vijay represents." })] }), _jsxs(ValueCard, { children: [_jsx(ValueIcon, { children: _jsx(FaGlobe, {}) }), _jsx("h3", { children: "Inclusive Community" }), _jsx("p", { children: "Everyone is welcome. We embrace diversity and create an environment where all feel they belong." })] })] })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.background, children: _jsxs(Container, { children: [_jsx("h2", { style: { textAlign: 'center', marginBottom: theme.spacing.xxl, fontSize: theme.typography.fontSize['3xl'], color: theme.colors.primary, fontWeight: theme.typography.fontWeight.extrabold }, children: "How We Come Together" }), _jsxs(Grid, { columns: 2, gap: theme.spacing.xl, children: [_jsx("div", { children: _jsxs(ActivitiesSection, { children: [_jsxs(ActivityItem, { children: [_jsxs("h4", { children: [_jsx(ActivityIcon, { children: _jsx(FaSpa, {}) }), " Mental Health Drop-Ins"] }), _jsx("p", { children: "Weekly safe spaces for open conversations about wellness, stress, and life challenges. No judgment, just support." })] }), _jsxs(ActivityItem, { children: [_jsxs("h4", { children: [_jsx(ActivityIcon, { children: _jsx(FaBasketball, {}) }), " Sports & Recreation"] }), _jsx("p", { children: "Basketball, cricket, badminton, and more. Drop-in sessions for all skill levels to stay active and connected." })] })] }) }), _jsx("div", { children: _jsxs(ActivitiesSection, { children: [_jsxs(ActivityItem, { children: [_jsxs("h4", { children: [_jsx(ActivityIcon, { children: _jsx(FaClapperboard, {}) }), " Movie Watch Parties"] }), _jsx("p", { children: "Experience Thalapathy's films together on the big screen. Members get priority access to group bookings." })] }), _jsxs(ActivityItem, { children: [_jsxs("h4", { children: [_jsx(ActivityIcon, { children: _jsx(FaPeopleGroup, {}) }), " Community Service"] }), _jsx("p", { children: "Volunteering opportunities, charity drives, and initiatives that give back to our Canadian communities." })] })] }) })] })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.surface, children: _jsx(Container, { children: _jsxs(PhilosophyBox, { children: [_jsx("h2", { children: "More Than Movies. One Family. One Purpose." }), _jsx("p", { children: "We are a joyful and growing Canadian community brought together by our admiration for Thalapathy Vijay. But what keeps us together is bigger than fandom \u2013 it's the genuine care we have for each other's well-being, growth, and happiness. Whether you're here for the sports, the support, or the celebrations, you're family." })] }) }) })] }));
};
