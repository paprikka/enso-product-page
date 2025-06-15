# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server on localhost:3000
- `pnpm build` - Build production version
- `pnpm start` - Start production server

## Architecture

This is a Next.js product page for Ensō, a writing tool that separates writing from editing. The site uses TypeScript and SCSS modules for styling.

### Key Components Structure

- **Pages**: Single main page (`pages/index.tsx`) with social meta tags and Umami analytics
- **Components**: Modular React components in `/components/` directory, each with its own SCSS module
  - Hero section with download modal
  - Preview section showcasing the app
  - Value proposition sections
  - Download modal with platform-specific links
  - Footer
- **Tracking**: Analytics system (`components/tracking/index.ts`) that uses Umami in production and console logging in development
- **Styling**: Global SCSS variables in `styles/globals.scss` using CSS custom properties with responsive design

### Styling System

Uses CSS custom properties for theming:
- Color palette (primary: #ff3358, page: #fafafa)
- Typography (EB Garamond for body, system fonts for UI)
- Spacing using `rvr()` function based on `--baseline: 1.4`
- Responsive font sizing

### Analytics Integration

The site includes Umami analytics with event tracking for user interactions, particularly download button clicks. Local development shows mock tracking events in console.