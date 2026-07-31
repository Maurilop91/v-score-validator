---
name: evaluate-market-size
description: Scores the Market Size of a product idea (Market dimension) from 1-10, judging how large the addressable market of potential customers is. Trigger when an evaluator agent must assess breadth and number of potential buyers, not how painful the problem is, whether they will pay, or how differentiated the solution is.
---

# Evaluate Market Size

## Purpose
Judge how large the **addressable market** is — how many potential customers exist. This is about breadth and count, not the intensity of the pain (pain severity), whether they will pay (willingness to pay), or uniqueness (differentiation). A large market is not the same as a paying one.

## Evaluation Dimensions
- Breadth of the affected population.
- Total/serviceable addressable market indicators.
- Growth trajectory of the segment.
- Niche vs. broad applicability.

## Positive Signals
- A large or growing population is affected.
- Broad applicability across segments or industries.

## Negative Signals
- A tiny niche with very few potential buyers.
- A shrinking or disappearing market.

## Missing-Information Rules
- If the idea does not indicate who or how many, lower `confidence` and avoid scoring above the 4–6 band.
- Do not assume a large market when the idea is silent; record the gap in `missingInformation`.

## Scoring Anchors
- **1–3**: Tiny or negligible market.
- **4–6**: Modest niche market.
- **7–8**: Substantial market.
- **9–10**: Large and/or fast-growing market with clear breadth.

## Evidence-Handling Rules
- Judge only against market indicators the idea provides.
- Every signal must trace to the idea text.

## Anti-Hallucination Rules
- Do not project a large market from a single anecdote.
- Do not treat willingness to pay or pain as evidence of size.
- Keep market size separate from pain severity and willingness to pay.

## Required Structured Output
```json
{
  "criterion": "market_size",
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
Idea: "A scheduling tool specifically for the handful of blimp-pilot training schools in the country."
→ score 2, confidence high. positiveSignals: []. negativeSignals: ["Extremely small buyer population"]. missingInformation: ["No evidence of adjacent segments to expand into"]. reasoning: "The described addressable market is a tiny niche of a few possible customers." recommendation: "Identify adjacent segments that share the same need to widen the market."
