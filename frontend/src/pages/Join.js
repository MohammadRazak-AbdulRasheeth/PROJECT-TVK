import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Join TVK Canada (Free) Page
 * Master signup form for community membership
 */
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Container, Section } from '@components/Layout';
import { Button } from '@components/Button';
import { SEO } from '@components/SEO';
import { communityMemberService } from '@services/api';
import { FaBrain, FaBasketball, FaFilm, FaBriefcase, FaHandshake, FaChartLine, FaCheck, FaHandsPraying } from 'react-icons/fa6';
const PageHeader = styled(Section) `
  background: ${theme.colors.gradient.primary};
  color: ${theme.colors.text.inverse};
  text-align: center;
  padding: ${theme.spacing.xxxl} ${theme.spacing.lg};

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    font-weight: ${theme.typography.fontWeight.extrabold};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    h1 { font-size: ${theme.typography.fontSize['2xl']}; }
    p { font-size: ${theme.typography.fontSize.base}; }
  }
`;
const FormContainer = styled.div `
  max-width: 600px;
  margin: 0 auto;
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.xl};
  border: 2px solid ${theme.colors.border};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
  }
`;
const FormGroup = styled.div `
  margin-bottom: ${theme.spacing.lg};

  label {
    display: block;
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.sm};
  }

  input, select {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 2px solid ${props => props.hasError ? '#dc2626' : theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    font-size: ${theme.typography.fontSize.base};
    transition: all ${theme.transitions.base};

    &:focus {
      outline: none;
      border-color: ${props => props.hasError ? '#dc2626' : theme.colors.primary};
      box-shadow: 0 0 0 3px ${props => props.hasError ? '#dc262620' : `${theme.colors.primary}20`};
    }
  }
`;
const ErrorMessage = styled.span `
  display: block;
  color: #dc2626;
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.xs};
`;
const FormErrorSummary = styled.div `
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  color: #dc2626;
  font-size: ${theme.typography.fontSize.sm};
`;
const FormRow = styled.div `
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
const CheckboxGroup = styled.div `
  margin-bottom: ${theme.spacing.lg};

  .group-label {
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.md};
    display: block;
  }

  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.sm};

    @media (max-width: ${theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
    }
  }
`;
const CheckboxItem = styled.label `
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.base};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}05;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${theme.colors.primary};
    cursor: pointer;
    flex-shrink: 0;
    margin: 0;
  }

  span {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.primary};
    display: flex;
    align-items: center;
  }
`;
const ConsentBox = styled.div `
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  .consent-item {
    display: flex;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.md};

    &:last-child {
      margin-bottom: 0;
    }

    input {
      margin-top: 4px;
      accent-color: ${theme.colors.primary};
    }

    span {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.text.secondary};
      line-height: 1.5;
    }
  }
`;
const BenefitsList = styled.div `
  background: linear-gradient(135deg, ${theme.colors.secondary}15 0%, ${theme.colors.primary}10 100%);
  border: 2px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  h3 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.xl};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: ${theme.spacing.sm} 0;
      color: ${theme.colors.text.primary};
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};

      &::before {
        content: '';
      }
    }
  }
`;
const SuccessMessage = styled.div `
  text-align: center;
  padding: ${theme.spacing.xxl};

  .icon {
    font-size: 64px;
    margin-bottom: ${theme.spacing.lg};
  }

  h2 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.lg};
  }
`;
const SuccessIcon = styled.div `
  font-size: 64px;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.primary};
