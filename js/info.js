// 情報ページ: 因子の説明と Stage 表を data/staging/<系統>.json から描く（HTML に表を手書きしない）。
(() => {
    const stagingDataBase = new URL('../data/staging/', document.currentScript.src);
    const el = Editions.el;
    const same = (s) => ({ ja: s, en: s });
    const stripColon = (label) => ({ ja: label.ja.replace(/[:：]$/, ''), en: label.en.replace(/:$/, '') });

    /** 行=T、列=N の Stage 表を、残りの因子（M など）の値ごとに作る。 */
    function stageTables(def) {
        const derive = def.derive || {};
        const derivedInputs = new Set(Object.values(derive).flatMap((d) => d.count.map((c) => c.factor)));
        const axes = {};
        for (const f of def.factors) if (!derivedInputs.has(f.key)) axes[f.key] = f.options.map((o) => o.value);
        for (const [key, d] of Object.entries(derive)) {
            axes[key] = Object.keys(d.map).sort((a, b) => b - a).map((n) => d.map[n]);
        }
        const outerKeys = Object.keys(axes).filter((k) => k !== 't' && k !== 'n');
        let outers = [{}];
        for (const k of outerKeys) outers = outers.flatMap((base) => axes[k].map((v) => ({ ...base, [k]: v })));

        const uniform = [];
        const tables = [];
        for (const outer of outers) {
            const grid = axes.t.map((t) => axes.n.map((n) => StagingEngine.resolve(def, { ...outer, t, n }).stage));
            const name = Object.values(outer).join(' ');
            const stages = new Set(grid.flat());
            if (stages.size === 1 && !stages.has(null)) uniform.push({ name, stage: grid[0][0] });
            else tables.push({ name, grid });
        }
        return { axes, uniform, tables };
    }

    function renderTable(axes, { name, grid }) {
        const table = document.createElement('table');
        if (name) table.appendChild(el('caption', same(name)));
        const head = table.createTHead().insertRow();
        head.appendChild(el('th', same('T \\ N')));
        for (const n of axes.n) head.appendChild(el('th', same(n)));
        const body = table.createTBody();
        grid.forEach((cells, i) => {
            const row = body.insertRow();
            row.appendChild(el('th', same(axes.t[i])));
            for (const stage of cells) row.appendChild(el('td', same(stage ?? '—')));
        });
        return table;
    }

    function renderDef(def, editions, withTitle) {
        const section = document.createElement('section');
        const h = (offset) => `h${(withTitle ? 3 : 2) + offset}`;
        if (withTitle) {
            const scope = def.scope ? { ja: `（${def.scope.ja}）`, en: ` (${def.scope.en})` } : same('');
            section.appendChild(el('h2', { ja: def.name.ja + scope.ja, en: def.name.en + scope.en }));
        }
        const basis = Editions.basisText(editions, def.edition);
        section.appendChild(el('p', { ja: `準拠: ${basis.ja}`, en: `Based on: ${basis.en}` }, 'edition-basis'));

        section.appendChild(el(h(0), { ja: '因子', en: 'Factors' }));
        for (const factor of def.factors) {
            section.appendChild(el(h(1), stripColon(factor.label)));
            const list = document.createElement('ul');
            for (const opt of factor.options) list.appendChild(el('li', opt.label));
            section.appendChild(list);
        }
        for (const [key, d] of Object.entries(def.derive || {})) {
            const conditions = d.count.map((c) => {
                const factor = def.factors.find((f) => f.key === c.factor);
                const opt = factor.options.find((o) => o.value === c.equals);
                return { ja: `${stripColon(factor.label).ja}: ${opt.label.ja}`, en: `${stripColon(factor.label).en}: ${opt.label.en}` };
            });
            section.appendChild(el(h(1), { ja: `${key.toUpperCase()} の決め方`, en: `How ${key.toUpperCase()} is determined` }));
            section.appendChild(el('p', {
                ja: `次の条件（${conditions.map((c) => c.ja).join('、')}）を満たす数で決まります。`,
                en: `Determined by how many of these conditions are met (${conditions.map((c) => c.en).join('; ')}).`,
            }));
            const list = document.createElement('ul');
            for (const n of Object.keys(d.map).sort((a, b) => b - a)) {
                list.appendChild(el('li', { ja: `${n} 個: ${d.map[n]}`, en: `${n} met: ${d.map[n]}` }));
            }
            section.appendChild(list);
        }

        section.appendChild(el(h(0), { ja: 'ステージ表', en: 'Stage table' }));
        const { axes, uniform, tables } = stageTables(def);
        for (const t of tables) section.appendChild(renderTable(axes, t));
        if (uniform.length) {
            const list = document.createElement('ul');
            for (const u of uniform) {
                list.appendChild(el('li', { ja: `${u.name}: T・N によらず ${u.stage}`, en: `${u.name}: ${u.stage} regardless of T and N` }));
            }
            section.appendChild(list);
        }
        if (tables.some((t) => t.grid.flat().includes(null))) {
            section.appendChild(el('p', { ja: '— は、その組合せのステージが定義されていないことを示します。', en: '— means no stage is defined for that combination.' }));
        }
        return section;
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const root = document.getElementById('staging-info');
        if (!root) return;
        try {
            const ids = root.dataset.staging.split(/\s+/).filter(Boolean);
            const [editions, ...defs] = await Promise.all([
                Editions.load(),
                ...ids.map((id) => fetch(new URL(`${id}.json`, stagingDataBase)).then((r) => r.json())),
            ]);
            for (const def of defs) root.appendChild(renderDef(def, editions, defs.length > 1));
        } catch (err) {
            console.error('staging info:', err);
            root.appendChild(el('p', { ja: 'データを読み込めませんでした。', en: 'Failed to load data.' }));
        }
    });
})();
