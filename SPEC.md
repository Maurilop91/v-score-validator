# V-Score Validator

## Problem

Teams often evaluate product ideas through intuition without separating
technical feasibility from commercial viability.

## Goal

Build an agentic evaluator that analyzes one product idea through eight
specialized criteria and produces a PoC score, a Market score, and a
plain-language recommendation.

## Scope

The MVP includes one orchestrator agent, eight specialized evaluator agents,
reusable evaluation skills, weighted score calculation, and a final verdict.

## Non-goals

No authentication, database, payments, external web research, or complex UI.
Evaluator agents must not invent evidence that is not present in the idea.

## Definition of Done

Given one product idea, all eight evaluator agents return:
- a score from 1 to 10
- reasoning
- positive and negative signals
- missing information
- one recommendation

The orchestrator calculates PoC and Market scores from 10 to 100 and returns
the correct verdict using the official 65-point threshold.

## Constraints

Use Claude Code agents and skills.
Keep agents narrowly scoped.
Use structured JSON outputs.
Build the core workflow before the UI.

## Verification

Verify:
- all scores equal 10
- all scores equal 1
- High PoC / Low Market
- Low PoC / High Market
- both scores exactly 65
- incomplete or vague idea input