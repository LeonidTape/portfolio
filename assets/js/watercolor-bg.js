/* Импрессионистский фон: мазки акварели и мягкий свет, дрейфующие по экрану.
   Рядом с курсором мазки теплеют и проступают ярче, как блик на воде. */
(function () {
  var canvas = document.querySelector('.paint-bg');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var FPS = 30;
  var RADIUS = 260;
  var PALETTE = [
    [74, 111, 165],   // ultramarine
    [214, 140, 160],  // rose
    [226, 178, 96],   // ochre
    [150, 184, 160],  // sage
    [170, 150, 200],  // lilac
    [150, 200, 220]   // sky
  ];

  var w = 0, h = 0, dpr = 1;
  var strokes = [];
  var target = { x: -9999, y: -9999 };
  var pos = { x: -9999, y: -9999 };
  var hasMouse = false;
  var t = 0, last = 0, raf = null;

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function makeStroke(i) {
    var c = PALETTE[i % PALETTE.length];
    return {
      c: c,
      x0: rnd(-0.1, 1.1), y0: rnd(-0.1, 1.1),
      x1: rnd(-0.1, 1.1), y1: rnd(-0.1, 1.1),
      cx: rnd(0.2, 0.8), cy: rnd(0.2, 0.8),
      width: rnd(90, 260),
      phase: rnd(0, Math.PI * 2),
      speed: rnd(0.04, 0.12),
      alpha: rnd(0.07, 0.16)
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = w < 700 ? 8 : 13;
    strokes = [];
    for (var i = 0; i < n; i++) strokes.push(makeStroke(i));
  }

  function rgba(c, a) {
    return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + Math.max(0, Math.min(1, a)).toFixed(3) + ')';
  }

  function drawStroke(s, time, mx, my, near) {
    // Точки мазка медленно дышат, создавая ощущение движения
    var k = Math.sin(time * s.speed + s.phase);
    var x0 = (s.x0 + 0.06 * k) * w, y0 = (s.y0 + 0.05 * Math.cos(time * s.speed + s.phase)) * h;
    var x1 = (s.x1 - 0.06 * k) * w, y1 = (s.y1 - 0.05 * Math.cos(time * s.speed + s.phase)) * h;
    var cx = (s.cx + 0.12 * Math.sin(time * s.speed * 0.7 + s.phase)) * w;
    var cy = (s.cy + 0.10 * Math.cos(time * s.speed * 0.9 + s.phase)) * h;

    var c = s.c;
    var boost = near * 0.6;
    if (near > 0.02) {
      c = [
        Math.round(c[0] + (248 - c[0]) * near * 0.35),
        Math.round(c[1] + (214 - c[1]) * near * 0.35),
        Math.round(c[2] + (170 - c[2]) * near * 0.35)
      ];
    }

    // Три слоя разной ширины имитируют мягкий, растёкшийся край акварели
    var layers = [
      { w: s.width * 1.0, a: s.alpha * 0.35 },
      { w: s.width * 0.6, a: s.alpha * 0.55 },
      { w: s.width * 0.25, a: s.alpha * 0.9 }
    ];
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (var i = 0; i < layers.length; i++) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(cx, cy, x1, y1);
      ctx.lineWidth = layers[i].w;
      ctx.strokeStyle = rgba(c, layers[i].a + boost * 0.08);
      ctx.stroke();
    }
  }

  function drawLight(time, mx, my) {
    // Тёплое световое пятно под курсором и два медленных блика
    var g = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS);
    g.addColorStop(0, 'rgba(255,246,222,0.55)');
    g.addColorStop(0.5, 'rgba(255,236,200,0.18)');
    g.addColorStop(1, 'rgba(255,236,200,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    var sx = w * (0.5 + 0.35 * Math.sin(time * 0.05));
    var sy = h * (0.35 + 0.15 * Math.cos(time * 0.04));
    var s = ctx.createRadialGradient(sx, sy, 0, sx, sy, Math.max(w, h) * 0.5);
    s.addColorStop(0, 'rgba(255,250,235,0.45)');
    s.addColorStop(1, 'rgba(255,250,235,0)');
    ctx.fillStyle = s;
    ctx.fillRect(0, 0, w, h);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    // Бумага: тёплый кремовый фон
    ctx.fillStyle = '#F7F2E8';
    ctx.fillRect(0, 0, w, h);

    var mx = pos.x, my = pos.y;
    for (var i = 0; i < strokes.length; i++) {
      var s = strokes[i];
      var near = 0;
      if (hasMouse) {
        var cxm = (s.x0 + s.x1) * 0.5 * w, cym = (s.y0 + s.y1) * 0.5 * h;
        var d = Math.hypot(cxm - mx, cym - my);
        near = Math.max(0, 1 - d / (RADIUS * 2));
      }
      drawStroke(s, t, mx, my, near);
    }

    drawLight(t, mx, my);
  }

  function frame(now) {
    raf = null;
    if (!last || now - last >= 1000 / FPS) {
      last = now;
      t += 0.02;
      if (hasMouse) {
        pos.x += (target.x - pos.x) * 0.12;
        pos.y += (target.y - pos.y) * 0.12;
      }
      draw();
    }
    if (!reduce) raf = requestAnimationFrame(frame);
  }

  function schedule() {
    if (raf === null) raf = requestAnimationFrame(frame);
  }

  window.addEventListener('pointermove', function (e) {
    target.x = e.clientX;
    target.y = e.clientY;
    if (!hasMouse) { pos.x = e.clientX; pos.y = e.clientY; }
    hasMouse = true;
    if (reduce) draw(); else schedule();
  }, { passive: true });

  document.addEventListener('pointerleave', function () {
    hasMouse = false;
    if (reduce) draw();
  });

  window.addEventListener('resize', function () {
    resize();
    draw();
  });

  resize();
  draw();
  if (!reduce) schedule();
})();
