---
title: "Struktura foldera za Claude Code plugine Dok sam cackao nesto oko CC..."
author: "Bojan Todorovic"
date: "2026-01-26"
tags: ["claude", "plugins"]
type: post
---

**Struktura foldera za Claude Code plugine**

Dok sam cackao nesto oko CC plugin-ova, primetio sam da mi je sa istim/slicnim promtom u 2 razlicita repo-a napravio plugin-e sa razlicitom strukturom foldera (primeri ispod).
Iako u samom funkcionisanju plugin-a nije bilo razlike, rekoh da vidim da li ima razlika u pristupu, pa da podelim da vas ne buni ako jos neko naleti na ovo.

 **Ukratko**: Ne postoji jedna obavezna šema. Claude Code podržava dve uobičajene strukture foldera za plugine:

 **Opcija 1: Komande kao fajlovi**
 plugin-name/
 ├── .claude-plugin/plugin.json
 └── commands/
   ├── my-command.md
   └── another-command.md

 **Opcija 2: Komande kao folderi** (ovo se i provlaci kroz dokumentaciju)
 plugin-name/
 ├── .claude-plugin/plugin.json
 ├── my-command/
 │  └── skill.md
 └── another-command/
      └── skill.md

 Oba pristupa rade. Jedini obavezan uslov je da postoji .claude-plugin/plugin.json fajl sa metapodacima.

 **Kada koristiti koji:**
 • **Opcija 1** - jednostavnija, dobra za većinu slučajeva kada su komande samostalni markdown fajlovi
 • **Opcija 2** - korisna kada komande zahtevaju dodatne resurse (šabloni, šeme, primeri fajlova) upakovane uz njih

 Ako krećete od nule, Opcija 1 je preporučeni izbor osim ako nemate specifičnu potrebu za dodatnim resursima.

---

**Reply from Igor Stojanovic:**
Ja sam pristalica uniformnosti, i msm da je bolje da se odmah krene od opcije 2, tako da se ne bih slozio sa tvojom preporukom.
Ne vidim benefit krenuti sa opcijom 1, pa dodavati folder, pa onda na projektu imamo mix opcije 1 i opcije 2. To donosi dodatni zbun i wtf momenat.

Opcija 2 je teren vec spreman za optimizaciju tipa, skontas da mozes da dodas cli ili template koji ce ti izgenerisati odredjeni kod, kako bi posao bio brze i optimalnije zavrsen.

**Reply from Bojan Todorovic:**
Nema sta, slazem se sa tobom.
Opcija 1 je tu ako kreces od nule i radis nesto jednostavnije (aka neces praviti brdo plugin-ova i to), ali za bilo sta kompleksinije (i brojnije pre svega), opcija 2 it is.

**Reply from Nikola Stojanovic:**
Sa ovim u vezi, par mini novina koje nam stizu u buducim verzijama claude code 😄:
• deprecate ce custom slash /commands i promote ce svaku komandu u skill. Tako da, ukoliko ste pravili custom commands, to ce pocev od uskoro sve biti pod "skills" feature.
• stize novi feature koji je built on top of postojecih subagents + novog tool call-a (TeamTool). Feature ce se verovatno zvati [Claude Swarm](https://gist.github.com/kieranklaassen/4f2aba89594a4aea4ad64d753984b2ea), i pomocu njega mocicemo lakse da upravljamo sa vise subagents paralelno.
• Od uskoro hooks cemo moci set da budu async, tako da hook invocation nece "usporiti" claude code.

