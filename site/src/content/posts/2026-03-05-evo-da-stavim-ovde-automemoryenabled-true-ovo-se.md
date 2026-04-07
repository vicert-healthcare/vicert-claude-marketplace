---
title: "Evo da stavim i ovde: { \"autoMemoryEnabled\": true } Ovo se moze dodati u:..."
author: "Nebojsa Lazic"
date: "2026-03-05"
tags: ["claude"]
type: post
url: "https://code.claude.com/docs/en/memory#auto-memory"
---

Evo da stavim i ovde:

```{
  "autoMemoryEnabled": true
}```
Ovo se moze dodati u:

`~/.claude/settings.json` -&gt; Vazice globalno za sve projekte na vasem racunau
`project_root/.claude/settings.json` -&gt; Vazice samo za taj projekat, ali ce biti git versioned i deljen sa timom
`project_root/.claude/settings.local.json` -&gt; Vazice samo za taj projekat ali samo na vasem racunaru, nece biti git versioned i deljen sa timom

Detalje kako ovo radi [imate ovde](https://code.claude.com/docs/en/memory#auto-memory).
