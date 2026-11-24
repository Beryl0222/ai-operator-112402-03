import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const d = JSON.parse(readFileSync(new URL('../inputs/session.json', import.meta.url), 'utf8'));

test("样本的有效位、跳接和通道同宽", () => {
  assert.ok(d.samples.every(s=>s.x.length===s.skip.length && s.x.length===s.valid.length));
});

test("物理关节拥有仿射校准", () => {
  assert.ok(d.profiles.every(p=>p.channels.every(c=>Array.isArray(d.affine[c]))));
});

test("补发改变窗口有效域", () => {
  assert.ok(d.samples.at(-1).time===d.samples[1].time && d.samples[1].valid[1]!==d.samples.at(-1).valid[1]);
});
