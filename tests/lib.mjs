// テスト共通: data/staging の定義から因子の全組合せを作り、表引きエンジンを読み込む。
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const GOLDEN_DIR = path.join(ROOT, 'tests', 'golden');
const STAGING_DIR = path.join(ROOT, 'data', 'staging');

/** data/staging にある系統 id の一覧。 */
export const TYPES = readdirSync(STAGING_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')).sort();

/** data/staging/<type>.json を読む。 */
export function loadStagingDef(type) {
  return JSON.parse(readFileSync(path.join(STAGING_DIR, `${type}.json`), 'utf8'));
}

export function loadEditions() {
  return JSON.parse(readFileSync(path.join(ROOT, 'data', 'editions.json'), 'utf8'));
}

/** 因子の全組合せ（def.factors の順の配列）を返す。 */
export function allCombos(def) {
  let acc = [[]];
  for (const f of def.factors) acc = acc.flatMap((base) => f.options.map((o) => [...base, o.value]));
  return acc;
}

/** js/staging-engine.js を読み込み StagingEngine を返す。 */
export function loadEngine() {
  const src = readFileSync(path.join(ROOT, 'js', 'staging-engine.js'), 'utf8');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx.StagingEngine;
}

/** サイト内の HTML ファイル（相対パス）一覧。 */
export function htmlFiles(dir = ROOT) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name.startsWith('.') || ['node_modules', 'tests', 'data'].includes(e.name)) return [];
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(p);
    return e.name.endsWith('.html') ? [path.relative(ROOT, p)] : [];
  });
}
