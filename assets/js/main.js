/*
 * Лёгкие анимации и галерея.
 * GSAP + ScrollTrigger — появление блоков при прокрутке.
 * GLightbox — просмотр изображений галереи.
 * Если библиотеки не загрузились или включено «уменьшение движения»,
 * класс .js снимается и весь контент остаётся видимым.
 */
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Тень шапки при прокрутке
  var header = document.querySelector('.top');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Галерея
  if (window.GLightbox) {
    window.GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
  }

  // Анимации
  if (!window.gsap || reduceMotion) {
    root.classList.remove('js');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.reveal').forEach(function (el) {
    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
  });

  gsap.utils.toArray('.stagger').forEach(function (group) {
    gsap.fromTo(group.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 90%', once: true }
      });
  });
})();
