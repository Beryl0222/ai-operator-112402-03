import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const qualification = JSON.parse(readFileSync(new URL('../inputs/qualification.json', import.meta.url), 'utf8'));

const { sample } = await import('../inputs/qualification.mjs');
test('跨型号窗口包含单位可转换的同一关节和轴向发生变化的关节', () => {
  const { startAt, repeat, channels } = qualification;
  const oldSample = sample(qualification, startAt - 1);
  const newSample = sample(qualification, startAt);
  assert.notDeepEqual(oldSample.slots, newSample.slots);
  assert.equal(new Set(newSample.slots).size, channels);
  assert.deepEqual(qualification.calibration.sharedB.slice(-1), qualification.calibration.ordinary.slice(-1));
  assert.notDeepEqual(qualification.calibration.changedB.slice(-1), qualification.calibration.ordinary.slice(-1));
  assert.notDeepEqual(sample(qualification, repeat.frame).x, sample(qualification, repeat.frame, 2).x);
  assert.ok(startAt - repeat.frame < qualification.window);
  assert.ok(qualification.window * qualification.channels * 32 > qualification.maxWorkBytes);
});
