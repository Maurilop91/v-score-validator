---
name: evaluate-differentiation
description: Scores the Differentiation of a product idea (Market dimension) from 1-10, judging how distinct and defensible the offering is versus existing market alternatives. Trigger when an evaluator agent must assess competitive uniqueness in the market, which is distinct from Technical Novelty (the engineering how).
---

# Evaluate Differentiation

## Purpose
Judge how **distinct and defensible the offering is versus existing alternatives** in the market — the "why choose us over what already exists". This is market-facing competitive uniqueness. It is **not** technical novelty: a technically ordinary product can be highly differentiated, and a technically novel one can be undifferentiated in the market.

## Evaluation Dimensions
- Uniqueness versus named or implied competitors.
- Defensibility / moat (hard to copy).
- Clarity of the "why us over alternatives" story.
- Strength versus available substitutes.

## Positive Signals
- A clear, unique value versus existing alternatives.
- A defensible advantage that is hard to copy.

## Negative Signals
- A crowded market entered with no real distinction.
- "Like X but slightly nicer" with no meaningful edge.
- Me-too positioning.

## Missing-Information Rules
- If the idea names no alternatives or differentiator, lower `confidence` and avoid scoring above the 4–6 band.
- Do not invent a competitive edge the idea does not claim; record the gap in `missingInformation`.

## Scoring Anchors
- **1–3**: No differentiation; me-too in a crowded space.
- **4–6**: Some differentiation but weak or easily copied.
- **7–8**: Clear, meaningful differentiation versus alternatives.
- **9–10**: Strong, defensible differentiation or moat.

## Evidence-Handling Rules
- Judge only against differentiation the idea actually claims.
- Every signal must trace to the idea text.

## Anti-Hallucination Rules
- Do not score technical newness here — that is `evaluate-technical-novelty`.
- Do not reward buzzwords (AI, blockchain, automation) as differentiation by themselves.
- Do not assume a moat the idea does not describe.

## Required Structured Output
```json
{
  "criterion": "differentiation",
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
Idea: "Another to-do list app, but with AI."
→ score 2, confidence high. positiveSignals: []. negativeSignals: ["Crowded category", "AI cited as the only distinction with no described edge"]. missingInformation: ["No comparison to existing alternatives", "No defensible advantage described"]. reasoning: "The market is saturated and the only claimed distinction is an unsubstantiated buzzword." recommendation: "Define a concrete, hard-to-copy advantage versus named competitors."
