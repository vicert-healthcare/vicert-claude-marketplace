---
title: "Open Viking — protokol za agentsku memoriju (i potreba za sandbox okruženjem)"
author: "Nikola Milev"
date: "2026-03-26"
tags: ["agents", "mcp", "security", "tools"]
type: show-and-tell
url: "https://grain.com/share/recording/d6ed8abb-f1e9-4045-b83e-575db972d94a/ttIeV05Je0VQPnsQ8cnEkBbBTWpVm7MKnMlvpKYp"
---

Nikola Milev je na Show & Tell pomenuo **Open Viking** — protokol za agentsku memoriju, sličan po konceptu MCP ili HTTP protokolu, ali specifično dizajniran kao baza za agente.

## Zašto je ovo zanimljivo

Trenutno Claude koristi file-based memoriju (CLAUDE.md + memory folder sa .md fajlovima). Open Viking uvodi **standardizovan protokol** za agentsku memoriju — potencijalno konzistentniji pristup nego ručno upravljanje fajlovima.

Moglo bi da reši problem koji Nikola ima na Canvas projektu — mnogo servisa, isprepletani podaci, agent koji čita memoriju ali i dalje pogreši u izvršavanju.

## Sandbox okruženje

Nikola je predložio da Vicert postavi **sandboxed environment** (EC2 instanca na AWS/Azure) za testiranje novih alata:
- Zaštita od potencijalnih rizika nepoznatih agenata
- Nema klijentskih projekata na računaru
- Bezbedno eksperimentisanje sa Open Viking, DeerFlow i sličnim alatima

> "Nema čovjek koji može da isprati svaki poziv u svakom tool-u. Čisto da se zaštitimo." — Nikola Milev

Takođe pomenut **DeerFlow** — Agentic Harness za multi-agent koordinaciju (Mixture of Experts koordinator), ali sajt im često pada.

*Iz Weekly Show & Tell — 26. mart 2026.*
