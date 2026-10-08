// 判定ロジックがゴールデンケースと全組合せで一致することを検証する。
// 使い方: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import {
  GOLDEN_DIR, TOOL_PAGES, allCombos, argOrder, factorKey, loadEngine, loadStagingDef, loadStagingLogic, readFactors,
} from './lib.mjs';

const logic = loadStagingLogic();
const engine = loadEngine();
const types = Object.keys(TOOL_PAGES);

test('data/editions.json が全系統の版情報を持ち、出典を引ける', () => {
  const ed = JSON.parse(readFileSync(path.join(GOLDEN_DIR, '..', '..', 'data', 'editions.json'), 'utf8'));
  assert.deepEqual(Object.keys(ed.editions).sort(), [...types].sort());
  for (const [id, e] of Object.entries(ed.editions)) {
    assert.ok(['current', 'outdated', 'unverified'].includes(e.status), `${id} status`);
    assert.ok(e.basis.length > 0, `${id} basis`);
    for (const b of e.basis) assert.ok(ed.sources[b.source], `${id} source ${b.source}`);
    assert.equal(e.status === 'outdated', e.basis.some((b) => b.implemented !== b.latest), `${id} outdated と版差の整合`);
    assert.equal(loadStagingDef(id).edition, id);
  }
});

test('ゴールデンケースが全癌腫ぶん揃っている', () => {
  const files = readdirSync(GOLDEN_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
  assert.deepEqual(files.sort(), [...types].sort());
});

for (const type of types) {
  const golden = JSON.parse(readFileSync(path.join(GOLDEN_DIR, `${type}.json`), 'utf8'));

  test(`${type}: ページの選択肢の全組合せがゴールデンケースに載っている`, () => {
    const want = allCombos(type).map((a) => a.join('|')).sort();
    const have = golden.cases.map((c) => c.slice(0, -1).join('|')).sort();
    assert.deepEqual(have, want);
  });

  test(`${type}: 判定結果がゴールデンケースと一致（${golden.cases.length}件）`, () => {
    for (const c of golden.cases) {
      const args = c.slice(0, -1);
      assert.equal(logic[type](...args), c.at(-1), `${type} ${args.join(' ')}`);
    }
  });

  // 表引き（data/staging + staging-engine.js）が同じ結果を返すこと。
  const def = loadStagingDef(type);
  const keys = argOrder(type).map(factorKey);

  test(`${type}: data/staging の選択肢がページと一致`, () => {
    const page = readFactors(type);
    assert.deepEqual(def.factors.map((f) => f.key), keys);
    for (const [i, id] of argOrder(type).entries()) {
      assert.deepEqual(def.factors[i].options.map((o) => o.value), page[id], `${type} ${id}`);
    }
  });

  test(`${type}: 表引きの結果がゴールデンケースと一致`, () => {
    for (const c of golden.cases) {
      const args = c.slice(0, -1);
      const values = Object.fromEntries(keys.map((k, i) => [k, args[i]]));
      assert.equal(engine.resolve(def, values).stage ?? '判定不能', c.at(-1), `${type} ${args.join(' ')}`);
    }
  });
}
