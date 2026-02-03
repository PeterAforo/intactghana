# Intact Ghana UX Flows
**Version 1.0 | Last Updated: January 2026**

## Overview
This document outlines all major user journeys through the Intact Ghana platform, including happy paths, error states, and edge cases.

---

## 1. Product Discovery & Search

### 1.1 Homepage Landing
**Entry Point:** User visits intactghana.com

**Flow:**
1. Page loads with hero section (skeleton → content)
2. Featured products appear with staggered animation
3. Personalized recommendations load (if returning user)
4. AI chatbot bubble pulses once after 3 seconds

**Elements:**
- Hero banner with promotional content
- Quick category navigation
- Featured products grid
- AI-powered recommendations
- Recently viewed (returning users)
- Trust indicators (delivery, return policy)

**Success Metrics:**
- Time to interactive < 2s
- User scrolls below fold
- User clicks on product/category

---

### 1.2 Natural Language Search
**Entry Point:** User types in search bar

**Flow:**
1. User clicks search input
   - Input expands with smooth animation
   - Focus ring appears
   - Recent searches dropdown (if any)

2. User types query (e.g., "laptop for video editing under 10000 cedis")
   - AI processes natural language
   - Loading indicator appears
   - Suggestions appear below (100ms delay)

3. Search results display
   - Skeleton cards appear immediately
   - Results fade in with stagger (30ms per item)
   - Filters panel slides in from left
   - AI interpretation shown: "Showing laptops suitable for video editing under GH¢10,000"

4. Smart filters auto-applied
   - Price range: 0-10,000 cedis
   - Category: Laptops
   - Features: High RAM, dedicated GPU highlighted

**Error States:**
- No results: Show AI suggestion for similar products
- Typos: Auto-correct with "Did you mean...?"
- Too broad: AI suggests narrowing criteria

**Interactions:**
- Voice search button (microphone icon)
- Visual search (camera icon)
- Recent searches (clock icon)

---

### 1.3 Visual Search
**Entry Point:** User clicks camera icon in search

**Flow:**
1. Camera permission request (if first time)
2. Camera interface opens OR file upload option
3. User captures/uploads product image
4. AI analyzes image (loading animation)
5. Similar products displayed
   - Confidence score shown
   - "Is this what you're looking for?" confirmation
6. Refine results with additional filters

**Edge Cases:**
- Image unclear: "Try a clearer image" with tips
- No match: "Couldn't find exact match. Here are similar items"
- Multiple products in image: AI highlights each, asks which one

---

### 1.4 Category Browsing
**Entry Point:** User hovers on category menu

**Flow:**
1. Mega menu slides down (200ms)
2. Subcategories display with icons
3. Featured products in category show as thumbnails
4. Hover on subcategory highlights it
5. Click navigates to category page

**Category Page:**
1. Hero banner for category
2. Breadcrumb navigation
3. Filter panel (left sidebar)
4. Sort options (top right)
5. Product grid (responsive)
6. Infinite scroll with loading indicator

**Filter System:**
- Instant filter application (no page reload)
- Multiple filters combine (AND logic)
- Active filters shown as removable chips
- "Clear all" option
- Filter count badges

---

### 1.5 AI-Powered Recommendations
**Entry Point:** Logged-in user or cookie-tracked visitor

**Algorithm Triggers:**
- Browsing history
- Purchase history
- Cart contents
- Similar users' behavior
- Trending products
- Seasonal relevance

**Display Locations:**
- Homepage: "Recommended for you"
- Product page: "You might also like"
- Cart page: "Complete your setup"
- Checkout: "Frequently bought together"

**Interaction:**
- Products load progressively
- User can dismiss recommendations
- Feedback: "Why am I seeing this?" tooltip
- Action: "Not interested" removes from future

---

## 2. Product Details & Evaluation

### 2.1 Product Page View
**Entry Point:** User clicks product card

**Flow:**
1. **Image Gallery (Left 60%)**
   - Main image with zoom capability
   - Thumbnail gallery below
   - 360° view icon (if available)
   - AR view button (compatible devices)
   - Video button (if available)

2. **Product Info (Right 40%)**
   - Product title (H1)
   - Brand logo
   - Star rating + review count
   - Price (large, prominent)
   - Stock status indicator
   - Key features (bullet points)
   - Quantity selector
   - Add to Cart (primary CTA)
   - Add to Wishlist (secondary)
   - Compare button
   - Share button

