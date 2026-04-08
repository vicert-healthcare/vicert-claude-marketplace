---
title: Accessibility in Healthcare Apps
author: Nikola Milev
date: "2026-01-08"
tags: [accessibility, aria, voiceover, healthcare, ui-ux]
type: show-and-tell
---

A comprehensive presentation on why accessibility in healthcare applications matters — both ethically and commercially — with practical implementation experience.

## The Business Case

The numbers speak for themselves:
- **25% of the US and European population** has some form of disability
- That's **millions of potential users** and significant revenue
- **80% of users with disabilities abandon** applications they can't use
- For healthcare applications serving patients (not just clinicians), accessibility isn't optional — it's a fundamental requirement

## Types of Disability

Disability isn't always permanent:
- **Visual** — Blindness, low vision, color blindness
- **Auditory** — Deafness, hearing impairment
- **Motor** — Limited dexterity, tremors, paralysis
- **Temporary** — Broken arm, eye surgery recovery, situational (bright sunlight, noisy environment)

## The Technical Challenge

Native HTML elements (inputs, buttons, forms) have **built-in accessibility**. But modern applications built with React and other frameworks, using combinations of HTML and JavaScript, often **lose native accessibility**.

**ARIA (Accessibility Internet Rich Application)** tags bridge this gap:
- Declare that a `div` is actually a button
- Group related content so screen readers announce it as a unit
- Mark regions as live-updating so changes are announced
- Hide decorative elements from screen readers

## Practical Demo: VoiceOver Navigation

The demo revealed real-world challenges:

### Interrupted Reading
VoiceOver stops reading when users navigate quickly between fields — screen reader users who know what they're looking for jump ahead, but the reader needs time to complete each announcement.

### Designer vs. Accessibility Conflicts
Auto-dismissing banners create a conflict: designers want banners to disappear after a timeout, but **VoiceOver must finish reading the banner content first**. Users with visual impairments are accustomed to VoiceOver's behavior and expect content to persist until they've heard it.

### Focus Management
The presenter spent **2-2.5 days** resolving element focusing issues on the web — and even LLMs couldn't immediately help. Focus management is one of the hardest accessibility problems because it requires understanding the complete user flow.

### Platform Differences
- **Mobile platforms** (iOS, Android) have built-in design systems with accessibility support, making native development significantly easier
- **Web** requires manual implementation of everything — ARIA tags, focus management, keyboard navigation, screen reader optimization

## VoiceOver Quirks

- No pause/resume functionality — users can only mute, not pause and continue later
- "Button continue, label continue" redundancy — can be optimized to just "button continue" but requires extra development time and expertise
- "View more" content should be hidden from VoiceOver until expanded, then reading should continue naturally

## Positive Feedback

The team received positive accessibility feedback for **iOS and mobile components**, validating that native platform accessibility features work well when properly implemented.
