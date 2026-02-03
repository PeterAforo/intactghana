# Intact Ghana Technical Architecture
**Version 1.0 | Last Updated: January 2026**

## System Overview

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────┤
│  Web App (React)  │  Mobile PWA  │  Admin Dashboard         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     CDN & EDGE LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  Cloudflare CDN  │  Image Optimization  │  DDoS Protection │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     API GATEWAY                              │
├─────────────────────────────────────────────────────────────┤
│  Rate Limiting  │  Auth  │  Request Routing  │  Caching    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  MICROSERVICES LAYER                         │
├───────────────┬─────────────┬──────────────┬────────────────┤
│  Products API │  Orders API │  Users API   │  AI Engine     │
│  Search API   │  Cart API   │  Payment API │  Analytics API │
└───────────────┴─────────────┴──────────────┴────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                               │
├───────────────┬─────────────┬──────────────┬────────────────┤
│  PostgreSQL   │  Redis      │  Elasticsearch│  MongoDB       │
│  (Primary)    │  (Cache)    │  (Search)     │  (AI Logs)     │
└───────────────┴─────────────┴──────────────┴────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                           │
├───────────────┬─────────────┬──────────────┬────────────────┤
│  Payment      │  SMS/Email  │  AI Models   │  Analytics     │
│  Gateways     │  Services   │  (OpenAI)    │  (Mixpanel)    │
└───────────────┴─────────────┴──────────────┴────────────────┘
```

---

## Frontend Architecture

### Technology Stack
```yaml
Framework: Next.js 14+ (App Router)
Language: TypeScript
State Management: Zustand + React Query
Styling: Tailwind CSS + CSS Modules
UI Components: shadcn/ui + Custom Components
Forms: React Hook Form + Zod
Animation: Framer Motion
Testing: Jest + React Testing Library + Playwright
```

### Project Structure
```
src/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Auth routes group
│   │   ├── login/
│   │   └── register/
│   ├── (shop)/                   # Shop routes group
│   │   ├── products/
│   │   ├── categories/
│   │   └── search/
│   ├── (account)/                # Account routes group
│   │   ├── dashboard/
│   │   ├── orders/
│   │   └── wishlist/
│   ├── (checkout)/               # Checkout routes group
│   │   ├── cart/
│   │   └── checkout/
│   ├── api/                      # API routes
│   │   ├── products/
│   │   ├── cart/
│   │   └── ai/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── error.tsx                 # Error boundary
│
├── components/                   # React components
│   ├── ui/                       # Base UI components
│   │   ├── button/
│   │   ├── input/
│   │   ├── card/
│   │   └── modal/
│   ├── features/                 # Feature-specific components
│   │   ├── product/
│   │   │   ├── ProductCard/
│   │   │   ├── ProductGallery/
│   │   │   └── ProductDetails/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── search/
│   ├── layout/                   # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Navigation/
│   └── shared/                   # Shared components
│       ├── LoadingStates/
│       ├── ErrorStates/
│       └── EmptyStates/
│
├── lib/                          # Core utilities
│   ├── api/                      # API client & utilities
│   │   ├── client.ts
│   │   ├── endpoints.ts
│   │   └── types.ts
│   ├── utils/                    # Helper functions
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── helpers.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── useCart.ts
│   │   ├── useAuth.ts
│   │   └── useProducts.ts
│   └── constants/                # App constants
│
├── store/                        # State management
│   ├── cart.ts
│   ├── user.ts
│   └── ui.ts
│
├── types/                        # TypeScript types
│   ├── product.ts
│   ├── order.ts
│   └── user.ts
│
├── styles/                       # Global styles
│   ├── globals.css
│   └── theme.css
│
└── config/                       # Configuration
    ├── site.ts
    └── env.ts
```

### Component Architecture Principles

**Atomic Design Methodology:**
```
Atoms → Molecules → Organisms → Templates → Pages

Example:
Button (Atom)
  → SearchInput (Molecule: Input + Button)
    → SearchBar (Organism: SearchInput + Filters + Results)
      → Header (Template: Logo + SearchBar + Nav + Cart)
        → HomePage (Page: Header + Hero + Products + Footer)
```

**Component Structure:**
```typescript
// components/features/product/ProductCard/index.ts

// Types
export interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list' | 'featured';
  onAddToCart?: (productId: string) => void;
  showQuickView?: boolean;
}

