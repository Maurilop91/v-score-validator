---
name: calculate-v-score
description: Deterministically computes the weighted PoC Score and Market Score (each 10-100) from the eight evaluator scores using the official V-Score weights. Trigger after all eight evaluator scores are collected and validated, before generating the verdict. This skill does no judgment - it only applies the fixed formula.
---

# Calculate V-Score

## Purpose
Turn the eight validated evaluator scores (each an integer 1–10) into two weighted dimension scores, each ranging 10–100. This skill is **pure arithmetic** — it must not re-judge any criterion.

## Inputs
Eight integer scores, 1–10:
- PoC: `technicalNovelty`, `definedScope`, `resourceAccessibility`, `measurableOutcome`
- Market: `painSeverity`, `willingnessToPay`, `marketSize`, `differentiation`

## Formulas (exact — do not alter the weights)
```
PoC Score =
    Technical Novelty      × 3
  + Defined Scope          × 4
  + Resource Accessibility × 2
  + Measurable Outcome     × 1

Market Score =
    Pain Severity          × 4
  + Willingness to Pay     × 3
  + Market Size            × 2
  + Differentiation        × 1
```
Weights sum to 10 in each dimension, so with scores of 1–10 both dimension scores fall in the range **10–100** (all 1s → 10, all 10s → 100).

## Validation Rules
- Every input score must be an integer in [1, 10]; reject otherwise (do not clamp silently — surface the error).
- Each computed dimension score must land in [10, 100]; a value outside this range indicates an input error.
- Preserve each weighted contribution in the `breakdown` for traceability back to the evaluators.

## Required Structured Output
```json
{
  "pocScore": 10,
  "marketScore": 10,
  "breakdown": {
    "poc": [
      { "criterion": "technical_novelty", "score": 1, "weight": 3, "contribution": 3 },
      { "criterion": "defined_scope", "score": 1, "weight": 4, "contribution": 4 },
      { "criterion": "resource_accessibility", "score": 1, "weight": 2, "contribution": 2 },
      { "criterion": "measurable_outcome", "score": 1, "weight": 1, "contribution": 1 }
    ],
    "market": [
      { "criterion": "pain_severity", "score": 1, "weight": 4, "contribution": 4 },
      { "criterion": "willingness_to_pay", "score": 1, "weight": 3, "contribution": 3 },
      { "criterion": "market_size", "score": 1, "weight": 2, "contribution": 2 },
      { "criterion": "differentiation", "score": 1, "weight": 1, "contribution": 1 }
    ]
  }
}
```

## Worked Example
Scores — TN=8, DS=7, RA=6, MO=5; PS=9, WTP=6, MS=7, Diff=4.
- PoC = 8×3 + 7×4 + 6×2 + 5×1 = 24 + 28 + 12 + 5 = **69**
- Market = 9×4 + 6×3 + 7×2 + 4×1 = 36 + 18 + 14 + 4 = **72**
