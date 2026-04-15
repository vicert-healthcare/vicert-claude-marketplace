# Anti-AI Slop

Make your AI assistant write like a human, not a press release.

## What it does

Bans the vocabulary, phrases, and structural patterns that make LLM output instantly recognizable: words like "delve", "tapestry", "pivotal"; filler like "I hope this helps!"; constructions like "serves as a testament to". Covers 12 pattern categories and 30+ banned words.

## What it covers

- Chat responses
- Code comments
- Commit messages
- PR descriptions
- Documentation

## Rules at a glance

| # | Rule | Example fix |
|---|------|------------|
| 1 | No puffery / significance inflation | "plays a pivotal role" → say what it does |
| 2 | No superficial `-ing` phrases | "returning a list, showcasing flexibility" → "returns a list" |
| 3 | No "not just X, but Y" | State facts directly |
| 4 | No rhetorical rule-of-three | Only list three things if three things exist |
| 5 | No elegant variation | Say "function" every time, not "method" then "routine" |
| 6 | No copula avoidance | "serves as" → "is", "features" → "has" |
| 7 | No vague attributions | "Experts recommend..." → name the source or drop it |
| 8 | No challenges-and-future formula | Don't end with "Despite X, Y faces challenges..." |
| 9 | No collaborative filler | No "I hope this helps!", "Certainly!", "Great question!" |
| 10 | Limit em dashes | One per paragraph max |
| 11 | No bold for emphasis | Bold is for headings and labels, not rhetoric |
| 12 | No transition stuffing | Don't start sentences with "Additionally," |

## Source

Based on [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), adapted for coding assistants.