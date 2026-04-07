---
title: "Superpowers u praksi — Writing Plans + TDD za implementaciju feature-a"
author: "Igor Stojanovic"
date: "2026-03-26"
tags: ["claude", "plugins", "agents", "demo", "testing"]
type: show-and-tell
url: "https://grain.com/share/recording/d6ed8abb-f1e9-4045-b83e-575db972d94a/ttIeV05Je0VQPnsQ8cnEkBbBTWpVm7MKnMlvpKYp"
---

Igor Stojanović je demonstrirao kako koristi **Superpowers plugin** na Included Health projektu — od Figma dizajna do gotovog koda sa testovima.

## Writing Plans workflow

Prompt: `superpower writing plans, we need to implement this design [Figma link], find similar solution in [file], ask me when unsure`

Šta je Superpowers uradio:
1. **Automatski se povezao sa Figmom** — izvukao elemente, boje, font-family
2. **Pročitao prethodni kod** kao referencu
3. Prihvatio `by the way` korekciju bez prekidanja toka
4. **Postavio pitanje** gde mu nije bilo jasno (skip ili hardcode za nedostajući font?)
5. Napravio **plan u docs/superpowers-plans/** kao .md fajl
6. Pokrenuo **agent-driven execution** — sam odlučuje o broju agenata i tool-ovima
7. Jedan agent radi implementaciju, drugi radi **automatski review**
8. Na kraju: 4 komita, testovi prolaze, pita da li da pushuje branch

## Test-Driven Development workflow

Za biznis logiku, Igor koristi `superpower test-driven development`:
1. **Red faza** — piše testove koji ne prolaze
2. **Green faza** — implementira kod dok testovi ne prođu
3. Automatska **verifikacija** green testova
4. **Refactor faza** — čisti kod
5. Summary promena

## Auto Model Selection

Superpowers **sam menja modele** u zavisnosti od taska — statistika za 30 dana pokazuje Opus 4.6, Sonnet 4.6 i Sonnet 4.5 korišćene bez da je Igor ikada eksplicitno birao model.

## Preporuka

Koristiti **Writing Plans za UI** (iz Figma dizajna) i **TDD za biznis logiku** — sprečava halucinacije jer Claude radi po planu sa review-om, a ne "na slepo".

> Superpowers je sada dostupan u **Claude Official Plugin** store-u.

*Iz Weekly Show & Tell — 26. mart 2026.*