`;
const InterestIcon = styled.span `
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
`;
export const JoinPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        ageRange: '',
        interests: [],
        emailConsent: false,
        smsConsent: false
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!formData.ageRange) {
            newErrors.ageRange = 'Age range is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };
    const handleInterestChange = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        if (!validateForm()) {
            return;
        }
        setIsSubmitting(true);
        try {
            // Check for duplicate email
            const emailCheck = await communityMemberService.checkEmail(formData.email);
            if (emailCheck.exists) {
                setErrors(prev => ({
                    ...prev,
                    email: 'This email is already registered. Please use a different email or contact us if you need help.'
                }));
                setIsSubmitting(false);
                return;
            }
            // Submit the form
            await communityMemberService.signup(formData);
            setIsSubmitted(true);
        }
        catch (error) {
            // Handle API errors
            if (error.response?.status === 409) {
                // Duplicate email error from backend
                setErrors(prev => ({
                    ...prev,
                    email: 'This email is already registered. Please use a different email or contact us if you need help.'
                }));
            }
            else {
                setSubmitError('Something went wrong. Please try again later.');
            }
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const interests = [
        { id: 'mental-health', label: 'Mental Health', icon: _jsx(FaBrain, {}) },
        { id: 'sports', label: 'Sports', icon: _jsx(FaBasketball, {}) },
        { id: 'movies', label: 'Movies', icon: _jsx(FaFilm, {}) },
        { id: 'business', label: 'Business', icon: _jsx(FaBriefcase, {}) },
        { id: 'volunteering', label: 'Volunteering', icon: _jsx(FaHandshake, {}) },
        { id: 'growth', label: 'Personal Growth', icon: _jsx(FaChartLine, {}) }
    ];
    const ageRanges = [
        '18-24',
        '25-34',
        '35-44',
        '45-54',
        '55+'
    ];
    if (isSubmitted) {
        return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "Welcome to TVK Canada!", description: "Thank you for joining TVK Canada community.", keywords: "TVK Canada, welcome, community, Thalapathy Vijay fans" }), _jsx(PageHeader, { children: _jsx(Container, { children: _jsx("h1", { children: "Welcome to the Family!" }) }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, children: _jsx(Container, { children: _jsx(FormContainer, { children: _jsxs(SuccessMessage, { children: [_jsx(SuccessIcon, { children: _jsx(FaHandsPraying, {}) }), _jsx("h2", { children: "You're In!" }), _jsx("p", { children: "Welcome to TVK Canada! You'll receive updates about our programs, events, and community activities. We're excited to have you as part of our family." }), _jsx(Button, { variant: "primary", onClick: () => window.location.href = '/programs', children: "Explore Programs" })] }) }) }) })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "Join TVK Canada (Free) | Community Membership", description: "Join TVK Canada for free! Get updates on wellness programs, sports drop-ins, movie nights, and community events. No payment required.", keywords: "TVK Canada, join free, community membership, Thalapathy Vijay fans, wellness, sports, mental health" }), _jsx(PageHeader, { children: _jsxs(Container, { children: [_jsx("h1", { children: "Join TVK Canada (Free)" }), _jsx("p", { children: "Free community membership. No payment required." })] }) }), _jsx(Section, { padding: `${theme.spacing.xxxl} 0`, background: theme.colors.background, children: _jsx(Container, { children: _jsxs(FormContainer, { children: [_jsxs(BenefitsList, { children: [_jsx("h3", { children: "What You Get (Free)" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(FaCheck, { style: { color: theme.colors.primary } }), " Updates on programs and events"] }), _jsxs("li", { children: [_jsx(FaCheck, { style: { color: theme.colors.primary } }), " Early access to drop-in registrations"] }), _jsxs("li", { children: [_jsx(FaCheck, { style: { color: theme.colors.primary } }), " Priority booking for movie nights"] }), _jsxs("li", { children: [_jsx(FaCheck, { style: { color: theme.colors.primary } }), " Community newsletter"] }), _jsxs("li", { children: [_jsx(FaCheck, { style: { color: theme.colors.primary } }), " Future member perks and discounts"] })] })] }), _jsxs("form", { onSubmit: handleSubmit, children: [submitError && (_jsx(FormErrorSummary, { children: submitError })), Object.keys(errors).length > 0 && !submitError && (_jsx(FormErrorSummary, { children: "Please fix the errors below to continue." })), _jsxs(FormRow, { children: [_jsxs(FormGroup, { hasError: !!errors.firstName, children: [_jsx("label", { htmlFor: "firstName", children: "First Name *" }), _jsx("input", { type: "text", id: "firstName", name: "firstName", value: formData.firstName, onChange: handleInputChange, placeholder: "Your first name" }), errors.firstName && _jsx(ErrorMessage, { children: errors.firstName })] }), _jsxs(FormGroup, { hasError: !!errors.lastName, children: [_jsx("label", { htmlFor: "lastName", children: "Last Name *" }), _jsx("input", { type: "text", id: "lastName", name: "lastName", value: formData.lastName, onChange: handleInputChange, placeholder: "Your last name" }), errors.lastName && _jsx(ErrorMessage, { children: errors.lastName })] })] }), _jsxs(FormGroup, { hasError: !!errors.email, children: [_jsx("label", { htmlFor: "email", children: "Email Address *" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, placeholder: "your.email@example.com" }), errors.email && _jsx(ErrorMessage, { children: errors.email })] }), _jsxs(FormGroup, { hasError: !!errors.phone, children: [_jsx("label", { htmlFor: "phone", children: "Phone Number *" }), _jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleInputChange, placeholder: "(123) 456-7890" }), errors.phone && _jsx(ErrorMessage, { children: errors.phone })] }), _jsxs(FormRow, { children: [_jsxs(FormGroup, { hasError: !!errors.city, children: [_jsx("label", { htmlFor: "city", children: "City *" }), _jsx("input", { type: "text", id: "city", name: "city", value: formData.city, onChange: handleInputChange, placeholder: "Your city" }), errors.city && _jsx(ErrorMessage, { children: errors.city })] }), _jsxs(FormGroup, { hasError: !!errors.ageRange, children: [_jsx("label", { htmlFor: "ageRange", children: "Age Range *" }), _jsxs("select", { id: "ageRange", name: "ageRange", value: formData.ageRange, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Select age range" }), ageRanges.map(range => (_jsx("option", { value: range, children: range }, range)))] }), errors.ageRange && _jsx(ErrorMessage, { children: errors.ageRange })] })] }), _jsxs(CheckboxGroup, { children: [_jsx("span", { className: "group-label", children: "What are you interested in?" }), _jsx("div", { className: "checkbox-grid", children: interests.map(interest => (_jsxs(CheckboxItem, { htmlFor: `interest-${interest.id}`, children: [_jsx("input", { type: "checkbox", id: `interest-${interest.id}`, checked: formData.interests.includes(interest.id), onChange: () => handleInterestChange(interest.id) }), _jsxs("span", { children: [_jsx(InterestIcon, { children: interest.icon }), " ", interest.label] })] }, interest.id))) })] }), _jsxs(ConsentBox, { children: [_jsxs("div", { className: "consent-item", children: [_jsx("input", { type: "checkbox", id: "emailConsent", name: "emailConsent", checked: formData.emailConsent, onChange: handleCheckboxChange }), _jsx("span", { children: "I agree to receive email updates about TVK Canada programs, events, and community news." })] }), _jsxs("div", { className: "consent-item", children: [_jsx("input", { type: "checkbox", id: "smsConsent", name: "smsConsent", checked: formData.smsConsent, onChange: handleCheckboxChange }), _jsx("span", { children: "I agree to receive SMS/text updates for time-sensitive announcements (optional)." })] })] }), _jsx(Button, { type: "submit", variant: "primary", size: "lg", fullWidth: true, disabled: isSubmitting, children: isSubmitting ? 'Joining...' : 'Join TVK Canada (Free)' })] })] }) }) })] }));
};
