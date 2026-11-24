import {readFileSync} from 'node:fs';
import * as input from './inputs/hand-features.mjs';

const source=JSON.parse(readFileSync(new URL('./inputs/hand-features.json',import.meta.url),'utf8'));
console.log(JSON.stringify({名称:'坐标姿态和训练字典',首项:source['joints'],字段:Object.keys(source),取数函数:Object.keys(input)},null,2));
