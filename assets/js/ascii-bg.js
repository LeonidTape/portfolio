/* ASCII-пепел: появляется только при движении курсора над зоной, сгорает и улетает вверх */
(function () {
  var zone = document.getElementById('ascii-zone');
  if (!zone) return;
  var canvas = zone.querySelector('.ascii-bg');
  if (!canvas || !canvas.getContext) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ctx = canvas.getContext('2d');

  var FONT_PX = 13;
  var FONT = FONT_PX + 'px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  // от «свежего» к «сгоревшему»: плотные символы превращаются в мелкие точки
  var RAMP = '*+:·.';
  var MAX_PARTS = 320;
  var STEP = 9;            // шаг, через который ставятся частицы вдоль пути курсора

  var w = 0, h = 0, dpr = 1;
  var parts = [];
  var last = null;
  var raf = null;
  var lastT = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = zone.clientWidth;
    h = zone.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = FONT;
    ctx.textBaseline = 'top';
  }

  function spawn(x, y) {
    if (parts.length >= MAX_PARTS) return;
    var n = 1 + (Math.random() < 0.5 ? 1 : 0);
    for (var i = 0; i < n; i++) {
      parts.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(0.25 + Math.random() * 0.55),
        age: 0,
        life: 900 + Math.random() * 800,
        seed: Math.random() * 6.28
      });
    }
  }

  function step(dt) {
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.age += dt;
      var k = dt / 16;
      p.x += (p.vx + Math.sin(p.age * 0.006 + p.seed) * 0.12) * k;
      p.y += p.vy * k;
      p.vy *= 0.997;   // лёгкое замедление: пепел тормозит в воздухе
      if (p.age >= p.life || p.y < -12) parts.splice(i, 1);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      var t = p.age / p.life;             // 0  только родился, 1  исчез
      var ch = RAMP.charAt(Math.min(RAMP.length - 1, Math.floor(t * RAMP.length)));
      // цвет: благородный зелёный → серый пепел
      var m = Math.min(1, t / 0.45);
      var r = Math.round(62 + (150 - 62) * m);
      var g = Math.round(122 + (155 - 122) * m);
      var b = Math.round(95 + (152 - 95) * m);
      var a = Math.pow(1 - t, 1.3) * 0.85;
      if (a < 0.02) continue;
      ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a.toFixed(3) + ')';
      ctx.fillText(ch, p.x, p.y);
    }
  }

  function loop(now) {
    var dt = Math.min(64, now - lastT);
    lastT = now;
    step(dt);
    draw();
    if (parts.length) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = null;
      ctx.clearRect(0, 0, w, h);
    }
  }

  function kick() {
    if (raf === null) {
      lastT = performance.now();
      raf = requestAnimationFrame(loop);
    }
  }

  zone.addEventListener('pointermove', function (e) {
    var r = zone.getBoundingClientRect();
    var x = e.clientX - r.left;
    var y = e.clientY - r.top;
    if (last) {
      var dx = x - last.x, dy = y - last.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var n = Math.min(6, Math.floor(dist / STEP));
      for (var i = 1; i <= n; i++) {
        spawn(last.x + dx * (i / n), last.y + dy * (i / n));
      }
      if (n === 0 && dist > 0) spawn(x, y);
    } else {
      spawn(x, y);
    }
    last = { x: x, y: y };
    kick();
  }, { passive: true });

  zone.addEventListener('pointerleave', function () { last = null; });

  window.addEventListener('resize', resize);
  resize();
})();