3. **Below Fold Sections**
   - Full specifications (tabs)
   - Customer reviews
   - Q&A section
   - Related products
   - Recently viewed

**Interactions:**
- **Image Zoom**: Click/hover to magnify (2x)
- **Image Switch**: Click thumbnail, crossfade 300ms
- **360° View**: Drag to rotate product
- **AR View**: Opens camera overlay, places product in space
- **Quantity**: +/- buttons, manual input validation
- **Add to Cart**: Pulse animation, toast notification, cart badge update

---

### 2.2 AR Product Visualization
**Entry Point:** User clicks "View in your space"

**Requirements:**
- Compatible device (iOS 12+, Android ARCore)
- Camera permission

**Flow:**
1. Permission request (if first time)
2. Camera opens with AR overlay
3. Instructions: "Point camera at floor"
4. Product appears in space (scaled correctly)
5. User can:
   - Move product (drag)
   - Rotate (two-finger twist)
   - Scale (pinch)
   - Take screenshot
   - Share screenshot

6. "Add to Cart" button overlay
7. Exit returns to product page

**Error States:**
- Incompatible device: Hide AR button
- Permission denied: Show fallback images
- Tracking lost: "Move camera to find surface"

---

### 2.3 Product Comparison
**Entry Point:** User adds products to comparison

**Flow:**
1. User clicks "Compare" on product cards (max 4)
2. Floating comparison bar appears at bottom
3. Shows thumbnails of selected products
4. "Compare now" button (when 2+ selected)

**Comparison Page:**
1. Products in columns
2. Specifications in rows
3. Differences highlighted
4. Similar specs grouped
5. Scroll syncs all columns
6. Quick add to cart for each

**Features:**
- Side-by-side view
- Highlight differences only (toggle)
- Print comparison
- Share comparison link
- AI summary: "Best for your needs"

---

### 2.4 Reviews & Ratings
**Entry Point:** User scrolls to reviews section

**Display:**
1. **Summary Box**
   - Average rating (large stars)
   - Total review count
   - Rating distribution (bars)
   - Verified purchase percentage

2. **Filters**
   - Sort: Recent, Helpful, Rating
   - Filter: Verified only, With photos, By rating

3. **Review Cards**
   - Reviewer name/avatar
   - Star rating
   - Verified badge
   - Date
   - Review text
   - Photos (if any)
   - Helpful votes
   - Reply from Intact (if any)

**Writing Review:**
1. "Write a review" button
2. Modal opens
3. Star rating (required)
4. Title (optional)
5. Review text (required, 50 char min)
6. Upload photos (optional, max 5)
7. Verify purchase (auto-checked if bought)
8. Submit
9. Success message: "Thanks! Review will appear after moderation"

---

### 2.5 AI Chat Assistant (Product Questions)
**Entry Point:** User clicks chat bubble

**Flow:**
1. Chat modal slides in from bottom-right
2. Greeting: "Hi! I'm IntactBot. How can I help?"
3. Suggested questions appear (if on product page):
   - "Is this in stock?"
   - "What's the warranty?"
   - "Compare with [similar product]"
   - "What accessories do I need?"

**Capabilities:**
- Answer specs questions
- Check stock/delivery
- Explain technical terms
- Recommend alternatives
- Process simple orders
- Escalate to human (if needed)

**Conversation Flow:**
1. User asks question
2. Typing indicator (1-2s)
3. AI response with citations
4. Follow-up suggestions
5. "Was this helpful?" feedback

**Handoff to Human:**
- Complex questions
- Complaints
- Special requests
- AI uncertainty > 30%

---

## 3. Shopping Cart & Checkout

### 3.1 Add to Cart
**Entry Point:** User clicks "Add to Cart"

**Flow:**
1. Button state changes:
   - Pulse animation
   - Loading spinner
   - "Added!" confirmation

2. Toast notification (top-right):
   - Product thumbnail
   - "Added to cart"
   - "View cart" link
   - "Continue shopping" (auto-dismiss 3s)

3. Cart badge updates:
   - Bounce animation
   - New count

4. Mini cart (optional):
   - Slide-out panel from right
   - Shows cart contents
   - Subtotal
   - "Checkout" CTA
   - Auto-hides after 5s

**Edge Cases:**
- Out of stock: Disable button, show "Notify me"
- Low stock: Warning badge "Only X left"
- Max quantity: "Maximum quantity reached"
- Already in cart: "Update quantity" modal

