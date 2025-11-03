## Portfolio Plan: Eduardo Neto 2025

This document outlines the strategy, design, and content for your 2025 portfolio website. The core philosophy is a
**"Portfolio as Demo"**: the site itself proves your skills, complemented by detailed case studies that validate
confidential work.

## 1) Core Philosophy & Tech Stack

The site's primary goal is to demonstrate the skills of a Senior Front-End Engineer:

- **Portfolio as Demo**: The site is a high-quality, public codebase.
- **Case Study Gallery**: Expands on CV achievements, focusing on Problem, Solution, Outcome.
- **Technical Blog**: Demonstrates expertise, communication, and mentoring.

### Technology Stack & "Demo" Goals

Built to impress a technical hiring manager before they even read the content.

- **Framework**: Next.js (SSR, routing, performance)
- **Language**: TypeScript (modern, type-safe practices)
- **Styling**: Tailwind CSS or Styled Components (preference-based)
- **Testing**: Jest & React Testing Library (component coverage)
- **Repo**: Public on GitHub
- **CI/CD**: GitHub Actions runs tests and deploys (e.g., Vercel or Netlify)
- **Performance**: Target 100 Lighthouse score in all categories
- **Accessibility**: Fully WCAG 2.1 AA compliant

## 2) Design & Branding

Clean, modern, professional; aligns with the provided visual direction.

### Color Palette (from screenshot)

- **Background**: `0x222222` (dark grey)
- **Primary Accent (Orange)**: `0xff8820`
- **Text (Primary)**: `0xFFFFFF` (or slightly off-white)
- **Text (Secondary)**: light grey (e.g., `0xAAAAAA`)

### Typography

- **Headers**: Strong sans-serif (e.g., Inter, Montserrat)
- **Body**: Inter (highly readable and modern)

### Background Animation (Vanta.js)

- **Effect**: `dots`
- **Persistence**: Persistent on every page as a background element
- **Positioning**: Fixed full-screen background (covers entire viewport); wave base visually at the bottom; content layers above
- **Appearance**: Dots-wave only (no connecting lines)
- **Parameters**:
  - `effect: 'dots'`
  - `backgroundColor: 0x222222`
  - `color: 0xff8820`
  - `color2: 0xff8820`
  - `size: 3`
  - `spacing: 35`
  - `showLines: false`

## 3) Page-by-Page Structure

### Global Elements

- **Header/Nav**: Minimal, sticky; links to Home, Case Studies, Blog, About
- **Footer**: Links to GitHub, LinkedIn, and a "View Source" link for the portfolio

### Page 1: Home

This is the first impression.

- **Load-in Animation**:
  - Blank dark background
  - "Eduardo Neto" animates in the center with an SVG line-drawing effect: each letter draws from left to right using stroke-dash animation (orange accent)
  - After the wireframe is complete, the name fills to white
- **Hero Layout (post-animation)**:
  - "Eduardo Neto" hero remains centered at the top of the content area
  - Vanta.js "dots" renders as a fixed background wave at the bottom of the screen (behind content)
- **Content**:
  - **Tagline**: CV profile summary — "Front-End Engineer, ready for Senior level roles..."
  - **Case Study Links**: Three high-impact cards (e.g., "Financial Services App", "Commercial Banking Tool", "Internal
    Dev Platform")

### Page 2: Case Studies (The Proof)

The most important page: a gallery of anonymized projects. Each project has its own page.

- **Card Design**: Elevated translucent cards to improve readability over the Vanta background
  - Background: semi-transparent dark (`bg-black/45` → hover `bg-black/55`)
  - Elevation: soft shadow (`shadow-lg shadow-black/40`) and subtle border (`border-white/10`)

#### Case Study Page Template

- **Project Title**: e.g., "Enterprise Financial Dashboard"
- **Client**: "Major Financial Services Firm (Anonymized)"
- **Role**: "Lead Front-End Engineer"
- **Tech Stack**: Icons for React, TypeScript, RTK Query, etc.
- **1. The Challenge**: "Existing dashboard had slow loads and inconsistent data due to redundant API calls and
  unoptimized re-renders."
- **2. My Solution**: "Refactored core state management; led migration from Redux Thunks to RTK Query; designed
  tag-invalidation caching to target stale data without over-fetching; profiled the app and applied targeted memoization
  to eliminate unnecessary updates in high-traffic views."
- **3. The Outcome (Hero Metric)**: "~30% improvement in page load and re-render performance; measurably improved data
  consistency."

#### Projects to Create Case Studies For

- **Financial Services Firm**: ~30% performance boost; RTK Query caching strategy
- **Commercial Banking Client**: Stakeholder approval via demo; ~25% dev-time reduction from reusable components
- **Internal Project**: Mentoring students; 50% reduction in dev blockers via Mirage JS mock server
- **Retail/Travel Brands**: Legacy jQuery migration; implemented A/B testing infrastructure

### Page 3: Blog (The Expertise)

Demonstrates senior-level communication and thought leadership.

- **Purpose**: Expand on solutions from case studies
- **Initial Post Ideas**:
  - "When (and When Not) to use RTK Query: A Deep Dive into Caching Strategies"
  - "How We Cut Developer Blockers by 50% with a Mock Server"
  - "My Framework for Building Reusable Components that Cut Dev Time by 25%"
  - "From Sommelier to Software Engineer: 5 Lessons in User Experience"

### Page 4: About Me

- **The Story**: Share your motivated career-changer profile; journey from Head Sommelier to Software Engineer and how
  it improves your engineering (user focus, leadership, problem-solving under pressure)
- **CV Download**: Prominent button for finalized CV
- **Skills**: Clean list of core skills

### Page 5: Contact

- Simple, clean page with links to LinkedIn and GitHub
- Optional simple contact form
