---
title: Canvas CMS-122 Diabetes Protocol
author: Veljko Rajkovic
date: "2025-12-18"
tags: [canvas, cms-122, diabetes, protocol, healthcare, claude-code]
type: show-and-tell
---

Veljko Rajkovic demonstrated work on the CMS-122 protocol — a clinical quality measure for diabetes care that directly impacts healthcare provider reimbursement.

## What is CMS-122?

CMS-122 is a **quality measure** that assesses how well healthcare providers manage their diabetic patients' blood sugar levels. It's used by CMS (Centers for Medicare & Medicaid Services) to evaluate care quality and determine reimbursement rates.

### Key Parameters

| Parameter | Description |
|-----------|-------------|
| **HbA1c** | Hemoglobin A1c — measures average blood sugar over 2-3 months |
| **GMI** | Glucose Management Indicator — alternative measure from CGM data |

### Target Population
- Patients aged **18-75 years**
- **Diagnosed with diabetes**
- At least **one physician visit per year**

### Exclusions
- Patients in severe health conditions (palliative care, hospice, etc.)

### Problematic Outcomes
- HbA1c **above 9%** — Indicates poor glycemic control
- **Missing HbA1c values** — Indicates lack of monitoring

## Demo Walkthrough

1. **Created a patient** in the system
2. **Added diabetes diagnosis** to the patient record
3. **Uploaded a lab report** with HbA1c value of 7%
4. Protocol status changed to **"active"** after all criteria were met
5. Demonstrated how the system tracks protocol compliance over time

## The Migration Challenge

This wasn't a new implementation — it was a **migration** from the client's existing version 6 implementation to the new plugin architecture, **rewriting to version 14** aligned with 2026 CMS criteria. The version jump required understanding both the old implementation's intent and the new criteria's requirements.

## Using AI as a Frontend Developer

Veljko, primarily a **frontend developer**, used Claude Code for backend development work on this protocol. His key insight: **understanding the task and breaking it into logical units** is more important than knowing the specific backend technology. Claude Code handled the technical implementation while Veljko focused on correctly interpreting the clinical requirements and ensuring the protocol logic was medically accurate.
