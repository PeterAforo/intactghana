# Intact Ghana Folder Structure
**Version 1.0 | Last Updated: January 2026**

## Overview
This document defines the complete folder structure for the Intact Ghana e-commerce platform, covering frontend, backend, shared libraries, and deployment configurations.

---

## Monorepo Structure

```
intact-ghana/
├── apps/
│   ├── web/                    # Next.js customer-facing app
│   ├── admin/                  # Admin dashboard
│   ├── mobile/                 # React Native mobile app
│   └── docs/                   # Documentation site
│
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── api-client/             # API client library
│   ├── types/                  # Shared TypeScript types
│   ├── utils/                  # Shared utilities
│   ├── config/                 # Shared configuration
│   └── design-tokens/          # Design system tokens
│
├── services/
│   ├── api-gateway/            # API Gateway service
│   ├── products/               # Products microservice
│   ├── orders/                 # Orders microservice
│   ├── users/                  # Users microservice
│   ├── cart/                   # Cart microservice
│   ├── search/                 # Search microservice
│   ├── ai-engine/              # AI service
│   ├── payment/                # Payment service
│   └── notifications/          # Notification service
│
├── infrastructure/
│   ├── terraform/              # Infrastructure as code
│   ├── kubernetes/             # K8s manifests
│   ├── docker/                 # Docker configurations
│   └── scripts/                # Deployment scripts
│
├── docs/
│   ├── prd/                    # Product requirements
│   ├── architecture/           # Architecture docs
│   ├── api/                    # API documentation
│   └── guides/                 # Developer guides
│
├── .github/
│   └── workflows/              # GitHub Actions
│
├── package.json
├── turbo.json                  # Turborepo config
├── tsconfig.json               # Root TypeScript config
└── README.md
```

---

## Frontend Application Structure (apps/web)

