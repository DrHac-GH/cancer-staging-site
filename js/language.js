function setLanguage(lang) {
    localStorage.setItem('language', lang);
    translatePage(lang);
}

function translatePage(lang) {
    document.querySelectorAll('[data-ja]').forEach(el => {
        el.textContent = el.dataset[lang];
    });
    document.documentElement.lang = lang;

    // Update title tag
    const titleElement = document.querySelector('title');
    if (titleElement && titleElement.dataset[lang]) {
        titleElement.textContent = titleElement.dataset[lang];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'ja';
    translatePage(savedLang);
});
