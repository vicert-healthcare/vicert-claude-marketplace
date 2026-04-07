---
title: "As promised yesterday, here are my impressions on systematic-debugging skill..."
author: "Nikola Milev"
date: "2026-04-03"
tags: ["claude", "mcp", "llm", "plugins", "api"]
type: post
url: "https://github.com/obra/superpowers/tree/main/skills/systematic-debugging"
---

As promised yesterday, here are my impressions on `systematic-debugging` skill and `episodic-memory` plugin:
• [systematic-debugging:](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) part of the obra/superpowers plugin(available on the official Claude Plugins Marketplace) - non-eager, multistep, workflow-like skill that traces error back through code and makes hypothesis about what LLM "thinks" it's the root cause of the error you have passed/described. Proposes a solution based on the hypothesis and asks for your approval before jumping the gun. In my experience, extremely useful and rarely non-accurate. 10/10 recommend
• [episodic-memory](https://github.com/obra/episodic-memory): same author as `superpowers` but overlooked for now(I really don't know why) - provides you with an episodic memory of your sessions w/ claude-code. Behind the scenes exposes MCP for semantic search of your conversations with claude. Upon installation it indexes all of the past conversations and per-project memory as well as claude's own memory(**given that it is enabled**) and embeds it using local vector embeddings(see [Transformer.js](https://huggingface.co/docs/transformers.js/en/index)). You ran run `sync` command(within this plugin) as much as you see fit since `sync` is atomic and idempotent. All of the embedding and search is **fully local** and only summarisation hits LLM API call; if you don't want some conversation to be processed by this plugin start it with `DO NOT INDEX THIS CHAT`.
Try the latter one and share your thoughts in this thread(if you want to :slightly*smiling*face:)
Happy prompting!

---

**Reply from Nikola Milev:**
Also, I would recommend following [obra](https://github.com/obra) on GitHub, he is doing some very interesting stuff tbh

**Reply from Nikola Milev:**
@Claude what do you think about obra?

