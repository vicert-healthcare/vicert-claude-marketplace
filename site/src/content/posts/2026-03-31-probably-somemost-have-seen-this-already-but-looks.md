---
title: "Probably some/most have seen this already, but looks like Anthropic..."
author: "Nikola Stojanovic"
date: "2026-03-31"
tags: ["claude", "tools"]
type: post
url: "https://github.com/chatgptprojects/claude-code/tree/642c7f944bbe5f7e57c05d756ab7fa7c9c5035cc"
---

probably some/most have seen this already, but looks like Anthropic mistakenly leaked the source code of their CLI via  source maps. for anyone interested, find the code [here](https://github.com/chatgptprojects/claude-code/tree/642c7f944bbe5f7e57c05d756ab7fa7c9c5035cc) (probably want to also clone that soon, until Anthropic takes it down with legal notices).

---

**Reply from Nikola Stojanovic:**
https://github.com/chatgptprojects/claude-code/blob/642c7f944bbe5f7e57c05d756ab7fa7c9c5035cc/src/constants/spinnerVerbs.ts#L16 😄

**Reply from Nikola Milev:**
predlazem jedno takmicenje: svako da napise koliko je ovih video do sad 😄

**Reply from Nikola Milev:**
ko ima najvise dobije API token sa $50 kredita 😄

**Reply from Nikola Stojanovic:**
From a cursory skim of the codebase I ran into a [function](https://github.com/chatgptprojects/claude-code/blob/642c7f944bbe5f7e57c05d756ab7fa7c9c5035cc/src/cli/print.ts#L976) which has/is:

• Arity 12, along with an options object with well over a dozen sub-properties. 
• 3160 lines long.
• Takes care of: signal handling (SIGINT), rate-limiting, the agent runloop, amazon auth, plugin installation, MCP lifecycle, switching between model, interrupt recovery and lots more.
Does Anthropic want to hire us (Vicert) to clean up some of this mess? To the benefit of both their code owners and agents alike. :slightly*smiling*face:

**Reply from Nikola Milev:**
Also, it looks like claude logs when you are being rude to him/it:
[process text prompt](https://github.com/chatgptprojects/clear-code/blob/642c7f944bbe5f7e57c05d756ab7fa7c9c5035cc/src/utils/processUserInput/processTextPrompt.ts#L59) &lt;- [negative patterns](https://github.com/chatgptprojects/clear-code/blob/642c7f944bbe5f7e57c05d756ab7fa7c9c5035cc/src/utils/userPromptKeywords.ts#L7)

**Reply from Bojan Todorovic:**
Ovo je sve manje i manje meme kako vreme odmice 😄 Sve se pise, sve se pamti!

