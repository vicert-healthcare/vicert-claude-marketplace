---
title: "Wanted to drop a quick thought on where we’re headed with AI in software..."
author: "Nebojsa Lazic"
date: "2025-10-07"
tags: ["claude", "cursor", "agents", "llm", "tools"]
type: discussion
url: "https://github.com/snarktank/ai-dev-tasks"
---

Wanted to drop a quick thought on where we’re headed with AI in software engineering.

We’ve all watched this space evolve fast:
    •   First it was the “copy/paste hustle” (IDE :left*right*arrow: GPT :left*right*arrow: IDE).
    •   Then came co-pilots: basically autocomplete on steroids.
    •   Now we’re seeing fully autonomous coding agents (Claude Code, Cursor agents, etc.) that don’t just assist but actually behave like peer engineers.

That’s the shift: LLMs aren’t tools anymore, they’re collaborators. They can implement code, but more importantly, they can propose end-to-end solutions to engineering problems. The usage pattern is evolving so quickly that tricks like “smart prompting” or even “vibe-coding” are already outdated.

The new model is spec-driven development: instead of trying to be clever with prompts, we focus on writing solid specs (PRDs, feature docs, etc.) and guide the AI to turn them into plans, tasks, and code.

Some approaches worth checking out:
    1.  [Lightweight: ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks) – dead simple, 3 custom commands you can tweak for small problems.
    2.  [Medium/Advanced: GitHub Spec Kit](https://github.com/github/spec-kit) – more mature, works well with Claude Code, Cursor, etc.
    3.  Full stack: Amazon Kiro – entire dev environment built around spec-driven workflows.(google it)
    4.  Mix and match: e.g., use Kiro to break down Spec → Plan → Tasks, then hand tasks off to Claude Code to generate code.

The big idea: spec-driven AI dev isn’t just hype. It’s a real methodology where AI is involved before code generation — helping us move from PRD → spec → plan → tasks → implementation. Writing code is the last step, not the first.

This is a fundamental shift. If we treat AI as peers and drive them with specs, we can move faster and build cleaner systems. 🚀

Curious what you all think — has anyone already played with Spec Kit or Kiro in real projects?

---

**Reply from Nikola Stojanovic:**
thanks for sharing! Will definitely look closer into these (the one from Github specifically looks really interesting).

On that note, my "spec driven development" is to prompt the agent to start up a subagent. This subagent does analysis/research and neatly summarizes its findings inside of a `featureXYZ-plan.md` file, which then the main agent consumes (and either iterates upon or launches another subagent to do further work).

The subagent dance is a neat trick which proves to be useful so as to avoid context pollution of the main agent (as rudimentary output such as `Read(path/to/file)` is confined to the throwaway context of the subagent).

