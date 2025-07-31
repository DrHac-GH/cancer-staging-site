function calculateStage() {
    const toolContainer = document.querySelector('.tool-container');
    if (!toolContainer) return;

    const cancerType = toolContainer.dataset.cancerType;
    const t = document.getElementById('tFactor')?.value;
    const n = document.getElementById('nFactor')?.value;
    const m = document.getElementById('mFactor')?.value;
    const resultDiv = document.getElementById('result');

    if (!t || !n || !m) {
        resultDiv.textContent = '全ての因子を選択してください。';
        return;
    }

    if (stagingLogic[cancerType]) {
        const stage = stagingLogic[cancerType](t, n, m);
        resultDiv.textContent = `判定ステージ: ${stage}`;
    } else {
        resultDiv.textContent = 'この癌腫の計算ロジックが見つかりません。';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.tool-container select');
    selects.forEach(select => {
        select.addEventListener('change', calculateStage);
    });

    // Initial calculation on page load
    calculateStage();
});
