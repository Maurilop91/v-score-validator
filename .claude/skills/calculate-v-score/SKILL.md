---
name: calculate-v-score
description: Explains when and how to compute the weighted PoC and Market scores by running the deterministic script scripts/calculate-v-score.js. Trigger after all eight evaluator scores are collected and validated, before generating the verdict. The model performs NO arithmetic itself - the script is the single source of truth for the weights.
---

# Calculate V-Score (script-driven)

## Purpose
Turn the eight validated evaluator scores into the two weighted dimension scores by executing a deterministic script. **Do not do this arithmetic in your head or in prose** — run the script and use its output. The weights and the 10–100 range live only in `scripts/calculate-v-score.js`.

## When to invoke
After all eight specialist evaluations have passed validation (each an integer 1–10), and before generating the verdict.

## How to invoke
Build one JSON object with exactly these eight keys (integers 1–10) and pipe it to the script via Bash:

```bash
echo '{
  "technicalNovelty": 0, "definedScope": 0, "resourceAccessibility": 0, "measurableOutcome": 0,
  "painSeverity": 0, "willingnessToPay": 0, "marketSize": 0, "differentiation": 0
}' | node scripts/calculate-v-score.js
```

## What the script returns (stdout, JSON)
```json
{
  "pocScore": 0,
  "marketScore": 0,
  "pocCalculation": "string with substituted values and arithmetic",
  "marketCalculation": "string with substituted values and arithmetic"
}
```
Use these four values **exactly as returned**. Copy `pocScore`/`marketScore` and the calculation strings straight into the final report for traceability. Do not recompute, round, or edit them.

## Validation & errors (handled by the script)
The script enforces: all eight keys present, every value an integer, every value 1–10. On any violation it prints a structured JSON error to **stderr** and exits **non-zero**. If that happens, hard-stop the run with a `SCRIPT_ERROR` — never compute a fallback score yourself.

## Rules
- Never reproduce the weights or the formula in your reasoning or output — the script owns them.
- Never pass fewer than eight scores, non-integers, or out-of-range values; fix the upstream evaluation instead.
- The script is deterministic: the same eight inputs always yield the same output.
