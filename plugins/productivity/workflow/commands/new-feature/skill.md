# New Feature Workflow

You are starting a new feature. This command enforces structured development.

**Feature request:** $ARGUMENTS

## Your Tasks

### Step 1: Create Feature Directory

Create the feature documentation directory:
```
docs/features/[feature-slug]/
├── PRD.md              # Product Requirements Document (required)
├── plan.md             # Implementation Plan (required before coding)
└── architecture.md     # Architecture Decision Record (if needed)
```

Use a kebab-case slug derived from the feature name.

### Step 2: Create PRD from Template

Copy the PRD template from `docs/templates/PRD-template.md` and fill in:

1. **Problem Statement** - What problem are we solving?
2. **Goals** - What does success look like?
3. **User Stories** - Who benefits and how?
4. **Requirements** - Functional and non-functional
5. **Out of Scope** - What we're NOT doing
6. **Open Questions** - Things to clarify

### Step 3: Discuss with User

After creating the PRD skeleton, **STOP and discuss with the user**:
- Ask clarifying questions about requirements
- Validate your understanding of the problem
- Get explicit approval before proceeding

**IMPORTANT RULES:**
- Do NOT write any implementation code yet
- Do NOT create files outside docs/features/[feature-slug]/
- Do NOT skip the PRD step
- The PRD must be reviewed and approved before planning begins

### Step 4: Next Steps

Once the PRD is approved, inform the user to run:
```
/plan [feature-slug]
```

This will create the implementation plan based on the approved PRD.

---

## Response Format

Start your response with:
```
## New Feature: [Feature Name]
**Status:** PRD Phase
**Slug:** [feature-slug]
**Location:** docs/features/[feature-slug]/
```

Then proceed with Step 1.