---

### 3.2 Cart Page
**Entry Point:** User clicks cart icon or "View cart"

**Layout:**
1. **Cart Items (Left 65%)**
   - Product image
   - Name + basic specs
   - Price (unit + total)
   - Quantity selector
   - Remove button
   - Move to wishlist
   - Stock status

2. **Summary (Right 35%)**
   - Subtotal
   - Delivery estimate
   - Tax (if applicable)
   - Total (prominent)
   - Promo code input
   - "Proceed to Checkout" CTA
   - Secure checkout badges

3. **Recommendations**
   - "Complete your setup"
   - Frequently bought together
   - Accessories for cart items

**Interactions:**
- **Update quantity**: Debounced API call, optimistic UI
- **Remove item**: Confirm modal, undo option (toast)
- **Save for later**: Moves to wishlist
- **Apply promo**: Validate, show discount, update total

---

### 3.3 Checkout Flow
**Entry Point:** User clicks "Proceed to Checkout"

**Multi-Step Process:**

#### Step 1: Guest or Login
```
├─ Returning customer: Login form
│  ├─ Email/phone + password
│  ├─ "Forgot password" link
│  └─ Social login options
│
└─ New customer: Guest checkout or Register
   ├─ Guest: Email + Continue
   └─ Register: Email, password, name
```

#### Step 2: Delivery Information
```
Form Fields:
├─ Full Name *
├─ Phone Number *
├─ Email *
├─ Region (dropdown) *
├─ City (auto-suggest) *
├─ Address Line 1 *
├─ Address Line 2
├─ Landmark (optional)
├─ Delivery Instructions (optional)
└─ [Save address] checkbox
```

**Features:**
- Auto-complete for returning users
- Address validation with Google Maps API
- Multiple saved addresses
- Location picker map
- Delivery area checker

#### Step 3: Delivery Method
```
Options:
├─ Standard (3-5 days) - Free over GH¢3000
├─ Express (1-2 days) - GH¢50
├─ Same Day (Accra only) - GH¢100
└─ Store Pickup (Free)
```

**Interaction:**
- Select delivery slot (calendar picker)
- Real-time availability
- Store location map (if pickup)

#### Step 4: Payment Method
```
Options:
├─ Mobile Money
│  ├─ MTN Mobile Money
│  ├─ Vodafone Cash
│  └─ AirtelTigo Money
│
├─ Card Payment
│  ├─ Visa/Mastercard
│  └─ Saved cards (returning users)
│
├─ Bank Transfer
├─ Pay on Delivery
└─ Buy Now Pay Later (Canpay)
```

**Payment Flow:**
1. Select method
2. Enter details (secure form)
3. Review order summary
4. Confirm terms checkbox
5. "Place Order" button

**Security:**
- PCI compliance badges
- Encrypted connection icon
- "Your data is safe" message

#### Step 5: Order Confirmation
```
Success Page:
├─ Order number (large, copyable)
├─ Success animation (checkmark)
├─ Estimated delivery date
├─ Tracking information
├─ Receipt (email sent)
├─ "Continue shopping" CTA
└─ "Download invoice" button
```

**Post-Order:**
- Confirmation email sent
- SMS notification
- Order added to account
- Recommendation engine updates

---

### 3.4 Progress Indicators
**Throughout Checkout:**
```
[1. Cart] → [2. Delivery] → [3. Payment] → [4. Confirm]
   ✓           Active          Pending      Pending
```

- Clear step numbers
- Visual progress bar
- Can navigate back
- Current step highlighted
- Completed steps marked

---

### 3.5 Error Handling in Checkout

**Validation Errors:**
- Inline, real-time
- Icon + message below field
- Field border turns red
- Cannot proceed until fixed

**Payment Failures:**
```
Error Page:
├─ Error message (user-friendly)
├─ Suggested actions
├─ "Try again" button
├─ Alternative payment methods
├─ Contact support link
└─ Cart preserved (no data loss)
```

**Abandoned Cart Recovery:**
- Email after 1 hour (if logged in)
- 24 hour reminder
- Promo code incentive (optional)

---

## 4. Account Management

### 4.1 Registration Flow
**Entry Point:** "Create Account" or during checkout

**Flow:**
1. Registration form:
   - Full name
   - Email
   - Phone number
   - Password (strength indicator)
   - Confirm password
   - [Agree to terms] checkbox