// Component
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'grid',
  onAddToCart,
  showQuickView = true
}) => {
  // Hooks
  const { addToCart, isAdding } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  // Handlers
  const handleAddToCart = () => {
    addToCart(product.id);
    onAddToCart?.(product.id);
  };
  
  // Render
  return (
    <Card variant={variant}>
      {/* Component JSX */}
    </Card>
  );
};

// Styles (if using CSS Modules)
// ProductCard.module.css

// Tests
// ProductCard.test.tsx

// Storybook
// ProductCard.stories.tsx
```

---

## Backend Architecture

### Technology Stack
```yaml
Runtime: Node.js 20+
Framework: Express.js / Fastify
Language: TypeScript
ORM: Prisma
Authentication: JWT + OAuth 2.0
API Documentation: OpenAPI/Swagger
Real-time: Socket.io
Queue: BullMQ + Redis
Caching: Redis
File Storage: AWS S3 / Cloudflare R2
```

### Microservices Structure

#### 1. Products Service
```
Responsibilities:
- Product CRUD operations
- Category management
- Inventory tracking
- Product search (Elasticsearch integration)
- Price management
- Product recommendations

Database Tables:
- products
- categories
- product_variants
- product_images
- inventory
- prices
```

#### 2. Users Service
```
Responsibilities:
- User authentication
- Profile management
- Address book
- Wishlist
- User preferences
- Session management

Database Tables:
- users
- addresses
- wishlists
- user_preferences
- sessions
```

#### 3. Orders Service
```
Responsibilities:
- Order creation & management
- Order status tracking
- Invoice generation
- Order history

Database Tables:
- orders
- order_items
- order_status_history
- invoices
```

#### 4. Cart Service
```
Responsibilities:
- Shopping cart management
- Cart persistence
- Guest cart handling
- Cart merging (guest → logged in)

Database:
- Redis (ephemeral storage)
- PostgreSQL (persistent carts)
```

#### 5. Payment Service
```
Responsibilities:
- Payment processing
- Payment gateway integration
- Transaction logging
- Refund processing

Database Tables:
- transactions
- payment_methods
- refunds

Integrations:
- Paystack
- Flutterwave
- Mobile Money APIs
```

#### 6. Search Service
```
Responsibilities:
- Full-text search
- Faceted search
- Auto-suggestions
- Search analytics

Technology:
- Elasticsearch
- Redis (cache)

Features:
- Fuzzy matching
- Synonyms
- Relevance tuning
- Search-as-you-type
```

#### 7. AI Engine Service
```
Responsibilities:
- Natural language query processing
- Product recommendations
- Image recognition (visual search)
- Chatbot responses
- Price prediction
- Demand forecasting

Technology:
- OpenAI API
- Custom ML models
- TensorFlow.js
- LangChain

Database:
- MongoDB (conversation logs)
- Vector DB (embeddings)
```

#### 8. Notification Service
```
Responsibilities:
- Email notifications
- SMS notifications
- Push notifications
- Notification preferences

Integrations:
- SendGrid / AWS SES (Email)
- Twilio / Africa's Talking (SMS)
- Firebase Cloud Messaging (Push)

Database Tables:
- notifications
- notification_templates
- notification_queue
```

#### 9. Analytics Service
```
Responsibilities:
- Event tracking
- User behavior analysis
- Conversion tracking
- A/B testing

Technology:
- Mixpanel
- Google Analytics
- Custom events pipeline

Database:
- ClickHouse (time-series data)
```

---

## Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_phone (phone)
);
```

#### Products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  brand_id UUID REFERENCES brands(id),
  category_id UUID REFERENCES categories(id),
  base_price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),
  cost_price DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'GHS',
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  weight DECIMAL(8, 2),
  dimensions JSONB,
  rating_average DECIMAL(3, 2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  purchase_count INTEGER DEFAULT 0,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  INDEX idx_category (category_id),
  INDEX idx_brand (brand_id),
  INDEX idx_slug (slug),
  INDEX idx_sku (sku),
  FULLTEXT INDEX idx_search (name, description)
);
```

#### Orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  guest_email VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  payment_status VARCHAR(50) NOT NULL,
  payment_method VARCHAR(50),
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GHS',
  shipping_address JSONB,
  billing_address JSONB,
  customer_notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  
  INDEX idx_user (user_id),
  INDEX idx_order_number (order_number),
  INDEX idx_status (status),
  INDEX idx_created (created_at DESC)
);
```

