/*
 * Работы: карточки на странице «Работы» и страница отдельной работы.
 * Данные — window.WORKS (файл works-data.js). Тексты берутся на текущем языке,
 * если перевода нет — показывается русский.
 * Этот файл не зависит от админ-панели: её можно удалить, сайт продолжит работать.
 */
(function () {
  var LANGS = ['ru', 'sr', 'en'];
  var lightbox = null;
  var galleryCounter = 0;

  function currentLang() {
    var l = document.documentElement.lang;
    return LANGS.indexOf(l) !== -1 ? l : 'ru';
  }

  function tr(key, lang) {
    var t = window.TRANSLATIONS || {};
    return (t[lang] && t[lang][key]) || (t.ru && t.ru[key]) || key;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function pick(field, lang) {
    if (field == null) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.ru || field.sr || field.en || '';
  }

  function src(path, base) {
    if (!path) return '';
    if (/^(https?:|data:)/.test(path)) return path;
    return (base || '') + path;
  }

  function paragraphs(text) {
    return String(text || '')
      .split(/\n+/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean)
      .map(function (s) { return '<p>' + esc(s) + '</p>'; })
      .join('');
  }

  function all() {
    return Array.isArray(window.WORKS) ? window.WORKS : [];
  }

  function findById(id) {
    var list = all();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  /* ---------- карточка ---------- */

  function renderCard(work, o) {
    o = o || {};
    var lang = o.lang || currentLang();
    var base = o.base || '';
    var href = o.link ? o.link(work) : 'work.html?id=' + encodeURIComponent(work.id);
    var title = pick(work.title, lang);
    var summary = pick(work.summary, lang);
    var media = work.cover
      ? '<img src="' + esc(src(work.cover, base)) + '" alt="' + esc(title) + '" loading="lazy">'
      : '<div class="card-placeholder" aria-hidden="true"></div>';
    return '<a class="card" href="' + esc(href) + '">' + media +
      '<div class="card-content"><h3>' + esc(title) + '</h3>' +
      (work.year ? '<p class="yrs">' + esc(work.year) + '</p>' : '') +
      (summary ? '<p>' + esc(summary) + '</p>' : '') +
      '<span class="more">' + esc(tr('more', lang)) + ' →</span></div></a>';
  }

  /* ---------- блоки страницы ---------- */

  function renderBlock(b, lang, base) {
    if (b.type === 'text') {
      var heading = pick(b.heading, lang);
      var body = paragraphs(pick(b.text, lang));
      if (!heading && !body) return '';
      return '<div class="w-text">' +
        (heading ? '<h3 class="w-heading">' + esc(heading) + '</h3>' : '') +
        body + '</div>';
    }

    if (b.type === 'image') {
      if (!b.src) return '';
      var full = src(b.src, base);
      var cap = pick(b.caption, lang);
      return '<figure class="w-image"><a class="w-zoom" href="' + esc(full) + '">' +
        '<img src="' + esc(full) + '" alt="' + esc(cap) + '" loading="lazy"></a>' +
        (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : '') + '</figure>';
    }

    if (b.type === 'cards') {
      return renderCardsBlock(lang, base);
    }

    if (b.type === 'carousel') {
      var items = (b.items || []).filter(function (it) { return it && it.src; });
      if (!items.length) return '';
      var gid = 'carousel-' + (++galleryCounter);
      var slides = items.map(function (it) {
        var fullSrc = src(it.src, base);
        var caption = pick(it.caption, lang);
        return '<figure class="w-slide"><a class="w-zoom" href="' + esc(fullSrc) +
          '" data-gallery="' + gid + '"><img src="' + esc(fullSrc) + '" alt="' + esc(caption) +
          '" loading="lazy"></a>' +
          (caption ? '<figcaption>' + esc(caption) + '</figcaption>' : '') + '</figure>';
      }).join('');
      var dots = items.map(function (_, i) {
        return '<button class="w-dot' + (i === 0 ? ' active' : '') + '" type="button" data-idx="' + i +
          '" aria-label="' + (i + 1) + '"></button>';
      }).join('');
      return '<div class="w-carousel' + (items.length < 2 ? ' single' : '') + '">' +
        '<div class="w-track">' + slides + '</div>' +
        '<button class="w-nav w-prev" type="button" aria-label="' + esc(tr('car_prev', lang)) + '">‹</button>' +
        '<button class="w-nav w-next" type="button" aria-label="' + esc(tr('car_next', lang)) + '">›</button>' +
        '<div class="w-dots">' + dots + '</div></div>';
    }

    return '';
  }

  /* ---------- страница работы ---------- */

  function renderPage(work, o) {
    o = o || {};
    var lang = o.lang || currentLang();
    var base = o.base || '';
    var title = pick(work.title, lang);
    var summary = pick(work.summary, lang);

    var hero = '<div class="hero w-hero">' +
      (work.year ? '<p class="role">' + esc(work.year) + '</p>' : '') +
      '<h1>' + esc(title) + '</h1>' +
      (summary ? '<p class="lead">' + esc(summary) + '</p>' : '') +
      (work.cover ? '<img class="cover" src="' + esc(src(work.cover, base)) + '" alt="' + esc(title) + '">' : '') +
      '</div>';

    var blocks = (work.blocks || []).map(function (b) { return renderBlock(b, lang, base); }).join('');
    return hero + (blocks ? '<div class="w-blocks">' + blocks + '</div>' : '');
  }

  /* ---------- монтирование на страницы сайта ---------- */

  function initLightbox() {
    if (!window.GLightbox) return;
    if (lightbox) {
      lightbox.reload();
    } else {
      lightbox = window.GLightbox({ selector: '.w-zoom', touchNavigation: true, loop: true });
    }
  }

  function mountList() {
    var el = document.getElementById('works-grid');
    if (!el) return;
    var lang = currentLang();
    el.innerHTML = all().filter(function (w) { return !w.cardId; })
      .map(function (w) { return renderCard(w, { lang: lang }); }).join('');
  }

  function mountWork() {
    var el = document.getElementById('work-view');
    if (!el) return;
    var lang = currentLang();
    var id = new URLSearchParams(window.location.search).get('id');
    var work = id ? findById(id) : null;

    if (!work) {
      el.innerHTML = '<div class="hero"><h1>' + esc(tr('work_not_found', lang)) + '</h1></div>';
      document.title = tr('work_not_found', lang) + ' — Ismet Sidametovich';
      return;
    }

    galleryCounter = 0;
    el.innerHTML = renderPage(work, { lang: lang });
    document.title = pick(work.title, lang) + ' — Ismet Sidametovich';
    initLightbox();
  }

  function cardSize() {
    var s = window.WORKS_SETTINGS || {};
    return s.cardSize === 'small' ? 'small' : 'large';
  }

  function applyCardSize() {
    var small = cardSize() === 'small';
    document.querySelectorAll('.projects-cards').forEach(function (el) {
      el.classList.toggle('cards-small', small);
    });
  }


  /* ---------- карточки с работами ---------- */

  var openCards = {};

  function cardsList() {
    return Array.isArray(window.CARDS) ? window.CARDS : [];
  }

  function cardById(id) {
    var list = cardsList();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function worksOfCard(cardId) {
    var list = all().filter(function (w) { return w.cardId === cardId; });
    // лучшие работы — первыми
    list.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    return list;
  }

  function cardMoreHref(card) {
    return card.page ? card.page : 'card.html?id=' + encodeURIComponent(card.id);
  }

  function workTile(w, lang, base) {
    var title = pick(w.title, lang);
    var img = w.cover ? '<img src="' + esc(src(w.cover, base)) + '" alt="' + esc(title) + '" loading="lazy">' : '<span class="work-tile-empty"></span>';
    return '<a class="work-tile" href="work.html?id=' + encodeURIComponent(w.id) + '">' + img +
      '<span class="work-tile-title">' + esc(title) + '</span>' +
      (w.year ? '<small>' + esc(w.year) + '</small>' : '') + '</a>';
  }

  // Тень и цвет текста карточки
  var SHADOWS = {
    none: 'none',
    soft: '0 8px 28px rgba(0,0,0,0.07)',
    strong: '0 20px 48px rgba(0,0,0,0.14)'
  };

  function shadowCss(card) {
    var sh = card.shadow || {};
    if (!sh.mode || sh.mode === 'default') return '';
    if (sh.mode === 'colored') return '0 16px 40px ' + esc(sh.color || '#0d9488') + '66';
    return SHADOWS[sh.mode] || '';
  }

  // Общий стиль карточки: тень, цвет текста и (опционально) внутренняя обводка
  function cardStyle(card, ringInset) {
    var parts = [];
    var shadow = shadowCss(card);
    var shadows = [];
    if (ringInset) shadows.push(ringInset);
    if (shadow) shadows.push(shadow);
    if (shadow === 'none') shadows = ringInset ? [ringInset, 'none'] : ['none'];
    if (shadows.length) parts.push('box-shadow: ' + shadows.join(', ') + ';');
    if (card.textColor) parts.push('--card-text: ' + esc(card.textColor) + ';');
    if (card.buttonColor) parts.push('--card-btn: ' + esc(card.buttonColor) + ';');
    return parts.length ? ' style="' + parts.join(' ') + '"' : '';
  }

  // Обводка карточки: нет, цвет или градиент (градиент — маской, чтобы сохранялись скругления)
  function outlineAttr(card) {
    var b = card.border || {};
    return cardStyle(card, b.mode === 'color' ? 'inset 0 0 0 2px ' + esc(b.from) : '');
  }

  function ringHtml(card) {
    var b = card.border || {};
    if (b.mode !== 'gradient') return '';
    return '<span class="card-ring" aria-hidden="true" style="background: linear-gradient(135deg, ' +
      esc(b.from) + ' 0%, ' + esc(b.to) + ' 100%);"></span>';
  }

  function renderCardItem(card, o) {
    o = o || {};
    var lang = o.lang || currentLang();
    var base = o.base || '';
    var title = pick(card.title, lang);
    var summary = pick(card.summary, lang);
    var ring = ringHtml(card);

    if (card.style === 'gradient') {
      var grad = 'background: linear-gradient(135deg, ' + esc(card.gradient.from) + ' 0%, ' + esc(card.gradient.to) + ' 100%);';
      var ringInset = (card.border || {}).mode === 'color' ? 'inset 0 0 0 2px ' + esc(card.border.from) : '';
      var styleAttr = cardStyle(card, ringInset);
      var gradStyle = styleAttr ? styleAttr.replace(' style="', ' style="' + grad + ' ') : ' style="' + grad + '"';
      var avatarPath = card.cover || 'assets/img/profile-placeholder.jpg';
      var avatar = '<img class="card-avatar" src="' + esc(src(avatarPath, base)) + '" alt="' + esc(title) + '">';
      return '<article class="card card-gradient" data-card-id="' + esc(card.id) + '"' + gradStyle + '>' + ring +
        '<div class="card-gradient-row">' + avatar +
        '<div class="card-content"><h3>' + esc(title) + '</h3>' +
        (card.years ? '<p class="yrs">' + esc(card.years) + '</p>' : '') +
        (summary ? '<p>' + esc(summary) + '</p>' : '') +
        (card.github ? '<a class="card-gh" href="' + esc(card.github) + '" target="_blank" rel="noopener">GitHub →</a>' : '') +
        '</div></div></article>';
    }

    var media = card.cover
      ? '<img src="' + esc(src(card.cover, base)) + '" alt="' + esc(title) + '" loading="lazy">'
      : '<div class="card-placeholder" aria-hidden="true"></div>';

    if (!card.expandable) {
      return '<a class="card" data-card-id="' + esc(card.id) + '" href="' + esc(cardMoreHref(card)) + '"' + outlineAttr(card) + '>' + ring + media +
        '<div class="card-content"><h3>' + esc(title) + '</h3>' +
        (card.years ? '<p class="yrs">' + esc(card.years) + '</p>' : '') +
        (summary ? '<p>' + esc(summary) + '</p>' : '') +
        '<span class="more">' + esc(tr('more', lang)) + ' →</span></div></a>';
    }

    var works = worksOfCard(card.id);
    var best = works.slice(0, 3);
    var inner = best.length
      ? '<div class="card-x-works">' + best.map(function (w) { return workTile(w, lang, base); }).join('') + '</div>'
      : '<p class="card-x-empty">' + esc(tr('card_empty', lang)) + '</p>';
    var open = !!openCards[card.id];
    return '<article class="card-x' + (open ? ' open' : '') + '" data-card-id="' + esc(card.id) + '"' + outlineAttr(card) + '>' + ring +
      '<button class="card-x-head" type="button" aria-expanded="' + (open ? 'true' : 'false') + '">' +
      media +
      '<div class="card-content"><h3>' + esc(title) + '</h3>' +
      (card.years ? '<p class="yrs">' + esc(card.years) + '</p>' : '') +
      (summary ? '<p>' + esc(summary) + '</p>' : '') +
      '<span class="more card-x-toggle">' +
      '<span class="t-open">' + esc(tr('card_open', lang)) + '</span>' +
      '<span class="t-close">' + esc(tr('card_close', lang)) + '</span> <span class="chev">↓</span></span></div>' +
      '</button>' +
      '<div class="card-x-panel"><div class="card-x-inner">' + inner +
      '<a class="btn card-x-more" href="' + esc(cardMoreHref(card)) + '">' + esc(tr('card_more', lang)) + ' →</a>' +
      '</div></div></article>';
  }

  function renderCardsGrid(o) {
    return cardsList().map(function (c) { return renderCardItem(c, o); }).join('');
  }

  function mountCards() {
    var el = document.getElementById('cards-grid');
    if (!el) return;
    el.innerHTML = renderCardsGrid({ lang: currentLang() });
  }

  /* ---------- разворот карточки: камера двигается к ней за 150 мс ---------- */

  var SCROLL_MS = 150;
  var scrollAnim = null;
  var savedScroll = null;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function stopScroll() {
    if (scrollAnim) cancelAnimationFrame(scrollAnim);
    scrollAnim = null;
  }

  // Плавная прокрутка за заданное время (easeOut)
  function animateScrollTo(target, duration) {
    stopScroll();
    var start = window.scrollY;
    var delta = target - start;
    if (reduceMotion || Math.abs(delta) < 2) { window.scrollTo({ top: target, left: 0, behavior: 'instant' }); return; }
    var t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      window.scrollTo({ top: start + delta * eased, left: 0, behavior: 'instant' });
      scrollAnim = p < 1 ? requestAnimationFrame(step) : null;
    }
    scrollAnim = requestAnimationFrame(step);
  }

  // Прокрутка, которую сделал пользователь, останавливает анимацию
  ['wheel', 'touchstart', 'keydown'].forEach(function (ev) {
    window.addEventListener(ev, stopScroll, { passive: true });
  });

  // Размеры карточки в развёрнутом виде, измеренные без анимации (ничего не видно)
  function measureOpen(card) {
    var panel = card.querySelector('.card-x-panel');
    panel.style.transition = 'none';
    card.classList.add('open');
    void panel.offsetHeight;
    // В развёрнутом виде карточка может переехать в другой ряд — меряем уже там
    var top = card.getBoundingClientRect().top + window.scrollY;
    var height = card.offsetHeight;
    card.classList.remove('open');
    void panel.offsetHeight;
    panel.style.transition = '';
    return { top: top, height: height };
  }

  // Позиция, при которой развёрнутая карточка окажется по центру экрана
  function centeredTarget(m) {
    var vh = window.innerHeight;
    var target = m.height < vh - 60 ? m.top + m.height / 2 - vh / 2 : m.top - 30;
    return Math.max(0, Math.round(target));
  }

  // Закрыть без анимации панели — нужно, чтобы точно измерить новую позицию
  function closeInstantly(card) {
    var panel = card.querySelector('.card-x-panel');
    panel.style.transition = 'none';
    card.classList.remove('open');
    card.querySelector('.card-x-head').setAttribute('aria-expanded', 'false');
    delete openCards[card.dataset.cardId];
    void panel.offsetHeight;
    panel.style.transition = '';
  }

  document.addEventListener('click', function (e) {
    var head = e.target.closest('.card-x-head');
    if (!head) return;
    var card = head.closest('.card-x');
    var prev = document.querySelector('.card-x.open');
    var willOpen = !card.classList.contains('open');

    if (!willOpen) {
      // Сворачиваем: возвращаем камеру на прежнее место
      card.classList.remove('open');
      head.setAttribute('aria-expanded', 'false');
      delete openCards[card.dataset.cardId];
      if (savedScroll !== null) animateScrollTo(savedScroll, SCROLL_MS);
      savedScroll = null;
      return;
    }

    if (prev && prev !== card) closeInstantly(prev);
    if (savedScroll === null) savedScroll = window.scrollY;

    var m = measureOpen(card);
    card.classList.add('open');
    head.setAttribute('aria-expanded', 'true');
    openCards[card.dataset.cardId] = true;
    animateScrollTo(centeredTarget(m), SCROLL_MS);
  });

  /* ---------- страница карточки: все работы ---------- */

  function mountCard() {
    var el = document.getElementById('card-view');
    if (!el) return;
    var lang = currentLang();
    var id = new URLSearchParams(window.location.search).get('id');
    var card = id ? cardById(id) : null;
    if (!card) {
      el.innerHTML = '<div class="hero"><h1>' + esc(tr('work_not_found', lang)) + '</h1></div>';
      document.title = tr('work_not_found', lang) + ' — Ismet Sidametovich';
      return;
    }
    var title = pick(card.title, lang);
    var works = worksOfCard(card.id);
    el.innerHTML = '<div class="hero w-hero">' +
      (card.years ? '<p class="role">' + esc(card.years) + '</p>' : '') +
      '<h1>' + esc(title) + '</h1>' +
      (pick(card.summary, lang) ? '<p class="lead">' + esc(pick(card.summary, lang)) + '</p>' : '') +
      '</div>' +
      (works.length
        ? '<div class="work-grid">' + works.map(function (w) { return workTile(w, lang, ''); }).join('') + '</div>'
        : '<p class="card-x-empty center">' + esc(tr('card_empty', lang)) + '</p>');
    document.title = title + ' — Ismet Sidametovich';
  }

  // Блок «Карточки работ» в конструкторе страниц
  function renderCardsBlock(lang, base) {
    return '<div class="w-block w-cards"><div class="cards projects-cards">' +
      renderCardsGrid({ lang: lang, base: base }) + '</div></div>';
  }

  function refresh() {
    applyCardSize();
    mountCards();
    mountList();
    mountWork();
    mountCard();
  }

  /* ---------- карусель: кнопки, точки, обновление точек при прокрутке ---------- */

  document.addEventListener('click', function (e) {
    var nav = e.target.closest('.w-nav');
    if (nav) {
      var track = nav.closest('.w-carousel').querySelector('.w-track');
      var dir = nav.classList.contains('w-next') ? 1 : -1;
      track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });
      return;
    }
    var dot = e.target.closest('.w-dot');
    if (dot) {
      var t = dot.closest('.w-carousel').querySelector('.w-track');
      t.scrollTo({ left: Number(dot.dataset.idx) * t.clientWidth, behavior: 'smooth' });
    }
  });

  document.addEventListener('scroll', function (e) {
    var track = e.target;
    if (!track || !track.classList || !track.classList.contains('w-track')) return;
    var idx = Math.round(track.scrollLeft / (track.clientWidth || 1));
    track.closest('.w-carousel').querySelectorAll('.w-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
  }, true);

  document.addEventListener('languagechange', refresh);

  window.Works = {
    renderCard: renderCard,
    renderPage: renderPage,
    renderBlock: renderBlock,
    renderCardsBlock: renderCardsBlock,
    renderCardItem: renderCardItem,
    cardSize: cardSize,
    refresh: refresh
  };

  refresh();
})();
