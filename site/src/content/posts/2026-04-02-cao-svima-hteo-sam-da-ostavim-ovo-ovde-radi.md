---
title: "Hteo sam da ostavim ovo ovde radi diskusije, na kontu onoga sto smo pricali..."
author: "Mihailo Trisovic"
date: "2026-04-02"
tags: ["claude", "plugins", "healthcare-ai", "demo"]
type: demo
url: "https://vicert-healthcare.github.io/vicert-claude-marketplace/"
---

Cao svima,
Hteo sam da ostavim ovo ovde radi diskusije, na kontu onoga sto smo pricali danas - da imamo neko mesto gde možemo da kačimo i gledamo stvari kao što smo videli na Show and Tell-u.
Imam jedan predlog, pa recite šta mislite.

Malo sam updateovao Vicert Marketplace - mozete da pogledate ovde https://vicert-healthcare.github.io/vicert-claude-marketplace/:
Design - Promenio sam na onaj koji sam pokazivao jedanput na Show and Tell-u, samo prilagodjen Vicert bojama (recite da li vam se svidja ako ne mozemo da promenimo).
Claude Code sekcija - Ideja je da postoji deo gde mozemo na jednom mestu videti novosti, official stvari, skup svih komandi itd. Konkretno sam dodao:
Changelog - kompletan changelog sa njihovog GitHub-a koji moze da se pretrazuje up-to-date sa njihovog repoa
Docs - za sad linkovi ka official docs, možemo se dogovoriti treba li tu nešto vise
Official Plugins - povlaci sve sa njihovog GitHub-a tako da smo uvek up-to-date
Cheat Sheet - ono sto je nekoliko vas kacilo na gen-ai, sve komande/shortcuts na jednom mestu

E sad, ono sto bih hteo da prodiskutujemo - da li mislite da bi mogli da ubacimo i neki vid bloga/feed-a gde bismo zapravo kacili sve ove stvari sa Show and Tell-a i generalno iz gen-ai? Mozda bi bilo preglednije i lakse za pretragu nego na slacku.
Recite sta mislite!

---

**Reply from Dejan Radmanovic:**
Ja licno nisam fan ovoliko minimalistickog dizajna, volim generalno minimalizam, ali prethodni dizajn mi je bio laksi za oci, neke boje isto deluju out of the place:

Mozda ne bi bilo lose da pitamo ai da napravi neki theming system.

**Reply from Dejan Radmanovic:**
Svidja mi se sto smo dodali official plugins, cheat sheet, i changelog, docs, za claude official marketplace,

Mozda isto ne bi lose da ubacimo globalni changelog, znam da imamo na nivou svakog plugina ali mozda ne bi bilo lose da imamo neki globalni za nas marketplace, da brzinski mozemo da bacimo pogled koji su pluginovi dodati a koji su promenjeni a koje smo uklonili

**Reply from Dejan Radmanovic:**
Da ne bi bilo lose da se ubaci neki newsletter/blog

**Reply from Dejan Radmanovic:**
ali racunajte da je to maintanance overhead a bit

**Reply from Milos Djakovic:**
Slažem se sa @Dejan Radmanovic oko teme, a glavni problem je kontrast koji je problematičan i za light i za dark varijantu.

Evo nekih primera:
• Za light temu kontrast između bele pozadine i crnih elemenata (naslovi, primarni tekst, ivice) je prevelik, slično i za dark temu gde je kontrast između tamne pozadine i belih elemenata isto prevelik.
• Nazivi sekcija (`MARKETPLACE`, `CLAUDE CODE`, `EXTERNAL`) i pomoćne labele kao `QUICK START` imaju premali kontrast i jedva se vide, i to važi za obe teme.
• Bedževi na karticama (npr. `SKILLS`) se na dark temi jedva razlikuju od pozadine.
• Plava boja (npr. `Submit Plugin` dugme) bi na dark temi trebalo da bude malo tamnija jer i ona previše iskače iz istog razloga.

