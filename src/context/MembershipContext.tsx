/**
 * Membership Context for managing membership state across the application
 */

import React, { createContext, useContext, useState, ReactNode } from 'react'
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

  const activePlans: MembershipPlan[] = [
    {
      id: 'monthly-plan',
      type: 'monthly',
      price: 10,
      currency: 'CAD',
      description: 'Monthly membership',
      perks: [
        'Official TVK Canada membership card',
        'Access to exclusive events',
        'Member-only discounts with partners',
        'Early access to event registration',
        'Community forum access',
      ],
    },
    {
      id: 'yearly-plan',
      type: 'yearly',
      price: 100,
      currency: 'CAD',
      description: 'Annual membership - Save $20!',
      perks: [
        'Official TVK Canada membership card',
        'Access to all exclusive events',
        'Premium partner discounts',
        'Priority event registration',
        'VIP community forum access',
        'Annual celebration event invitation',
      ],
    },
  ]

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
