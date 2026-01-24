# Changelog

All notable changes to the Intact Ghana e-commerce platform will be documented in this file.

## [1.0.0] - 2026-01-24

### Added

#### M0 - Baseline & Infrastructure
- Next.js 15 App Router project setup with TypeScript
- PostgreSQL database with Prisma ORM
- Complete data model: Users, Products, Orders, Payments, Reviews, etc.
- JWT-based authentication for customers and admins
- Role-Based Access Control (RBAC) with permissions
- Audit logging for admin actions
- Database seed script with sample data
- Environment configuration

#### M1 - Storefront Core
- Home page with featured products and categories
- Category listing pages (PLP) with filters and sorting
- Product detail pages (PDP) with variants, specs, reviews
- Shopping cart with quantity management
- Product image gallery
- Trust badges (warranty, delivery, returns)
- SEO metadata and structured data ready

#### M2 - Search Engine
- Full-text product search
- Search suggestions/typeahead
- Faceted filtering (brand, price, availability)
- Search analytics logging

#### M3 - Checkout & Payments
- Guest and account checkout flows
- Ghana-optimized address form (region, city, landmark, GPS code)
- Payment adapter pattern (Hubtel/Flutterwave)
- Mobile Money support (MTN, Vodafone, AirtelTigo)
- Card payment support
- Bank transfer with manual verification
- Idempotent payment webhooks
- SMS notifications (mNotify)
- Email notifications (SMTP)
- Order confirmation pages

#### M4 - Orders & Fulfillment Admin
- Admin order listing with filters
- Order detail view with full history
- Order status management
- Status transition workflow
- Stock reservation and deduction
- Customer notifications on status changes

#### M5 - Reviews & Trust
- Verified purchase reviews
- Review submission with rating
- Admin review moderation queue
- Approve/reject workflow
- Trust badges on product pages
- Policy summaries

#### M6 - CMS + PIM
- CMS pages management
- Policy management (delivery, returns, warranty)
- Category attribute sets
- Product attributes and values

#### M7 - AI Shopping Assistant v1
- Floating chat widget on storefront
- Catalog-aware product search
- Product recommendations
- Policy Q&A (delivery, warranty, returns)
- Conversation logging
- Escalation to human support

### Technical Details
- TailwindCSS + shadcn/ui component library
- Framer Motion ready for animations
- Radix UI primitives for accessibility
- Zod validation schemas
- React Hook Form integration
- Responsive mobile-first design

### Security
- Password hashing with bcrypt
- JWT token authentication
- RBAC permission checks
- Audit logging
- Input validation
- CSRF protection via SameSite cookies

---

## Roadmap

### Phase 2 (Planned)
- AI Product Enrichment (auto descriptions, spec extraction)
- Image optimization pipeline
- Warranty claims assistant
- Troubleshooting flows
- WhatsApp integration
- Price drop/restock alerts

### Phase 3 (Planned)
- B2B portal with quotes and bulk pricing
- Multi-branch inventory
- Marketplace/vendor portal
- Multi-currency support
- International shipping
