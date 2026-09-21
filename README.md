# Disaster Law Symposium 2026

Phase 1 is a single static overview page in the **Urban Signal** direction. October 29, 2026 at John Jay College of Criminal Justice.

## Development and checks

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
```

The production preview runs at http://localhost:3000 (`PORT=3001 npm run preview` selects another port). `npm run build` cleans previous output and verifies the release boundary. These commands do not deploy.

## Publishing

The website is hosted on Netlify. `netlify.toml` runs `npm run release:check && npm run build` and publishes `out`, making the approved Next.js landing page the default homepage. The release contract is shared in [`release-manifest.json`](release-manifest.json) and validated before the build. Netlify's connected repository should deploy the `main` branch.

Netlify serves the page at `/` without a repository prefix. Its built-in `URL` environment variable supplies the canonical address for metadata and the sitemap; `NEXT_PUBLIC_SITE_URL` can override that address. Local builds fall back to http://localhost:3000. The site is a static export and does not need the Netlify Next.js server runtime.

## Published content

- `/`: overview with date and venue, four numbered topics, contact.
- `/disaster-law-symposium-2026.ics`: downloadable all-day calendar placeholder.
- All other content routes return the custom 404. Configure the static host to serve `404.html` with status 404, not a homepage fallback.
- `sitemap.xml` lists only the homepage.

Approved copy lives in `data/published-event.ts`, the single active published-event module. Public assets contain only the logo and skyline. See [Phase 1 constraints and later-phase handoff](docs/PHASE-1.md) and [photograph credits](docs/ASSET-CREDITS.md).

Historical route entrypoints and the independent topic proposal are retained only in `archive/phase-0/` and `archive/staging-topics/` as reference material. They have no runtime guarantee and are not imported or exported. The stakeholder PDF remains in `artifacts/`.
