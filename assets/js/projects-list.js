/*
 * Страница «Работы»: карточки проектов, фильтры по годам и тегам.
 * Данные — window.WORKS, window.WORK_TAGS (works-data.js).
 * - Выделенные работы (featured) — «особые карты»: показываются первыми; эффект .is-special
 *   (style.css, special-cards.js).
 * - Фильтр по году: одиночный выбор. Фильтр по тегам: несколько тегов, объединяются по «или».
 *   Год и теги работают вместе: проект должен подходить и по году, и по тегу.
 */
(function () {
  var grid = document.getElementById('projects-grid');
  var yearBar = document.getElementById('projects-years');
  var bar = document.getElementById('projects-filters');
  if (!grid || !bar || !yearBar) return;

  var LANGS = ['ru', 'sr', 'en'];
  var UI = {
    all: { ru: 'Все', sr: 'Sve', en: 'All' },
    allYears: { ru: 'Все годы', sr: 'Sve godine', en: 'All years' },
    more: { ru: 'Подробнее', sr: 'Saznajte više', en: 'Learn more' },
    empty: { ru: 'Нет проектов с выбранными фильтрами', sr: 'Nema projekata za izabrane filtere', en: 'No projects match the selected filters' },
    reset: { ru: 'Сбросить фильтры', sr: 'Poništi filtere', en: 'Clear filters' }
  };
  var selectedTags = {};
  var selectedYear = '';

  function lang() {
    var l = document.documentElement.lang;
    return LANGS.indexOf(l) !== -1 ? l : 'ru';
  }
  function pick(field, l) {
    if (!field) return '';
    return field[l] || field.ru || field.sr || field.en || '';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function ui(key, l) { return UI[key][l] || UI[key].ru; }
  function tagLabel(t, l) {
    var x = (window.WORK_TAGS || {})[t];
    return x ? pick(x, l) : t;
  }
  function works() {
    return Array.isArray(window.WORKS) ? window.WORKS : [];
  }
  // Год для фильтра — первый четырёхзначный номер в поле «Год / период»
  function yearOf(w) {
    var m = String(w.year || '').match(/\d{4}/);
    return m ? m[0] : '';
  }
  function usedTags() {
    var order = Object.keys(window.WORK_TAGS || {});
    var used = {};
    works().forEach(function (w) { (w.tags || []).forEach(function (t) { used[t] = true; }); });
    return order.filter(function (t) { return used[t]; });
  }
  function usedYears() {
    var seen = {};
    works().forEach(function (w) { var y = yearOf(w); if (y) seen[y] = true; });
    return Object.keys(seen).sort().reverse();
  }
  function tagsActive() { return Object.keys(selectedTags).length > 0; }

  function matches(w) {
    if (selectedYear && yearOf(w) !== selectedYear) return false;
    if (!tagsActive()) return true;
    return (w.tags || []).some(function (t) { return selectedTags[t]; });
  }

  // Выделенные — вперёд, остальное — в исходном порядке
  function ordered(list) {
    var top = list.filter(function (w) { return w.featured; });
    var rest = list.filter(function (w) { return !w.featured; });
    return top.concat(rest);
  }

  function renderYears(l) {
    var years = usedYears();
    if (!years.length) { yearBar.innerHTML = ''; yearBar.style.display = 'none'; return; }
    yearBar.style.display = '';
    yearBar.innerHTML = '<button type="button" class="p-filter' + (selectedYear ? '' : ' is-active') +
      '" data-year="" aria-pressed="' + (selectedYear ? 'false' : 'true') + '">' + esc(ui('allYears', l)) + '</button>' +
      years.map(function (y) {
        var on = selectedYear === y;
        return '<button type="button" class="p-filter' + (on ? ' is-active' : '') + '" data-year="' + esc(y) +
          '" aria-pressed="' + on + '">' + esc(y) + '</button>';
      }).join('');
  }

  function renderTags(l) {
    var html = '<button type="button" class="p-filter' + (tagsActive() ? '' : ' is-active') +
      '" data-tag="" aria-pressed="' + (tagsActive() ? 'false' : 'true') + '">' + esc(ui('all', l)) + '</button>';
    html += usedTags().map(function (t) {
      var on = !!selectedTags[t];
      return '<button type="button" class="p-filter' + (on ? ' is-active' : '') + '" data-tag="' + esc(t) +
        '" aria-pressed="' + on + '">' + esc(tagLabel(t, l)) + '</button>';
    }).join('');
    bar.innerHTML = html;
  }

  function cardHtml(w, l) {
    var title = pick(w.title, l);
    var summary = pick(w.summary, l);
    var media = w.cover
      ? '<img src="' + esc(w.cover) + '" alt="' + esc(title) + '" loading="lazy">'
      : '<span class="p-card-initial" aria-hidden="true">' + esc(title.charAt(0)) + '</span>';
    var tags = (w.tags || []).map(function (t) {
      return '<span class="p-tag">' + esc(tagLabel(t, l)) + '</span>';
    }).join('');
    var card = '<a class="p-card" href="work.html?id=' + encodeURIComponent(w.id) + '">' +
      '<div class="p-card-media' + (w.cover ? '' : ' is-empty') + '">' + media + '</div>' +
      '<div class="p-card-body">' +
        (w.year ? '<p class="p-card-year">' + esc(w.year) + '</p>' : '') +
        '<h3 class="p-card-title">' + esc(title) + '</h3>' +
        (summary ? '<p class="p-card-text">' + esc(summary) + '</p>' : '') +
        (tags ? '<div class="p-tags">' + tags + '</div>' : '') +
        '<span class="p-card-more">' + esc(ui('more', l)) + ' →</span>' +
      '</div></a>';
    return '<div class="p-item">' + (w.featured ? card.replace('class="p-card"', 'class="p-card is-special"') : card) + '</div>';
  }

  function renderGrid(l) {
    var list = ordered(works().filter(matches));
    if (!list.length) {
      grid.innerHTML = '<div class="p-empty"><p>' + esc(ui('empty', l)) + '</p>' +
        '<button type="button" class="p-filter is-active" data-reset="1">' + esc(ui('reset', l)) + '</button></div>';
      return;
    }
    grid.innerHTML = list.map(function (w) { return cardHtml(w, l); }).join('');
  }

  function refresh() {
    var l = lang();
    renderYears(l);
    renderTags(l);
    renderGrid(l);
  }

  function resetAll() {
    selectedTags = {};
    selectedYear = '';
    refresh();
  }

  yearBar.addEventListener('click', function (e) {
    var b = e.target.closest('.p-filter');
    if (!b) return;
    var y = b.getAttribute('data-year');
    selectedYear = (y && y !== selectedYear) ? y : '';
    refresh();
  });

  bar.addEventListener('click', function (e) {
    var b = e.target.closest('.p-filter');
    if (!b) return;
    var tag = b.getAttribute('data-tag');
    if (!tag) {
      selectedTags = {};
    } else if (selectedTags[tag]) {
      delete selectedTags[tag];
    } else {
      selectedTags[tag] = true;
    }
    refresh();
  });

  grid.addEventListener('click', function (e) {
    if (e.target.closest('[data-reset]')) resetAll();
  });

  document.addEventListener('languagechange', refresh);
  refresh();
})();
