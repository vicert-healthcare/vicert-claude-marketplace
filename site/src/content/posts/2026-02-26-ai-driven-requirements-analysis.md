---
title: AI-Driven Requirements Analysis
author: Admir Ihtijarevic
date: "2026-02-26"
tags: [requirements, business-analysis, canvas, ai-workflow, documentation]
type: show-and-tell
---

Admir Ihtijarevič demonstrated a powerful workflow for transforming poorly defined plugin requirements into comprehensive specification documents using Claude as a business analyst.

## The Problem

The Canvas team faces a persistent challenge: plugin requirements from the GTM team are often poorly described, with little detail and unclear vision. AI tools haven't solved this fundamental problem — there's still a bottleneck in precisely defining what needs to be built.

## Admir's Approach

Using Claude configured as a **senior business analyst** and **solution architect**, Admir runs an interactive interview process:

1. **Context Setting** — Claude analyzes existing implementations (e.g., Zoomin Chart) and searches for relevant information (e.g., Doxy.me integration details)
2. **Interactive Interview** — Claude asks targeted questions, Admir provides recommended or sensible answers
3. **UX Pattern Proposals** — Claude suggests UX patterns, Admir confirms the desired approach
4. **Document Generation** — Before any implementation begins, Claude generates an HTML presentation document

## The Output Document

The HTML document contains:
- **Full context** of the plugin requirements
- **Answered questions** with rationale
- **Open questions** that must be resolved with the client before implementation
- **Mermaid diagrams** for validating business flows visually
- **Identified irrelevant requirements** — saving development and testing time

The prompt defines Claude as a senior business analyst and solution architect, ensuring the output covers both business and technical dimensions.

## Strategic Value

Neb Lazic framed this as Vicert's potential **"secret sauce"**:

> "Vicert's key contribution to the client is in creating detailed requirements documents — identifying questions, answering known ones, and posing unknown ones to the client."

The document can serve as:
- Input for Claude Code to implement plugins and generate tests
- A basis for "spec kit" driven development where AI generates plans, tasks, and code
- A quality gate that prevents building the wrong thing

## Practical Tips

- Install **Markdown Preview Enhanced** plugin for rendering Markdown and Mermaid diagrams
- Treat Claude as a **colleague or junior assistant** you have a dialogue with, not just a tool
- The document approach works best when stopping Claude before implementation — generate the spec first, validate with stakeholders, then implement
