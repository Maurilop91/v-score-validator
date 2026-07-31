---
description: Run the full V-Score evaluation on one product idea via the existing orchestrator.
argument-hint: [product idea]
allowed-tools: Task
---

# /validate-idea

Start the V-Score evaluation workflow for a single product idea. This command is a thin entry point: it **delegates all evaluation and scoring to the existing `vscore-orchestrator` agent** and does not implement any business logic itself.

## Input
The product idea is provided as arguments:

> $ARGUMENTS

## Steps
1. **Get the idea.** If the arguments above are empty or whitespace-only, ask the user: *"Please provide the product idea you want evaluated."* Then stop and wait for their reply — do not fabricate an idea.
2. **Delegate to the orchestrator.** Invoke the `vscore-orchestrator` agent via the Task tool, passing the user's idea **verbatim** (preserve original wording; do not summarize, rewrite, or add a title). The orchestrator fans out to all eight specialist evaluators, validates and retries their outputs, then runs `calculate-v-score` and `generate-verdict`.
3. **Wait** for the orchestrator to return its complete JSON (all eight evaluations, both weighted scores, and the verdict). If it returns an error contract (e.g. `EMPTY_INPUT`, `INVALID_EVALUATOR`), surface that error plainly instead of a report.
4. **Present** the orchestrator's result to the user in this order, taken directly from its output — do not recompute or edit any value:
   - **Criterion breakdown** — the eight criteria with each `score` and `confidence`.
   - **PoC score** — `scores.poc` with its `pocCalculation` string.
   - **Market score** — `scores.market` with its `marketCalculation` string.
   - **Verdict** — `verdict.name` and `verdict.explanation`.
   - **Largest risks** — `largestRisks`.
   - **Missing information** — `missingInformation`.
   - **Recommended next experiment** — `recommendedNextExperiment`.

## Must not
- Duplicate or reimplement scoring logic, the weighted formulas, or the verdict thresholds.
- Call any criterion `evaluate-*` skill directly, or call `calculate-v-score` / `generate-verdict` yourself — only the orchestrator does.
- Replace, bypass, or second-guess the orchestrator; add new evaluation criteria; browse the web; or alter any score the orchestrator returned.

## Usage example
```
/validate-idea An AI-powered forecasting tool for independent restaurants in Montevideo that recommends daily ingredient purchases from historical sales, weather, and local events. MVP: ten restaurants, eight weeks, target 15% less food waste. Monthly subscription, but no willingness-to-pay interviews done yet.
```
→ Invokes `vscore-orchestrator`, waits for all eight evaluations, and returns the criterion breakdown, PoC and Market scores (with calculation strings), the verdict, largest risks, missing information, and the recommended next experiment.

If you run `/validate-idea` with no idea, the command will ask you to provide one first.
