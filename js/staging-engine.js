// 判定エンジン: data/staging/<id>.json の表を引いて Stage を返す（癌腫によらず1本）。
const StagingEngine = {
    /**
     * def: data/staging/<id>.json の内容。values: { 因子key: 選択値 }。
     * rules を上から順に見て、when の全条件を満たす最初の行の stage を返す。該当なしは null（判定不能）。
     */
    resolve(def, values) {
        const v = { ...values };
        for (const [key, d] of Object.entries(def.derive || {})) {
            const met = d.count.filter((c) => v[c.factor] === c.equals).length;
            v[key] = d.map[String(met)];
        }
        for (const rule of def.rules) {
            if (Object.entries(rule.when).every(([k, allowed]) => allowed.includes(v[k]))) {
                return { stage: rule.stage, values: v };
            }
        }
        return { stage: null, values: v };
    },
};
globalThis.StagingEngine = StagingEngine;
