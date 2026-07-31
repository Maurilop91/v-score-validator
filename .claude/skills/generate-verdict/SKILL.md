---
name: generate-verdict
description: Explains when and how to derive the official verdict by running the deterministic script scripts/generate-verdict.js. Trigger after calculate-v-score returns pocScore and marketScore. The model performs NO threshold or matrix logic itself - the script is the single source of truth for the 65-point threshold and the verdict matrix.
---

# Generate Verdict (script-driven)

## Purpose
Convert the two dimension scores into the official verdict by executing a deterministic script. **Do not apply the threshold or pick the verdict in prose** — run the script and use its output. The 65-point threshold and the verdict matrix live only in `scripts/generate-verdict.js`.

## When to invoke
Immediately after `calculate-v-score.js` returns `pocScore` and `marketScore`.

## How to invoke
Pipe the two scores to the script via Bash:

```bash
echo '{"pocScore": 0, "marketScore": 0}' | node scripts/generate-verdict.js
```

## What the script returns (stdout, JSON)
```json
{
  "name": "Go / Full Speed Ahead | De-risk First | Validate Demand | Reframe or Shelve",
  "pocLevel": "High | Low",
  "marketLevel": "High | Low",
  "explanation": "string"
}
```
Use these values **exactly as returned**. The `name` is the official verdict — do not rename, re-map, or second-guess it. The `explanation` may be quoted or folded into the final report, but must not contradict it.

## Validation & errors (handled by the script)
The script enforces: both `pocScore` and `marketScore` present, both integers, both between 10 and 100. On any violation it prints a structured JSON error to **stderr** and exits **non-zero**. If that happens, hard-stop the run with a `SCRIPT_ERROR` — never decide the verdict yourself.

## Rules
- Never reproduce the threshold value or the verdict matrix in your reasoning or output — the script owns them.
- Never invoke this before `calculate-v-score.js` has produced valid scores.
- The script is deterministic: the same two inputs always yield the same verdict.
