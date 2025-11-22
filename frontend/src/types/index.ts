/**
 * TypeScript type definitions for TVK Canada
 */

export interface Membership {
  id: string
  userId?: string
  plan: 'monthly' | 'yearly'
  status: 'active' | 'inactive' | 'pending' | 'cancelled'
  joinDate: Date
  expiryDate?: Date
  cardNumber?: string
}

export interface MembershipPlan {
  id: string
  type: 'monthly' | 'yearly'
  price: number
  currency: string
  description: string
  perks: string[]
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  startTime: string
  endTime: string
  location: string
  isMemberOnly: boolean
  imageUrl?: string
  attendeeCount?: number
  calendarEventId?: string
}

export interface EventCategory {
  id: string
  name: string
  events: Event[]
}

export interface TVKRegion {
  id: string
  name: string
  country: string
  countryCode: string
  flagUrl?: string
  description: string
  memberCount?: number
  socialLinks: SocialLink[]
  hashtags: string[]
  photos: string[]
  videos?: string[]
}

export interface SocialLink {
  platform: 'twitter' | 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'whatsapp'
  url: string
  handle?: string
}

export interface ContactFormData {
  fullName: string
  email: string
  phone?: string
  city?: string
  subject: string
  message: string
}

export interface ContactFormSubmission extends ContactFormData {
  id: string
  submittedAt: Date
  status: 'pending' | 'reviewed' | 'resolved'
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

export interface GalleryItem {
  id: string
  title: string
  imageUrl: string
  videoUrl?: string
  eventDate?: Date
  description?: string
  tags?: string[]
}

export interface UserFormState {
  fullName: string
  email: string
  phone: string
  city: string
  subject: string
  message: string
}

export interface MembershipContext {
  memberships: Membership[]
  addMembership: (membership: Membership) => void
  updateMembership: (id: string, updates: Partial<Membership>) => void
  activePlans: MembershipPlan[]
}
