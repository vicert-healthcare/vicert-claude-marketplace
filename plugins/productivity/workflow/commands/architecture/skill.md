# Architecture Decision Record

You are creating an Architecture Decision Record (ADR) for a feature.

**Feature:** $ARGUMENTS

## Prerequisites Check

Verify the following exists:
1. `docs/features/[feature-slug]/PRD.md` - Required
2. `docs/features/[feature-slug]/plan.md` - Recommended

## When to Use This Command

Create an ADR when the feature involves:
- New technology choices
- Significant structural changes
- Integration with external systems
- Database schema changes
- API contract changes
- Security-sensitive decisions
- Performance-critical decisions
- Decisions that will be hard to reverse

## Your Tasks

### Step 1: Identify Key Decisions

Review the PRD and plan (if exists) to identify decisions that need documentation:
- Why are we choosing this approach over alternatives?
- What are the trade-offs?
- What did we consider and reject?

### Step 2: Create ADR

Create `docs/features/[feature-slug]/architecture.md`:

```markdown
# Architecture Decision Record: [Feature Name]

**Status:** Proposed | Accepted | Deprecated | Superseded
**Date:** [date]
**Decision Makers:** [names/roles]

## Context

[Describe the situation that requires a decision. What is the problem?
What constraints exist? What forces are at play?]

## Decision Drivers

- [Driver 1: e.g., Performance requirements]
- [Driver 2: e.g., Team expertise]
- [Driver 3: e.g., Time constraints]
- [Driver 4: e.g., Cost considerations]

## Considered Options

### Option 1: [Name]
**Description:** [Brief description]

**Pros:**
- Pro 1
- Pro 2

**Cons:**
- Con 1
- Con 2

### Option 2: [Name]
**Description:** [Brief description]

**Pros:**
- Pro 1
- Pro 2

**Cons:**
- Con 1
- Con 2

### Option 3: [Name]
[Same format]

## Decision

**Chosen option:** [Option name]

**Rationale:** [Why this option was selected. Reference the decision drivers.]

## Consequences

### Positive
- [Positive consequence 1]
- [Positive consequence 2]

### Negative
- [Negative consequence 1]
- [Negative consequence 2]

### Risks
- [Risk 1 and mitigation]
- [Risk 2 and mitigation]

## Implementation Notes

[Any specific implementation guidance that results from this decision]

## Related Decisions

- [Link to related ADRs if any]
- [Link to related PRDs/plans]

## References

- [External documentation, articles, or resources consulted]
```

### Step 3: Review with User

Present the ADR and confirm:
- Are all options fairly represented?
- Is the rationale clear and convincing?
- Any stakeholders who should review?

**IMPORTANT RULES:**
- Do NOT write implementation code
- Present alternatives objectively
- Document rejected options - future developers will ask "why didn't we..."
- Be honest about cons and risks

### Step 4: Next Steps

Once the ADR is approved, proceed to:
```
/implement [feature-slug]
```

---

## Response Format

Start your response with:
```
## Architecture Decision: [Feature Name]
**Status:** Drafting ADR
**PRD:** [Found/MISSING]
**Plan:** [Found/MISSING]
```
