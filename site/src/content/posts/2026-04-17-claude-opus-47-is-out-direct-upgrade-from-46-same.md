---
title: "Claude Opus 4.7 is out → Direct upgrade from 4.6, same pricing ($5/$25 per M..."
author: "Bojan Todorovic"
date: "2026-04-17"
tags: ["claude", "agents"]
type: news
url: "https://www.anthropic.com/news/claude-opus-4-7"
---

**Claude Opus 4.7 is out** → https://www.anthropic.com/news/claude-opus-4-7

Direct upgrade from 4.6, same pricing ($5/$25 per M tokens). Big gains on hard/long-running coding tasks. A few things worth knowing as engineers:

🔍 **`/ultrareview` in Claude Code** - new slash command that kicks off a dedicated review session over your changes, flagging bugs and design issues like a careful human reviewer would.

⚙️ **New `xhigh` effort level + Auto mode** - `xhigh` sits between `high` and `max` for finer reasoning/latency tradeoffs, and is now the default in Claude Code. Auto mode (Claude decides permissions on your behalf) is extended to Max(and all org premium/standard users) users, so longer autonomous runs without constant interruptions.

⚠️ **Heads up on prompts + tokens** - 4.7 follows instructions much more literally, so prompts tuned for older models may behave unexpectedly. Also uses a new tokenizer (~1.0–1.35× more tokens for the same input) and thinks more at high effort. They recommend re-measuring on real traffic.

Bonus: vision jumped to ~3.75MP images (3x prior), which is nice for screenshot/diagram-heavy agent work.

---

**Reply from Igor Stojanovic:**
Bas sam juce imao problem sa jednom animacijom na androidu.
Snimio sam video, convertovao u Gif i rekao mu u cemu je problem. Ponudio je pravo resenje iz prve

**Reply from Igor Stojanovic:**
Takodje, kada sam sve zavrsio, uglavnom u Cursoru, rekao sam mu da uradi review coda. Pronasao je 5 improvmenta koje Cursor sa svojim composer-2 modelom nije skontao.
Sve u svemu, dobro je kombinovati modele, zato sto ni Claude nije silver bullet

