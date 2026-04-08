---
title: Marketplace UI Plugin Catalog
author: Dejan Radmanovic
date: "2026-03-19"
tags: [marketplace, astro, github-pages, plugins, ui]
type: show-and-tell
---

Dejan Radmanovic presented a fully functional marketplace UI for Claude Code plugins, built from scratch in just 30 minutes using Cursor AI.

## The Problem

Vicert had 3-4 separate plugin repositories scattered across different team members (Dejan's, Mihailo's, Bojan Todorovic's sync skill repo), making it difficult for anyone — especially new team members — to discover and install available plugins. Included Health's marketplace had a similar problem: no UI, no documentation, just raw GitHub repositories that required manual searching.

## The Solution

A browsable web catalog with:

- **Plugin metadata display** — version, category, author, license, and tags for each plugin
- **Full-text search** — by name, description, and tags
- **Category browsing** — AI-Inclusive, AI-Vida, DevOps, Code Quality, Productivity, and custom categories
- **PR-based submission workflow** — anyone can submit a plugin through the UI, which opens a Pull Request for maintainer review
- **Quick install commands** — one-click install for each plugin directly into Claude Code
- **Review tracking** — view open and closed PR reviews directly from the UI

## Technical Details

- Built with **Astro framework** (similar to React), hosted free on **GitHub Pages**
- Cursor AI chose Astro over plain Markdown (too limited for custom scripts) and raw HTML/CSS
- The `build-marketplace.js` script traverses all plugin directories, reads individual `plugin.json` files, and merges them into a single `marketplace.json`
- Auto-deploys on push: validates, builds marketplace JSON, and publishes to GitHub Pages
- Initial base URL issue was resolved by switching from root `/` to the repository name path

## Key Insight

AI proved extremely useful for mini-scale projects and CLI tools — Dejan deliberately avoided reviewing the generated code to test pure AI output quality. The main correction needed was providing Claude Code documentation so the tool would follow proper plugin structure conventions.

## Discussion

- **Nikola Stojanovic** asked about referencing external repositories — currently unsupported but believed to be feasible with additional implementation
- **Nikola Milev** suggested using `git clone` in GitHub Actions to include pre-generated agents/skills from other repos
- Team agreed to consolidate all repositories into one place, following Included Health's positive example of a single plugin repo
