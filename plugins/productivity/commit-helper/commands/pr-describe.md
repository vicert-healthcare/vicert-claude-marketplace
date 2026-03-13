---
description: Generate a pull request description from the current branch's commits
disable-model-invocation: true
---

Generate a pull request description for the current branch:

1. Determine the base branch (usually `main` or `master`)
2. Run `git log` and `git diff` against the base branch to understand all changes
3. Generate a PR description with:
   - **Summary**: 2-3 bullet points describing what changed and why
   - **Changes**: grouped list of modifications by area
   - **Test plan**: checklist of what should be tested
4. Output the description in markdown format, ready to paste into a PR
