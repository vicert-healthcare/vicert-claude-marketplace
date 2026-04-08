---
title: Canvas LLM Document Integration
author: Admir Ihtijarevic
date: "2026-01-22"
tags: [canvas, llm, document-processing, loinc, infrastructure]
type: show-and-tell
---

Admir Ihtijarevič presented the infrastructure layer that makes AI-powered document processing possible in Canvas.

## Architecture Overview

The system is built on Canvas's event/effect model:
- **Events** are emitted from the client side (e.g., "document uploaded")
- **Effects** are reactions to events (e.g., "classify document", "extract values")
- Most functionality is designed as **plugins**, keeping the architecture modular

### Document Processing Flow

1. Document is uploaded to Canvas
2. Event triggers plugin to send document to an **external LLM microservice**
3. LLM classifies the document into predefined report types
4. OCR extracts text content
5. LLM parses extracted text into structured data
6. **Suggestive values** are presented to the user with confidence scores
7. Human reviews and confirms values before they modify patient records

## Suggestive Values Table

A new database table was created specifically for storing AI-proposed values:
- **Parsing template name** — Which template matched the document
- **Extracted values** — Iron levels, sugar levels, etc.
- **Confidence scores** — How certain the AI is about each extraction

### Why a New Table?

The client rejected using the existing audit model (designed exclusively for ONC scripting). A separate events table was created for data integration to maintain clean separation of concerns.

## LOINC Code Integration

Neb Lazic proposed a significant improvement: using **LOINC (Logical Observation Identifiers Names and Codes)** for mapping LLM-returned values to parsing templates. Instead of custom mappings, the LLM would return values tagged with standardized LOINC codes, enabling automatic field mapping across any parsing template. Admir agreed to experiment with this approach.

## Discussion

- The team identified a broader need for a **"knowledge manager" agent** to capture architectural decisions for projects where documentation is primarily "in people's heads"
- Current status: code polishing and edge case testing, with plans to integrate Extend AI for document processing demos
