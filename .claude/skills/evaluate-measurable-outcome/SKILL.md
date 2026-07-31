---
name: evaluate-measurable-outcome
description: Scores the Measurable Outcome of a product idea (PoC dimension) from 1-10, judging whether the PoC has a clear, quantifiable success metric that would prove it works. Trigger when an evaluator agent must assess measurability of success, not scope, resources, or novelty.
---

# Evaluate Measurable Outcome

## Purpose
Judge whether the PoC has a **clear, quantifiable success metric** that would prove it works. This is about the *measurability of success*, not what is built (scope) or whether it can be built (resources, novelty).

## Evaluation Dimensions
- Presence of an explicit success metric.
- Objectivity and quantifiability of that metric.
- Testability within the PoC timeframe.
- Whether a baseline and target are defined.

## Positive Signals
- An explicit metric such as "reduce X by Y%", accuracy, latency, or conversion.
- A clear pass/fail bar for the PoC.

## Negative Signals
- Only subjective goals ("delight users", "make it better").
- No metric, or an unfalsifiable claim of success.

## Missing-Information Rules
- If no metric is stated, lower `confidence` and this **may reduce the score** into the 1–3 band, since success cannot be verified.
- Do not invent a metric the idea does not provide; record it in `missingInformation`.

## Scoring Anchors
- **1–3**: No measurable outcome; success is purely subjective.
- **4–6**: A success direction is implied but not quantified.
- **7–8**: A clear, quantifiable success metric is stated.
- **9–10**: A precise metric with baseline and target, testable within the PoC.

## Evidence-Handling Rules
- Assess only metrics the idea actually states.
- Every signal must trace to the idea text.

## Anti-Hallucination Rules
- Do not supply a plausible metric on the author's behalf.
- Do not treat vague ambition as a measurable outcome.
- Keep measurable outcome separate from defined scope.

## Required Structured Output
```json
{
  "criterion": "measurable_outcome",
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
Idea: "Cut average first-response time on support tickets from 6 hours to under 1 hour, measured over 30 days."
→ score 9, confidence high. positiveSignals: ["Explicit metric with baseline (6h) and target (<1h)", "Defined measurement window"]. negativeSignals: []. missingInformation: []. reasoning: "Success is precisely quantified and testable within the PoC." recommendation: "Instrument response-time logging before launch so the metric can be tracked from day one."
