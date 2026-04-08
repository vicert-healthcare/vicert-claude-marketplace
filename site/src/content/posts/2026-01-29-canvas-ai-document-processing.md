---
title: Canvas AI Document Processing
author: Milos Djakovic
date: "2026-01-29"
tags: [canvas, ai, document-processing, llm, confidence-score]
type: show-and-tell
---

Miloš Djaković demonstrated a Canvas plugin for AI-powered medical document processing that could fundamentally change how clinical data is handled.

## The Vision

Extend Canvas's SDK so that plugins can receive uploaded documents and use LLMs to automatically extract and populate structured fields — reducing hours of manual data entry for medical staff.

## Demo Walkthrough

The demo processed real-world medical document types:
- **Thyroid lab reports** — Extracting hormone levels, reference ranges, and test dates
- **Hospital discharge summaries** — Pulling diagnoses, medications, and follow-up instructions

For each extracted value, the system displays an **AI confidence score**, giving clinicians transparency into how certain the AI is about each data point.

### Key Design Decisions

- **Auto-assignment**: When no human reviewer is found, the system assigns "canvas bot" and logs it as "auto-assigned"
- **Abnormal value flagging**: Deliberately kept **manual rather than AI-driven**. Nikola Milev explained this is a critical safety decision — OCR errors could cause the AI to incorrectly flag or miss abnormal values, which in a medical context could be dangerous. While lookup tables for normal ranges exist, the risk of OCR-introduced errors makes automated flagging too risky
- **Template matching**: The algorithm for matching documents to parsing templates needs improvement to extract more templates or improve matching accuracy

## Performance Considerations

Igor Stojanovic asked about analysis time. Admir Ihtijarevič explained that processing latency isn't critical because:
- Documents arrive via **fax** and are analyzed before any user sees them
- The plugin specifically solves the **weekend backlog problem** — documents that pile up over weekends are pre-processed by Monday morning
- The goal is pre-population, not real-time analysis

## Discussion

The team explored the possibility of configuring the plugin for LLM-driven abnormal flagging as an option, but agreed that for the demo and initial release, manual flagging is the safer choice.
