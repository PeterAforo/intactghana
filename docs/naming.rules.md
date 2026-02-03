# Intact Ghana Naming Conventions
**Version 1.0 | Last Updated: January 2026**

## Philosophy
Clear, consistent, and self-documenting names improve code readability, reduce bugs, and enhance team collaboration. Our naming conventions balance verbosity with clarity.

---

## General Rules

### Universal Principles
1. **Be Descriptive**: Names should reveal intent
2. **Be Consistent**: Use the same pattern throughout
3. **Avoid Abbreviations**: Unless widely understood (API, URL, ID, etc.)
4. **Use English**: All names in English
5. **Avoid Magic Numbers**: Use named constants
6. **Searchable Names**: Avoid single letters (except loops)

### Acronyms & Initialisms
```typescript
// Treat as regular words in camelCase/PascalCase
✅ const apiKey = "...";
✅ const userId = "...";
✅ const htmlContent = "...";
✅ class ApiClient {}

❌ const APIKey = "...";
❌ const userID = "...";
❌ const HTMLContent = "...";
❌ class APIClient {}

// Exception: All caps for constants
✅ const API_BASE_URL = "...";
✅ const MAX_CART_ITEMS = 100;
```

---

## TypeScript / JavaScript

### Variables & Constants

**camelCase** for variables and constants:
```typescript
// Variables
✅ const userName = "John";
✅ const productPrice = 5000;
✅ const isAuthenticated = true;
✅ const shoppingCart = [];

❌ const user_name = "John";
❌ const ProductPrice = 5000;
❌ const is_authenticated = true;
```

**SCREAMING_SNAKE_CASE** for global constants:
```typescript
// Configuration constants
✅ const API_BASE_URL = "https://api.intactghana.com";
✅ const MAX_FILE_SIZE = 5242880;
✅ const DEFAULT_PAGE_SIZE = 20;
✅ const CACHE_TTL_SECONDS = 3600;

// Enums (alternative style)
const OrderStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const;
```

### Functions & Methods

**camelCase** with verb prefix:
```typescript
// Actions
✅ function createUser() {}
✅ function updateProduct() {}
✅ function deleteOrder() {}
✅ function fetchData() {}
✅ function calculateTotal() {}

// Boolean returns (is, has, can, should)
✅ function isAuthenticated() {}
✅ function hasPermission() {}
✅ function canEditProduct() {}
✅ function shouldShowModal() {}

// Getters/Setters
✅ function getUserName() {}
✅ function setUserName() {}
✅ function getCartTotal() {}

// Event handlers
✅ function handleClick() {}
✅ function handleSubmit() {}
✅ function onUserLogin() {}
✅ function onProductAdded() {}

❌ function user() {}           // Not a verb
❌ function authenticated() {} // Not a verb
❌ function click() {}         // Missing context
```

### Classes & Interfaces

**PascalCase** for classes:
```typescript
✅ class User {}
✅ class ProductCard {}
✅ class ShoppingCart {}
✅ class OrderService {}
✅ class AuthenticationManager {}

❌ class user {}
❌ class product_card {}
❌ class shopping_cart {}
```

**PascalCase** for interfaces (with or without 'I' prefix):
```typescript
// Preferred: No prefix
✅ interface User {}
✅ interface ProductProps {}
✅ interface CartItem {}
✅ interface ApiResponse {}

// Alternative: 'I' prefix (if team prefers)
✅ interface IUser {}
✅ interface IProductProps {}

❌ interface userInterface {}
❌ interface user_props {}
```

**PascalCase** for types:
```typescript
✅ type UserId = string;
✅ type ProductCategory = 'laptops' | 'phones' | 'appliances';
✅ type ApiResponse<T> = { data: T; error?: string };
```

### React Components

**PascalCase** for component names:
```typescript
✅ function ProductCard() {}
✅ function UserProfile() {}
✅ function ShoppingCartIcon() {}
✅ const NavigationBar = () => {};

// Component files
✅ ProductCard.tsx
✅ UserProfile.tsx
✅ ShoppingCartIcon.tsx
```

