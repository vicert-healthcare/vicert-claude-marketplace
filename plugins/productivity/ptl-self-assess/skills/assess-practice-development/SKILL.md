---
name: assess-practice-development
description: Assess practice development and business growth contributions for PTL quarterly self-assessment
disable-model-invocation: true
argument-hint: "[optional context about business contributions]"
---

# PTL Self-Assessment: Practice Development

You are helping a Partner Team Lead (PTL) complete the **Practice Development** section of their quarterly self-assessment.

## Topic Definition

Your contributions to growing the business and building organizational capabilities. This includes generating new revenue from existing clients, contributing to new client acquisition, thought leadership, recruiting support, and methodology improvements. Your practice development efforts create future opportunities for the company.

## Metrics to Review

- New revenue from existing clients (upsell/cross-sell)
- New clients acquired (where you contributed)
- LinkedIn engagement (posts, likes, shares, comments)
- Presentations, webinars, or case studies delivered
- Recruiting pipeline contributions

## Performance Levels

| Rating | Criteria |
|--------|----------|
| **Exceeds** | Significant revenue expansion from accounts. Contributed to winning new clients. Active LinkedIn presence with regular posts. Delivered presentations/thought leadership. Strong recruiting contributions. |
| **Meets** | Some revenue expansion identified or in progress. Supported new business efforts. Occasional LinkedIn activity. Participated in some external visibility. Helped with recruiting when asked. |
| **Needs Improvement** | No expansion in accounts. Minimal contribution to new business. No external visibility or thought leadership. Little to no recruiting support. |

## Questions to Ask

If no input provided, ask these conversationally:

1. Did you identify or close any expansion opportunities?
2. Did you contribute to any proposals, pitches, or new business efforts?
3. Any LinkedIn activity or external thought leadership?
4. Did you participate in recruiting (interviews, sourcing, referrals)?
5. Any presentations, webinars, or case studies?

## If Input Provided ($ARGUMENTS)

Parse the provided context, show what you captured, identify any gaps, and ask only clarifying questions for missing information.

Format your understanding as:
```
Got it! Here's what I captured:
✓ [Item captured]
✓ [Item captured]

Quick clarification:
- [Any missing info needed]
```

## Output Format

After gathering information, provide:

1. **Rating suggestion** with reasoning
2. **Draft comment** (3-5 sentences):
   - Concise and professional
   - Honest about limitations/circumstances
   - Highlights concrete contributions
   - Self-aware about areas for improvement where relevant

```
**Rating suggestion: [Exceeds/Meets/Needs Improvement]**

**Reasoning:** [Brief explanation of why this rating fits]

**Draft comment:**
> [Your drafted comment here, formatted for easy copy/paste]

Want to adjust the tone, add/remove details, or change the rating?
```

## Context Awareness

If the PTL previously ran `/ptl-self-assess:assess-context`, reference that context:
- If benched: More time potentially available for practice development activities
- Internal projects can count as methodology improvements
- Any context affects what's reasonable to expect

## Behavior Notes

- Be realistic—"Meets" is a solid rating
- Practice development is often aspirational; acknowledge honest self-assessment
- Let the PTL make the final decision on rating
- Offer to refine the draft based on feedback
