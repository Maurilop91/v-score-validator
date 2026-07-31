---
name: generate-verdict
description: Deterministically maps a PoC Score and Market Score to one of four V-Score verdicts using the official 65-point threshold, then writes a plain-language recommendation. Trigger after calculate-v-score produces both dimension scores. This skill applies fixed decision rules and does not re-judge any criterion.
---

# Generate Verdict

## Purpose
Convert the two dimension scores into the final verdict and a plain-language recommendation. This is **deterministic decision logic** — it must not re-score or reinterpret the evaluators.

## Inputs
- `pocScore` (10–100)
- `marketScore` (10–100)

## Threshold
The official threshold is **65**, applied inclusively: a score of exactly 65 **passes** (`>= 65`).

## Decision Rules (exact)
| PoC        | Market      | Verdict                 |
|------------|-------------|-------------------------|
| `>= 65`    | `>= 65`     | **Go / Full Speed Ahead** |
| `< 65`     | `>= 65`     | **De-risk First**       |
| `>= 65`    | `< 65`      | **Validate Demand**     |
| `< 65`     | `< 65`      | **Reframe or Shelve**   |

## Plain-Language Meaning
- **Go / Full Speed Ahead** — Both feasibility and market are strong; proceed to build.
- **De-risk First** — The market is attractive but the PoC is risky; reduce technical/feasibility risk before committing.
- **Validate Demand** — It is buildable but the market is unproven; validate real demand before investing further.
- **Reframe or Shelve** — Neither dimension clears the bar; rework the idea or set it aside.

## Traceability Rule
The verdict must reference both scores and, where useful, the weakest contributing criteria so the recommendation traces back to specific evaluators.

## Required Structured Output
```json
{
  "pocScore": 69,
  "marketScore": 72,
  "pocPass": true,
  "marketPass": true,
  "verdict": "Go / Full Speed Ahead",
  "recommendation": "string"
}
```

## Worked Examples
- PoC 69, Market 72 → pocPass true, marketPass true → **Go / Full Speed Ahead**.
- PoC 40, Market 80 → pocPass false, marketPass true → **De-risk First**.
- PoC 80, Market 40 → pocPass true, marketPass false → **Validate Demand**.
- PoC 65, Market 65 → both pass (inclusive) → **Go / Full Speed Ahead**.
- PoC 30, Market 25 → both fail → **Reframe or Shelve**.
