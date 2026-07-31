---
name: evaluate-technical-novelty
description: Scores the Technical Novelty of a product idea (PoC dimension) from 1-10, judging how technically new and non-trivial the described technical approach is. Trigger when an evaluator agent must assess engineering difficulty and invention of the how, not the product concept, market uniqueness, or scope clarity.
---

# Evaluate Technical Novelty

## Purpose
Judge how technically novel and non-trivial the **technical approach** is — genuinely new methods, hard engineering, or non-obvious invention in *how* the thing is built. This is strictly the engineering "how". It is **not** product novelty and **not** market uniqueness (that belongs to `evaluate-differentiation`).

## Evaluation Dimensions
- Technical difficulty of the proposed approach.
- Degree of invention vs. assembly of off-the-shelf parts.
- Advancement beyond standard/state-of-the-art practice.
- Engineering risk that must be solved to make it work.

## Positive Signals
- A described novel algorithm, model, architecture, or method.
- A genuinely hard technical problem at the core.
- A non-obvious approach that goes beyond wiring standard libraries/APIs.

## Negative Signals
- Pure CRUD, glue code, or "just call an existing API".
- A well-solved, commoditized problem presented as new.
- Buzzwords (AI, blockchain, automation) with no described technical substance.

## Missing-Information Rules
- If the idea describes the technical approach only *partially*, lower `confidence` and cap the score in the 4–6 band.
- If the idea describes *no* technical approach at all, treat it as no substance and score in the 1–3 band (not the 4–6 band).
- Never infer a sophisticated method that the idea does not state. Record the gap in `missingInformation`.

## Scoring Anchors
- **1–3**: No technical novelty — standard assembly of existing tools, or purely buzzword-driven with no described method.
- **4–6**: Some technical challenge, but largely established techniques and modest engineering.
- **7–8**: Clearly non-trivial technical approach with meaningful engineering novelty or difficulty.
- **9–10**: Genuinely novel technical method advancing beyond current standard practice, with described substance.

## Evidence-Handling Rules
- Score only on technical substance explicitly present in the idea text.
- Every signal must trace to something the idea actually says.

## Anti-Hallucination Rules
- Do not treat domain buzzwords (AI, ML, blockchain, automation) as novelty by themselves.
- Do not assume difficulty or invention that is not described.
- Keep technical novelty separate from product novelty and from market differentiation.

## Required Structured Output
```json
{
  "criterion": "technical_novelty",
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
Idea: "A note app that stores notes in a database and tags them with an AI label from a standard API."
→ score 2, confidence high. positiveSignals: []. negativeSignals: ["Standard CRUD plus a third-party API call", "AI used as a label, no described method"]. missingInformation: ["No novel technical approach described"]. reasoning: "The technical approach is off-the-shelf assembly; the AI mention adds no engineering substance." recommendation: "Only raise this score if a genuinely hard or novel technical method is introduced."
