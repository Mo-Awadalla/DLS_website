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

The default page is https://mo-awadalla.github.io/DLS_website/. Pushes to `main` run `.github/workflows/pages.yml`, which builds and verifies the approved Next.js page and publishes only `out/` to GitHub Pages. Pages uses GitHub Actions rather than the old root HTML placeholder.

The workflow supplies `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` from Pages configuration so images, calendar links, metadata, and the sitemap use the published address. Ordinary local builds omit the prefix.

## Published content

- `/`: overview with date and venue, four numbered topics, contact.
- `/disaster-law-symposium-2026.ics`: downloadable all-day calendar placeholder.
- All other content routes return the custom 404. Configure the static host to serve `404.html` with status 404, not a homepage fallback.
- `sitemap.xml` lists only the homepage.

Approved copy lives in `data/overview.ts`, independent of draft agenda and speaker content. Public assets contain only the logo and skyline. See [Phase 1 constraints and later-phase handoff](docs/PHASE-1.md) and [photograph credits](docs/ASSET-CREDITS.md).

Previous route entrypoints, staging designs, stylesheet, and unpublished images are retained in `archive/phase-0/`. The stakeholder PDF remains in `artifacts/`; original sources remain in `legacy/` and `SRC/`. These are local materials and are not exported.
