# v-score-validator

## Prompt Log

A running record of every prompt given in this project.

1. `/init` — Analyze this codebase and create a CLAUDE.md file with common commands and high-level architecture.
2. `git add .` / `git commit -m "chore: initialize v-score validator project"`
3. add a readme file and fill that file with every prompt i will give you include this
4. commit this
5. Read SPEC.md carefully. We are building an agentic V-Score Validator (must not be a manual calculator). Defined PoC evaluators (Technical Novelty, Defined Scope, Resource Accessibility, Measurable Outcome) and Market evaluators (Pain Severity, Willingness to Pay, Market Size, Differentiation); required architecture of one orchestrator agent, eight evaluator agents, one skill per criterion, one weighted-score skill, one verdict skill; per-evaluator and orchestrator responsibilities; "Do not create or modify files yet." — produce a detailed implementation plan (folder structure, agent/skill responsibilities, shared schema, orchestration sequence, error handling, verification, risks) and wait for approval before editing files.
6. remember to fill the prompts in readme file
7. Implement only the skill layer from the approved architecture plan (read SPEC.md first, do not modify it). Create ten skills: the eight criterion evaluators plus calculate-v-score and generate-verdict. Each criterion SKILL.md needs valid YAML frontmatter, purpose, evaluation dimensions, positive/negative signals, missing-information rules, scoring anchors (1-3/4-6/7-8/9-10), evidence-handling rules, anti-hallucination rules, the common evaluator output contract, and one scoring example. calculate-v-score implements PoC = TN×3 + DS×4 + RA×2 + MO×1 and Market = PS×4 + WTP×3 + MS×2 + Diff×1; generate-verdict uses the 65-point threshold to map to Go / De-risk First / Validate Demand / Reframe or Shelve. Constraints: no agents, no UI, no external research, non-overlapping scopes, no buzzword rewards, missing info lowers confidence, keep technical vs product novelty separate. Then verify frontmatter validity, shared contract, and overlaps.
8. Review the ten skills (no edits): trigger precision, accidental cross-triggering, anchor distinctness, evidence vs assumptions, missing-information penalties, shared-contract adherence, buzzword rewards, and duplicate reasoning. Return issues with severity, affected file, and recommended fix.
9. Apply only the high- and medium-severity fixes from the review (do not change formulas, add agents, expand scope, or break the shared contract). Then rerun the review and confirm no high/medium findings remain.
