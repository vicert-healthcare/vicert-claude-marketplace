---
title: "Sa ovim u vezi, par mini novina koje nam stizu u buducim verzijama claude..."
author: "Nikola Stojanovic"
date: "2026-01-26"
tags: ["claude", "plugins", "tools"]
type: post
url: "https://gist.github.com/kieranklaassen/4f2aba89594a4aea4ad64d753984b2ea"
---

Sa ovim u vezi, par mini novina koje nam stizu u buducim verzijama claude code 😄:
• deprecate ce custom slash /commands i promote ce svaku komandu u skill. Tako da, ukoliko ste pravili custom commands, to ce pocev od uskoro sve biti pod "skills" feature.
• stize novi feature koji je built on top of postojecih subagents + novog tool call-a (TeamTool). Feature ce se verovatno zvati [Claude Swarm](https://gist.github.com/kieranklaassen/4f2aba89594a4aea4ad64d753984b2ea), i pomocu njega mocicemo lakse da upravljamo sa vise subagents paralelno.
• Od uskoro hooks cemo moci set da budu async, tako da hook invocation nece "usporiti" claude code.
