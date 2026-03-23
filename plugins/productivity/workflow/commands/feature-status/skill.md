# Feature Status Check

Check the documentation and implementation status of a feature.

**Feature:** $ARGUMENTS

## Your Task

### Step 1: Locate Feature

Search for the feature in `docs/features/`:
- Look for exact match: `docs/features/[feature-slug]/`
- If not found, search for similar names
- If multiple matches, list them for user to clarify

### Step 2: Check Documents

For the found feature, check each document:

| Document | Status | Notes |
|----------|--------|-------|
| PRD.md | Present/Missing | Check Status field if present |
| plan.md | Present/Missing | Check Status field, count completed steps |
| architecture.md | Present/Missing/N/A | Check if ADR was needed |

### Step 3: Assess Readiness

Based on documents found, determine the feature's phase:

```
## Feature Status: [Feature Name]

**Slug:** [feature-slug]
**Location:** docs/features/[feature-slug]/

### Documentation Status
| Document | Status | Details |
|----------|--------|---------|
| PRD | [status] | [Status field value or "Not started"] |
| Plan | [status] | [X/Y steps complete] |
| Architecture | [status] | [Required/Optional] |

### Current Phase
[One of:]
- NOT STARTED - No documentation exists
- PRD PHASE - PRD in progress, not yet approved
- PLANNING PHASE - PRD approved, plan in progress
- ARCHITECTURE PHASE - Plan ready, ADR in progress
- READY TO IMPLEMENT - All docs approved
- IN PROGRESS - Implementation started (X% complete)
- COMPLETE - Implementation finished

### Next Action
[Recommended command to run]
```

### Step 4: Show Progress (if implementing)

If plan.md shows implementation in progress:
- List completed steps
- List remaining steps
- Show any blockers noted

## If Feature Not Found

```
## Feature Not Found: [search-term]

No feature documentation found matching "[search-term]".

**Existing features:**
[List all directories under docs/features/]

**To start a new feature:**
/new-feature [feature-name]
```

---

## Response Format

Use the status report format shown in Step 3.
