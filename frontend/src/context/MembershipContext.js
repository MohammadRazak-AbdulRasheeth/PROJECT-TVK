import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Membership Context for managing membership state across the application
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { membershipService } from '../services/api';
const MembershipContext = createContext(undefined);
export const MembershipProvider = ({ children }) => {
    const [memberships, setMemberships] = useState([]);
    const [activePlans, setActivePlans] = useState([]);
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const plans = await membershipService.getPlans();
                setActivePlans(plans.map((plan) => ({
                    id: plan.id,
                    type: plan.id,
                    price: plan.price / 100, // Convert cents to dollars
                    currency: 'USD',
                    description: plan.name,
                    perks: [
                        'Official TVK Canada membership card',
                        'Access to exclusive events',
                        'Member-only discounts with partners',
                        'Early access to event registration',
                        'Community forum access',
                    ],
                })));
            }
            catch (error) {
                console.error('Failed to fetch membership plans:', error);
            }
        };
        fetchPlans();
    }, []);
    const addMembership = (membership) => {
        setMemberships((prev) => [...prev, membership]);
    };
    const updateMembership = (id, updates) => {
        setMemberships((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
    };
    const getMembershipById = (id) => {
        return memberships.find((m) => m.id === id);
    };
    return (_jsx(MembershipContext.Provider, { value: {
            memberships,
            activePlans,
            addMembership,
            updateMembership,
            getMembershipById,
        }, children: children }));
};
/**
 * Hook to use membership context
 */
export const useMembership = () => {
    const context = useContext(MembershipContext);
    if (!context) {
        throw new Error('useMembership must be used within MembershipProvider');
    }
    return context;
};
