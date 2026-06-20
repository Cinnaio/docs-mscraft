# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run docs:dev       # Start VitePress dev server at localhost:5173
npm run docs:build     # Full build: unshallow git → optimize images → VitePress build
npm run docs:preview   # Preview production build
npm run docs:favicon   # Regenerate favicon/apple-touch-icon from logo.png via sharp
```

- `docs:build` runs three sequential steps: `scripts/unshallow-git.js` (for accurate `lastUpdated` timestamps in CI), `scripts/optimize-images.js` (lossy compression via sharp), then `vitepress build`.
- There are no formal tests — this is a documentation site.

## Architecture

A **VitePress v2** static site serving bilingual (zh-CN root / en-US) documentation for the ClusterGap Minecraft server, deployed on **Cloudflare Pages** with a Cloudflare Function for live server status.

### Directory structure

```
docs/                          # Documentation source (markdown + theme)
├── .vitepress/
│   ├── config.mts             # Site config: locales, nav, sidebar, Vite proxy, git last-updated
│   └── theme/
│       ├── index.ts           # Custom theme entry — extends DefaultTheme, registers global components
│       ├── style.css          # Brand palette (milk-tea/cream), custom-block styling, item-chip styles, tooltip
│       ├── home-showcase.css  # Home page showcase grid layout
│       ├── team-page.css      # Team page layout
│       ├── components/
│       │   ├── HomeShowcase.ts          # Renderless component: 2-item showcase from frontmatter
│       │   ├── ServerStatus.vue         # Polls mcsrvstat.us (public) or MCSManager API (dev proxy / CF function)
│       │   ├── SiteFooter.vue           # Homepage-only footer with brand, nav, license
│       │   ├── SiteContributors.vue     # Grid of contributor cards
│       │   ├── SiteContributorAvatar.vue # MC avatar with fallback chain: Minotar → mc-heads → skin station → logo
│       │   ├── VPTeamMembersItem.vue    # Overrides default team card to use MC avatar fallback
│       │   └── VPDocFooterLastUpdated.vue # Overrides default "last updated" to show author name + avatar
│       ├── utils/
│       │   └── mcPlayerAvatar.ts        # Avatar URL chain helpers
│       └── item-chip-tooltip.ts         # Hover tooltip system for Minecraft item chips in docs
├── en/                         # English docs (mirrors structure of root zh docs)
├── tutorial/                   # Tutorial pages (Teastory, SeasonWiki, EcoEnchants, BreweryX, etc.)
├── _team-history/              # Team history markdown imported by team.md
├── _item-chip-tooltip/         # Item tooltip metadata (JSON in markdown frontmatter)
├── public/images/              # Static images + _originals/ backup for optimized images
├── index.md                    # Chinese home page (home layout with showcase)
├── getting-started.md          # New player guide
├── server-faq.md               # Server rules & FAQ
├── residence.md                # Land claim guide
├── feedback.md                 # Feedback form
├── team.md                     # Team & history page (uses SiteContributors + VPTeamPage)
└── status.md                   # Server status page (uses ServerStatus component)

functions/api/status.ts         # Cloudflare Pages Function — proxies MCSManager instance + overview API

scripts/
├── unshallow-git.js            # Runs git fetch --unshallow for correct lastUpdated timestamps
├── optimize-images.js          # Sharp-based lossy compression (PNG/JPEG/WebP), backs up originals
└── generate-favicon.js         # Generates 48×48 favicon + 180×180 apple-touch-icon from logo
```

### Key patterns

- **Theme overrides**: `config.mts` uses Vite aliases to replace VitePress default components (`VPDocFooterLastUpdated.vue`, `VPTeamMembersItem.vue`) with custom versions. The theme `index.ts` extends `DefaultTheme` and injects `HomeShowcase` and `SiteFooter` via layout slots.
- **MC avatar fallback**: Team/contributor avatars try Minotar helm → mc-heads → skin.cubem.cn → local logo. Error handlers on `<img>` elements advance the chain.
- **Server status**: In dev mode, the Vite proxy rewrites `/mcsm/api/*` to the MCSManager panel, injecting apikey/daemonId/instanceId server-side (never in the browser). In production, `functions/api/status.ts` calls MCSManager and returns normalized data.
- **Last-updated author**: `transformPageData` in `config.mts` runs `git log -1 --pretty=%an` per file at build time, storing the author name and avatar URL on the page data for the custom `VPDocFooterLastUpdated.vue`.
- **Item chips**: Markdown uses `<span class="item-chip"><img src="...">Name</span>` for Minecraft item references. The tooltip system (`item-chip-tooltip.ts`) maps chip text to descriptions from `_item-chip-tooltip/` JSON metadata.
- **Image optimization**: `optimize-images.js` runs during `docs:build`, compressing images with sharp and backing up originals to `_originals/`. Only replaces if new size ≤ 95% of old and image ≥ 10 KB.

### Environment variables

| Variable | Purpose |
|---|---|
| `VITE_MCSM_APIKEY` | MCSManager API key (dev proxy injects it) |
| `VITE_MCSM_DAEMON_ID` | MCSManager daemon UUID |
| `VITE_MCSM_INSTANCE_ID` | MCSManager instance UUID |
| `MCSM_BASE_URL` | CF Pages env: MCSManager panel URL |
| `MCSM_APIKEY` | CF Pages env: MCSManager API key |
| `MCSM_DAEMON_ID` | CF Pages env: daemon UUID |
| `MCSM_INSTANCE_ID` | CF Pages env: instance UUID |

Env vars are read from `process.env`, falling back to `.env.local` then `.env` via the `readEnvValueFromFile` helper in `config.mts`.

### Branching

The default branch is `v2`. Edit links point to `https://github.com/Cinnaio/docs-mscraft/edit/v2/docs/:path`.

### Adding a new page

1. Create `.md` in `docs/` (zh) and `docs/en/` (en)
2. Add sidebar entry in `docs/.vitepress/config.mts` under the relevant locale
3. If the page uses custom components, register them in `theme/index.ts` or use inline `<script setup>`
