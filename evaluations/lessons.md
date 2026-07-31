# V-Score Lessons

## Purpose
This file holds **human-reviewed lessons** that refine how criteria are interpreted over time, learned from feedback on completed evaluations. It is the human-in-the-loop memory companion to `scores.json`.

The system may **propose** lessons, but it must **never auto-accept** them. Only a human changes a lesson's status to `accepted`. Only `accepted` lessons are loaded as runtime context before future evaluations, and each is scoped to exactly one criterion.

## Lifecycle
1. A completed evaluation receives human feedback identifying a scoring problem.
2. `/capture-v-score-lesson` compares the feedback with the evaluation and proposes **one** reusable rule, appended below with `Status: proposed`.
3. A human reviews it and edits `Status:` to `accepted` (or `archived`).
4. Before each evaluation, an evaluator loads only the `accepted` lessons **matching its own criterion** and treats them as additional interpretation guidance.

## Rules for lessons
- **Never auto-accept** — proposal is machine-generated, acceptance is human-only.
- **Never change the score formulas** — lessons refine interpretation, not arithmetic or thresholds.
- **Never create a rule from a vague complaint without evidence** — a lesson must cite at least one evaluation ID.
- **Never apply one criterion's lesson to another** — a lesson affects exactly the criterion named in it.
- **Never delete historical lessons** — retire them with `Status: archived` instead.
- **Do not modify a criterion skill directly** — accepted lessons are runtime context, not permanent hidden edits to the skills.
- Accepted lessons **never override evidence** from the idea and never change the 1–10 scale.

## Lesson schema
Each lesson is one block in the form:

```
## Lesson <ID>

Status:
proposed | accepted | archived

Criterion:
<one V-Score criterion: technicalNovelty | definedScope | resourceAccessibility | measurableOutcome | painSeverity | willingnessToPay | marketSize | differentiation>

Observed issue:
<what went wrong>

Evidence:
<which evaluation IDs showed the problem>

Proposed rule:
<the reusable instruction>

Expected effect:
<how future scoring should change>
```

## Valid criterion values
`technicalNovelty`, `definedScope`, `resourceAccessibility`, `measurableOutcome`, `painSeverity`, `willingnessToPay`, `marketSize`, `differentiation`.

---

## Lessons

## Lesson L-technicalNovelty-1

Status:
accepted

Criterion:
technicalNovelty

Observed issue:
Ideas that merely invoke "AI" or wrap an existing large language model / third-party AI API can receive Technical Novelty credit above 5 even when they describe no novel method of their own. Calling an existing model is commodity integration, not engineering invention.

Evidence:
eval-2026-07-31-001

Proposed rule:
Using an existing LLM API is not independently sufficient for a Technical Novelty score above 5.

Expected effect:
When the only described technical substance is the use of an existing LLM/AI API (with no additional novel algorithm, model, architecture, or hard engineering), Technical Novelty is capped at 5. A score above 5 requires described novelty beyond calling an existing API.
