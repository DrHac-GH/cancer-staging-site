// 選択肢ラベルの機械検査で使う指標。原本の定義文は手元にデータとして無いので、
// 旧サイトのラベル（tests/legacy-labels.json）を「元の言い回し」の代理として比べる。
export const desc = (label) => label.replace(/^[A-Za-z0-9]+:\s*/, '');

function bigrams(s) {
  const t = s.replace(/\s+/g, '').toLowerCase();
  const out = new Map();
  for (let i = 0; i < t.length - 1; i++) out.set(t.slice(i, i + 2), (out.get(t.slice(i, i + 2)) || 0) + 1);
  return out;
}

/** 文字2連の一致率（Dice 係数・0〜1）。1 に近いほど言い回しが同じ。 */
export function similarity(a, b) {
  const x = bigrams(a);
  const y = bigrams(b);
  let common = 0;
  let total = 0;
  for (const [k, n] of x) { common += Math.min(n, y.get(k) || 0); total += n; }
  for (const n of y.values()) total += n;
  return total ? (2 * common) / total : 1;
}

// 説明がこの長さ以下のラベルは「なし」「2cm以下」「1〜2個」のような事実の短い表記で、言い換えの対象にしない。
export const SHORT = { ja: 12, en: 40 };
// 言い換え後の上限。
export const MAX_LEN = { ja: 45, en: 110 };
export const MAX_SIMILARITY = { ja: 0.75, en: 0.75 };