```
apps/web/
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero/
│   │   ├── icons/
│   │   └── placeholders/
│   ├── fonts/
│   │   ├── inter/
│   │   └── clash-display/
│   ├── videos/
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── (auth)/                       # Auth route group
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx                # Auth layout
│   │   │
│   │   ├── (shop)/                       # Shop route group
│   │   │   ├── products/
│   │   │   │   ├── [slug]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── loading.tsx
│   │   │   │   ├── page.tsx              # Products listing
│   │   │   │   └── loading.tsx
│   │   │   ├── categories/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── brands/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx                # Shop layout
│   │   │
│   │   ├── (account)/                    # Account route group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── wishlist/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── addresses/
│   │   │   │   └── page.tsx
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx                # Account layout
│   │   │
│   │   ├── (checkout)/                   # Checkout route group
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx
│   │   │   ├── success/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx                # Checkout layout
│   │   │
│   │   ├── (marketing)/                  # Marketing pages
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── shipping-policy/
│   │   │   ├── return-policy/
│   │   │   ├── terms/
│   │   │   └── privacy/
│   │   │
│   │   ├── api/                          # API routes
│   │   │   ├── products/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── cart/
│   │   │   │   └── route.ts
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── logout/
│   │   │   ├── ai/
│   │   │   │   ├── chat/
│   │   │   │   └── recommend/
│   │   │   └── webhook/
│   │   │       └── payment/
│   │   │
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Homepage
│   │   ├── loading.tsx                   # Root loading
│   │   ├── error.tsx                     # Error boundary
│   │   ├── not-found.tsx                 # 404 page
│   │   └── global-error.tsx              # Global error
│   │
│   ├── components/
│   │   ├── ui/                           # Base UI components
│   │   │   ├── button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── input/
│   │   │   ├── card/
│   │   │   ├── modal/
│   │   │   ├── dropdown/
│   │   │   ├── toast/
│   │   │   ├── badge/
│   │   │   ├── skeleton/
│   │   │   ├── spinner/
│   │   │   ├── avatar/
│   │   │   ├── tooltip/
│   │   │   └── index.ts
│   │   │
│   │   ├── features/                     # Feature components
│   │   │   ├── product/
│   │   │   │   ├── ProductCard/
│   │   │   │   │   ├── ProductCard.tsx
│   │   │   │   │   ├── ProductCard.module.css
│   │   │   │   │   ├── ProductCard.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ProductGallery/
│   │   │   │   ├── ProductDetails/
│   │   │   │   ├── ProductReviews/
│   │   │   │   ├── ProductCompare/
│   │   │   │   ├── ProductQuickView/
│   │   │   │   ├── ProductFilters/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   ├── CartItem/
│   │   │   │   ├── CartSummary/
│   │   │   │   ├── MiniCart/
│   │   │   │   ├── CartDrawer/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── checkout/
│   │   │   │   ├── CheckoutSteps/
│   │   │   │   ├── DeliveryForm/
│   │   │   │   ├── PaymentForm/
│   │   │   │   ├── OrderSummary/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── search/
│   │   │   │   ├── SearchBar/
│   │   │   │   ├── SearchResults/
│   │   │   │   ├── SearchSuggestions/
│   │   │   │   ├── VisualSearch/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── user/
│   │   │   │   ├── UserMenu/
│   │   │   │   ├── UserProfile/
│   │   │   │   ├── OrderHistory/
│   │   │   │   ├── Wishlist/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── ai/
│   │   │       ├── AiChatbot/
│   │   │       ├── AiRecommendations/
│   │   │       ├── SmartProductFinder/
│   │   │       └── index.ts
│   │   │
│   │   ├── layout/                       # Layout components
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Navigation/
│   │   │   │   ├── MegaMenu/
│   │   │   │   ├── MobileMenu/
│   │   │   │   ├── SearchBar/
│   │   │   │   └── index.ts
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── FooterLinks/
│   │   │   │   ├── Newsletter/
│   │   │   │   └── index.ts
│   │   │   ├── Sidebar/
│   │   │   ├── Container/
│   │   │   └── index.ts
│   │   │
│   │   └── shared/                       # Shared components
│   │       ├── LoadingStates/
│   │       │   ├── PageLoader.tsx
│   │       │   ├── SkeletonCard.tsx
│   │       │   └── index.ts
│   │       ├── ErrorStates/
│   │       │   ├── ErrorBoundary.tsx
│   │       │   ├── ErrorMessage.tsx
│   │       │   └── index.ts
│   │       ├── EmptyStates/
│   │       │   ├── EmptyCart.tsx
│   │       │   ├── NoResults.tsx
│   │       │   └── index.ts
│   │       ├── SEO/
│   │       │   └── SEOHead.tsx
│   │       └── Analytics/
│   │           └── AnalyticsProvider.tsx
│   │
│   ├── lib/                              # Core utilities
│   │   ├── api/
│   │   │   ├── client.ts                 # API client
│   │   │   ├── endpoints.ts              # API endpoints
│   │   │   ├── types.ts                  # API types
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/                        # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useCart.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useIntersectionObserver.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/                        # Utility functions
│   │   │   ├── format.ts                 # Formatting utils
│   │   │   ├── validation.ts             # Validation utils
│   │   │   ├── currency.ts               # Currency utils
│   │   │   ├── date.ts                   # Date utils
│   │   │   ├── string.ts                 # String utils
│   │   │   ├── array.ts                  # Array utils
│   │   │   └── index.ts
│   │   │
│   │   ├── constants/                    # Constants
│   │   │   ├── routes.ts
│   │   │   ├── config.ts
│   │   │   ├── messages.ts
│   │   │   └── index.ts
│   │   │
│   │   └── schemas/                      # Validation schemas
│   │       ├── auth.schema.ts
│   │       ├── product.schema.ts
│   │       ├── order.schema.ts
│   │       └── index.ts
│   │
│   ├── store/                            # State management
│   │   ├── cart.ts                       # Cart store
│   │   ├── user.ts                       # User store
│   │   ├── ui.ts                         # UI state store
│   │   ├── filters.ts                    # Filters store
│   │   └── index.ts
│   │
│   ├── types/                            # TypeScript types
│   │   ├── product.ts
│   │   ├── user.ts
│   │   ├── order.ts
│   │   ├── cart.ts
│   │   ├── api.ts
│   │   └── index.ts
│   │
│   ├── styles/                           # Global styles
│   │   ├── globals.css                   # Global CSS
│   │   ├── theme.css                     # CSS variables
│   │   ├── fonts.css                     # Font imports
│   │   └── animations.css                # Animations
│   │
│   ├── config/                           # Configuration
│   │   ├── site.ts                       # Site config
│   │   ├── env.ts                        # Environment config
│   │   └── features.ts                   # Feature flags
│   │
│   └── middleware.ts                     # Next.js middleware
│
├── .env.local                            # Environment variables
├── .env.example                          # Example env file
├── next.config.js                        # Next.js config
├── tailwind.config.js                    # Tailwind config
├── tsconfig.json                         # TypeScript config
├── package.json
└── README.md
```

