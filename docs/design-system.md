# Intact Ghana Design System
**Version 1.0 | Last Updated: January 2026**

## Philosophy

Our design system embodies **Modern Ghanaian Tech Excellence** - a fusion of cutting-edge digital experiences with warm, accessible African design sensibilities. We prioritize clarity, speed, and delight.

---

## Color System

### Primary Palette
```
Brand Primary (Intact Blue)
- intact-900: #0A1628 (Deep navy - headers, primary text)
- intact-800: #1A2F4A (Dark blue)
- intact-700: #2A476C (Medium blue)
- intact-600: #3A5F8E (Brand blue)
- intact-500: #4A77B0 (Primary CTA)
- intact-400: #6B93C8 (Interactive states)
- intact-300: #8CAFE0 (Light accents)
- intact-200: #ADCBF8 (Backgrounds)
- intact-100: #D6E7FF (Subtle highlights)
- intact-50: #EBF4FF (Lightest touch)
```

### Accent Colors
```
Energy Orange (CTAs, Promotions)
- energy-600: #FF6B35 (Primary accent)
- energy-500: #FF8555 (Hover state)
- energy-400: #FFA075 (Active state)
- energy-100: #FFE5DC (Light background)

Success Green (In stock, confirmations)
- success-600: #10B981 (Primary)
- success-500: #34D399 (Light)
- success-100: #D1FAE5 (Background)

Warning Amber (Low stock, alerts)
- warning-600: #F59E0B (Primary)
- warning-500: #FBBF24 (Light)
- warning-100: #FEF3C7 (Background)

Error Red (Out of stock, errors)
- error-600: #EF4444 (Primary)
- error-500: #F87171 (Light)
- error-100: #FEE2E2 (Background)
```

### Neutral Palette
```
Grays (Text, borders, backgrounds)
- gray-900: #111827 (Primary text)
- gray-800: #1F2937 (Secondary text)
- gray-700: #374151 (Tertiary text)
- gray-600: #4B5563 (Placeholder)
- gray-500: #6B7280 (Disabled text)
- gray-400: #9CA3AF (Borders)
- gray-300: #D1D5DB (Dividers)
- gray-200: #E5E7EB (Card borders)
- gray-100: #F3F4F6 (Section backgrounds)
- gray-50: #F9FAFB (Page background)
```

### Dark Mode Palette
```
Dark Backgrounds
- dark-950: #0B0F19 (Page background)
- dark-900: #111827 (Card background)
- dark-800: #1F2937 (Elevated surfaces)
- dark-700: #374151 (Borders)

Dark Text
- dark-text-primary: #F9FAFB
- dark-text-secondary: #E5E7EB
- dark-text-tertiary: #D1D5DB
```

---

## Typography

### Font Families
```css
Primary: 'Inter', system-ui, -apple-system, sans-serif
Headings: 'Clash Display', 'Inter', sans-serif
Mono: 'JetBrains Mono', 'Courier New', monospace
Arabic/Local: 'IBM Plex Sans Arabic', sans-serif
```

### Type Scale
```
Display XL: 72px / 90px (1.25 line-height) - Hero headlines
Display L: 60px / 72px - Section heroes
Display M: 48px / 60px - Page titles

Heading XL: 36px / 44px (1.22 line-height) - Major sections
Heading L: 30px / 38px - Card titles
Heading M: 24px / 32px - Subsections
Heading S: 20px / 28px - Small headings
Heading XS: 18px / 28px - Tiny headings

Body XL: 20px / 32px (1.6 line-height) - Lead paragraphs
Body L: 18px / 28px - Comfortable reading
Body M: 16px / 24px - Default body text
Body S: 14px / 20px - Secondary text
Body XS: 12px / 16px - Captions, labels

Mono M: 14px / 20px - Code, SKUs
Mono S: 12px / 16px - Small code
```

### Font Weights
```
Thin: 100 (Display only)
Light: 300 (Rarely used)
Regular: 400 (Body text default)
Medium: 500 (Subheadings, buttons)
Semibold: 600 (Headings, emphasis)
Bold: 700 (Strong emphasis)
Extrabold: 800 (Display headings)
Black: 900 (Ultra emphasis, rarely)
```

### Typography Rules
- Maximum line length: 65-75 characters
- Paragraph spacing: 1.5em
- Letter spacing (headings): -0.02em for large text
- Letter spacing (body): 0em (normal)
- Never use all-caps for body text
- Use sentence case for buttons, title case for navigation

