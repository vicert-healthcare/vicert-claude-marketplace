---
title: "Here's something AI related which I didn't see anyone discuss here before,..."
author: "Nikola Stojanovic"
date: "2025-08-27"
tags: ["claude", "cursor", "mcp", "llm", "tools"]
type: post
---

here's something AI related which I didn't see anyone discuss here before, so I'll just leave this here. The source is "trust me bro", because I forgot to save the links to articles which discuss this (sorry!):

1. **Context is king**. LLM's don't have infinite resources, they work inside of a context window... which represents its working memory. Our inputs and the LLM's response both take up space in this memory. As do system prompts (predefined safety rules, instructions on how to format responses), as do the runtimes of the tools that we use (think Cursor, Claude Code, Windsurf), and as does overly long chat history. I'm using memory here as an analogy to tokens. A token is what actually drives the context window and its the precious resources which if we use too many of, then the LLM's performance begins to degrade (they become slower, less precise and sometimes failing to reason fully). This all brings me to my second point...
2. **MCP's are not free**. Adding an MCP tool to your workflow consumes tokens from a given context window. This is on account of each tool being described inside of the context (the tools signature, its description etc), leading to the fact that adding one too many tools (or having tools with overly large amount of functions) can seriously degrade an LLM's performance. This leads to the point that we should most likely be intentional about which MCP tool we want to load, rather than dumping an arbitrary amount of them into a given context window.

