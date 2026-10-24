/*
 * Аура выделенных работ. Общий модуль для сайта и админки.
 * Цвета берутся из WORKS_SETTINGS.auraColors (настраиваются в админке, вкладка «Оформление»).
 * Аура — тонкое кольцо вокруг карточки и мягкое свечение; цвета передаются через переменную --aura.
 */
(function () {
  var DEFAULT = ['#7C3AED', '#EC4899', '#38BDF8'];
  var HEX = /^#[0-9a-fA-F]{6}$/;

  function colors(settings) {
    var list = settings && Array.isArray(settings.auraColors)
      ? settings.auraColors.filter(function (c) { return HEX.test(c); })
      : [];
    return list.length >= 2 ? list.slice(0, 5) : DEFAULT;
  }

  // Оборачивает HTML карточки в блок с аурой. Список цветов повторяется по первому
  // кругу, чтобы градиент переливался без скачка.
  function size(settings) {
    var s = (settings && settings.auraSize) || {};
    var gap = Number.isFinite(s.gap) ? s.gap : 2;
    var glow = Number.isFinite(s.glow) ? s.glow : 8;
    return { gap: Math.max(0, Math.min(12, gap)), glow: Math.max(0, Math.min(40, glow)) };
  }

  function wrap(html, list, extraClass, sz) {
    var loop = list.concat([list[0]]).join(', ');
    sz = sz || { gap: 2, glow: 8 };
    return '<div class="p-item is-featured' + (extraClass ? ' ' + extraClass : '') +
      '" style="--aura: ' + loop + '; --aura-gap: ' + sz.gap + 'px; --aura-glow: ' + sz.glow + 'px;">' +
      '<span class="p-aura-glow" aria-hidden="true"></span>' +
      '<span class="p-aura" aria-hidden="true"></span>' +
      html + '</div>';
  }

  window.Aura = { DEFAULT: DEFAULT, colors: colors, size: size, wrap: wrap, valid: function (c) { return HEX.test(c); } };
})();
