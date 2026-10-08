// テスト共通: 現行ページ(HTML)から因子と選択肢を読み、全組合せを作る。
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const GOLDEN_DIR = path.join(ROOT, 'tests', 'golden');

// 癌腫キー → ツールページ。M0 で JSON 生成に置き換わるまではこの HTML が選択肢の正。
export const TOOL_PAGES = {
  esophagus: 'esophagus/tool.html',
  stomach: 'stomach/tool.html',
  colorectal: 'colorectal/tool.html',
  'liver-jp': 'liver/jp_tool.html',
  'liver-uicc': 'liver/uicc_tool.html',
  'pancreas-jp': 'pancreas/jp_tool.html',
  'pancreas-uicc': 'pancreas/uicc_tool.html',
  'biliary-intrahepatic': 'biliary-tract/intrahepatic_tool.html',
  'biliary-perihilar': 'biliary-tract/perihilar_tool.html',
  'biliary-distal': 'biliary-tract/distal_tool.html',
  'biliary-gallbladder': 'biliary-tract/gallbladder_tool.html',
};

// 判定関数へ渡す引数の順（select の id）。
export const ARG_ORDER = {
  'liver-jp': ['tumorCount', 'tumorSize', 'vascularInvasion', 'nFactor', 'mFactor'],
  default: ['tFactor', 'nFactor', 'mFactor'],
};

export function argOrder(type) {
  return ARG_ORDER[type] || ARG_ORDER.default;
}

/** ツールページの <select id> ごとの option value（空値を除く）を返す。 */
export function readFactors(type) {
  const html = readFileSync(path.join(ROOT, TOOL_PAGES[type]), 'utf8');
  const m = html.match(/data-cancer-type="([^"]+)"/);
  if (!m || m[1] !== type) throw new Error(`${TOOL_PAGES[type]}: data-cancer-type が ${type} ではない`);
  const factors = {};
  for (const sel of html.matchAll(/<select\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)) {
    factors[sel[1]] = [...sel[2].matchAll(/<option\s+value="([^"]*)"/g)].map((o) => o[1]).filter(Boolean);
  }
  for (const id of argOrder(type)) {
    if (!factors[id]?.length) throw new Error(`${TOOL_PAGES[type]}: select#${id} の選択肢が読めない`);
  }
  return factors;
}

/** 因子の全組合せ（引数順の配列）を返す。 */
export function allCombos(type) {
  const factors = readFactors(type);
  let acc = [[]];
  for (const id of argOrder(type)) acc = acc.flatMap((base) => factors[id].map((v) => [...base, v]));
  return acc;
}

/** js/staging-logic.js を読み込み stagingLogic を返す。 */
export function loadStagingLogic() {
  const src = readFileSync(path.join(ROOT, 'js', 'staging-logic.js'), 'utf8');
  const ctx = {};
  vm.createContext(ctx);
  return vm.runInContext(src + '\nstagingLogic;', ctx);
}

// select の id → data/staging の因子 key。
const FACTOR_KEY = { tFactor: 't', nFactor: 'n', mFactor: 'm' };
export function factorKey(selectId) {
  return FACTOR_KEY[selectId] || selectId;
}

/** data/staging/<type>.json を読む。 */
export function loadStagingDef(type) {
  return JSON.parse(readFileSync(path.join(ROOT, 'data', 'staging', `${type}.json`), 'utf8'));
}

/** js/staging-engine.js を読み込み StagingEngine を返す。 */
export function loadEngine() {
  const src = readFileSync(path.join(ROOT, 'js', 'staging-engine.js'), 'utf8');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx.StagingEngine;
}
