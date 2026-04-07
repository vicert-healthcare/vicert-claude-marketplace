---
title: "AutoDream i radna memorija u Claude Code — šta uključiti i zašto"
author: "Igor Stojanovic"
date: "2026-03-26"
tags: ["claude", "plugins", "tools"]
type: show-and-tell
url: "https://grain.com/share/recording/d6ed8abb-f1e9-4045-b83e-575db972d94a/ttIeV05Je0VQPnsQ8cnEkBbBTWpVm7MKnMlvpKYp"
---

Igor je na Show & Tell skrenuo pažnju na **AutoDream** opciju u Claude Code-u koja je po defaultu isključena, a može značajno poboljšati rad.

## Dva tipa memorije

1. **CLAUDE.md** — permanentna memorija (vaše ime, projekt setup, pravila koja se ne menjaju)
2. **Memory folder** — radna memorija koja se menja kako radite, podeljena u zasebne .md fajlove po temi

## Šta radi AutoDream?

Simulira kako ljudski mozak funkcioniše tokom sna — defragmentira memoriju:
- Skenira kod i prethodne konverzacije
- **Bitne informacije zapisuje** u radnu memoriju (memory folder)
- **Nebitne informacije briše** iz radne memorije
- Automatski organizuje memoriju u zasebne fajlove (user.md, project-state.md, itd.)

## Kako uključiti

U Claude Code settings-ima proverite:
- `autoMemory: true` ✅ (obično već uključeno)
- `autoDream: true` ❌ (obično isključeno — **treba ručno uključiti**)

## Zašto je bitno

Bez radne memorije, Claude nema referencu iz prethodnih sesija — ne pamti koji stil dugmeta treba da bude, gde ste stali sa radom, kakve konvencije koristite. Sa uključenim AutoDream, kako budete radili, memorija se build-uje i Claude postaje precizniji.

*Iz Weekly Show & Tell — 26. mart 2026.*
