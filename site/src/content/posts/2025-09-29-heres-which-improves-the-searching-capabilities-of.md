---
title: "Here's a useful tool which improves the searching capabilities of agentic..."
author: "Nikola Stojanovic"
date: "2025-09-29"
tags: ["claude", "cursor", "codex", "agents", "refactoring"]
type: post
url: "https://github.com/ast-grep/ast-grep"
---

Here's a [useful tool](https://github.com/ast-grep/ast-grep) which improves the searching capabilities of agentic tools such as Cursor / Claude / Codex, etc.

How it works, In a nutshell: The tool traverses the abstract syntax tree ~produced by the typescript compiler~, and lets one navigate the types via providing search patterns.

Usage:

• `npm install --global @ast-grep/cli`
• Instruct the agent to reach for this tool, when necessary, via an agents.md file.
This is especially useful for refactoring, where its often more convenient to follow type hints rather than arbitrary text symbols.

---

**Reply from Nebojsa Lazic:**
Zasto smo TypeScript? Meni se cini da moze da mnoge jezike?

**Reply from Nikola Stojanovic:**
hmm, sec... sad vidim da ima neki `--lang` arg koji prvi put vidim 👀  mene je ova recenica navela na to da je typescript only:

&gt; ast-grep's core is an algorithm to search and replace code based on abstract syntax tree produced by *tree-sitter*

**Reply from Nikola Stojanovic:**
koliko znam taj tree-sitter je neki typescript only alat?

**Reply from Nebojsa Lazic:**
Mislim da je on napisan u TS-i, ali AST imaju svi jezici - mislim da je vrlo applicable i na druge jezike

**Reply from Nikola Stojanovic:**
bas cu istraziti dalje pa javim! thanks for the callout sto se kaze! 😄 za Swift npr znam da ovo ne bi radilo, jedini nacin da dobijes uopste AST od Swift je preko [SwiftSyntax](https://github.com/swiftlang/swift-syntax) (sto ovo vidim da ne koristi)

**Reply from Nikola Stojanovic:**
e u pravu si skroz, moze ovo i sa mnogim drugim jezicima @Nebojsa Lazic. Moja greska!

**Reply from Nebojsa Lazic:**
Ono sto je meni zanmiljivo: kako da naucim Claude da koristi ovaj tool.

**Reply from Nikola Stojanovic:**
ja sam ga dodao u AGENT.md file uz objasnjenje kako da ga koristi

**Reply from Nikola Stojanovic:**
i vrlo rado ga koristi po potrebi

**Reply from Nebojsa Lazic:**
Baci ovde kako ti izgleda taj AGENT.md

**Reply from Nikola Stojanovic:**
nemam ga na ovom kompu 😐 na privatnom je

**Reply from Nikola Stojanovic:**
ali nista spec, bukvalno samo pojasnjenje kako se tool koristi

**Reply from Nikola Stojanovic:**
uz examples iz repo-a

**Reply from Nebojsa Lazic:**
ih… snaci ces se vec - baci nekako ovde da imamo u threadu

**Reply from Nikola Stojanovic:**
hmm, sec

**Reply from Nikola Stojanovic:**
Code Search and Analysis with ast-grep
**When to use ast-grep*
For advanced code searching and transformations during refactoring
When you need to find specific patterns across the codebase
For complex code analysis that goes beyond simple text search

**Usage examples*
```bash
# Find all TypeScript files importing from a specific module
ast-grep --pattern 'import.**from.**"$MODULE"' --lang ts

# Find all function definitions with a specific name
ast-grep --pattern 'function $NAME()' --lang ts

# Find and replace specific patterns across files
ast-grep --pattern 'oldPattern' --rewrite 'newPattern' --lang tsx
```

**ast-grep vs grep*
Use `grep` for simple text searches
Use `ast-grep` for AST (Abstract Syntax Tree) pattern matching when you need:
Structural code analysis
Type-aware searching
Complex pattern matching across code structures
Code transformations and refactoring***

**Reply from Nebojsa Lazic:**
Super - thanks!

**Reply from Nikola Stojanovic:**
ja sam ziveo u zabludi da je ovo samo za ts :stuck*out*tongue: ali modify samo za svoje okruzenje i tjt. np! 🍻

**Reply from Nebojsa Lazic:**
Imas neki link na kome pise ovo za Agents.md?

**Reply from Nikola Stojanovic:**
nisam siguran na sta tacno mislis? ovo je sa nekog dummy throwaway projekta Agents.md

**Reply from Nebojsa Lazic:**
Sorry - ovaj agents.md koji si stavio gore: jesi li ga ti pisao, ili si nasao negde sta treba da se ubaci u agent.s.md?

**Reply from Nikola Stojanovic:**
ja ga pisao, ne secam se da li uz pomoc GPT5 pa za Claude. Verovatno tako nekako, pa ga rucno menjao po potrebi

**Reply from Nebojsa Lazic:**
aha, kapiram - super. Thanks!

**Reply from Nebojsa Lazic:**
A ima i ovo: MCP server koji koristi ast-grep: https://github.com/ast-grep/ast-grep-mcp

**Reply from Nikola Stojanovic:**
meni claude bez problema poziva sam od sebe taj ast-grep (kada sam mu skrenuo paznju na to), tako da isk izbegao bi ubacivanje mcp-a za ovo

**Reply from Nikola Stojanovic:**
da ne bi pollute context dodatno 😬

**Reply from Nebojsa Lazic:**
Da, ima smisla - vrv si u pravu

**Reply from Nikola Stojanovic:**
verovatno ima smisla i dodati ga u allowlist, to sam probao ali nisam se nesto proslavio (i dalje mi trazi permisije da ga koristi na svakoj novoj sesiji)

**Reply from Nebojsa Lazic:**
Sta ti napise kad trazi permisije?

**Reply from Nikola Stojanovic:**
Nista ono standardno, Allow (ast-grep) for this edit. Allow(ast-grep) for all edits in this session.

**Reply from Nikola Stojanovic:**
taj fazon neki

**Reply from Nebojsa Lazic:**
pa samo mu dodas Allow permision (kroz `/permissions` komandu) na `Bash(ast-grep:*)`

**Reply from Nikola Stojanovic:**
thanks, probacu tako. ja sam rucno edit-ovao neki local settings.json file u .claude folderu.

