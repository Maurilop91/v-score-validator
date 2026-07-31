---
description: Capture human feedback on a completed V-Score evaluation and propose ONE reusable lesson (status proposed) for human review.
argument-hint: [evaluation ID] [criterion] [observed problem] [expected correction]
allowed-tools: Read, Edit
---

# /capture-v-score-lesson

Turn human feedback about a completed evaluation into a single **proposed** lesson appended to `evaluations/lessons.md`. This command proposes only — it must **never** accept a lesson (a human does that by editing `Status:` to `accepted`), and it must **never** change a score, formula, threshold, or criterion skill.

## Inputs
Provided as arguments: `$ARGUMENTS`. Collect these four; ask for any that are missing:
1. **Evaluation ID** — the `id` of an entry in `evaluations/scores.json` that exhibited the problem. This is the required evidence.
2. **Criterion** — exactly one of: `technicalNovelty`, `definedScope`, `resourceAccessibility`, `measurableOutcome`, `painSeverity`, `willingnessToPay`, `marketSize`, `differentiation`.
3. **Observed problem** — what went wrong in scoring.
4. **Expected correction** — how future scoring should differ.

## Steps
1. **Gather** the four inputs; if any is missing, ask the user for it before proceeding.
2. **Require evidence.** Read `evaluations/scores.json` and confirm the given evaluation ID exists. If it does not exist, or the user cannot point to any concrete evaluation, **refuse to create a lesson** and explain that a lesson needs evidence (do not invent one from a vague complaint).
3. **Validate the criterion** is one of the eight valid values. If not, stop and list the valid values.
4. **Compare** the feedback against that evaluation's recorded result for the named criterion (its score in `scores.json`) and the criterion's own rubric. Summarize the specific gap between what was scored and the expected correction — for that criterion only.
5. **Propose ONE reusable rule.** Draft a single, general, reusable instruction (not a one-off patch) that would address the observed problem for this criterion. It must not reference the formulas or thresholds and must not touch any other criterion.
6. **Append** a lesson block to the `## Lessons` section of `evaluations/lessons.md` using the schema below, with `Status: proposed`. Give it a unique `Lesson <ID>` (e.g. `L-<criterion>-<n>`). Never overwrite or delete an existing lesson.
7. **Report** the proposed lesson to the user and tell them it is inert until a human changes `Status:` to `accepted`.

## Appended block format
```
## Lesson <ID>

Status:
proposed

Criterion:
<one criterion>

Observed issue:
<observed problem, tied to the criterion>

Evidence:
<evaluation ID(s)>

Proposed rule:
<the single reusable instruction>

Expected effect:
<how future scoring should change>
```

## Must not
- Never set `Status: accepted` (human-only) or auto-load the lesson.
- Never propose a rule without a valid evaluation ID as evidence.
- Never write a rule that spans or affects a different criterion.
- Never edit score formulas, thresholds, a criterion skill, or an existing lesson.

## Usage example
```
/capture-v-score-lesson eval-2026-07-31-003 technicalNovelty "Technical Novelty scored too high for an idea that only wraps an existing LLM API" "Using an existing LLM API alone should cap Technical Novelty at 5"
```
→ Verifies the evaluation exists, then appends a `proposed` lesson for `technicalNovelty` to `evaluations/lessons.md` for human review.
