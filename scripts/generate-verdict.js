#!/usr/bin/env node
'use strict';

/**
 * generate-verdict.js
 * Deterministic verdict mapper.
 * Reads {pocScore, marketScore} from stdin, writes
 * {name, pocLevel, marketLevel, explanation} to stdout.
 * Invalid input -> structured JSON error on stderr + non-zero exit.
 *
 * This script is the SINGLE SOURCE OF TRUTH for the 65-point threshold
 * and the verdict matrix. No agent, skill, or orchestrator prompt may
 * reproduce this mapping.
 */

const THRESHOLD = 65; // inclusive: score >= 65 is High
const FIELDS = ['pocScore', 'marketScore'];

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
    fail('INVALID_INPUT', 'Expected a JSON object with pocScore and marketScore.');
  }

  for (const f of FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(data, f)) {
      fail('MISSING_FIELD', `Required field '${f}' is missing.`);
    }
    const v = data[f];
    if (typeof v !== 'number' || !Number.isInteger(v)) {
      fail('NON_INTEGER_SCORE', `Field '${f}' must be an integer (received ${JSON.stringify(v)}).`);
    }
    if (v < 10 || v > 100) {
      fail('SCORE_OUT_OF_RANGE', `Field '${f}' must be between 10 and 100 (received ${v}).`);
    }
  }

  const poc = data.pocScore;
  const market = data.marketScore;
  const pocLevel = poc >= THRESHOLD ? 'High' : 'Low';
  const marketLevel = market >= THRESHOLD ? 'High' : 'Low';

  let name;
  if (pocLevel === 'High' && marketLevel === 'High') name = 'Go / Full Speed Ahead';
  else if (pocLevel === 'Low' && marketLevel === 'High') name = 'De-risk First';
  else if (pocLevel === 'High' && marketLevel === 'Low') name = 'Validate Demand';
  else name = 'Reframe or Shelve';

  const explanation =
    `PoC ${poc} is ${pocLevel} and Market ${market} is ${marketLevel} ` +
    `(threshold ${THRESHOLD}, inclusive: a score of ${THRESHOLD} or above is High). ` +
    `By the official verdict matrix this is "${name}".`;

  process.stdout.write(
    JSON.stringify({ name, pocLevel, marketLevel, explanation }, null, 2) + '\n'
  );
})();
