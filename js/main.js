// ステージングツール: 因子の選択肢と判定表を data/staging/<癌腫>.json から読み、画面を組み立てる。
const stagingDataBase = new URL('../data/staging/', document.currentScript.src);

const TOOL_TEXT = {
    placeholder: { ja: '選択してください', en: 'Please select' },
    incomplete: { ja: '全ての因子を選択してください。', en: 'Please select all factors.' },
    stage: { ja: 'ステージ: ', en: 'Stage: ' },
    undetermined: { ja: '判定不能', en: 'Not determinable' },
    basis: { ja: '準拠: ', en: 'Based on: ' },
    loadError: { ja: 'データを読み込めませんでした。', en: 'Failed to load data.' },
};

function renderFactors(def, container) {
    for (const factor of def.factors) {
        const group = document.createElement('div');
        group.className = 'form-group';
        const label = Editions.el('label', factor.label);
        label.htmlFor = `factor-${factor.key}`;
        const select = document.createElement('select');
        select.id = label.htmlFor;
        select.dataset.factor = factor.key;
        select.setAttribute('aria-label', factor.label.en.replace(/:$/, ''));
        const placeholder = Editions.el('option', TOOL_TEXT.placeholder);
        placeholder.value = '';
        select.appendChild(placeholder);
        for (const opt of factor.options) {
            const option = Editions.el('option', opt.label);
            option.value = opt.value;
            select.appendChild(option);
        }
        group.append(label, select);
        container.appendChild(group);
    }
}

function calculateStage(def) {
    const resultDiv = document.getElementById('result');
    const lang = Editions.lang();
    const values = {};
    for (const select of document.querySelectorAll('.tool-container select')) {
        values[select.dataset.factor] = select.value;
    }
    if (Object.values(values).some((v) => !v)) {
        resultDiv.textContent = TOOL_TEXT.incomplete[lang];
        return;
    }
    const { stage } = StagingEngine.resolve(def, values);
    resultDiv.textContent = TOOL_TEXT.stage[lang] + (stage ?? TOOL_TEXT.undetermined[lang]);
}

document.addEventListener('DOMContentLoaded', async () => {
    const toolContainer = document.querySelector('.tool-container');
    if (!toolContainer) return;
    const resultDiv = document.getElementById('result');
    try {
        const type = toolContainer.dataset.cancerType;
        const [def, editions] = await Promise.all([
            fetch(new URL(`${type}.json`, stagingDataBase)).then((r) => r.json()),
            Editions.load(),
        ]);
        renderFactors(def, document.getElementById('factors'));

        const basis = Editions.basisText(editions, def.edition);
        const scope = def.scope ? { ja: `（${def.scope.ja}）`, en: ` (${def.scope.en})` } : { ja: '', en: '' };
        const basisEl = document.getElementById('edition-basis');
        const text = { ja: TOOL_TEXT.basis.ja + basis.ja + scope.ja, en: TOOL_TEXT.basis.en + basis.en + scope.en };
        basisEl.dataset.ja = text.ja;
        basisEl.dataset.en = text.en;
        basisEl.textContent = text[Editions.lang()];

        toolContainer.addEventListener('change', () => calculateStage(def));
        calculateStage(def);
    } catch (err) {
        console.error('staging tool:', err);
        resultDiv.textContent = TOOL_TEXT.loadError[Editions.lang()];
    }
});
