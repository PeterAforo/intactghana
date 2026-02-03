# Intact Ghana API Conventions
**Version 1.0 | Last Updated: January 2026**

## General Principles

### REST Principles
1. **Resource-Oriented**: URLs represent resources, not actions
2. **Stateless**: Each request contains all necessary information
3. **Cacheable**: Responses indicate cacheability
4. **Uniform Interface**: Consistent patterns across all endpoints
5. **Layered System**: Client doesn't know if connected directly to server

---

## URL Structure

### Base URL
```
Production:  https://api.intactghana.com/v1
Staging:     https://api-staging.intactghana.com/v1
Development: http://localhost:3000/api/v1
```

### Versioning
- Use URL path versioning: `/v1`, `/v2`
- Major version changes only (breaking changes)
- Support N-1 versions (e.g., v1 and v2 simultaneously)
- Deprecation notice: 6 months before removal

### Resource Naming
```
✅ Good:
/products
/products/{id}
/products/{id}/reviews
/users/{id}/orders
/categories/{id}/products

❌ Bad:
/getProducts
/product_list
/Product
/get-product-by-id
```

**Rules:**
- Use **plural nouns** for collections
- Use **lowercase** with hyphens for multi-word resources
- Keep URLs **shallow** (max 3 levels)
- Use resource **IDs**, not names in URLs
- Avoid verbs in URLs (use HTTP methods instead)

---

## HTTP Methods

### Standard Methods
```
GET     - Retrieve resource(s)        (Safe, Idempotent)
POST    - Create new resource         (Not Safe, Not Idempotent)
PUT     - Update/Replace resource     (Not Safe, Idempotent)
PATCH   - Partially update resource   (Not Safe, Idempotent)
DELETE  - Remove resource             (Not Safe, Idempotent)
HEAD    - Get headers only            (Safe, Idempotent)
OPTIONS - Get allowed methods         (Safe, Idempotent)
```

### Method Usage Examples
```http
# GET - Retrieve
GET /products                    # List all products
GET /products/{id}               # Get specific product
GET /products?category=laptops   # Filtered list

# POST - Create
POST /products                   # Create new product
POST /orders                     # Create new order

# PUT - Full Update (replace entire resource)
PUT /products/{id}               # Update entire product

# PATCH - Partial Update
PATCH /products/{id}             # Update specific fields
PATCH /users/{id}                # Update user profile

# DELETE - Remove
DELETE /products/{id}            # Delete product
DELETE /cart/items/{id}          # Remove cart item
```

---

## Request Format

### Headers
```http
# Required Headers
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}

# Optional Headers
X-Request-ID: uuid-v4              # For request tracing
Accept-Language: en-US,en;q=0.9    # Localization
X-API-Version: 1.0                 # Explicit version
X-Client-Version: 2.3.1            # Client app version
```

### Query Parameters

**Pagination:**
```
GET /products?page=1&limit=20

Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 20, max: 100)
- offset: Alternative to page (skip N items)
```

**Filtering:**
```
GET /products?category=laptops&brand=hp&minPrice=1000&maxPrice=5000

Rules:
- Use query params for simple filters
- Use camelCase for param names
- Use meaningful names (not abbreviations)
- Support multiple values: ?brand=hp&brand=dell
```

**Sorting:**
```
GET /products?sort=price          # Ascending
GET /products?sort=-price         # Descending (- prefix)
GET /products?sort=price,-rating  # Multiple fields
```

**Field Selection:**
```
GET /products?fields=id,name,price,image
GET /products/{id}?fields=name,description

# Reduces payload size
# Only returns requested fields
```

**Search:**
```
GET /products?q=gaming+laptop
GET /search?query=iphone&type=products
```

### Request Body

**JSON Format (Preferred):**
```json
{
  "name": "HP Laptop",
  "price": 5000,
  "category": "laptops",
  "inStock": true,
  "specifications": {
    "ram": "16GB",
    "storage": "512GB SSD"
  },
  "tags": ["gaming", "business"]
}
```

