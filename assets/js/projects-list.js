(function () {
  var grid = document.getElementById('projects-grid');
  if (!grid) return;

  var LANGS = ['ru', 'sr', 'en'];
  var UI = {
    more: { ru: 'Подробнее', sr: 'Saznajte više', en: 'Learn more' },
    empty: { ru: 'Проекты появятся здесь', sr: 'Projekti će se pojaviti ovde', en: 'Projects will appear here' }
  };

  function lang() {
    var current = document.documentElement.lang;
    return LANGS.indexOf(current) !== -1 ? current : 'ru';
  }

  function pick(field, currentLang) {
    if (!field) return '';
    return field[currentLang] || field.ru || field.sr || field.en || '';
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function label(key, currentLang) {
    return UI[key][currentLang] || UI[key].ru;
  }

  function tagLabel(tag, currentLang) {
    var translated = (window.WORK_TAGS || {})[tag];
    return translated ? pick(translated, currentLang) : tag;
  }

  function libTags(work) {
    var lib = (window.WORKS_SETTINGS && window.WORKS_SETTINGS.tagLibrary) || [];
    return (work.cardTagIds || []).map(function (id) {
      for (var i = 0; i < lib.length; i++) if (lib[i].id === id) return lib[i];
      return null;
    }).filter(Boolean);
  }

  function customTagsHtml(work) {
    var chips = libTags(work).map(function (t) {
      return '<span class="p-tag p-tag-custom" style="background:' + esc(t.bg) + ';color:' + esc(t.color) + '">' + esc(t.text) + '</span>';
    }).join('');
    return chips ? '<div class="p-tags p-card-tags">' + chips + '</div>' : '';
  }

  function orderedWorks() {
    var works = Array.isArray(window.WORKS) ? window.WORKS.slice() : [];
    return works.sort(function (a, b) {
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }

  function cardHtml(work, currentLang) {
    var title = pick(work.title, currentLang);
    var summary = pick(work.summary, currentLang);
    var media = work.cover
      ? '<img src="' + esc(work.cover) + '" alt="' + esc(title) + '" loading="lazy">'
      : '<span class="p-card-initial" aria-hidden="true">' + esc(title.charAt(0)) + '</span>';
    var tags = customTagsHtml(work);

    return '<div class="p-item">' +
      '<a class="p-card" href="work.html?id=' + encodeURIComponent(work.id) + '">' +
        '<div class="p-card-head">' +
          '<div class="p-card-media' + (work.cover ? '' : ' is-empty') + '">' + media + '</div>' +
          '<div class="p-card-titles">' +
            '<h3 class="p-card-title">' + esc(title) + '</h3>' +
            (work.year ? '<p class="p-card-year">' + esc(work.year) + '</p>' : '') +
          '</div>' +
        '</div>' +
        '<div class="p-card-body">' +
          tags +
          (summary ? '<p class="p-card-text">' + esc(summary) + '</p>' : '') +
          '<span class="p-card-more">' + esc(label('more', currentLang)) + ' <span aria-hidden="true">↗</span></span>' +
        '</div>' +
      '</a>' +
    '</div>';
  }

  var CATS = [
    { id: 'programming', ru: 'Программирование', sr: 'Programiranje', en: 'Programming' },
    { id: 'graphics', ru: 'Графика и видео', sr: 'Grafika i video', en: 'Graphics & video' }
  ];

  function render() {
    var currentLang = lang();
    var works = orderedWorks();
    if (!works.length) {
      grid.innerHTML = '<p class="p-empty">' + esc(label('empty', currentLang)) + '</p>';
      return;
    }
    var html = '';
    CATS.forEach(function (cat) {
      var list = works.filter(function (w) { return w.category === cat.id; });
      if (!list.length) return;
      html += '<h3 class="p-cat-title">' + esc(cat[currentLang] || cat.ru) + '</h3>' +
        list.map(function (w) { return cardHtml(w, currentLang); }).join('');
    });
    var rest = works.filter(function (w) { return !w.category; });
    html += rest.map(function (w) { return cardHtml(w, currentLang); }).join('');
    grid.innerHTML = html;
  }

  document.addEventListener('languagechange', render);
  render();
})();
