// data/staging の表から全組合せの判定結果を書き出し、ゴールデンケースとして固定する。
// 使い方: npm run golden
// 判定表を意図して変えたとき（版改訂の検収後）だけ実行し、git diff で差分を確認してコミットする。
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { GOLDEN_DIR, TYPES, allCombos, loadEngine, loadStagingDef } from './lib.mjs';

// 照合の根拠や未検収の事情を系統ごとに残す。
const NOTES = {
  esophagus: '第12版 臨床的進行度。学会公式英訳版 Table 7 と照合・書籍未照合',
  'esophagus-p': '第12版 組織学的進行度。学会公式英訳版 Table 8 と照合・書籍未照合',
  'stomach-p': '旧情報ページの手書き表をデータ化したもの（原本との照合は未了）',
};

const engine = loadEngine();
for (const type of TYPES) {
  const def = loadStagingDef(type);
  const keys = def.factors.map((f) => f.key);
  const cases = allCombos(def).map((args) => {
    const values = Object.fromEntries(keys.map((k, i) => [k, args[i]]));
    return [...args, engine.resolve(def, values).stage ?? '判定不能'];
  });
  const json =
    `{\n "type": ${JSON.stringify(type)},\n` +
    (NOTES[type] ? ` "note": ${JSON.stringify(NOTES[type])},\n` : '') +
    ` "args": ${JSON.stringify(keys)},\n "cases": [\n` +
    cases.map((c) => '  ' + JSON.stringify(c)).join(',\n') +
    '\n ]\n}\n';
  writeFileSync(path.join(GOLDEN_DIR, `${type}.json`), json);
  console.log(`${type}\t${cases.length}`);
}
