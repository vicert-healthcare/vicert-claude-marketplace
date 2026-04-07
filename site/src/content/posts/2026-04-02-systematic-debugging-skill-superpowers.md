---
title: "Systematic Debugging Skill — pronašao 171 grešku u Canvas pluginu"
author: "Nikola Milev"
date: "2026-04-02"
tags: ["claude", "plugins", "tools", "demo"]
type: show-and-tell
url: "https://github.com/obra/superpowers"
---

Na Weekly Show & Tell, Nikola Milev je demonstrirao **Systematic Debugging** skill iz [Obra Superpowers](https://github.com/obra/superpowers) plugin-a — i rezultati su impresivni.

## Šta radi?

Skill ima 4 faze, slično kao kad bi ti ručno debugovao:

1. **Root Cause Investigation** — kreće od error loga, ide nazad kroz kod depth-first da nađe izvor problema. Ne skače na fix, nego traži pravi uzrok.
2. **Pattern Analysis** — proverava da li se isti problem ponavlja na drugim mestima u kodu. Ako isti kod radi negde drugde a puca ovde, znači problem je posle tog koda.
3. **Hypothesis Formation** — na osnovu prve dve faze formira hipotezu. Nikola kaže da mu do sad **nijednom nije promašio** hipotezu.
4. **Defense in Depth** — prolazi kroz business logiku, guardove i forenziku u kodu.

## Rezultati

Na Canvas pluginu za Patient Consent Signing (elektronsko potpisivanje dokumenata), skill je pronašao **171 grešku** — uključujući indekse koji više ne postoje jer ih je drugi cron job obrisao.

## Kako koristiti?

Najbolji pristup: ne objašnjavajte mu ništa previše. Samo mu ugurajte logove (pipe-ujte preko CLI-a ili zalepite u XML tagove) i pustite ga da radi. Skill ima i "Red Flags" sekciju koja ga sprečava da racionalizuje i vrti se u krug umesto da reši problem.

📎 Repo: [obra/superpowers](https://github.com/obra/superpowers)

*Iz Weekly Show & Tell — 2. april 2026.*
