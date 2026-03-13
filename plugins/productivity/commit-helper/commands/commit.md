---
description: Stage changes and create a conventional commit with an auto-generated message
disable-model-invocation: true
---

Help me create a well-structured git commit:

1. Run `git status` and `git diff --staged` to understand what's changed
2. If nothing is staged, show the unstaged changes and ask what to stage
3. Analyze the changes and generate a commit message following Conventional Commits:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `refactor:` for code restructuring
   - `docs:` for documentation changes
   - `test:` for test additions/modifications
   - `chore:` for maintenance tasks
4. Show the proposed message and ask for confirmation
5. Create the commit

Keep the subject line under 72 characters. Add a body only if the changes need explanation beyond the subject.
