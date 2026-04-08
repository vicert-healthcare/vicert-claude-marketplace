---
title: Included Wizard Protobuf Migration
author: Dejan Radmanovic
date: "2026-01-29"
tags: [included-health, wizard, protobuf, cursor, migration]
type: show-and-tell
---

Dejan Radmanović presented significant improvements to the Wizard platform at Included Health, showcasing how AI dramatically accelerated a large-scale migration.

## Platform Improvements

The Wizard platform powers server-driven UI at Included Health. Two major enhancements:

1. **Protobuf schema support** — The platform now supports Protobuf schemas alongside existing JSON schemas, expanding the types of data structures that can drive the UI
2. **Page descriptor pattern** — A new registration pattern for pages, replacing the previous centralized logic. Each page now registers itself, making the codebase more modular and maintainable

## AI-Powered Migration

The migration from the old centralized pattern to page descriptors was a massive undertaking. Cursor AI was used to automate the process:

- **Generated 20 Jira tickets** for each page needing migration
- **Created draft PRs** based on migration guides from Confluence documentation
- **Estimated savings: three weeks of manual work**

The AI read the Confluence guides, understood the migration pattern, and applied it consistently across all pages — exactly the type of repetitive, pattern-based work where AI excels.

## Challenges

- **Background agents** at Included Health were in a "broken state" due to an initiative to enable building apps without waiting for CI results
- This prevented running sub-agents locally for full migration automation
- Igor Stojanovic emphasized the importance of **verifying migrated code sections**, noting that agents can introduce unwanted code patterns

## Discussion

- Dejan confirmed he tested the migration on several pages but couldn't guarantee all pages were perfect
- The team discussed Included Health's specific rules about adding custom rulesets and ongoing conversations about Cursor command usage
- Nikola Stojanovic provided an update on the CLI tool development, having sent PRD-related documents to the team
