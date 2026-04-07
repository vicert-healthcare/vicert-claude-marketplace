---
title: "Pogledati video za ovaj MCP, nisam ga jos probao, ali dekuje kao veoma..."
author: "Igor Stojanovic"
date: "2025-10-15"
tags: ["mcp", "agents", "video"]
type: post
url: "https://browsertools.agentdesk.ai/installation"
---

Pogledati video za ovaj MCP, nisam ga jos probao, ali dekuje kao veoma koristan alat za web dev
https://browsertools.agentdesk.ai/installation
BrowserTools gives AI code editors and agents the ability to monitor and interact with your web browser.

---

**Reply from Nebojsa Lazic:**
Po mom iskustvu - za razliku od “generalnog” SW developmenta - kada je u pitanju front end development, npr. u React-u, vibe coding je totalno prihvatljiv nacan rada. Mi smo napravili nekoliko React frontend-ova i **nikada** nisam ni otvorio code te React applikacije da vidim kako radi ili da nesto promenim. Prosto kazem LLM-u sta ta uradi, on promeni code, i ja u browseru vidim da li sam dobio sta sam hteo ili. Testovi, validacije - sve je to lepo, ali u sustini za frontend me ne zanima da gubim vreme na to - vidim odmah u browseru jel radi ili ne. React je postao toliko komplikovan, narcoito sa raznim verzijama, da pokusavati da se shvati je postalo bespotrebno trosenje vremena - LLMs to rade daleko bolje i treba ih pustiti.
U tom kontektsu - ovakvi MCPs su super useful jer daju Claude-u (ili cemu vec) dodatne tools da dodju do najboljeg resenja.

**Reply from Nebojsa Lazic:**
A sto se tice testiranja - mi smo na Arine-u koristili Claude da napravi E2E testove koristeci Playwright - i on napravi click by click scenarios, koje mozes da pustis i dobijes report sta na frontend-u radi a sta ne - sa sve screenshots i video recordings.

**Reply from Igor Stojanovic:**
Da, playwright je odlican za testiranje i pomogao mi je u par navrata. Moram da probam i ovaj drugi, pa da izaberem koji mi vise lezi

**Reply from Nikola Stojanovic:**
&gt; Po mom iskustvu - za razliku od “generalnog” SW developmenta - kada je u pitanju front end development, npr. u React-u, vibe coding je totalno prihvatljiv nacan rada. Mi smo napravili nekoliko React frontend-ova i **nikada** nisam ni otvorio code te React applikacije da vidim kako radi ili da nesto promenim.
Moje iskustvo je totalno suprotno od ovoga, doduse sam neko ko ima light-background u react (radim ga on-off otkad se pojavio tamo 2014e ili kada vecj); pa mogu da uvidim kada agent produce subpar code. Ovo je jako cesto slucaj sa claude ukoliko skip-ujem planning mode i ne predjemo sve detaljno sta i kako treba da implementira.

Mislim da react nije dobar frontend alat za LLM-ove, jer ima *[jako puno footgun-ova](https://react.dev/learn/you-might-not-need-an-effect)* koje rado ispaljuje sebi u kolena i koje se na ovaj ili onaj nacin direktno isplivaju kroz UI/UX. Banalnog primera radi, ukoliko eksplicitno ne naglasim agentu da preferira [optimistic updates](https://react.dev/reference/react/useOptimistic) (gde ima smisla) on to uglavnom nece ni uraditi. 😐

ali u sustini, YMMV!

