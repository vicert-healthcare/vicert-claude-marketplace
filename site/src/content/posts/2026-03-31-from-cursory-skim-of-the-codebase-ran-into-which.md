---
title: "From a cursory skim of the codebase I ran into a function which has/is: •..."
author: "Nikola Stojanovic"
date: "2026-03-31"
tags: ["claude", "mcp", "agents", "plugins", "tools"]
type: discussion
url: "https://github.com/chatgptprojects/claude-code/blob/642c7f944bbe5f7e57c05d756ab7fa7c9c5035cc/src/cli/print.ts#L976"
---

From a cursory skim of the codebase I ran into a [function](https://github.com/chatgptprojects/claude-code/blob/642c7f944bbe5f7e57c05d756ab7fa7c9c5035cc/src/cli/print.ts#L976) which has/is:

• Arity 12, along with an options object with well over a dozen sub-properties. 
• 3160 lines long.
• Takes care of: signal handling (SIGINT), rate-limiting, the agent runloop, amazon auth, plugin installation, MCP lifecycle, switching between model, interrupt recovery and lots more.
Does Anthropic want to hire us (Vicert) to clean up some of this mess? To the benefit of both their code owners and agents alike. :slightly*smiling*face:
