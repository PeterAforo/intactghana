# Intact Ghana – AI-First E-Commerce Rebuild (Next.js) – PRD

## 1. Overview
Intact Ghana will be rebuilt as a modern, AI-first, high-performance e-commerce platform focused on electronics and technology products for the Ghanaian market, scalable globally. The platform will improve trust, conversion, catalog discoverability, after-sales support, and operational efficiency through automation and AI-driven workflows.

## 2. Goals and Success Metrics (KPIs)
### Business Goals
- Increase conversion rate and average order value (AOV)
- Reduce customer support workload via AI self-service
- Improve trust and repeat purchase behavior
- Enable scalable catalog management and marketing automation

### KPIs
- Conversion rate (CR): +30% from baseline
- AOV: +15%
- Search-to-cart rate: +20%
- Page load (LCP): < 2.5s for key pages on mobile
- Support deflection rate (AI solves without human): 35–60%
- Checkout completion rate: +25%
- Return/exchange disputes reduced: -30%
- Product content completeness score: > 90% (specs, media, warranty, delivery clarity)

## 3. Target Users
1) Retail shoppers (mobile-first)
2) Power buyers (spec-heavy comparisons)
3) Corporate/B2B procurement (quotes, bulk pricing, invoices)
4) Customer support agents
5) Warehouse/dispatch staff
6) Admin/management (analytics, inventory, risk)

## 4. Key Differentiators
- AI Shopping Assistant that can: recommend, compare, add-to-cart, explain policies, check stock, suggest bundles.
- AI Product Enrichment: auto-generate descriptions/spec tables, auto-tag attributes, optimize images for web.
- Ghana-first checkout: Mobile Money + card + bank options, SMS/email confirmations, delivery rules by region.
- Trust layer: verified reviews, authenticity/warranty verification, consistent policy enforcement.

## 5. Functional Requirements

### 5.1 Storefront
#### Core Pages
- Home
- Category listing (PLP)
- Product page (PDP)
- Search results (with faceted filters)
- Cart
- Checkout
- Order success + receipt
- User account: profile, addresses, orders, invoices, support tickets
- Help Center: FAQs, policies, warranty, delivery zones

#### UX Requirements
- Instant search suggestions (typeahead)
- Filters: brand, price, availability, warranty, delivery ETA region, specs per category (RAM, storage, screen size, etc.)
- Compare products (category-restricted comparisons)
- Product gallery: optimized images, zoom, video (optional)
- Trust blocks: warranty, authenticity badge, delivery promise, exchange policy summary
- Accessibility: keyboard navigation, contrast compliance, alt text

### 5.2 Checkout & Payments (Ghana-optimized)
- Guest checkout and account checkout
- Payment methods:
  - Mobile Money (MTN, Vodafone, AirtelTigo) via Hubtel/Flutterwave/other gateway as selected
  - Card payments
  - Bank transfer (manual verification flow)
  - Pay on delivery (optional, risk-scored)
- Notifications:
  - SMS + email order confirmation
  - Payment success/failure
  - Dispatch + delivery updates
- Tax invoice PDF generation and download from account

### 5.3 Orders, Fulfillment, Inventory
- Multi-location inventory (optional v1: single warehouse; v2: multi-branch)
- Order statuses: Pending Payment → Paid → Processing → Packed → Dispatched → Delivered → Completed / Cancelled / Returned
- Dispatch workflow:
  - pick/pack list
  - serial/IMEI capture for electronics
  - packing slip + invoice
- Delivery fee rules by region; ETA estimation logic

### 5.4 Reviews & Trust
- Verified reviews (purchase required)
- Review moderation queue
- Review media (photos)
- Fraud signals: unusual orders, repeated returns, suspicious addresses (admin flags)

### 5.5 CMS + PIM (Content and Products)
- CMS for pages, FAQs, policies, blog/insights
- PIM for:
  - Products, variants, attributes
  - Category schemas (attribute sets)
  - Bundles and “frequently bought together”
  - Warranty policy mapping by brand/category
- Import tools:
  - CSV import/export
  - Supplier spec sheet ingestion (v2 AI enrichment)

### 5.6 AI Features (Must-have)
#### AI Shopping Assistant
- Multimodal optional (phase 2)
- Catalog-aware and policy-aware
- Actions:
  - recommend products
  - compare
  - add-to-cart
  - suggest accessories/bundles
  - answer warranty/delivery/return questions
  - escalate to human with conversation summary
- Guardrails:
  - strict policy truthfulness
  - disclaimers where necessary
  - no hallucinated stock/pricing

#### AI Product Enrichment
- Auto descriptions, bullet highlights
- Spec table generation from structured attributes
- Attribute extraction/tagging
- Image optimization pipeline (background removal, cropping, WebP/AVIF)

#### AI Support
- Warranty claims assistant
- Troubleshooting assistant (printers, routers, laptops)
- Return/exchange eligibility checker (policy engine backed)

### 5.7 Admin Dashboard
- Role-based access (RBAC)
- Product management (PIM)
- Order management (status updates, refunds/exchanges workflow)
- Inventory management
- Reviews moderation
- Support tickets
- Analytics dashboard:
  - revenue, conversion funnels
  - top searches, zero-results queries
  - out-of-stock impact
  - margin & promo performance
- AI insights dashboard (phase 2):
  - demand forecast
  - anomaly/fraud alerts
  - content completeness warnings

## 6. Non-Functional Requirements
- Performance:
  - LCP < 2.5s on mobile
  - TTFB optimized via caching and server components
- Security:
  - OWASP baseline, CSRF protection, secure cookies, rate limiting
  - 2FA optional for admins
  - Audit logs for admin actions
- SEO:
  - structured data (Product, Offer, Review)
  - canonical URLs, sitemap, robots control
- Reliability:
  - transaction logs + idempotent payment callbacks
- Internationalization readiness:
  - Multi-currency + multi-language architecture-ready (phase 3)

## 7. Data Model (High Level)
- Users, Roles, Permissions
- Products, Variants, Attributes, Categories
- InventoryLocations, StockLevels
- Carts, CartItems
- Orders, OrderItems, Payments, Refunds/Exchanges
- Shipments, DeliveryRules
- Reviews
- SupportTickets, Messages
- AI conversations (metadata), AI actions
- AuditLogs

## 8. Integrations
- Payment gateway (Hubtel/Flutterwave)
- SMS gateway (mNotify or equivalent)
- Email (SMTP provider)
- Search engine (Meilisearch/Typesense)
- CMS/PIM (Strapi/Sanity/Contentful or custom)
- Analytics (GA4 + server events)

## 9. Rollout Plan
- Phase 1 (Premium Core + Basic AI)
- Phase 2 (Automation + AI Enrichment + Support AI)
- Phase 3 (Marketplace + B2B + Global scaling)

## 10. Risks and Mitigations
- Policy inconsistency harms trust → unify policy engine and display
- Payment callback reliability → idempotent callbacks + logs + retry
- AI hallucinations → retrieval-first, tool-based actions, strict validations
- Product data quality → PIM validation + enrichment workflows
