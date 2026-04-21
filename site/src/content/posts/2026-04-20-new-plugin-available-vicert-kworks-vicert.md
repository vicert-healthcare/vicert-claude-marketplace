---
title: "New plugin available: vicert-kworks (Vicert Knowledge Works) Just published..."
author: "Nebojsa Lazic"
date: "2026-04-20"
tags: ["claude", "llm", "testing", "plugins", "tools"]
type: discussion
url: "https://www.loom.com/share/b2ee18ad193b43d8b905dd20f97ce113"
---

**New plugin available: vicert-kworks (Vicert Knowledge Works)**

Just published to our internal Claude Code marketplace. It’s a home for cross-cutting skills that help us think, plan, and decide better — not tied to any single role or workflow.

**Install (in Claude Code)**
`/plugin marketplace add vicert-internal-cc-plugins`
`/plugin install vicert-kworks`

**Install (in Claude Cowork or Desktop)**
https://www.loom.com/share/b2ee18ad193b43d8b905dd20f97ce113

New skill: **first-principles**

A reasoning engine, not a research tool. It takes a problem you’re stuck on — a strategic decision, a plan you want to pressure-test, an assumption you suspect is borrowed — and strips it down to the truths that cannot be deduced from anything deeper. Then it rebuilds solutions from zero, ignoring how others have solved it. This is based on Aristotel’s first principles theory from 2500 years ago and works fascinating well with modern LLMs and AI.

Five phases: Assumption Autopsy → Irreducible Truths → Reconstruction from Zero → Assumption vs. Truth Map → The Move (the single highest-leverage action that only surfaces once the assumptions are gone).

How to use it
`/vicert-kworks:first-principles help` → Start here to get help on how to use the skill.

`/vicert-kworks:first-principles should we build our own ML platform or keep buying it?`

`/vicert-kworks:first-principles @file*that*contains*the*problem.txt`

`/vicert-kworks:first-principles **challenge** our 2026 plan to open three new regions`

Add `challenge` before your problem to turn it interactive — it’ll pause and let you defend, accept, or remove each assumption and truth before the reconstruction is built on them. Use it when the stakes are high. **Warning**: it will take a lot of time to complete in challenge mode (your time, not Claude’s), because challenge mode will ask you to discuss, analyze, accept or reject each assumption and truth before the reconstruction is built on them.

Best for: strategy calls, decision prep, killing bad plans early, unsticking yourself from conventional framing. Not for: market research, summarization, or brainstorming.

Give it a spin and let me know what breaks.

---

**Reply from Nebojsa Lazic:**
BTW, ako se pitate kako ovo moze da bude korisno, evo ga jedan primer:

Kada se u okviru sales aktivnosti napravi tzv. Brief (koji sadrzi need/target segment/solution definicije) samo ga pustis kroz `first-principles @brief.md` i on uradi analizu - koja ce u mnogim slucajevima biti too agressive za nase standarde (drugim recima razbucace je na sastavne komade i pokusati da rekonstruise kako bi zaista mogla da izgleda)

