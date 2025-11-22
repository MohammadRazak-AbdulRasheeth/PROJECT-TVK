# TVK Canada - Frontend React Application

Official website for TVK Canada, a fan club and nonprofit association dedicated to uniting Thalapathy Vijay supporters across Canada.

## Project Overview

TVK Canada is a modern React-based frontend featuring:

- **Multiple Pages**: Home, About Us, Membership, Events Calendar, Global Network, Gallery, and Contact
- **Member Management**: Membership plans, pricing tiers, and exclusive benefits tracking
- **Community Focus**: Event management, global network visualization, and cultural engagement
- **Responsive Design**: Mobile-first approach with TVK red/yellow theme
- **Accessibility**: WCAG compliant with semantic HTML and keyboard navigation

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Bundler**: Vite
- **Styling**: Styled Components with custom theme system
- **Routing**: React Router v6
- **State Management**: React Context API
- **UI Components**: Custom component library following TVK brand guidelines

## Project Structure

```
src/
├── components/        # Reusable UI components (Button, Layout, Header, Footer, etc.)
├── pages/            # Page components (Home, About, Membership, etc.)
├── context/          # React Context for global state (MembershipContext)
├── hooks/            # Custom React hooks
├── services/         # API calls and external service integrations
├── styles/           # Global styles, theme configuration, and utilities
├── types/            # TypeScript type definitions
├── utils/            # Helper functions and utilities
├── App.tsx           # Main app component with routing
└── main.tsx          # Application entry point

public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x

### Installation

1. **Install dependencies**:

```bash
npm install
```

2. **Start development server**:

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000` in your browser.

3. **Build for production**:

```bash
npm run build
```

4. **Preview production build**:

```bash
npm run preview
```

## Coding Conventions & Patterns

### Component Structure

All components use functional components with hooks:

```tsx
import React from 'react'
import styled from 'styled-components'
import { theme } from '@styles/theme'

const StyledWrapper = styled.div`
  padding: ${theme.spacing.lg};
`

interface ComponentProps {
  title: string
  onClick?: () => void
}

/**
 * Component description
 * @example
 * <MyComponent title="Example" />
 */
export const MyComponent: React.FC<ComponentProps> = ({ title, onClick }) => {
  return <StyledWrapper>{title}</StyledWrapper>
}
```

### Styling Approach

- Use `styled-components` for component-scoped styling
- Reference colors, spacing, and other values from the `theme` object in `src/styles/theme.ts`
- Always include mobile-first responsive design using breakpoints:
  - mobile: 480px
  - tablet: 768px
  - desktop: 1024px

```tsx
const StyledBox = styled.div`
  padding: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.md};
  }
`
```

### Color Theme

- **Primary (Red)**: `#C41E3A` - Main brand color
- **Secondary (Gold)**: `#FFD700` - Accent and highlights
- **Background**: `#FFFFFF`
- **Surface**: `#F5F5F5` - Card/section backgrounds
- **Text Primary**: `#1A1A1A`
- **Text Secondary**: `#666666`

### State Management

Use React Context for global state (membership status, user data):

```tsx
import { useMembership } from '@context/MembershipContext'

export const MyComponent: React.FC = () => {
  const { memberships, addMembership } = useMembership()
  // Use context...
}
```

For form state, use React `useState` hook:

```tsx
const [formData, setFormData] = useState({ email: '', name: '' })
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HomePage`, `ContactForm`)
- **Hooks**: camelCase with `use` prefix (e.g., `useMembership`, `useFormValidation`)
- **Styled Components**: PascalCase or descriptive (e.g., `HeroSection`, `NavLink`)
- **Files**: Match component/export name (e.g., `Button.tsx` exports `Button`)
- **Types**: PascalCase (e.g., `Membership`, `ContactFormData`)

### Accessibility Best Practices

- Use semantic HTML: `<section>`, `<article>`, `<nav>`, `<form>`, etc.
- Include `aria-label` for icon buttons
- Ensure keyboard navigation with `:focus-visible` styles
- Use `type="button"` for buttons that aren't form submission
- Include `alt` text for images
- Test with screen readers (NVDA, JAWS)

## Key Pages & Features

### Home Page (`src/pages/Home.tsx`)

- Hero section with TVK branding
- Membership highlights (3 key cards)
- Upcoming events preview
- Global network teaser
- Prominent CTAs

