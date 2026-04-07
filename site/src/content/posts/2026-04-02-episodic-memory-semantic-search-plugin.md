---
title: "Episodic Memory — semantic search za prethodne konverzacije"
author: "Nikola Milev"
date: "2026-04-02"
tags: ["claude", "plugins", "mcp", "tools"]
type: show-and-tell
url: "https://github.com/obra/claude-mem"
---

Još jedan plugin od Jesse Vincenta (Obra) — **Episodic Memory** dodaje MCP server koji omogućava semantičku pretragu prethodnih Claude Code konverzacija.

## Kako radi?

Plugin instalira MCP server koji hendla search zahteve kroz istoriju konverzacija. Kad ga pozovete sa "Search Conversation", on:

1. Prolazi kroz **Claude memoriju** (memory.md)
2. Gleda **trenutno git stanje** (branch, uncommitted changes)
3. Pretražuje **prethodne sesije**
4. Proverava **projektnu dokumentaciju**

## Demo rezultat

Nikola je na novom branchu pitao "gde sam stao?" i plugin je tačno vratio:
- Na kom je branču
- Šta je poslednje radio (Enterprise Hardening)
- Koje izmene ima (uključujući nekomitovane)
- Relevantne memory zapise

Za ~70 fajlova u projektu, pretraga je bila brza i precizna.

⚠️ **Važno:** Memorija mora biti uključena u Claude Code-u — po defaultu je isključena. Proveriti settings i uključiti `autoMemoryEnabled: true`.

📎 Repo: [obra/claude-mem](https://github.com/obra/claude-mem)

*Iz Weekly Show & Tell — 2. april 2026.*
