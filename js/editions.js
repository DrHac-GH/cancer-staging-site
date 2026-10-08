// 版・出典・免責の表示。正本は data/editions.json（HTML に版数を直書きしない）。
const Editions = (() => {
    const dataUrl = new URL('../data/editions.json', document.currentScript.src);
    let loading = null;

    const lang = () => localStorage.getItem('language') || 'ja';

    function load() {
        if (!loading) loading = fetch(dataUrl).then((r) => r.json());
        return loading;
    }

    /** 日英テキストを持つ要素を作る（language.js の切替対象になる）。 */
    function el(tag, text, className) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) {
            node.dataset.ja = text.ja;
            node.dataset.en = text.en;
            node.textContent = text[lang()];
        }
        return node;
    }

    /** "15" → 第15版 / 15th Ed.、"6補訂" → 第6版補訂版 / 6th Ed. (revised)。 */
    function editionLabel(value) {
        const [, num, suffix] = value.match(/^(\d+)(補訂|増補)?$/);
        const n = Number(num);
        const ord = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th';
        const enSuffix = { 補訂: ' (revised)', 増補: ' (supplemented)' }[suffix] || '';
        return { ja: `第${num}版${suffix ? suffix + '版' : ''}`, en: `${n}${ord} Ed.${enSuffix}` };
    }

    /** 「胃癌取扱い規約 第15版・UICC TNM分類 第8版」の形の準拠表記。 */
    function basisText(data, id) {
        const parts = data.editions[id].basis.map((b) => {
            const name = data.sources[b.source].name;
            const ed = editionLabel(b.implemented);
            return { ja: `${name.ja} ${ed.ja}`, en: `${name.en}, ${ed.en}` };
        });
        return { ja: parts.map((p) => p.ja).join('・'), en: parts.map((p) => p.en).join('; ') };
    }

    function sourceLine(data, b) {
        const src = data.sources[b.source];
        const ed = editionLabel(b.implemented);
        const li = el('li');
        const text = {
            ja: `${src.name.ja} ${ed.ja}（${src.society.ja}・${src.publisher.ja}）`,
            en: `${src.name.en}, ${ed.en} (${src.society.en}; ${src.publisher.en})`,
        };
        if (b.sourceUrl) {
            const a = el('a', text);
            a.href = b.sourceUrl;
            a.rel = 'noopener';
            li.appendChild(a);
        } else {
            li.appendChild(el('span', text));
        }
        if (b.latest !== b.implemented) {
            const latest = editionLabel(b.latest);
            const when = b.latestPublished ? { ja: `（${b.latestPublished} 発行）`, en: ` (published ${b.latestPublished})` } : { ja: '', en: '' };
            li.appendChild(el('span', {
                ja: ` ※ ${latest.ja}${when.ja}が出ています。本サイトは未反映です。`,
                en: ` * ${latest.en}${when.en} is available and is not yet reflected here.`,
            }, 'edition-outdated'));
        }
        return li;
    }

    /** footer#source-note に出典・準拠版・免責を描く。ids: 表示する系統（data/editions.json の key）。 */
    async function renderSourceNote(ids) {
        const footer = document.getElementById('source-note');
        if (!footer) return;
        const data = await load();
        footer.textContent = '';
        if (ids.length) {
            footer.appendChild(el('h2', { ja: '出典・準拠版', en: 'Sources and editions' }));
            const list = document.createElement('ul');
            const seen = new Set();
            for (const id of ids) {
                for (const b of data.editions[id].basis) {
                    const key = `${b.source}|${b.implemented}`;
                    if (seen.has(key)) continue;
                    seen.add(key);
                    list.appendChild(sourceLine(data, b));
                }
            }
            const refs = new Map();
            for (const id of ids) {
                const ref = data.editions[id].reference;
                if (ref) refs.set(ref.url, ref);
            }
            for (const ref of refs.values()) {
                const li = document.createElement('li');
                const a = el('a', ref.label);
                a.href = ref.url;
                a.rel = 'noopener';
                li.appendChild(a);
                list.appendChild(li);
            }
            footer.appendChild(list);
            if (ids.some((id) => data.editions[id].status === 'unverified')) {
                footer.appendChild(el('p', {
                    ja: 'この分類は原本との照合が未了です。必ず原本で確認してください。',
                    en: 'This classification has not yet been verified against the original publication. Please check the original.',
                }, 'edition-outdated'));
            }
            const dates = [...new Set(ids.map((id) => data.editions[id].effectiveFrom).filter(Boolean))];
            if (dates.length) {
                footer.appendChild(el('p', { ja: `適用日: ${dates.join('、')}`, en: `Effective from: ${dates.join(', ')}` }));
            }
        }
        footer.appendChild(el('p', data.disclaimer, 'disclaimer'));
        const log = el('a', { ja: '変更履歴', en: 'Changelog' });
        log.href = new URL('../changelog.html', dataUrl).href;
        footer.appendChild(log);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const ids = (document.body.dataset.editions || '').split(/\s+/).filter(Boolean);
        renderSourceNote(ids).catch((err) => console.error('editions:', err));
    });

    return { load, el, lang, basisText, editionLabel };
})();
