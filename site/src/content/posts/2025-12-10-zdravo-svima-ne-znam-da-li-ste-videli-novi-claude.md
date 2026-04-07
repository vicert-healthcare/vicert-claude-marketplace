---
title: "Ne znam da li ste videli novi Claude Code feature modular rules."
author: "Mihailo Trisovic"
date: "2025-12-10"
tags: ["claude", "security", "testing", "api"]
type: post
url: "https://code.claude.com/docs/en/memory#modular-rules-with-claude%2Frules%2F"
---

Zdravo svima!
Ne znam da li ste videli novi Claude Code feature modular rules. Deluje baš zanimljivo.
U okviru `.claude/rules/` foldera možemo da razbijemo instrukcije u više fajlova (npr. `code-style.md`, `testing.md`, `security.md`) umesto da sve držimo u jednom velikom `CLAUDE.md` fajlu. Mislim da je ovo mnogo čistiji pristup, pogotovo za veće projekte i timove.
Isto zanimljivo je što svaki rule može da ima path-specific scoping pomoću YAML frontmatter-a. Primer:
```
---
paths: src/api/**/*.ts
---```
Ovo omogućava da se pravila primenjuju samo na određeni deo koda (npr. samo API, samo React komponente, samo testovi itd.), dok ostala pravila ostaju globalna.
Takođe, `.claude/rules/` podržava i subdirektorijume, globove, pa čak i symlink-ove za deljene standarde između više projekata.
User-level rules (u `~/.claude/rules/`) se takođe automatski učitavaju.
Sve u svemu, mnogo fleksibilnije i organizovanije nego ranije. Deluje kao odličan način da timovi jasno definišu određene delove pravila, umesto da sve stavljaju u jedan veliki `CLAUDE.md` . https://code.claude.com/docs/en/memory#modular-rules-with-claude%2Frules%2F
