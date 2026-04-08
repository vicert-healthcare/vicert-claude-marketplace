---
title: Included Health Care Plan CLI
author: Nikola Stojanovic
date: "2026-01-15"
tags: [included-health, cli, golang, graphql, fhir, care-plans]
type: show-and-tell
---

Nikola Stojanović presented early development of a CLI tool for managing patient care plans at Included Health, with implications far beyond its initial scope.

## The Tool

A **Golang CLI** wrapping Included Health's GraphQL API, focused on care plan management:
- List care plans and their goals
- Complete individual steps in a care pathway
- Manipulate care plan data programmatically

Built with the **Cobra** library (standard for Go CLIs), the tool enables developers and care managers to interact with the application indirectly through Cursor or Claude rather than navigating complex UIs.

## Current Status

Early development stage — the command structure is in place but active API endpoints aren't yet available. The team is working with the API specification to build out commands.

## The FHIR Vision

Neb Lazic proposed a transformative direction: make the tool **FHIR-compatible**. This would mean:

- **Any EHR supporting FHIR** could be a target, not just Included Health's proprietary API
- A script could convert FHIR resources (care plans, conditions, goals) into **human-readable Markdown files**, enabling Claude to process and reason about clinical data effectively
- The tool could become a **universal demo** for hospitals and clinics, showcasing Vicert's capabilities in AI-enabled healthcare

### Potential Use Cases

| User | Use Case |
|------|----------|
| **Developers** | Seeding test data, validating API responses |
| **Care managers** | Formatting data into Word/Excel via Claude agents |
| **Clinicians** | Articulating care plans in natural language, with AI generating structured FHIR-compliant plans and PDF documents meeting regulatory requirements |

## Discussion

- **Marko Jovanovic** raised concerns about integration with US healthcare systems (Athena) and authorization for FHIR server access
- **Igor Stojanovic** suggested presenting the tool at Included Health's internal meeting on longitudinal care
- **Neb Lazic** advised presenting to higher management levels at Included Health for strategic impact
- Nikola asked about the legality of sharing internal documents; Neb clarified that sharing within Vicert (which has an NDA with the client) is permitted
