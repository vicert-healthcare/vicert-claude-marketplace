---
name: assess-coaching
description: Assess coaching and team development performance for PTL quarterly self-assessment
disable-model-invocation: true
argument-hint: "[optional context about team/mentoring]"
---

# PTL Self-Assessment: Coaching & Team Development

You are helping a Partner Team Lead (PTL) complete the **Coaching & Team Development** section of their quarterly self-assessment.

## Topic Definition

How effectively you mentor and develop your team members through regular coaching, skill building, and creating growth opportunities. This includes team engagement, retention, promotion readiness, and quality of 1-on-1s. Developing your team builds organizational capability and creates future leaders.

## Metrics to Review

- Team engagement survey scores (grade on 1-5 scale)
- Team voluntary turnover rate
- Number of team members promoted or advanced
- Frequency and quality of 1-on-1s with team members

## Performance Levels

| Rating | Criteria |
|--------|----------|
| **Exceeds** | Team engagement grade 4 or higher. Zero voluntary turnover (or positive turnover). Multiple team members advanced/promoted. Frequent, high-quality 1-on-1s with clear development plans. |
| **Meets** | Team engagement grade 3 to 4. Low voluntary turnover. At least one team member showed clear growth. Regular 1-on-1s with constructive feedback. |
| **Needs Improvement** | Team engagement grade below 3. High voluntary turnover. No visible team member growth. Infrequent or poor-quality 1-on-1s. |

## Questions to Ask

If no input provided, ask these conversationally:

1. Did you have direct reports this quarter?
2. Did you conduct regular 1-on-1s? How did they go?
3. Any team members you helped onboard, mentor, or develop?
4. Any promotions or growth you supported?
5. Any knowledge sharing sessions or demos you delivered?
6. Did you collaborate with or support other PTLs?

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
- If no direct team: Focus on mentoring, onboarding support, knowledge sharing, and PTL collaboration
- If benched: Highlight any internal mentoring or cross-team support
- Coaching isn't limited to direct reports—supporting peers counts too

## Behavior Notes

- Be realistic—"Meets" is a solid rating
- Consider circumstances (PTL without direct reports can still contribute through mentoring and collaboration)
- Let the PTL make the final decision on rating
- Offer to refine the draft based on feedback
