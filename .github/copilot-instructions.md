# GitHub Copilot Custom Instructions for TVK Canada Full-Stack Application

## Project Overview
TVK Canada is a **full-stack web application** with React 18 + TypeScript + Vite frontend and Node.js + Express + MongoDB backend for a fan club website serving Thalapathy Vijay supporters in Canada. It features 7 core pages (Home, About Us, Membership, Events Calendar, Global Network, Gallery, Contact) with membership management, event handling, Stripe payments, OAuth authentication, and global community engagement.

## Architecture & Key Files

### Frontend (React/TypeScript)
**Critical Paths**:
- `src/App.tsx` – Main routing entry point; contains React Router setup and all 7 page routes
- `src/styles/theme.ts` – Single source of truth for TVK brand (red `#C41E3A`, gold `#FFD700`), spacing, breakpoints
- `src/context/MembershipContext.tsx` – Global membership state (plans, user memberships)
- `src/services/api.ts` – API service functions for backend communication
- `src/pages/` – All page components (Home, About, Membership, etc.)
- `src/components/Button.tsx`, `Layout.tsx`, `Header.tsx`, `Footer.tsx` – Core UI building blocks
- `src/utils/helpers.ts` – Validation, formatting, debounce utilities
- `frontend/package.json` – Check `scripts`: `npm run dev` (Vite dev server), `npm run build`, `npm run preview`

### Backend (Node.js/Express/MongoDB)
**Critical Paths**:
- `backend/server.js` – Main Express server with middleware and routes
- `backend/models/` – MongoDB schemas (User, Event, Gallery, Contact)
- `backend/routes/` – API endpoints (auth, memberships, events, gallery, contact)
- `backend/middleware/auth.js` – JWT authentication middleware
- `backend/uploads/` – Local file storage for gallery images
- `backend/package.json` – Check `scripts`: `npm run dev` (nodemon), `npm start`

**Responsive Breakpoints** (in `theme.ts`):
- mobile: 480px
- tablet: 768px
- desktop: 1024px
- wide: 1440px

## Coding Style & Patterns

### Component Template
```tsx
// Use functional components with TypeScript props interface
interface ComponentProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export const MyComponent: React.FC<ComponentProps> = ({ title, variant = 'primary' }) => {
  return <StyledBox>{title}</StyledBox>;
}
```

### Styling Rules
- Always use `styled-components` imported from `src/styles/theme.ts`
- Reference design tokens: `theme.colors.primary`, `theme.spacing.lg`, `theme.breakpoints.tablet`
- **Every styled component must include mobile breakpoint**: `@media (max-width: ${theme.breakpoints.tablet})`
- Hover/focus states required for interactive elements (buttons, links)
- Example:
  ```tsx
  const StyledButton = styled.button`
    padding: ${theme.spacing.md};
    background: ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.secondary};
    }
    
    @media (max-width: ${theme.breakpoints.tablet}) {
      padding: ${theme.spacing.sm};
    }
  `;
  ```

### Accessibility Non-Negotiables
- Use semantic HTML: `<section>`, `<article>`, `<nav>`, `<button>` (not `<div>` as button)
- All interactive elements must have `:focus-visible` styling
- Icon buttons require `aria-label="description"`
- Forms: proper `<label>` tags with `htmlFor` attribute
- Use `role="main"` or semantic tags instead of generic divs for landmarks

### State Management
- **Global state**: Use `useMembership()` hook from `MembershipContext` for membership data
- **API state**: Use `api` instance from `src/utils/helpers.ts` for backend communication
- **Authentication**: JWT tokens stored in localStorage, auto-included in API requests
- **Form state**: `useState` for local form data, validate with `validateContactForm()` or `validateEmail()`
- **Context pattern**: If adding new context, follow `MembershipContext.tsx` structure (createContext, Provider, custom hook)

## Developer Workflows

### Start Local Dev
```bash
# Frontend
cd frontend && npm install && npm run dev
# Opens http://localhost:3000 with hot reload

# Backend (new terminal)
cd backend && npm install && npm run dev
# Runs on http://localhost:5000
```

### Build & Deploy
```bash
# Frontend
cd frontend && npm run build    # Creates optimized dist/ folder
cd frontend && npm run preview  # Test production build locally

# Backend
cd backend && npm start         # Production server
```

### Add New API Endpoint
1. Create/update model in `backend/models/`
2. Add route in `backend/routes/`
3. Add service function in `frontend/src/services/api.ts`
4. Use in component with error handling

