# Eduardo Neto — Senior Front-End Engineer Portfolio

A modern, high-performance portfolio website built to demonstrate senior-level front-end engineering skills. This isn't just a portfolio — **the codebase itself is the demo**.

🔗 **Live Site**: [Coming Soon]

---

## 👨‍💻 About This Project

This portfolio follows a **"Portfolio as Demo"** philosophy: rather than simply listing skills on a page, the site's architecture, code quality, and performance serve as proof of expertise. Every technical decision — from state management patterns to animation performance — was made intentionally to showcase real-world senior engineering capabilities.

---

## 🛠️ Technical Highlights

### Core Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router, SSR) |
| **Language** | TypeScript (strict mode) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Redux Toolkit / RTK Query |
| **Testing** | Vitest + React Testing Library |
| **CI/CD** | GitHub Actions (lint, test, build, Lighthouse) |

### Performance & Quality

- 🎯 **Lighthouse Optimized** — CI pipeline includes automated Lighthouse audits
- ♿ **WCAG 2.1 AA Accessible** — Built with accessibility as a first-class concern
- 🧪 **Tested** — Unit tests covering state management, API caching, and component behavior
- 📦 **Type-Safe** — Full TypeScript coverage with strict configuration

---

## ✨ Key Features

### 🎨 Custom SVG Hero Animation

A bespoke SVG line-drawing animation that renders "EDUARDO NETO" letter-by-letter. Built by:
- Parsing font glyphs with custom tooling
- Generating optimized SVG path data
- Implementing smooth, staggered CSS animations with performance considerations (respects `prefers-reduced-motion`)

### 🌊 Vanta.js Background

An interactive Three.js-powered particle background that:
- Defers initialization until after hero animation completes
- Automatically disables on mobile devices to preserve performance
- Responds to user motion preferences

### 📊 Interactive RTK Query Demo

A fully functional comparison demonstrating **why RTK Query matters**:
- Side-by-side naive vs. optimized implementations
- Live network request tracking and metrics
- Real mutation flows with cache invalidation
- Accompanying test suite validating caching behavior

---

## 📂 Project Structure

```
├── app/
│   ├── components/       # Reusable UI components
│   ├── case-studies/     # Detailed project write-ups
│   ├── blog/             # Technical articles
│   ├── demos/            # Interactive code demos
│   └── api/              # API routes for demo data
├── demos/
│   └── rtk-query/        # RTK Query comparison demo + tests
├── lib/                  # Shared utilities (metrics tracking, etc.)
└── .github/workflows/    # CI/CD pipeline
```

---

## 📝 Case Studies

Each case study follows a **Problem → Solution → Outcome** narrative, demonstrating impact on real projects:

| Project | Key Achievement |
|---------|----------------|
| **Financial Services Dashboard** | ~30% performance improvement via RTK Query caching strategy |
| **Commercial Banking Tool** | ~25% dev-time reduction through reusable component architecture |
| **Internal Developer Platform** | 50% reduction in dev blockers via Mirage JS mock server |
| **Retail & Travel Brands** | Legacy jQuery migration + A/B testing infrastructure |

---

## 🚀 CI/CD Pipeline

Every push triggers:

1. **ESLint** — Zero-warning policy enforcement
2. **Tests** — Vitest unit test suite
3. **Build** — Production build verification
4. **Lighthouse** — Automated performance/accessibility audits

---

## 🔀 Git Workflow

This project uses a **linear-history, rebase-first workflow**. All contributors (including AI assistants) must follow:

- 📖 [Branching Strategy](./docs/branching-strategy.md) — The "what" and "why"
- 📋 [Git Workflow Guide](./docs/git-workflow.md) — The "how"

**Quick Rules:**

| Rule | Description |
|------|-------------|
| **Branch flow** | `feature/*` → `dev` → `main` |
| **Merge strategy** | "Rebase and Merge" only (no merge commits) |
| **Before PRs** | Rebase onto `dev`, use `--force-with-lease` if needed |
| **Branch naming** | `feature/*`, `fix/*`, `chore/*`, `refactor/*` |

---

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Production build
npm run build
```

---

## 📬 Contact

- **LinkedIn**: [linkedin.com/in/eduardoneto](https://www.linkedin.com/)
- **GitHub**: [github.com/eduardoneto](https://github.com/)
- **Email**: [Available on request]

---

<p align="center">
  <em>Built with Next.js, TypeScript, and attention to detail.</em>
</p>
