/*
 * Применяет настройки из site-config.js: тексты (до запуска i18n),
 * фото, порядок и скрытие разделов, свои разделы.
 */
(function () {
  var cfg = window.SITE_CONFIG || {};
  var LANGS = ['ru', 'sr', 'en'];
  var T = window.TRANSLATIONS || (window.TRANSLATIONS = {});

  LANGS.forEach(function (l) {
    T[l] = T[l] || {};
    var over = (cfg.texts && cfg.texts[l]) || {};
    Object.keys(over).forEach(function (k) {
      if (over[k]) T[l][k] = over[k];
    });
  });

  var page = location.pathname.split('/').pop() || 'index.html';
  var pageCfg = (cfg.pages && cfg.pages[page]) || {};
  var customs = (cfg.custom && cfg.custom[page]) || [];


  /* ---------- оформление: шрифты, выравнивание, размеры, цвета по устройствам ---------- */

  // Шрифты и их CSS-стек; Google-шрифты подгружаются, системные — нет
  var FONTS = {
    'Inter': { stack: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", google: 'Inter:wght@400;500;600;700;800' },
    'Manrope': { stack: "'Manrope', sans-serif", google: 'Manrope:wght@400;500;600;700;800' },
    'Montserrat': { stack: "'Montserrat', sans-serif", google: 'Montserrat:wght@400;500;600;700;800' },
    'Playfair Display': { stack: "'Playfair Display', Georgia, serif", google: 'Playfair+Display:wght@400;600;700;800' },
    'Georgia': { stack: "Georgia, 'Times New Roman', serif" },
    'Helvetica Neue': { stack: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
    'Courier New': { stack: "'Courier New', Courier, monospace" }
  };
  var TEXT_SEL = ' :is(h1,h2,h3,h4,p,li,span,b,label,figcaption,.lead,.role,.period,.when,.more,.custom-title,.w-heading)';
  var DEVICES = ['desktop', 'tablet', 'mobile'];

  function textDecls(p) {
    var d = [];
    if (p.align) d.push('text-align:' + p.align + ' !important');
    if (p.font && FONTS[p.font]) d.push('font-family:' + FONTS[p.font].stack + ' !important');
    if (p.size) d.push('font-size:' + p.size + 'px !important');
    if (p.weight) d.push('font-weight:' + p.weight + ' !important');
    if (p.lineHeight) d.push('line-height:' + p.lineHeight + ' !important');
    if (p.letterSpacing !== undefined) d.push('letter-spacing:' + p.letterSpacing + 'em !important');
    if (p.color) d.push('color:' + p.color + ' !important');
    return d;
  }

  function buildLookCss(look) {
    look = look || {};
    var css = { desktop: [], tablet: [], mobile: [] };
    var fonts = {};
    function useFont(name) { if (name && FONTS[name] && FONTS[name].google) fonts[name] = FONTS[name].google; }

    // Сайт целиком: переменные оформления (кроме шрифтов разделов)
    var site = look.site || {};
    var vars = [];
    if (site.font && FONTS[site.font]) { vars.push('--font:' + FONTS[site.font].stack); useFont(site.font); }
    if (site.textColor) vars.push('--text:' + site.textColor);
    if (site.accent) { vars.push('--accent:' + site.accent); vars.push('--accent-hover:' + site.accent); }
    if (site.bg) { vars.push('--bg:' + site.bg); }
    if (vars.length) css.desktop.push(':root{' + vars.join(';') + '}');
    if (site.headingFont && FONTS[site.headingFont]) {
      useFont(site.headingFont);
      css.desktop.push('h1,h2,h3{font-family:' + FONTS[site.headingFont].stack + ' !important}');
    }

    DEVICES.forEach(function (dev) {
      // Разделы
      Object.keys(look.sections || {}).forEach(function (id) {
        var p = (look.sections[id] || {})[dev];
        if (!p) return;
        useFont(p.font);
        var sel = '[data-section="' + id + '"]';
        var box = textDecls(p);
        if (p.background) box.push('background-color:' + p.background + ' !important');
        if (p.paddingTop !== undefined) box.push('padding-top:' + p.paddingTop + 'px !important');
        if (p.paddingBottom !== undefined) box.push('padding-bottom:' + p.paddingBottom + 'px !important');
        if (box.length) css[dev].push(sel + '{' + box.join(';') + '}');
        var inner = textDecls(p);
        if (inner.length) css[dev].push(sel + TEXT_SEL + '{' + inner.join(';') + '}');
      });

      // Отдельные тексты (по ключу)
      Object.keys(look.keys || {}).forEach(function (key) {
        var p = (look.keys[key] || {})[dev];
        if (!p) return;
        useFont(p.font);
        var d = textDecls(p);
        if (p.maxWidth) {
          d.push('max-width:' + p.maxWidth + 'px !important');
          if (p.align === 'center') d.push('margin-left:auto !important;margin-right:auto !important');
        }
        if (d.length) css[dev].push('[data-i18n="' + key + '"]{' + d.join(';') + '}');
      });

      // Фото (по id)
      Object.keys(look.images || {}).forEach(function (id) {
        var p = (look.images[id] || {})[dev];
        if (!p) return;
        var d = ['max-width:100%'];
        if (p.width) d.push('width:' + p.width + '% !important', 'height:auto');
        if (p.radius !== undefined) d.push('border-radius:' + p.radius + 'px');
        if (p.align === 'center') d.push('margin-left:auto', 'margin-right:auto');
        if (p.align === 'right') d.push('margin-left:auto', 'margin-right:0');
        if (p.align === 'left') d.push('margin-left:0', 'margin-right:auto');
        css[dev].push('img[data-img="' + id + '"]{' + d.join(';') + '}');
      });
    });

    var out = css.desktop.join('\n');
    if (css.tablet.length) out += '\n@media (max-width: 900px){\n' + css.tablet.join('\n') + '\n}';
    if (css.mobile.length) out += '\n@media (max-width: 600px){\n' + css.mobile.join('\n') + '\n}';

    // Загружаем нужные Google-шрифты
    var families = Object.keys(fonts).map(function (n) { return 'family=' + fonts[n]; });
    if (families.length) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?' + families.join('&') + '&display=swap';
      document.head.appendChild(link);
    }
    return out;
  }


  /* ---------- иконка вкладки ---------- */
  (function applyFavicon() {
    var fav = cfg.favicon || {};
    if (document.querySelector('[data-favicon-static]')) return; // статичные ссылки уже в HTML
    var links = [['icon', 'icon', 'image/png'], ['apple', 'apple-touch-icon', 'image/png']];
    links.forEach(function (x) {
      if (!fav[x[0]]) return;
      var link = document.createElement('link');
      link.rel = x[1];
      link.type = x[2];
      link.href = fav[x[0]];
      document.head.appendChild(link);
    });
  })();

  var styleEl = document.createElement('style');
  styleEl.id = 'site-look';
  styleEl.textContent = buildLookCss(cfg.look);
  document.head.appendChild(styleEl);

  function lang() {
    var l = document.documentElement.lang;
    return LANGS.indexOf(l) !== -1 ? l : 'ru';
  }

  function pick(f, l) {
    if (f == null) return '';
    if (typeof f === 'string') return f;
    return f[l] || f.ru || f.sr || f.en || '';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function applyImages() {
    document.querySelectorAll('img[data-img]').forEach(function (img) {
      var src = cfg.images && cfg.images[img.dataset.img];
      if (src) img.setAttribute('src', src);
    });
  }

  function renderCustom(sec, c) {
    var l = lang();
    var title = pick(c.title, l);
    var blocks = (c.blocks || []).map(function (b) {
      return window.Works ? window.Works.renderBlock(b, l, '') : '';
    }).join('');
    sec.innerHTML = (title ? '<h2 class="custom-title">' + esc(title) + '</h2>' : '') +
      (blocks ? '<div class="w-blocks">' + blocks + '</div>' : '');
  }


  /* ---------- карточки контактов (без анимации) ---------- */
  // Флаг страны по коду ISO (например, RU) — текст из региональных символов; эмодзи-модуль покажет его картинкой
  function flagEmoji(code) {
    if (!/^[A-Za-z]{2}$/.test(code || '')) return '';
    return String.fromCodePoint.apply(null, code.toUpperCase().split('').map(function (ch) {
      return 0x1F1E6 + ch.charCodeAt(0) - 65;
    }));
  }

  function contactStyle(c) {
    var st = [];
    if (c.bg) st.push('--cc-bg:' + c.bg);
    if (c.textColor) st.push('--cc-text:' + c.textColor);
    if (c.borderColor) st.push('--cc-border:' + c.borderColor);
    if (c.align) st.push('text-align:' + c.align);
    return st.length ? ' style="' + esc(st.join(';')) + '"' : '';
  }

  /* ---------- глобальные ссылки и основная карточка ---------- */

  // «global:telegram» → адрес из глобальных ссылок; обычный адрес остаётся как есть
  function resolveHref(ref) {
    if (!ref) return '';
    var m = /^global:(.+)$/.exec(ref);
    if (!m) return ref;
    var links = cfg.links || {};
    if (links[m[1]] && links[m[1]].href) return links[m[1]].href;
    var custom = (links.custom || []).filter(function (c) { return c.id === m[1]; })[0];
    return custom ? custom.href : '';
  }

  // Ссылки с data-link: адрес и текст берутся из глобальных ссылок
  function applyLinks() {
    var links = cfg.links || {};
    document.querySelectorAll('[data-link]').forEach(function (el) {
      var L = links[el.dataset.link];
      if (!L) return;
      if (L.href) el.setAttribute('href', L.href);
      if (el.hasAttribute('data-link-text') && L.text) el.textContent = L.text;
    });
  }

  function renderContactCards() {
    var box = document.querySelector('[data-contact-cards]');
    if (!box) return;
    var l = lang();
    var list = cfg.contactCards || [];
    box.innerHTML = list.map(function (c, i) {
      var title = pick(c.title, l);
      var text = pick(c.text, l);
      var label = pick(c.linkLabel, l);
      var shape = c.photo || 'circle';
      var img = c.image && shape !== 'none'
        ? '<img class="contact-card-photo photo-' + shape + '" src="' + esc(c.image) + '" alt="' + esc(title) + '">' : '';
      var flags = (c.flags || (c.flag ? [c.flag] : [])).map(flagEmoji).filter(Boolean);
      var inner = img + '<div class="contact-card-body">' +
        (flags.length ? '<div class="cc-flags" aria-hidden="true">' + flags.map(function (f) { return '<span class="cc-flag">' + f + '</span>'; }).join('') + '</div>' : '') +
        (title ? '<h3>' + esc(title) + '</h3>' : '') +
        (text ? '<p>' + esc(text).replace(/\n/g, '<br>') + '</p>' : '') +
        (c.link && label ? '<span class="cc-link">' + esc(label) + ' →</span>' : '') + '</div>';
      var href = resolveHref(c.link);
      var special = ((cfg.specials && cfg.specials.contacts) || []).indexOf(c.id) !== -1;
      var cls = 'contact-card' + (href ? ' is-link' : '') + (special ? ' is-special' : '');
      return href
        ? '<a class="' + cls + '" data-card-index="' + i + '"' + contactStyle(c) + ' href="' + esc(href) + '"' + (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '') + '>' + inner + '</a>'
        : '<article class="' + cls + '" data-card-index="' + i + '"' + contactStyle(c) + '>' + inner + '</article>';
    }).join('');
  }

  function applySkillSpecials() {
    var list = (cfg.specials && cfg.specials.skills) || [];
    document.querySelectorAll('.tile[data-skill]').forEach(function (t) {
      t.classList.toggle('is-special', list.indexOf(t.dataset.skill) !== -1);
    });
  }

  // Дополнительные инструменты и места образования, которые добавлены в админке
  function applyExtras() {
    document.querySelectorAll('[data-extra-added]').forEach(function (n) { n.parentNode.removeChild(n); });
    var ex = cfg.extra || {};
    var l = lang();
    var chips = document.querySelector('[data-section="index-s3"] .chips');
    if (chips) (ex.tools || []).forEach(function (t) {
      var li = document.createElement('li');
      li.className = 'is-extra';
      li.textContent = t;
      li.setAttribute('data-extra-added', '');
      chips.appendChild(li);
    });
    var edu = document.querySelector('[data-section="index-s5"]');
    if (edu) (ex.education || []).forEach(function (e) {
      var art = document.createElement('article');
      art.className = 'job';
      art.setAttribute('data-extra-added', '');
      var when = document.createElement('div');
      when.className = 'when';
      when.textContent = pick(e.period, l);
      var body = document.createElement('div');
      var h = document.createElement('h3');
      h.textContent = pick(e.school, l);
      var d = document.createElement('p');
      d.textContent = pick(e.degree, l);
      body.appendChild(h);
      body.appendChild(d);
      if (pick(e.note, l)) {
        var n = document.createElement('p');
        n.textContent = pick(e.note, l);
        body.appendChild(n);
      }
      art.appendChild(when);
      art.appendChild(body);
      edu.appendChild(art);
    });
  }

  function applyLayout() {
    var main = document.querySelector('main');
    if (!main) return;

    var nodes = {};
    Array.prototype.forEach.call(main.children, function (el) {
      if (el.dataset.section) nodes[el.dataset.section] = el;
    });

    customs.forEach(function (c) {
      var sec = nodes[c.id];
      if (!sec) {
        sec = document.createElement('section');
        sec.dataset.section = c.id;
        sec.className = 'custom-section';
        nodes[c.id] = sec;
      }
      renderCustom(sec, c);
    });

    var order = (pageCfg.order || []).filter(function (id) { return nodes[id]; });
    var rest = Object.keys(nodes).filter(function (id) { return order.indexOf(id) === -1; });
    order.concat(rest).forEach(function (id) { main.appendChild(nodes[id]); });

    var hidden = pageCfg.hidden || [];
    Object.keys(nodes).forEach(function (id) {
      nodes[id].hidden = hidden.indexOf(id) !== -1;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyImages();
    applyLayout();
    applyLinks();
    renderContactCards();
    applySkillSpecials();
    applyExtras();
  });
  document.addEventListener('languagechange', function () {
    applyLayout();
    renderContactCards();
    applySkillSpecials();
    applyExtras();
  });
})();
