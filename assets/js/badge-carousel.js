/*
 * Стопка бейджиков на главной: три карточки с фото и должностью
 * перекладываются по кругу. Подпись рядом меняется вместе с активной карточкой.
 * Точки внизу показывают, через сколько будет следующее перелистывание:
 * активная точка заполняется за время паузы (CSS).
 * Автопрокрутка выключается при «уменьшении движения».
 */
(function () {
  var wrap = document.querySelector('.badge-wrap');
  var stack = document.querySelector('.badge-stack');
  if (!wrap || !stack) return;

  var badges = Array.prototype.slice.call(stack.querySelectorAll('.badge'));
  var dots = Array.prototype.slice.call(wrap.querySelectorAll('.badge-dot'));
  var roles = Array.prototype.slice.call(document.querySelectorAll('.role-item'));
  var n = badges.length;
  var active = 0;
  var DELAY = 2800;
  var timer = null;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  wrap.style.setProperty('--badge-delay', DELAY + 'ms');

  function render() {
    badges.forEach(function (b, i) {
      b.setAttribute('data-pos', (i - active + n) % n);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === active);
    });
    roles.forEach(function (r, i) {
      r.classList.toggle('is-active', i === active);
    });
  }

  function setActive(index) {
    active = (index + n) % n;
    render();
  }

  function next() { setActive(active + 1); }
  function prev() { setActive(active - 1); }

  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(next, DELAY);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      stop();
      setActive(parseInt(d.getAttribute('data-index'), 10));
      start();
    });
  });

  // Пауза при наведении на карусель и точки
  wrap.addEventListener('mouseenter', stop);
  wrap.addEventListener('mouseleave', start);

  // Свайп на телефоне
  var startX = null;
  stack.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    stop();
  }, { passive: true });
  stack.addEventListener('touchend', function (e) {
    if (startX !== null) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    }
    startX = null;
    start();
  });

  if (reduceMotion) wrap.classList.add('is-static');

  render();
  start();
})();
