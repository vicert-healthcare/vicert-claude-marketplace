---
title: "Canvas UI Consistency Skill — Claude plugins koji izgledaju kao deo platforme"
author: "Milos Djakovic"
date: "2026-03-26"
tags: ["claude", "plugins", "tools", "demo"]
type: show-and-tell
url: "https://grain.com/share/recording/d6ed8abb-f1e9-4045-b83e-575db972d94a/ttIeV05Je0VQPnsQ8cnEkBbBTWpVm7MKnMlvpKYp"
---

Miloš Đaković je na Show & Tell predstavio skill koji rešava čest problem: **Claude pravi UI za Canvas plugine koji izgleda potpuno drugačije od same platforme** — ljubičasta dugmad, pogrešni border-radiusi, nekonzistentne veličine inputa.

## Problem

Canvas plugini se renderuju u iFrame-ovima. Claude dobije slobodu i pusti mašti na volju — rezultat su paneli koji izgledaju kao potpuno druga aplikacija. Čak i sam Canvas UI nije 100% konzistentan (Semantic UI + CSS kaskadni override-ovi), što dodatno zbunjuje.

## Rešenje: Agent Skill sa design tokenima

Skill sadrži:
- **Design tokens** — tačne boje, veličine, spacing scale iz Canvas-a
- **Component templates** — toggle, checkbox, radio button, combo box, tabovi — "kopiraj verbatim" pristup
- **Base CSS** sa utility klasama
- **Clinical UX guidelines** — kada koristiti toggle vs checkbox, interakcije, accessibility
- **Workflow sa fazama** i checklist koji Claude prati korak po korak

## Rezultati (before/after)

- Togglei sad izgledaju kao Canvas togglei (pre: totalno drugačiji stil)
- Dugmad prate Canvas boje (plava za standardne akcije, zelena za finalne)
- Tabovi sa tamnom ivicom na aktivnom tabu
- Konzistentne veličine inputa i dugmadi u istom redu
- Nepotrebni "Save" dugmići uklonjeni gde toggle radi instant akciju

## Sledeći koraci

- Integrisati u **Vicert Plugin Assistant** (nadogradnja na Canvas Plugin Assistant)
- Podeliti skill na više manjih (UX prakse, UI komponente, templates)
- Kreirati native web komponente za kompleksnije elemente (combo box, dropdown)
- Postaviti kao Enterprise skill sa prioritetom nad ostalima

> "Ne pokazujte ovo Canvas-u. Ovo je naš interni alat koji nam omogućava da radimo bolji posao." — Neb Lazic

*Iz Weekly Show & Tell — 26. mart 2026.*
