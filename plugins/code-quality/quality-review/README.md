# Quality Review

A code review skill that systematically checks your code for bugs, security vulnerabilities, performance issues, and readability improvements.

## Usage

After installing, use the `/quality-review` command:

```
/quality-review
```

Select code or make recent changes, then invoke the skill. It will analyze your code across four dimensions:

- **Bugs & edge cases** -- null checks, off-by-one errors, race conditions
- **Security** -- injection vulnerabilities, auth issues, data exposure
- **Performance** -- unnecessary allocations, N+1 queries, blocking operations
- **Readability** -- naming, complexity, missing context

Each finding includes a specific location, problem description, and a concrete fix.

## Install

```bash
/plugin install quality-review@vicert-marketplace
```