---

## Spacing System

### Base Unit: 4px
```
Space Scale (rem equivalents):
0: 0px (0rem)
1: 4px (0.25rem)
2: 8px (0.5rem)
3: 12px (0.75rem)
4: 16px (1rem)
5: 20px (1.25rem)
6: 24px (1.5rem)
8: 32px (2rem)
10: 40px (2.5rem)
12: 48px (3rem)
16: 64px (4rem)
20: 80px (5rem)
24: 96px (6rem)
32: 128px (8rem)
40: 160px (10rem)
48: 192px (12rem)
64: 256px (16rem)
```

### Component Spacing
```
Button padding: 12px 24px (3/6)
Input padding: 12px 16px (3/4)
Card padding: 24px (6)
Section padding: 64px 0 (16)
Container max-width: 1440px
Grid gutter: 24px (6)
```

---

## Grid System

### Breakpoints
```javascript
{
  xs: '0px',      // Mobile portrait
  sm: '640px',    // Mobile landscape
  md: '768px',    // Tablet portrait
  lg: '1024px',   // Tablet landscape
  xl: '1280px',   // Desktop
  '2xl': '1536px' // Large desktop
}
```

### Grid Configuration
```
Columns: 12 (flexible)
Gutter: 24px (responsive: 16px mobile, 24px tablet+)
Margin: 16px mobile, 24px tablet, 48px desktop
Max width: 1440px
```

---

## Border Radius

```
none: 0px
sm: 4px (Small buttons, tags)
DEFAULT: 8px (Cards, inputs, buttons)
md: 12px (Large cards)
lg: 16px (Modals, panels)
xl: 24px (Feature cards)
2xl: 32px (Hero elements)
3xl: 48px (Special features)
full: 9999px (Pills, avatars)
```

---

## Shadows

### Elevation System
```css
/* Level 1 - Subtle lift */
shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05)

/* Level 2 - Cards at rest */
shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
           0 1px 2px -1px rgba(0, 0, 0, 0.1)

/* Level 3 - Cards on hover */
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
           0 2px 4px -2px rgba(0, 0, 0, 0.1)

/* Level 4 - Dropdowns, popovers */
shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
           0 4px 6px -4px rgba(0, 0, 0, 0.1)

/* Level 5 - Modals, drawers */
shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
           0 8px 10px -6px rgba(0, 0, 0, 0.1)

/* Level 6 - Major overlays */
shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

/* Inner shadows */
shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)

/* Colored shadows for CTAs */
shadow-energy: 0 10px 25px -5px rgba(255, 107, 53, 0.3)
shadow-intact: 0 10px 25px -5px rgba(74, 119, 176, 0.3)
```

---

## Icons

### Icon System
**Library:** Lucide React (primary), Custom SVGs (brand)

### Sizes
```
xs: 12px
sm: 16px
md: 20px (default)
lg: 24px
xl: 32px
2xl: 48px
```

### Usage Rules
- Use outlined icons for navigation and actions
- Use filled icons for active states and confirmations
- Maintain 2px stroke width for consistency
- Always include accessible labels
- Color: inherit from parent text color

---

## Buttons

### Variants

**Primary (CTA)**
```css
background: energy-600
color: white
hover: energy-500 + shadow-md + scale(1.02)
active: energy-700 + scale(0.98)
disabled: gray-300 + cursor-not-allowed
```

**Secondary**
```css
background: intact-500
color: white
hover: intact-400 + shadow-md
active: intact-600
```

**Outline**
```css
background: transparent
border: 2px solid gray-300
color: gray-700
hover: border-intact-500 + color-intact-500
```

**Ghost**
```css
background: transparent
color: gray-700
hover: background-gray-100
active: background-gray-200
```

**Sizes**
```
xs: text-xs, px-3, py-1.5
sm: text-sm, px-4, py-2
md: text-base, px-6, py-3 (default)
lg: text-lg, px-8, py-4
xl: text-xl, px-10, py-5
```

---

## Form Elements

### Input Fields
```css
Default:
  border: 1.5px solid gray-300
  padding: 12px 16px
  border-radius: 8px
  font-size: 16px

Focus:
  border-color: intact-500
  ring: 3px intact-100
  outline: none

Error:
  border-color: error-600
  ring: 3px error-100

Success:
  border-color: success-600
  ring: 3px success-100

Disabled:
  background: gray-50
  cursor: not-allowed
  opacity: 0.6
```

