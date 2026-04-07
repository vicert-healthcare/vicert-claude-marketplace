---
title: "Hot-take / unpopular-opinion: For writing tests, AI should be used sparingly..."
author: "Nikola Stojanovic"
date: "2025-06-26"
tags: ["agents", "security", "testing"]
type: post
---

hot-take / unpopular-opinion: For writing tests, AI should be used sparingly and with care. I believe this applies for all but the simplest of use cases.

Rationale: Tests are the final frontier between code which wrote and those who will further consume it. It's not uncommon to identify design holes / improvements to ergonomics / whatever-else while writing assertions for a system under test. Thus... delegating writing of tests to AI agents likely leads to a false sense of security and leads us in potentially shipping half-baked solutions, along with missing potential wins and improvements.
