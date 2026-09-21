# Phase 1 — Urban Signal

The approved direction uses the existing NYC skyline under a dark scrim, grey-white sections, charcoal text, Source Serif 4 headlines, and IBM Plex Sans body text. The skyline remains the visual anchor. The transparent NYCEM logo is rendered white over the hero image. The header and hero are integrated, with no separate header band, navigation, or adjacent symposium label. Preserve this treatment when changing the sections below.

Audience: legal practitioners and emergency management professionals checking the event and saving the date. The page introduces four numbered topics, establishes the date and venue in the hero, and offers a calendar download and contact email. The standalone venue section has been removed; topics flow directly into the footer.

The approved staging refinement uses grey-white (`#f5f5f2`), charcoal text (`#262724`), muted text (`#5e605a`), and terracotta accents (`#984b33`). The photographic hero retains light text and orange accents. Topics use a static shadcn Item composition adapted to the existing CSS system, with visible descriptions and thin separators. The independent preview remains in `archive/staging-topics/`; its comparison controls are not part of the public page.

## Publication boundary

- Only `/` is a public content page. There is a custom 404 with a homepage link.
- Confirmed: October 29, 2026; John Jay College of Criminal Justice; Manhattan / New York City.
- `data/published-event.ts` owns the readonly published event record, approved facts, and four topic summaries. Active app components must not import draft sessions, speakers, registration configuration, or editorial data.
- No session times, speaker names, keynote, credit allocations, CLE approval claims, registration form, or email-notification workflow are public.
- Room, entrance, street address, arrival, timing, and registration details are not asserted. Details will follow.
- `/disaster-law-symposium-2026.ics` is generated at build time from the published event record. DTSTART is DATE 20261029; DTEND is exclusive DATE 20261030. It is an all-day placeholder, not a timing announcement.
- The only public image assets are the existing agency logo and skyline. Photograph attribution is in `docs/ASSET-CREDITS.md`.

## Retained sources for later phases

`archive/phase-0/` and `archive/staging-topics/` are reference-only material with no runtime guarantee. They are excluded from the active typecheck and production build; nothing in either archive is imported by the published app or copied into the static export. The stakeholder PDF remains at `artifacts/disaster-law-symposium-2026-staging.pdf`. Future publication work starts from a new explicit module and publication seam.

Later speaker work must use explicitly approved speaker names, biographies, images, and publication status. Do not restore draft imports or whole asset folders to the homepage. The owner requested and approved replacing the original logo with a transparent NYCEM asset; provenance and rendering treatment are in `docs/ASSET-CREDITS.md`.

## Release and preview

`npm run release:check` validates the shared `release-manifest.json` and Netlify adapter. `npm run build` then removes `.next/` and `out/`, builds a static export, and verifies its publication boundary. The owner approved publishing the landing page on Netlify. `netlify.toml` configures Netlify to build and publish only the verified `out/` directory from the connected repository's `main` branch, rather than the repository root or staging sources.

`npm run preview` (or `npm start`) serves `out/` on http://localhost:3000. Set `PORT` to choose another port. It serves missing paths with the exported `404.html` and HTTP 404; it does not rewrite missing paths to the homepage.

Netlify uses `404.html` for missing routes. The calendar download link and Netlify headers supply a filename and calendar content type. Netlify's built-in `URL` variable supplies the canonical URL at build time, unless overridden with `NEXT_PUBLIC_SITE_URL`. No backend is needed; the calendar route handler runs during the build.
