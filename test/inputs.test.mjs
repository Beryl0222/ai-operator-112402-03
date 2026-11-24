import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import { handBasis, handBatch } from '../inputs/hand-features.mjs';

const data=JSON.parse(readFileSync(new URL('../inputs/hand-features.json',import.meta.url),'utf8'));
test('坐标姿态和训练字典的格式与关联', () => {
  const [rows,cols,b] = [data.joints*2,data.basisWidth,data.batches];
  assert.ok(data.swaps.every(([i,j])=>i!==j&&j<data.joints));
  assert.equal(handBasis(1).length,rows*cols);
  assert.equal(handBatch(24).length,rows);
  assert.equal(data.masks.at(-1).frames[1],b);
  const basis = handBasis(0);
  assert.ok(basis.some((v,i)=>i%cols===1&&v!==basis[i-1]));
  assert.ok(data.rebuildsLimit<b);
  assert.ok(data.budget<64*64*8*b);
});
