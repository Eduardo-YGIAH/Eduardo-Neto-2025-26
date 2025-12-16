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
  - "EDUARDO NETO" animates in the center with an SVG line-drawing effect: each letter draws left→right with a stagger; the entire name fills only after all letters complete
  - Fill color matches the orange stroke with slight transparency (no pure white fill)
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

## Git Workflow & Branching

**CRITICAL:** All Git operations must follow our documented workflow:

- **Branching Strategy**: See [`docs/branching-strategy.md`](./docs/branching-strategy.md) — The "what" and "why"
- **Daily Workflow**: See [`docs/git-workflow.md`](./docs/git-workflow.md) — Step-by-step commands

### Key Rules for AI Agents

- ✅ Always create branches from `dev`: `git checkout dev && git pull && git checkout -b feature/name`
- ✅ Never merge directly into `main` — always go through `dev` first
- ✅ Use "Rebase and Merge" only — never create merge commits
- ✅ Rebase feature branches onto `dev` before opening PRs
- ⚠️ **NEVER** rebase `dev` onto `main` unless explicitly asked (maintainers only)
- ✅ Use `--force-with-lease` (never `--force`) when force pushing after rebase
- ✅ Keep commits focused and use conventional commit messages (`feat:`, `fix:`, `chore:`, etc.)

### Branch Naming

| Type | Pattern | Purpose |
|------|---------|---------|
| Feature | `feature/*` | New functionality |
| Fix | `fix/*` | Bug fixes |
| Chore | `chore/*` | Non-feature tasks (CI, tooling, configs) |
| Refactor | `refactor/*` | Internal improvements |

When suggesting Git commands, always reference these docs and ensure compliance.

---

## Implementation Snapshot — 2025-11-05

### Global Layout & Branding

- **Persistent navigation + footer** live in `app/layout.tsx`, delivering the sticky header, quick links, and footer CTA specified in the plan.
- **Vanta dots background** is implemented via the client component `app/components/VantaDots.tsx`, importing `three` + `vanta` and matching the prescribed parameters.
- **Hero typography & animation** use the custom `Monoton` font stored in `public/fonts/` and orchestrated by `app/components/AnimatedHeroName.tsx`, which parses glyphs with `opentype.js` to drive the SVG line-drawing sequence. Supporting animation classes live in `app/globals.css`.

### Home Experience

- `app/page.tsx` keeps the hero centered after the intro animation, uses the animated name component, and applies staggered entry animations for the tagline and case-study cards (see CSS hooks in `app/globals.css`).
- Featured case-study CTA data mirrors the plan’s three flagship projects with direct links into the detailed write-ups.

### Case Studies

- `app/case-studies/page.tsx` renders the translucent card grid with hover elevation as described.
- Each individual page (financial-services, commercial-banking, internal-project, retail-travel) builds the Problem/Solution/Outcome narrative and now links into relevant interactive demos under `/demos/*` for further proof.

### Blog

- `app/blog/posts.ts` centralizes post metadata (cover art, tags, reading time, “coming soon” flags).
- `app/blog/page.tsx` ships the gallery layout with responsive images (remote patterns configured in `next.config.ts`) and badge styling per plan.
- `app/blog/[slug]/page.tsx` delivers statically generated articles. The RTK Query deep dive is fully written; remaining slugs currently render “write-up in progress” placeholders.

### About & Contact

- `app/about/page.tsx` covers the sommelier-to-engineer arc, provides the CV download, and enumerates core skills.
- `app/contact/page.tsx` lists actionable LinkedIn/GitHub links with room for a future form.

### Interactive Demos

- `/demos` introduces the “Portfolio as Demo” section with tabbed subpages. The RTK Query caching demo is complete with mirrored naive vs optimized implementations, live network metrics, and mutation flows (`demos/rtk-query/*`). Rendering performance and component library tabs currently show placeholders noting upcoming work.
- Shared UI primitives live in `app/components/demos/` (tab navigation, metric badges, render counters, Prism-powered code panes).
- The demo code references real data via RTK Query slices and records metrics through `lib/metrics/networkTracker.ts` + `lib/metrics/useRenderCount.ts`.

### API Layer & Data

- `app/api/demos/items/route.ts` and `[id]/route.ts` provide filterable list data with configurable latency/error simulation, powering all demos without exposing sensitive client data.
- `app/api/demos/items/data.ts` seeds deterministic sample data in memory.

### Tooling & Testing

- `package.json` adds `@reduxjs/toolkit`, `react-redux`, `opentype.js`, `three`, `vanta`, `prismjs`, `diff`, and Vitest-related libs, alongside new `test` scripts.
- `vitest.config.mts` scopes tests to the demo suite with coverage reporting and an alias for `@/`.
- `demos/rtk-query/__tests__/itemsApi.test.ts` validates request de-duplication, cache invalidation, and TTL behaviour against the RTK Query slice.

### Types, Assets, & Config

- Custom `.d.ts` shims in `types/` cover `opentype.js`, `prismjs`, `vanta`, `three`, and vitest diff helpers.
- `next.config.ts` whitelists Cloudinary hosts for remote blog artwork.
- `public/fonts/` stores Monoton + Montserrat weights referenced across typography.

### Outstanding Follow-Ups

- Replace placeholder demo tabs for rendering performance and the component library with full implementations (including code/tests snapshots).
- Flesh out the three remaining blog posts and wire subscription mechanics if desired.
- Update footer and contact links with final GitHub/LinkedIn URLs plus the public “View Source” repository link.
- Enhance About with richer storytelling sections once case-study screenshots are ready.
- Consider adding the optional contact form and ensuring CV download assets live in `public/`.
