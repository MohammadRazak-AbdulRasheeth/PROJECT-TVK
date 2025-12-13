import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section } from '@components/Layout';
import { Button } from '@components/Button';
import { SEO, seoData } from '@components/SEO';
const HeroSection = styled(Section) `
  background: ${theme.colors.gradient.primary};
  color: ${theme.colors.text.inverse};
  padding: 0;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -150px;
    left: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
    border-radius: 50%;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 100vh;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 100vh;
  }
`;
const HeroContent = styled(Container) `
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.sm};
    min-height: calc(100vh - 60px);
  }
`;
const HeroTitle = styled.h1 `
  font-size: clamp(1.75rem, 4vw, 3.5rem);
  margin-bottom: ${theme.spacing.lg};
  line-height: ${theme.typography.lineHeight.tight};
  font-weight: ${theme.typography.fontWeight.extrabold};
  color: ${theme.colors.text.inverse};
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
  text-align: center;
  max-width: 100%;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease-out 0.5s forwards;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: ${theme.spacing.md};
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    line-height: 1.2;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing.md};
    font-size: clamp(1.25rem, 6vw, 2rem);
    padding: 0 ${theme.spacing.sm};
    line-height: 1.3;
  }
`;
const HeroSubtitle = styled.p `
  font-size: clamp(1rem, 3vw, ${theme.typography.fontSize.lg});
  margin-bottom: ${theme.spacing.xl};
  opacity: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${theme.typography.lineHeight.relaxed};
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out 1s forwards;

  @keyframes fadeInUp {
    to {
      opacity: 0.95;
      transform: translateY(0);
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(0.95rem, 4vw, 1.1rem);
    margin-bottom: ${theme.spacing.lg};
    max-width: 500px;
    padding: 0 ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: clamp(0.875rem, 4.5vw, 1rem);
    margin-bottom: ${theme.spacing.md};
    max-width: 90%;
    padding: 0 ${theme.spacing.sm};
    line-height: 1.5;
  }
`;
const HeroButtons = styled.div `
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  margin-top: ${theme.spacing.lg};
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out 1.5s forwards;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
    50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing.sm};
    padding: 0 ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.md};
    padding: 0 ${theme.spacing.sm};
    width: 100%;
    
    button {
      width: 100%;
      max-width: 280px;
      opacity: 0;
      animation: fadeInUp 0.6s ease-out forwards;
    }
  }
`;
// Custom styled buttons with unique designs
const MembershipButton = styled(Button) `
  background: linear-gradient(135deg, #FFD700 0%, #F4D03F 50%, #FFD700 100%);
  background-size: 200% 200%;
  color: #2C1810;
  font-weight: ${theme.typography.fontWeight.bold};
  position: relative;
  border: none;
  box-shadow: 
    0 6px 20px rgba(255, 215, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(184, 134, 11, 0.3);
  animation-delay: 1.6s;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.6s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 6px;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-2px);
    background-position: 200% 0;
    box-shadow: 
      0 10px 30px rgba(255, 215, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 rgba(184, 134, 11, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0px);
    box-shadow: 
      0 2px 15px rgba(255, 215, 0, 0.3),
      inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;
const ProgramButton = styled(Button) `
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, #A91E3A 100%);
  color: ${theme.colors.text.inverse};
  font-weight: ${theme.typography.fontWeight.semibold};
  border: 2px solid #FFD700;
  position: relative;
  box-shadow: 
    0 6px 20px rgba(196, 30, 58, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation-delay: 1.8s;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), transparent 50%);
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent 70%);
    transition: all 0.4s ease;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  
  &:hover {
    transform: translateY(-2px);
    border-color: #FFA500;
    background: linear-gradient(135deg, #D2234F 0%, ${theme.colors.primary} 100%);
    box-shadow: 
      0 10px 30px rgba(196, 30, 58, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      width: 300px;
      height: 300px;
    }
  }
  
  &:active {
    transform: translateY(0px);
  }
`;
const EventsButton = styled(Button) `
  background: 
    linear-gradient(rgba(196, 30, 58, 0.05), rgba(196, 30, 58, 0.05)) padding-box,
    linear-gradient(135deg, #FFD700, #FFA500) border-box;
  color: #2C1810;
  font-weight: ${theme.typography.fontWeight.medium};
  border: 2px solid transparent;
  position: relative;
  box-shadow: 
    0 6px 20px rgba(255, 215, 0, 0.2),
    inset 0 1px 0 rgba(255, 215, 0, 0.1);
  animation-delay: 2s;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1));
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent);
    transition: left 0.6s ease;
    transform: skewX(-20deg);
  }
  
  &:hover {
    background: 
      linear-gradient(rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.15)) padding-box,
      linear-gradient(135deg, #FFD700, #FFA500) border-box;
    color: white;
    transform: translateY(-2px);
    box-shadow: 
      0 10px 30px rgba(255, 215, 0, 0.3),
      inset 0 1px 0 rgba(255, 215, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0px);
  }
  
  span {
    position: relative;
    z-index: 2;
  }
`;
/**
 * Home Page Component - Premium Design
 */
export const HomePage = () => {
    const navigate = useNavigate();
    const handleJoinClick = () => {
        navigate('/membership');
    };
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { ...seoData.home }), _jsx(HeroSection, { children: _jsxs(HeroContent, { children: [_jsx(HeroTitle, { children: "Building Community. Celebrating Thalapathy. Growing Together in Canada." }), _jsx(HeroSubtitle, { children: "TVK Canada is a membership-driven nonprofit dedicated to recreation, empowerment, and giving back." }), _jsxs(HeroButtons, { children: [_jsx(MembershipButton, { variant: "secondary", size: "lg", onClick: handleJoinClick, children: "Join Membership" }), _jsx(ProgramButton, { variant: "primary", size: "lg", onClick: () => navigate('/about'), children: "Explore Programs" }), _jsx(EventsButton, { variant: "outline", size: "lg", onClick: () => navigate('/events'), children: _jsx("span", { children: "Upcoming Events" }) })] })] }) })] }));
};