---

## Backend Service Structure (services/products)

```
services/products/
├── src/
│   ├── api/                              # API layer
│   │   ├── routes/
│   │   │   ├── products.routes.ts
│   │   │   ├── categories.routes.ts
│   │   │   └── index.ts
│   │   ├── controllers/
│   │   │   ├── products.controller.ts
│   │   │   ├── categories.controller.ts
│   │   │   └── index.ts
│   │   └── middlewares/
│   │       ├── auth.middleware.ts
│   │       ├── validation.middleware.ts
│   │       ├── ratelimit.middleware.ts
│   │       └── index.ts
│   │
│   ├── services/                         # Business logic
│   │   ├── products.service.ts
│   │   ├── categories.service.ts
│   │   ├── inventory.service.ts
│   │   └── index.ts
│   │
│   ├── repositories/                     # Data access
│   │   ├── products.repository.ts
│   │   ├── categories.repository.ts
│   │   └── index.ts
│   │
│   ├── models/                           # Database models
│   │   ├── product.model.ts
│   │   ├── category.model.ts
│   │   └── index.ts
│   │
│   ├── types/                            # TypeScript types
│   │   ├── product.types.ts
│   │   ├── api.types.ts
│   │   └── index.ts
│   │
│   ├── utils/                            # Utilities
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   ├── validators.ts
│   │   └── index.ts
│   │
│   ├── config/                           # Configuration
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── env.ts
│   │   └── index.ts
│   │
│   ├── database/                         # Database
│   │   ├── migrations/
│   │   ├── seeds/
│   │   └── schema.prisma
│   │
│   ├── jobs/                             # Background jobs
│   │   ├── sync-inventory.job.ts
│   │   ├── update-pricing.job.ts
│   │   └── index.ts
│   │
│   ├── events/                           # Event handlers
│   │   ├── product-created.event.ts
│   │   ├── product-updated.event.ts
│   │   └── index.ts
│   │
│   └── index.ts                          # Entry point
│
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   │   ├── api/
│   │   └── database/
│   └── e2e/
│       └── products.e2e.test.ts
│
├── .env
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

## Shared Packages Structure (packages/ui)

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── index.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── index.ts                          # Main export
│
├── .storybook/
│   ├── main.ts
│   └── preview.ts
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## Infrastructure Structure

```
infrastructure/
├── terraform/
│   ├── modules/
│   │   ├── vpc/
│   │   ├── database/
│   │   ├── redis/
│   │   ├── kubernetes/
│   │   └── cdn/
│   ├── environments/
│   │   ├── development/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── staging/
│   │   └── production/
│   └── README.md
│
├── kubernetes/
│   ├── base/
│   │   ├── deployments/
│   │   ├── services/
│   │   ├── ingress/
│   │   └── configmaps/
│   ├── overlays/
│   │   ├── development/
│   │   ├── staging/
│   │   └── production/
│   └── README.md
│
├── docker/
│   ├── web/
│   │   └── Dockerfile
│   ├── api/
│   │   └── Dockerfile
│   ├── nginx/
│   │   ├── Dockerfile
│   │   └── nginx.conf
│   └── docker-compose.yml
│
└── scripts/
    ├── deploy.sh
    ├── backup.sh
    ├── restore.sh
    └── migrate.sh
