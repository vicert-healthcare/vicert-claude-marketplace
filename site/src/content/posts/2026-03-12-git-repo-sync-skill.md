---
title: Git Repo Sync Skill
author: Bojan Miric
date: "2026-03-12"
tags: [git, sync, skill, automation, claude-code]
type: show-and-tell
---

Bojan Mirić presented a Claude Code skill for automating bidirectional code synchronization between two Git repositories.

## Background

The skill was born from a real pain point: manually syncing code between Vicert's local GitHub repository and the client's virtual machine. Previously, the team used VS Code's "Code Packer" plugin, but the process was tedious and error-prone. The initial goal was automating pulls from the client repo, later expanded to support pushing local development changes to the client.

## How It Works

The skill is configured via a JSON file defining:
- **Source and target repositories** — Vicert's GitHub and client's repo
- **Branch mapping** — e.g., client's `main` ↔ Vicert's `master`
- **Exclusion patterns** — files or patterns to skip during sync
- **Default sync direction** — client-to-Vicert or reverse
- **Default commit messages** — customizable per operation

### Available Commands

| Command | Description |
|---------|-------------|
| `status` | Shows current sync state between branches |
| `setup` | Guided configuration walkthrough |
| `diff` | Displays differences between mapped branches |
| `run` | Executes the synchronization |

The skill uses `git diff` for branch comparison and can create non-existing branches with all commits. Edge cases like conflicting commits require explicit file exclusion to prevent overwrites. The skill requires user approval for commit and push operations.

## Discussion & Feedback

- **Mihailo Trisovic** raised questions about handling divergent repositories and the `init setup` command behavior
- **Neb Lazic** proposed extending the skill with PR creation capabilities — instead of direct file sync, create PRs on the client repo from local changes, useful for projects where code is delivered for client review
- **Nikola Markovic** noted that PR creation isn't needed in the current VM testing scenario but acknowledged its value for other projects
- **Igor Stojanovic** suggested modularizing the skill (currently 500+ lines) by splitting operations into separate files for easier maintenance and fine-tuning
- The team agreed the skill should be published to the Vicert marketplace
