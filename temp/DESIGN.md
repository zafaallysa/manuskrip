/---
name: Heritage Manuscript System
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#404944'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#531e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#72310b'
  on-tertiary-container: '#f89a6c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb693'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#76330d'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered for a digital archive that bridges 18th-century Islamic artistry with modern academic rigor. The brand personality is **venerable, precise, and illuminating**, targeting researchers, historians, and the faithful who seek to study the Al-Qur'an Tgk. Chik Lampaloh in high fidelity.

The design style is **Academic Minimalism with Skeuomorphic Nuance**. It avoids the sterility of modern corporate SaaS by incorporating tactile elements inspired by physical manuscripts—such as parchment-like surfaces and gold leaf accents—while maintaining the clarity of a high-performance research tool. The emotional response should be one of quiet reverence and intellectual focus, achieved through expansive whitespace and a restrained, high-contrast palette.

## Colors

The palette is rooted in traditional Islamic manuscript illumination. 

- **Primary (Deep Emerald):** Used for structural navigation, primary actions, and headers to symbolize growth and wisdom.
- **Secondary (Gold):** Reserved for highlights, active states, and decorative borders. It should be used sparingly to maintain its value as a focal point.
- **Background (Parchment):** A warm, non-white ivory that reduces eye strain during long reading sessions and mimics the texture of aged paper.
- **Tertiary (Sienna/Ink):** A dark brown-black used for body text and ink-like strokes, offering better legibility than pure black on parchment.

## Typography

This design system employs a sophisticated typographic pairing to balance editorial beauty with functional utility.

- **Headlines:** Use **Playfair Display** for all titles and chapter headings. This high-contrast serif evokes the elegance of traditional typesetting and provides a sense of historical authority.
- **Body & UI:** Use **Inter** for all reading text, metadata, and interface controls. Its neutral, highly legible glyphs ensure that complex archival data remains accessible across all devices.
- **Hierarchy:** Maintain a generous vertical rhythm. Body text uses a 1.7 line-height to ensure a comfortable reading experience for dense theological and historical commentary.

## Layout & Spacing

The layout philosophy follows a **Fixed Center-Column Grid** for reading and a **Fluid Content-Sidebar** model for the manuscript viewer.

- **Reading Experience:** Content is centered with wide margins (64px on desktop) to evoke the feel of a physical book page.
- **Manuscript Viewer:** A flexible 2-column split allows the digital scan of the manuscript to occupy 60% of the viewport, with metadata and transcription occupying the remaining 40%.
- **Spacing Rhythm:** Use an 8px base unit. Component padding should be generous to maintain the "Academic" feel—avoid crowding elements. Elements should be separated by clear, meaningful whitespace rather than heavy lines.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Subtle Ambient Shadows**.

- **Surfaces:** The base layer is the Parchment (#FDFBF7). Secondary containers (like search panels or sidebars) use a slightly lighter tint or a very thin 1px border in Gold (#D4AF37) at 20% opacity.
- **Shadows:** Avoid heavy, dark shadows. Use long, soft, highly diffused shadows (Blur: 20px, Opacity: 4%, Color: #064E3B) to make cards and modals appear as if they are resting lightly on the page.
- **Interactive Depth:** Buttons do not "pop" with shadows; instead, they utilize subtle shifts in background color or the appearance of a fine gold inner-border on press.

## Shapes

The shape language is **Soft and Structural**. While modern, the design avoids overly circular "bubble" aesthetics to maintain its serious, academic tone.

- **Primary Corners:** A 0.25rem (4px) radius is used for most UI components (inputs, buttons) to soften the interface without losing its architectural feel.
- **Manuscript Borders:** The actual manuscript viewer should be framed with a distinctive "double-line" border—a 1px Emerald line followed by a 2px Gold line—inspired by Islamic illumination geometry.
- **Imagery:** Digital scans of the Al-Qur'an should have sharp corners or extremely minimal rounding (2px) to preserve the integrity of the original page edges.

## Components

- **Buttons:** Primary buttons are Solid Emerald (#064E3B) with Gold (#D4AF37) text. Secondary buttons are Ghost-style with a Gold border and Serif labels.
- **Cards:** Used for manuscript folios. They feature a Parchment background, a subtle 1px border, and a "Top-Bar" accent in Emerald.
- **Input Fields:** Search bars utilize a "fountain pen" aesthetic—thin, dark-ink lines with Playfair Display placeholder text.
- **Manuscript Navigator:** A specialized slider or thumbnail strip at the bottom of the screen, allowing users to "flip" through pages. Thumbnails are framed in Gold when active.
- **Annotations:** Floating labels or "marginalia" notes use the Caption style in Emerald, positioned to mimic the traditional placement of notes in the margins of the Al-Qur'an Tgk. Chik Lampaloh.
- **Decorative Dividers:** Use a custom horizontal rule consisting of a thin line with a small geometric Islamic star icon in the center.