2. Social signup options:
   - Google
   - Facebook
   - Apple

3. Email verification:
   - Code sent to email
   - Enter 6-digit code
   - "Resend code" (60s cooldown)

4. Welcome screen:
   - Success message
   - Profile completion prompt
   - Personalization questions

**Personalization Quiz:**
- What are you shopping for? (categories)
- Budget range preference
- Preferred brands
- Marketing preferences

---

### 4.2 Login Flow
**Entry Point:** "Login" button

**Flow:**
1. Login modal opens
2. Email/phone + password
3. "Remember me" checkbox
4. "Forgot password?" link
5. Social login options
6. "New here? Register"

**Forgot Password:**
1. Enter email/phone
2. Verification code sent
3. Enter code
4. New password form
5. Success → Auto-login

---

### 4.3 Dashboard
**Entry Point:** "My Account" after login

**Navigation (Sidebar):**
```
├─ Dashboard (Overview)
├─ Orders
├─ Wishlist
├─ Reviews
├─ Addresses
├─ Payment Methods
├─ Notifications
├─ Preferences
└─ Logout
```

**Dashboard Overview:**
1. Welcome message
2. Quick stats:
   - Orders this month
   - Wishlist items
   - Available points/credits

3. Recent orders (3 most recent)
4. Personalized recommendations
5. Active promotions

---

### 4.4 Order Management
**Entry Point:** Orders section in dashboard

**Order List:**
- Filterable: All, Processing, Shipped, Delivered
- Searchable by order number
- Sortable by date
- Pagination

**Order Card:**
```
Order #INT-2026-00123
Date: Jan 25, 2026
Status: [In Transit] ●●●○
Items: 3
Total: GH¢5,499
[Track] [View Details] [Reorder]
```

**Order Details Page:**
1. **Status Timeline**
   ```
   [Placed] → [Confirmed] → [Shipped] → [Delivered]
      ✓           ✓            ●            ○
   ```

2. **Tracking Map** (if available)
   - Real-time location
   - Estimated arrival
   - Driver contact (if same-day)

3. **Items Ordered**
   - Product details
   - Quantities
   - Prices

4. **Delivery Address**
5. **Payment Info**
6. **Invoice Download**
7. **Actions**
   - Cancel order (if not shipped)
   - Return request (if delivered < 5 days)
   - Contact support
   - Write review (if delivered)

---

### 4.5 Wishlist
**Entry Point:** Heart icon on products OR account dashboard

**Features:**
- Add/remove items
- Move to cart (all or individual)
- Price drop notifications
- Back in stock alerts
- Share wishlist
- Create multiple lists (collections)

**Smart Features:**
- "On sale now" badge
- Price history graph
- Alternative suggestions
- "Best time to buy" AI prediction

---

### 4.6 Profile Settings
**Entry Point:** Profile/Settings in dashboard

**Sections:**

**Personal Information:**
- Name, email, phone (editable)
- Photo upload
- Birthday (for offers)
- Gender (optional)

**Security:**
- Change password
- Two-factor authentication
- Active sessions
- Login history

**Preferences:**
- Language (English, Twi, Ga)
- Currency (GH¢, $)
- Notification settings
- Email preferences
- Theme (Light/Dark/Auto)

**Privacy:**
- Data download
- Account deletion
- Cookie preferences
- Marketing consent

---

## 5. AI-Powered Features

### 5.1 Smart Product Finder
**Entry Point:** "Find My Perfect Product" widget

**Flow:**
1. AI asks contextual questions:
   - Budget?
   - Primary use case?
   - Must-have features?
   - Brand preference?

2. User answers via chat or options
3. AI processes requirements
4. Top 3 recommendations shown
5. Comparison table
6. "Why we recommend this" explanations

---

### 5.2 Virtual Shopping Assistant
**Entry Point:** Chat bubble, always available

**Capabilities:**
1. **Product Search**: Natural language queries
2. **Recommendations**: Based on needs
3. **Comparisons**: Side-by-side analysis
4. **Technical Support**: Explain specs, compatibility
5. **Order Help**: Track orders, initiate returns
6. **Store Info**: Hours, location, stock checks

