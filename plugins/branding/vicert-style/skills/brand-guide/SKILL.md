---
name: brand-guide
description: >
  Vicert's brand guidelines for formatting local documents — Word (.docx), PDF, and presentations.
  Covers fonts, heading styles, colors, page layout, table formatting, and logo placement as defined
  in the official Vicert_Template.dotx. Use this skill whenever you need to create or format a Word
  document, PDF, presentation, or any local file that should follow Vicert brand standards. Triggers
  when the user asks about Vicert brand colors, fonts, typography, formatting guidelines, brand
  standards, style guide, document templates, or when creating Word, PDF, or presentation files that
  need Vicert branding. Also trigger when asked to "make it look like Vicert", "use Vicert branding",
  "apply brand styles", "format this as a Vicert document", "Vicert colors", "Vicert fonts",
  "brand-compliant", or similar brand-consistency requests. If in doubt whether this skill applies —
  it probably does whenever Vicert's visual identity matters in a local document.
argument-hint: "[document-type or question]"
---

# Vicert Brand Guidelines — Local Documents

All formatting specifications below are extracted from the official **Vicert_Template.dotx** and must be applied to every branded local document (Word, PDF, presentations).

---

## Logo

The official Vicert logo is at: `${CLAUDE_PLUGIN_ROOT}/references/vicert-logo.png`

It is a 630x172 pixel PNG (~3.7:1 aspect ratio) containing the Vicert icon (cyan concentric curves) and "VICERT" wordmark.

**Always include the Vicert logo** in every branded document. Place it in the document header (top-right, anchored to the column, as defined in the template).

| Context | Placement | Recommended Width |
|---|---|---|
| Word document header | Top-right, anchored | ~1.3 inches (template default) |
| Word title page | Top-right or centered | 2.5–3.5 inches |
| Presentation title slide | Top-right or centered | 30–40% of slide width |
| Presentation content slides | Header or footer | 15–20% of slide width |
| PDF (from Word) | Same as Word header | ~1.3 inches |

For detailed logo rules (color contexts, restrictions, minimum size), read `${CLAUDE_PLUGIN_ROOT}/references/logo-usage.md`.

---

## Typography

**Default body font:** Century Gothic, 10pt, black

| Element | Font | Size | Color | Additional |
|---|---|---|---|---|
| Title | Century Gothic | 47pt | #4A86E8 (bright blue) | — |
| Subtitle | Arial | 27pt | #666666 (medium gray) | — |
| Heading 1 | Century Gothic | 36pt | Black (default) | Underlined |
| Heading 2 | Century Gothic | 29pt | Black (default) | — |
| Heading 3 | Century Gothic | 25pt | #434343 (dark gray) | — |
| Heading 4 | Century Gothic | 22pt | #666666 (medium gray) | — |
| Heading 5 | Century Gothic | 20pt | #666666 (medium gray) | — |
| Heading 6 | Century Gothic | 20pt | #666666 (medium gray) | Italic |
| Body / Normal | Century Gothic | 10pt | Black (default) | — |

**Heading spacing:**

| Element | Space Before | Space After | Line Spacing |
|---|---|---|---|
| Title | — | 3pt | Normal |
| Subtitle | — | 16pt | Normal |
| Heading 1 | 20pt | 6pt | 1.1 lines |
| Heading 2 | 18pt | 6pt | 1.1 lines |
| Heading 3 | 16pt | 4pt | Normal |
| Heading 4 | 14pt | 4pt | Normal |
| Heading 5 | 12pt | 4pt | Normal |
| Heading 6 | 12pt | 4pt | Normal |

All headings: keepNext=yes, keepLines=yes (no page breaks within headings).

**Alternative theme fonts:** Calibri (headings), Cambria (body) — available but Century Gothic is the default and preferred.

---

## Color Palette

### Functional Colors

