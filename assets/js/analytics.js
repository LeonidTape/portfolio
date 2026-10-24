/*
 * Учёт уникальных посетителей. Статистика отправляется сразу при заходе.
 * Браузеру присваивается случайный id (UUID в localStorage), сервер получает
 * только этот id. IP, user-agent и другие данные сайт не передаёт.
 * Баннер-уведомление показывается один раз, после «Окей» больше не появляется.
 * Серверная часть: worker/.
 */
(function () {
  // Адрес Cloudflare Worker из worker/README.md. Пока пусто — ничего не отправляется.
  var ENDPOINT = 'https://site-visits.leonidtrapper.workers.dev';
  var NOTICE_KEY = 'stats-notice-seen';
  var ID_KEY = 'stats-visitor';

  if (!ENDPOINT) return;

  var TEXT = {
    ru: { msg: 'Я собираю статистику посещений', btn: 'Окей' },
    sr: { msg: 'Prikupljam statistiku poseta', btn: 'Važi' },
    en: { msg: 'I collect visit statistics', btn: 'OK' }
  };

  function lang() {
    var l = document.documentElement.lang;
    return TEXT[l] ? l : 'ru';
  }

  function newId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    var b = new Uint8Array(16);
    crypto.getRandomValues(b);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    var h = Array.prototype.map.call(b, function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
    return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
  }

  function track() {
    try {
      var id = localStorage.getItem(ID_KEY);
      if (!id) {
        id = newId();
        localStorage.setItem(ID_KEY, id);
      }
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
        keepalive: true
      }).catch(function () {});
    } catch (e) {
      // localStorage недоступен (приватный режим и т.п.) — просто не считаем
    }
  }

  function showBanner() {
    var t = TEXT[lang()];
    var box = document.createElement('div');
    box.className = 'stats-banner';
    box.setAttribute('role', 'status');
    box.innerHTML = '<p>' + t.msg + '</p><button type="button">' + t.btn + '</button>';
    box.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem(NOTICE_KEY, '1'); } catch (e) {}
      box.classList.add('is-hidden');
      setTimeout(function () { box.remove(); }, 400);
    });
    document.body.appendChild(box);
    requestAnimationFrame(function () { box.classList.add('is-visible'); });
  }

  var seen = null;
  try { seen = localStorage.getItem(NOTICE_KEY); } catch (e) {}
  track();
  if (!seen) showBanner();
})();
