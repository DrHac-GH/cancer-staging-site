// 検収用: 選択肢ラベルの「旧サイトの表記 → 現在の要約」対照表を docs/label-review.md に書き出す。
// 使い方: npm run label-review
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './build.mjs';
import { SHORT, desc, similarity } from '../tests/labels.mjs';

const legacy = JSON.parse(readFileSync(path.join(ROOT, 'tests/legacy-labels.json'), 'utf8'));
const cell = (s) => s.replace(/\|/g, '\\|');
let out = `# 選択肢ラベルの対照表（検収用）

旧サイトの表記と、現在の要約を並べています。要約が医学的に正しいか（意味が変わっていないか・
落ちた条件がないか）を原本で確認してください。一致率は旧表記との言い回しの近さ（0〜1）で、
「—」は短い事実表記のため比較対象外です。このファイルは \`npm run label-review\` で作り直します。
`;
for (const f of readdirSync(path.join(ROOT, 'data/staging')).sort()) {
  const def = JSON.parse(readFileSync(path.join(ROOT, 'data/staging', f), 'utf8'));
  const scope = def.scope ? `（${def.scope.ja}）` : '';
  out += `\n## ${def.name.ja}${scope} \`${def.id}\`\n\n| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |\n|---|---|---|---|---|\n`;
  for (const factor of def.factors) {
    for (const opt of factor.options) {
      const old = legacy[def.id]?.[`${factor.key}.${opt.value}`];
      const oldJa = old ? desc(old.ja) : '（新設）';
      const sim = old && desc(old.ja).length > SHORT.ja ? similarity(desc(old.ja), desc(opt.label.ja)).toFixed(2) : '—';
      const mark = old && old.ja === opt.label.ja ? '（変更なし）' : cell(desc(opt.label.ja));
      out += `| ${opt.value} | ${cell(oldJa)} | ${mark} | ${cell(desc(opt.label.en))} | ${sim} |\n`;
    }
  }
}
writeFileSync(path.join(ROOT, 'docs/label-review.md'), out);
console.log('generated: docs/label-review.md');
