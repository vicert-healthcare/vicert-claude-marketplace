---
title: Arena AI Code Generation Concept
author: Neb Lazic
date: "2025-12-18"
tags: [arena, code-generation, specification, cross-platform, mobile]
type: show-and-tell
---

A forward-looking discussion about specification-driven code generation for the Arena project, exploring whether AI could make cross-platform development languages obsolete.

## The Concept

Write **two separate native mobile applications** (iOS and Android) from a **single specification**, rather than using cross-platform frameworks like React Native or Flutter.

The fundamental shift: instead of describing **how** to implement features (imperative), describe **what** the system should do (declarative), including:
- Constraints and boundaries
- Expected behaviors and outcomes
- Edge cases and error handling
- UI/UX requirements per platform

## The Key Question

> When will we be able to trust LLMs as compilers?

Current compilers are **deterministic** — the same input always produces the same output. LLMs are **probabilistic** — the same prompt can produce different code each time.

### The "Original Sin of Computing"

Nikola Milev raised a fascinating philosophical point: C compilers are written in C, creating a recursive trust problem. Theoretically, backdoors could have been introduced in the hand-written compilers of the 1970s and propagated through every subsequent compiler. So the question becomes: do we trust non-deterministic LLMs more or less than potentially compromised deterministic compilers?

## Implications for Cross-Platform Development

If native apps can be generated from a single specification:
- **Cross-platform languages may become unnecessary** — No need for React Native, Flutter, or Kotlin Multiplatform
- **Apps don't need to be identical** — UI/UX can be adapted per platform while maintaining behavioral consistency
- **Team reduction** — Instead of separate iOS and Android teams, a single team writes and maintains the specification

## Proving Correctness

The team concluded that **test-driven development** is the likely answer. In specification-driven development:
1. Write the specification
2. Generate tests from the specification
3. Generate code from the specification
4. Run tests to verify the code matches the specification

This is essentially TDD applied at the architecture level — the specification replaces manual test writing, and AI generates both code and tests.

## Safety Concerns

Igor Stojanovic raised concerns about LLM-generated code for **life-critical systems** (medical devices, aviation, autonomous vehicles), referencing NASA's rulebook of ten rules for safety-critical software development. The consensus: a balance between human oversight and AI-generated code is essential, at least until verification methods mature.
