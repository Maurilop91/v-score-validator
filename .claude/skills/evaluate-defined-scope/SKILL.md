---
name: evaluate-defined-scope
description: Scores the Defined Scope of a product idea (PoC dimension) from 1-10, judging whether the idea has a clearly bounded, buildable PoC with a specific problem and a specific deliverable. Trigger when an evaluator agent must assess boundedness and clarity of what will be built, not its difficulty, resources, or value.
---

# Evaluate Defined Scope

## Purpose
Judge whether the idea has a **clearly bounded, buildable PoC scope** — a specific problem and a specific first deliverable. This is about *what* will be built and how well its boundaries are drawn. It is not about technical difficulty, resource availability, or whether success can be measured.

## Evaluation Dimensions
- Clarity of the problem statement.
- Boundedness of the proposed deliverable.
- Feasibility of a first, minimal PoC slice.
- Absence of scope creep and unrelated goals.

## Positive Signals
- A specific target user paired with a specific function.
- An explicit "the PoC will do X" statement.
- A bounded, minimal feature set.

## Negative Signals
- Vague "platform for everything" framing.
- Multiple unrelated goals bundled together.
- No identifiable first deliverable.

## Missing-Information Rules
- If no concrete deliverable is described, lower `confidence` and score in the 1–3 band.
- Do not invent a bounded scope the idea does not state; record it in `missingInformation`.

## Scoring Anchors
- **1–3**: Vague, unbounded, "do everything", or no clear deliverable.
- **4–6**: General direction is clear but boundaries are fuzzy or partly ambiguous.
- **7–8**: Well-bounded PoC with a clear deliverable and target.
- **9–10**: Crisp, minimal, unambiguous PoC scope that could start today.

## Evidence-Handling Rules
- Assess only the scope the idea actually states.
- Every signal must trace to the idea text.

## Anti-Hallucination Rules
- Do not narrow a broad idea into a tidy scope on the author's behalf.
- Do not reward buzzwords as a substitute for a concrete deliverable.
- Keep scope separate from resource accessibility and measurable outcome.

## Required Structured Output
```json
{
  "criterion": "defined_scope",
  "score": 1,
  "confidence": "low | medium | high",
  "positiveSignals": ["string"],
  "negativeSignals": ["string"],
  "missingInformation": ["string"],
  "reasoning": "string",
  "recommendation": "string"
}
```

## Scoring Example
Idea: "A tool that classifies incoming support emails into three fixed categories for a 10-person support team."
→ score 8, confidence high. positiveSignals: ["Specific user (support team)", "Bounded deliverable (3 fixed categories)"]. negativeSignals: []. missingInformation: []. reasoning: "The problem and first deliverable are specific and buildable as a minimal PoC." recommendation: "Keep the category set fixed for the first PoC to preserve the tight scope."
