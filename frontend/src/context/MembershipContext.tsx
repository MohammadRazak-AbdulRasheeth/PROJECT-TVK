/**
 * Membership Context for managing membership state across the application
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { membershipService } from '../services/api'
import type { Membership, MembershipPlan } from '../types'

interface MembershipContextType {
  memberships: Membership[]
  activePlans: MembershipPlan[]
  addMembership: (membership: Membership) => void
  updateMembership: (id: string, updates: Partial<Membership>) => void
  getMembershipById: (id: string) => Membership | undefined
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined)

export const MembershipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [activePlans, setActivePlans] = useState<MembershipPlan[]>([])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plans = await membershipService.getPlans()
        setActivePlans(plans.map((plan: any) => ({
          id: plan.id,
          type: plan.id,
          price: plan.price / 100, // Convert cents to dollars
          currency: 'USD',
          description: plan.name,
          perks: [
            'Official TVK Canada membership card',
            'Priority access to community events',
            'Member discounts with partners',
            'Early access to program registration',
            'Community updates and newsletter',
          ],
        })))
      } catch (error) {
        console.error('Failed to fetch membership plans:', error)
      }
    }
    fetchPlans()
  }, [])

  const addMembership = (membership: Membership) => {
    setMemberships((prev) => [...prev, membership])
  }

  const updateMembership = (id: string, updates: Partial<Membership>) => {
    setMemberships((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    )
  }

  const getMembershipById = (id: string) => {
    return memberships.find((m) => m.id === id)
  }

  return (
    <MembershipContext.Provider
      value={{
        memberships,
        activePlans,
        addMembership,
        updateMembership,
        getMembershipById,
      }}
    >
      {children}
    </MembershipContext.Provider>
  )
}

/**
 * Hook to use membership context
 */
export const useMembership = () => {
  const context = useContext(MembershipContext)
  if (!context) {
    throw new Error('useMembership must be used within MembershipProvider')
  }
  return context
}
