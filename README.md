# bilginsenol.github.io

Personal site, served by GitHub Pages via a GitHub Actions build.

## Layout

Source is organized for tidiness; a build step flattens it so URLs stay short.

```
.                          published as
├── index.html             →  /                     (home page)
├── publications/
│   ├── more-works.js      →  /more-works.js         (shared "More Works" list)
│   └── tptf/              →  /tptf/                 (paper page)
├── build.sh                  (build script — not published)
└── .github/workflows/deploy.yml
```

Everything under `publications/` is flattened to the site root: each
`publications/<name>/` becomes `/<name>/` (so a paper lives at
`bilginsenol.github.io/<name>/`, **not** `/publications/<name>/`), and loose files
like `more-works.js` publish straight to the root.

Paper pages are based on the
[Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template).
`.nojekyll` keeps the published artifact from being run through Jekyll.

## Local preview

Because pages live under `publications/`, serving the repo root directly would give
the wrong URLs. Build first, then serve the assembled `_site/` — this mirrors exactly
what gets published, including the flattened paths:

```bash
sh build.sh
cd _site && python3 -m http.server 8000
```

Then open:

- home → http://localhost:8000/
- tptf → http://localhost:8000/tptf/

`_site/` is generated and git-ignored; re-run `sh build.sh` after any change.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `build.sh` and
publishes `_site/` to GitHub Pages. Docs-only commits (`**.md`, `LICENSE`) are skipped.

> One-time setup: **Settings → Pages → Build and deployment → Source = "GitHub Actions"**.

## Adding a publication

1. Create `publications/<name>/` (copy an existing paper folder as a starting point).
2. Add an entry to the `works` array in `more-works.js` so it appears in the
   "More Works" dropdown on every page.
3. Push to `main` — it publishes at `/<name>/`.