**Conversation Examples:**
```
User: "I need a laptop for my daughter who's starting university"

Bot: "Great! A few questions to help me find the perfect laptop:
     1. What will she study?
     2. Budget range?
     3. Size preference? (13", 15", 17")"

User: "Computer science, around 5000 cedis, prefer 15 inch"

Bot: "Perfect! For Computer Science, she'll need:
     ✓ Good processor (i5 or Ryzen 5+)
     ✓ 8GB RAM minimum
     ✓ 256GB SSD
     
     I found 3 great options within your budget:
     [Shows products with comparisons]
     
     My top pick: HP 15-FD0036NIA
     Why? Best value, reliable brand, perfect specs for coding"
```

---

### 5.3 Price Prediction & Alerts
**Entry Point:** Product page "Price Insights" section

**Features:**
1. **Price History Graph** (90 days)
2. **Price Trend**: Rising/Falling/Stable
3. **Best Time to Buy**: AI prediction
4. **Price Alert**: Set target price
5. **Comparison**: vs. competitors

**Alert Notification:**
```
📉 Price Drop Alert!

HP 15-FD0036NIA is now GH¢7,499
(Was GH¢8,499 - You save GH¢1,000!)

[Buy Now] [View Product]
```

---

### 5.4 Smart Bundle Recommendations
**Entry Point:** Cart page, product page

**Algorithm:**
- Analyzes cart contents
- Finds complementary products
- Checks compatibility
- Suggests bundles

**Display:**
```
Complete Your Setup
[Laptop] + [Mouse] + [Laptop Bag] = Save 15%

Individual: GH¢8,499
Bundle: GH¢7,224
You save: GH¢1,275

[Add Bundle to Cart]
```

---

## 6. Support & Help

### 6.1 Help Center
**Entry Point:** Footer link, support icon

**Structure:**
```
├─ Search (smart search with AI)
├─ Popular Topics
│  ├─ Delivery & Shipping
│  ├─ Returns & Refunds
│  ├─ Payment Methods
│  ├─ Warranty Information
│  └─ Product Care
├─ Categories (expandable)
└─ Contact Options
```

---

### 6.2 Live Chat Support
**Escalation from AI:**
1. AI detects need for human
2. "Let me connect you to a specialist"
3. Queue position shown
4. Estimated wait time
5. Context transferred to agent
6. Seamless conversation continues

**Features:**
- File/image sharing
- Screen sharing (if needed)
- Satisfaction rating post-chat
- Chat transcript via email

---

### 6.3 Returns & Refunds
**Entry Point:** Order details → "Return item"

**Flow:**
1. Select items to return
2. Reason for return (dropdown)
3. Additional details (optional)
4. Upload photos (damage/defect)
5. Choose refund method:
   - Store credit (instant)
   - Original payment (5-7 days)
6. Return label generated
7. Pickup scheduled OR drop-off location

**Tracking:**
- Return status updates
- Email notifications
- Refund processing timeline

---

## 7. Mobile App Experience

### 7.1 Progressive Web App (PWA)
**Features:**
- Install to home screen
- Offline browsing (cached content)
- Push notifications
- Background sync
- Native-like animations

### 7.2 Mobile-Specific Features
- **Barcode Scanner**: Scan product to search
- **Location Services**: Nearest store, delivery tracking
- **Camera Integration**: AR view, visual search
- **Biometric Login**: Face ID, fingerprint
- **Native Sharing**: Share products via WhatsApp, etc.

---

## 8. Accessibility Considerations

### 8.1 Keyboard Navigation
- All features accessible via keyboard
- Logical tab order
- Skip navigation links
- Focus indicators always visible

### 8.2 Screen Reader Support
- Semantic HTML
- ARIA labels
- Descriptive alt text
- Announced state changes
- Form error announcements

### 8.3 Visual Accessibility
- Minimum 4.5:1 contrast
- No color-only information
- Text resize up to 200%
- Clear focus states
- Captions for videos

---

## Success Metrics Per Flow

**Product Discovery:**
- Search-to-click rate > 60%
- Filter usage > 40%
- Category bounce rate < 30%

**Product Evaluation:**
- Time on product page > 2min
- Image interaction rate > 50%
- Review read rate > 60%

**Cart & Checkout:**
- Cart abandonment < 25%
- Checkout completion > 75%
- Average checkout time < 3min

**Account:**
- Registration completion > 85%
- Return visit rate > 40%
- Profile completion > 70%

**Support:**
- AI resolution rate > 70%
- CSAT score > 4.5/5
- First response time < 2min

---

This comprehensive UX flow document ensures every user interaction is intentional, smooth, and optimized for conversion and satisfaction.