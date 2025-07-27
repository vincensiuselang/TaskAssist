# Jasa Bantu Tugas - Modern Landing Page

## Overview

This is a modern, responsive landing page for a tutoring service specializing in coding and machine learning assignments. The application is built as a full-stack web application with a React frontend and Express backend, designed to showcase services and facilitate WhatsApp contact for student inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for server bundling

### Database Layer
- **ORM**: Drizzle ORM with TypeScript support
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Located in shared directory for type safety across frontend/backend

## Key Components

### Project Structure
```
├── client/               # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions and API client
├── server/               # Express backend
├── shared/               # Shared TypeScript types and schemas
└── migrations/           # Database migration files
```

### Frontend Components
- **Landing Page**: Modern, mobile-first design with hero section, services showcase, and testimonials
- **UI Components**: Complete shadcn/ui component library for consistent design
- **WhatsApp Integration**: Direct contact functionality with pre-filled messages
- **Responsive Design**: Tailwind CSS with mobile-first approach

### Backend Services
- **API Routes**: RESTful endpoints with /api prefix and comprehensive rate limiting
- **Storage Interface**: Database storage layer using PostgreSQL with Drizzle ORM
- **Session Management**: Secure PostgreSQL session store with HTTPS-only cookies
- **Security Layer**: Multi-layered security with Helmet, CORS, XSS protection, SQL injection prevention
- **Development Server**: Vite integration for hot reloading

## Data Flow

### Client-Server Communication
1. **API Requests**: Frontend uses fetch with credentials for API communication
2. **Query Management**: TanStack Query handles caching, loading states, and error handling
3. **Type Safety**: Shared schema definitions ensure consistent data types
4. **Error Handling**: Centralized error handling with user-friendly toast notifications

### Database Operations
1. **Schema Definition**: Drizzle schema with Zod validation in shared directory
2. **Type Generation**: Automatic TypeScript types from database schema
3. **Migration Strategy**: Version-controlled schema changes via Drizzle Kit
4. **Connection Management**: Neon serverless PostgreSQL for scalable database access

## External Dependencies

### Core Technologies
- **React Ecosystem**: React, React DOM, React Query for frontend state management
- **UI Framework**: Radix UI primitives with shadcn/ui styling system
- **Database**: Neon PostgreSQL serverless with Drizzle ORM
- **Build Tools**: Vite for frontend, esbuild for backend bundling

### Development Tools
- **TypeScript**: Full type safety across the stack
- **Tailwind CSS**: Utility-first styling with design system
- **PostCSS**: CSS processing with autoprefixer
- **ESLint/Prettier**: Code quality and formatting (implicitly configured)

### Third-Party Integrations
- **WhatsApp Business API**: Direct messaging integration for customer contact
- **Font Awesome**: Icon library for visual elements
- **Google Fonts**: Inter font family for typography
- **Replit Development**: Banner and cartographer plugins for development environment

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite development server with Express middleware integration
- **TypeScript Compilation**: Real-time type checking with tsx
- **Database Management**: Local development with environment variable configuration
- **Asset Serving**: Vite handles static assets with proper aliasing

### Production Build
- **Frontend**: Vite builds optimized React application to dist/public
- **Backend**: esbuild bundles Express server to dist/index.js
- **Database**: Drizzle migrations applied via npm scripts
- **Environment**: Production-ready with NODE_ENV configuration

### Scalability Considerations
- **Serverless Database**: Neon PostgreSQL supports automatic scaling
- **Static Assets**: Frontend built as static files for CDN deployment
- **API Design**: RESTful architecture supports horizontal scaling
- **Session Storage**: PostgreSQL-backed sessions for stateful authentication

### Security Measures (Enhanced - July 27, 2025)
- **Multi-Layer Protection**: Helmet.js for security headers, CORS, rate limiting, XSS prevention
- **Input Validation**: Comprehensive validation with Zod schemas, SQL injection prevention, XSS filtering
- **Session Security**: Secure sessions with HttpOnly cookies, SameSite protection, HTTPS enforcement
- **Database Security**: Connection pooling, SSL encryption, prepared statements via Drizzle ORM
- **Rate Limiting**: Tiered rate limiting (general, API, strict) with IP-based tracking
- **Content Security Policy**: Strict CSP headers preventing code injection attacks
- **Environment Variables**: Secure configuration management with validation
- **Error Handling**: Sanitized error responses preventing information leakage
- **Security Monitoring**: Health check endpoints and security header validation