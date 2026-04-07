---
title: "Nesto novo od Cursor-a: Obzirom da trenutno i ja radimo na nekom internom..."
author: "Bojan Todorovic"
date: "2025-07-28"
tags: ["cursor", "agents"]
type: post
url: "https://cursor.com/blog/bugbot-out-of-beta"
---

Nesto novo od Cursor-a: https://cursor.com/blog/bugbot-out-of-beta

Obzirom da trenutno @Maja Bogdanovic i ja radimo na nekom internom projektu iskljucivo putem Cursor-a, bice zanimljivo videti kako Cursos "proverava sam sebe" 😄
Svakako planiramo da istrazimo ovog code review agent-a i podelicemo kako i sta budemo otkrivali.

---

**Reply from Iva Lucic:**
Included je skoro ovo ukljucio na pull requestovima, doduse ne znam da li je po automatizmu na svim repozitorijumima, i deluje mi da moze dobro da uhvati stvari, meni je nasao jedan 🐞 😅

**Reply from Igor Stojanovic:**
Dobar je, ali nije savrsen :slightly*smiling*face:
• Ne nalazi i ne prijavljuje sve od jednom, nego nadje recimo 2 problema, ja ih fixnem, a on nadje ponovo neki novi.
• Ne snalazi se najbolje sa callbacima. Ako sam izvrsio neku proveru u jednoj metodi i vratio callback u drugoj, ponovo ce mi reci da mi fali ista ta provera koja je vec uradjena. 
Tako da, koristite ga oprezno i znajte da i on gresi 😄

**Reply from Bojan Todorovic:**
Polako, tek je izasao iz beta faze 😄

**Reply from Igor Stojanovic:**
ma... kad sam rekao da ga koristite oprezno, mislio sam da ne aktivirate svoj OCD da Bugbot status mora biti zelen, pa da ne potrosite 8h na ping-pong sa njim 😄

**Reply from Nebojsa Lazic:**
Cool!

**Reply from Nebojsa Lazic:**
Checkout [Claude Code GitHub actions](https://docs.anthropic.com/en/docs/claude-code/github-actions) as well.

On moze da uzme ceo issue sa GitHub-a, implementira ga, napravi PR i uradi PR code review - u pozadini, dok covek radi nesto drugo. Onda covek samo dodje, proveri i merge-uje PR.

**Reply from Igor Stojanovic:**
ce setapujem Claude na licnom kompu i ce ga isprobam za vikend