#### Shopping Carts
```sql
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  session_id VARCHAR(255),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  INDEX idx_user (user_id),
  INDEX idx_session (session_id)
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(cart_id, product_id)
);
```

---

## API Design

### RESTful API Conventions

**Base URL:** `https://api.intactghana.com/v1`

**Authentication:**
```
Authorization: Bearer {jwt_token}
```

**Standard Responses:**
```typescript
// Success Response
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "timestamp": "2026-01-25T10:30:00Z",
    "requestId": "req_abc123"
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID xyz not found",
    "details": {}
  },
  "meta": {
    "timestamp": "2026-01-25T10:30:00Z",
    "requestId": "req_abc123"
  }
}

// Paginated Response
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Core Endpoints

#### Products API
```
GET    /products                    # List products (with filters)
GET    /products/:id                # Get product details
POST   /products                    # Create product (admin)
PUT    /products/:id                # Update product (admin)
DELETE /products/:id                # Delete product (admin)
GET    /products/:id/related        # Get related products
GET    /products/:id/reviews        # Get product reviews
POST   /products/:id/reviews        # Add review
GET    /products/featured           # Get featured products
GET    /products/trending           # Get trending products
POST   /products/compare            # Compare products
```

#### Search API
```
GET    /search?q={query}            # Search products
GET    /search/suggestions          # Get search suggestions
POST   /search/visual               # Visual search (image)
POST   /search/voice                # Voice search
GET    /search/history              # User search history
```

#### Cart API
```
GET    /cart                        # Get current cart
POST   /cart/items                  # Add item to cart
PUT    /cart/items/:id              # Update cart item
DELETE /cart/items/:id              # Remove cart item
DELETE /cart                        # Clear cart
POST   /cart/merge                  # Merge guest cart to user
POST   /cart/apply-coupon           # Apply coupon code
```

#### Orders API
```
GET    /orders                      # List user orders
GET    /orders/:id                  # Get order details
POST   /orders                      # Create order
PUT    /orders/:id/cancel           # Cancel order
POST   /orders/:id/return           # Initiate return
GET    /orders/:id/track            # Track order
GET    /orders/:id/invoice          # Get invoice
```

#### Users API
```
POST   /auth/register               # Register user
POST   /auth/login                  # Login
POST   /auth/logout                 # Logout
POST   /auth/refresh                # Refresh token
POST   /auth/forgot-password        # Password reset
POST   /auth/verify-email           # Verify email
GET    /users/me                    # Get current user
PUT    /users/me                    # Update profile
GET    /users/me/addresses          # Get addresses
POST   /users/me/addresses          # Add address
PUT    /users/me/addresses/:id      # Update address
DELETE /users/me/addresses/:id      # Delete address
GET    /users/me/wishlist           # Get wishlist
POST   /users/me/wishlist           # Add to wishlist
DELETE /users/me/wishlist/:id       # Remove from wishlist
```

#### AI API
```
POST   /ai/chat                     # Chat with AI assistant
POST   /ai/recommend                # Get AI recommendations
POST   /ai/analyze-query            # Analyze natural language query
POST   /ai/price-predict            # Predict price trends
POST   /ai/product-match            # Match product to description
```

---

## Caching Strategy

### Multi-Layer Caching
```
┌─────────────────────────────────────────┐
│  Browser Cache (Service Worker)         │
│  TTL: 1 hour - 7 days                   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  CDN Cache (Cloudflare)                 │
│  TTL: 1 hour - 1 day                    │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  API Gateway Cache (Redis)              │
│  TTL: 5 minutes - 1 hour                │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Application Cache (Redis)              │
│  TTL: 1 minute - 30 minutes             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Database Query Cache                   │
└─────────────────────────────────────────┘
```

### Cache Invalidation Strategy
```typescript
// Cache keys pattern
const CACHE_KEYS = {
  PRODUCT: 'product:{id}',
  PRODUCTS_LIST: 'products:list:{filters}',
  CATEGORY: 'category:{id}',
  USER: 'user:{id}',
  CART: 'cart:{userId|sessionId}',
  SEARCH: 'search:{query}'
};

