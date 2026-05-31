import assert from 'node:assert/strict';
import { describe, it, test, before, after, beforeEach, afterEach } from 'node:test';

function matchObject(actual, expected) {
  if (expected === null || typeof expected !== 'object') {
    assert.deepStrictEqual(actual, expected);
    return;
  }

  assert.ok(actual !== null && typeof actual === 'object');

  for (const [key, expectedValue] of Object.entries(expected)) {
    matchObject(actual[key], expectedValue);
  }
}

globalThis.describe = describe;
globalThis.it = it;
globalThis.test = test;
globalThis.beforeAll = before;
globalThis.afterAll = after;
globalThis.beforeEach = beforeEach;
globalThis.afterEach = afterEach;

globalThis.expect = (actual) => ({
  toBe(expected) {
    assert.strictEqual(actual, expected);
  },
  toEqual(expected) {
    assert.deepStrictEqual(actual, expected);
  },
  toMatchObject(expected) {
    matchObject(actual, expected);
  },
  toBeDefined() {
    assert.notStrictEqual(actual, undefined);
  },
  toContain(expected) {
    assert.ok(actual?.includes(expected));
  },
  toBeInstanceOf(expected) {
    assert.ok(actual instanceof expected);
  },
  toBeGreaterThan(expected) {
    assert.ok(actual > expected);
  }
});
