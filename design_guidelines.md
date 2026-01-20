# Secventra - Premium Enterprise Cybersecurity Website Design Guidelines

## Design Approach
**Reference-Based: Apple.com + Premium Financial/Enterprise Brands**
This is a luxury, investor-grade cybersecurity website that must communicate market leadership, innovation, and trust. Design quality should rival Apple.com's storytelling with the sophistication of premium enterprise brands.

## Brand Identity
- **Company:** Secventra
- **Tagline:** "Securing Tomorrow, Today."
- **Positioning:** Future $1B cybersecurity unicorn, enterprise-grade penetration testing firm

## Visual Language

### Color Palette (Professional Enterprise)
- **Primary Blue:** #3b82f6 (blue-500) - Main brand color, CTAs, interactive elements
- **Accent Gold:** #f59e0b (amber-500) - Highlights, premium accents, success states
- **Background:** Dark slate blue hsl(222, 47%, 4%) - Rich, professional dark base
- **Cards/Surfaces:** hsl(222, 47%, 7%) - Slightly elevated dark surfaces
- **Text Primary:** hsl(210, 20%, 98%) - Near-white for maximum readability
- **Text Secondary:** hsl(215, 16%, 55%) - Muted for supporting content
- **Borders:** hsl(220, 20%, 14%) - Subtle separation lines
- **Glassmorphism:** rgba(255, 255, 255, 0.02) with backdrop blur

### Why This Palette Works
- Deep blue conveys trust, security, and professionalism (used by banks, enterprise software)
- Gold accents suggest premium quality and success (used by luxury brands)
- Dark slate blue is more sophisticated than pure black - adds depth and warmth
- High contrast text ensures accessibility and executive readability

### Typography
- **Hierarchy:** Ultra-large hero headlines (text-6xl to text-8xl), generous line-height
- **Weights:** Bold for headlines (font-bold, font-extrabold), Regular for body (font-normal)
- **Font Family:** Inter for UI, JetBrains Mono for technical/code content
- **Style:** Clean, minimal, Apple-like precision

### Layout System
- **Spacing Units:** Primarily use 4, 6, 8, 12, 16, 20, 24, 32 (p-8, py-20, gap-12, etc.)
- **Section Padding:** py-32 for desktop, py-20 for tablet, py-16 for mobile
- **Containers:** max-w-7xl for main content, max-w-6xl for narrower sections
- **Grid System:** Single column focus with occasional 2-3 column feature breakouts

## Component Library

### Hero Sections
- **Full-viewport impact:** min-h-screen with centered content
- **Typography:** Massive headlines with cinematic animation entries
- **CTA Placement:** Primary blue CTA with outline secondary, centered below headline
- **Background:** Deep gradient overlays with subtle blue/amber glow effects

### Service Cards (Apple Product Style)
- **Layout:** Full-screen storytelling sections per service
- **Cards:** Glassmorphic panels (bg-white/5 border border-white/10 backdrop-blur-md) with rounded-2xl
- **Hover:** Built-in shadcn Button elevation - no custom hover states

### Navigation
- **Sticky header:** Backdrop blur (backdrop-blur-md bg-background/80) appearing on scroll
- **Links:** Button ghost variant, text-blue-400 for active state
- **Logo:** Left-aligned shield icon with company name

### Statistics/Metrics
- **Presentation:** Large numbers (text-5xl font-bold) with gradient text
- **Gradients:** from-blue-400 to-amber-400 for premium feel
- **Layout:** 3-4 column grid on desktop, stacked on mobile

### Forms (Contact)
- **Fields:** bg-white/5 border border-white/10 rounded-xl with focus:border-blue-500
- **Submit CTA:** Blue primary button with loading state
- **Validation:** Using shadcn Form with react-hook-form and zodResolver
- **Layout:** Single column, generous spacing

### Footer
- **Style:** Minimal, bg-background with subtle top border
- **Content:** Links grid, social icons using Button asChild pattern
- **Spacing:** py-20 with subtle top border

## Animation Strategy (Cinematic, Not Flashy)

### Scroll-Based Storytelling
- **Hero:** Text fade-in + slide-up on load (Framer Motion)
- **Sections:** Reveal on scroll with opacity + translateY transitions
- **Parallax:** Subtle background movement (slower than foreground)

### Micro-Interactions
- **Buttons:** Use shadcn built-in hover/active states - no custom implementations
- **Cards:** Built-in GlassCard component handles hover effects
- **Links:** No custom hover states - use Button ghost variant

### Timing
- **Duration:** 0.3-0.6s for micro-interactions, 1-1.5s for scroll reveals
- **Easing:** ease-out for entries, ease-in-out for hovers
- **Delay:** Stagger animations in groups (50-100ms apart)

## Button Guidelines
- Use shadcn Button size variants only (sm, default, lg, icon)
- Never add custom px-* py-* or h-* classes to Buttons
- No custom hover:bg-* classes - built-in elevations handle this
- For primary CTAs: className="bg-blue-500 text-white font-semibold"
- For secondary: variant="outline" with className="border-white/20 bg-white/5 text-white"

## Page-Specific Guidelines

### Home
- Cinematic full-screen hero with blue/amber gradient text
- Scroll-driven service overview with GlassCard components
- Statistics reveal with gradient numbers
- Trust indicators and luxury CTA

### Services
- Each service gets Apple product-page treatment
- Blue gradient backgrounds, amber accent highlights
- Feature grid with icon cards

### About
- Mission statement with cinematic reveal
- Team vision with professional imagery placeholders
- Core values with icon cards

### Contact
- Form using shadcn Form/useForm/zodResolver pattern
- TanStack Query mutation for submission
- Success state with checkmark animation

## Accessibility & Performance
- Maintain WCAG AA contrast ratios (blue-400 on dark background passes)
- Optimize animations for reduced-motion preferences
- Lazy load images and animations
- Fast page transitions (minimal bundle size)

**Key Principle:** Every element must feel intentional, premium, and enterprise-grade. The blue/gold palette conveys trust, security, and premium quality that VCs and Fortune 500 clients expect.
