import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Membership Subscription Modal Component
 */
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Button } from '@components/Button';
import { membershipService } from '../services/api';
import { FaCheck } from 'react-icons/fa6';
const ModalOverlay = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.md};
`;
const ModalContent = styled.div `
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${theme.shadows.xl};
`;
const ModalHeader = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: ${theme.spacing.lg};

  h2 {
    color: ${theme.colors.primary};
    margin: 0;
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;
const CloseButton = styled.button `
  background: none;
  border: none;
  font-size: 24px;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  line-height: 1;

  &:hover {
    color: ${theme.colors.primary};
  }
`;
const FormGroup = styled.div `
  margin-bottom: ${theme.spacing.lg};

  label {
    display: block;
    margin-bottom: ${theme.spacing.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
  }

  input, select, textarea {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    font-size: ${theme.typography.fontSize.base};
    transition: border-color ${theme.transitions.base};

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;
const FileUploadArea = styled.div `
  border: 2px dashed ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
  cursor: pointer;
  transition: all ${theme.transitions.base};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.surface};
  }

  &.has-file {
    border-color: ${theme.colors.success};
    background: rgba(76, 175, 80, 0.1);
  }

  input[type="file"] {
    display: none;
  }

  .upload-text {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.sm};
  }

  .file-name {
    color: ${theme.colors.primary};
    font-weight: ${theme.typography.fontWeight.semibold};
  }
`;
const PlanSummary = styled.div `
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  border-left: 4px solid ${theme.colors.primary};

  .plan-title {
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
  }

  .plan-price {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
  }

  .plan-features {
    margin-top: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
  }
`;
const ErrorMessage = styled.div `
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid ${theme.colors.error};
  color: ${theme.colors.error};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
`;
export const MembershipModal = ({ isOpen, onClose, selectedPlan }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        studentId: null,
        timetable: null,
        university: '',
        program: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const planDetails = {
        monthly: { title: 'Monthly Plan', price: '$10/month', features: 'All membership benefits' },
        yearly: { title: 'Annual Plan', price: '$100/year', features: 'All benefits + 2 months free' },
        student: { title: 'Student Plan', price: '$5/month', features: 'Student benefits + verification required' }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleFileUpload = (e, fieldName) => {
        const file = e.target.files?.[0];
        if (file) {
            // Mobile-specific file size validation (5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                setError(`File "${file.name}" is too large. Please use a file smaller than 5MB.`);
                return;
            }
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                setError(`File type "${file.type}" is not supported. Please use JPG, PNG, or PDF.`);
                return;
            }
            console.log('File selected:', {
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2) + 'MB',
                type: file.type,
                fieldName: fieldName
            });
            setFormData(prev => ({ ...prev, [fieldName]: file }));
            setError(''); // Clear any previous errors
        }
    };
    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            setError('Please fill in all required fields');
            return false;
        }
        if (selectedPlan === 'student') {
            if (!formData.studentId || !formData.timetable || !formData.university || !formData.program) {
                setError('Please fill in all student verification fields and upload required documents');
                return false;
            }
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        // Mobile-specific retry logic
        const maxRetries = 3;
        let retryCount = 0;
        while (retryCount < maxRetries) {
            try {
                const formDataToSubmit = new FormData();
                // Add basic fields
                formDataToSubmit.append('plan', selectedPlan);
                formDataToSubmit.append('firstName', formData.firstName);
                formDataToSubmit.append('lastName', formData.lastName);
                formDataToSubmit.append('email', formData.email);
                formDataToSubmit.append('phone', formData.phone);
                formDataToSubmit.append('address', formData.address);
                formDataToSubmit.append('city', formData.city);
                formDataToSubmit.append('province', formData.province);
                formDataToSubmit.append('postalCode', formData.postalCode);
                // Add student fields if applicable
                if (selectedPlan === 'student') {
                    formDataToSubmit.append('university', formData.university);
                    formDataToSubmit.append('program', formData.program);
                    if (formData.studentId)
                        formDataToSubmit.append('studentId', formData.studentId);
                    if (formData.timetable)
                        formDataToSubmit.append('timetable', formData.timetable);
                }
                console.log('Submitting subscription (attempt:', retryCount + 1, '):', selectedPlan);
                console.log('Mobile detection:', {
                    userAgent: navigator.userAgent,
                    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                    connection: navigator.connection?.effectiveType
                });
                const response = await membershipService.createSubscription(formDataToSubmit);
                console.log('Subscription response (attempt:', retryCount + 1, '):', response);
                // Success - redirect to Stripe checkout
                if (response.checkoutUrl) {
                    console.log('Redirecting to Stripe (attempt:', retryCount + 1, '):', response.checkoutUrl);
                    // Mobile-specific redirect handling
                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        // For mobile devices, use window.open for better compatibility
                        const popup = window.open(response.checkoutUrl, '_self');
                        if (!popup) {
                            // Fallback if popup blocked
                            window.location.href = response.checkoutUrl;
                        }
                    }
                    else {
                        window.location.href = response.checkoutUrl;
                    }
                    return; // Success, exit function
                }
                else {
                    throw new Error('No checkout URL received from server');
                }
            }
            catch (err) {
                retryCount++;
                console.log(`Subscription error (attempt ${retryCount}):`, err);
                // Check if it's a network error that should be retried
                const isRetryableError = err.code === 'NETWORK_ERROR' ||
                    err.code === 'TIMEOUT' ||
                    err.message?.includes('Network Error') ||
                    err.message?.includes('timeout') ||
                    (err.response?.status >= 500 && err.response?.status <= 599);
                if (retryCount < maxRetries && isRetryableError) {
                    console.log(`Retrying in ${retryCount * 1000}ms...`);
                    await new Promise(resolve => setTimeout(resolve, retryCount * 1000)); // Progressive delay
                    continue; // Retry
                }
                // Final error handling
                console.error('Final error response:', err.response?.data);
                console.error('Full error object:', {
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    data: err.response?.data,
                    message: err.message,
                    code: err.code
                });
                // Mobile-specific error messages
                let errorMessage = 'Failed to create subscription. Please try again.';
                if (err.code === 'NETWORK_ERROR' || err.message?.includes('Network Error')) {
                    errorMessage = 'Network connection issue. Please check your internet connection and try again.';
                }
                else if (err.code === 'TIMEOUT' || err.message?.includes('timeout')) {
                    errorMessage = 'Request timed out. Please check your connection and try again.';
                }
                else if (err.response?.status === 413) {
                    errorMessage = 'File size too large. Please use smaller images for student documents.';
                }
                else if (err.response?.status >= 500) {
                    errorMessage = 'Server error. Please try again in a few moments.';
                }
                else if (err.response?.data?.message) {
                    errorMessage = err.response.data.message;
                }
                setError(errorMessage);
                break; // Exit retry loop
            }
        }
        setLoading(false);
    };
    if (!isOpen)
        return null;
    return (_jsx(ModalOverlay, { onClick: onClose, children: _jsxs(ModalContent, { onClick: e => e.stopPropagation(), children: [_jsxs(ModalHeader, { children: [_jsxs("h2", { children: ["Subscribe to ", planDetails[selectedPlan].title] }), _jsx(CloseButton, { onClick: onClose, children: "\u00D7" })] }), _jsxs(PlanSummary, { children: [_jsx("div", { className: "plan-title", children: planDetails[selectedPlan].title }), _jsx("div", { className: "plan-price", children: planDetails[selectedPlan].price }), _jsx("div", { className: "plan-features", children: planDetails[selectedPlan].features })] }), error && _jsx(ErrorMessage, { children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(FormGroup, { children: [_jsx("label", { children: "First Name *" }), _jsx("input", { type: "text", name: "firstName", value: formData.firstName, onChange: handleInputChange, required: true })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "Last Name *" }), _jsx("input", { type: "text", name: "lastName", value: formData.lastName, onChange: handleInputChange, required: true })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "Email *" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, required: true })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "Phone *" }), _jsx("input", { type: "tel", name: "phone", value: formData.phone, onChange: handleInputChange, required: true })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "Address" }), _jsx("textarea", { name: "address", value: formData.address, onChange: handleInputChange, placeholder: "Street address" })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "City" }), _jsx("input", { type: "text", name: "city", value: formData.city, onChange: handleInputChange })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "Province" }), _jsxs("select", { name: "province", value: formData.province, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Select Province" }), _jsx("option", { value: "AB", children: "Alberta" }), _jsx("option", { value: "BC", children: "British Columbia" }), _jsx("option", { value: "MB", children: "Manitoba" }), _jsx("option", { value: "NB", children: "New Brunswick" }), _jsx("option", { value: "NL", children: "Newfoundland and Labrador" }), _jsx("option", { value: "NS", children: "Nova Scotia" }), _jsx("option", { value: "ON", children: "Ontario" }), _jsx("option", { value: "PE", children: "Prince Edward Island" }), _jsx("option", { value: "QC", children: "Quebec" }), _jsx("option", { value: "SK", children: "Saskatchewan" }), _jsx("option", { value: "NT", children: "Northwest Territories" }), _jsx("option", { value: "NU", children: "Nunavut" }), _jsx("option", { value: "YT", children: "Yukon" })] })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "Postal Code" }), _jsx("input", { type: "text", name: "postalCode", value: formData.postalCode, onChange: handleInputChange, placeholder: "A1A 1A1" })] }), selectedPlan === 'student' && (_jsxs(_Fragment, { children: [_jsxs(FormGroup, { children: [_jsx("label", { children: "University/College *" }), _jsx("input", { type: "text", name: "university", value: formData.university, onChange: handleInputChange, placeholder: "e.g., University of Toronto", required: true })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "Program/Major *" }), _jsx("input", { type: "text", name: "program", value: formData.program, onChange: handleInputChange, placeholder: "e.g., Computer Science", required: true })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "Student ID Document *" }), _jsxs(FileUploadArea, { className: formData.studentId ? 'has-file' : '', onClick: () => document.getElementById('studentId')?.click(), children: [_jsx("input", { type: "file", id: "studentId", accept: ".jpg,.jpeg,.png,.pdf", onChange: (e) => handleFileUpload(e, 'studentId') }), _jsx("div", { className: "upload-text", children: formData.studentId ? (_jsxs("div", { className: "file-name", children: [_jsx(FaCheck, { style: { marginRight: '4px', color: theme.colors.primary } }), " ", formData.studentId.name] })) : (_jsxs("div", { children: [_jsx("div", { children: "Click to upload Student ID" }), _jsx("small", { children: "JPG, PNG, or PDF (max 5MB)" })] })) })] })] }), _jsxs(FormGroup, { children: [_jsx("label", { children: "Current Timetable/Enrollment Proof *" }), _jsxs(FileUploadArea, { className: formData.timetable ? 'has-file' : '', onClick: () => document.getElementById('timetable')?.click(), children: [_jsx("input", { type: "file", id: "timetable", accept: ".jpg,.jpeg,.png,.pdf", onChange: (e) => handleFileUpload(e, 'timetable') }), _jsx("div", { className: "upload-text", children: formData.timetable ? (_jsxs("div", { className: "file-name", children: [_jsx(FaCheck, { style: { marginRight: '4px', color: theme.colors.primary } }), " ", formData.timetable.name] })) : (_jsxs("div", { children: [_jsx("div", { children: "Click to upload Timetable" }), _jsx("small", { children: "JPG, PNG, or PDF (max 5MB)" })] })) })] })] })] })), _jsxs("div", { style: { display: 'flex', gap: theme.spacing.md, marginTop: theme.spacing.xl }, children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, style: { flex: 1 }, children: "Cancel" }), _jsx(Button, { type: "submit", variant: "primary", disabled: loading, style: { flex: 1 }, children: loading ? 'Processing...' : 'Proceed to Payment' })] })] })] }) }));
};
