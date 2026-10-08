// 生成物を作る: changelog.html（data/editions.json から）と service-worker.js（キャッシュ一覧と版）。
// 使い方: npm run build（データやページを変えたら実行してコミットする。npm test が生成漏れを検出する）
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(path.join(ROOT, f));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** 日英テキストを持つ要素（language.js の切替対象）。 */
const t = (tag, text, attrs = '') => `<${tag}${attrs} data-ja="${esc(text.ja)}" data-en="${esc(text.en)}">${esc(text.ja)}</${tag}>`;

function editionLabel(value) {
  const [, num, suffix] = value.match(/^(\d+)(補訂|増補)?$/);
  const n = Number(num);
  const ord = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th';
  const enSuffix = { 補訂: ' (revised)', 増補: ' (supplemented)' }[suffix] || '';
  return { ja: `第${num}版${suffix ? suffix + '版' : ''}`, en: `${n}${ord} Ed.${enSuffix}` };
}

export function buildChangelog() {
  const data = JSON.parse(read('data/editions.json'));
  const STATUS = {
    current: { ja: '現行版', en: 'Current' },
    outdated: { ja: '新版あり（未反映）', en: 'Newer edition available (not yet reflected)' },
    unverified: { ja: '原本との照合が未了', en: 'Not yet verified against the original' },
  };
  const rows = Object.entries(data.editions).map(([id, e]) => {
    const def = JSON.parse(read(`data/staging/${id}.json`));
    const basis = e.basis.map((b) => {
      const name = data.sources[b.source].name;
      const ed = editionLabel(b.implemented);
      return { ja: `${name.ja} ${ed.ja}`, en: `${name.en}, ${ed.en}` };
    });
    const text = { ja: basis.map((b) => b.ja).join('・'), en: basis.map((b) => b.en).join('; ') };
    return `                <tr>\n                    ${t('td', def.name)}\n                    ${t('td', text)}\n                    ${t('td', STATUS[e.status])}\n                </tr>`;
  });
  const entries = [...data.changelog]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((c) => `            <li><strong>${esc(c.date)}</strong> ${t('span', c)}</li>`);
  return `<!DOCTYPE html>
<!-- このファイルは tools/build.mjs が data/editions.json から生成する。直接編集しない。 -->
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${t('title', { ja: '変更履歴・準拠版', en: 'Changelog and Editions' })}
    <link rel="stylesheet" href="style.css">
</head>
<body data-editions="">
    <nav class="page-nav">
        ${t('a', { ja: 'ホームに戻る', en: 'Back to Home' }, ' href="index.html"')}
    </nav>

    <div class="main-content">
        ${t('h1', { ja: '変更履歴・準拠版', en: 'Changelog and Editions' })}

        ${t('h2', { ja: '準拠版の一覧', en: 'Editions in use' })}
        <table>
            <thead>
                <tr>
                    ${t('th', { ja: '分類', en: 'Classification' })}
                    ${t('th', { ja: '準拠版', en: 'Edition' })}
                    ${t('th', { ja: '状態', en: 'Status' })}
                </tr>
            </thead>
            <tbody>
${rows.join('\n')}
            </tbody>
        </table>

        ${t('h2', { ja: '変更履歴', en: 'Changelog' })}
        <ul class="changelog">
${entries.join('\n')}
        </ul>
    </div>

    <footer id="source-note" class="source-note"></footer>

    <script src="js/editions.js"></script>
    <script src="js/language.js"></script>
</body>
</html>
`;
}

/** キャッシュ対象（サイトとして配信するファイル）を列挙する。 */
function siteFiles(dir = ROOT) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name.startsWith('.') || ['node_modules', 'tests', 'tools'].includes(e.name)) return [];
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return siteFiles(p);
    const rel = path.relative(ROOT, p).split(path.sep).join('/');
    const served = /\.(html|css|js|json|png)$/.test(e.name) && !['package.json', 'package-lock.json', 'service-worker.js'].includes(rel);
    return served ? [rel] : [];
  }).sort();
}

export function buildServiceWorker(changelogHtml) {
  const files = [...new Set([...siteFiles(), 'changelog.html'])].sort();
  const hash = createHash('sha256');
  for (const f of files) {
    hash.update(f);
    hash.update(f === 'changelog.html' ? changelogHtml : read(f));
  }
  const urls = ['./', ...files.map((f) => `./${f}`)];
  return `// このファイルは tools/build.mjs が生成する。直接編集しない。
// キャッシュ名は配信ファイルの内容ハッシュ。データやページを変えると自動で新しい版になる。
const CACHE_NAME = 'cancer-staging-${hash.digest('hex').slice(0, 12)}';
const urlsToCache = ${JSON.stringify(urls, null, 2)};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) return caches.delete(key);
        })
      )
    )
  );
});
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const changelog = buildChangelog();
  writeFileSync(path.join(ROOT, 'changelog.html'), changelog);
  writeFileSync(path.join(ROOT, 'service-worker.js'), buildServiceWorker(changelog));
  console.log('generated: changelog.html, service-worker.js');
}