```

---

## Documentation Structure

```
docs/
├── prd/
│   ├── design-system.md
│   ├── ui.rules.json
│   ├── motion.rules.json
│   ├── ux.flows.md
│   ├── architecture.md
│   ├── api.conventions.md
│   ├── naming.rules.md
│   └── folder-structure.md
│
├── architecture/
│   ├── overview.md
│   ├── frontend.md
│   ├── backend.md
│   ├── database.md
│   └── deployment.md
│
├── api/
│   ├── openapi.yaml
│   ├── products.md
│   ├── orders.md
│   ├── users.md
│   └── README.md
│
├── guides/
│   ├── getting-started.md
│   ├── development.md
│   ├── testing.md
│   ├── deployment.md
│   └── contributing.md
│
└── README.md
```

---

## GitHub Workflows

```
.github/
├── workflows/
│   ├── ci.yml                            # Continuous integration
│   ├── cd-staging.yml                    # Deploy to staging
│   ├── cd-production.yml                 # Deploy to production
│   ├── tests.yml                         # Run tests
│   ├── lint.yml                          # Linting
│   ├── type-check.yml                    # Type checking
│   └── security.yml                      # Security scanning
│
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   └── feature_request.md
│
├── PULL_REQUEST_TEMPLATE.md
└── CODEOWNERS
```

---

## Configuration Files Reference

### Root Level
```
intact-ghana/
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Prettier config
├── .eslintrc.js                  # ESLint config
├── .nvmrc                        # Node version
├── package.json                  # Root package
├── turbo.json                    # Turborepo config
├── tsconfig.json                 # Root TS config
├── pnpm-workspace.yaml           # pnpm workspaces
└── README.md                     # Root README
```

### App Level (Next.js)
```
apps/web/
├── next.config.js                # Next.js config
├── tailwind.config.js            # Tailwind config
├── postcss.config.js             # PostCSS config
├── tsconfig.json                 # App TS config
├── .env.local                    # Local environment
├── .env.example                  # Example env
└── package.json                  # App package
```

### Service Level (Backend)
```
services/products/
├── Dockerfile                    # Docker image
├── docker-compose.yml            # Local development
├── .env                          # Environment vars
├── .env.example                  # Example env
├── tsconfig.json                 # TS config
├── jest.config.js                # Test config
└── package.json                  # Service package
```

---

## Asset Organization

### Images
```
public/images/
├── logo/
│   ├── logo.svg
│   ├── logo-dark.svg
│   ├── logo-icon.svg
│   └── logo-white.svg
├── hero/
│   ├── hero-1.webp
│   └── hero-1-fallback.jpg
├── products/
│   └── (product images via CDN)
├── icons/
│   ├── cart.svg
│   ├── search.svg
│   └── user.svg
└── placeholders/
    ├── product-placeholder.svg
    └── avatar-placeholder.svg
```

### Fonts
```
public/fonts/
├── inter/
│   ├── Inter-Regular.woff2
│   ├── Inter-Medium.woff2
│   ├── Inter-Semibold.woff2
│   └── Inter-Bold.woff2
└── clash-display/
    ├── ClashDisplay-Regular.woff2
    ├── ClashDisplay-Semibold.woff2
    └── ClashDisplay-Bold.woff2
```

---

## Best Practices

### File Naming
- Components: PascalCase (`ProductCard.tsx`)
- Utilities: camelCase (`formatCurrency.ts`)
- Tests: `*.test.tsx` or `*.spec.tsx`
- Styles: `*.module.css` for CSS Modules
- Types: `*.types.ts` or `types.ts`

### Folder Naming
- kebab-case for all folders
- Plural for collections (`components/`, `utils/`)
- Singular for specific items (`user/`, `product/`)

### Index Files
```typescript
// components/ui/index.ts (barrel export)
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
export { Modal } from './Modal';
```

### Import Paths
```typescript
// Use path aliases (tsconfig.json)
import { Button } from '@/components/ui';
import { useAuth } from '@/lib/hooks';
import { ProductCard } from '@/components/features/product';

// Instead of:
import { Button } from '../../../components/ui/Button';
```

---

This folder structure provides clear separation of concerns, scalability, and maintainability for the Intact Ghana e-commerce platform.