**Rules:**
- Use camelCase for keys
- Use appropriate data types (number, boolean, null)
- Nest related data logically
- Keep depth reasonable (max 3-4 levels)
- Use arrays for lists

---

## Response Format

### Success Response Structure
```json
{
  "success": true,
  "data": {
    "id": "prod_123abc",
    "name": "HP Laptop",
    "price": 5000
  },
  "meta": {
    "timestamp": "2026-01-25T10:30:00Z",
    "requestId": "req_xyz789"
  }
}
```

### Collection Response
```json
{
  "success": true,
  "data": [
    {
      "id": "prod_123",
      "name": "Product 1"
    },
    {
      "id": "prod_456",
      "name": "Product 2"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  },
  "meta": {
    "timestamp": "2026-01-25T10:30:00Z",
    "requestId": "req_xyz789"
  }
}
```

### Error Response Structure
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 'prod_999' not found",
    "statusCode": 404,
    "details": {
      "productId": "prod_999",
      "suggestions": ["prod_123", "prod_456"]
    }
  },
  "meta": {
    "timestamp": "2026-01-25T10:30:00Z",
    "requestId": "req_xyz789"
  }
}
```

---

## HTTP Status Codes

### Success Codes (2xx)
```
200 OK                  - Successful GET, PUT, PATCH
201 Created             - Successful POST (resource created)
202 Accepted            - Request accepted for async processing
204 No Content          - Successful DELETE, no body returned
206 Partial Content     - Partial GET (range request)
```

### Client Error Codes (4xx)
```
400 Bad Request         - Invalid request format/parameters
401 Unauthorized        - Missing or invalid authentication
403 Forbidden           - Valid auth, but insufficient permissions
404 Not Found           - Resource doesn't exist
405 Method Not Allowed  - HTTP method not supported for resource
409 Conflict            - Request conflicts with current state
422 Unprocessable       - Validation errors
429 Too Many Requests   - Rate limit exceeded
```

### Server Error Codes (5xx)
```
500 Internal Server     - Generic server error
502 Bad Gateway         - Invalid response from upstream
503 Service Unavailable - Temporary server unavailability
504 Gateway Timeout     - Upstream server timeout
```

### Status Code Usage Examples
```http
# 200 OK - Successful retrieval
GET /products/123
Response: 200 OK

# 201 Created - Resource created
POST /products
Response: 201 Created
Location: /products/456

# 204 No Content - Successful deletion
DELETE /products/123
Response: 204 No Content

# 400 Bad Request - Validation error
POST /products
Body: { "price": "invalid" }
Response: 400 Bad Request

# 401 Unauthorized - No token
GET /users/me
Response: 401 Unauthorized

# 404 Not Found
GET /products/999
Response: 404 Not Found

# 409 Conflict - Email already exists
POST /users/register
Body: { "email": "existing@email.com" }
Response: 409 Conflict

# 422 Unprocessable - Validation errors
POST /products
Body: { "name": "A" }  # Too short
Response: 422 Unprocessable Entity
```

---

## Error Codes

### Standard Error Codes
```typescript
// Authentication Errors (AUTH_*)
AUTH_INVALID_TOKEN        - JWT token invalid or expired
AUTH_MISSING_TOKEN        - Authorization header missing
AUTH_INVALID_CREDENTIALS  - Wrong email/password
AUTH_EMAIL_NOT_VERIFIED   - Email verification required
AUTH_ACCOUNT_DISABLED     - Account has been disabled

// Authorization Errors (AUTHZ_*)
AUTHZ_INSUFFICIENT_PERMISSIONS - Lacks required permission
AUTHZ_RESOURCE_FORBIDDEN       - Cannot access this resource

