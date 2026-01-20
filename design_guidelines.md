# Secventra - Premium Cybersecurity Website Design Guidelines

## Design Approach
**Reference-Based: Apple.com + Elite Cybersecurity Brands**
This is a luxury, investor-grade cybersecurity website that must communicate market leadership, innovation, and trust. Design quality should rival Apple.com's storytelling and premium feel.

## Brand Identity
- **Company:** Secventra
- **Tagline:** "Securing Tomorrow, Today."
- **Positioning:** Future $1B cybersecurity unicorn, enterprise-grade penetration testing firm

## Visual Language

### Color Palette
- **Base:** Black (#000000), Pure White (#FFFFFF), Dark Grays (#0A0A0A, #1A1A1A, #2A2A2A)
- **Accents:** Neon Blue (#00E5FF, #0066FF), Neon Green (#00FF94, #00D68F) - use sparingly for CTAs and highlights
- **Glassmorphism:** Semi-transparent panels with backdrop blur (bg-white/5, bg-black/40)
- **Gradients:** Subtle dark gradients (from-black/80 to transparent, radial gradients for depth)

### Typography
- **Hierarchy:** Ultra-large hero headlines (text-6xl to text-8xl), generous line-height
- **Weights:** Bold for headlines (font-bold, font-extrabold), Regular for body (font-normal)
- **Spacing:** Wide letter-spacing for headlines (tracking-tight on large, tracking-normal on body)
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
- **CTA Placement:** Primary CTA with glassmorphic background (backdrop-blur-sm), centered below headline
- **Background:** Dark gradient overlays, subtle particle effects, or abstract cyber patterns

### Service Cards (Apple Product Style)
- **Layout:** Full-screen storytelling sections per service (Web App, API, Cloud, Network, Mobile, Red Team)
- **Structure:** Hero image/visual → Feature breakdown → Methodology flow → Benefits
- **Cards:** Glassmorphic panels (bg-white/5 border border-white/10 backdrop-blur-md) with rounded-2xl
- **Hover:** Subtle glow effect (shadow-lg shadow-cyan-500/20)

### Navigation
- **Sticky header:** Backdrop blur (backdrop-blur-md bg-black/80) appearing on scroll
- **Links:** Clean spacing, hover glow effect on text
- **Logo:** Left-aligned, company name in bold

### Statistics/Metrics
- **Presentation:** Large numbers (text-5xl font-bold) with animated count-up reveal
- **Layout:** 3-4 column grid on desktop, stacked on mobile
- **Style:** Minimal, number-focused with brief labels

### Case Studies
- **Format:** Full-screen storytelling slides (like Apple product launches)
- **Structure:** Client logo → Challenge → Solution → Results (with animated reveals)
- **Visuals:** Large imagery with overlay text

### Forms (Contact)
- **Aesthetic:** Luxury minimal with glassmorphic inputs
- **Fields:** bg-white/5 border border-white/10 rounded-xl with focus:border-cyan-500
- **Submit CTA:** Prominent, neon accent button
- **Layout:** Single column, generous spacing

### Footer
- **Style:** Minimal, dark (bg-black)
- **Content:** Links grid, newsletter signup, social icons, company info
- **Spacing:** py-20 with subtle top border

## Animation Strategy (Cinematic, Not Flashy)

### Scroll-Based Storytelling
- **Hero:** Text fade-in + slide-up on load
- **Sections:** Reveal on scroll with opacity + translateY transitions
- **Parallax:** Subtle background movement (slower than foreground)
- **Statistics:** Count-up animations when entering viewport

### Micro-Interactions
- **Buttons:** Soft glow on hover (shadow-lg shadow-cyan-500/30 transition-all duration-300)
- **Cards:** Subtle lift on hover (hover:-translate-y-2 transition-transform)
- **Links:** Underline slide-in effect or glow
- **Cursor:** Custom cursor with subtle following dot (optional enhancement)

### Timing
- **Duration:** 0.3-0.6s for micro-interactions, 1-1.5s for scroll reveals
- **Easing:** ease-out for entries, ease-in-out for hovers
- **Delay:** Stagger animations in groups (50-100ms apart)

## Page-Specific Guidelines

### Home
- Cinematic full-screen hero → Scroll-driven service overview → Statistics reveal → Trust indicators → Luxury CTA

### Services
- Each service gets Apple product-page treatment: Large hero visual → Feature grid → Process flow diagram → CTA

### About
- Mission statement with cinematic reveal → Team vision → Values with icon cards

### Why Choose Us
- Comparison layout or advantage blocks with interactive reveals

### Careers
- Minimal job listings with smooth expand/collapse, Apple newsroom aesthetic

### Blog
- Editorial card grid, large featured image per article, clean typography focus

## Images
- **Hero Sections:** Abstract cyber imagery, digital networks, futuristic tech visualizations (dark, minimal, professional)
- **Service Pages:** Technical diagrams, code snippets on screens, penetration testing visualizations
- **About/Team:** Professional photography with subtle color grading
- **Case Studies:** Client work showcases, before/after security improvements

## Accessibility & Performance
- Maintain WCAG AA contrast ratios (ensure neon accents have sufficient contrast)
- Optimize animations for reduced-motion preferences
- Lazy load images and animations
- Fast page transitions (minimal bundle size)

**Key Principle:** Every element must feel intentional, premium, and enterprise-grade. This is a $1B unicorn in the making.