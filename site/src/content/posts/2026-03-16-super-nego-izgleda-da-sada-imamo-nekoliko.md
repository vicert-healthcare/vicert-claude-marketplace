---
title: "Super! Nego, izgleda da sada imamo nekoliko Vicertovih marketplaces sa..."
author: "Nebojsa Lazic"
date: "2026-03-16"
tags: ["plugins"]
type: post
---

Super! Nego, izgleda da sada imamo nekoliko Vicertovih marketplaces sa raznim plugins. @Bojan Todorovic ajd da nekako konsolidujemo sve ovo da znamo koje marketplaces imamo i za koje potrebe.
@Dejan Radmanovic Ajd napisi malo vise o ovome - sta je ovo, koja je bila motivacija, kako se koristi, odakle ovi skilovi…

---

**Reply from Dejan Radmanovic:**
**Vicert plugin marketplace** za **Claude Code** — mesto gde možemo organizovati, deliti i instalirati custom skills, agents, commands i ostale Claude Code plugin komponente.

**Motivacija**: Kako smo počeli da koristimo Claude Code više, svako je počeo da pravi svoje skills i commands lokalno. Problemi su bili:
• Stvari se nisu delile između timova, duplirali smo effort
• Nije bilo standardizovanog načina da se distribuiraju
• Imali smo više marketplace repoa koji nisu imali nikakav UI — kad bi repo narastao, ljudi bi se davili po GitHub folderima pokušavajući da nađu šta im treba
Ovaj repo rešava sve to — jedan repo, jedan katalog, pregledan web UI za browsing i pretragu, i laka instalacija.

**Kako se koristi:**
*1. Dodaj marketplace*
`/plugin marketplace add vicert-healthcare/vicert-claude-marketplace`
*2. Instaliraj bilo koji plugin (instalacione komande za svaki od njih mogu se dobiti kroz web-ui)*
`/plugin install git-sync@vicert-marketplace`

Web UI za browsing: https://vicert-healthcare.github.io/vicert-claude-marketplace/

Kroz web editor se mogu i dodavati novi plugini — korisnik popuni formu, autentikuje se preko GitHub OAuth, i automatski se otvori PR za review. Ne mora niko ručno da fork-uje repo ili da se snalazi po folder strukturi.

**Odakle plugini**: Plugini koji su trenutno u katalogu su AI-generisani i služe kao dummy podaci — da bi se testirao UI, editor, PR flow i celokupna infrastruktura. Ideja je da ih zamenimo pravim skillovima i komandama koje mi napravimo. Struktura prati oficijalni Claude Code plugin format (skills, agents, commands, hooks, MCP serveri) i sve ide kroz PR review pre nego što se merge-uje,

Imali bi neke maintainere koje bi odredili koji bi bili zaduzeni za ovaj repo

