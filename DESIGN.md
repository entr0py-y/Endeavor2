---
name: Quiet Space
colors:
  surface: '#faf9f5'
  surface-dim: '#dadad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f0'
  surface-container: '#eeeeea'
  surface-container-high: '#e8e8e4'
  surface-container-highest: '#e3e3df'
  on-surface: '#1a1c1a'
  on-surface-variant: '#444748'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f1f1ed'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#7c5357'
  on-secondary: '#ffffff'
  secondary-container: '#fdc7cb'
  on-secondary-container: '#795154'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdadc'
  secondary-fixed-dim: '#eeb9bd'
  on-secondary-fixed: '#301216'
  on-secondary-fixed-variant: '#623c40'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#faf9f5'
  on-background: '#1a1c1a'
  surface-variant: '#e3e3df'
typography:
  signature:
    fontFamily: Custom Script
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '300'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Manrope
    fontSize: 10px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.15em
  caption:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '300'
    lineHeight: '1.4'
    letterSpacing: 0.02em
spacing:
  unit: 4px
  container-padding: 32px
  section-gap: 120px
  element-gap: 24px
  gutter: 16px
---

## Brand & Style

This design system is built on the Japanese concept of *Ma*—the pure intentionality of negative space. It is designed to feel like a digital zine or a personal letter, prioritizing the silence between elements as much as the content itself. The aesthetic is a hybrid of **Minimalism** and **Soft Brutalism**, utilizing raw, unpolished alignments and tactile textures to evoke a sense of "digital paper."

The goal is to provide a meditative browsing experience that feels artistic and personal. It avoids the polished, corporate "perfection" of modern SaaS, opting instead for a dithered, grainy, and slightly lo-fi atmosphere that feels human and permanent.

## Colors

The palette is anchored by an off-white, paper-toned background that reduces eye strain and provides a tactile warmth. 

- **Background (#FDFDFB):** A "Warm Paper" tone that acts as the canvas.
- **Primary (#1A1A1A):** A soft black used for all primary legibility. It is never absolute black, keeping the contrast natural.
- **Accent (#E8B4B8):** A faded, desaturated pink used sparingly for highlights, active states, or small artistic punctuations.
- **Muted (#E5E5E1):** Used for subtle dividers, halftone textures, or "ghost" text that recedes into the paper.

## Typography

The typography strategy relies on the tension between a "human signature" and "machine precision."

- **Signature:** The name "Pushkar Jha" should be rendered in a casual, handwritten script font (e.g., a custom SVG signature or a light-weight script face) to establish immediate personal presence.
- **Secondary Typeface:** **Manrope** is used for all functional text. It is set small and light with generous letter spacing to mimic Japanese editorial layouts. 
- **Headlines:** **Epilogue** provides a slightly more geometric, editorial feel for section headers.
- **Formatting:** Use lowercase extensively for a quiet, non-aggressive tone. Vertical text orientations (90-degree rotations) are encouraged for labels to mimic poster layouts.

## Layout & Spacing

This design system uses a **Fixed Grid** philosophy on desktop but transitions to a "No Grid" contextual layout for mobile-first delivery.

- **Massive Whitespace:** Vertical gaps between sections should feel uncomfortably large (120px+) to force the user to slow down.
- **Alignment:** Elements should not always be perfectly centered. Use slight horizontal offsets (e.g., a paragraph starting 20% from the left) to create a "raw" zine feel.
- **Safe Areas:** A minimum of 32px padding on the horizontal axis ensures content never feels cramped against the screen edges.

## Elevation & Depth

There is zero use of shadows or Z-axis depth in this design system. It is strictly 2D.

- **Tonal Layers:** Depth is created by the presence of content, not by lifting it. Use the Accent color (#E8B4B8) as a background "wash" for specific sections to denote priority.
- **Textures:** A global **halftone/grain overlay** (opacity 0.03 - 0.05) should be applied to the entire viewport to give the "paper" life.
- **Lines:** Use 0.5px or 1px solid lines for structural separation. Lines should feel like "hairlines"—barely there, but defining the space.

## Shapes

The shape language is **Sharp (0px)**. 

Every element—images, buttons, containers—must have 90-degree corners. This reinforces the "editorial poster" and "unpolished" aesthetic. Circles are only permitted as small decorative elements or dithered halftone dots to contrast the rigid rectangular grid.

## Components

Components in this design system should feel like marks on a page rather than interactive widgets.

- **Buttons:** Avoid "pill" or "container" buttons. Use underlined text or text with a small dithered square (4x4px) next to it. Hover states should simply shift the text color to the soft pink accent or increase the letter-spacing slightly.
- **Images:** Treat all photography with a slight "dither" or "halftone" filter. Images should feel integrated into the paper, not floating on top. Use inconsistent aspect ratios to maintain the "raw" feel.
- **Cards:** Do not use cards with borders or backgrounds. Use "spatial cards" where content is grouped by its proximity to other elements and separated by massive whitespace.
- **Input Fields:** A single 1px bottom border. Labels should be small, all-caps, and positioned vertically to the left of the input.
- **Lists:** Use unconventional bullets, such as a thin horizontal dash (—) or a pixelated dot.
- **Scroll Indicator:** A thin vertical line at the bottom center of the screen that grows or shrinks based on scroll depth.