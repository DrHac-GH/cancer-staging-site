// 現行の判定結果を全組合せで書き出し、ゴールデンケースとして固定する。
// 使い方: node tests/generate-golden.mjs
// 判定表を意図して変えたとき（版改訂の検収後）だけ実行し、差分を確認してコミットする。
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { GOLDEN_DIR, TOOL_PAGES, allCombos, argOrder, loadStagingLogic } from './lib.mjs';

// 版との一致が未検収の系統。ゴールデンは「現行挙動の固定」であり、版として正しいことの保証ではない。
const NOTES = {
  esophagus: '現行挙動の固定（第12版の表と一致するかは未検証・要照合）',
};

const logic = loadStagingLogic();
for (const type of Object.keys(TOOL_PAGES)) {
  const cases = allCombos(type).map((args) => [...args, logic[type](...args)]);
  const body = { type, args: argOrder(type), cases };
  const json =
    `{\n "type": ${JSON.stringify(type)},\n` +
    (NOTES[type] ? ` "note": ${JSON.stringify(NOTES[type])},\n` : '') +
    ` "args": ${JSON.stringify(body.args)},\n "cases": [\n` +
    cases.map((c) => '  ' + JSON.stringify(c)).join(',\n') +
    '\n ]\n}\n';
  writeFileSync(path.join(GOLDEN_DIR, `${type}.json`), json);
  console.log(`${type}\t${cases.length}`);
}
