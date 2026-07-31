---
name: evaluate-resource-accessibility
description: Scores the Resource Accessibility of a product idea (PoC dimension) from 1-10, judging whether the data, tools, APIs, talent, and compute needed to build the PoC are realistically obtainable. Trigger when an evaluator agent must assess whether required inputs can be acquired, not what the deliverable is or how novel it is.
---

# Evaluate Resource Accessibility

## Purpose
Judge whether the **resources needed to build the PoC** — data, tools, APIs, talent, and compute — are realistically obtainable. This is about whether the team can *get what it needs*, not what is being built (scope), how hard it is (novelty), or how it is measured.

## Evaluation Dimensions
- Availability of required data.
- Availability of required APIs and tooling.
- Skill/talent requirements vs. commonly available expertise.
- Compute/infra cost and scarcity.
- Legal or partnership barriers to obtaining resources.

## Positive Signals
- Relies on available public data or standard APIs.
- Uses commodity tooling and ordinary compute.
- Requires only commonly available skills.

## Negative Signals
- Depends on proprietary or inaccessible data.
- Needs rare expertise or scarce/expensive resources.
- Requires hard-to-secure partnerships to even start.

## Missing-Information Rules
- If the idea does not state what data/tools/talent it needs, lower `confidence` and avoid scoring above the 4–6 band.
- Do not assume resources are available when the idea is silent; record the gap in `missingInformation`.

## Scoring Anchors
- **1–3**: Depends on inaccessible data/resources or unrealistic requirements.
- **4–6**: Resources obtainable with moderate effort or cost, or with some gaps.
- **7–8**: Most required resources are readily available.
- **9–10**: All needed resources are clearly available, standard, and inexpensive.

## Evidence-Handling Rules
- Judge only against resources the idea names or clearly implies.
- Every signal must trace to the idea text.

## Anti-Hallucination Rules
- Do not assume a dataset, API, or partnership exists unless stated.
- Do not reward buzzwords as evidence of available resources.
- Keep resource accessibility separate from scope and technical novelty.

## Required Structured Output
```json
{
  "criterion": "resource_accessibility",
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
Idea: "Match patients to trials using a private hospital's full medical records, which we would need to negotiate access to."
→ score 3, confidence medium. positiveSignals: []. negativeSignals: ["Depends on private records requiring negotiated access"]. missingInformation: ["No confirmed data-access agreement"]. reasoning: "The core input is proprietary and access is unresolved, blocking a near-term PoC." recommendation: "Secure a data-sharing agreement or use a public dataset before building."
