#!/usr/bin/env node
'use strict';

/**
 * Deterministic test runner for the V-Score calculation layer.
 * Invokes the real scripts via child processes (stdin/stdout/exit code),
 * so it tests the scripts exactly as the orchestrator will call them.
 * No external dependencies.
 */

const { execFileSync } = require('child_process');
const path = require('path');

const CALC = path.join(__dirname, 'calculate-v-score.js');
const VERD = path.join(__dirname, 'generate-verdict.js');

let pass = 0;
let fail = 0;

function record(ok, desc, extra) {
  console.log(`${ok ? 'PASS' : 'FAIL'} | ${desc}${extra ? '  ->  ' + extra : ''}`);
  ok ? pass++ : fail++;
}

// Run a script with input; return { code, stdout, stderr }.
function run(script, input) {
  try {
    const stdout = execFileSync('node', [script], {
      input,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { code: 0, stdout, stderr: '' };
  } catch (e) {
    return { code: e.status == null ? 1 : e.status, stdout: e.stdout || '', stderr: e.stderr || '' };
  }
}

const scores = (n) => ({
  technicalNovelty: n, definedScope: n, resourceAccessibility: n, measurableOutcome: n,
  painSeverity: n, willingnessToPay: n, marketSize: n, differentiation: n,
});

// --- Case 1: all scores = 10 -> PoC 100 / Market 100 / Go ---
{
  const c = JSON.parse(run(CALC, JSON.stringify(scores(10))).stdout);
  record(c.pocScore === 100 && c.marketScore === 100, 'Case 1 calc: all 10s -> PoC 100 / Market 100', `PoC=${c.pocScore} Market=${c.marketScore}`);
  const v = JSON.parse(run(VERD, JSON.stringify({ pocScore: c.pocScore, marketScore: c.marketScore })).stdout);
  record(v.name === 'Go / Full Speed Ahead', 'Case 1 verdict: Go / Full Speed Ahead', v.name);
}

// --- Case 2: all scores = 1 -> PoC 10 / Market 10 / Reframe or Shelve ---
{
  const c = JSON.parse(run(CALC, JSON.stringify(scores(1))).stdout);
  record(c.pocScore === 10 && c.marketScore === 10, 'Case 2 calc: all 1s -> PoC 10 / Market 10', `PoC=${c.pocScore} Market=${c.marketScore}`);
  const v = JSON.parse(run(VERD, JSON.stringify({ pocScore: c.pocScore, marketScore: c.marketScore })).stdout);
  record(v.name === 'Reframe or Shelve', 'Case 2 verdict: Reframe or Shelve', v.name);
}

// --- Case 3: PoC 50 / Market 100 -> De-risk First ---
{
  const v = JSON.parse(run(VERD, JSON.stringify({ pocScore: 50, marketScore: 100 })).stdout);
  record(v.name === 'De-risk First', 'Case 3 verdict: PoC 50 / Market 100 -> De-risk First', v.name);
}

// --- Case 4: PoC 100 / Market 50 -> Validate Demand ---
{
  const v = JSON.parse(run(VERD, JSON.stringify({ pocScore: 100, marketScore: 50 })).stdout);
  record(v.name === 'Validate Demand', 'Case 4 verdict: PoC 100 / Market 50 -> Validate Demand', v.name);
}

// --- Case 5: PoC 65 / Market 65 -> Go / Full Speed Ahead (inclusive threshold) ---
{
  const v = JSON.parse(run(VERD, JSON.stringify({ pocScore: 65, marketScore: 65 })).stdout);
  record(v.name === 'Go / Full Speed Ahead' && v.pocLevel === 'High' && v.marketLevel === 'High',
    'Case 5 verdict: PoC 65 / Market 65 -> Go (65 is High)', `${v.name} / poc=${v.pocLevel} market=${v.marketLevel}`);
}

// --- Case 6: missing field -> non-zero exit ---
{
  const bad = scores(5);
  delete bad.differentiation;
  const r = run(CALC, JSON.stringify(bad));
  record(r.code !== 0, 'Case 6 calc: missing field -> non-zero exit', `exit=${r.code} stderr=${r.stderr.trim()}`);
}

// --- Case 7: score = 11 -> non-zero exit ---
{
  const bad = scores(5);
  bad.marketSize = 11;
  const r = run(CALC, JSON.stringify(bad));
  record(r.code !== 0, 'Case 7 calc: score = 11 -> non-zero exit', `exit=${r.code} stderr=${r.stderr.trim()}`);
}

// --- Case 8: non-integer score -> non-zero exit ---
{
  const bad = scores(5);
  bad.painSeverity = 7.5;
  const r = run(CALC, JSON.stringify(bad));
  record(r.code !== 0, 'Case 8 calc: non-integer score -> non-zero exit', `exit=${r.code} stderr=${r.stderr.trim()}`);
}

console.log(`\n${pass}/${pass + fail} passed${fail ? `, ${fail} FAILED` : ''}`);
process.exit(fail ? 1 : 0);
