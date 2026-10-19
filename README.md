# Disaster Law Symposium 2026

Website for the Disaster Law Symposium, October 29, 2026 at John Jay College of Criminal Justice, New York City. Registration is on Zoom Events.

## Pages

- `/`: overview, agenda, contact and registration.
- `/speakers/`: speakers by course, with biographies.
- `/venue/`: venue, accessibility entrance, directions and hotel information.
- `/disaster-law-symposium-2026.ics`: all-day calendar file.
- Any other route returns the custom 404.

## Content

- `data/published-event.ts`: event facts and copy.
- `data/agenda.ts`: agenda.
- `data/speakers.ts`: speakers and biographies. A speaker can belong to several courses through `groups`.
- `components/EventNotices.tsx` and `app/globals.css`: shared attendance notice; centered beneath the Speakers and Venue headings, left-aligned with the overview registration content, with left-aligned text on every page.
- `public/assets/headshots/`: speaker portraits (4:5).
- `release-manifest.json`: the routes and assets allowed to ship. A new public asset must be listed here or the build fails.
- `docs/ASSET-CREDITS.md`: image credits.
