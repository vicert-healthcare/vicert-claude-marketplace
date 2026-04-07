---
title: "Kad sam vec poceo, probacu da dovrsim pricu o koriscenju CC-a za ovaj jedan..."
author: "Nebojsa Lazic"
date: "2025-12-02"
tags: []
type: post
---

Kad sam vec poceo, probacu da dovrsim pricu o koriscenju CC-a za ovaj jedan PRD koji smo dobili da radimo.
Dakle, nako sto sam napravio inicijalni setup, i trazio od CC-a da mi izanalizira requirements, dobio sam dokument sa pitanjima i predlozima. To je poslednji fajl u mome threadu iznad. Sada bi trebao nas TechLead da pogleda, doda i oduzme sta treba, i iskoristi ovakav fajl za razgovor sa klijentovim TechLead-om ne bi li razjsasnio sta nije jasno.
Ako pretpostavimo da je to uradjeno, mogao bih da predjem da kreiranje “formalne” specifikacije i plana.

:thread: follows.

---

**Reply from Nebojsa Lazic:**
Koristicu [Codev Framework](https://github.com/ansari-project/codev) (mada moze i speckit, opensec, cak i plain Claude u planning rezimu - treba istraziti.

Prerequiset mi je da instaliram [ZEN MCP Server](https://github.com/BeehiveInnovations/zen-mcp-server/blob/main/docs/getting-started.md) i to sam uradio (ovde preskacem jer je trivijalno). On omogucava Claude da pita OpenAI i Google Gemini da urade nezavistan review plana i predloze poboljsanja. Na taj nacin i Sonnet i OpenAI i Gemini rade na istoj stvari.

**Reply from Nebojsa Lazic:**
Prvo instaliram Codev - jednostavnim promptom u Claude:

```Apply Codev to this repo following the instructions at https://github.com/ansari-project/codev/```

**Reply from Nebojsa Lazic:**
Onda mu kazem:

```I want to build @SDKify*Data*Integration_PRD.md using the SPIDER protocol. 
IMPORTANT: read @data*integration*plugin*llm*flow.md for additional context. 
IMPORTANT: read @01*data*integration*sdk*requirements_summary.md
  @02*data*integration*sdk*clarification_questions.md  and
  @03*data*integration*sdk*components_analysis.md for more details that you should take into account. ```

**Reply from Nebojsa Lazic:**
Ovo ce pokrene Codev da napravi spec, pozove OpenAI i Gemini da porvere taj spec i jos gomilu nekih drugih stvari. Ovaj korak je srce cele stvari. Ispod je sta sam dobio,

**Reply from Nebojsa Lazic:**
I onda mu kazem da mi napravi plan - u JIRI:

```Create the plan on WHAT (not HOW) things need to be done. Formulate your plan as a set of JIRA tickets (user stories, NFR-s, and similar). Save everything in a new markdown doc ```

**Reply from Nebojsa Lazic:**
Konacno, kazem mu da napravi Sotry Points:

```Your goal is to estimate total story points for each ticket. Each ticket shoul have story point
  value from Fibonacci scale (1, 2, 3, 5, 8, 13, 21).
  Estimate each ticket story points using the 4-factor framework:

  **Volume (Amount of Work):**
  - 1: Tiny change; 1–2 tasks
  - 2: Small; &lt;½ day per dev
  - 3: Medium; multi-file, maybe UI + API
  - 4: Large; touches multiple services
  - 5: Epic-scale; needs splitting

  **Complexity (Technical Difficulty):**
  - 1: Straight-forward, boiler-plate
  - 2: Minor logic or config branching
  - 3: Several components, non-trivial data or logic
  - 4: New patterns, new tech, integration work
  - 5: Architecture change or spike required

  **Uncertainty/Risk:**
  - 1: Fully understood, no external deps
  - 2: One open question
  - 3: A couple of assumptions or a 3rd-party call
  - 4: Significant unanswered questions or vendor impact
  - 5: Many unknowns or regulatory risk

  **Knowledge/Experience:**
  - 1: Team has done it many times
  - 2: Familiar area / clear SME
  - 3: Team has done something similar
  - 4: Few people on team have done it
  - 5: No in-house expertise

  Once you have estimated each of four factors, you should use weighted sum to calculate total story
  points.

  Weighted sum formula:

  Total story points = (Volume ** 0.3) + (Complexity ** 0.35) + (Uncertainty ** 0.2) + (Knowledge **
  0.15)

  You should use the following weights:

  Volume: 0.3
  Complexity: 0.35
  Uncertainty: 0.2
  Knowledge: 0.15

  Finally, you should map the total story points to the Fibonacci scale (1, 2, 3, 5, 8, 13, 21):

  Weightes Sum -&gt; Story points mapping:

  •    ≤ 4 → 1
  •    5-6 → 2
  •    7-8 → 3
  •    9-11 → 5
  •    12-15 → 8
  •    16-19 → 13
  •    20+ → 21 ```

**Reply from Nebojsa Lazic:**
I dobijem user stories sa sve story poenima (see below). Zamislite sada da sam imao instaliran i JIRA MCP Server - bukvalno je mogao da ode u Jiru i napravi mi sve ove tikete, i dodeli im sve parametre….

