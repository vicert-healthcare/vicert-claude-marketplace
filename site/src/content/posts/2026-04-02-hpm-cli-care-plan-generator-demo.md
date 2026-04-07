---
title: "HPM CLI — AI-driven care plan management za Included Health"
author: "Nikola Stojanovic"
date: "2026-04-02"
tags: ["healthcare-ai", "agents", "api", "demo", "tools"]
type: show-and-tell
url: "https://grain.com/share/recording/294ad503-bcb2-406d-999e-d3ca1ad8c099/ufHo9RAB9swauorBscb1UsSYjlEZq9KSZbCX8l6R"
---

Nikola Stojanovic je na Show & Tell demonstrirao **HPM CLI** — Go-based command line tool koji wrappuje GraphQL API za Included Health care plan domen, u kombinaciji sa Claude/Cursor skill-ovima.

## Šta radi?

CLI podržava kompletne CRUD operacije za care plan domen:
- Care planovi, pathways, objectives
- Member goals (demonstrirano uživo)
- Seedovanje podataka za development i testing

## Demo

Nikola je u Cursor-u napisao: `Add free care plan member goals to [member ID]` — agent je automatski:
1. Verifikovao token
2. Pozvao potrebne API-je da dobije ID-jeve
3. Kreirao 3 member goal-a
4. Rezultat vidljiv odmah na UI-u

Sve korake koje bi dev morao ručno (Apollo client, curl, seeding skripte) — agent odradi automatski.

## Šira vizija

Neb Lazic je predložio transformativni use case: **doktor opisuje care plan na običnom engleskom jeziku** → tool generiše strukturiran FHIR-kompatibilan care plan + PDF koji zadovoljava regulatorne zahteve.

> "Zamisli sistem u kome doktor napiše tri rečenice — šeta 10km dnevno, meri pritisak svake 3 sata, pije 2 Brufena, kontrola za 2 nedelje — i dobiješ ceo strukturiran care plan."

Ovo bi moglo da bude **Vicert capability demo** za bolnice i manje ordinacije kojima automatizacija dokumentacije štedi 7-15 minuta po pacijentu.

## Sledeći koraci

- Distribucija preko TNG (umesto build from source)
- Cloud agent za automatsku introspekkciju GraphQL API-ja (kad se API promeni, automatski updatuje komande)
- Demo za Included Health longitudinal care tim
- Potencijalni standalone produkt za šire healthcare tržište

*Iz Weekly Show & Tell — 2. april 2026.*
