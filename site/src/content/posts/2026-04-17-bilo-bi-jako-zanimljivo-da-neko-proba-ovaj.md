---
title: "Bilo bi jako zanimljivo da neko proba ovaj skillify skill."
author: "Nebojsa Lazic"
date: "2026-04-17"
tags: ["claude", "plugins", "tools"]
type: post
url: "https://github.com/Vesely/skills"
---

Bilo bi jako zanimljivo da neko proba ovaj `skillify` [skill](https://github.com/Vesely/skills). Navodno trebao bi da radi sledece:
`Say you just finished something you'll probably do again — deploying, reviewing a PR, setting up a project. You tell Claude "turn this into a skill," and Skillify looks through the session, extracts the workflow, asks a few follow-up questions, and generates a SKILL.md file you can reuse.`

***TL;DR:*** *`npx skills@latest add Vesely/skills/skillify` and then just use it **/skillify***

---

**Reply from Igor Stojanovic:**
Hmm, bilo bi dobro uporediti `skillify` output sa outputom koji napravi `skill-creator`
Nisam ga probao, ali bas me interesuje koja bi bila razlika ako se kaze i jednom i drugom da napravi skill iz trenutne konverzacije.
Ukoliko `skillify` ne radi evaluaciju, onda bi mozda trebalo proslediti `skillifyev` skill `skill-creatoru` da uradi evaluaciju i backmark.

**Reply from Nebojsa Lazic:**
pa eto…

**Reply from Igor Stojanovic:**
Well, evo da odgovorim
Uporedjujuci  [skillify](https://github.com/Vesely/skills/commit/49aa65357b23ab3df40c2133c4c32a68462c2847) SKILL.MD i prompt iz Claude Code source coda mogu da kazem da ne vidim razliku.
Dekuje da je lik samo uradio copy-paste claude code prompta u svoj skill

**Reply from Nebojsa Lazic:**
Da - ovaj covek negde i kaze da je uradio bas to: nasao skriveni prompt u claude code source-u kada je leak-ovao i preformulisao ga u skill - bas ovo sto si i ti nasao.
Hajde plese @Igor Stojanovic napravi kratak post kako se ovaj feature Claude-a koristi (ako moze out-of-the-box, bez ovog skill-a, to je jos bolje) - dakle, kako da konverzaciju pretvorim u re-usable skill.
Ali mislim bas kratak post - ne treba disertacija vec samo short guide how to do this.

**Reply from Igor Stojanovic:**
Vazi, danas sam bas prezauzet, ali cu za ponedeljak pripremiti fin post sa par korisnih saveta

