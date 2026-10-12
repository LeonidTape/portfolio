/*
 * Визуальный режим редактора. Работает только внутри предпросмотра админки
 * (сервер подключает его при ?edit=1). На публичном сайте не используется.
 *  • наведение и выделение элементов;
 *  • двойной клик по тексту — правка прямо на странице;
 *  • перетаскивание разделов за ручку;
 *  • перетаскивание фото на картинку, карточку или раздел.
 */
(function () {
  if (window.self === window.top) return;

  var doc = document;
  var style = doc.createElement('style');
  style.textContent = [
    '.js .reveal, .js .stagger > * { opacity: 1 !important; transform: none !important; }',
    '.ed-box { position: fixed; pointer-events: none; z-index: 99999; border-radius: 6px; display: none; }',
    '.ed-hover { border: 1.5px dashed rgba(0,113,227,.8); }',
    '.ed-sel { border: 2px solid #0071E3; box-shadow: 0 0 0 4px rgba(0,113,227,.15); }',
    '.ed-label { position: fixed; z-index: 100000; font: 600 11px/1 Inter, system-ui, sans-serif; background: #0071E3; color: #fff; padding: 4px 7px; border-radius: 6px; pointer-events: none; white-space: nowrap; display: none; }',
    '.ed-grip { position: fixed; z-index: 100001; background: #0071E3; color: #fff; font: 600 12px/1 Inter, system-ui, sans-serif; padding: 7px 12px; border-radius: 999px; cursor: grab; user-select: none; box-shadow: 0 4px 14px rgba(0,0,0,.2); display: none; }',
    '.ed-line { position: fixed; height: 3px; background: #0071E3; border-radius: 3px; z-index: 100000; pointer-events: none; display: none; }',
    '.ed-drop { outline: 3px dashed #0071E3 !important; outline-offset: 4px; }',
    '[contenteditable="true"] { outline: 2px solid #0071E3; outline-offset: 4px; border-radius: 4px; cursor: text; }'
  ].join('\n');
  doc.head.appendChild(style);

  function box(cls) {
    var d = doc.createElement('div');
    d.className = cls;
    doc.body.appendChild(d);
    return d;
  }
  var hoverBox = box('ed-box ed-hover');
  var selBox = box('ed-box ed-sel');
  var hoverLabel = box('ed-label');
  var grip = box('ed-grip');
  grip.textContent = '⋮⋮ Раздел';
  var line = box('ed-line');

  var selected = null;   // { kind, id, index, el }
  var dragging = null;   // { id }
  var dropEl = null;

  var GLOBAL = /^global-/;

  function post(msg) {
    window.parent.postMessage(msg, location.origin);
  }

  function targetOf(el) {
    if (!el || !el.closest) return null;
    var t;
    if ((t = el.closest('img[data-img]'))) return { kind: 'image', id: t.dataset.img, el: t };
    if ((t = el.closest('.contact-card'))) return { kind: 'card', index: Number(t.dataset.cardIndex), el: t };
    if ((t = el.closest('[data-i18n]'))) return { kind: 'key', id: t.dataset.i18n, el: t };
    if ((t = el.closest('[data-section]'))) return { kind: 'section', id: t.dataset.section, el: t };
    return null;
  }

  function findTarget(m) {
    if (m.kind === 'key') return doc.querySelector('[data-i18n="' + m.id + '"]');
    if (m.kind === 'image') return doc.querySelector('img[data-img="' + m.id + '"]');
    if (m.kind === 'section') return doc.querySelector('[data-section="' + m.id + '"]');
    if (m.kind === 'card') return doc.querySelector('.contact-card[data-card-index="' + m.index + '"]');
    return null;
  }

  function place(boxEl, el) {
    var r = el.getBoundingClientRect();
    boxEl.style.display = 'block';
    boxEl.style.left = r.left + 'px';
    boxEl.style.top = r.top + 'px';
    boxEl.style.width = r.width + 'px';
    boxEl.style.height = r.height + 'px';
  }

  function labelFor(t) {
    var names = { key: 'Текст', image: 'Фото', card: 'Карточка', section: 'Раздел' };
    return names[t.kind] + (t.kind === 'key' ? ' · ' + t.id : (t.kind === 'section' ? ' · ' + t.id : ''));
  }

  function showLabel(t, el) {
    var r = el.getBoundingClientRect();
    hoverLabel.textContent = labelFor(t);
    hoverLabel.style.display = 'block';
    hoverLabel.style.left = Math.max(4, r.left) + 'px';
    hoverLabel.style.top = Math.max(4, r.top - 22) + 'px';
  }

  function select(t) {
    selected = t;
    place(selBox, t.el);
    selBox.style.display = 'block';
    if (t.kind === 'section' && !GLOBAL.test(t.id)) {
      var r = t.el.getBoundingClientRect();
      grip.style.display = 'block';
      grip.style.left = Math.max(4, r.left) + 'px';
      grip.style.top = Math.max(4, r.top - 34) + 'px';
    } else {
      grip.style.display = 'none';
    }
  }

  function refreshBoxes() {
    if (selected && selected.el.isConnected) select(selected);
    else { selBox.style.display = 'none'; grip.style.display = 'none'; }
  }

  /* ---------- выделение и наведение ---------- */

  doc.addEventListener('mousemove', function (e) {
    if (dragging) return;
    var t = targetOf(e.target);
    if (!t || (selected && t.el === selected.el)) {
      hoverBox.style.display = 'none';
      hoverLabel.style.display = 'none';
      return;
    }
    place(hoverBox, t.el);
    showLabel(t, t.el);
  });

  doc.addEventListener('mouseleave', function () {
    hoverBox.style.display = 'none';
    hoverLabel.style.display = 'none';
  });

  // Клик выделяет элемент и отменяет переход по ссылке
  doc.addEventListener('click', function (e) {
    if (e.target === grip) return;
    e.preventDefault();
    e.stopPropagation();
    var t = targetOf(e.target);
    if (!t) return;
    select(t);
    hoverBox.style.display = 'none';
    hoverLabel.style.display = 'none';
    post({ t: 'select', kind: t.kind, id: t.id, index: t.index });
  }, true);

  // Перехватываем отправку форм и переходы, чтобы в редакторе ничего не уходило с страницы
  doc.addEventListener('submit', function (e) { e.preventDefault(); }, true);

  /* ---------- правка текста: двойной клик ---------- */

  doc.addEventListener('dblclick', function (e) {
    var t = targetOf(e.target);
    if (!t || t.kind !== 'key') return;
    e.preventDefault();
    e.stopPropagation();
    var el = t.el;
    var original = el.innerText;
    el.contentEditable = 'true';
    el.focus();
    var range = doc.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    var done = false;
    function finish(save) {
      if (done) return;
      done = true;
      el.contentEditable = 'false';
      el.removeEventListener('keydown', onKey, true);
      var value = el.innerText.trim();
      if (!save) { el.innerText = original; return; }
      if (value !== original.trim()) post({ t: 'text', key: t.id, value: value });
    }
    function onKey(ev) {
      if (ev.key === 'Escape') { ev.preventDefault(); finish(false); el.blur(); }
      else if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); finish(true); el.blur(); }
    }
    el.addEventListener('keydown', onKey, true);
    el.addEventListener('blur', function () { finish(true); }, { once: true });
  }, true);

  /* ---------- перетаскивание разделов ---------- */

  function sectionEls() {
    return Array.prototype.filter.call(doc.querySelector('main').children, function (el) {
      return el.dataset.section && !el.hidden;
    });
  }

  var lastY = 0;
  var scrollTimer = null;

  // При перетаскивании к краю окна страница прокручивается сама
  function autoScroll() {
    var h = window.innerHeight, v = 0;
    if (lastY < 80) v = -(80 - lastY) / 4;
    else if (lastY > h - 80) v = (lastY - (h - 80)) / 4;
    if (v) window.scrollBy(0, v);
  }

  grip.addEventListener('mousedown', function (e) {
    if (!selected || selected.kind !== 'section') return;
    e.preventDefault();
    dragging = { id: selected.id };
    grip.style.cursor = 'grabbing';
    lastY = e.clientY;
    scrollTimer = setInterval(autoScroll, 30);
  });

  doc.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    lastY = e.clientY;
    var others = sectionEls().filter(function (el) { return el.dataset.section !== dragging.id; });
    var target = null, after = false;
    for (var i = 0; i < others.length; i++) {
      var r = others[i].getBoundingClientRect();
      if (e.clientY < r.top + r.height / 2) { target = others[i]; break; }
      target = others[i]; after = true;
    }
    if (!target) return;
    var lr = target.getBoundingClientRect();
    line.style.display = 'block';
    line.style.left = lr.left + 'px';
    line.style.width = lr.width + 'px';
    line.style.top = (after ? lr.bottom : lr.top) - 1.5 + 'px';
    dragging.target = target.dataset.section;
    dragging.after = after;
  });

  doc.addEventListener('mouseup', function () {
    if (!dragging) return;
    var d = dragging;
    dragging = null;
    clearInterval(scrollTimer);
    grip.style.cursor = 'grab';
    line.style.display = 'none';
    if (!d.target || d.target === d.id) return;
    var ids = Array.prototype.map.call(doc.querySelector('main').children, function (el) {
      return el.dataset.section;
    }).filter(Boolean);
    ids = ids.filter(function (x) { return x !== d.id; });
    var at = ids.indexOf(d.target);
    ids.splice(d.after ? at + 1 : at, 0, d.id);
    post({ t: 'order', order: ids });
  });

  window.addEventListener('scroll', refreshBoxes, { passive: true });
  window.addEventListener('resize', refreshBoxes);

  /* ---------- перетаскивание фото ---------- */

  function clearDrop() {
    if (dropEl) dropEl.classList.remove('ed-drop');
    dropEl = null;
  }

  function isFileDrag(e) {
    return e.dataTransfer && Array.prototype.indexOf.call(e.dataTransfer.types, 'Files') !== -1;
  }

  doc.addEventListener('dragover', function (e) {
    if (!isFileDrag(e)) return;
    var t = targetOf(e.target);
    e.preventDefault();
    if (!t) { clearDrop(); return; }
    if (dropEl !== t.el) { clearDrop(); dropEl = t.el; dropEl.classList.add('ed-drop'); }
  });

  doc.addEventListener('dragleave', function (e) {
    if (!e.relatedTarget) clearDrop();
  });

  doc.addEventListener('drop', function (e) {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    clearDrop();
    var files = Array.prototype.filter.call(e.dataTransfer.files, function (f) {
      return /^image\//.test(f.type) || /\.(heic|heif|png|jpe?g|webp|gif)$/i.test(f.name);
    });
    var t = targetOf(e.target);
    if (!t || !files.length) return;
    post({ t: 'file', kind: t.kind, id: t.id, index: t.index, files: files });
  });

  /* ---------- сообщения от админки ---------- */

  window.addEventListener('message', function (e) {
    if (e.source !== window.parent) return;
    var m = e.data || {};
    if (m.t === 'focus') {
      var el = findTarget(m);
      if (el) {
        select({ kind: m.kind, id: m.id, index: m.index, el: el });
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  });

  post({ t: 'ready' });
})();
