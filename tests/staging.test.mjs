// 判定表（data/staging）と版情報（data/editions.json）、ページの結線を検証する。
// 使い方: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { MAX_LEN, MAX_SIMILARITY, SHORT, desc, similarity } from './labels.mjs';
import { GOLDEN_DIR, ROOT, TYPES, allCombos, htmlFiles, loadEditions, loadEngine, loadStagingDef } from './lib.mjs';

const engine = loadEngine();
const editions = loadEditions();

test('ゴールデンケースが全系統ぶん揃っている', () => {
  const files = readdirSync(GOLDEN_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
  assert.deepEqual(files.sort(), TYPES);
});

test('data/editions.json が全系統の版情報を持ち、出典を引ける', () => {
  assert.deepEqual(Object.keys(editions.editions).sort(), TYPES);
  for (const [id, e] of Object.entries(editions.editions)) {
    assert.ok(['current', 'outdated', 'unverified'].includes(e.status), `${id} status`);
    assert.ok(e.basis.length > 0, `${id} basis`);
    for (const b of e.basis) {
      assert.ok(editions.sources[b.source], `${id} source ${b.source}`);
      assert.match(b.implemented, /^\d+(補訂|増補)?$/, `${id} implemented`);
      assert.match(b.latest, /^\d+(補訂|増補)?$/, `${id} latest`);
    }
    if (e.status !== 'unverified') {
      assert.equal(e.status === 'outdated', e.basis.some((b) => b.implemented !== b.latest), `${id} outdated と版差の整合`);
    }
    assert.equal(loadStagingDef(id).edition, id);
  }
});

for (const type of TYPES) {
  const def = loadStagingDef(type);
  const keys = def.factors.map((f) => f.key);
  const golden = JSON.parse(readFileSync(path.join(GOLDEN_DIR, `${type}.json`), 'utf8'));

  test(`${type}: 選択肢の全組合せがゴールデンケースに載っている`, () => {
    assert.deepEqual(golden.args, keys);
    const want = allCombos(def).map((a) => a.join('|')).sort();
    const have = golden.cases.map((c) => c.slice(0, -1).join('|')).sort();
    assert.deepEqual(have, want);
  });

  test(`${type}: 表引きの結果がゴールデンケースと一致（${golden.cases.length}件）`, () => {
    for (const c of golden.cases) {
      const args = c.slice(0, -1);
      const values = Object.fromEntries(keys.map((k, i) => [k, args[i]]));
      assert.equal(engine.resolve(def, values).stage ?? '判定不能', c.at(-1), `${type} ${args.join(' ')}`);
    }
  });

  test(`${type}: 判定表が参照する因子と値は定義済み`, () => {
    const known = Object.fromEntries(def.factors.map((f) => [f.key, f.options.map((o) => o.value)]));
    for (const [key, d] of Object.entries(def.derive || {})) {
      known[key] = Object.values(d.map);
      for (const c of d.count) assert.ok(known[c.factor]?.includes(c.equals), `${type} derive ${c.factor}=${c.equals}`);
    }
    for (const rule of def.rules) {
      for (const [k, allowed] of Object.entries(rule.when)) {
        for (const v of allowed) assert.ok(known[k]?.includes(v), `${type} rule ${k}=${v}`);
      }
    }
  });
}

// ---- 選択肢ラベル（自前の要約であること） ----

test('選択肢ラベルは旧サイトの言い回しを引き継がず、短く、版数を含まない', () => {
  const legacy = JSON.parse(readFileSync(path.join(ROOT, 'tests', 'legacy-labels.json'), 'utf8'));
  for (const type of TYPES) {
    const def = loadStagingDef(type);
    assert.notEqual(def.labelStatus, 'legacy', `${type}: 要約化が未了`);
    for (const factor of def.factors) {
      for (const opt of factor.options) {
        const old = legacy[type]?.[`${factor.key}.${opt.value}`];
        for (const lang of ['ja', 'en']) {
          const where = `${type} ${factor.key}.${opt.value} ${lang}`;
          const now = desc(opt.label[lang]);
          assert.ok(!/第\s?\d+\s?版|\d+(st|nd|rd|th) [Ee]d/.test(now), `${where}: 版数を含む`);
          assert.ok(now.length <= MAX_LEN[lang], `${where}: 長すぎる（${now.length}）`);
          // 旧ラベルが無い選択肢（版改訂で新設）と、事実の短い表記は言い回しの比較をしない
          if (!old || desc(old[lang]).length <= SHORT[lang]) continue;
          const sim = similarity(desc(old[lang]), now);
          assert.ok(sim < MAX_SIMILARITY[lang], `${where}: 旧ラベルと言い回しが近い（一致率 ${sim.toFixed(2)}）`);
        }
      }
    }
  }
});

// ---- ページの結線 ----

const pages = htmlFiles();
const read = (f) => readFileSync(path.join(ROOT, f), 'utf8');
const toolPages = pages.filter((f) => /data-cancer-type=/.test(read(f)));

test('ツールページは JSON から描画する構成で、選択肢・版数の直書きがない', () => {
  for (const f of toolPages) {
    const html = read(f);
    assert.ok(TYPES.includes(html.match(/data-cancer-type="([^"]+)"/)[1]), `${f}: 未定義の系統`);
    for (const need of ['id="factors"', 'id="edition-basis"', 'id="result"', 'js/staging-engine.js', 'js/editions.js', 'js/main.js']) {
      assert.ok(html.includes(need), `${f}: ${need}`);
    }
    assert.ok(!/<select|<option/.test(html), `${f}: 選択肢の直書きが残っている`);
  }
});

test('全系統が情報ページに載り、情報ページは JSON から描画する構成になっている', () => {
  const shown = [];
  for (const f of pages) {
    const html = read(f);
    const ids = (html.match(/id="staging-info" data-staging="([^"]*)"/) || [])[1];
    if (ids === undefined) continue;
    shown.push(...ids.split(/\s+/));
    for (const need of ['js/staging-engine.js', 'js/editions.js', 'js/info.js']) assert.ok(html.includes(need), `${f}: ${need}`);
    assert.equal((html.match(/<body data-editions="([^"]*)"/) || [])[1], ids, `${f}: data-editions と data-staging の一致`);
  }
  assert.deepEqual(shown.sort(), TYPES);
});

test('版数と Stage 表を HTML に直書きしていない（生成物の changelog.html を除く）', () => {
  for (const f of pages.filter((p) => p !== 'changelog.html')) {
    const html = read(f);
    assert.ok(!/第\s?\d+\s?版|\d+(st|nd|rd|th) [Ee]d/.test(html), `${f}: 版数の直書きが残っている`);
    assert.ok(!/<table|<td/.test(html), `${f}: 表の直書きが残っている`);
  }
});

test('全ページに出典・免責の差し込み口があり、系統 id が正しい', () => {
  for (const f of pages) {
    const html = read(f);
    assert.ok(html.includes('id="source-note"') && html.includes('js/editions.js'), `${f}: source-note`);
    const ids = (html.match(/<body data-editions="([^"]*)"/) || [])[1];
    assert.notEqual(ids, undefined, `${f}: data-editions`);
    for (const id of ids.split(/\s+/).filter(Boolean)) assert.ok(editions.editions[id], `${f}: ${id}`);
  }
});

test('生成物（changelog.html・service-worker.js）が最新（古ければ npm run build）', async () => {
  const { buildChangelog, buildServiceWorker } = await import('../tools/build.mjs');
  const changelog = buildChangelog();
  assert.equal(read('changelog.html'), changelog, 'changelog.html');
  assert.equal(read('service-worker.js'), buildServiceWorker(changelog), 'service-worker.js');
});
