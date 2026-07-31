---
name: evaluate-pain-severity
description: Scores the Pain Severity of a product idea (Market dimension) from 1-10, judging how acute, frequent, and urgent the customer problem is. Trigger when an evaluator agent must assess intensity of the problem, not whether customers will pay, how many there are, or how differentiated the solution is.
---

# Evaluate Pain Severity

## Purpose
Judge how **acute, frequent, and urgent** the customer problem is. This is the intensity of the pain, not whether people will pay for a fix (willingness to pay), how many people have it (market size), or how unique the solution is (differentiation).

## Evaluation Dimensions
- Intensity of the pain when it occurs.
- Frequency of occurrence.
- Cost or consequence of leaving it unsolved.
- Urgency to solve it now.

## Positive Signals
- A costly or frequent problem.
- Users invest manual effort or juggle multiple tools to cope today (non-monetary workaround effort).
- Strong operational or emotional cost described.

## Negative Signals
- A nice-to-have or minor annoyance.
- Rare or low-consequence occurrence.
- No evidence of real pain.

## Missing-Information Rules
- If the idea does not describe who feels the pain or its consequence, lower `confidence` and avoid scoring above the 4–6 band.
- Do not assume pain the idea does not state; record it in `missingInformation`.

## Scoring Anchors
- **1–3**: Trivial or nice-to-have; no real pain.
- **4–6**: Moderate, occasional pain.
- **7–8**: Significant, frequent pain with real cost.
- **9–10**: Acute, urgent, costly, frequent pain with clear evidence.

## Evidence-Handling Rules
- Judge only the pain the idea actually describes.
- Every signal must trace to the idea text.

## Anti-Hallucination Rules
- Do not amplify a mild inconvenience into a crisis.
- Do not reward buzzwords as evidence of pain.
- Keep pain severity separate from willingness to pay and market size.

## Required Structured Output
```json
{
  "criterion": "pain_severity",
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
Idea: "Clinics lose hours every day re-entering the same patient data across three systems, causing daily overtime."
→ score 8, confidence high. positiveSignals: ["Frequent (daily) and costly (overtime) problem", "Real operational consequence"]. negativeSignals: []. missingInformation: []. reasoning: "The pain is frequent, costly, and consequential, indicating high severity." recommendation: "Quantify the hours lost per clinic to strengthen the pain case."
