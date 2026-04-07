---
title: "Izvinite na kasnom odgovoru."
author: "Mihailo Trisovic"
date: "2026-02-09"
tags: ["claude", "mcp", "api"]
type: post
url: "https://files.slack.com/files-pri/T02G04X64-F0ADX9GUZGS/api-documentation.html"
---

Zdravo svima, izvinite na kasnom odgovoru.
Prošle nedelje smo uradili jednu zanimljivu stvar na Arine-u koja bi potencijalno mogla da se automatizuje.
Dobili smo od klijenta Figma dizajn i PRD, ali naš deo posla nije bio backend. Ipak, kako bismo ubrzali ceo proces, odlučili smo da klijentu isporučimo API dokumentaciju, na osnovu koje bismo mi mogli da radimo frontend, a ujedno bismo njima olakšali i ubrzali backend dizajn.
To smo uradili na jako zanimljiv način, koristeći Claude i Figma MCP. Kroz promptovanje u Claude Code-u vodili smo ga da čita podatke iz Figma fajla, razume flow, uporedi ga sa PRD-jem i na osnovu toga generiše API dokumentaciju.
Na taj način smo proces koji bi inače trajao dosta dugo završili za jedan dan. Evo outputa ispod, pa bacite pogled.
Dalje planiramo da iz svega ovoga (API docs, Figma, PRD) automatski generišemo kompletan kontekst za Claude Code - pravila, uputstva, strukturu feature-a i taskova, praktično sve što mu je potrebno da što efikasnije radi na projektu.
Ideja je da, umesto gomile razbacanih stvari, imamo jedno mesto sa svim bitnim informacijama koje Claude može da koristi kao polaznu tačku - da razume flow, biznis pravila i šta tačno treba da se uradi.
Na taj način bismo značajno smanjili potrebu za dodatnim promptovanjem i ubrzali development, posebno u ranim fazama projekta.
Kada budemo radili na tom delu, videćemo da li tu može da se napravi neka automatizacija ili agentizacija procesa, kako bismo isto mogli da koristimo i na drugim projektima.

*[Shared HTML: api-documentation.html]*
