# Intact Ghana - AI-First E-Commerce Platform

A modern, AI-first e-commerce platform for electronics and technology products, built with Next.js 15, optimized for the Ghanaian market.

## Features

### Storefront
- **Product Catalog**: Categories, filters, search, product variants
- **AI Shopping Assistant**: Catalog-aware Q&A, recommendations, add-to-cart actions
- **Ghana-Optimized Checkout**: Mobile Money (MTN, Vodafone, AirtelTigo), cards, bank transfer
- **Trust Layer**: Verified reviews, warranty badges, delivery promises

### Admin Dashboard
- **Order Management**: Status tracking, fulfillment workflow
- **Product Management**: PIM with variants, attributes, categories
- **Customer Management**: User accounts, order history
- **Reviews Moderation**: Approve/reject customer reviews
- **CMS**: Pages, policies, FAQs
- **Analytics**: Revenue, orders, conversion tracking

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **UI**: TailwindCSS + shadcn/ui + Radix UI
- **Auth**: JWT-based with RBAC
- **Payments**: Hubtel / Flutterwave (adapter pattern)
- **Notifications**: SMS (mNotify) + Email (SMTP)

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd intweb
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Generate Prisma client:
```bash
npm run db:generate
```

5. Push database schema:
```bash
npm run db:push
```

6. Seed the database:
```bash
npm run db:seed
```

7. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `AUTH_SECRET` | JWT secret (min 32 chars) | Yes |
| `PAYMENTS_PROVIDER` | HUBTEL or FLUTTERWAVE | Yes |
| `HUBTEL_CLIENT_ID` | Hubtel API client ID | If using Hubtel |
| `HUBTEL_CLIENT_SECRET` | Hubtel API secret | If using Hubtel |
| `FLUTTERWAVE_PUBLIC_KEY` | Flutterwave public key | If using Flutterwave |
| `FLUTTERWAVE_SECRET_KEY` | Flutterwave secret key | If using Flutterwave |
| `MNOTIFY_API_KEY` | mNotify SMS API key | For SMS |
| `SMTP_HOST` | SMTP server host | For email |
| `SMTP_PORT` | SMTP server port | For email |
| `SMTP_USER` | SMTP username | For email |
| `SMTP_PASS` | SMTP password | For email |
| `APP_URL` | Application URL | Yes |

## Test Accounts

After running the seed script:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@intactghana.com | Admin123! |
| Admin | admin@intactghana.com | Admin123! |
| Customer | customer@example.com | Customer123! |

## Project Structure

```
src/
├── app/
│   ├── (store)/          # Customer-facing pages
│   ├── (admin)/          # Admin dashboard pages
│   ├── (auth)/           # Authentication pages
│   └── api/              # API routes
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── store/            # Store-specific components
│   └── admin/            # Admin-specific components
├── lib/
│   ├── auth/             # Authentication utilities
│   ├── rbac/             # Role-based access control
│   ├── payments/         # Payment provider adapters
│   ├── notifications/    # SMS and email services
│   ├── search/           # Search functionality
│   ├── ai/               # AI assistant
│   └── validations/      # Zod schemas
└── prisma/
    └── schema.prisma     # Database schema
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed database |
| `npm run db:studio` | Open Prisma Studio |

## Deployment

1. Set up a PostgreSQL database
2. Configure environment variables
3. Build the application: `npm run build`
4. Start the server: `npm run start`

For Vercel deployment, connect your repository and configure environment variables in the dashboard.

## License

Proprietary - Intact Ghana Ltd.
