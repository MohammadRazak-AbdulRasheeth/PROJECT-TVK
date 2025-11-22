# TVK Canada Frontend - Architecture & File Structure

## Project Directory Tree

```
TVK-PROJECT/
├── .github/
│   └── copilot-instructions.md    # AI coding guidelines (UPDATED)
├── src/
│   ├── App.tsx                    # Main app with React Router
│   ├── main.tsx                   # React entry point
│   │
│   ├── components/
│   │   ├── Button.tsx             # Styled button component (4 variants)
│   │   ├── Header.tsx             # Sticky header with navigation
│   │   ├── Footer.tsx             # Footer with social links
│   │   └── Layout.tsx             # Layout primitives (Container, Grid, Flex, Section)
│   │
│   ├── pages/
│   │   ├── Home.tsx               # Landing page (hero, highlights, events, CTA)
│   │   ├── About.tsx              # About page (mission, values, activities)
│   │   ├── Membership.tsx         # Membership page (pricing, stepper, FAQ)
│   │   ├── Contact.tsx            # Contact page (form, details, partnership)
│   │   ├── Events.tsx             # Events Calendar stub
│   │   ├── GlobalNetwork.tsx      # Global Network stub
│   │   └── Gallery.tsx            # Gallery stub
│   │
│   ├── context/
│   │   └── MembershipContext.tsx  # Global membership state & provider
│   │
│   ├── styles/
│   │   ├── theme.ts               # Design tokens (colors, spacing, typography)
│   │   └── GlobalStyles.ts        # Global CSS reset & base styles
│   │
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces & types
│   │
│   ├── utils/
│   │   └── helpers.ts             # Utilities (validation, formatting, debounce)
│   │
│   ├── services/
│   │   └── (placeholder for API integration)
│   │
│   └── hooks/
│       └── (placeholder for custom hooks)
│
├── index.html                     # HTML entry point
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript config with path aliases
├── tsconfig.node.json             # Vite TypeScript config
├── vite.config.ts                 # Vite configuration
├── .gitignore                     # Git ignore rules
├── README.md                      # Full documentation
├── BUILD_SUMMARY.md               # This build summary
└── quick-start.sh                 # Quick start script
```

---

## Component Hierarchy

```
App (React Router)
├── ThemeProvider (styled-components)
│   └── GlobalStyles
│   └── MembershipProvider (Context)
│       └── Router
│           ├── Header (Sticky)
│           │   ├── Logo
│           │   ├── Nav
│           │   └── Button (Join CTA)
│           │
│           ├── Routes (main)
│           │   ├── / → HomePage
│           │   │   ├── HeroSection
│           │   │   ├── HighlightCards (Grid)
│           │   │   └── EventPreview
│           │   │
│           │   ├── /about → AboutPage
│           │   │   ├── MissionStatement
│           │   │   ├── ValueCards (Grid: 3 cols)
│           │   │   └── ActivitiesGrid (Grid: 2 cols)
│           │   │
│           │   ├── /membership → MembershipPage
│           │   │   ├── OfferBanner
│           │   │   ├── PricingCards (Grid: 2 cols)
│           │   │   ├── Stepper (4 steps)
│           │   │   └── FAQAccordion (Details/Summary)
│           │   │
│           │   ├── /contact → ContactPage
│           │   │   ├── ContactForm (FormGroup inputs)
│           │   │   ├── ContactInfo
│           │   │   └── PartnershipCTA
│           │   │
│           │   ├── /events → EventsPage
│           │   ├── /global-network → GlobalNetworkPage
│           │   ├── /gallery → GalleryPage
│           │   └── /* → 404 Page
│           │
│           └── Footer
│               ├── FooterSections (Grid: 4 cols)
│               └── SocialLinks
```

---

## Data Flow Architecture

```
MembershipContext
├── State: memberships[], activePlans[]
├── Actions:
│   ├── addMembership(membership)
│   ├── updateMembership(id, updates)
│   └── getMembershipById(id)
└── Consumer: useMembership() hook

Pages
├── HomePage (Display highlights, CTAs)
├── MembershipPage (Select plan, view pricing)
├── ContactPage (Form submission)
└── Others (Content display)

Utilities
├── Validation (validateEmail, validateContactForm)
├── Formatting (formatDate, formatDateTime)
└── Helpers (debounce, scrollToElement, getSocialShareUrl)
```

---

## Routing Map

```
App
├── / (HomePage)
│   └── Hero + Highlights + Events Preview + CTA
│
├── /about (AboutPage)
│   └── Mission + Values + Activities
│
├── /membership (MembershipPage)
│   └── Pricing + Stepper + FAQ
│
├── /contact (ContactPage)
│   └── Form + Contact Info + Partnership
│
├── /events (EventsPage)
│   └── Calendar Integration (stub)
│
├── /global-network (GlobalNetworkPage)
│   └── World Map + Regional Groups (stub)
│
├── /gallery (GalleryPage)
│   └── Photo Grid + Carousel (stub)
│
└── /* (404)
    └── Page Not Found
```

---

## Color & Design Token Flow