// Validation Errors (VALIDATION_*)
VALIDATION_FAILED             - General validation failure
VALIDATION_REQUIRED_FIELD     - Required field missing
VALIDATION_INVALID_FORMAT     - Invalid data format
VALIDATION_OUT_OF_RANGE       - Value outside allowed range
VALIDATION_DUPLICATE          - Duplicate value (e.g., email)

// Resource Errors (RESOURCE_*)
RESOURCE_NOT_FOUND           - Resource doesn't exist
RESOURCE_ALREADY_EXISTS      - Resource already exists
RESOURCE_CONFLICT            - Resource state conflict
RESOURCE_LOCKED              - Resource is locked

// Business Logic Errors (BUSINESS_*)
BUSINESS_INSUFFICIENT_STOCK  - Not enough inventory
BUSINESS_INVALID_COUPON      - Coupon invalid/expired
BUSINESS_ORDER_CANCELLED     - Order already cancelled
BUSINESS_PAYMENT_FAILED      - Payment processing failed

// System Errors (SYSTEM_*)
SYSTEM_INTERNAL_ERROR        - Generic server error
SYSTEM_DATABASE_ERROR        - Database operation failed
SYSTEM_EXTERNAL_API_ERROR    - Third-party API error
SYSTEM_MAINTENANCE           - System under maintenance

// Rate Limit Errors (RATE_*)
RATE_LIMIT_EXCEEDED          - Too many requests
```

### Error Response Examples
```json
// Validation Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Validation failed for one or more fields",
    "statusCode": 422,
    "details": {
      "errors": [
        {
          "field": "email",
          "message": "Invalid email format",
          "code": "VALIDATION_INVALID_FORMAT"
        },
        {
          "field": "password",
          "message": "Password must be at least 8 characters",
          "code": "VALIDATION_OUT_OF_RANGE"
        }
      ]
    }
  }
}

// Business Logic Error
{
  "success": false,
  "error": {
    "code": "BUSINESS_INSUFFICIENT_STOCK",
    "message": "Only 3 units available, but you requested 5",
    "statusCode": 409,
    "details": {
      "productId": "prod_123",
      "requested": 5,
      "available": 3
    }
  }
}

// Rate Limit Error
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 60 seconds",
    "statusCode": 429,
    "details": {
      "limit": 100,
      "window": 3600,
      "retryAfter": 60
    }
  }
}
```

---

## Authentication

### JWT Authentication
```http
# Login Request
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

# Login Response
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 900,
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}

# Authenticated Request
GET /users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Token Refresh
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

# Response
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 900
  }
}
```

---

## Pagination

### Cursor-Based Pagination (Recommended for large datasets)
```http
GET /products?limit=20&cursor=eyJpZCI6InByb2RfMTIzIn0

Response:
{
  "data": [...],
  "pagination": {
    "limit": 20,
    "nextCursor": "eyJpZCI6InByb2RfMTQzIn0",
    "prevCursor": "eyJpZCI6InByb2RfMTAzIn0",
    "hasNext": true,
    "hasPrev": true
  }
}
```

### Offset-Based Pagination (Simpler, less performant)
```http
GET /products?page=2&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": true
  }
}
```

---

## Filtering & Sorting

### Complex Filtering
```http
# Multiple filters (AND logic)
GET /products?category=laptops&brand=hp&minPrice=1000&maxPrice=5000&inStock=true

# Range filters
GET /products?price[gte]=1000&price[lte]=5000
GET /orders?createdAt[gte]=2026-01-01&createdAt[lt]=2026-02-01

# Array filters (OR logic for same field)
GET /products?brand=hp&brand=dell&brand=lenovo
GET /products?brand[in]=hp,dell,lenovo

# Negation
GET /products?category[ne]=accessories
GET /products?brand[nin]=xiaomi,tecno

# Text search
GET /products?name[contains]=gaming
GET /products?name[startsWith]=HP
```

### Sorting
```http
# Single field
GET /products?sort=price              # Ascending
GET /products?sort=-price             # Descending

# Multiple fields
GET /products?sort=category,-price    # Category ASC, Price DESC

