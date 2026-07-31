#!/usr/bin/env node
'use strict';

/**
 * calculate-v-score.js
 * Deterministic PoC/Market weighted-score calculator.
 * Reads one JSON object of the eight criterion scores from stdin,
 * writes {pocScore, marketScore, pocCalculation, marketCalculation} to stdout.
 * Invalid input -> structured JSON error on stderr + non-zero exit.
 *
 * This script is the SINGLE SOURCE OF TRUTH for the weights. No agent,
 * skill, or orchestrator prompt may reproduce this arithmetic.
 */

const FIELDS = [
  'technicalNovelty',
  'definedScope',
  'resourceAccessibility',
  'measurableOutcome',
  'painSeverity',
  'willingnessToPay',
  'marketSize',
  'differentiation',
];

function fail(error, detail) {
  process.stderr.write(JSON.stringify({ error, detail: detail || null }) + '\n');
  process.exit(1);
}

function readStdin() {
  return new Promise((resolve) => {
    let raw = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (c) => (raw += c));
    process.stdin.on('end', () => resolve(raw));
  });
}

(async () => {
  const raw = await readStdin();
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    fail('INVALID_JSON', e.message);
  }
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    fail('INVALID_INPUT', 'Expected a JSON object with the eight criterion scores.');
  }

  for (const f of FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(data, f)) {
      fail('MISSING_FIELD', `Required field '${f}' is missing.`);
    }
    const v = data[f];
    if (typeof v !== 'number' || !Number.isInteger(v)) {
      fail('NON_INTEGER_SCORE', `Field '${f}' must be an integer (received ${JSON.stringify(v)}).`);
    }
    if (v < 1 || v > 10) {
      fail('SCORE_OUT_OF_RANGE', `Field '${f}' must be between 1 and 10 (received ${v}).`);
    }
  }

  const s = data;

  // PoC   = technicalNovelty*3 + definedScope*4 + resourceAccessibility*2 + measurableOutcome*1
  // Market = painSeverity*4 + willingnessToPay*3 + marketSize*2 + differentiation*1
  const pocScore =
    s.technicalNovelty * 3 +
    s.definedScope * 4 +
    s.resourceAccessibility * 2 +
    s.measurableOutcome * 1;

  const marketScore =
    s.painSeverity * 4 +
    s.willingnessToPay * 3 +
    s.marketSize * 2 +
    s.differentiation * 1;

  const pocCalculation =
    `technicalNovelty(${s.technicalNovelty})×3 + definedScope(${s.definedScope})×4 + ` +
    `resourceAccessibility(${s.resourceAccessibility})×2 + measurableOutcome(${s.measurableOutcome})×1 = ` +
    `${s.technicalNovelty * 3}+${s.definedScope * 4}+${s.resourceAccessibility * 2}+${s.measurableOutcome * 1} = ${pocScore}`;

  const marketCalculation =
    `painSeverity(${s.painSeverity})×4 + willingnessToPay(${s.willingnessToPay})×3 + ` +
    `marketSize(${s.marketSize})×2 + differentiation(${s.differentiation})×1 = ` +
    `${s.painSeverity * 4}+${s.willingnessToPay * 3}+${s.marketSize * 2}+${s.differentiation * 1} = ${marketScore}`;

  process.stdout.write(
    JSON.stringify({ pocScore, marketScore, pocCalculation, marketCalculation }, null, 2) + '\n'
  );
})();