### Checkboxes & Radios
```
Size: 20px × 20px
Border: 2px solid gray-300
Checked: background intact-500, white checkmark
Focus: ring 3px intact-100
```

---

## Cards

### Product Card
```css
background: white
border: 1px solid gray-200
border-radius: 12px
padding: 16px
hover: shadow-lg + translateY(-4px)
transition: all 0.3s ease
```

### Feature Card
```css
background: white
border-radius: 16px
padding: 32px
box-shadow: shadow-sm
hover: shadow-xl
```

---

## Badges & Tags

### Sizes
```
sm: text-xs, px-2, py-0.5
md: text-sm, px-2.5, py-1 (default)
lg: text-base, px-3, py-1.5
```

### Variants
```
Success: bg-success-100, text-success-700
Warning: bg-warning-100, text-warning-700
Error: bg-error-100, text-error-700
Info: bg-intact-100, text-intact-700
Neutral: bg-gray-100, text-gray-700
```

---

## Accessibility

### Color Contrast
- AAA compliance for body text: 7:1 minimum
- AA compliance for large text: 4.5:1 minimum
- Interactive elements: 3:1 against background

### Focus States
- Always visible focus rings
- Minimum 3px outline
- High contrast color (intact-500)
- Never remove focus without replacement

### Motion
- Respect prefers-reduced-motion
- Provide pause controls for auto-play
- Maximum animation duration: 500ms for functional, 2s for decorative

### Interactive Targets
- Minimum touch target: 44px × 44px
- Minimum spacing between targets: 8px

---

## Responsive Design

### Mobile First
- Start with mobile layout (320px)
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Simplified navigation

### Breakpoint Strategy
```
Mobile (xs-sm): Single column, stacked
Tablet (md-lg): 2-column grid, side navigation
Desktop (xl+): 3-4 column grid, persistent navigation
```

---

## Animation Principles

### Timing Functions
```
ease-linear: Linear motion
ease-in: cubic-bezier(0.4, 0, 1, 1)
ease-out: cubic-bezier(0, 0, 0.2, 1) (default)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Duration
```
instant: 50ms (color changes)
fast: 150ms (hover states)
base: 250ms (default transitions)
moderate: 350ms (complex animations)
slow: 500ms (page transitions)
```

---

## Component Library

### Core Components
1. Navigation (Header, Mega Menu, Mobile Menu)
2. Product Cards (Grid, List, Featured)
3. Buttons (All variants)
4. Forms (Inputs, Selects, Checkboxes)
5. Modals & Drawers
6. Notifications & Toasts
7. Loading States (Skeletons, Spinners)
8. Empty States
9. Error States
10. Search Components

### E-commerce Specific
1. Shopping Cart (Mini cart, Full cart)
2. Product Gallery (Images, 360 view)
3. Price Display (Regular, Sale, Installment)
4. Stock Indicators
5. Rating & Reviews
6. Comparison Tables
7. Checkout Steps
8. Order Tracking

---

## Brand Guidelines

### Logo Usage
- Minimum size: 120px width
- Clear space: Logo height × 0.5 on all sides
- Never distort or rotate
- Use white logo on dark backgrounds
- Use dark logo on light backgrounds

### Voice & Tone
- Friendly but professional
- Confident but not arrogant
- Helpful and educational
- Tech-savvy but accessible
- Warm African hospitality meets modern efficiency

### Imagery
- High-quality product photography
- Lifestyle images showing products in use
- Diverse representation of Ghanaian customers
- Clean, well-lit, minimal backgrounds
- Consistent aspect ratios (16:9, 4:3, 1:1)

---

## Dark Mode

### Implementation
- System preference detection by default
- User toggle override
- Persistent across sessions
- Smooth transitions between modes

### Color Adjustments
- Reduce brightness of colors by 10-15%
- Increase contrast for text
- Use dark-specific shadow values
- Avoid pure black (#000000), use dark-950

---

## Performance

### Image Optimization
- WebP format with JPEG fallback
- Responsive images with srcset
- Lazy loading below fold
- Maximum image size: 200KB
- Blur placeholder during load

### Animation Performance
- Use transform and opacity only
- Avoid animating width, height, top, left
- Use will-change sparingly
- Hardware acceleration for smooth 60fps

---

This design system ensures consistency, accessibility, and modern aesthetics across all Intact Ghana digital properties.