import {readFileSync} from 'node:fs';
const data = JSON.parse(readFileSync(new URL('./hand-features.json', import.meta.url), 'utf8'));
export function handBasis(dictionary) {
  const rows = data.joints * 2;
  const columns = data.basisWidth;
  return Float64Array.from({length: rows * columns}, (_, i) => {
    const row = Math.floor(i / columns), column = i % columns;
    const pair = Math.floor(column / 2), joint = Math.floor(row / 2);
    if (row % 2 !== column % 2) return 0;
    const primary = Math.cos((joint + 0.5) * (pair || 1) * Math.PI / data.joints);
    const secondary = Math.cos((joint + 0.5) * (pair + 1) * Math.PI / data.joints);
    return pair === 1 ? primary + (dictionary ? 2e-7 : 1e-4) * secondary : primary;
  });
}
export function handBatch(frame) {
  return Float64Array.from({length: 2 * data.joints}, (_, i) => {
    return Math.sin((7 + frame) * (i + 0.25) * 0.07) + Math.cos((i + 1) * 0.13);
  });
}
