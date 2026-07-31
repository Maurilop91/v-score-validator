---
name: evaluate-willingness-to-pay
description: Scores the Willingness to Pay of a product idea (Market dimension) from 1-10, judging the evidence that customers will actually pay and that a budget exists. Trigger when an evaluator agent must assess monetization and payment intent, not how painful the problem is, how large the market is, or how differentiated the solution is.
---

# Evaluate Willingness to Pay

## Purpose
Judge the **evidence that customers will actually pay** and that a budget exists to buy this. This is about payment intent and monetization, not the intensity of the pain (pain severity), the number of customers (market size), or uniqueness (differentiation).

## Evaluation Dimensions
- Evidence of existing spend on the problem.
- Presence of a budget owner / clear buyer.
- Price sensitivity and expected pricing.
- Whether the payer is identified.

## Positive Signals
- Customers already spend money on alternatives or substitutes.
- A clear budget line or purchasing authority.
- Stated pricing or existing paying users.

## Negative Signals
- The idea assumes the product must be free.
- No budget or buyer identified.
- Unclear who would pay.

## Missing-Information Rules
- If the idea gives no payment or budget evidence, lower `confidence` and avoid scoring above the 4–6 band.
- Do not assume willingness to pay from enthusiasm alone; record the gap in `missingInformation`.

## Scoring Anchors
- **1–3**: No evidence anyone will pay; the idea expects it to be free.
- **4–6**: Willingness to pay is plausible but unproven.
- **7–8**: Evidence of a budget or existing spend on the problem.
- **9–10**: Strong evidence of paying demand or current spend on alternatives.

## Evidence-Handling Rules
- Judge only against payment evidence the idea states.
- Every signal must trace to the idea text.

## Anti-Hallucination Rules
- Do not confuse interest or pain with willingness to pay.
- Unpaid coping or manual workarounds are evidence of pain, not of willingness to pay; only *spend* counts here.
- Do not invent a budget or buyer that is not described.
- Keep willingness to pay separate from pain severity and market size.

## Required Structured Output
```json
{
  "criterion": "willingness_to_pay",
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
Idea: "Agencies already pay $500/month for a clunky reporting tool we would replace."
→ score 8, confidence high. positiveSignals: ["Customers already spend $500/month on an alternative", "Clear existing budget"]. negativeSignals: []. missingInformation: []. reasoning: "Existing spend on a substitute is direct evidence of willingness to pay." recommendation: "Confirm switching intent at a comparable or higher price point."
