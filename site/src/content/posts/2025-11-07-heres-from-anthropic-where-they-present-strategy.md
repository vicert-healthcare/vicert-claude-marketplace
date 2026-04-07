---
title: "Here's a decent read from Anthropic, where they present a strategy to..."
author: "Nikola Stojanovic"
date: "2025-11-07"
tags: ["mcp", "agents", "article", "tools"]
type: post
url: "https://www.anthropic.com/engineering/code-execution-with-mcp"
---

Here's a [decent read](https://www.anthropic.com/engineering/code-execution-with-mcp) from Anthropic, where they present a strategy to circumvent the cost associated with integrating MCP's into an agents workflow. This cost comes from tool descriptions of MCP's, as they consume an arbitrary amount of tokens from a context window. In this blog post Anthropic provides a workaround in the form of invoking MCP's from custom code execution environments.

Note: Anthropic discusses this topic in the abstract (without any working implementations). So far, I've only managed to dig up [one actual implementation](https://github.com/steipete/mcporter) of what they're talking about. Looking forward to trying this out in the coming days/weeks.

---

**Reply from Nikola Stojanovic:**
o ovome sam pricao na cigari kad smo bili @Dejan Radmanovic, saljem ovde da ne moram tebi pa posle copy paste ovde xD

**Reply from Nebojsa Lazic:**
I was also reading this. Ali nisam imao vremena da se udubljujem. Mozda [ovo moze da pomogne](https://medium.com/@meshuggah22/weve-been-using-mcp-wrong-how-anthropic-reduced-ai-agent-costs-by-98-7-7c102fc22589).

