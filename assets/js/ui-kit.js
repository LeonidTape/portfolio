/*
 * Интерфейс: уведомления снизу с прогресс-баром и окно с телефоном.
 * Иконки — Lucide (подключается с CDN; без него показываются встроенные копии тех же иконок).
 * Клик по карточке с телефоном (tel:) копирует номер, показывает уведомление и открывает окно.
 */
(function () {
  var LUCIDE_FALLBACK = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    alertCircle: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'
  };

  function svgFallback(name) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (LUCIDE_FALLBACK[name] || '') + '</svg>';
  }

  // Lucide-иконка: <span data-lucide="name"> заменяется библиотекой, если она загрузилась
  function icon(name) {
    return '<span class="ui-icon" data-lucide="' + name + '">' + svgFallback(name) + '</span>';
  }

  function renderIcons() {
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  }

  function t(key) {
    var lang = document.documentElement.lang || 'ru';
    var T = window.TRANSLATIONS || {};
    return (T[lang] && T[lang][key]) || (T.ru && T.ru[key]) || key;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- уведомления ---------- */

  var TOAST_MS = 3000;
  var stack = null;

  function ensureStack() {
    if (stack) return stack;
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    stack.setAttribute('aria-live', 'polite');
    document.body.appendChild(stack);
    return stack;
  }

  function toast(message, kind) {
    var el = document.createElement('div');
    el.className = 'toast' + (kind === 'error' ? ' toast-error' : '');
    el.setAttribute('role', 'status');
    el.innerHTML = icon(kind === 'error' ? 'alertCircle' : 'check') +
      '<span class="toast-text">' + esc(message) + '</span>' +
      '<div class="toast-bar"><span style="animation-duration:' + TOAST_MS + 'ms"></span></div>';
    ensureStack().appendChild(el);
    renderIcons();

    // Прогресс-бар заканчивается — уведомление уезжает. Наведение ставит таймер на паузу.
    var bar = el.querySelector('.toast-bar span');
    bar.addEventListener('animationend', function (e) {
      if (e.animationName !== 'toastBar') return;
      el.classList.add('leaving');
    });
    el.addEventListener('animationend', function (e) {
      if (e.animationName === 'toastOut') el.remove();
    });
    return el;
  }

  /* ---------- копирование ---------- */

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () {
        return fallbackCopy(text);
      });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  /* ---------- окно с телефоном ---------- */

  var modal = null;
  var lastFocus = null;

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.className = 'phone-modal';
    modal.hidden = true;
    modal.innerHTML =
      '<div class="pm-overlay" data-pm-close></div>' +
      '<div class="pm-dialog" role="dialog" aria-modal="true" aria-labelledby="pm-number">' +
      '<button type="button" class="pm-close" data-pm-close aria-label="' + esc(t('close')) + '">' + icon('x') + '</button>' +
      '<div class="pm-icon">' + icon('phone') + '</div>' +
      '<p class="pm-label" id="pm-label"></p>' +
      '<p class="pm-number" id="pm-number"></p>' +
      '</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-pm-close]')) closeModal();
    });
    return modal;
  }

  function openModal(label, number, fromEl) {
    var m = ensureModal();
    m.querySelector('#pm-label').textContent = label;
    m.querySelector('#pm-number').textContent = number;
    // Окно вылетает из карточки: вычисляем смещение от её центра до центра экрана
    var dialog = m.querySelector('.pm-dialog');
    if (fromEl) {
      var r = fromEl.getBoundingClientRect();
      dialog.style.setProperty('--fx', (r.left + r.width / 2 - window.innerWidth / 2) + 'px');
      dialog.style.setProperty('--fy', (r.top + r.height / 2 - window.innerHeight / 2) + 'px');
    } else {
      dialog.style.setProperty('--fx', '0px');
      dialog.style.setProperty('--fy', '40px');
    }
    lastFocus = document.activeElement;
    m.hidden = false;
    m.classList.remove('closing');
    void m.offsetWidth;
    m.classList.add('open');
    renderIcons();
    setTimeout(function () { m.querySelector('.pm-close').focus({ preventScroll: true }); }, 50);
  }

  function closeModal() {
    if (!modal || modal.hidden || modal.classList.contains('closing')) return;
    modal.classList.remove('open');
    modal.classList.add('closing');
    setTimeout(function () {
      modal.hidden = true;
      modal.classList.remove('closing');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }, 220);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  /* ---------- клик по карточке с телефоном ---------- */

  document.addEventListener('click', function (e) {
    var card = e.target.closest('a.contact-card[href^="tel:"]');
    if (!card) return;
    e.preventDefault();
    e.stopPropagation();

    var number = decodeURIComponent(card.getAttribute('href').slice(4)).replace(/\s+/g, '');
    var shown = (card.querySelector('.contact-card-body p') || {}).textContent || number;
    var label = (card.querySelector('h3') || {}).textContent || '';

    copyText(number).then(function (ok) {
      toast(t(ok ? 'phone_copied' : 'copy_failed'), ok ? 'ok' : 'error');
    });
    openModal(label, shown, card);
  }, true);

  window.UIKit = { toast: toast, openModal: openModal, closeModal: closeModal, copyText: copyText };
})();
