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
    letterSpacing: "0.04em"
    lineHeight: 1.5
rounded:
  square: "0px"
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
- Square controls and a restrained, responsive navigation system.

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
- **Navigation label** (500, 14px desktop, 16px mobile, +0.04em tracking, uppercase): primary navigation links.

**The Two Voice Rule.** Keep display headings in Source Serif 4 and functional text in IBM Plex Sans; use weight and size to establish hierarchy rather than bolding every heading.

## Layout

The shared page shell tops out at 1180px, with 40px side gutters on desktop and 20px on narrow screens. Layouts use a 4px spacing rhythm. The venue page pairs venue details with travel information on wide screens, then stacks those sections on mobile; the hotel details follow as a separate full-width section.

At 1100px the venue columns tighten and type scales down. At 680px the page becomes a single column, the header switches to its mobile menu, and the venue masthead reduces from 88px to 80px. Major sections use generous vertical space: 80px on desktop and 48px on mobile, with page-specific adjustments where needed.

## Elevation & Depth

The current pages use flat surfaces without box shadows. Hierarchy comes from the canvas and surface fills, generous spacing, and hairline separators. The mobile navigation uses a blurred dark backdrop; it is the only translucent surface treatment in the shared shell.

**The Flat Surface Rule.** Keep resting content flat. Use tone and separators to distinguish sections before adding elevation.

## Shapes

The form language is square-edged. Buttons, navigation, tabs, and the map use unrounded geometry; 1px rules separate content, and the selected-tab indicator is 2px. Preserve clear focus outlines and the 44px minimum desktop navigation target.

## Components

### Buttons and Links
- **Primary action:** square, 48px minimum height, terracotta fill with a light text color; the landing hero locally switches to coral on charcoal.
- **Booking action:** square, light paper fill, charcoal text, 52px minimum height, and a simple color change on hover.
- **Text links:** terracotta, underlined, and at least 44px high where they serve as controls.
- **Interaction:** primary buttons darken on hover and compress slightly while pressed; focus remains visible with a high-contrast outline.

### Navigation
The shared header sits over the dark masthead or hero. Desktop links are uppercase, have a 44px minimum height, and reveal a fine underline on hover or when active. At 680px, the links move into a dark mobile drawer; its stacked links are at least 52px high.

### Destination Tabs
Venue and hotel tabs use equal-width, 44px controls. The active label and a thin moving underline use the action color; the tab panel changes the destination shown in the map schematic.

### Street-Grid Schematic
The venue page uses a quiet street grid with a labeled destination marker. It explicitly says “not to scale” and does not draw a route; the directions link opens Google Maps for the selected destination.

## Do's and Don'ts

### Do:
- **Do** keep Source Serif 4 for display headings and IBM Plex Sans for functional text.
- **Do** use the terracotta accent for actions, active states, and wayfinding.
- **Do** preserve the open section spacing, square controls, and visible keyboard focus.
- **Do** label schematic maps as not to scale and link directions to a real map service.

### Don't:
- **Don't** add shadowed cards as the default layout; current hierarchy comes from spacing, fills, and hairlines.
- **Don't** imply a walking route or geographic accuracy in the schematic map.
- **Don't** publish unconfirmed room, entrance, or program details as facts.
