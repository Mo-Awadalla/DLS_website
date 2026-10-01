---
name: Disaster Law Symposium 2026
description: Civic event information presented with editorial typography, warm neutrals, and clear wayfinding.
colors:
  primary: "#984b33"
  primary-hover: "#783922"
  primary-pressed: "#65301e"
  canvas: "#f5f5f2"
  surface: "#ecece8"
  paper: "#fafaf7"
  ink: "#262724"
  muted: "#5e605a"
  line: "#d3d4cd"
  hero-canvas: "#171717"
  hero-ink: "#f6f2e9"
  hero-accent: "#ff794f"
  hero-accent-display: "#ffa27f"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(3.75rem, 6.3vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2rem, 3.1vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.17
    letterSpacing: "-0.025em"
  body:
    fontFamily: "IBM Plex Sans, Helvetica Neue, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  navigation-label:
    fontFamily: "IBM Plex Sans, Helvetica Neue, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0"
    lineHeight: 1.5
rounded:
  square: "0px"
  navigation-pill: "999px"
  navigation-popover: "24px"
  navigation-mobile-link: "20px"
spacing:
  unit: "4px"
  shell-gutter: "40px"
  mobile-gutter: "20px"
  section: "80px"
  mobile-section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.square}"
    height: "48px"
    padding: "12px 19.2px"
  button-booking:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    height: "52px"
    padding: "14px 20px"
  navigation-glass:
    backgroundColor: "rgba(250, 250, 247, 0.62)"
    textColor: "{colors.ink}"
    rounded: "{rounded.navigation-pill}"
    padding: "4px"
    backdropFilter: "blur(18px) saturate(160%)"
    selectionColor: "rgba(250, 250, 247, 0.84)"
    selectionDuration: "250ms"
    selectionEasing: "cubic-bezier(0.77, 0, 0.175, 1)"
---

# Design System: Disaster Law Symposium 2026

## Overview

**Creative North Star: “The Civic Field Guide”**

The visual language treats event information as a clear guide through a public institution: calm, legible, and anchored in place. Source Serif 4 gives headings an editorial voice; IBM Plex Sans keeps navigation, addresses, and practical details direct.

Warm neutral surfaces and hairline rules organize the pages. The venue experience makes room for each step of a visit, while the landing page uses a darker skyline hero with a brighter coral accent as a local variation.

**Key Characteristics:**
- Editorial serif headings paired with functional sans-serif text.
- Warm neutral surfaces, charcoal ink, and terracotta actions.
- Open layouts organized by spacing, contrast, and thin rules.
- Square content controls paired with light liquid-glass navigation and a moving selection pill.

## Colors

The shared palette is warm and low-chroma, with terracotta reserved for actions, active states, and wayfinding cues.

### Primary
- **Terracotta (`primary`):** links, active tabs, primary actions, and the booking band.
- **Terracotta state colors (`primary-hover`, `primary-pressed`):** darken the action color for interaction states.
- **Hero coral (`hero-accent`) and pale coral (`hero-accent-display`):** local accents for the dark, photo-backed landing hero.

### Neutral
- **Canvas (`canvas`):** the default page background.
- **Stone (`surface`):** map ground and secondary fills.
- **Paper (`paper`):** light text and the booking action surface.
- **Charcoal (`ink`):** main text and headings.
- **Muted ink (`muted`):** secondary descriptions and labels.
- **Hairline (`line`):** separators and fine map-grid edges.
- **Hero charcoal (`hero-canvas`) and warm white (`hero-ink`):** text and ground colors for the landing hero.

**The One Action Accent Rule.** Use terracotta to mark actions and active wayfinding. The coral pair belongs to the dark landing hero, where it maintains contrast over the skyline image.

## Typography

**Display Font:** Source Serif 4 (with Georgia, serif fallback)<br>
**Body Font:** IBM Plex Sans (with Helvetica Neue, sans-serif fallback)

**Character:** The serif display face gives the event an editorial register; the sans-serif face keeps logistics and navigation easy to scan. Both families are loaded in the application layout.

### Hierarchy
- **Display** (400, responsive 60–88px, 1.06 line height, tight tracking): page titles and hero headlines.
- **Headline** (400, responsive 32–44px, 1.17 line height): venue and section headings.
- **Body** (400, 16px, 1.6 line height): addresses, explanations, and event details.
- **Navigation label** (500, 14px desktop and toggle, 16px mobile links, normal tracking and title case): compact functional labels leave room for future destinations.

