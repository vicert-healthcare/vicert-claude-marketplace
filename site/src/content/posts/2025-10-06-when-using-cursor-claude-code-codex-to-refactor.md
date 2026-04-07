---
title: "When using Cursor / Claude Code / Codex to refactor code, I've found it..."
author: "Nikola Stojanovic"
date: "2025-10-06"
tags: ["claude", "cursor", "codex", "agents", "refactoring"]
type: news
---

When using Cursor / Claude Code / Codex to refactor code, I've found it super helpful to encode rules around copying and pasting code blocks.

As an arbitrary example: imagine an unwieldy 800-1k lines file which represents some sort of REST Service / React Component / SwiftUI View. Prompting the AI to refactor this file into more dedicated ones will (in my experience) yield that it introduces new files and *writes them from scratch*.

This is almost always something that you never want, as AI is known to introduce regressions to the original implantation. These regressions often lead to breaking existing functionality, or even hallucinating new changes which were not part of the original code.

Instead of letting the AI taking the driving seat and write the files from scratch, force it to copy parts of the existing code verbatim. This can be accomplish via reaching for CLI tools such as `cp`, `mv`, `sed`, `ed`, etc..

In this thread I'll leave what I like to add to each AGENT.md / CLAUDE.md and similar AI readme files.

note: sometimes agents ignore these rules and once again write files from scratch. If something like that happens, just interrupt it and tell it to consult the aforementioned agent readme file prior to initiating the refactor.

---

**Reply from Nikola Stojanovic:**
```## Refactoring Rules

When asked to move or refactor code:

**Do not regenerate, paraphrase, or rewrite code.**
Copy the exact code verbatim. 
Do not change names, signatures, or APIs. 
Do not introduce "optimizations" unless explicitly requested. 

**Use shell commands for mechanical edits.**
Always prefer `cp`, `mv`, `sed`, `ed`, `awk`, `ast-grep`, or similar tools. 
Avoid rewriting code by hand. 

**Examples**

**Copy a whole file:**
```bash
  cp src/Feature.swift Modules/FeatureCore/Feature.swift
```
**Copy by line range (verbatim):**

```bash
sed -n '100,150p' src/Feature.swift > Modules/FeatureCore/DoSomething.swift
```

**,Copy by AST match (requires ast-grep + jq):**

```bash
ast-grep -p 'function_decl(name: "doSomething")' src/Feature.swift --json \
  | jq -r '.[0].text' > Modules/FeatureCore/DoSomething.swift
```

**Delete the original lines:**

```bash
ed -s src/Feature.swift <<'ED'
100,150d
w
q
ED
```

---

Treat refactors as mechanical file operations, not creative rewrites.
Use CLI tools to copy/paste blocks.

---```

**Reply from Nebojsa Lazic:**
Great tip @Nikola Stojanovic ! Jedan nacin da se AI “natera” da postuje rules: napravi se sub-agent u claude code-u koji ima ove (i jos neke druge) rules u svojim instrukcijama. Onda kada trazis da uradi refactor direktno mu kazes da “use refactor-expert agent to…”. 


**Reply from Nikola Stojanovic:**
Sličan pristup imam 😃  s tim što ako ne napišem eksplicitno u promptu “create a specialized subtask for refactoring the file *which follows project conventions encoded in the CLAUDE.md file*”, 9/10 times subagent ponovo piše file od nule. Verovatno grešim negde, ali nisam previše ulazio u razlog zašto moram eksplicitno da mu skrećem pažnju svaki put.

**Reply from Nebojsa Lazic:**
Mozda bi vredelo guglati za tim agentima - ima ih gomila koji su production ready, i za to i za gomili drugih taskova.

**Reply from Nikola Stojanovic:**
Apsolutno se slažem. Ja ih dalje od sitnih refaktoring taskova i exploratory work nisam koristio, ali baciću oko baš ovih dana kako se sve mogu konfigurisati i kakvih production ready ima. 

**Reply from Nikola Stojanovic:**
malo sam bacio oko sinoc ([#1](https://github.com/wshobson/agents), [#2](https://github.com/VoltAgent/awesome-claude-code-subagents), [#3](https://github.com/davepoon/claude-code-subagents-collection)) i mogu ti reci da mi se ne svidja vecina ovoga sto vidim. Ovi predefinisani agenti dobrim delom su bas opinionated i imaju mnoge questionable odabire u smislu biblioteka. Eventualno bi ih koristio kao neki starting point pa ih pojedinacno ispravljao po potrebi, ali onda ne vidim ni sta tacno dobijem u poredjenju sa tim da sam napisao svoj neki od nule.

Ne iskljucujem to da mozda gledam/trazim na pogresnim mestima, ali ovo sto trenutno vidim mi je vise MEME-esque nego production ready. 😐 Takodje: veoma mi je upitno da li "you are an expert XYZ developer" ima bilo kakav uticaj na kvalitet response-a.

**Reply from Nebojsa Lazic:**
You are probably right - mislim da fora i jeste u tome da se naprave vrlo specificni agenti za konkretne projekte i biblioteke, a ovi mogu da sluze kao inspiracija.