**camelCase** for component props:
```typescript
interface ProductCardProps {
  productId: string;
  productName: string;
  price: number;
  isOnSale: boolean;
  onAddToCart: () => void;
  onQuickView?: () => void;
}
```

### Hooks

**camelCase** with 'use' prefix:
```typescript
✅ function useAuth() {}
✅ function useCart() {}
✅ function useProductData(id: string) {}
✅ function useLocalStorage(key: string) {}
✅ function useDebounce(value: string, delay: number) {}

❌ function authHook() {}
❌ function getCart() {}    // Not hook-like
```

### Event Handlers

**camelCase** with 'handle' or 'on' prefix:
```typescript
// Component methods
✅ const handleClick = () => {};
✅ const handleSubmit = () => {};
✅ const handleInputChange = () => {};
✅ const handleAddToCart = () => {};

// Props
✅ <Button onClick={handleClick} />
✅ <Form onSubmit={handleSubmit} />
✅ <Input onChange={handleInputChange} />
```

### Boolean Variables

Use **is**, **has**, **should**, **can** prefixes:
```typescript
✅ const isLoading = true;
✅ const isAuthenticated = false;
✅ const hasPermission = true;
✅ const hasItems = cart.length > 0;
✅ const shouldShowModal = true;
✅ const canEdit = userRole === 'admin';
✅ const isVisible = !isHidden;

❌ const loading = true;      // Unclear type
❌ const authenticated = false; // Not obviously boolean
❌ const permission = true;   // Unclear
```

### Arrays & Collections

Use **plural nouns**:
```typescript
✅ const products = [];
✅ const users = [];
✅ const cartItems = [];
✅ const orderHistory = [];
✅ const categories = [];

❌ const productList = [];  // Redundant 'List'
❌ const productArray = []; // Redundant 'Array'
❌ const product = [];      // Confusing (singular)
```

### Objects & Maps

Use **singular nouns** for single entities:
```typescript
✅ const user = { name: "John" };
✅ const product = { id: "123" };
✅ const cartSummary = { total: 5000 };
✅ const orderDetails = { ... };

// Maps/Dictionaries: describe what they map
✅ const productById = new Map();
✅ const usersByEmail = {};
✅ const pricesByCategory = {};
```

---

## CSS / Tailwind

### Class Names

**kebab-case** for custom CSS classes:
```css
✅ .product-card {}
✅ .shopping-cart-icon {}
✅ .user-profile-menu {}
✅ .btn-primary {}
✅ .text-highlighted {}

❌ .productCard {}
❌ .shopping_cart_icon {}
❌ .UserProfileMenu {}
```

### BEM Methodology (if not using Tailwind)
```css
/* Block__Element--Modifier */
✅ .product-card {}
✅ .product-card__image {}
✅ .product-card__title {}
✅ .product-card__price {}
✅ .product-card--featured {}
✅ .product-card--on-sale {}

❌ .product-card-image {}    // Not clear it's child
❌ .productCardImage {}      // Not BEM
```

### Tailwind Custom Classes
```typescript
// tailwind.config.js
✅ colors: {
  'intact-blue': '#4A77B0',
  'energy-orange': '#FF6B35'
}

✅ spacing: {
  '128': '32rem'
}

❌ colors: {
  'IntactBlue': '#4A77B0',  // PascalCase in config
  'intact_blue': '#4A77B0'  // snake_case
}
```

---

## Database

### Table Names

**snake_case**, **plural**:
```sql
✅ users
✅ products
✅ order_items
✅ shopping_carts
✅ product_categories
✅ user_addresses

❌ Users            // PascalCase
❌ product          // Singular
❌ orderItems       // camelCase
❌ shopping-carts   // kebab-case
```

### Column Names

**snake_case**, descriptive:
```sql
✅ id
✅ user_id
✅ first_name
✅ last_name
✅ email_address
✅ created_at
✅ updated_at
✅ is_active
✅ has_discount
✅ price_amount

❌ firstName        // camelCase
❌ user-id          // kebab-case
❌ email            // Too generic (use email_address)
❌ createdAt        // camelCase
```

### Foreign Keys

