# Anti-AI Slop — Full Reference

Source: [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)

## Vocabulary by era

Words that saw statistically significant spikes in usage after LLM adoption, grouped by the model era they are most associated with.

### 2023 – mid-2024 (GPT-4 era)

`Additionally`, `boasts`, `bolstered`, `crucial`, `delve`, `emphasizing`, `enduring`, `garner`, `intricate/intricacies`, `interplay`, `key` (adj.), `landscape` (abstract), `meticulous/meticulously`, `pivotal`, `underscore`, `tapestry` (abstract), `testament`, `valuable`, `vibrant`

### Mid-2024 – mid-2025 (GPT-4o era)

`align with`, `bolstered`, `crucial`, `emphasizing`, `enhance`, `enduring`, `fostering`, `highlighting`, `pivotal`, `showcasing`, `underscore`, `vibrant`

### Mid-2025 onward (GPT-5 era)

`emphasizing`, `enhance`, `highlighting`, `showcasing`

Plus words associated with "undue emphasis on notability, attribution, and media coverage."

## Banned phrase patterns — categorized

### Significance / legacy inflation

| Pattern | Why it's a problem |
|---|---|
| `stands/serves as` | Replaces "is" with faux-importance |
| `is a testament/reminder` | Empty puffery |
| `a vital/significant/crucial/pivotal/key role/moment` | Inflates mundane facts |
| `underscores/highlights its importance/significance` | Tells instead of shows |
| `reflects broader` | Vague hand-waving at context |
| `symbolizing its ongoing/enduring/lasting` | Abstract significance without substance |
| `contributing to the` | Causal claim without evidence |
| `setting the stage for` | Narrative framing for non-narratives |
| `marking/shaping the` | Treats routine events as historic |
| `represents/marks a shift` | Unearned significance |
| `key turning point` | Almost never actually a turning point |
| `evolving landscape` | Meaningless filler |
| `focal point` | Usually isn't |
| `indelible mark` | Dramatic without warrant |
| `deeply rooted` | Vague claim of history |

### Promotional / puffery words

| Word | Preferred alternative |
|---|---|
| `boasts a` | `has` |
| `vibrant` | (delete, or be specific about what makes it so) |
| `rich` (meaning "varied") | `varied`, `diverse`, or be specific |
| `profound` | (delete, or quantify the depth) |
| `enhancing` | `improving` or be specific |
| `showcasing` | `showing` or just describe the thing |
| `exemplifies` | `shows`, `is an example of` |
| `commitment to` | (state the action, not the commitment) |
| `groundbreaking` | (state what it broke ground on) |
| `renowned` | (state who knows them and why) |
| `featuring` | `with`, `including`, `that has` |
| `diverse array` | (just list the things) |
| `in the heart of` | `in` |
| `nestled` | `located` |

### Superficial analysis phrases

These are `-ing` phrases tacked onto the end of sentences to manufacture depth:

- `highlighting/underscoring/emphasizing ...`
- `ensuring ...`
- `reflecting/symbolizing ...`
- `contributing to ...`
- `cultivating/fostering ...`
- `encompassing ...`
- `valuable insights`
- `align/resonate with`

### Vague attribution phrases

- `Industry reports suggest...`
- `Observers have cited...`
- `Experts argue...`
- `Some critics argue...`
- `several sources/publications` (when only one or two are cited)
- `such as` (before an exhaustive list presented as non-exhaustive)

### Copula replacements (say "is"/"has" instead)

| AI-preferred | Human-preferred |
|---|---|
| `serves as / stands as / marks / represents [a]` | `is` |
| `boasts / features / maintains / offers [a]` | `has` |

### Collaborative communication (never use)

- `I hope this helps`
- `Of course!` / `Certainly!` / `Absolutely!`
- `You're absolutely right!`
- `Would you like...` / `is there anything else`
- `let me know`
- `more detailed breakdown`
- `here is a`
- `Great question!`

### Didactic disclaimers (never use)

- `it's important/critical/crucial to note/remember/consider`
- `worth noting`
- `may vary`

### Section summary formulas (never use)

- `In summary,`
- `In conclusion,`
- `Overall,` (as a paragraph opener summarizing previous content)

### Transition word stuffing (avoid as sentence openers)

- `Additionally,`
- `Furthermore,`
- `Moreover,`
- `Notably,`
- `Importantly,`
- `Consequently,`

### Challenges-and-future formula

- `Despite its [positive words], [subject] faces challenges...`
- `Despite these challenges,`
- `Future Outlook` / `Future Directions`

### Negative parallelisms

- `not just X, but also Y`
- `not X, but Y`
- `It's not merely ... it's ...`
- `no X, no Y, just Z`

## Style patterns to avoid

| Pattern | Rule |
|---|---|
| Em dash overuse | Max one per paragraph; prefer commas or parentheses |
| Bold for emphasis | Only for headings, labels, UI elements — not rhetorical stress |
| Inline-header lists | `**Header:** description` format in bullet lists — use sparingly |
| Emoji in technical prose | Never, unless the user explicitly asks |
| Rule of three | Don't default to three items for rhetorical rhythm |
| Elegant variation | Don't cycle synonyms; repeat the precise term |
| Title Case in headings | Use sentence case for headings in documentation |

## Self-check

Before finalizing any text output, mentally verify:

1. Does every sentence add information, or is any sentence just restating importance?
2. Are there any `-ing` phrases at the end of sentences that could be deleted?
3. Did I use "is"/"has" where possible instead of `serves as`/`features`/`boasts`?
4. Did I start any sentences with `Additionally,` / `Furthermore,` / `Moreover,`?
5. Does it sound like a person wrote it, or like a press release?