// Cache TTLs
const CACHE_TTL = {
  STATIC: 7 * 24 * 60 * 60,      // 7 days
  PRODUCT: 60 * 60,              // 1 hour
  CATEGORY: 24 * 60 * 60,        // 24 hours
  SEARCH: 5 * 60,                // 5 minutes
  CART: 30 * 60,                 // 30 minutes
  USER_SESSION: 15 * 60          // 15 minutes
};

// Invalidation triggers
// - Product update → Clear product:*, products:list:*
// - Order placed → Clear cart:*, user:{id}
// - Price change → Clear product:*, search:*
```

---

## Security Architecture

### Authentication & Authorization

**JWT Token Structure:**
```typescript
interface JWTPayload {
  sub: string;           // User ID
  email: string;
  role: 'customer' | 'admin' | 'staff';
  permissions: string[];
  iat: number;
  exp: number;
}

// Access Token: 15 minutes
// Refresh Token: 7 days
// Stored in httpOnly cookie
```

**Authorization Levels:**
```
Public: Anyone can access
Authenticated: Logged-in users only
Customer: Verified customers
Staff: Intact Ghana employees
Admin: Full system access
```

### Security Measures

1. **Rate Limiting**
   ```
   Anonymous: 100 requests/hour
   Authenticated: 1000 requests/hour
   Admin: 10000 requests/hour
   ```

2. **Input Validation**
   - Zod schemas for all inputs
   - SQL injection prevention (Prisma ORM)
   - XSS protection (sanitization)
   - CSRF tokens

3. **Data Encryption**
   - TLS 1.3 for all connections
   - Passwords: bcrypt (cost factor: 12)
   - Sensitive data: AES-256
   - PII encryption at rest

4. **API Security**
   - API key rotation
   - Request signing
   - IP whitelisting (admin endpoints)
   - WAF (Web Application Firewall)

---

## Performance Optimization

### Frontend Optimization
```
- Code splitting (route-based)
- Lazy loading (components, images)
- Tree shaking
- Bundle size < 200KB initial
- Image optimization (WebP, responsive)
- Font subsetting
- Critical CSS inlining
- Preload key resources
```

### Backend Optimization
```
- Database indexing
- Query optimization
- Connection pooling
- Horizontal scaling (load balancer)
- Async processing (queues)
- CDN for static assets
- Compression (Brotli/Gzip)
```

### Performance Targets
```
Time to First Byte (TTFB): < 200ms
First Contentful Paint (FCP): < 1.8s
Largest Contentful Paint (LCP): < 2.5s
Time to Interactive (TTI): < 3.8s
Cumulative Layout Shift (CLS): < 0.1
API Response Time (p95): < 500ms
Database Query Time (p95): < 100ms
```

---

## Monitoring & Observability

### Metrics Collection
```
Application Metrics:
- Request rate
- Error rate
- Response time (p50, p95, p99)
- Active users
- Conversion rate

Infrastructure Metrics:
- CPU usage
- Memory usage
- Disk I/O
- Network throughput
- Database connections

Business Metrics:
- Orders per hour
- Revenue
- Cart abandonment rate
- Search success rate
```

### Logging
```yaml
Log Levels: ERROR, WARN, INFO, DEBUG
Log Format: JSON structured logs
Log Aggregation: ELK Stack / Datadog
Log Retention: 30 days (INFO), 90 days (ERROR)
```

### Alerting
```
Critical: PagerDuty (immediate)
High: Slack (< 5 minutes)
Medium: Email (< 30 minutes)
Low: Dashboard only
```

---

## Deployment Architecture

### Environments
```
Development → Staging → Production

Development:
- Local machines
- Feature branches
- Mock services

Staging:
- Identical to production
- Testing environment
- Pre-release validation

Production:
- Multi-region deployment
- Auto-scaling
- Load balancing
- Blue-green deployment
```

### CI/CD Pipeline
```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│   Git    │ ──→ │  Build   │ ──→ │   Test   │ ──→ │  Deploy  │
│  Push    │     │  (CI)    │     │   (CI)   │     │  (CD)    │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                      │                 │                 │
                      │                 │                 │
                   Lint            Unit Tests       Staging
                   Type Check      Integration     Production
                   Bundle          E2E Tests       Rollback
```

### Infrastructure as Code
```yaml
Technology: Terraform / Pulumi
Version Control: Git
Environment Config: .env files + Secrets Manager
Container Orchestration: Kubernetes / Docker Swarm
```

---

This architecture ensures scalability, maintainability, and optimal performance for Intact Ghana's e-commerce platform.