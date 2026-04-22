---
title: "Here’s a short post on how to create a simple “commit-message” skill from a..."
author: "Igor Stojanovic"
date: "2026-04-21"
tags: ["claude", "testing", "plugins", "healthcare-ai", "article"]
type: discussion
url: "https://github.com/vicert-healthcare/commit-message-skill/compare/main...JIRA-003-commit-skill"
---

Hey team,
here’s a short post on how to create a simple “commit-message” skill from a conversation with Claude.
Creating Git commits is a repeatable task we do every day, and I like to start each commit message with a Jira ID.
That’s why I decided to create a simple skill for it.

The post is written in a LinkedIn style, so it’s intentionally a little cringy :slightly*smiling*face:
It was created based on this [Git history](https://github.com/vicert-healthcare/commit-message-skill/compare/main...JIRA-003-commit-skill), where you can see every prompt and step I took while building it.

---
**I built a tiny AI assistant for writing commit messages. Then I tested it like software.**

Most devs write commit messages on autopilot. “fix stuff.” “update.” “asdf.” Sound familiar?

I decided to fix this — not by writing better messages myself, but by teaching Claude to do it for me.
I created a simple “commit-message” skill: a set of instructions that tells Claude how to inspect staged changes and generate a proper commit message automatically.

The rule is straightforward: if the branch has a Jira ticket ID (like `JIRA-1820-add-login`), start the message with the ticket. If not, use a conventional type prefix (`feat:`, `fix:`, `docs:`). Always imperative mood, always specific.

**But here’s where it gets interesting.**

After building the first version, I didn’t just assume it worked — I evaluated it. I used Anthropic’s skill-creator to run test scenarios automatically and grade the outputs. And it failed. The skill was using conventional type prefixes even on ticket branches, which was wrong. Although the skill-creator made the skill, it made a mistake.

I rewrote the skill. Re-ran the eval.  **100% pass rate — a 21.7% improvement.**

Then I noticed all my test cases had Jira IDs. **What about branches without one?**
I told Claude to add that case, the skill produced a plain description instead of a typed prefix. Still wrong. Another rewrite, another eval round. Success!!! **+6 percentage points. Final score: 100% vs 93.8% for the old version.**

The whole loop — write skill, run evals, read feedback, improve - felt exactly like TDD. Except instead of testing code, I was testing AI behavior.

**The takeaway:** Skills without evals are just vibes. Measurable results change the game - you know exactly what broke, what improved, and why.

Small skill. Big lesson. 💪

**---**
Building good skills involves much more than this. It depends on the skill’s complexity, size, number of steps, and overall workflow. Anthropic even released a 33-page guide, [The Complete Guide to Building Skills for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf).
We’ll tackle more complex skills in the next article.
