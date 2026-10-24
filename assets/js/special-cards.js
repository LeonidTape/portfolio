/*
 * Особые карты (как в Balatro): наклон и блик следуют за курсором.
 * Работает для любого элемента с классом .is-special: выделенные работы,
 * навыки и карточки контактов. Только на устройствах с мышью и без «уменьшения движения».
 */
(function () {
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || calm) return;

  function special(el) {
    return el && el.closest ? el.closest('.is-special') : null;
  }

  document.addEventListener('pointermove', function (e) {
    var el = special(e.target);
    if (!el) return;
    var r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var x = (e.clientX - r.left) / r.width;
    var y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', ((0.5 - y) * 12).toFixed(2) + 'deg');
    el.style.setProperty('--ry', ((x - 0.5) * 14).toFixed(2) + 'deg');
    el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
    el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
  });

  document.addEventListener('pointerout', function (e) {
    var el = special(e.target);
    if (!el || el.contains(e.relatedTarget)) return;
    el.style.removeProperty('--rx');
    el.style.removeProperty('--ry');
  });
})();
