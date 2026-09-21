# Topics staging preview

Independent Next.js preview using shadcn/ui Item and the approved symposium copy.
This directory is reference-only and has no runtime guarantee. The production
app, its dependencies, and its export routes are unchanged by running it.

From this directory:

```sh
npm install
npm run dev
```

Open http://localhost:3001/#topics for the proposal, or
http://localhost:3001/current#topics for the existing section.

This sandbox reuses the repository's Next.js/React installation, typography,
header, footer, global styles, assets, and content. It has its own Tailwind and
shadcn dependencies. It lives under `archive/` so the production TypeScript build
does not include it. It is not imported by the production app or included in its
static export. `public` is a symlink to the root public directory.

The proposal uses the upstream Item composition with site-specific styling,
visible descriptions, decorative numbering, and no additional motion. Both
preview pages use noindex metadata.
