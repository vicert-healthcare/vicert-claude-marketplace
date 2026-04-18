---
title: "Came across a really interesting blog post on setting up an AI-powered..."
author: "Dejan Radmanovic"
date: "2026-04-17"
tags: ["mcp", "security", "testing", "article", "tools"]
type: post
url: "https://0ut3r.space/2026/01/11/hexstrikeai-setup/"
---

Came across a really interesting blog post on setting up an AI-powered pentesting lab using HexStrike AI, Kali, and an MCP-based orchestrator:
https://0ut3r.space/2026/01/11/hexstrikeai-setup/

**TL;DR:** the author wires up HexStrike on a Kali VM, connects it to an AI assistant via MCP, and runs automated recon + vulnerability scanning against their own domain get the full pipeline, structured report and all that for about $0.04.


What really stands out is the implications.

This kind of tooling dramatically lowers the barrier to entry for offensive security. What used to require significant expertise and manual effort, reconnaissance, technology fingerprinting, vulnerability scanning, WAF detection, directory enumeration can now be orchestrated by **AI in minutes for pocket change.**
That's great for defenders doing legitimate testing, but it's equally available to **bad actors.** A black hat with zero deep expertise can now point a tool like this at a target, let the AI reason through an attack plan, chain multiple scanning tools together, and get a structured vulnerability report handed to them on a silver platter. At scale. For almost nothing.

The AI boom isn't just accelerating our development workflows, it's accelerating the other side too

Also for curious souls here is the MCP tooling:
https://github.com/0x4m4/hexstrike-ai
