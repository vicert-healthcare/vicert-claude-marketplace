---
title: "Came across a really interesting blog post on setting up an AI-powered..."
author: "Dejan Radmanovic"
date: "2026-04-17"
tags: ["mcp", "security", "testing", "article", "tools"]
type: post
url: "https://0ut3r.space/2026/01/11/hexstrikeai-setup/"
---

Came across a really interesting blog post on setting up an AI-powered pentesting lab using HexStrike AI, Kali, and an MCP-based orchestrator:
https://0ut3r.space/2026/01/11/hexstrikeai-setup/

**TL;DR:** the author wires up HexStrike on a Kali VM, connects it to an AI assistant via MCP, and runs automated recon + vulnerability scanning against their own domain get the full pipeline, structured report and all that for about $0.04.


What really stands out is the implications.

This kind of tooling dramatically lowers the barrier to entry for offensive security. What used to require significant expertise and manual effort, reconnaissance, technology fingerprinting, vulnerability scanning, WAF detection, directory enumeration can now be orchestrated by **AI in minutes for pocket change.**
That's great for defenders doing legitimate testing, but it's equally available to **bad actors.** A black hat with zero deep expertise can now point a tool like this at a target, let the AI reason through an attack plan, chain multiple scanning tools together, and get a structured vulnerability report handed to them on a silver platter. At scale. For almost nothing.

The AI boom isn't just accelerating our development workflows, it's accelerating the other side too

Also for curious souls here is the MCP tooling:
https://github.com/0x4m4/hexstrike-ai

---

**Reply from Voja Lalich:**
@Dejan Radmanovic ccitam ovo shto si napisao u kontekstu Mythos-a - svi se brinu za rizik koji on donosi za financiske institucije ali nisam nigde video da iko spominje helatcare?! Implications of busting security in this area will be much deeper then any “bank robbery” …

Hajde napravi 1/2-pager kako bi ovo shto si napisao formulisao u oblliku Vicert-ove ponude recimo INH-u (ili Arine/Carenet/Canvas-u for that matter) pa da stavimo to na sto i klijentima a i novim prospektima.
cc: @Slobodan Dimic @Filip Jankovic

**Reply from Dejan Radmanovic:**
Nisam siguran da mi bas imamo najbolje ekspertize u cyber security sferi, ali mozda svakako mozemo da se "Doskolujemo" ili zaposlimo neke experte u tom smeru.

Svakako evo ga neki mini dokumentic mozda to @Filip Jankovic moze da iskoristi da prefolumirise da to vise izgleda pre kao neki sales pitch nego ovako mashed up post:

https://docs.google.com/document/d/13nOG9YPwcotO25F1T_6W-RBf7mfDwn-OtDv-mm4fE2U/edit?tab=t.0

**Reply from Voja Lalich:**
Hvala za brz turaroud @Dejan Radmanovic - ovo je zanimljiv dokument, svakako daje dobar overview of the risks and problems i stoga a **need** in the market i kako je to eskaliralo sa AI tools.

Stoji i da je ovo nov teren za nas … ali tu se negde krije i opportunity ako mozze da nadjemo neki presek nasheg rada u HIT-u i CyberSec-a.

Hajde uzmi na sebe da organizujesh neshto i porazgovaraj ti tu sa kolegama i koleginicama i vidi da li ima ko josh da je zainteresovan da uccestvuje u jednoj radnoj grupi. Vidite da li se rodi neka zanimljiva ideja and if so, podeli ovde i/ili na weekly shareing kada bude zgodno.

Ovo je uvek bio veliki teren za igru ali je sa AI-om to sada neka nova konfiguracija i veoma me zanima shta vi tu vidite i mislite i da li mozzete da nadjete neki konkretan, i legalan, ugao gde mi mozzemo da igramo?

How can we be sure that Mythos/others will not blow up our stuff?
How can we help INH, Arine , Carenet or Canvas - or a NewCo, make sure that their stuff is not taken apart?
Or, may be how can we make business attacking … give it a think ladies and gents.

