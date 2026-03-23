# CLAUDE.md

## Project Overview

Vicert Claude Marketplace — a community plugin registry and browsable catalog for Claude Code plugins. Users can discover, submit, and manage plugins through a web interface with GitHub-based PR automation.

## Tech Stack

- **Frontend**: Astro 5.18 + Preact + Tailwind CSS 3
- **OAuth Proxy**: Cloudflare Workers (TypeScript)
- **Build/CI**: Node.js 22, npm, GitHub Actions
- **Hosting**: GitHub Pages (static site at `https://vicert-healthcare.github.io/vicert-claude-marketplace/`)

## Repository Structure

```
plugins/              # Community plugins organized by category (e.g., devops/, productivity/)
site/                 # Astro-based web interface
  src/islands/        # Preact interactive components (PluginBrowser, PluginEditor, etc.)
  src/lib/            # GitHub API integration (github-catalog.ts)
  src/pages/          # Astro route pages
oauth-proxy/          # Cloudflare Worker for GitHub OAuth token exchange
scripts/              # Build (build-marketplace.js) and validation (validate.js)
.claude-plugin/       # Generated marketplace.json (auto-built from plugins/)
```

## Key Commands

```bash
npm run build                # Full build: marketplace.json + Astro site
npm run build:marketplace    # Generate .claude-plugin/marketplace.json from plugins/
npm run validate             # Validate plugin structure and schema
npm run dev:site             # Local Astro dev server
npm run build:site           # Build static site
```

## Plugin Structure

Each plugin lives in `plugins/<category>/<plugin-name>/` and must contain:
- `.claude-plugin/plugin.json` — manifest with name, version (semver), description
- Component files: skills (`SKILL.md`), agents, commands, hooks, MCP/LSP servers
- `README.md`

Naming convention: kebab-case for plugin names and category folders.

## CI/CD

- **`validate-pr.yml`**: Runs on PRs touching `plugins/**` — validates schema, naming, semver, version bumps
- **`deploy.yml`**: On push to main — generates marketplace.json, auto-commits if changed, builds and deploys site to GitHub Pages

## Development Notes

- `marketplace.json` is auto-generated — do not edit manually
- The Plugin Editor (site/src/islands/PluginEditor.tsx) is the largest component (~1000 lines)
- OAuth proxy uses Cloudflare Workers with `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
- PR submissions create branches (not forks) via the GitHub API
