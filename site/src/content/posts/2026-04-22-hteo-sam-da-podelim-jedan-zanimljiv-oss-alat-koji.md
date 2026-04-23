---
title: "Hteo sam da podelim jedan zanimljiv OSS alat koji može biti relevantan za..."
author: "Dejan Radmanovic"
date: "2026-04-22"
tags: ["mcp", "security", "devops", "video", "demo"]
type: demo
url: "https://github.com/metatool-ai/metamcp"
---

Hteo sam da podelim jedan zanimljiv OSS alat koji može biti relevantan za MCP use case-ove koje sve češće viđamo kod klijenata:

[https://github.com/metatool-ai/metamcp](https://github.com/metatool-ai/metamcp)

Često nailazimo na problem oko security-ja i načina hostovanja MCP servera, dosta postojećih servera se vrti na third-party AWS instancama koje nisu pod našom kontrolom, što nije idealno za enterprise okruženja.

Primer: u IH-u postoji potreba za Testrail MCP serverom koji treba da bude dostupan svim zaposlenima. Umesto korišćenja eksterno hostovanog servera, oni razmatraju razvoj sopstvenog MCP servera za takve integracije.

Ako imamo 5–6 sličnih use case-ova, brzo dolazimo do problema upravljanja većim brojem MCP servera.

MetaMCP deluje kao zanimljiv pristup jer uvodi centralni sloj između klijenata i MCP servera:

agregira više MCP servera u jedan “unified” endpoint
funkcioniše kao proxy / middleware (routing + transformacije + filtering)
omogućava grupisanje servera i selekciju alata (namespaces)
daje jednu tačku pristupa umesto direktnog povezivanja na svaki server
otvara prostor za bolji control layer (auth, security, observability)

U suštini, može da posluži kao “gateway” za MCP ekosistem, posebno kada imamo više custom i third-party servera koje želimo da držimo pod kontrolom.

Edit: demo video: [https://m.youtube.com/watch?v=Cf6jVd2saAs](https://m.youtube.com/watch?v=Cf6jVd2saAs)