Use `{table}_id` pattern:
```sql
✅ user_id          (references users.id)
✅ product_id       (references products.id)
✅ category_id      (references categories.id)
✅ order_id         (references orders.id)

❌ userId
❌ productID
❌ user_ref
```

### Indexes

Use descriptive names:
```sql
✅ idx_users_email
✅ idx_products_category_id
✅ idx_orders_user_id_created_at
✅ unq_users_email           (unique)
✅ fk_order_items_product_id (foreign key)

❌ index1
❌ users_idx
❌ idx_1
```

### Constraints

Use descriptive names:
```sql
✅ pk_users                    (primary key)
✅ fk_orders_user_id           (foreign key)
✅ unq_users_email             (unique)
✅ chk_products_price_positive (check constraint)

❌ constraint1
❌ fk1
```

---

## Files & Folders

### File Names

**kebab-case** for most files:
```
✅ product-card.tsx
✅ user-profile.tsx
✅ shopping-cart.service.ts
✅ api-client.ts
✅ use-auth.hook.ts

❌ ProductCard.tsx      (exception: React components can be PascalCase)
❌ user_profile.tsx
❌ shoppingCart.service.ts
```

**PascalCase** for component files (alternative):
```
✅ ProductCard.tsx
✅ UserProfile.tsx
✅ ShoppingCart.tsx
```

### Folder Names

**kebab-case**, plural for collections:
```
✅ components/
✅ features/
✅ products/
✅ user-profile/
✅ shopping-cart/

❌ Components/
❌ userProfile/
❌ shopping_cart/
```

### Special Files

```
✅ index.ts          (barrel exports)
✅ types.ts          (type definitions)
✅ constants.ts      (constants)
✅ utils.ts          (utilities)
✅ helpers.ts        (helper functions)
✅ hooks.ts          (custom hooks)
✅ README.md
✅ .env
✅ .gitignore
```

---

## API & URLs

### REST Endpoints

**kebab-case**, **plural**:
```
✅ /api/products
✅ /api/users
✅ /api/shopping-carts
✅ /api/order-items
✅ /api/product-categories

❌ /api/product          // Singular
❌ /api/Products         // PascalCase
❌ /api/shopping_carts   // snake_case
❌ /api/shoppingCarts    // camelCase
```

### Query Parameters

**camelCase**:
```
✅ ?page=1&limit=20
✅ ?sortBy=price&order=asc
✅ ?minPrice=1000&maxPrice=5000
✅ ?categoryId=laptops
✅ ?inStock=true

❌ ?sort_by=price
❌ ?min_price=1000
❌ ?category-id=laptops
```

### JSON Keys

**camelCase** in API responses:
```json
✅ {
  "userId": "123",
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john@example.com",
  "isActive": true,
  "createdAt": "2026-01-25T10:30:00Z"
}

❌ {
  "user_id": "123",
  "first_name": "John",
  "email-address": "john@example.com"
}
```

---

## Environment Variables

### Format

**SCREAMING_SNAKE_CASE** with prefixes:
```bash
✅ DATABASE_URL=postgres://...
✅ API_BASE_URL=https://api.example.com
✅ JWT_SECRET=secret123
✅ REDIS_HOST=localhost
✅ REDIS_PORT=6379
✅ NODE_ENV=production
✅ NEXT_PUBLIC_API_URL=https://api.example.com

❌ databaseUrl=postgres://...
❌ apiBaseUrl=https://api.example.com
❌ jwtSecret=secret123
```

### Prefixes

```
DATABASE_*       Database configuration
API_*            API endpoints
JWT_*            JWT configuration
REDIS_*          Redis configuration
SMTP_*           Email configuration
NEXT_PUBLIC_*    Client-exposed (Next.js)
VITE_*           Client-exposed (Vite)
```

---

## Git Branches

### Branch Naming

**kebab-case** with type prefix:
```
✅ feature/user-authentication
✅ feature/product-search
✅ bugfix/cart-calculation
✅ hotfix/payment-gateway
✅ refactor/api-client
✅ chore/update-dependencies
✅ docs/api-documentation

❌ userAuthentication
❌ feature_user_authentication
❌ Feature/UserAuthentication
```

