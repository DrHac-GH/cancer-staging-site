function calculateStage() {
    const toolContainer = document.querySelector('.tool-container');
    if (!toolContainer) return;

    const cancerType = toolContainer.dataset.cancerType;
    const resultDiv = document.getElementById('result');
    const lang = localStorage.getItem('language') || 'ja';

    const errorMessages = {
        ja: '全ての因子を選択してください。',
        en: 'Please select all factors.'
    };

    const resultMessages = {
        ja: 'ステージ: ',
        en: 'Stage: '
    };

    let allFactorsSelected = true;
    let t, n, m, tumorCount, tumorSize, vascularInvasion;

    if (cancerType === 'liver-jp') {
        tumorCount = document.getElementById('tumorCount')?.value;
        tumorSize = document.getElementById('tumorSize')?.value;
        vascularInvasion = document.getElementById('vascularInvasion')?.value;
        n = document.getElementById('nFactor')?.value;
        m = document.getElementById('mFactor')?.value;

        if (!tumorCount || !tumorSize || !vascularInvasion || !n || !m) {
            allFactorsSelected = false;
        }
    } else {
        t = document.getElementById('tFactor')?.value;
        n = document.getElementById('nFactor')?.value;
        m = document.getElementById('mFactor')?.value;

        if (!t || !n || !m) {
            allFactorsSelected = false;
        }
    }

    if (!allFactorsSelected) {
        resultDiv.textContent = errorMessages[lang];
        return;
    }

    if (stagingLogic[cancerType]) {
        let stage;
        if (cancerType === 'liver-jp') {
            stage = stagingLogic[cancerType](tumorCount, tumorSize, vascularInvasion, n, m);
        } else {
            stage = stagingLogic[cancerType](t, n, m);
        }
        resultDiv.textContent = resultMessages[lang] + stage;
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