**The Two Voice Rule.** Keep display headings in Source Serif 4 and functional text in IBM Plex Sans; use weight and size to establish hierarchy rather than bolding every heading.

## Layout

The shared page shell tops out at 1180px, with 40px side gutters on desktop and 20px on narrow screens. Layouts use a 4px spacing rhythm. The venue page pairs venue details with travel information on wide screens, then stacks those sections on mobile; the hotel details follow as a separate full-width section.

At 1100px the venue columns tighten and type scales down. At 680px the page becomes a single column, the header switches to its mobile menu, and the venue masthead reduces from 88px to 80px. Major sections use generous vertical space: 80px on desktop and 48px on mobile, with page-specific adjustments where needed.

## Elevation & Depth

Content remains flat, with hierarchy from surface fills, generous spacing, and hairline separators. The shared navigation is the deliberate exception: light liquid glass floats over the skyline or dark masthead, using a bounded 18px backdrop blur, a bright material edge, and a soft 6px-offset shadow. A more opaque selection pill identifies the current page without introducing another accent color.

**The Flat Surface Rule.** Keep resting content flat. The user-requested glass navigation is the only shared-shell material exception; do not spread its blur, rounded forms, or shadows into page content.

## Shapes

Content buttons and tabs retain square edges and hairline separators. Navigation alone uses capsule controls, a 24px mobile popover, and a 20px mobile link radius. Preserve clear inset keyboard focus and at least 44px navigation targets; mobile links are at least 48px high.

## Components

### Buttons and Links
- **Primary action:** square, 48px minimum height, terracotta fill with a light text color; the landing hero locally switches to coral on charcoal.
- **Booking action:** square, light paper fill, charcoal text, 52px minimum height, and a simple color change on hover.
- **Text links:** terracotta, underlined, and at least 44px high where they serve as controls.
- **Interaction:** primary buttons darken on hover and compress slightly while pressed; focus remains visible with a high-contrast outline.

### Navigation
The shared header keeps its logo and existing placement. Desktop links sit in one light liquid-glass capsule: paper at 62% opacity, an 18px backdrop blur with 160% saturation, a fine 48%-opacity paper edge, and a soft offset shadow. Labels stay charcoal, compact, and in title case. The active pill uses 84%-opacity paper. Selection is measured from the real link bounds, not hard-coded link counts or widths.

Internal links use client navigation so the capsule survives a route change. A clipped selection surface moves between destinations in 250ms with `cubic-bezier(0.77, 0, 0.175, 1)`; only the clip animates, not layout dimensions. Interruption starts from the current visible position. Keyboard activation, resizing, and reduced motion update selection immediately.

Registration is a separate charcoal-filled capsule with paper text and an external-link arrow inside the glass rail. It opens the approved Zoom Events destination in a new tab and closes the mobile popover, without replacing the current internal page's selection. Its focus outline is paper against charcoal. Registration is the navigation action; the homepage no longer shows a Save the date control or calendar-reminder note.

At 680px, or earlier when the logo and all navigation links no longer fit, a glass Menu/Close control opens a compact right-aligned popover with 48px links. At 360px and below, its visible label hides while the icon and accessible name remain. Escape closes the popover without animation and returns focus to the toggle. Higher-contrast and reduced-transparency preferences replace the glass with opaque paper and a defined charcoal border.

### Destination Tabs
Venue and hotel tabs use equal-width, 44px controls. The active label and a thin moving underline use the action color; the tab panel changes the destination shown in the map schematic.

### Street-Grid Schematic
The venue page uses a quiet street grid with a labeled destination marker. It explicitly says “not to scale” and does not draw a route; the directions link opens Google Maps for the selected destination.

## Do's and Don'ts

### Do:
- **Do** keep Source Serif 4 for display headings and IBM Plex Sans for functional text.
- **Do** use the terracotta accent for actions, active states, and wayfinding.
- **Do** preserve open section spacing, square content controls, and visible keyboard focus; keep the glass treatment scoped to navigation.
- **Do** label schematic maps as not to scale and link directions to a real map service.

### Don't:
- **Don't** add shadowed cards as the default layout; current hierarchy comes from spacing, fills, and hairlines.
- **Don't** imply a walking route or geographic accuracy in the schematic map.
- **Don't** publish unconfirmed room, entrance, or program details as facts.
