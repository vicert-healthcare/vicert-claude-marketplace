---
title: Canvas Data Integration Infrastructure
author: Admir Ihtijarevic
date: "2026-01-08"
tags: [canvas, data-integration, llm, ocr, automation]
type: show-and-tell
---

The Canvas team presented the architectural foundation for automated medical document processing — a system designed to eliminate manual data entry for healthcare providers.

## System Architecture

The infrastructure follows Canvas's **event-driven model**:
- **Events** are emitted from the client side when actions occur (e.g., document upload)
- **Effects** are server-side reactions triggered by events (e.g., classify, extract, populate)
- The majority of functionality is implemented as **plugins**, maintaining modularity and allowing independent development and deployment

## Document Processing Pipeline

### Step 1: Document Upload & Classification
When a document is uploaded, it's sent to an **external LLM microservice** that:
- Classifies the document into predefined report types (lab reports, discharge summaries, imaging reports, etc.)
- Performs OCR to extract text content from scanned/faxed documents

### Step 2: Data Extraction
The LLM service parses extracted text to identify structured data points. Example: from a radiology report, it might extract "contrast 60 of Gadavist administered" and map it to the appropriate field.

### Step 3: Auto-Population with Confidence Scores
Extracted values are presented to the user alongside a **confidence score** from the LLM. This score indicates how certain the AI is about each extraction, giving clinicians the information they need to make quick verification decisions.

### Step 4: Human Review
No AI-extracted value directly modifies patient records. A healthcare professional must review and confirm each suggested value before it's committed — a critical safety requirement in medical software.

## Infrastructure Status

- Core event/effect pipeline: **Complete**
- Plugin integration framework: **Complete**
- Auto-population and patient linking: **Complete** (currently hardcoded for demo)
- LLM confidence score display: **Next iteration** (pending direct LLM service integration)

## Confidence Score Strategy

The team discussed realistic expectations:
- Initial confidence scores will likely be tied to **OCR quality** and template matching accuracy
- Target range: **92-98%** — High enough to be useful, low enough to acknowledge uncertainty
- 100% confidence would paradoxically require full manual verification, defeating the automation purpose
- The goal is to **pre-fill most fields correctly**, letting clinicians verify rather than enter from scratch

## Presentation Tips

The team recommended sending demo recordings with **voiceover narration** to clients, especially C-level executives. Visual demos with context are far more effective than written descriptions for conveying the value of AI-powered document processing.
