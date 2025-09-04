# Disaster Law Symposium 2026

Website for the Disaster Law Symposium, October 29, 2026 at John Jay College of Criminal Justice, New York City. Registration is on Zoom Events.

## Pages

- `/`: overview, agenda, contact and registration.
- `/speakers/`: speakers by course, with biographies.
- `/venue/`: venue, accessibility entrance, directions and hotel information.
- `/disaster-law-symposium-2026.ics`: all-day calendar file.
- Any other route returns the custom 404.

## Development

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
```

The production preview runs at http://localhost:3000 (`PORT=3001 npm run preview` selects another port). `npm run build` cleans previous output and verifies the export against `release-manifest.json`. Stop `npm run dev` before building: both write to `.next/`.

## Content

- `data/published-event.ts`: event facts and copy.
- `data/agenda.ts`: agenda.
- `data/speakers.ts`: speakers and biographies. A speaker can belong to several courses through `groups`.
- `public/assets/headshots/`: speaker portraits (4:5).
- `release-manifest.json`: the routes and assets allowed to ship. A new public asset must be listed here or the build fails.
- `docs/ASSET-CREDITS.md`: image credits.

## Deployment

Static Next.js export hosted on Netlify. `netlify.toml` runs `npm run release:check && npm run build` and publishes `out/`. Netlify deploys the `main` branch. Netlify's `URL` environment variable supplies the canonical address for metadata and the sitemap; `NEXT_PUBLIC_SITE_URL` overrides it. The host must serve `404.html` with status 404.
