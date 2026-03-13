---
description: Review code for bugs, security vulnerabilities, and performance issues
disable-model-invocation: true
---

Review the code I've selected or the recent changes for:

- **Bugs & edge cases**: null checks, off-by-one errors, race conditions, unhandled errors
- **Security concerns**: injection vulnerabilities, auth issues, data exposure, insecure defaults
- **Performance issues**: unnecessary allocations, N+1 queries, missing indexes, blocking operations
- **Readability**: naming clarity, function length, complex conditionals, missing context

For each issue found, provide:
1. The specific location (file and line)
2. What the problem is
3. A concrete fix suggestion

Be concise and actionable. Prioritize by severity.