### Branch Types
```
feature/*    New features
bugfix/*     Bug fixes
hotfix/*     Critical production fixes
refactor/*   Code refactoring
chore/*      Maintenance tasks
docs/*       Documentation
test/*       Test improvements
```

---

## Commit Messages

### Format
```
type(scope): Subject line

- Detailed description
- List of changes
```

### Types
```
feat:      New feature
fix:       Bug fix
docs:      Documentation
style:     Formatting, missing semicolons
refactor:  Code restructuring
test:      Adding tests
chore:     Maintenance
perf:      Performance improvement
```

### Examples
```
✅ feat(auth): Add social login support
✅ fix(cart): Correct total calculation for discounts
✅ docs(api): Update product endpoints documentation
✅ refactor(search): Optimize query performance
✅ chore(deps): Update Next.js to v14

❌ Fixed bug
❌ Updated files
❌ Changes
```

---

## Test Files

### Naming
```
✅ user.test.ts
✅ product-card.test.tsx
✅ shopping-cart.spec.ts
✅ api-client.integration.test.ts
✅ auth.e2e.test.ts

// Test suites
describe('ProductCard', () => {
  describe('rendering', () => {
    it('should display product name', () => {});
    it('should show price with currency', () => {});
  });
  
  describe('interactions', () => {
    it('should call onAddToCart when button clicked', () => {});
  });
});
```

---

## Constants & Enums

### Constants
```typescript
// File: constants/routes.ts
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile'
} as const;

// File: constants/config.ts
export const CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  DEFAULT_PAGE_SIZE: 20,
  MAX_FILE_SIZE: 5242880
} as const;
```

### Enums (TypeScript)
```typescript
// PascalCase for enum name
// SCREAMING_SNAKE_CASE for values
enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// Alternative: Object with 'as const'
const OrderStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const;

type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];
```

---

## Comments & Documentation

### JSDoc Comments
```typescript
/**
 * Calculates the total price of cart items including tax and shipping
 * 
 * @param items - Array of cart items
 * @param taxRate - Tax rate as decimal (e.g., 0.15 for 15%)
 * @param shippingCost - Flat shipping cost
 * @returns Total price including tax and shipping
 * 
 * @example
 * ```typescript
 * const total = calculateCartTotal(items, 0.15, 50);
 * ```
 */
export function calculateCartTotal(
  items: CartItem[],
  taxRate: number,
  shippingCost: number
): number {
  // Implementation
}
```

### Inline Comments
```typescript
// Use sentence case with proper punctuation
✅ // Calculate subtotal before applying tax
✅ // TODO: Add error handling for invalid input
✅ // FIXME: This doesn't handle edge case when quantity is 0

❌ // calculate subtotal
❌ // todo add error handling
❌ // this doesn't work
```

---

## Package Names

### npm Package Names
```
✅ @intact-ghana/ui-components
✅ @intact-ghana/api-client
✅ @intact-ghana/shared-types

❌ @IntactGhana/UIComponents
❌ @intact_ghana/api_client
```

---

## Quick Reference

| Category | Convention | Example |
|----------|-----------|---------|
| Variables | camelCase | `userName`, `isActive` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| Functions | camelCase (verb) | `getUserData()` |
| Classes | PascalCase | `UserService` |
| Interfaces | PascalCase | `UserProps` |
| Types | PascalCase | `UserId` |
| Components | PascalCase | `ProductCard` |
| Hooks | camelCase (use prefix) | `useAuth()` |
| CSS Classes | kebab-case | `product-card` |
| Files | kebab-case | `product-card.tsx` |
| Folders | kebab-case | `user-profile/` |
| Database Tables | snake_case (plural) | `users`, `order_items` |
| Database Columns | snake_case | `first_name`, `created_at` |
| API Endpoints | kebab-case (plural) | `/api/products` |
| Query Params | camelCase | `?sortBy=price` |
| JSON Keys | camelCase | `"firstName"` |
| Env Variables | SCREAMING_SNAKE_CASE | `DATABASE_URL` |
| Git Branches | kebab-case (prefix) | `feature/user-auth` |

---

This naming convention guide ensures consistency and clarity across all Intact Ghana codebases.