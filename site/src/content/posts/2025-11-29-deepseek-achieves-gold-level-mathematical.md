---
title: "DeepSeek Achieves Gold-Level Mathematical Reasoning with 118/120 Putnam..."
author: "Voja Lalich"
date: "2025-11-29"
tags: ["deepseek", "agents", "tools"]
type: discussion
url: "https://huggingface.co/deepseek-ai/DeepSeek-Math-V2"
---

**DeepSeek Achieves Gold-Level Mathematical**
**Reasoning with 118/120 Putnam Score Using**
**Self-Verifying Framework**

Would we be able to use [this](https://huggingface.co/deepseek-ai/DeepSeek-Math-V2) in a way that help us create client/project specific AIs/agents to augment our work?

Key to me is its ability to validate reasoning process, not just “solve math problem” - with that we can work on determining what needs to be done to meet the goal, then “solve it” by implementing software.

---

**Reply from Voja Lalich:**
**[DeepSeek-Math-V2 achieves 118/120 on IMO](https://substack.com/app-link/post?publication*id=1391056&amp;post*id=180158454&amp;utm*source=post-email-title&amp;utm*campaign=email-post-title&amp;isFreemail=true&amp;r=1h25ri&amp;token=eyJ1c2VyX2lkIjo4OTEyMDQzMCwicG9zdF9pZCI6MTgwMTU4NDU0LCJpYXQiOjE3NjQzMTY5NTcsImV4cCI6MTc2NjkwODk1NywiaXNzIjoicHViLTEzOTEwNTYiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.yFomKn*VOlIPMKkDjYRW*dxIXNJwa_LvRl48xL-fX1s)**
Edition #220 | 28 November 2025

[BUSINESS ANALYTICS NEWSLETTER](https://substack.com/@businessanalytics)
NOV 28

**DeepSeek Achieves Gold-Level Mathematical Reasoning with 118/120 Putnam Score Using Self-Verifying Framework**
*In this edition, we will also be covering:*
• *OpenAI partners amass $100 billion debt pile to fund its ambitions*
• *MIT study finds AI can already replace 11.7% of U.S. workforce*
• *Anthropic says AI could nearly double U.S. productivity growth over the next decade*
**Today’s Quick Wins**
**What happened:** DeepSeek released DeepSeek-Math-V2, an open-weight mathematical reasoning model that achieved gold medal-level scores on the International Mathematical Olympiad (IMO) 2025 and China Mathematical Olympiad (CMO) 2024, plus a near-perfect 118 out of 120 on Putnam 2024 competition problems. The breakthrough emphasizes self-verifiable mathematical reasoning—validating proof quality rather than just final answers.
**Why it matters:** This represents a fundamental shift in how AI approaches complex reasoning. Traditional approaches optimize for correct answers; DeepSeek-Math-V2 validates the reasoning process itself, solving a critical limitation affecting everything from theorem proving to drug discovery and chip design research.
**The takeaway:** For data professionals building reasoning systems, the architecture moving from “result-oriented” to “process-oriented” evaluation opens possibilities for more trustworthy AI agents in scientific and engineering workflows.



**Deep Dive**
**DeepSeek’s Self-Verifying Mathematics: The Framework That Validates the Process, Not Just the Answer**
The fundamental problem with traditional reinforcement learning approaches to mathematical reasoning has haunted AI researchers: **getting the right answer doesn’t guarantee correct reasoning**. This matters profoundly when models tackle problems without known solutions, where step-by-step logical rigor becomes non-negotiable. DeepSeek’s latest breakthrough fixes this through architectural innovation that industry observers are comparing to previous milestone moments like Deep Blue’s chess victory and AlphaGo’s triumph in Go—except this time, the AI is reasoning in real-world problem spaces.
**The Problem:** Large language models trained to maximize final answer accuracy on benchmarks like AIME and HMMT hit a ceiling. A model can guess correctly, use shortcuts embedded in grammar patterns, or leverage statistical coincidence rather than genuine mathematical insight. For theorem proving—which demands rigorous step-by-step derivations—this answer-focused approach fails entirely. The model needs to understand not just *what* the solution is, but *why* each step follows logically from the previous one.
**The Solution:** DeepSeek-Math-V2 implements a dual-component architecture that separates the generator (which proposes solutions) from the verifier (which validates mathematical rigor):
• **Generator Component:** Produces mathematical proofs and theorem derivations, building on DeepSeek’s V3.2-Exp experimental model as its foundation.
• **Verifier Component:** Implements a decision tree logic that checks proofs step-by-step for mathematical correctness, operating as the system’s internal quality control. When the verifier finds gaps or logical breaks, it feeds this data back.
• **Scaled Test-Time Compute:** Rather than predicting single answers quickly, the model spends additional computation time at inference exploring multiple solution paths and cross-validating them—shifting computing resources from training to verification at decision time.
The framework breaks the traditional generate-verify loop: as the generator improves, the verifier gets more sophisticated proofs to validate, automatically labeling new “hard-to-verify” examples as training data to strengthen the verifier, which in turn forces the generator to produce more rigorous reasoning.
**The Results Speak for Themselves:**
• **Baseline:** Traditional reasoning models plateau on competition math at 50-60% accuracy on olympiad-level problems
• **After Self-Verification:** Gold medal-level performance on IMO 2025 and CMO 2024 (meaning surpassing most human competitors)
• **Business Impact:** Achieved 118/120 on Putnam 2024 (losing only 2 points on the nation’s most challenging collegiate mathematics competition), positioning open-source mathematical AI at competitive parity with proprietary closed-model systems from Google DeepMind and OpenAI
The model is publicly available under Apache 2.0 licensing on Hugging Face and GitHub—democratizing access to olympiad-grade mathematical reasoning that previously existed only behind corporate walls.

**Reply from Voja Lalich:**
Technically, this may be an example of applying that logical framework to the task.