```
theme.ts (Single Source of Truth)
├── colors
│   ├── primary (#C41E3A) → Buttons, headings, CTAs
│   ├── secondary (#FFD700) → Accents, highlights, badges
│   ├── text { primary, secondary, light, inverse }
│   ├── surface (#F5F5F5) → Cards, sections
│   └── border (#DDDDDD) → Dividers
│
├── spacing
│   ├── xs → xxxl (8px scale)
│   └── Used in padding, margins, gaps
│
├── breakpoints
│   ├── mobile (480px)
│   ├── tablet (768px)
│   ├── desktop (1024px)
│   └── wide (1440px)
│
├── typography
│   ├── fontFamily { primary, heading }
│   ├── fontSize (xs → 5xl)
│   ├── fontWeight (light → extrabold)
│   └── lineHeight (tight → loose)
│
├── shadows (sm → 2xl)
├── borderRadius (sm → full)
└── transitions (fast, base, slow)

↓↓↓ Applied to ↓↓↓

All Styled Components
└── Referenced as: theme.colors.primary, theme.spacing.lg, etc.
```

---

## Form Validation Flow

```
User Input (ContactPage, etc.)
  ↓
validateContactForm(formData)
  ├── Check fullName (required)
  ├── Check email (validateEmail)
  ├── Check phone (validatePhone if provided)
  ├── Check subject (required)
  └── Check message (min 10 chars)
  ↓
Returns errors object: { field: "Error message" }
  ↓
Display inline errors near form fields
  ↓
On submit: Form submission handler
```

---

## Responsive Breakpoint Strategy

```
Desktop (1024px+)
├── 3-column grids
├── Full navigation
├── Large typography
└── Full spacing

Tablet (768px - 1023px)
├── 2-column grids
├── Adjusted spacing
├── Medium typography
└── Optimized layout

Mobile (480px - 767px)
├── Single column
├── Compact spacing
├── Readable text
└── Touch-friendly buttons
```

---

## Accessibility Implementation

```
Semantic HTML
├── <section> (page sections)
├── <article> (content blocks)
├── <nav> (navigation)
├── <form> (forms)
├── <button> (interactive)
└── <label> with htmlFor

Interactive Elements
├── :focus-visible styling
├── ARIA labels on icons
├── Color contrast ≥ 4.5:1
└── Keyboard navigation support

Forms
├── Proper <label> elements
├── Error messages inline
├── Required field indicators
└── Submit feedback
```

---

## Development Commands Quick Reference

```bash
# Setup
npm install                 # Install dependencies

# Development
npm run dev                # Start dev server (http://localhost:3000)
npm run build              # Production build → dist/
npm run preview            # Preview prod build
npm run type-check         # TypeScript validation
npm run lint               # ESLint

# Workflow
# 1. Edit files in src/
# 2. Hot reload auto-triggered
# 3. Check console for errors
# 4. Test responsive (F12 → toggle device)
# 5. npm run build when ready
```

---

## Key File Purposes

| File | Purpose |
|------|---------|
| `App.tsx` | Main router, ThemeProvider, MembershipProvider |
| `theme.ts` | All design tokens (colors, spacing, typography) |
| `GlobalStyles.ts` | CSS reset, base element styling |
| `MembershipContext.tsx` | Global membership state |
| `helpers.ts` | Validation, formatting, utility functions |
| `Button.tsx` | Reusable button with 4 variants |
| `Header.tsx` | Sticky navigation with logo & CTA |
| `Footer.tsx` | Footer with social links |
| `Layout.tsx` | Container, Grid, Flex, Section primitives |
| `Home.tsx` | Landing page with hero & highlights |
| `Membership.tsx` | Pricing, stepper, FAQ (most complex page) |
| `Contact.tsx` | Form, contact info, partnership CTA |

---

## Performance Optimization Opportunities

```
Ready to Implement:
├── Code splitting (React.lazy on pages)
├── Image optimization
├── CSS-in-JS optimization
├── Minification (Vite built-in)
└── Tree shaking (Vite built-in)

Consider Adding:
├── Service workers (PWA)
├── Font preloading
├── Image lazy loading
└── Form debouncing
```

---

## Integration Points Ready

```
Backend API
└── Create: src/services/api.ts
   └── Use axios client
   └── Add BASE_URL to .env

Google Calendar
└── Events.tsx → Embed or API integration

Payment Processing
└── Membership.tsx → Form submission handler

Authentication
└── Create: src/context/AuthContext.tsx
└── Add auth guard to protected routes
```

---

## Version Info

- **React**: 18.3+
- **TypeScript**: 5.3+
- **Vite**: 5.0+
- **Node**: 16+ recommended
- **npm**: 8+

---

## Project Status Summary

```
✅ COMPLETE
├── Project scaffolding
├── Component library
├── Page layouts
├── Routing setup
├── State management
├── Styling system
├── Type definitions
├── Utility functions
├── Documentation
└── Accessibility foundation

🟡 READY FOR ENHANCEMENT
├── API integration
├── Authentication
├── Payment processing
├── Advanced components
└── Testing suite

🔄 FUTURE
├── Admin dashboard
├── Analytics
├── Email notifications
└── Mobile app
```

---

**Build Date**: November 22, 2025
**Status**: 🟢 Ready to Code
**Next Action**: `npm install && npm run dev`