| Purpose | Hex | Usage |
|---|---|---|
| Title text | #4A86E8 | Title style only |
| Heading 3 | #434343 | Dark gray for H3 |
| Heading 4–6 / Subtitle | #666666 | Medium gray |
| Body text | #000000 | Default black |
| Footer text | #808080 | Gray |

### Theme Accent Colors (for charts, tables, data visualization)

| Name | Hex | Usage |
|---|---|---|
| Accent 1 — Blue | #4F81BD | Charts, table headers, primary accent |
| Accent 2 — Red | #C0504D | Alerts, secondary emphasis |
| Accent 3 — Green | #9BBB59 | Success indicators, positive data |
| Accent 4 — Purple | #8064A2 | Tertiary accent |
| Accent 5 — Teal | #4BACC6 | Quaternary accent |
| Accent 6 — Orange | #F79646 | Highlights, callouts |

### Additional Theme Colors

| Slot | Hex | Usage |
|---|---|---|
| Dark 2 | #1F497D | Secondary dark |
| Light 2 | #EEECE1 | Subtle backgrounds, alternating table rows |
| Hyperlink | #0000FF | Link text |
| Followed Hyperlink | #800080 | Visited link text |

---

## Page Layout

| Property | Value |
|---|---|
| Page size | 8.5 x 11 inches (US Letter) |
| Top margin | 1 inch |
| Bottom margin | 1 inch |
| Left margin | 1 inch |
| Right margin | 1 inch |
| Header distance | 0.5 inches |
| Footer distance | 0.5 inches |
| Default tab stop | 0.5 inches |

---

## Table Formatting

| Property | Value |
|---|---|
| Header row background | Accent 1 (#4F81BD) with white text |
| Alternating row background | Light 2 (#EEECE1) for even rows |
| Cell padding (all sides) | 0.07 inches |
| Border style | Thin solid lines |

---

## Footer

The template footer contains:

```
Vicert     160 Spear Street     Suite 1000     San Francisco CA 94105     p: 415.495.7700     vicert.ai
```

Footer text: gray (#808080), 7pt. Page number right-aligned on a separate line.

---

## Applying the Brand by Document Type

### Word / DOCX

- Body font: Century Gothic 10pt
- Apply heading styles exactly per the typography tables above
- Use the 6 accent colors for charts, table headers, and data visualization
- Page setup: US Letter, 1-inch margins all sides
- Title color: #4A86E8; table header background: #4F81BD with white text
- **Include the Vicert logo** in the document header (top-right)
- **Include the footer** with Vicert contact info and page number

### PDF (from Word)

Follow the Word / DOCX rules above. Export to PDF preserving all formatting, embedded fonts, and the logo.

### Presentations

Use the same color palette and fonts:

- Title font: Century Gothic
- Body font: Century Gothic
- Title slide: Use #4A86E8 (title blue) for the title text, white or light background
- Content slides: Black text, white background, accent colors for highlights
- Data/chart slides: Use the 6 accent colors for multi-series data
- **Include the Vicert logo** on the title slide and optionally in content slide headers/footers

---

## Document Settings

| Setting | Value |
|---|---|
| Embed TrueType fonts | Yes |
| Compatibility mode | Word 2013 |
| Theme language | English (US) |

For the complete template specifications including all theme color slots, detailed heading spacing in twips, and table cell margins, read `${CLAUDE_PLUGIN_ROOT}/references/document-template-specs.md`.

---

## Reference Files

| File | Contents | When to Use |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/references/vicert-logo.png` | Official Vicert logo (PNG, 630x172) | Embed in every branded document header |
| `${CLAUDE_PLUGIN_ROOT}/references/logo-usage.md` | Logo placement rules, sizing, color contexts, restrictions | Detailed logo guidance |
| `${CLAUDE_PLUGIN_ROOT}/references/document-template-specs.md` | Full template specs: all theme colors, heading spacing in twips, table formatting, document settings | Deep reference when building templates |
