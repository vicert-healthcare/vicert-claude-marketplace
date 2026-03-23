# PTL Self-Assessment Plugin

Help Partner Team Leads (PTLs) complete their quarterly self-assessments with guided questions and AI-drafted comments.

## Overview

This plugin walks you through 6 assessment topics, asks relevant questions about your quarter, and drafts professional comments with rating suggestions (Exceeds/Meets/Needs Improvement).

## Commands

| Command | Purpose |
|---------|---------|
| `/ptl-self-assess:assess-context` | Set your quarterly context (run first, recommended) |
| `/ptl-self-assess:assess-profitability` | Assess profitability & delivery efficiency |
| `/ptl-self-assess:assess-client-satisfaction` | Assess client relationships & outcomes |
| `/ptl-self-assess:assess-coaching` | Assess team development & mentoring |
| `/ptl-self-assess:assess-practice-development` | Assess business growth contributions |
| `/ptl-self-assess:assess-citizenship` | Assess organizational collaboration |
| `/ptl-self-assess:assess-personal-growth` | Assess learning & development |

## Usage

### Recommended Flow

1. Start with `/ptl-self-assess:assess-context` to set your quarterly situation
2. Run each assessment command as needed
3. Review and adjust the drafted comments before submitting

### Interactive Mode

Just run the command without arguments:
```
/ptl-self-assess:assess-profitability
```
The plugin will ask you relevant questions one by one.

### Accelerated Mode

Provide context inline to skip some questions:
```
/ptl-self-assess:assess-profitability I supervised Canvas Core fixed-bid project, delivered on time, also built internal HR tool that saved costs
```
The plugin will parse your input and only ask clarifying questions.

## Output

Each assessment provides:
- **Rating suggestion** (Exceeds/Meets/Needs Improvement) with reasoning
- **Draft comment** (3-5 sentences) ready for copy/paste
- Option to refine tone, details, or rating

## Context Awareness

If you run `/ptl-self-assess:assess-context` first, subsequent commands will:
- Acknowledge your situation (benched, no direct team, etc.)
- Adjust expectations appropriately
- Frame comments honestly based on circumstances
