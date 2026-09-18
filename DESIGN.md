---
name: VaaniAccess Design System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#414754'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#727785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005bc0'
  primary: '#005bbf'
  on-primary: '#ffffff'
  primary-container: '#1a73e8'
  on-primary-container: '#ffffff'
  inverse-primary: '#adc7ff'
  secondary: '#005ac1'
  on-secondary: '#ffffff'
  secondary-container: '#4d8efe'
  on-secondary-container: '#00285c'
  tertiary: '#006d2c'
  on-tertiary: '#ffffff'
  tertiary-container: '#008939'
  on-tertiary-container: '#ffffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc7ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#004494'
  tertiary-fixed: '#89fa9b'
  tertiary-fixed-dim: '#6ddd81'
  on-tertiary-fixed: '#002108'
  on-tertiary-fixed-variant: '#005320'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system is engineered to facilitate trust, accessibility, and clarity for citizens navigating complex government services. It adopts a **Modern Corporate** aesthetic with a strong emphasis on **Minimalism** to reduce cognitive load. The UI prioritizes a "service-first" mindset, ensuring that users—regardless of their technical literacy—feel guided and supported.

The emotional response should be one of reliability and ease. By utilizing ample whitespace, a crisp professional color palette, and approachable geometric shapes, the system transforms bureaucratic processes into intuitive digital experiences.

## Colors
The color palette is anchored in a professional "Government Blue" that signals authority and stability. 
- **Primary Blue (#1a73e8):** Used for primary actions, active states, and key navigational elements.
- **Surface Neutrals:** The background remains pure white (#ffffff) to maximize contrast. Subtle light gray accents (#f8f9fa) are used for grouping content or defining secondary sections without creating visual noise.
- **Typography Colors:** High-contrast dark charcoal (#202124) is used for headings to ensure readability, while a softer gray (#5f6368) is reserved for secondary metadata and body descriptions.
- **Success/State Colors:** A balanced green (#34a853) is included for status indicators and positive feedback loops.

## Typography
Inter is the sole typeface for this design system, chosen for its exceptional legibility on digital screens and its neutral, systematic character. 

- **Headlines:** Use a bold weight with slightly tighter letter spacing to create a strong visual anchor for page titles.
- **Body Text:** Main content should prioritize the `body-lg` size (18px) to accommodate elderly users or those with visual impairments, ensuring a comfortable reading rhythm.
- **Hierarchy:** Establish clear vertical rhythm by ensuring headline line heights are 1.2x the font size, while body text uses a more generous 1.5x to 1.6x for maximum clarity.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a maximum container width of 1200px for desktop to prevent line lengths from becoming too long. 

- **Desktop:** A 12-column grid with 24px gutters. Content should be centered with generous outer margins (`xl`) to create a "breathing" canvas.
- **Mobile:** A 4-column grid with 16px margins.
- **Spacing Logic:** All spacing must be multiples of 8px. Use `lg` (48px) spacing between major sections and `md` (24px) for internal component padding. This "generous whitespace" strategy is critical to keep the government portal feeling modern and approachable.

## Elevation & Depth
This design system uses **Tonal Layers** combined with **Ambient Shadows** to create a soft, non-intimidating sense of depth.

- **Level 0 (Background):** Pure white (#ffffff).
- **Level 1 (Cards/Surfaces):** Use a very subtle, highly diffused shadow. (e.g., `0px 4px 20px rgba(0, 0, 0, 0.05)`). Surfaces at this level should have a 1px border of #f1f3f4 to define edges against the white background.
- **Level 2 (Interactive/Hover):** Shadows increase in spread and slightly in opacity to indicate lift. 
- **Modals/Overlays:** Use a backdrop blur (12px) with a semi-transparent white overlay to maintain context while focusing the user's attention.

## Shapes
The shape language is defined by **Highly Rounded** corners, moving away from the sharp, rigid boxes typically associated with government software. 

- **Standard Components:** Use a base radius of 16px (`rounded-lg`).
- **Large Containers/Cards:** Use a radius of 24px (`rounded-xl`) to create a soft, friendly "bubble" effect.
- **Buttons & Chips:** Use a fully rounded pill-shape (height / 2) to maximize the "friendly" and "modern" brand attributes.

## Components
- **Buttons:** Primary buttons use the Primary Blue with white text. They should have a minimum height of 48px for touch accessibility. Secondary buttons use a light gray fill (#f8f9fa) with blue text.
- **Input Fields:** Use a 16px corner radius. Borders should be light gray (#dadce0) in default state and Primary Blue (2px) when focused. Labels should always be visible above the field (not floating) for better accessibility.
- **Cards:** Cards are the primary vessel for information. They feature 24px padding and 24px corner radius. Use Level 1 elevation for a "floating" look.
- **Chips/Badges:** Small, pill-shaped markers for status or categories. Use low-saturation background tints (e.g., light blue or light green) with high-saturation text of the same hue.
- **Lists:** Use generous vertical padding (16px) between list items with a subtle 1px divider (#f1f3f4). 
- **Progress Indicators:** Use a thick, rounded progress bar (8px height) in Primary Blue to give users a clear sense of movement through multi-step forms.