### Add New Page
1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx` Routes section
3. Add NavLink in `src/components/Header.tsx` Nav component
4. Use existing page templates (Home.tsx, About.tsx) as reference for styling

### Add New Component
1. Create in `src/components/MyComponent.tsx`
2. Use `styled` from styled-components and `theme` from `@styles/theme`
3. Export named export with `React.FC<Props>` type signature
4. Add JSDoc comment with `@example` usage

## Project-Specific Patterns

### Color Usage
- **Primary (Red)**: CTAs, headings, active states → `theme.colors.primary`
- **Secondary (Gold)**: Highlights, badges, success states → `theme.colors.secondary`
- **Text**: Always from `theme.colors.text.*` (primary, secondary, light, inverse)
- **Backgrounds**: Use `theme.colors.surface` for cards/sections, `background` for page baseline

### Membership Pages Pattern
- Pricing cards: `<PricingCard featured={selectedPlan === 'yearly'}>` (see Membership.tsx)
- Workflow stepper: Use numbered circles with conditional styling
- FAQ: Use `<details>` HTML element with `<summary>` for accordion behavior (see Membership.tsx, Contact.tsx)

### Form Validation
- Import helpers from `src/utils/helpers.ts`: `validateEmail()`, `validateContactForm()`
- Return object of errors: `{ email: "Invalid email", ...}`
- Display errors inline near form field
- Pattern in Contact.tsx

### Imports & Aliases
- Use path aliases: `@components/`, `@pages/`, `@styles/`, `@utils/`, `@types/`, `@context/`
- Example: `import { Button } from '@components/Button'`

## Backend Patterns

### API Route Structure
```javascript
// backend/routes/example.js
const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Public route
router.get('/public', (req, res) => { ... });

// Protected route
router.get('/protected', auth, (req, res) => { ... });

// Admin route
router.post('/admin', auth, adminAuth, (req, res) => { ... });

module.exports = router;
```

### Model Schema Pattern
```javascript
// backend/models/Example.js
const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Example', exampleSchema);
```

### Frontend API Service
```typescript
// src/services/api.ts
import { api } from '../utils/helpers'

export const exampleService = {
  getData: async () => {
    const response = await api.get('/example')
    return response.data
  },
  
  createData: async (data: any) => {
    const response = await api.post('/example', data)
    return response.data
  }
}
```

## When Uncertain
- Check similar existing page (e.g., if building new form page, reference Contact.tsx or Membership.tsx)
- Reference `README.md` for full architecture and conventions
- When adding utilities, place in `src/utils/helpers.ts` and export as named export
- For types, add to `src/types/index.ts`
- Always test mobile responsiveness (use browser dev tools at 768px and below)

## Integration Points
- **Backend API**: Complete Node.js/Express API with MongoDB Atlas; services in `src/services/api.ts` using axios; BASE_URL in `.env`
- **Authentication**: Google OAuth integrated in Header component
- **Payments**: Stripe checkout in Membership page
- **File Storage**: Local folder storage in backend/uploads/
- **Google Calendar**: Embed or API integration for Events page (see `src/pages/Events.tsx` stub)
- **Social Media**: Links configured in Footer and Contact pages; use `getSocialShareUrl()` utility
- **Email**: Nodemailer integration for contact forms

## Example Tasks

### Add Membership Card Display Component
1. Create `src/components/MembershipCard.tsx` with `Card`, `CardContent` styled components
2. Use `useMembership()` to fetch membership data
3. Apply TVK red/gold theme with gold border accent
4. Include responsive padding: `padding: ${theme.spacing.lg}` on desktop, `${theme.spacing.md}` on mobile
5. Validate card number display (mask last 4 digits for security)
6. Export as named export: `export const MembershipCard: React.FC<Props> = ...`

### Add New API Endpoint
1. Create model in `backend/models/NewModel.js`
2. Add route in `backend/routes/newRoute.js`
3. Add service function in `frontend/src/services/api.ts`
4. Use in component with loading/error states
5. Test with Postman and frontend integration

---

**Key Command Reminders**:
- Frontend Dev: `cd frontend && npm run dev`
- Backend Dev: `cd backend && npm run dev`
- Frontend Build: `cd frontend && npm run build`
- Backend Start: `cd backend && npm start`
- Type check: `cd frontend && npm run type-check`
- Lint: `cd frontend && npm run lint`

Use this guidance to remain consistent with TVK Canada's modern, accessible, and visually cohesive full-stack application.

