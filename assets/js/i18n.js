/*
 * Переключение языков: ru / sr / en.
 * Тексты лежат в translations.js (window.TRANSLATIONS), ключи — в атрибутах data-i18n*.
 * Выбор сохраняется в localStorage; при первом визите показывается окно выбора языка.
 */
(function () {
  var DEFAULT_LANG = 'ru';
  var SUPPORTED = ['ru', 'sr', 'en'];
  var STORAGE_LANG = 'portfolio-lang';
  var STORAGE_VISITED = 'portfolio-visited';

  var dict = window.TRANSLATIONS || {};

  function lookup(lang, key) {
    var table = dict[lang] || {};
    if (table[key] != null) return table[key];
    var fallback = dict[DEFAULT_LANG] || {};
    return fallback[key] != null ? fallback[key] : null;
  }

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* приватный режим и т.п. */ }
  }

  function applyLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = lookup(lang, el.dataset.i18n);
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var value = lookup(lang, el.dataset.i18nAlt);
      if (value != null) el.setAttribute('alt', value);
    });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      var value = lookup(lang, el.dataset.i18nLabel);
      if (value != null) el.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      var value = lookup(lang, el.dataset.i18nContent);
      if (value != null) el.setAttribute('content', value);
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
  }

  function setLanguage(lang, closeModal) {
    applyLanguage(lang);
    storageSet(STORAGE_LANG, lang);
    if (closeModal) hideModal();
  }

  function modalEl() { return document.querySelector('.language-modal'); }

  function showModal() {
    var m = modalEl();
    if (m) m.classList.remove('hidden');
  }

  function hideModal() {
    var m = modalEl();
    if (m) m.classList.add('hidden');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var saved = storageGet(STORAGE_LANG);
    applyLanguage(saved || DEFAULT_LANG);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { setLanguage(btn.dataset.lang, true); });
    });
    document.querySelectorAll('.modal-lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { setLanguage(btn.dataset.lang, true); });
    });

    var m = modalEl();
    if (m) {
      m.addEventListener('click', function (e) { if (e.target === m) hideModal(); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hideModal();
    });

    // В предпросмотре админки (?draft=1) окно выбора языка не показываем
    var isDraftPreview = window.location.search.indexOf('draft=1') !== -1;
    if (!isDraftPreview && storageGet(STORAGE_VISITED) !== 'true') {
      showModal();
      storageSet(STORAGE_VISITED, 'true');
    }
  });

  window.setLanguage = setLanguage;
})();
