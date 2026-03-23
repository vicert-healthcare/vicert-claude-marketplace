# vicert-style

Format local documents (Word, PDF, presentations) to comply with Vicert's official brand guidelines as defined in Vicert_Template.dotx.

## Purpose

This plugin provides skills for generating and formatting local documents styled consistently with the Vicert brand identity -- ensuring correct fonts (Century Gothic), colors, heading hierarchy, page layout, table formatting, logo placement, and footer across all outputs.

## Install

```bash
/plugin install vicert-style@vicert-internal
```

## Skills

### brand-guide

Complete brand guidelines for local document formatting based on the official Vicert_Template.dotx. Covers:

- Typography (Century Gothic, heading sizes 52pt–22pt, colors per level)
- 6-color accent palette for charts, tables, and data visualization
- Page layout (US Letter, 1-inch margins)
- Table formatting (header backgrounds, alternating rows)
- Logo placement (PNG from template, always in document header)
- Footer with Vicert contact info

**Usage:**
```bash
/vicert-style:brand-guide
/vicert-style:brand-guide Word document
/vicert-style:brand-guide presentation formatting
```

Also auto-triggers when you ask Claude to create or format a Vicert-branded document.