# Complex sorting
GET /products?sort[category]=asc&sort[price]=desc
```

---

## Rate Limiting

### Headers
```http
X-RateLimit-Limit: 1000          # Max requests per window
X-RateLimit-Remaining: 847       # Requests left
X-RateLimit-Reset: 1706182800    # Unix timestamp of reset
Retry-After: 60                  # Seconds to wait (if limited)
```

### Rate Limit Tiers
```
Anonymous:      100 requests/hour
Authenticated:  1,000 requests/hour
Premium:        10,000 requests/hour
Admin:          Unlimited
```

### Rate Limit Response
```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1706182800
Retry-After: 60

{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 60 seconds",
    "statusCode": 429
  }
}
```

---

## Caching

### Cache Headers
```http
# Public cache (CDN + Browser)
Cache-Control: public, max-age=3600

# Private cache (Browser only)
Cache-Control: private, max-age=300

# No cache
Cache-Control: no-cache, no-store, must-revalidate

# Conditional requests
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Last-Modified: Wed, 25 Jan 2026 10:30:00 GMT
```

### Conditional Requests
```http
# Client sends:
GET /products/123
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# Server responds (if not modified):
HTTP/1.1 304 Not Modified
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# Server responds (if modified):
HTTP/1.1 200 OK
ETag: "new-etag-value"
{...updated data...}
```

---

## Idempotency

### Idempotency Keys (for non-idempotent operations)
```http
POST /orders
Idempotency-Key: order_create_123456789
Content-Type: application/json

{
  "items": [...],
  "total": 5000
}

# Duplicate request with same key returns cached response
# Prevents duplicate orders on network retries
```

---

## Batch Operations

### Batch Requests
```http
POST /batch
Content-Type: application/json

{
  "requests": [
    {
      "id": "req1",
      "method": "GET",
      "url": "/products/123"
    },
    {
      "id": "req2",
      "method": "GET",
      "url": "/products/456"
    }
  ]
}

# Response
{
  "responses": [
    {
      "id": "req1",
      "status": 200,
      "body": {...}
    },
    {
      "id": "req2",
      "status": 200,
      "body": {...}
    }
  ]
}
```

---

## Webhooks

### Webhook Structure
```http
POST https://merchant.example.com/webhooks/intact
Content-Type: application/json
X-Intact-Signature: sha256=abc123...

{
  "event": "order.created",
  "timestamp": "2026-01-25T10:30:00Z",
  "data": {
    "orderId": "order_123",
    "userId": "user_456",
    "total": 5000
  }
}
```

### Webhook Events
```
order.created
order.updated
order.cancelled
order.completed

payment.succeeded
payment.failed

product.updated
product.out_of_stock
product.price_changed
```

---

## API Documentation

### OpenAPI (Swagger) Specification
```yaml
openapi: 3.0.0
info:
  title: Intact Ghana API
  version: 1.0.0
  description: E-commerce API for Intact Ghana

servers:
  - url: https://api.intactghana.com/v1
    description: Production
  - url: https://api-staging.intactghana.com/v1
    description: Staging

paths:
  /products:
    get:
      summary: List products
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductList'
```

---

## Best Practices Summary

✅ **DO:**
- Use plural nouns for resources
- Use HTTP methods correctly
- Return appropriate status codes
- Include meaningful error messages
- Version your API
- Implement pagination for collections
- Use HTTPS everywhere
- Validate all inputs
- Log all requests
- Rate limit API calls
- Cache when appropriate
- Document your API

❌ **DON'T:**
- Use verbs in URLs
- Expose internal IDs in errors
- Return sensitive data
- Ignore security headers
- Skip input validation
- Over-nest resources (keep shallow)
- Use inconsistent naming
- Forget to paginate
- Block on long operations (use async)
- Return different structures for same endpoint

---

This convention guide ensures consistency, predictability, and developer-friendly APIs across all Intact Ghana services.