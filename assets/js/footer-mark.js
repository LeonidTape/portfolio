/* Надпись в подвале: передаём позицию курсора в CSS, чтобы тёмный круг шёл от курсора. */
(function () {
  var mark = document.querySelector('.sf-mark');
  if (!mark) return;
  function place(e) {
    var r = mark.getBoundingClientRect();
    mark.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    mark.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }
  mark.addEventListener('pointerenter', place);
  mark.addEventListener('pointermove', place);
})();
