# TVK Canada Backend API

Node.js/Express backend for TVK Canada fan club website.

## Features

- User authentication (JWT + Google OAuth)
- Membership management with Stripe payments
- Event management
- Gallery with file uploads
- Contact form handling
- Global network data

## Setup

1. Install dependencies: `npm install`
2. Configure environment variables in `.env`
3. Start server: `npm run dev`

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/google
- GET /api/auth/profile

### Membership
- GET /api/memberships/plans
- POST /api/memberships/subscribe

### Events
- GET /api/events
- POST /api/events (admin)
- POST /api/events/:id/rsvp

### Gallery
- GET /api/gallery
- POST /api/gallery/upload (admin)

### Contact
- POST /api/contact/submit

## Environment Variables

- MONGODB_URI
- JWT_SECRET
- STRIPE_SECRET_KEY
- GOOGLE_CLIENT_ID
- EMAIL_USER
- SESSION_SECRET