### Membership Page (`src/pages/Membership.tsx`)

- Pricing cards (monthly $10, yearly $100)
- First 200 members free offer
- Membership workflow stepper (4 steps)
- FAQ accordion with 5+ questions
- Plan selection UI

### About Us Page (`src/pages/About.tsx`)

- Mission statement
- Core values (Unity, Democracy, Respect)
- Activities sections (6 categories)
- Community-centric messaging

### Contact Us Page (`src/pages/Contact.tsx`)

- Contact form with validation
- Email/WhatsApp contact details
- Corporate partnership CTA
- Social media links

### Events Calendar Page (`src/pages/Events.tsx`)

- Placeholder for Google Calendar integration
- Event listing with filters
- Member-only event indicator
- RSVP functionality (future)

### Global Network Page (`src/pages/GlobalNetwork.tsx`)

- World map or visual representation
- Featured fan groups carousel
- Regional details and social links
- Shared values section

### Gallery Page (`src/pages/Gallery.tsx`)

- Photo grid layout (9+ photos)
- Video gallery integration (future)
- Event tagging and filtering
- Lightbox/modal viewing

## Component Library

### Reusable Components

- **Button**: `<Button variant="primary|secondary|outline|ghost" size="sm|md|lg" />`
- **Layout**: `<Container>`, `<Section>`, `<Grid>`, `<Flex>`
- **Header**: Sticky navigation with logo and Join CTA
- **Footer**: Social links, contact info, quick links

### Adding New Components

Create components in `src/components/` with:

1. TypeScript interfaces for props
2. Styled components for styling
3. JSDoc comments for documentation
4. Example usage in comments

```tsx
/**
 * Example Component
 * @example
 * <ExampleComponent prop1="value" />
 */
export const ExampleComponent: React.FC<ExampleProps> = (props) => {
  // ...
}
```

## Form Validation

Use utilities from `src/utils/helpers.ts`:

```tsx
import { validateEmail, validateContactForm } from '@utils/helpers'

const errors = validateContactForm(formData)
if (Object.keys(errors).length === 0) {
  // Submit form
}
```

## Routing

All routes configured in `src/App.tsx`:

```
/                -> Home
/about           -> About Us
/membership      -> Membership
/events          -> Events Calendar
/global-network  -> Global Network
/gallery         -> Past Events Gallery
/contact         -> Contact Us
```

## API Integration (Future)

When integrating with backend:

1. Create service in `src/services/api.ts` with axios instance
2. Configure BASE_URL in environment variables
3. Implement request/response interceptors for auth
4. Use async/await in components with error handling

```tsx
const response = await contactApi.submitForm(formData)
```

## Environment Variables

Create `.env` file in project root:

```
VITE_API_BASE_URL=https://api.tvkcanada.com
VITE_GOOGLE_CALENDAR_ID=your_calendar_id@gmail.com
VITE_WHATSAPP_NUMBER=+1234567890
```

Access in code: `import.meta.env.VITE_API_BASE_URL`

## Testing (Recommended Setup)

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

Test files: `src/__tests__/` or alongside components as `.test.tsx`

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@components/Button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## Building & Deployment

1. **Development**: `npm run dev` (hot reload enabled)
2. **Production Build**: `npm run build` (outputs to `dist/`)
3. **Type Check**: `npm run type-check`
4. **Lint**: `npm run lint`

## Performance Optimization Tips

- Lazy load pages using `React.lazy()` and `Suspense` in routing
- Use `useMemo` and `useCallback` for expensive computations
- Implement image optimization (next/image or similar)
- Monitor Core Web Vitals with Lighthouse

## Troubleshooting

### Port already in use

```bash
# Use different port
npm run dev -- --port 3001
```

### Dependencies not installing

```bash
rm -rf node_modules package-lock.json
npm install
```

### Type errors in IDE

Ensure `tsconfig.json` paths are configured correctly and IDE is using project's TypeScript.

## Contributing Guidelines

1. Follow the coding conventions above
2. Keep components focused and reusable
3. Add comments for non-obvious logic
4. Test responsive design on mobile/tablet
5. Ensure accessibility compliance
6. Submit PRs with clear descriptions

## License

© 2024 TVK Canada - All rights reserved

## Support

For questions or issues:
- Email: info@tvkcanada.com
- WhatsApp: +1 (XXX) XXX-XXXX

---

**Last Updated**: November 2024
