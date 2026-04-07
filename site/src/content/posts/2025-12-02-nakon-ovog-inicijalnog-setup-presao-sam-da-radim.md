---
title: "Nakon ovog inicijalnog setup-a, presao sam da radim na zahtevu (PRD-u) koji..."
author: "Nebojsa Lazic"
date: "2025-12-02"
tags: ["claude"]
type: post
---

Nakon ovog inicijalnog setup-a, presao sam da radim na zahtevu (PRD-u) koji nam je poslao klijent, za novi development. Set pitanja i odgovora koje sam imao sa Claude Code-om su u :thread: da ne bih ovde zauzimao prostor.

---

**Reply from Nebojsa Lazic:**
PRD koji su nam poslali u PDF formatu sam prvo prebacio u markdown, da ga Claude lakse procita

**Reply from Nebojsa Lazic:**
Flow dijagram koji nam je canvas takodje poslao kao HTML, sam isto prebacio u markdown, kroz Claude Desktop:
```This HTML files contains a flow diagram. Your task is to rewrite this file into a format that will be easily digestable by Claude Code. The new file that you create should provide all the information from the original file, but in a format that is easy for Claude Coe to read and parse. Do not ommit any information from the original file. Do nott add any information that doesn't already exist in the uploaded HTML file```

**Reply from Nebojsa Lazic:**
Rezultat ovoga su dva fajla: SDKify*Data*Integration*PRD.md i data*integration*plugin*llm_flow.md . U njime se nalazi sve sto smo dobili od klijenta.

**Reply from Nebojsa Lazic:**
Nakon toga sam pokrenuo converzaciju, iz 13 koraka as follows (dajem prompt a attached je rezultat):

**Reply from Nebojsa Lazic:**
**# 01**

```We need to work on requirements defined in @SDKify*Data*Integration_PRD.md
Additional workflow information can be found in @data*integration*plugin*llm*flow.md

Let us start by summarizing these requirements by creating an overview of 
what is it about. Do not talk about HOW this should be done, but ultrathink 
about WHAT needs to be done.```


**Reply from Nebojsa Lazic:**
**# 02**
``` What clarification questions need to be answered in order to make these requirements clear and suitable for further implementation planning?```

**Reply from Nebojsa Lazic:**
**# 03**

`Now analyze current implementation of the Canvas system and give me list of componenets, and their respective repositories, that would need to be changes during the implementation of these requirements.`

**Reply from Nebojsa Lazic:**
**# 04**

```
Read the @02*data*integration*sdk*clarification_questions.md, analyze the current implementation and try to provide answers to questions from section ## 1. Event Definitions Fir each answer give me your confidence score, and provide alternatives.```

**Reply from Nebojsa Lazic:**
Sledecih par pitanja su identicna, samo se referisem na druge chapters u polaznom dokumentu:
```
# 05


Read the @02*data*integration*sdk*clarification_questions.md, analyze the current implementation and try to provide answers to questions from section ## 2. Effect Definitions For each answer give me your confidence score, and provide evidence for the answer.

# 06

Read the @02*data*integration*sdk*clarification_questions.md, analyze the current implementation and try to provide answers to questions from section 3. Data Module (Marked TBD in PRD) For each answer give me your confidence score, and provide evidence for the answer.

# 07

Read the @02*data*integration*sdk*clarification_questions.md, analyze the current implementation and try to provide answers to questions from section ## 4. Document Workflow State For each answer give me your confidence score, and provide evidence for the answer. Save answers in a markdown file.

# 08

Read the @02*data*integration*sdk*clarification_questions.md, analyze the current implementation and try to provide answers to questions from section ## 5. Permissions & Security For each answer give me your confidence score, and provide evidence for the answer. Save answers in a markdown file.
```

---

# 09


Read the @02*data*integration*sdk*clarification_questions.md, analyze the current implementation and try to provide answers to questions from section ## 6. Error Handling & Recovery For each answer give me your confidence score, and provide evidence for the answer. Save answers in a markdown file.

# 10


Read the @02*data*integration*sdk*clarification_questions.md, analyze the current implementation and try to provide answers to questions from section ## 7. Existing Infrastructure For each answer give me your confidence score, and provide evidence for the answer. Save answers in a markdown file.


# 11


Read the @02*data*integration*sdk*clarification_questions.md, analyze the current implementation and try to provide answers to questions from section ## 8. Scale & Performance For each answer give me your confidence score, and provide evidence for the answer. Save answers in a markdown file.

# 12


Read the @02*data*integration*sdk*clarification_questions.md, analyze the current implementation and try to provide answers to questions from section ## 9. Edge Cases For each answer give me your confidence score, and provide evidence for the answer. Save answers in a markdown file.```

**Reply from Nebojsa Lazic:**


**Reply from Nebojsa Lazic:**
I konacno ovaj prompt:

```Read @SDKify*Data*Integration*PRD.md , @data*integration*plugin*llm*flow.md Then analyze questions and answers referenced in  @02*data*integration*sdk*clarification*questions.md and create a new markdown document that will contain all the clarifications that need to be made or facts that need to be confirmed with the Product Owner before proceeding with the implementation. Typically, we would need to confirm all the items with confidence score &lt;95% and all the decisions that were made/recommended as a new development.```

**Reply from Nebojsa Lazic:**
Na kraju sam dobio ovaj dokument. Nemam pojma koliko je validan, i koliko je on ovde izhalucinirao, ali please Canvas ekipo pogledajte ga i vidite da li bi mozda bilo korisno neku verziju ovoga poslati JP-u (ili koji god je vec faktor tamo ko njih) da nam razjasni. neka pitanja vrv treba izbaciti, a mozda i neka koja claude nije pohvatao treba dodati.

Kada dobijemo odgovore na ova pitanja (a mozda i pre) moze da se nastavi rad na planiranju implementacije - da se kaze claud-u da napravi plan, razbije ga u **epics i user stories koje ca da ubaci u Jiru**, i da eventually implementira.

**Reply from Nebojsa Lazic:**
to je sve

