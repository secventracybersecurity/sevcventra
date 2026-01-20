# Secventra - Premium Cybersecurity Website

## Overview

Secventra is a premium, investor-grade cybersecurity company website for a penetration testing and offensive security firm. The application follows a luxury design aesthetic inspired by Apple.com, featuring cinematic scroll-driven animations, glassmorphism panels, and a dark theme with neon cyber accents. The site targets enterprise clients and venture capital investors, positioning Secventra as a future $1B cybersecurity unicorn.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom dark cybersecurity theme
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for scroll-driven storytelling and micro-interactions
- **State Management**: TanStack React Query for server state
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Development**: Vite dev server with HMR proxied through Express
- **Production**: Static file serving from compiled Vite build

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all database table definitions
- **Migrations**: Drizzle Kit for schema management (`db:push` command)
- **Development Fallback**: In-memory storage (`MemStorage`) when database unavailable

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Data access layer
shared/           # Shared code between client/server
  schema.ts       # Drizzle database schemas
```

### Design System
The site follows strict design guidelines defined in `design_guidelines.md`:
- Color palette: Dark slate blue base with professional blue (#3b82f6) and gold (#f59e0b) accents
- Typography: Large hero headlines (text-6xl to text-8xl), Inter font family
- Glassmorphism: Semi-transparent panels with backdrop blur
- Animations: Slow, smooth, luxury-feeling transitions
- Enterprise aesthetic: Inspired by premium financial/tech brands

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage for PostgreSQL

### UI Framework
- **Radix UI**: Comprehensive set of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **shadcn/ui**: Pre-built component styling with Tailwind
- **Framer Motion**: Animation library for scroll effects and transitions
- **Embla Carousel**: Carousel component functionality

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation for forms and API requests
- **drizzle-zod**: Generates Zod schemas from Drizzle tables

### Build Tools
- **Vite**: Frontend bundler with React plugin
- **esbuild**: Server-side bundling for production
- **TypeScript**: Full type coverage across client and server

## Recent Changes (January 2026)

### Design Guideline Compliance
- Contact form uses `insertContactSchema` from `@shared/schema` with `.extend()` for client validation
- All Button components use shadcn size variants only (no manual px/py sizing)
- Navigation links converted to Button ghost variants (no custom hover colors)
- Footer social icons use Button with asChild pattern
- Removed all custom hover:bg-* and hover:text-* classes from interactive elements
- All interactive elements have data-testid attributes for testing

### Pages Implemented
1. **Home**: Cinematic hero, services preview, statistics section, client logos, CTA
2. **Services**: 6 detailed service offerings with methodology breakdowns
3. **About**: Mission statement, core values, leadership team
4. **Why Us**: Comparison table, testimonials carousel
5. **Case Studies**: 4 enterprise client success stories
6. **Careers**: Expandable job listings with requirements
7. **Blog**: Featured articles with category filtering
8. **Contact**: Form with shadcn Form/react-hook-form/zodResolver and TanStack Query mutation